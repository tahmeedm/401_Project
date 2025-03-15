from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Pydantic models
class UserProfile(BaseModel):
    name: str
    age: int
    height: int
    weight: int
    fitness_level: str
    dietary_preference: str

# Simulate a database
fake_db = {}

# Create User Profile
@router.post("/profile")
async def create_user_profile(profile: UserProfile):
    user_id = len(fake_db) + 1
    fake_db[user_id] = profile.dict()
    return {"user_id": user_id, "profile": fake_db[user_id]}

# Get User Profile
@router.get("/profile/{user_id}")
async def get_user_profile(user_id: int):
    if user_id not in fake_db:
        raise HTTPException(status_code=404, detail="User not found")
    return fake_db[user_id]
