from fastapi import APIRouter
from ..crud import generate_meal_plan

router = APIRouter()

# Get meal plan (simulated)
@router.get("/meal-plan/{user_id}")
def get_meal_plan(user_id: int):
    meal_plan = generate_meal_plan(user_id)
    return {"meal_plan": meal_plan}
