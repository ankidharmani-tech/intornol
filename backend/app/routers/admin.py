"""
admin.py — /api/admin/queue and /api/admin/review + /api/graph/subgraph
endpoints per BACKEND_DOC.md.

For the hackathon demo, the admin queue works against seed data in-memory
when Neo4j isn't connected; switches to real Neo4j calls when credentials
are set.
"""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, HTTPException

from backend.app.models.schema import (
    AdminReviewRequest,
    ReviewAction,
    ReviewStatus,
    ServiceNode,
    SubgraphRequest,
    VersionEntry,
)

router = APIRouter(tags=["admin"])

# ── In-memory store for demo (mirrors Neo4j when not connected) ─────
_admin_store: dict[str, ServiceNode] = {}


def _ensure_store_loaded():
    """Load seed data into admin store if empty."""
    if _admin_store:
        return
    seed_dir = Path(__file__).resolve().parents[3] / "data" / "seed_services"
    if not seed_dir.exists():
        return
    for f in seed_dir.glob("*.json"):
        with open(f, "r", encoding="utf-8") as fh:
            data = json.load(fh)
            for svc_data in data.get("services", []):
                svc = ServiceNode(**svc_data)
                _admin_store[svc.id] = svc


# ── Admin endpoints ─────────────────────────────────────────────────


@router.get("/api/admin/queue")
async def admin_queue(status: Optional[str] = None):
    """
    GET /api/admin/queue → pending review items, newest first.
    Optionally filter by status query param.
    """
    _ensure_store_loaded()

    items = list(_admin_store.values())

    if status:
        items = [i for i in items if i.status == status]
    else:
        # Default: show pending_review items
        items = [i for i in items if i.status == ReviewStatus.pending_review]

    # Sort newest first
    items.sort(key=lambda x: x.date_added, reverse=True)

    return {
        "items": [item.model_dump() for item in items],
        "total": len(items),
    }


@router.post("/api/admin/review")
async def admin_review(req: AdminReviewRequest):
    """
    POST /api/admin/review { node_id, action, edits? }
    → updated node, appended to version_history if edited.
    """
    _ensure_store_loaded()

    svc = _admin_store.get(req.node_id)
    if not svc:
        raise HTTPException(status_code=404, detail=f"Service node '{req.node_id}' not found")

    # Build version history entry
    old_status = svc.status
    version_entry = VersionEntry(
        timestamp=datetime.now().isoformat(),
        changed_by="admin",
        old_value={"status": old_status},
        new_value={},
    )

    # Apply action
    if req.action == ReviewAction.approve:
        svc.status = ReviewStatus.approved
        version_entry.new_value = {"status": "approved"}

    elif req.action == ReviewAction.reject:
        svc.status = ReviewStatus.rejected
        version_entry.new_value = {"status": "rejected"}

    elif req.action == ReviewAction.archive:
        svc.status = ReviewStatus.archived
        version_entry.new_value = {"status": "archived"}

    elif req.action == ReviewAction.edit:
        if not req.edits:
            raise HTTPException(status_code=400, detail="Edits required for 'edit' action")

        # Record old values
        version_entry.old_value.update(
            {k: getattr(svc, k, None) for k in req.edits.keys()}
        )
        version_entry.new_value = {"status": "approved", **req.edits}

        # Apply edits
        for key, val in req.edits.items():
            if hasattr(svc, key):
                setattr(svc, key, val)
        svc.status = ReviewStatus.approved

    # Append version history
    svc.version_history.append(version_entry)
    _admin_store[svc.id] = svc

    return {
        "node": svc.model_dump(),
        "message": f"Node '{req.node_id}' {req.action}d successfully",
    }


# ── Graph subgraph endpoint ────────────────────────────────────────


@router.get("/api/graph/{node_id}")
async def get_node_detail(node_id: str):
    """GET /api/graph/:node_id → node detail."""
    _ensure_store_loaded()

    svc = _admin_store.get(node_id)
    if not svc:
        raise HTTPException(status_code=404, detail=f"Service node '{node_id}' not found")

    return svc.model_dump()


@router.post("/api/graph/subgraph")
async def get_subgraph(req: SubgraphRequest):
    """
    POST /api/graph/subgraph { matched_service_ids[], applicant_profile }
    → { nodes[], edges[] } filtered by jurisdiction + region.
    """
    _ensure_store_loaded()

    # Load edges from seed data
    seed_dir = Path(__file__).resolve().parents[3] / "data" / "seed_services"
    all_edges = []
    for f in seed_dir.glob("*.json"):
        with open(f, "r", encoding="utf-8") as fh:
            data = json.load(fh)
            all_edges.extend(data.get("edges", []))

    # Filter nodes: find all nodes reachable from matched_service_ids
    # via the dependency chain
    relevant_ids = set(req.matched_service_ids)

    # Walk dependency edges to find prerequisites
    changed = True
    while changed:
        changed = False
        for e in all_edges:
            if e["target"] in relevant_ids and e["source"] not in relevant_ids:
                relevant_ids.add(e["source"])
                changed = True

    # Filter by region
    nodes = []
    for nid in relevant_ids:
        svc = _admin_store.get(nid)
        if not svc:
            continue
        if svc.applicable_region is None:
            nodes.append(svc.model_dump())
        elif svc.applicable_region.lower() == req.applicant_profile.city.lower():
            nodes.append(svc.model_dump())
        elif svc.applicable_region.lower() == req.applicant_profile.state.lower():
            nodes.append(svc.model_dump())

    # Filter edges to only include relevant ones
    filtered_edges = [
        e for e in all_edges
        if e["source"] in relevant_ids and e["target"] in relevant_ids
    ]

    return {
        "nodes": nodes,
        "edges": filtered_edges,
    }
