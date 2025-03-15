from fastapi import APIRouter
from ..crud import generate_meal_plan, get_meal_plans
router = APIRouter()


# Generate meal plan (simulated)
@router.post("/meal-plan")
def create_meal_plan(user_id: int):
    meal_plan = generate_meal_plan(user_id)
    return {"meal_plan": meal_plan}

# Get meal plan (simulated)
@router.get("/meal-plan/{user_id}")
def get_meal_plan(user_id: int):
    meal_plan = get_meal_plans(user_id)
    return {"meal_plan": meal_plan}
