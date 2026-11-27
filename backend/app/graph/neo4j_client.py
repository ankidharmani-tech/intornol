"""
Neo4j client — thin wrapper around the official Python driver.

Credentials come from env vars (NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD).
All Cypher goes through this module so no other file imports the driver.
"""

from __future__ import annotations

import json
import os
from typing import Any, Optional

from neo4j import GraphDatabase

from backend.app.models.schema import (
    GraphEdge,
    ReviewStatus,
    ServiceNode,
    VersionEntry,
)

# ── Connection ───────────────────────────────────────────────────────

_driver = None


def get_driver():
    global _driver
    if _driver is None:
        uri = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
        user = os.environ.get("NEO4J_USER", "neo4j")
        password = os.environ.get("NEO4J_PASSWORD", "password")
        _driver = GraphDatabase.driver(uri, auth=(user, password))
    return _driver


def close_driver():
    global _driver
    if _driver:
        _driver.close()
        _driver = None


# ── Helpers ──────────────────────────────────────────────────────────

def _node_to_service(record_node) -> ServiceNode:
    """Convert a Neo4j node dict to a ServiceNode pydantic model."""
    props = dict(record_node)
    # Neo4j stores lists as lists; JSON strings need parsing
    for list_field in ("documents_required", "eligibility_criteria", "version_history"):
        val = props.get(list_field)
        if isinstance(val, str):
            try:
                props[list_field] = json.loads(val)
            except (json.JSONDecodeError, TypeError):
                props[list_field] = []
        elif val is None:
            props[list_field] = []
    return ServiceNode(**props)


# ── CRUD ─────────────────────────────────────────────────────────────

def upsert_service(node: ServiceNode) -> ServiceNode:
    """MERGE a service node into Neo4j (insert or update)."""
    driver = get_driver()
    data = node.model_dump()
    # Serialize lists to JSON strings for Neo4j storage
    data["documents_required"] = json.dumps(data["documents_required"])
    data["eligibility_criteria"] = json.dumps(data["eligibility_criteria"])
    data["version_history"] = json.dumps(
        [v if isinstance(v, dict) else v for v in data["version_history"]]
    )

    query = """
    MERGE (s:Service {id: $id})
    SET s.name = $name,
        s.citizen_friendly_label = $citizen_friendly_label,
        s.category = $category,
        s.jurisdiction_level = $jurisdiction_level,
        s.applicable_region = $applicable_region,
        s.mode = $mode,
        s.documents_required = $documents_required,
        s.fee = $fee,
        s.processing_days = $processing_days,
        s.official_source_url = $official_source_url,
        s.office_name = $office_name,
        s.office_address = $office_address,
        s.contact_designation = $contact_designation,
        s.confidence = $confidence,
        s.status = $status,
        s.date_added = $date_added,
        s.version_history = $version_history,
        s.eligibility_criteria = $eligibility_criteria,
        s.application_url = $application_url
    RETURN s
    """
    with driver.session() as session:
        result = session.run(query, **data)
        record = result.single()
        return _node_to_service(record["s"])


def create_edge(source_id: str, target_id: str, edge_type: str, properties: dict | None = None):
    """Create a typed relationship between two Service nodes."""
    driver = get_driver()
    props = properties or {}
    query = f"""
    MATCH (a:Service {{id: $source_id}})
    MATCH (b:Service {{id: $target_id}})
    MERGE (a)-[r:{edge_type}]->(b)
    SET r += $props
    RETURN type(r)
    """
    with driver.session() as session:
        session.run(query, source_id=source_id, target_id=target_id, props=props)


def get_service(node_id: str) -> Optional[ServiceNode]:
    """Fetch a single service node by id."""
    driver = get_driver()
    query = "MATCH (s:Service {id: $node_id}) RETURN s"
    with driver.session() as session:
        result = session.run(query, node_id=node_id)
        record = result.single()
        if record:
            return _node_to_service(record["s"])
    return None


def get_all_services(status: Optional[str] = None) -> list[ServiceNode]:
    """Fetch all services, optionally filtered by status."""
    driver = get_driver()
    if status:
        query = "MATCH (s:Service {status: $status}) RETURN s ORDER BY s.date_added DESC"
        params = {"status": status}
    else:
        query = "MATCH (s:Service) RETURN s ORDER BY s.date_added DESC"
        params = {}
    with driver.session() as session:
        result = session.run(query, **params)
        return [_node_to_service(record["s"]) for record in result]


def get_dependency_subgraph(
    target_ids: list[str],
    region: Optional[str] = None,
) -> tuple[list[dict], list[dict]]:
    """
    Pull the full dependency chain for a set of target service IDs,
    filtered by applicable_region. Returns (nodes_list, edges_list).
    """
    driver = get_driver()
    query = """
    UNWIND $target_ids AS tid
    MATCH path = (start:Service)-[:PREREQUISITE_FOR*0..6]->(target:Service {id: tid})
    WHERE start.applicable_region IN [$region, null]
      AND start.status = 'approved'
    UNWIND nodes(path) AS n
    UNWIND relationships(path) AS r
    WITH COLLECT(DISTINCT n) AS nodes, COLLECT(DISTINCT r) AS rels
    RETURN nodes, rels
    """
    with driver.session() as session:
        result = session.run(query, target_ids=target_ids, region=region)
        record = result.single()
        if not record:
            return [], []

        nodes_out = []
        seen_ids = set()
        for n in record["nodes"]:
            svc = _node_to_service(n)
            if svc.id not in seen_ids:
                nodes_out.append(svc.model_dump())
                seen_ids.add(svc.id)

        edges_out = []
        for r in record["rels"]:
            edges_out.append({
                "source": r.start_node["id"],
                "target": r.end_node["id"],
                "edge_type": r.type,
            })

        return nodes_out, edges_out


def update_service_status(node_id: str, status: str, edits: dict | None = None) -> Optional[ServiceNode]:
    """Update a service's status (and optionally other fields), append version_history."""
    driver = get_driver()
    svc = get_service(node_id)
    if not svc:
        return None

    import datetime
    version_entry = {
        "timestamp": datetime.datetime.now().isoformat(),
        "changed_by": "admin",
        "old_value": {"status": svc.status},
        "new_value": {"status": status},
    }
    if edits:
        version_entry["old_value"].update(
            {k: getattr(svc, k, None) for k in edits.keys()}
        )
        version_entry["new_value"].update(edits)

    # Build SET clause
    set_parts = ["s.status = $status"]
    params: dict[str, Any] = {"node_id": node_id, "status": status}

    if edits:
        for key, val in edits.items():
            param_name = f"edit_{key}"
            if isinstance(val, (list, dict)):
                params[param_name] = json.dumps(val)
            else:
                params[param_name] = val
            set_parts.append(f"s.{key} = ${param_name}")

    # Append version history
    existing_history = svc.version_history or []
    history_dicts = [
        v.model_dump() if isinstance(v, VersionEntry) else v for v in existing_history
    ]
    history_dicts.append(version_entry)
    params["version_history"] = json.dumps(history_dicts)
    set_parts.append("s.version_history = $version_history")

    set_clause = ", ".join(set_parts)
    query = f"""
    MATCH (s:Service {{id: $node_id}})
    SET {set_clause}
    RETURN s
    """
    with driver.session() as session:
        result = session.run(query, **params)
        record = result.single()
        if record:
            return _node_to_service(record["s"])
    return None
