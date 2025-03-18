from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class User(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    token: str

class UserProfile(BaseModel):
    name: str
    age: int
    sex: str
    height: int
    weight: int
    fitness_level: str
    dietary_preference: Optional[str] = None

class FitnessGoal(BaseModel):
    goal_type: str
    target_value: int
    start_date: str
    end_date: Optional[str] = None

class WorkoutPlan(BaseModel):
    workout_type: str
    days_per_week: int
    equipment_access: List[str]
    workout_duration: str

class MealPlan(BaseModel):
    calories: str = Field(..., pattern="^(low|medium|high)$", description="Caloric intake preference")
    allergies: List[str] = Field(default=[], description="List of allergies")
