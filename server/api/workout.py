from fastapi import APIRouter
from ..crud import create_workout_plan, get_workout_plan

router = APIRouter()


# Generate workout plan (simulated)
@router.post("/workout-plan")
def generate_workout_plan(user_id: int):
    workout_plan = create_workout_plan(user_id)
    return {"workout_routine": workout_plan}


# Get workout plan (simulated)
@router.get("/workout-plan/{user_id}")
def get_workout_plan(user_id: int):
    workout_plan = get_workout_plan(user_id)
    return {"workout_routine": workout_plan}

