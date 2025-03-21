from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import ProgressModel, UserRequest
from models import Progress
from crud import get_current_user, create_progress, get_progress, update_progress
from database import get_db
from fastapi import Depends
from llm import MOCK_PROGRESS

router = APIRouter()

@router.post("/progress/")
def create_user_progess(progress: ProgressModel, db: Session = Depends(get_db), user: UserRequest = Depends(get_current_user)):
    user_email = user.email
    
    check_progress = get_progress(db, user_email)
    if check_progress:
        db_progress = update_progress(db, user_email, progress.model_dump())
        return {"message": "progress updated successfully", "progress": db_progress}
    db_progress = create_progress(db, user_email, progress)

    return {"message": "Progress created successfully", "progress": db_progress}
@router.get("/progress/")
def get_user_progress(user: UserRequest = Depends(get_current_user), db: Session = Depends(get_db)):
    db_progress = get_progress(db, user.email)
    if not db_progress:
        return MOCK_PROGRESS
    return db_progress
