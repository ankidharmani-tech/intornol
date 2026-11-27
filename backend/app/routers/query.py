"""
query.py — /api/query and /api/clarify endpoints.

Flow per BACKEND_DOC.md:
  POST /api/query  { task_text, applicant_profile }
    → if profile incomplete → { clarifying_questions }
    → if profile complete   → { roadmap }

  POST /api/clarify { session_id, answers[] }
    → { roadmap }
"""

from __future__ import annotations

import json
import os
import uuid
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, HTTPException

from backend.app.graph.subgraph_ops import build_ordered_roadmap, compute_totals
from backend.app.models.schema import (
    ApplicantProfile,
    ClarifyAnswer,
    ClarifyingQuestion,
    ClarifyRequest,
    QueryRequest,
    QueryResponse,
    RoadmapResponse,
)
from backend.app.retrieval import embeddings

router = APIRouter(prefix="/api", tags=["query"])

# ── In-memory session store (no auth per spec) ──────────────────────
_sessions: dict[str, dict] = {}

# ── Seed data cache ─────────────────────────────────────────────────
_seed_data: dict[str, dict] = {}


def _load_seed_data():
    """Load all seed JSON files from data/seed_services/."""
    global _seed_data
    seed_dir = Path(__file__).resolve().parents[3] / "data" / "seed_services"
    if not seed_dir.exists():
        return
    for f in seed_dir.glob("*.json"):
        with open(f, "r", encoding="utf-8") as fh:
            data = json.load(fh)
            key = f"{data.get('city', 'unknown')}_{data.get('task', 'unknown')}".lower()
            _seed_data[key] = data

    # Index all services for embedding search
    all_services = []
    for data in _seed_data.values():
        all_services.extend(data.get("services", []))
    if all_services:
        embeddings.index_many(all_services)


def _get_seed_for_profile(profile: Optional[ApplicantProfile]) -> Optional[dict]:
    """Find the best matching seed data for an applicant profile."""
    if not _seed_data:
        _load_seed_data()
    if not _seed_data:
        return None

    if profile and profile.city:
        for key, data in _seed_data.items():
            if profile.city.lower() in key:
                return data

    # Fallback: return first available
    return next(iter(_seed_data.values()), None)


def _detect_location(task_text: str) -> tuple[Optional[str], Optional[str]]:
    """Simple keyword-based location extraction from task text."""
    text_lower = task_text.lower()

    # Known cities (expand as seed data grows)
    cities = {
        "thane": ("Thane", "Maharashtra"),
        "mumbai": ("Mumbai", "Maharashtra"),
        "pune": ("Pune", "Maharashtra"),
        "navi mumbai": ("Navi Mumbai", "Maharashtra"),
    }
    for keyword, (city, state) in cities.items():
        if keyword in text_lower:
            return city, state

    return None, None


def _determine_questions(seed: dict, profile: Optional[ApplicantProfile]) -> list[ClarifyingQuestion]:
    """Return clarifying questions from seed data, filtered by what's already answered."""
    questions_data = seed.get("clarifying_questions", [])
    result = []
    for q in questions_data:
        # Skip if the profile already has this field answered
        if profile:
            existing_val = getattr(profile, q["field"], None)
            if existing_val:
                continue
        result.append(ClarifyingQuestion(**q))
    return result


def _build_roadmap_from_seed(
    seed: dict,
    profile: Optional[ApplicantProfile],
) -> RoadmapResponse:
    """Build an ordered roadmap from seed data using topological sort."""
    nodes = seed.get("services", [])
    edges = seed.get("edges", [])

    # Filter nodes by jurisdiction / region if profile has location info
    if profile and profile.city:
        filtered_nodes = []
        for n in nodes:
            region = n.get("applicable_region")
            if region is None:
                filtered_nodes.append(n)
            elif region.lower() == profile.city.lower():
                filtered_nodes.append(n)
            elif region.lower() == (profile.state or "").lower():
                filtered_nodes.append(n)
        nodes = filtered_nodes if filtered_nodes else nodes

    steps = build_ordered_roadmap(nodes, edges)
    total_cost, total_days = compute_totals(steps)

    return RoadmapResponse(
        roadmap=steps,
        total_cost=total_cost,
        total_days_estimate=total_days,
    )


# ── Endpoints ───────────────────────────────────────────────────────


@router.post("/query", response_model=QueryResponse)
async def query_task(req: QueryRequest):
    """
    Citizen sends a task description.
    Returns clarifying questions if profile is incomplete,
    or a full roadmap if it's complete enough.
    """
    # Ensure seed data is loaded
    if not _seed_data:
        _load_seed_data()

    session_id = str(uuid.uuid4())
    profile = req.applicant_profile

    # Try to detect location from the task text
    detected_city, detected_state = _detect_location(req.task_text)
    if detected_city:
        if profile:
            if not profile.city:
                profile.city = detected_city
            if not profile.state:
                profile.state = detected_state or ""
        else:
            profile = ApplicantProfile(
                state=detected_state or "",
                city=detected_city,
            )

    # Find matching seed data
    seed = _get_seed_for_profile(profile)
    if not seed:
        raise HTTPException(
            status_code=404,
            detail="No data available for this task and location yet. We're expanding coverage — this is an honest gap.",
        )

    # Store session
    _sessions[session_id] = {
        "task_text": req.task_text,
        "profile": profile.model_dump() if profile else {},
        "seed_key": f"{seed.get('city', '')}_{seed.get('task', '')}".lower(),
    }

    # Check if we need clarifying questions
    questions = _determine_questions(seed, profile)
    if questions:
        return QueryResponse(
            clarifying_questions=questions,
            session_id=session_id,
        )

    # Profile is complete enough — return roadmap directly
    roadmap = _build_roadmap_from_seed(seed, profile)
    roadmap.session_id = session_id
    return QueryResponse(
        roadmap=roadmap,
        session_id=session_id,
    )


@router.post("/clarify", response_model=QueryResponse)
async def clarify_answers(req: ClarifyRequest):
    """
    Citizen answers clarifying questions.
    Updates the profile and returns the roadmap.
    """
    session = _sessions.get(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Update profile with answers
    profile_data = session.get("profile", {})
    for answer in req.answers:
        # Map answer to profile field (the question's `field` tells us which)
        # We need the seed data to know the field mapping
        seed_key = session.get("seed_key", "")
        seed = _seed_data.get(seed_key)
        if seed:
            for q in seed.get("clarifying_questions", []):
                if q["id"] == answer.question_id:
                    profile_data[q["field"]] = answer.answer
                    break

    profile = ApplicantProfile(**profile_data)
    session["profile"] = profile.model_dump()

    # Build roadmap
    seed = _seed_data.get(session.get("seed_key", ""))
    if not seed:
        raise HTTPException(status_code=404, detail="Seed data lost")

    roadmap = _build_roadmap_from_seed(seed, profile)
    roadmap.session_id = req.session_id

    return QueryResponse(
        roadmap=roadmap,
        session_id=req.session_id,
    )
