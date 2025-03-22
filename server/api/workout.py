"""Workout routes for the fitmate application."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas import WorkoutPlanModel, UserRequest
from crud import (
    get_profile,
    get_current_user,
    create_workout_plan,
    update_workout_plan,
    get_workout_plan,
)
from models import WorkoutPlan
from database import get_db  # Assuming you have a function to get DB session
from llm import generate_workout

router = APIRouter()


@router.post("/workout-plan/")
def create_workout(
    workout: WorkoutPlanModel,
    db: Session = Depends(get_db),
    user: UserRequest = Depends(get_current_user),
):
    user_email = user.email

    profile = get_profile(db, user_email)

    generated_workout = generate_workout(workout, profile)
    print(generated_workout)
    workout_plan = WorkoutPlan(
        user_email=user_email,
        preferences=workout,
        generated_plan=generated_workout,
    )

    check_workout_plan = get_workout_plan(db, user_email)
    if check_workout_plan:
        update_workout_plan(
            db, user_email, workout_plan.preferences.dict(), generated_workout
        )
        return {
            "message": "Workout plan updated successfully",
            "workout_plan": workout_plan,
        }

    db_workout_plans = create_workout_plan(
        db, user_email, workout_plan.preferences.dict(), generated_workout
    )

    return {
        "message": "Workout plan created successfully",
        "workout_plan": db_workout_plans,
    }


# Get Workout Plan
@router.get("/workout-plan/")
def get_workout(
    db: Session = Depends(get_db), user: UserRequest = Depends(get_current_user)
):
    user_email = user.email
    workout_plan = get_workout_plan(db, user_email)
    if not workout_plan:
        raise HTTPException(status_code=404, detail="No workout plan found")

    return workout_plan.generated_plan


@router.get("/generate-new-workout/")
def update_workout(
    db: Session = Depends(get_db), user: UserRequest = Depends(get_current_user)
):

    profile = get_profile(db, user.email)
    workout = get_workout_plan(db, user.email)
    new_workout = generate_workout(workout.preferences, profile)
    workout_plan = WorkoutPlan(
        user_email=user.email,
        preferences=workout.preferences,
        generated_plan=new_workout,
    )
    update_workout_plan(db, user.email, workout_plan.preferences, new_workout)
    return new_workout
