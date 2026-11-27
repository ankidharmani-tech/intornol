"""
embeddings.py — lightweight retrieval via sentence-transformers + cosine
similarity, as specified in TECHNICAL_DEEPDIVE.md Section 3.

No vector database. All embeddings are held in-memory in a dict keyed by
service ID. At ~50-100 services this is instant.
"""

from __future__ import annotations

import numpy as np
from sentence_transformers import SentenceTransformer

# ── Model ────────────────────────────────────────────────────────────

_model: SentenceTransformer | None = None


def _get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


# ── In-memory embedding store ───────────────────────────────────────

# { service_id: { "text": str, "vector": np.ndarray } }
_service_vectors: dict[str, dict] = {}


def index_service(service_id: str, text: str) -> None:
    """Embed a service description and store it in the in-memory index."""
    model = _get_model()
    vec = model.encode(text, convert_to_numpy=True)
    _service_vectors[service_id] = {"text": text, "vector": vec}


def index_many(services: list[dict]) -> None:
    """
    Bulk-index a list of services.
    Each dict must have at least 'id' and 'citizen_friendly_label'.
    Combines name + label + category for a richer embedding.
    """
    model = _get_model()
    texts = []
    ids = []
    for svc in services:
        text = " ".join(
            filter(None, [
                svc.get("name", ""),
                svc.get("citizen_friendly_label", ""),
                svc.get("category", ""),
            ])
        )
        texts.append(text)
        ids.append(svc["id"])

    if not texts:
        return

    vectors = model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
    for sid, text, vec in zip(ids, texts, vectors):
        _service_vectors[sid] = {"text": text, "vector": vec}


def search(query: str, top_k: int = 5) -> list[tuple[str, float]]:
    """
    Embed the query, compute cosine similarity against all stored
    service vectors, return top-k (service_id, score) pairs sorted
    descending by score.
    """
    if not _service_vectors:
        return []

    model = _get_model()
    query_vec = model.encode(query, convert_to_numpy=True)

    scores: list[tuple[str, float]] = []
    for sid, entry in _service_vectors.items():
        sim = _cosine_similarity(query_vec, entry["vector"])
        scores.append((sid, float(sim)))

    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:top_k]


def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Cosine similarity between two vectors — TECHNICAL_DEEPDIVE.md formula."""
    dot = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def get_indexed_count() -> int:
    return len(_service_vectors)


def clear_index() -> None:
    _service_vectors.clear()
