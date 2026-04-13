from sqlalchemy.orm import Session
import models, schemas

def get_all_drones(db: Session):
    return db.query(models.Drone).filter(models.Drone.isActive == True).order_by(models.Drone.id.desc()).all()

def get_drone(db: Session, id: int):
    return db.query(models.Drone).filter(models.Drone.id == id).first()

def create_drone(db: Session, drone: schemas.DroneCreate):
    db_drone = models.Drone(**drone.model_dump())
    db.add(db_drone)
    db.commit()
    db.refresh(db_drone)
    return db_drone

def update_drone(db: Session, id: int, drone: schemas.DroneUpdate):
    db_drone = get_drone(db, id)
    if db_drone:
        for key, value in drone.model_dump().items():
            setattr(db_drone, key, value)
        db.commit()
        db.refresh(db_drone)
    return db_drone

def delete_drone(db: Session, id: int):
    db_drone = get_drone(db, id)
    if db_drone:
        db_drone.isActive = False
        db.commit()
        db.refresh(db_drone)
    return db_drone


# Consultas para Pilotos

def get_all_pilots(db: Session):
    return db.query(models.Pilot).filter(models.Pilot.isActive == True).order_by(models.Pilot.id.desc()).all()

def get_pilot(db: Session, id: int):
    return db.query(models.Pilot).filter(models.Pilot.id == id).first()

def create_pilot(db: Session, pilot: schemas.PilotCreate):
    db_pilot = models.Pilot(**pilot.model_dump())
    db.add(db_pilot)
    db.commit()
    db.refresh(db_pilot)
    return db_pilot

def update_pilot(db: Session, id: int, pilot: schemas.PilotUpdate):
    db_pilot = get_pilot(db, id)
    if db_pilot:
        for key, value in pilot.model_dump().items():
            setattr(db_pilot, key, value)
        db.commit()
        db.refresh(db_pilot)
    return db_pilot

def delete_pilot(db: Session, id: int):
    db_pilot = get_pilot(db, id)
    if db_pilot:
        db_pilot.isActive = False
        db.commit()
        db.refresh(db_pilot)
    return db_pilot

def get_all_auxiliaries(db: Session):
    return db.query(models.Auxiliaries).filter(models.Auxiliaries.isActive == True).order_by(models.Auxiliaries.id.desc()).all()

def get_auxiliary(db: Session, id: int):
    return db.query(models.Auxiliaries).filter(models.Auxiliaries.id == id).first()

def create_auxiliary(db: Session, auxiliary: schemas.AuxiliariesCreate):
    db_auxiliary = models.Auxiliaries(**auxiliary.model_dump())
    db.add(db_auxiliary)
    db.commit()
    db.refresh(db_auxiliary)
    return db_auxiliary

def update_auxiliary(db: Session, id: int, auxiliary: schemas.AuxiliariesUpdate):
    db_auxiliary = get_auxiliary(db, id)
    if db_auxiliary:
        for key, value in auxiliary.model_dump().items():
            setattr(db_auxiliary, key, value)
        db.commit()
        db.refresh(db_auxiliary)
    return db_auxiliary

def delete_auxiliary(db: Session, id: int):
    db_auxiliary = get_auxiliary(db, id)
    if db_auxiliary:
        db_auxiliary.isActive = False
        db.commit()
        db.refresh(db_auxiliary)
    return db_auxiliary 