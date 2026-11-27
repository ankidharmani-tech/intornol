"""
main.py — FastAPI entrypoint for Nagrik Marg backend.

Mounts all routers:
  /api/query, /api/clarify      — citizen query flow
  /api/admin/queue, /review     — admin dashboard
  /api/graph/:node_id, subgraph — graph detail
  /api/schemes/new              — new schemes feed
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routers import admin, query, schemes


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: load seed data + embeddings index. Shutdown: close Neo4j."""
    # Load seed data and index embeddings on startup
    query._load_seed_data()
    print(f"[startup] Seed data loaded. Embedding index: {__import__('backend.app.retrieval.embeddings', fromlist=['embeddings']).get_indexed_count()} services indexed.")
    yield
    # Cleanup
    try:
        from backend.app.graph.neo4j_client import close_driver
        close_driver()
    except Exception:
        pass


app = FastAPI(
    title="Nagrik Marg — Civic Task Navigator",
    description="Task-first civic navigator API. PS ID: PSWB02.",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(query.router)
app.include_router(admin.router)
app.include_router(schemes.router)


@app.get("/")
async def root():
    return {
        "service": "Nagrik Marg API",
        "version": "0.1.0",
        "endpoints": [
            "POST /api/query",
            "POST /api/clarify",
            "GET  /api/admin/queue",
            "POST /api/admin/review",
            "GET  /api/graph/{node_id}",
            "POST /api/graph/subgraph",
            "GET  /api/schemes/new",
        ],
    }
