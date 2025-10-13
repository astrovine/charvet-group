from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database settings
    PG_DBNAME: str
    PG_USER: str
    PG_PASSWORD: str
    PG_HOST: str
    PG_PORT: str
    TABLE_NAME: str

    # Google Drive API settings
    SERVICE_ACCOUNT_FILE: str
    FOLDER_ID: str
    FILE_NAME: str
    SCOPES: str

    # JWT settings
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"

settings = Settings()

