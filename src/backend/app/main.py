from fastapi import FastAPI

from app.db.database import Base, engine

# Importar modelos para registrarlos
from app.models.client import Client
from app.models.policy import Policy
from app.models.interaction import Interaction

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Agentemotor Policies API"
)

@app.get("/")
def health():
    return {"status": "ok"}