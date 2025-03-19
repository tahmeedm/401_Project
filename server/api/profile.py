from fastapi import APIRouter, Depends
from models import UserProfile
from crud import db_users, get_current_user
from fastapi import HTTPException

router = APIRouter()

@router.post("/profile/")
def create_profile(profile: UserProfile, user: dict = Depends(get_current_user)):
    db_users[user["email"]] = profile
    return {"message": "Profile created successfully"}

@router.get("/profile/")
def get_profile(user: dict = Depends(get_current_user)):
    if db_users.get(user["email"]) is None:
        raise HTTPException(status_code=404, detail="No profile found")
    return db_users.get(user["email"])
