from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)

    policy_type = Column(String, nullable=False)
    insurer = Column(String, nullable=False)
    expiration_date = Column(Date, nullable=False)
    status = Column(String, nullable=False, default="active")

    client = relationship("Client", back_populates="policies")

    interactions = relationship(
        "Interaction",
        back_populates="policy",
        cascade="all, delete-orphan"
    )