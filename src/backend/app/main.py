from fastapi import FastAPI

from app.db.database import Base, engine
from app.models.client import Client
from app.models.policy import Policy
from app.models.interaction import Interaction
from app.routes.dashboard import router as dashboard_router
from app.routes.interactions import router as interactions_router
from app.routes.policies import router as policies_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Agentemotor Policies API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)
app.include_router(interactions_router)
app.include_router(policies_router)

@app.get("/")
def health():
    return {"status": "ok"}