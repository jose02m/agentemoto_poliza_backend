from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload

from app.db.database import get_db
from app.models.policy import Policy
from app.services.policy_classifier import classify_policy

router = APIRouter()


@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    policies = (
        db.query(Policy)
        .options(
            joinedload(Policy.client),
            joinedload(Policy.interactions),
        )
        .all()
    )

    dashboard = {
        "upcoming": [],
        "renewable": [],
        "expired": [],
        "active": [],
    }

    for policy in policies:
        classification = classify_policy(policy.expiration_date)

        last_interaction = None
        if policy.interactions:
            sorted_interactions = sorted(
                policy.interactions,
                key=lambda interaction: interaction.created_at,
                reverse=True,
            )
            latest = sorted_interactions[0]
            last_interaction = {
                "id": latest.id,
                "result": latest.result,
                "note": latest.note,
                "created_at": latest.created_at,
            }

        policy_data = {
            "id": policy.id,
            "client": {
                "id": policy.client.id,
                "name": policy.client.name,
                "phone": policy.client.phone,
                "email": policy.client.email,
            },
            "policy_type": policy.policy_type,
            "insurer": policy.insurer,
            "expiration_date": policy.expiration_date,
            "status": policy.status,
            "classification": classification,
            "interactions_count": len(policy.interactions),
            "last_interaction": last_interaction,
        }

        dashboard[classification].append(policy_data)

    return dashboard