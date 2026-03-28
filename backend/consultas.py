from sqlalchemy.orm import Session
import models, schemas

def get_all_drones(db: Session):
    return db.query(models.Drone).order_by(models.Drone.id.desc()).all()

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
        db.delete(db_drone)
        db.commit()
    return db_drone