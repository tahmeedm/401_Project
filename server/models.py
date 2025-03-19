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
    equipment_access: List[str]

class MealPlan(BaseModel):
    calories: str = Field(..., pattern="^(low|medium|high)$", description="Caloric intake preference")
    allergies: List[str] = Field(default=[], description="List of allergies")


class Progress(BaseModel):
    weight: List[dict]
    workouts_completed: int
    streak: int
    calories_burned: int
    last_workout_day: int
    personal_records: List[dict]
