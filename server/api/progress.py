from fastapi import APIRouter
from ..crud import get_progress

router = APIRouter()

# Get user progress (simulated)
@router.get("/progress/{user_id}")
def get_user_progress(user_id: int):
    progress = get_progress(user_id)
    return progress
