from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from  ..schemas import user
from ..utilities.database import get_db
from ..utilities import utils, oauth2
from ..models import admin

router = APIRouter(
    prefix="/users",
    tags=["User"]
)

@router.post("/create", response_model=user.UserRes, status_code=status.HTTP_201_CREATED)
def create_user(user_create: user.UserCreate, db: Session = Depends(get_db)):
    try:
        user_data = user_create.model_dump()
        hashed_password = utils.hash_password(user_data["password"])
        user_data["password"] = hashed_password
        new_user = admin.User(**user_data)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to create user: {str(e)}")

@router.get("/", response_model=list[user.UserRes])
def get_all_users(db: Session = Depends(get_db), current_user: admin.User = Depends(oauth2.get_current_superadmin)):
    users = db.query(admin.User).all()
    return users

@router.get("/me", response_model=user.UserRes)
def get_current_user(current_user: admin.User = Depends(oauth2.get_current_user)):
    return current_user
