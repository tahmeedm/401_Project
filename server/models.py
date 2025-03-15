from pydantic import BaseModel
from typing import Optional

# Pydantic models (simulating database tables)

class UserProfile(BaseModel):
    name: str
    age: int
    sex: str
    height: int
    weight: int
    fitness_level: str
    dietary_preference: Optional[str] = None

# Pydantic models
class FitnessGoal(BaseModel):
    goal_type: str  # Lose weight, Gain muscle, etc.
    target_value: int
    start_date: str
    end_date: Optional[str] = None


class WorkoutPlan(BaseModel):
    workout_routine: str

class MealPlan(BaseModel):
    meal_plan: str
