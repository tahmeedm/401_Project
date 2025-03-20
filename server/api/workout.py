from fastapi import APIRouter, Depends, HTTPException
from models import WorkoutPlan
from crud import db_workout_plans, db_users, get_current_user
from llm import generate_workout, generate_new_workout

router = APIRouter()
@router.post("/workout-plan/")
def create_workout(workout: WorkoutPlan, user: dict = Depends(get_current_user)):
    user_email = user["email"]

    # Store workout preferences
    db_workout_plans[user_email] = {
        "preferences": workout,
        "generated_plan": generate_workout(workout, db_users[user_email]),  # Simulated AI-generated workout plan
    }

    return {"message": "Workout plan created successfully"}

# Get Workout Plan
@router.get("/workout-plan/")
def get_workout(user: dict = Depends(get_current_user)):
    user_email = user["email"]
    
    # Fetch the workout plan
    workout_plan = db_workout_plans.get(user_email)
    if not workout_plan:
        raise HTTPException(status_code=404, detail="No workout plan found")

    return workout_plan["generated_plan"]

@router.get("/generate-new-workout/")
def update_workout(user: dict = Depends(get_current_user)):
    user_email = user["email"]

    workout = generate_workout(db_workout_plans[user_email]["preferences"], db_users[user_email])
    db_workout_plans[user_email]["generated_plan"] = workout

    return workout