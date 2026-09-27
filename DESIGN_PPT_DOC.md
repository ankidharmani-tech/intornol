# Design + PPT Doc — Nagrik Marg (PSWB02)

*Self-contained — paste just this into your own AI assistant tonight if you need help.*

---

## Project Context

We're building a **task-first civic navigator**. A citizen types a task in plain
language ("I want to start a home-based food business in Thane"), sees 3–4
clarifying questions, then gets an ordered, visual roadmap of every step involved —
documents, fees, offices — sourced from real government pages, in a way that's
usable even by someone with low literacy.

**PS ID:** PSWB02. **Deadline:** present tomorrow morning — tonight (from 3:15 PM)
is the whole build window.

**The elevator pitch — memorize this, whoever presents will say it first:**
> "Government portals answer questions once you already know the exact service
> name. We built the opposite: a citizen types what they actually want in plain
> language — in any Indian language — and we return an ordered, personalized,
> jurisdiction-aware roadmap of every step, document, fee, and office involved,
> grounded in real official sources and readable by someone who's never filled a
> government form before."

**The gap we found:** ServicePlus (the low-code platform behind most state e-service
portals, covering 2,900+ services) and UMANG (~660 services across 127 departments)
are both **service-first** — you must already know what you're looking for.
Nobody does **task-first decomposition**. That's the whole pitch.

---

## What You Own

1. **Document reference images** — generic sample images of documents (Aadhaar
   card, electricity bill, rent agreement, etc.) with plain-language captions, so
   a citizen who's never seen a government form knows exactly what to physically
   bring.
2. **UI inspo / visual direction** — hand the frontend teammate a simple, coherent
   look (colors, type, spacing) early so nothing gets restyled twice at 2 AM.
3. **The pitch deck** (`pitch_deck.pptx`).
4. **The demo script** (`demo_script.md`) — the exact click-by-click narration for
   whoever runs the live demo.

---

## Document Images — Do This Carefully

**Rule: use generic sample/mockup images only.** Never a real person's actual
document. Search for "sample Aadhaar card template," "sample electricity bill
format," etc. — plenty of blank/watermarked template images exist publicly for
exactly this purpose. This isn't just an ethics nicety, it also avoids putting a
stranger's real ID card into a hackathon demo by accident.

Documents you need for the demo tasks (home-based food business):
- Aadhaar card (`doc_aadhaar`)
- Address proof — electricity bill or rent agreement (`doc_address_proof`)
- Rent agreement, if premises is rented (`doc_rent_agreement`)
- A photo of the shop/premises (`doc_shop_photo`)

Save each as `document-images/doc_<id>.png` (or .jpg) so the frontend teammate can
drop them straight into `public/assets/document-images/` without renaming anything.
Write one short, plain-language caption per document (not legal language) — e.g.
*"Carry this — your electricity bill from any of the last 3 months."*

---

## Pitch Deck Outline (build `pitch_deck.pptx` to this structure)

1. **Title slide** — project name + PS ID + team.
2. **The problem** — bureaucracy is fragmented across dozens of disconnected sites;
   citizens don't know what to do, in what order, or where.
3. **The gap in existing tools** — ServicePlus and UMANG are service-first, not
   task-first. One slide, one clean comparison — this is your strongest USP, don't
   bury it.
4. **Our solution** — one sentence (the elevator pitch above) + one visual of the
   roadmap UI.
5. **Live demo** — literally just say "let's show you" and hand off to the demo.
6. **Architecture** — simplified version of the diagram below, don't over-explain,
   just enough that judges see real engineering underneath.
7. **USPs** — pull from the list below, say the build-and-show-live ones with
   confidence, frame the vision ones explicitly as "where this goes next."
8. **Closing** — restate the gap you named in slide 3. End on that line.

### Simplified architecture (for slide 6, don't reproduce the full Mermaid diagram)
```
Citizen types task → matched to services (by meaning, not keywords) →
few clarifying questions → dependency graph query → ordered roadmap shown,
every step traceable to an official source.
```

