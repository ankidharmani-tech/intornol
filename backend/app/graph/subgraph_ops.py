"""
subgraph_ops.py — networkx topological sort on the matched subgraph.

Per TECHNICAL_DEEPDIVE.md Sections 1 & 4:
  Neo4j holds everything at scale; networkx does the one-line ordering
  math on the small relevant slice.
"""

from __future__ import annotations

import networkx as nx

from backend.app.models.schema import RoadmapStep, ServiceNode


def build_ordered_roadmap(
    nodes: list[dict],
    edges: list[dict],
) -> list[RoadmapStep]:
    """
    Given raw nodes + edges from Neo4j, build a networkx DiGraph,
    run topological_sort, and return an ordered list of RoadmapSteps.
    """
    G = nx.DiGraph()

    node_map: dict[str, dict] = {}
    for n in nodes:
        G.add_node(n["id"])
        node_map[n["id"]] = n

    for e in edges:
        # PREREQUISITE_FOR: source must happen before target
        if e["edge_type"] == "PREREQUISITE_FOR":
            G.add_edge(e["source"], e["target"])
        # REQUIRES: target is required by source → target before source
        elif e["edge_type"] == "REQUIRES":
            G.add_edge(e["target"], e["source"])

    # If the graph has a cycle (shouldn't happen), fall back to node list order
    if not nx.is_directed_acyclic_graph(G):
        ordered_ids = [n["id"] for n in nodes]
    else:
        ordered_ids = list(nx.topological_sort(G))

    # Build the ordered roadmap steps — only include nodes we have data for
    steps: list[RoadmapStep] = []
    for node_id in ordered_ids:
        if node_id in node_map:
            n = node_map[node_id]
            steps.append(
                RoadmapStep(
                    id=n["id"],
                    name=n["name"],
                    citizen_friendly_label=n["citizen_friendly_label"],
                    mode=n["mode"],
                    documents_required=n.get("documents_required", []),
                    fee=n.get("fee"),
                    processing_days=n.get("processing_days"),
                    official_source_url=n["official_source_url"],
                    office_name=n.get("office_name"),
                    office_address=n.get("office_address"),
                    contact_designation=n.get("contact_designation"),
                    confidence=n.get("confidence", 0.0),
                    eligibility_criteria=n.get("eligibility_criteria", []),
                    application_url=n.get("application_url", ""),
                )
            )

    return steps


def compute_totals(steps: list[RoadmapStep]) -> tuple[float, int]:
    """Sum fees and processing_days across all steps."""
    total_cost = sum(s.fee or 0 for s in steps)
    total_days = sum(s.processing_days or 0 for s in steps)
    return total_cost, total_days
