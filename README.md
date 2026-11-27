# 🏛️ Nagrik Marg — Civic Task Navigator

> **PS ID: PSWB02** | TSEC Internal Hackathon 2026-27 | Computer Engineering Dept

**"Government portals answer questions once you already know the exact service name. We built the opposite."**

A citizen types what they actually want in plain language — _"I want to start a home-based food business in Thane"_ — and Nagrik Marg returns an **ordered, personalized, jurisdiction-aware roadmap** of every step, document, fee, and office involved, grounded in real official sources.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Task-first query** | Natural-language input — no need to know the exact government service name |
| **Personalized roadmaps** | Applicant profile (age, business type, turnover, state, city) changes which steps appear |
| **Jurisdiction-aware** | Same task, different state/city → different fees, forms, and offices |
| **Grounded, not hallucinated** | Every step traces to a cited official source URL |
| **Honest about gaps** | Shows a confidence score; says "insufficient coverage" instead of making things up |
| **Cost + time upfront** | Sums all fees and processing days across the entire roadmap |
| **Clarifying questions** | 3–4 dynamic questions to refine the result before showing the roadmap |
| **Admin dashboard** | Review queue to approve, edit, reject, or archive extracted service data |
| **New Schemes feed** | Government schemes filtered by the citizen's eligibility profile |
| **LLM extraction pipeline** | Crawls official government pages and extracts structured service data via GPT |

---

## 🏗️ Architecture

```
┌──────────────────────── CITIZEN FLOW ────────────────────────┐
│                                                              │
│  Task text ──► Embedding search ──► Clarifying Qs ──►        │
│  Profile + Graph query ──► Topological sort ──► Roadmap      │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────── INGESTION PIPELINE ──────────────────────┐
│                                                              │
│  Gov. source pages ──► Crawler ──► LLM extraction ──►        │
│  Admin review queue ──► Approved nodes → Knowledge graph     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Two pipelines, cleanly separated:**

1. **Ingestion** (offline): Official source → scoped crawler → LLM-based structured extraction → admin review → knowledge graph
2. **Query** (live): Task text → embedding retrieval → clarify → graph query → topological sort → ordered roadmap

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Vite 8 |
| **Backend** | Python + FastAPI |
| **Graph Database** | Neo4j AuraDB (cloud) |
| **Graph Algorithms** | NetworkX (topological sort on matched subgraph) |
| **Embeddings** | `sentence-transformers` (`all-MiniLM-L6-v2`, in-memory) |
| **LLM Extraction** | OpenAI GPT-4o-mini |
| **Data Validation** | Pydantic v2 |

---

## 📁 Project Structure

```
intornol/
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI entrypoint
│   │   ├── routers/
│   │   │   ├── query.py               # /api/query, /api/clarify
│   │   │   ├── admin.py               # /api/admin/queue, /api/admin/review, /api/graph/*
│   │   │   └── schemes.py             # /api/schemes/new
│   │   ├── graph/
│   │   │   ├── neo4j_client.py        # Neo4j driver wrapper + CRUD
│   │   │   └── subgraph_ops.py        # NetworkX topological sort
│   │   ├── retrieval/
│   │   │   └── embeddings.py          # In-memory sentence-transformer index
│   │   ├── extraction/
│   │   │   ├── crawler.py             # Scoped government site crawler
│   │   │   ├── llm_extractor.py       # GPT-based structured JSON extraction
│   │   │   └── source_registry.json   # Crawl target registry
│   │   └── models/
│   │       └── schema.py              # Pydantic models (ServiceNode, edges, API contracts)
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── data/
│   ├── seed_services/                 # Curated service data per city/task
│   │   ├── thane_food_business.json
│   │   └── crawled_data.json
│   └── document_images/
├── docs/
│   ├── PROJECT_MASTER_DOC.md
│   ├── BACKEND_DOC.md
│   ├── FRONTEND_DOC.md
│   └── TECHNICAL_DEEPDIVE.md
└── presentation/
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Neo4j AuraDB account (free tier) — _optional, works with in-memory seed data_
- OpenAI API key — _optional, only needed for the LLM extraction pipeline_

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Neo4j and OpenAI credentials (optional)

