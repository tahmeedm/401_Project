from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
import jwt
import datetime
from models import User, TokenResponse
from crud import auth_db, hash_password, verify_password, create_jwt_token

router = APIRouter()



# Register endpoint
@router.post("/register/")
def register(user: User):
    if user.email in auth_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)
    auth_db[user.email] = {"email": user.email, "password": hashed_password}
    return {"message": "User registered successfully"}

# Login endpoint
@router.post("/login/", response_model=TokenResponse)
def login(user: User):
    stored_user = auth_db.get(user.email)

    if not stored_user or not verify_password(user.password, stored_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_jwt_token(user.email)
    return {"token": token}
