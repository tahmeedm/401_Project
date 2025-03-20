from fastapi import APIRouter, Depends, HTTPException
from models import MealPlan
from crud import db_meal_plans,db_workout_plans, db_users, get_current_user
from llm import generate_meal_plan

router = APIRouter()

@router.post("/meal-plan/")
def create_meal(meal: MealPlan, user: dict = Depends(get_current_user)):
    user_email = user["email"]
    db_meal_plans[user_email] = {
        "preferences": meal,
        "generated_plan": generate_meal_plan(db_workout_plans[user_email], meal, db_users[user_email]),  # Simulated AI-generated workout plan
    }
    return {"message": "Meal plan created successfully"}

@router.get("/meal-plan/")
def get_meal(user: dict = Depends(get_current_user)):
    user_email = user["email"]
    
    # Fetch the workout plan
    workout_plan = db_meal_plans.get(user_email)
    if not workout_plan:
        raise HTTPException(status_code=404, detail="No workout plan found")

    return workout_plan["generated_plan"]