# Run the server
uvicorn backend.app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The frontend runs on `http://localhost:5173` and the API on `http://localhost:8000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/query` | Submit a task in natural language; returns clarifying questions or a roadmap |
| `POST` | `/api/clarify` | Answer clarifying questions; returns the final roadmap |
| `GET` | `/api/admin/queue` | List pending review items (filterable by status) |
| `POST` | `/api/admin/review` | Approve, edit, reject, or archive a service node |
| `GET` | `/api/graph/{node_id}` | Get full detail for a single service node |
| `POST` | `/api/graph/subgraph` | Get the dependency subgraph for matched services |
| `GET` | `/api/schemes/new` | Get government schemes ranked by applicant eligibility |

### Example — Query

```bash
curl -X POST http://localhost:8000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "task_text": "I want to start a home-based food business in Thane",
    "applicant_profile": {
      "state": "Maharashtra",
      "city": "Thane"
    }
  }'
```

**Response** — returns either `clarifying_questions` (if profile is incomplete) or a full `roadmap` with ordered steps, fees, processing days, documents, and source URLs.

---

## 📊 Data Model

### Service Node

Each government service/step is modeled as a node with:

- **Identity**: `id`, `name`, `citizen_friendly_label`
- **Classification**: `category`, `jurisdiction_level` (central/state/municipal/local), `applicable_region`
- **Logistics**: `mode` (online/offline/hybrid), `fee`, `processing_days`, `documents_required`
- **Source**: `official_source_url`, `office_name`, `office_address`
- **Quality**: `confidence` score, `status` (pending_review/approved/rejected/archived), `version_history`
- **Eligibility**: `eligibility_criteria[]`, `application_url`

### Edge Types

| Edge | Meaning |
|---|---|
| `PREREQUISITE_FOR` | Source must be completed before target |
| `REQUIRES` | Source requires the target |
| `ISSUED_BY` | Document is issued by this office |
| `ELIGIBLE_IF` | Conditional eligibility edge |
| `ALTERNATIVE_TO` | Alternative path to the same goal |

---

## 🔍 How It Works

1. **Citizen submits a task** in plain language (e.g., _"start a food business in Thane"_)
2. **Location is auto-detected** from the query text
3. **Embedding similarity search** matches the query against indexed services using `all-MiniLM-L6-v2`
4. **Clarifying questions** are asked if the applicant profile is incomplete (premises type, ownership, food type, turnover)
5. **Seed data is filtered** by jurisdiction level and applicable region based on the profile
6. **NetworkX topological sort** orders services by their dependency edges into a step-by-step roadmap
7. **Roadmap is returned** with total cost, total days, and per-step details including source URLs

---

## 🌱 Seed Data

The project ships with curated seed data for:

- **Thane, Maharashtra** — Home food business registration flow (7 services, 10 dependency edges)
- Covers: Aadhaar → Address Proof → FSSAI Registration → Udyam (MSME) → Shop & Establishment → Trade License → GST Registration

The crawler (`extraction/crawler.py`) can expand coverage by crawling official government domains:
- `services.india.gov.in`
- `thanecorporation.gov.in`

---

## 🧪 Running the Crawler

> Requires an OpenAI API key set in `.env`.

```bash
cd backend
python -m backend.app.extraction.crawler
```

This crawls up to 25 pages from the registered government domains, extracts structured service data via GPT, and saves results to `data/seed_services/crawled_data.json`.

---

## 📄 Documentation

Detailed documentation is available in the [`docs/`](docs/) directory:

- [**PROJECT_MASTER_DOC.md**](docs/PROJECT_MASTER_DOC%20(1).md) — Full project overview, architecture, schema, and team plan
- [**BACKEND_DOC.md**](docs/BACKEND_DOC.md) — Backend implementation guide
- [**FRONTEND_DOC.md**](docs/FRONTEND_DOC.md) — Frontend implementation guide
- [**TECHNICAL_DEEPDIVE.md**](docs/TECHNICAL_DEEPDIVE.md) — Plain-language explanations of Neo4j, embeddings, cosine similarity, and topological sort

---

## 🤝 Team

Built for the **TSEC Internal Hackathon 2026-27** by Computer Engineering students.

---

## 📜 License

This project was built for a hackathon. See the team for licensing details.
