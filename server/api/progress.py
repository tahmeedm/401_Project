from fastapi import APIRouter, Depends, HTTPException
from models import Progress
from crud import db_progress, get_current_user
from llm import generate_progress, MOCK_PROGRESS

router = APIRouter()

@router.post("/progress/")
def create_meal(progress: Progress, user: dict = Depends(get_current_user)):
    user_email = user["email"]
    db_progress[user_email] = progress
    return {"message": "Meal plan created successfully"}

@router.get("/progress/")
def get_meal(user: dict = Depends(get_current_user)):
    return db_progress.get(user["email"], MOCK_PROGRESS)
