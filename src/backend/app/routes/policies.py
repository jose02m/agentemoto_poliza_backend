from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.policy import Policy
from app.schemas.policy import RenewPolicyRequest

router = APIRouter()


@router.put("/policies/{policy_id}/renew")
def renew_policy(
    policy_id: int,
    payload: RenewPolicyRequest,
    db: Session = Depends(get_db)
):
    policy = (
        db.query(Policy)
        .filter(Policy.id == policy_id)
        .first()
    )

    if not policy:
        raise HTTPException(
            status_code=404,
            detail="Policy not found"
        )

    policy.expiration_date = payload.expiration_date
    policy.status = "renewed"

    db.commit()
    db.refresh(policy)

    return {
        "message": "Policy renewed successfully",
        "policy_id": policy.id,
        "new_expiration_date": policy.expiration_date
    }