from fastapi import APIRouter
from crud import get_meal_plans, create_meal_plans
from models import MealPlan
router = APIRouter()


# Generate meal plan (simulated)
@router.post("/meal-plan")
def create_meal_plan(meal_plan: MealPlan):
    meal_id = create_meal_plans(meal_plan)
    return {"meal Id": meal_id, "meal_plan": meal_plan}

# Get meal plan (simulated)
@router.get("/meal-plan/{user_id}")
def get_meal_plan(user_id: int):
    meal_plan = get_meal_plans(user_id)
    return {"meal_plan": meal_plan}
