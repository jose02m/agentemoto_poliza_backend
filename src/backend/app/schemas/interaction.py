from datetime import datetime
from pydantic import BaseModel


class InteractionCreate(BaseModel):
    result: str
    note: str | None = None


class InteractionResponse(BaseModel):
    id: int
    policy_id: int
    result: str
    note: str | None
    created_at: datetime

    class Config:
        from_attributes = True