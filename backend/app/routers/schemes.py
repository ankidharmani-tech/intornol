"""
schemes.py — /api/schemes/new endpoint per BACKEND_DOC.md.

Returns new scheme nodes filtered/ranked by applicant eligibility.
"""

from __future__ import annotations

import json
from pathlib import Path

from fastapi import APIRouter

from backend.app.models.schema import ApplicantProfile

router = APIRouter(prefix="/api/schemes", tags=["schemes"])

# ── Placeholder scheme data (extend with real schemes later) ────────

_SCHEMES = [
    {
        "id": "scheme_pmfme",
        "name": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
        "citizen_friendly_label": "Get up to ₹10 lakh subsidy for food processing equipment",
        "category": "food_business",
        "jurisdiction_level": "central",
        "applicable_region": None,
        "mode": "online",
        "documents_required": ["doc_aadhaar", "doc_udyam_certificate"],
        "fee": 0,
        "processing_days": 30,
        "official_source_url": "https://pmfme.mofpi.gov.in/",
        "office_name": "Ministry of Food Processing Industries",
        "office_address": None,
        "contact_designation": None,
        "confidence": 0.85,
        "status": "approved",
        "date_added": "2026-09-27",
        "version_history": [],
        "eligibility_criteria": [
            "Existing micro food processing units",
            "Annual turnover under ₹25 lakh",
            "Must have Udyam registration",
            "Priority for women, SC/ST entrepreneurs"
        ],
        "application_url": "https://pmfme.mofpi.gov.in/"
    },
    {
        "id": "scheme_mudra_shishu",
        "name": "MUDRA Shishu Loan",
        "citizen_friendly_label": "Get up to ₹50,000 business loan without collateral",
        "category": "finance",
        "jurisdiction_level": "central",
        "applicable_region": None,
        "mode": "hybrid",
        "documents_required": ["doc_aadhaar", "doc_pan_card", "doc_business_plan"],
        "fee": 0,
        "processing_days": 14,
        "official_source_url": "https://www.mudra.org.in/",
        "office_name": "Any bank branch",
        "office_address": None,
        "contact_designation": "Branch Manager",
        "confidence": 0.88,
        "status": "approved",
        "date_added": "2026-09-27",
        "version_history": [],
        "eligibility_criteria": [
            "Non-corporate, non-farm small/micro enterprises",
            "Loan amount up to ₹50,000",
            "No collateral required",
            "Available through any bank, NBFC, or MFI"
        ],
        "application_url": "https://www.mudra.org.in/"
    }
]


@router.get("/new")
async def new_schemes(
    state: str = "",
    city: str = "",
    age: int = 0,
    business_premises: str = "",
    food_type: str = "",
    annual_turnover_bracket: str = "",
):
    """
    GET /api/schemes/new { applicant_profile fields as query params }
    → ranked new schemes filtered by eligibility match.
    """
    schemes = []
    for s in _SCHEMES:
        # Basic region filtering
        region = s.get("applicable_region")
        if region and state and region.lower() != state.lower():
            continue
        schemes.append(s)

    # Rank by confidence (simple ranking for MVP)
    schemes.sort(key=lambda x: x.get("confidence", 0), reverse=True)

    return {
        "schemes": schemes,
        "total": len(schemes),
    }
