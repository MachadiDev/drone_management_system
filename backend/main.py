from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import models, schemas, consultas
from database import engine, get_db
from config import settings

app = FastAPI()

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=IP_ADRESS, port=PORT)