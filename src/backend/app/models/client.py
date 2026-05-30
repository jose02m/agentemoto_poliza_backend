from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)

    policies = relationship(
        "Policy",
        back_populates="client",
        cascade="all, delete-orphan"
    )