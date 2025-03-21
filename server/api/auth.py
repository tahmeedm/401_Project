# auth.py
from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import User
from crud import create_user, get_current_user, get_user_by_email, hash_password, verify_password, create_jwt_token
from database import get_db, engine, SessionLocal

from schemas import TokenResponse, UserRequest

router = APIRouter()

db_dependecy = Annotated[Session, Depends(get_db)]


@router.post("/register/")
def register(user: UserRequest, db: db_dependecy):

    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = create_user(db, user.email, user.password)
    return {"message": "User registered successfully", "token": create_jwt_token(new_user.email)}

@router.post("/login/", response_model=TokenResponse)
def login(user: UserRequest, db: db_dependecy):
    db_user = get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"token": create_jwt_token(db_user.email)}
