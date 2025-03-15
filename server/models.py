from pydantic import BaseModel
from typing import Optional

# Pydantic models (simulating database tables)

class User(BaseModel):
    name: str
    age: int
    height: float
    weight: float
    fitness_level: str
    dietary_preference: str

class Goal(BaseModel):
    goal_type: str  # (e.g., weight_loss, muscle_gain)
    goal_value: float  # target weight or muscle mass

class WorkoutPlan(BaseModel):
    workout_routine: str

class MealPlan(BaseModel):
    meal_plan: str
