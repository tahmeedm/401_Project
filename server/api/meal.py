"""Meal routes for the fitmate application."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas import MealPlanModel, UserRequest
from models import MealPlan
from crud import (
    get_profile,
    get_current_user,
    get_workout_plan,
    create_meal_plan,
    update_meal_plan,
    get_meal_plan,
)
from database import get_db  # Assuming you have a function to get DB session
from llm import generate_meal_plan

router = APIRouter()


@router.post("/meal-plan/")
def create_meal(
    meal: MealPlanModel,
    db: Session = Depends(get_db),
    user: UserRequest = Depends(get_current_user),
):
    user_email = user.email
    # Retrieve user profile
    profile = get_profile(db, user_email)
    # retrieve workout plan
    workout_plan = get_workout_plan(db, user_email)

    generated_meal = generate_meal_plan(workout_plan, meal, profile)
    meal_plan = MealPlan(
        user_email=user_email, preferences=meal, generated_plan=generated_meal
    )

    check_meal_plan = get_meal_plan(db, user_email)
    if check_meal_plan:
        update_meal_plan(
            db, user_email, meal_plan.preferences.dict(), generated_meal
        )
        return {"message": "Meal plan updated successfully"}
    # Store meal preferences
    db_meal_plans = create_meal_plan(
        db, user_email, meal_plan.preferences.dict(), generated_meal
    )

    return {
        "message": "Meal plan created successfully",
        "meal_plan": db_meal_plans,
    }


@router.get("/meal-plan/")
def get_meal(
    db: Session = Depends(get_db), user: UserRequest = Depends(get_current_user)
):
    user_email = user.email
    meal_plan = get_meal_plan(db, user_email)
    if not meal_plan:
        raise HTTPException(status_code=404, detail="No meal plan found")

    return meal_plan.generated_plan
