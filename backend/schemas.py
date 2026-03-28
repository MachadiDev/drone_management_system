from pydantic import BaseModel

class DroneBase(BaseModel):
    model: str
    brand: str
    registration_number: str
    sisant_number: str
    status: str
    type: str

class DroneCreate(DroneBase):
    pass

class DroneUpdate(DroneBase):
    pass

class DroneResponse(DroneBase):
    id: int
    class Config:
        from_attributes = True