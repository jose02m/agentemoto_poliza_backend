from fastapi import FastAPI

from app.db.database import Base, engine
from app.models.client import Client
from app.models.policy import Policy
from app.models.interaction import Interaction
from app.routes.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Agentemotor Policies API"
)

app.include_router(dashboard_router)


@app.get("/")
def health():
    return {"status": "ok"}