from fastapi import APIRouter
from ..crud import generate_workout_plan

router = APIRouter()

# Get workout plan (simulated)
@router.get("/workout-plan/{user_id}")
def get_workout_plan(user_id: int):
    workout_plan = generate_workout_plan(user_id)
    return {"workout_routine": workout_plan}
