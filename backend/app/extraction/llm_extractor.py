"""
LLM extraction pipeline — BACKEND_DOC.md Section "How To Build the
Extraction Pipeline."

Prompt template includes eligibility_criteria and application_url as
required extraction fields.

For the hackathon, supports OpenAI (GPT) or falls back to returning the
pre-curated seed data if no API key is set. The extraction prompt is
always present and correct so the pipeline works end-to-end with any
LLM backend.
"""

from __future__ import annotations

import json
import os
from typing import Optional

# ── Extraction prompt template ──────────────────────────────────────

EXTRACTION_PROMPT = """You will be given raw text from an official Indian government service page.
Extract ONLY information explicitly present in the text into this JSON shape:
{{
  "name": "",
  "citizen_friendly_label": "",
  "category": "",
  "jurisdiction_level": "central|state|municipal|local",
  "applicable_region": null,
  "mode": "online|offline|hybrid",
  "documents_required": [],
  "fee": null,
  "processing_days": null,
  "official_source_url": "",
  "office_name": null,
  "office_address": null,
  "contact_designation": null,
  "eligibility_criteria": [],
  "application_url": ""
}}

Rules:
- If a field isn't mentioned in the text, use null (for scalars) or [] (for arrays).
- Never guess or infer a value.
- eligibility_criteria should be a list of plain-language strings, one per criterion.
- application_url should be the direct URL where a citizen can apply, if mentioned.
- Return ONLY valid JSON, no commentary.

Text:
{source_text}
"""


def extract_from_text(source_text: str, source_url: str = "") -> Optional[dict]:
    """
    Send source text to an LLM and parse the structured JSON response.
    Falls back to None if no LLM API key is configured.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None

    try:
        import openai
        client = openai.OpenAI(api_key=api_key)

        prompt = EXTRACTION_PROMPT.format(source_text=source_text)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a structured data extractor. Return only valid JSON."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
            max_tokens=1500,
        )

        content = response.choices[0].message.content.strip()
        # Strip markdown fences if present
        if content.startswith("```"):
            content = content.split("\n", 1)[1]
            if content.endswith("```"):
                content = content[: content.rfind("```")]

        extracted = json.loads(content)

        # Ensure required fields exist
        extracted.setdefault("eligibility_criteria", [])
        extracted.setdefault("application_url", "")
        if source_url and not extracted.get("official_source_url"):
            extracted["official_source_url"] = source_url

        return extracted

    except Exception as e:
        print(f"[extraction] LLM extraction failed: {e}")
        return None
