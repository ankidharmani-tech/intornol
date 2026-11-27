"""
Pydantic models — locked to the schema in BACKEND_DOC.md + the two
additional fields (eligibility_criteria, application_url) that must
travel end-to-end from extraction → Neo4j → API response → UI card.
"""

from __future__ import annotations

import uuid
from datetime import date
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


# ── Enums ────────────────────────────────────────────────────────────

class JurisdictionLevel(str, Enum):
    central = "central"
    state = "state"
    municipal = "municipal"
    local = "local"


class ServiceMode(str, Enum):
    online = "online"
    offline = "offline"
    hybrid = "hybrid"


class ReviewStatus(str, Enum):
    pending_review = "pending_review"
    approved = "approved"
    rejected = "rejected"
    archived = "archived"


class EdgeType(str, Enum):
    REQUIRES = "REQUIRES"
    PREREQUISITE_FOR = "PREREQUISITE_FOR"
    ISSUED_BY = "ISSUED_BY"
    ELIGIBLE_IF = "ELIGIBLE_IF"
    ALTERNATIVE_TO = "ALTERNATIVE_TO"


class ReviewAction(str, Enum):
    approve = "approve"
    edit = "edit"
    reject = "reject"
    archive = "archive"


# ── Core data models ────────────────────────────────────────────────

class VersionEntry(BaseModel):
    timestamp: str
    changed_by: str = "admin"
    old_value: dict = {}
    new_value: dict = {}


class ServiceNode(BaseModel):
    """Exact shape stored in Neo4j and returned in every API response."""

    id: str
    name: str
    citizen_friendly_label: str
    category: str
    jurisdiction_level: JurisdictionLevel
    applicable_region: Optional[str] = None
    mode: ServiceMode
    documents_required: list[str] = []
    fee: Optional[float] = None
    processing_days: Optional[int] = None
    official_source_url: str
    office_name: Optional[str] = None
    office_address: Optional[str] = None
    contact_designation: Optional[str] = None
    confidence: float = 0.0
    status: ReviewStatus = ReviewStatus.pending_review
    date_added: str = Field(default_factory=lambda: date.today().isoformat())
    version_history: list[VersionEntry] = []

    # ── NEW required fields ──────────────────────────────────────────
    eligibility_criteria: list[str] = []
    application_url: str = ""


class GraphEdge(BaseModel):
    source: str
    target: str
    edge_type: EdgeType
    properties: dict = {}


# ── API request / response models ───────────────────────────────────

class ApplicantProfile(BaseModel):
    state: str
    city: str
    age: Optional[int] = None
    business_premises: Optional[str] = None
    ownership: Optional[str] = None
    food_type: Optional[str] = None
    annual_turnover_bracket: Optional[str] = None


class ClarifyingQuestion(BaseModel):
    id: str
    question: str
    options: list[str] = []
    field: str  # which ApplicantProfile field this populates


class QueryRequest(BaseModel):
    task_text: str
    applicant_profile: Optional[ApplicantProfile] = None


class ClarifyAnswer(BaseModel):
    question_id: str
    answer: str


class ClarifyRequest(BaseModel):
    session_id: str
    answers: list[ClarifyAnswer]


class RoadmapStep(BaseModel):
    """Single step in the ordered roadmap returned to the frontend."""

    id: str
    name: str
    citizen_friendly_label: str
    mode: ServiceMode
    documents_required: list[str] = []
    fee: Optional[float] = None
    processing_days: Optional[int] = None
    official_source_url: str
    office_name: Optional[str] = None
    office_address: Optional[str] = None
    contact_designation: Optional[str] = None
    confidence: float = 0.0

    # ── MUST be present on every step card in the UI ─────────────────
    eligibility_criteria: list[str] = []
    application_url: str = ""


class RoadmapResponse(BaseModel):
    roadmap: list[RoadmapStep]
    total_cost: float = 0.0
    total_days_estimate: int = 0
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))


class QueryResponse(BaseModel):
    """Union-like: returns EITHER clarifying_questions OR a roadmap."""

    clarifying_questions: Optional[list[ClarifyingQuestion]] = None
    roadmap: Optional[RoadmapResponse] = None
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))


class AdminReviewRequest(BaseModel):
    node_id: str
    action: ReviewAction
    edits: Optional[dict] = None


class SubgraphRequest(BaseModel):
    matched_service_ids: list[str]
    applicant_profile: ApplicantProfile
