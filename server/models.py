"""Definitions of Pydantic models for fitmate."""

from typing import List, Optional
from pydantic import BaseModel

# Pydantic models (simulating database tables)


class UserProfile(BaseModel):
    """User profile information."""

    name: str
    age: int
    sex: str
    height: int
    weight: int
    fitness_level: str
    dietary_preference: Optional[str] = None


# Pydantic models
class FitnessGoal(BaseModel):
    """A fitness goal that a user wants to achieve."""

    goal_type: str  # Lose weight, Gain muscle, etc.
    target_value: int
    start_date: str
    end_date: Optional[str] = None


# Define the models for Workout
class Exercise(BaseModel):
    """A model representing an exercise."""

    name: str
    sets: int
    reps: int
    rest: int


class Workout(BaseModel):
    """A model representing a workout of a day."""

    day: str
    exercises: List[Exercise]


class ServerWorkoutResponse(BaseModel):
    """A model representing the response from the server for a 7-day workout plan."""

    workout: List[Workout]


# Define the models for Diet
class Meal(BaseModel):
    """A model representing a meal in the diet plan."""

    type: str
    name: str
    calories: int
    carbs: int
    protein: int
    fat: int


class DayDietPlan(BaseModel):
    """A model representing a day's diet plan."""

    day: str
    meals: List[Meal]


class ServerDietResponse(BaseModel):
    """A model representing the response from the server for a 7-day diet plan."""

    diet_plan: List[DayDietPlan]
