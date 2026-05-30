from pydantic import BaseModel

class ClientResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str | None

    class Config:
        from_attributes = True