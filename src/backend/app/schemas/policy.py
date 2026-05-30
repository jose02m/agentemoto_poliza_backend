from datetime import date
from pydantic import BaseModel


class PolicyBase(BaseModel):
    policy_type: str
    insurer: str
    expiration_date: date
    status: str


class PolicyResponse(PolicyBase):
    id: int
    client_id: int
    classification: str

    class Config:
        from_attributes = True


class RenewPolicyRequest(BaseModel):
    expiration_date: date