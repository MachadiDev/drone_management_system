from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import models, schemas, consultas
from database import engine, get_db
from config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request, exc):
    print("falha ao acessar banco de dados")
    print(f"Erro detalhado: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "falha ao acessar banco de dados"}
    )

# As configurações são carregadas via pydantic-settings no config.py
IP_ADRESS = settings.IP_ADRESS
PORT = settings.PORT

@app.get("/")
def read_root():
    return {"message": "Welcome to the Drone Management System API"}

@app.get("/drones", response_model=list[schemas.DroneResponse])
def read_drones(db: Session = Depends(get_db)):
    return consultas.get_all_drones(db)

@app.get("/drones/{id}", response_model=schemas.DroneResponse)
def read_drone(id: int, db: Session = Depends(get_db)):
    drone = consultas.get_drone(db, id)
    if drone is None:
        raise HTTPException(status_code=404, detail="Drone not found")
    return drone

@app.post("/drones", response_model=schemas.DroneResponse)
def create_drone(drone: schemas.DroneCreate, db: Session = Depends(get_db)):
    return consultas.create_drone(db, drone)

@app.put("/drones/{id}", response_model=schemas.DroneResponse)
def update_drone(id: int, drone: schemas.DroneUpdate, db: Session = Depends(get_db)):
    db_drone = consultas.update_drone(db, id, drone)
    if db_drone is None:
        raise HTTPException(status_code=404, detail="Drone not found")
    return db_drone

@app.delete("/drones/{id}", response_model=schemas.DroneResponse)
def delete_drone(id: int, db: Session = Depends(get_db)):
    db_drone = consultas.delete_drone(db, id)
    if db_drone is None:
        raise HTTPException(status_code=404, detail="Drone not found")
    return db_drone

@app.get("/pilots", response_model=list[schemas.PilotResponse])
def read_pilots(db: Session = Depends(get_db)):
    return consultas.get_all_pilots(db)

@app.get("/pilots/{id}", response_model=schemas.PilotResponse)
def read_pilot(id: int, db: Session = Depends(get_db)):
    pilot = consultas.get_pilot(db, id)
    if pilot is None:
        raise HTTPException(status_code=404, detail="Pilot not found")
    return pilot

@app.post("/pilots", response_model=schemas.PilotResponse)
def create_pilot(pilot: schemas.PilotCreate, db: Session = Depends(get_db)):
    return consultas.create_pilot(db, pilot)

@app.put("/pilots/{id}", response_model=schemas.PilotResponse)
def update_pilot(id: int, pilot: schemas.PilotUpdate, db: Session = Depends(get_db)):
    db_pilot = consultas.update_pilot(db, id, pilot)
    if db_pilot is None:
        raise HTTPException(status_code=404, detail="Pilot not found")
    return db_pilot

@app.delete("/pilots/{id}", response_model=schemas.PilotResponse)
def delete_pilot(id: int, db: Session = Depends(get_db)):
    db_pilot = consultas.delete_pilot(db, id)
    if db_pilot is None:
        raise HTTPException(status_code=404, detail="Pilot not found")
    return db_pilot

@app.get("/auxiliaries", response_model=list[schemas.AuxiliariesResponse])
def read_auxiliaries(db: Session = Depends(get_db)):
    return consultas.get_all_auxiliaries(db)

@app.get("/auxiliaries/{id}", response_model=schemas.AuxiliariesResponse)
def read_auxiliary(id: int, db: Session = Depends(get_db)):
    auxiliary = consultas.get_auxiliary(db, id)
    if auxiliary is None:
        raise HTTPException(status_code=404, detail="Auxiliary not found")
    return auxiliary

@app.post("/auxiliaries", response_model=schemas.AuxiliariesResponse)
def create_auxiliary(auxiliary: schemas.AuxiliariesCreate, db: Session = Depends(get_db)):
    return consultas.create_auxiliary(db, auxiliary)

@app.put("/auxiliaries/{id}", response_model=schemas.AuxiliariesResponse)
def update_auxiliary(id: int, auxiliary: schemas.AuxiliariesUpdate, db: Session = Depends(get_db)):
    db_auxiliary = consultas.update_auxiliary(db, id, auxiliary)
    if db_auxiliary is None:
        raise HTTPException(status_code=404, detail="Auxiliary not found")
    return db_auxiliary

@app.delete("/auxiliaries/{id}", response_model=schemas.AuxiliariesResponse)
def delete_auxiliary(id: int, db: Session = Depends(get_db)):
    db_auxiliary = consultas.delete_auxiliary(db, id)
    if db_auxiliary is None:
        raise HTTPException(status_code=404, detail="Auxiliary not found")
    return db_auxiliary

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=IP_ADRESS, port=PORT)