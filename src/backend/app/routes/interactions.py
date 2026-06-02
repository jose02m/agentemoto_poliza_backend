from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.policy import Policy
from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate, InteractionResponse

router = APIRouter()


@router.post(
    "/policies/{policy_id}/interactions",
    response_model=InteractionResponse,
)
def create_interaction(
    policy_id: int,
    payload: InteractionCreate,
    db: Session = Depends(get_db),
):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()

    if policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")

    interaction = Interaction(
        policy_id=policy_id,
        result=payload.result,
        note=payload.note,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction