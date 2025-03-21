from typing import List
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

class Profile(Base):
    __tablename__ = 'user_profiles'

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, unique=True, index=True)  # For referencing the user (Email)
    name = Column(String)
    age = Column(Integer)
    sex = Column(String)
    height = Column(Integer)
    weight = Column(Integer)
    fitness_level = Column(String)
    dietary_preference = Column(String, nullable=True)


class WorkoutPlan(Base):
    __tablename__ = "workout_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, unique=True, index=True)
    preferences = Column(JSONB)  # Store preferences as JSONB
    generated_plan = Column(JSONB)


class MealPlan(Base):
    __tablename__ = "meal_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, unique=True, index=True)
    preferences = Column(JSONB)  # Store preferences as JSONB
    generated_plan = Column(JSONB)

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, unique=True, index=True)
    weight = Column(JSONB) 
    workouts_completed = Column(Integer)
    streak = Column(Integer)
    calories_burned = Column(Integer)
    last_workout_day = Column(Integer)
    personal_records = Column(JSONB)  




####################
######LLM MODELS####
####################

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