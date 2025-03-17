from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

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
    workout_type: str
    days_per_week: int
    equipment_access: List[str]
    workout_duration: str  # Example: "30-45" minutes


class MealPlan(BaseModel):
    calories: str = Field(..., pattern="^(low|medium|high)$", description="Caloric intake preference")
    allergies: List[str] = Field(default=[], description="List of allergies")

# class WorkoutData(BaseModel):
#     workout_type: str
#     days_per_week: int
#     equipment: List[str]
#     workout_duration: str

# User model
class User(BaseModel):
    email: EmailStr
    password: str

# Token response model
class TokenResponse(BaseModel):
    token: str