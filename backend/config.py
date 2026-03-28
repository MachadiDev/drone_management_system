from pydantic_settings import BaseSettings
import os
import dotenv

class Settings(BaseSettings):
    DATABASE_URL: str
    PORT: int = os.getenv("PORT")
    IP_ADRESS: str = os.getenv("IP_ADRESS")
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()


    