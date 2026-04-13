from pydantic import BaseModel

class DroneBase(BaseModel):
    model: str
    brand: str
    registration_number: str
    sisant_number: str
    status: str
    type: str
    isActive: bool

class DroneCreate(DroneBase):
    pass

class DroneUpdate(DroneBase):
    pass

class DroneResponse(DroneBase):
    id: int
    class Config:
        from_attributes = True

class PilotBase(BaseModel):
    cpf: str
    name: str
    cnh: str
    sarpas_number: str  
    isActive: bool

class PilotCreate(PilotBase):
    pass

class PilotUpdate(PilotBase):
    pass

class PilotResponse(PilotBase):
    id: int
    class Config:
        from_attributes = True  

class AuxiliariesBase(BaseModel):
    cpf: str
    name: str
    cnh: str
    sarpas_number: str  
    isActive: bool

class AuxiliariesCreate(AuxiliariesBase):
    pass

class AuxiliariesUpdate(AuxiliariesBase):
    pass

class AuxiliariesResponse(AuxiliariesBase):
    id: int
    class Config:
        from_attributes = True      