### USPs to include
**Say these with a straight face, they're real and buildable:**
- Grounded, not hallucinated — every step cites its official source.
- Personalized by rule — same task, different profile (age/business type/turnover)
  → different roadmap.
- Jurisdiction-aware — same task, different state/city → different fees/offices,
  shown live in the demo.
- Honest about gaps — says "not enough coverage" instead of guessing.
- Total cost + time shown upfront across the whole path, not per-service.
- Accessible by design — document reference images + plain captions for citizens
  who can't parse dense government text.

**Closing-slide "where this goes next" lines:**
- One parser template scales across most states (many run the same ServicePlus
  platform underneath).
- Voice-first support via Bhashini (India's own free translation/speech stack) for
  citizens who can't read at all.
- Crowdsourced correction over time — "Wikipedia for government processes."
- New-schemes feed filtered by citizen eligibility, not just a generic list.

---

## Demo Script — Write This Precisely

Write `demo_script.md` as literal click-by-click narration, e.g.:

1. Presenter types: *"I want to start a home-based food business in Thane."*
2. [Point out] 3–4 clarifying questions appear — premises type, ownership, food
   type, turnover.
3. Answer them → roadmap appears. [Point out] fee/days/source link per step,
   and the different styling on the offline step (visiting an office).
4. Click a document step → [point out] the reference image + caption.
5. **Switch city/state** → [point out] the roadmap changes — different office,
   different fee. This is the single most important live moment — rehearse it.
6. Type an unsupported/out-of-scope task → [point out] the honest "insufficient
   coverage" message instead of a wrong answer. Judges remember this kind of
   honesty more than polish.
7. Close with the elevator pitch line again.

**Also prepare a backup:** ask the integration lead to screen-record this exact
flow as a video, in case wifi/projector fails during judging.

---

## Research References (for a citations slide, if you want one)

- Promikyridis & Tambouris, *Using Knowledge Graphs to Provide Public Service
  Information*, DG.O 2022
- *An Event-Centric Knowledge Graph Approach for Public Administration*, MDPI
  Computers 2024
- Neo4j, *Creating Knowledge Graphs from Unstructured Data* (practical reference)
- Bhashini — Government of India's own multilingual AI stack (bhashini.gov.in)
- services.india.gov.in — National Government Services Portal
- Right to Information Act, 2005 — legal basis for the "designated contact person"
  feature (every public authority must publish a Public Information Officer)

---

## Tonight's Timeline — Your Rows

| Time | You do this |
|---|---|
| 15:15–15:45 | Sit in on schema lock so you know exactly what document IDs exist. |
| 15:45–17:00 | Start sourcing document reference images + UI inspo references. |
| 17:15–19:00 | Finish document images for task 1. Start deck skeleton (slides 1–4). |
| 19:00–19:30 | Dinner. |
| 19:40–21:30 | Deck to ~60% (add slides 5–8, placeholder content OK for now). |
| 21:30–21:45 | Sit in on the group test — note anything visually confusing for the deck/demo script. |
| 21:45–23:30 | Deck to ~90%. Start writing the demo script draft. |
| 00:00–01:30 | Should-have: New Schemes visuals, second task's document images — only if on schedule. |
| 01:30 | **Feature freeze.** Content only from here, no new asset requests. |
| 02:00–03:00 | Finalize deck fully. Finalize demo script fully — hand it to whoever presents. |
| 03:00–03:30 | Break. |
| 03:30–04:15 | **Rehearsal 1** — watch closely, note every stumble in the script or slide flow. |
| 04:15–04:45 | Fix deck/script issues from rehearsal 1. |
| 04:45–05:15 | **Rehearsal 2.** |
| 05:15–05:45 | Export deck as PDF backup. Confirm demo video backup exists. |

**If behind schedule, cut in this order:** citations slide → architecture slide
detail (keep it to one simple line) → second task's document images. Never cut:
the USP slide and the elevator pitch — that's what judges remember you by.
