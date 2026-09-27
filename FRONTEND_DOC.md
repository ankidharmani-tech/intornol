# Frontend Doc — Nagrik Marg (PSWB02)

*Self-contained — paste just this into your own AI assistant tonight if you need help.*

---

## Project Context

We're building a **task-first civic navigator**. A citizen types a task in plain
language ("I want to start a home-based food business in Thane"), sees 3–4
clarifying questions, then gets an ordered, visual roadmap of every step involved —
documents, fees, offices — sourced from real government pages.

**PS ID:** PSWB02. **Deadline:** present tomorrow morning — tonight (from 3:15 PM)
is the whole build window.

**Why this matters (say it in the demo too):** existing tools (ServicePlus, UMANG)
are service-first — you need to already know the service name. We're task-first.

---

## What You Own

The entire citizen-facing UI:
1. **QueryBox** — task input, shows detected location if found in the text.
2. **ClarifyingQuestions** — renders 3–4 dynamic questions from the backend.
3. **RoadmapView** — the visual step-by-step roadmap (use `react-flow`).
4. **DocumentGuide** — panel/modal showing a document's reference image + caption.
5. **State/city switcher** — changes the applicant profile, re-fetches the roadmap.
6. **AdminDashboard** (basic) — review queue list + approve/edit/reject buttons.

---

## Build Against Fixtures First — Don't Wait on Backend

Use this fixture JSON as your data shape from minute one. Backend will match this
exactly, so nothing needs rewriting when the integration lead swaps fixtures for
real API calls.

```json
{
  "roadmap": [
    {
      "id": "svc_fssai_basic_reg",
      "name": "FSSAI Basic Registration",
      "citizen_friendly_label": "Food safety registration (small business)",
      "mode": "online",
      "documents_required": ["doc_aadhaar", "doc_address_proof"],
      "fee": 100,
      "processing_days": 7,
      "official_source_url": "https://...",
      "office_name": null,
      "confidence": 0.92
    },
    {
      "id": "svc_trade_license_thane",
      "name": "Trade License",
      "citizen_friendly_label": "Permission to run your business from this address",
      "mode": "offline",
      "documents_required": ["doc_shop_photo", "doc_rent_agreement"],
      "fee": 500,
      "processing_days": 15,
      "official_source_url": "https://...",
      "office_name": "Thane Municipal Corporation",
      "office_address": "...",
      "contact_designation": "Public Information Officer, TMC",
      "confidence": 0.87
    }
  ],
  "total_cost": 600,
  "total_days_estimate": 22
}
```

`mode` is `online` / `offline` / `hybrid` — **style these differently** (different
icon/color) in `RoadmapView`. This visual distinction is one of our USPs — most
tools assume everything's a form you fill from your phone; we don't.

---

## Core API Contract (what you'll call once integration wires it up)

```
POST /api/query    { task_text, applicant_profile } -> { clarifying_questions[] } OR { roadmap }
POST /api/clarify  { session_id, answers[] }         -> { roadmap }
GET  /api/schemes/new { applicant_profile }           -> ranked new schemes
GET  /api/admin/queue                                  -> pending review items
POST /api/admin/review { node_id, action, edits? }    -> updated node
```

### Applicant Profile shape (you collect this via ClarifyingQuestions)
```json
{ "state": "Maharashtra", "city": "Thane", "age": 29,
  "business_premises": "home", "ownership": "rented",
  "food_type": "packaged_snacks", "annual_turnover_bracket": "under_12L" }
```

---

## react-flow — quick primer if you haven't used it

`react-flow` renders nodes and edges as an interactive diagram — exactly what a
step-by-step roadmap needs. Basic shape:

```jsx
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = roadmap.map((step, i) => ({
  id: step.id,
  position: { x: 250, y: i * 120 },
  data: { label: step.citizen_friendly_label },
  style: { background: step.mode === 'offline' ? '#f0d9b5' : '#d9f0e8' }
}));

const edges = roadmap.slice(1).map((step, i) => ({
  id: `e${i}`,
  source: roadmap[i].id,
  target: step.id
}));

<ReactFlow nodes={nodes} edges={edges} fitView />
```
Vertical layout (one step below the next) reads most naturally for a linear
roadmap — don't overcomplicate the layout algorithm, this is enough for the demo.

---

## Folder Structure — Your Part

```
frontend/
├── src/
│   ├── components/
│   │   ├── QueryBox/
│   │   ├── ClarifyingQuestions/
│   │   ├── RoadmapView/        (react-flow lives here)
│   │   ├── DocumentGuide/
│   │   ├── SchemesFeed/
│   │   └── AdminDashboard/
│   ├── hooks/
│   ├── services/api.js         (swap fixtures for real calls here, one file)
│   └── App.jsx
└── public/assets/document-images/   (design teammate drops files here)
```

---

## Tonight's Timeline — Your Rows

| Time | You do this |
|---|---|
| 15:15–15:45 | Lock schema/contract with the team. |
| 15:45–17:00 | Scaffold React app, build QueryBox against the fixture above. |
| 17:15–19:00 | RoadmapView (react-flow) + ClarifyingQuestions, still on fixtures. |
| 19:00–19:30 | Dinner. |
| 19:40–21:30 | State/city switcher UI. DocumentGuide panel wired to fixture images. |
| 21:30–21:45 | Group test — swap in real API for task 1, fix what breaks. |
| 21:45–23:30 | Polish, error/loading states, fix bugs from group test. |
| 00:00–01:30 | Should-have: AdminDashboard basic view, SchemesFeed UI — only if on schedule. |
| 01:30 | **Feature freeze.** Polish only. |
| 02:00–03:00 | Bug fixes only. |
| 03:30 onward | Join rehearsals — you'll likely be the one clicking through the live demo. |

**If behind schedule, cut in this order:** AdminDashboard fancy styling (keep it
functional/plain) → SchemesFeed → DocumentGuide images (fall back to text names)
→ 2nd city switch UI. Never cut: QueryBox → ClarifyingQuestions → RoadmapView —
that's the entire demo.

Read `TECHNICAL_DEEPDIVE.md` if you want to understand what's actually happening
behind the API calls you're making — useful if a judge asks you directly and the
backend teammate isn't standing next to you.
