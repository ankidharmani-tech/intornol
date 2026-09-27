# Backend Doc — Nagrik Marg (PSWB02)

*This doc is self-contained — if you're pasting this into your own AI assistant for
help tonight, it already has everything it needs to know about the project.*

---

## Project Context

We're building a **task-first civic navigator**. A citizen types a task in plain
language ("I want to start a home-based food business in Thane"), the app asks a
few clarifying questions, then returns an ordered, personalized roadmap of every
form/document/fee/office involved — grounded in real official government sources.

**PS ID:** PSWB02 (Municipal Bureaucracy Path Visualizer). **Deadline:** present
tomorrow morning, so tonight (starting 3:15 PM) is the entire build window.

**Why this beats existing tools:** ServicePlus and UMANG are service-first — you
must already know the exact service name. We're task-first: type what you want,
we figure out which services and what order.

**The full pipeline (you own the middle two-thirds of this):**
```
task text → [embeddings match to relevant services] → clarifying Qs →
[YOU: query Neo4j for the dependency subgraph] → [topological sort orders it] →
roadmap shown to citizen
```

---

## What You Own

1. **Neo4j AuraDB setup** — the graph database holding every service node.
2. **Extraction pipeline** — turning raw government text into structured graph data.
3. **Seed data curation** — manually gathering source text for 2 cities × 2–3 tasks.
4. **Admin review dashboard backend** — approve/edit/reject/archive queue.
5. **Graph query + subgraph extraction endpoints** for the integration lead to call.

---

## Data Schema (do not deviate from this — locked at kickoff)

### Service Node
```json
{
  "id": "svc_fssai_basic_reg",
  "name": "FSSAI Basic Registration",
  "citizen_friendly_label": "Food safety registration (small business)",
  "category": "food_business",
  "jurisdiction_level": "central",
  "applicable_region": null,
  "mode": "online",
  "documents_required": ["doc_aadhaar", "doc_address_proof"],
  "fee": 100,
  "processing_days": 7,
  "official_source_url": "https://...",
  "office_name": null,
  "office_address": null,
  "contact_designation": null,
  "confidence": 0.92,
  "status": "pending_review",
  "date_added": "2026-09-27",
  "version_history": []
}
```
`jurisdiction_level` is one of: `central` / `state` / `municipal` / `local`.
`mode` is one of: `online` / `offline` / `hybrid`.
`status` is one of: `pending_review` / `approved` / `rejected` / `archived`.

### Edge types
`REQUIRES`, `PREREQUISITE_FOR`, `ISSUED_BY`, `ELIGIBLE_IF`, `ALTERNATIVE_TO`

### Applicant Profile (comes from frontend, you filter graph queries by this)
```json
{ "state": "Maharashtra", "city": "Thane", "age": 29,
  "business_premises": "home", "ownership": "rented",
  "food_type": "packaged_snacks", "annual_turnover_bracket": "under_12L" }
```

---

## API Endpoints You Build

```
GET  /api/graph/subgraph   { matched_service_ids[], applicant_profile }
     -> { nodes[], edges[] }   (filtered by jurisdiction + eligibility rules)

GET  /api/admin/queue      -> pending_review items, newest first

POST /api/admin/review     { node_id, action: approve|edit|reject|archive, edits? }
     -> updated node, appended to version_history if edited

GET  /api/schemes/new      { applicant_profile }
     -> new-scheme nodes ranked by eligibility match
```

---

## How To Build the Extraction Pipeline (concrete steps)

1. Pick your source text for one task (e.g. FSSAI Basic Registration description
   from services.india.gov.in or the relevant department page).
2. Prompt template (fill in and send to your LLM API of choice):
   ```
   You will be given raw text from an official Indian government service page.
   Extract ONLY information explicitly present into this JSON shape:
   { "name": "", "documents_required": [], "fee": null, "processing_days": null,
     "office_name": null, "official_source_url": "" }
   If a field isn't mentioned, use null — never guess or infer.
   Text: <paste source text>
   ```
3. Parse the returned JSON, attach a `confidence` score (you can start with a fixed
   0.9 if the LLM doesn't self-report one, or ask it to include one), set
   `status: "pending_review"`, insert into Neo4j via Cypher `MERGE`.
4. Repeat per service. This is the single most time-critical task tonight — **start
   it in the first 30 minutes**, don't wait for the schema discussion to fully end.

### Cypher insert pattern
```cypher
MERGE (s:Service {id: $id})
SET s.name = $name, s.fee = $fee, s.processing_days = $processing_days,
    s.jurisdiction_level = $jurisdiction_level, s.applicable_region = $region,
    s.status = "pending_review", s.confidence = $confidence
```

### The dependency-chain query the integration lead will call through you
```cypher
MATCH path = (start:Service)-[:PREREQUISITE_FOR*1..6]->(target:Service {id: $target_id})
WHERE start.applicable_region IN [$region, null]
RETURN path
```

---

## Seed Data Plan — Be Realistic About Scope

Do **NOT** try to cover every task. Curate exactly:
- **2 cities** (e.g. Thane and one other, both Maharashtra to start — a second
  state only if you're ahead of schedule)
- **2–3 tasks per city** (home-based food business, shop & establishment
  registration, one more if time allows)

For each task, manually collect (don't live-scrape) the source text from:
- services.india.gov.in (search the task, copy the service description page)
- The relevant municipal corporation page for trade license / local steps
- The relevant state department page for Shop & Establishment Act registration

Keep every source URL — you need it in `official_source_url` for the "grounded,
not hallucinated" USP.

---

## Tonight's Timeline — Your Rows

| Time | You do this |
|---|---|
| 15:15–15:45 | Lock schema with the team. |
| 15:45–17:00 | Neo4j AuraDB signup + connection working. Start curating source text for task 1. |
| 17:15–19:00 | Extraction pipeline working end-to-end for task 1 — text in, node in Neo4j out. |
| 19:00–19:30 | Dinner. |
| 19:40–21:30 | Admin review endpoints (`/api/admin/queue`, `/api/admin/review`). Start 2nd city seed data. |
| 21:30–21:45 | Group test of task 1 full flow — fix what breaks. |
| 21:45–23:30 | Seed tasks 2/3. Fix bugs from group test. |
| 00:00–01:30 | Should-have: version history on edit, New Schemes endpoint — only if on schedule. |
| 01:30 | **Feature freeze.** Stabilize only from here. |
| 02:00–03:00 | Bug fixes only. |
| 03:30 onward | Join rehearsals — be ready to answer "how does extraction/Neo4j work" live (see `TECHNICAL_DEEPDIVE.md`). |

**If behind schedule, cut in this order:** New Schemes endpoint → version history
UI (keep the data field, skip diffing) → 2nd city (demo one city, mention
multi-jurisdiction as designed-for). Never cut: the core extraction → Neo4j →
subgraph query chain for task 1.

Read `TECHNICAL_DEEPDIVE.md` for how to explain Neo4j and the extraction approach
to judges if asked directly.
