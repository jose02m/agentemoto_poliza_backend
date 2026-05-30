from datetime import date, timedelta

from app.db.database import Base, engine, SessionLocal
from app.models.client import Client
from app.models.policy import Policy
from app.models.interaction import Interaction


def seed_database():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        existing_clients = db.query(Client).count()

        if existing_clients > 0:
            print("Seed skipped: database already has data.")
            return

        today = date.today()

        client_1 = Client(
            name="Juan Pérez",
            phone="3001234567",
            email="juan@example.com",
        )

        client_2 = Client(
            name="Ana Torres",
            phone="3019876543",
            email="ana@example.com",
        )

        client_3 = Client(
            name="Carlos Gómez",
            phone="3025557788",
            email="carlos@example.com",
        )

        policy_1 = Policy(
            client=client_1,
            policy_type="Auto",
            insurer="Sura",
            expiration_date=today + timedelta(days=10),
            status="active",
        )

        policy_2 = Policy(
            client=client_2,
            policy_type="Auto",
            insurer="Bolívar",
            expiration_date=today - timedelta(days=15),
            status="active",
        )

        policy_3 = Policy(
            client=client_3,
            policy_type="Auto",
            insurer="Allianz",
            expiration_date=today - timedelta(days=45),
            status="active",
        )

        db.add_all([client_1, client_2, client_3])
        db.add_all([policy_1, policy_2, policy_3])

        db.commit()

        print("Seed completed successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()