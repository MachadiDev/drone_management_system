from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from database import Base

class Drone(Base):
    __tablename__ = "drones"
    id = Column(Integer, primary_key=True, index=True)
    model = Column(String, index=True)
    brand = Column(String, index=True)
    registration_number = Column(String, index=True)
    sisant_number = Column(String, index=True)
    status = Column(String, index=True)
    type = Column(String, index=True)
    isActive = Column(Boolean, default=True)

class Pilot(Base):
    __tablename__ = "pilots"
    id = Column(Integer, primary_key=True, index=True)
    cpf = Column(String, index=True)
    name = Column(String, index=True)
    cnh = Column(String, index=True)
    sarpas_number = Column(String, index=True)
    isActive = Column(Boolean, default=True)

class Auxiliaries(Base):
    __tablename__ = "auxiliaries"
    id = Column(Integer, primary_key=True, index=True)
    cpf = Column(String, index=True)
    name = Column(String, index=True)
    cnh = Column(String, index=True)
    sarpas_number = Column(String, index=True)
    isActive = Column(Boolean, default=True)