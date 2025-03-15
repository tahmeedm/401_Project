from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from ..models import UserProfile
from ..crud import get_user, create_user

router = APIRouter()


# Create User Profile
@router.post("/profile")
async def create_user_profile(profile: UserProfile):
    user_id = create_user(profile)
    return {"user_id": user_id, "profile": profile}

# Get User Profile
@router.get("/profile/{user_id}")
async def get_user_profile(user_id: int):
    profile = get_user(user_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
