from datetime import datetime
from fastapi import status

from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ..schemas import tk, user
from ..models import admin
from ..utilities import database, utils, oauth2

router = APIRouter(
    tags=["Authentication"]
)

@router.post("/signup", response_model=user.UserRes, status_code=status.HTTP_201_CREATED)
def signup(user_data: user.UserCreate, db: Session = Depends(database.get_db)):
    """Public endpoint for employee self-registration"""
    # Check if user already exists
    existing_user = db.query(admin.User).filter(admin.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        # Hash the password
        hashed_password = utils.hash_password(user_data.password)

        # Create new user (regular admin, not superadmin)
        new_user = admin.User(
            name=user_data.name,
            email=user_data.email,
            password=hashed_password,
            is_superadmin=False,
            is_active=True,
            role='admin'
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create account: {str(e)}")

@router.post("/login", response_model=tk.Token)
def login(user_cred: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(admin.User).filter(
        admin.User.email == user_cred.username).first()
    if not user:
        raise HTTPException(status_code=403, detail="Invalid Credentials")
    if not utils.verify_password(user_cred.password, user.password):
        raise HTTPException(status_code=403, detail="Invalid Credentials")
    access_token = oauth2.create_access_token(data = {"user_id": user.id})
    user.last_login = datetime.now()
    db.commit()
    # return token
    return {"message": "Login Successful", "access_token": access_token, "token_type": "bearer"}



@router.post("/grant-superadmin/{user_id}", status_code=status.HTTP_200_OK)
def grant_superadmin_privileges(user_id: int, db: Session = Depends(database.get_db),
                                current_user: admin.User = Depends(oauth2.get_current_superadmin)):
    # The get_current_superadmin dependency ensures only superadmins can call this
    user_to_promote = db.query(admin.User).filter(admin.User.id == user_id).first()
    if not user_to_promote:
        raise HTTPException(status_code=404, detail="User not found")

    user_to_promote.is_superadmin = True
    db.commit()
    return {"message": f"User {user_to_promote.email} is now a superadmin."}
