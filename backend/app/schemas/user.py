from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class User(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserCreate(User):
    pass


class UserRes(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_superadmin: bool
    is_active: bool
    role: str
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str
