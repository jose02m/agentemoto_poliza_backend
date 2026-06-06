from datetime import date, timedelta
import random

from app.db.database import Base, engine, SessionLocal
from app.models.advisor import Advisor
from app.models.client import Client
from app.models.policy import Policy
from app.models.interaction import Interaction


CLIENT_NAMES = [
    "Juan Pérez",
    "Ana Torres",
    "Carlos Gómez",
    "Laura Díaz",
    "Andrés Rojas",
    "María López",
    "Pedro Sánchez",
    "Luisa Martínez",
    "Camilo Herrera",
    "Diana Gómez",
    "Felipe Castro",
    "Natalia Ruiz",
    "José Ramírez",
    "Paula Mendoza",
    "Miguel León",
    "Valentina Silva",
    "Ricardo Ortiz",
    "Juliana Torres",
    "Sergio Moreno",
    "Tatiana Vega",
    "Daniel Parra",
    "Sandra Gil",
    "Jorge Salazar",
    "Mónica Pinto",
    "Kevin Romero",
]

INSURERS = [
    "Sura",
    "Bolívar",
    "Allianz",
    "Mapfre",
    "Liberty",
]

POLICY_TYPES = [
    "Auto",
    "Hogar",
    "Vida",
]

INTERACTION_RESULTS = [
    "contacted",
    "no_answer",
    "interested",
    "renewed",
    "not_interested",
]

INTERACTION_NOTES = [
    "Cliente interesado en renovar.",
    "Solicita nueva cotización.",
    "No respondió la llamada.",
    "Llamar nuevamente la próxima semana.",
    "Comparando opciones con otra aseguradora.",
    "Pendiente envío de documentos.",
    "Renovación en proceso.",
]


def seed_database():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        if db.query(Advisor).count() > 0:
            print("Seed skipped: database already contains data.")
            return

        today = date.today()

        advisor = Advisor(
            name="María Gómez",
            email="maria@agentemotor.com",
            password_hash="temporary_hash",
        )

        db.add(advisor)
        db.flush()

        expiration_offsets = [
            # Próximas a vencer
            3, 5, 8, 10, 12, 18, 22, 29,

            # Renovables
            -1, -3, -5, -8, -10, -15, -20, -25, -30,

            # Fuera de ventana
            -31, -35, -40, -45, -50, -60, -75, -90,
        ]

        created_policies = []

        for index, name in enumerate(CLIENT_NAMES):
            client = Client(
                advisor_id=advisor.id,
                name=name,
                phone=f"300000{1000 + index}",
                email=f"cliente{index + 1}@example.com",
            )

            policy = Policy(
                client=client,
                policy_type=random.choice(POLICY_TYPES),
                insurer=random.choice(INSURERS),
                expiration_date=today + timedelta(days=expiration_offsets[index]),
                status="active",
            )

            db.add(client)
            db.add(policy)

            created_policies.append(policy)

        db.commit()

        for policy in random.sample(created_policies, 10):
            interactions_count = random.randint(1, 3)

            for _ in range(interactions_count):
                interaction = Interaction(
                    policy_id=policy.id,
                    result=random.choice(INTERACTION_RESULTS),
                    note=random.choice(INTERACTION_NOTES),
                )

                db.add(interaction)

        db.commit()

        print("Seed completed successfully.")
        print("Advisor created: María Gómez")
        print(f"Clients created: {len(CLIENT_NAMES)}")
        print(f"Policies created: {len(CLIENT_NAMES)}")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()