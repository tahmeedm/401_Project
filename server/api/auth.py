from fastapi import APIRouter, HTTPException
from models import User, TokenResponse
from crud import auth_db, hash_password, verify_password, create_jwt_token

router = APIRouter()

@router.post("/register/")
def register(user: User):
    if user.email in auth_db:
        raise HTTPException(status_code=400, detail="User already exists")
    auth_db[user.email] = {"email": user.email, "password": hash_password(user.password)}
    
    return {"message": "User registered successfully", "token": create_jwt_token(user.email)}

@router.post("/login/", response_model=TokenResponse)
def login(user: User):
    stored_user = auth_db.get(user.email)
    if not stored_user or not verify_password(user.password, stored_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_jwt_token(user.email)}
