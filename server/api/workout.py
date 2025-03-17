from fastapi import APIRouter
from crud import create_workout_plans, get_workout_plan
from models import WorkoutPlan
router = APIRouter()


# Generate workout plan (simulated)
@router.post("/workout-plan")
def create_workout_plan(workout_plan: WorkoutPlan):
    workout_data_id = create_workout_plans(workout_plan)
    return {"workout_data": workout_plan, "workout_data_id": workout_data_id}


# Get workout plan (simulated)
@router.get("/workout-plan/{user_id}")
def get_workout_plan(user_id: int):
    workout_plan = get_workout_plan(user_id)
    return {"workout_routine": workout_plan}

