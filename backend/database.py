from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    except Exception as e:
        print("falha ao acessar banco de dados")
        print(f"Detalhes do erro: {e}")
        raise e
    finally:
        if db is not None:
            db.close()
