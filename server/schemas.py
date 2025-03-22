"""Definitions of Pydantic models for fitmate."""

from typing import List, Optional

from pydantic import BaseModel, Field


class UserRequest(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True


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

    class Config:
        from_attributes = True


class WorkoutPlanModel(BaseModel):
    workout_type: str
    equipment_access: List[str]

    class config:
        from_attributes = True


class MealPlanModel(BaseModel):
    calories: str = Field(
        ...,
        pattern="^(low|medium|high)$",
        description="Caloric intake preference",
    )
    allergies: List[str] = Field(default=[], description="List of allergies")

    class Config:
        from_attributes = True


class ProgressModel(BaseModel):
    weight: List[dict]
    workouts_completed: int
    streak: int
    calories_burned: int
    last_workout_day: int
    personal_records: List[dict]

    class config:
        from_attributes = True
