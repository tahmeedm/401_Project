from typing import List, Optional
from .models import User, Goal, WorkoutPlan, MealPlan

# In-memory storage (simulating a database)
db_users = {}
db_goals = {}
db_workout_plans = {}
db_meal_plans = {}

# Helper functions to simulate DB operations
def create_user(profile: User):
    user_id = len(db_users) + 1  # Simulate user ID generation
    db_users[user_id] = profile
    return profile

def get_user(user_id: int):
    return db_users.get(user_id)

def create_goal(user_id: int, goal: Goal):
    db_goals[user_id] = goal
    return goal

def get_goal(user_id: int):
    return db_goals.get(user_id)

def generate_workout_plan(user_id: int):
    # Placeholder logic for generating a workout plan
    return f"Workout plan for user {user_id}: 3 days a week, full-body workout."

def generate_meal_plan(user_id: int):
    # Placeholder logic for generating a meal plan
    return f"Meal plan for user {user_id}: 3 meals a day, balanced diet."
    
def get_progress(user_id: int):
    # Placeholder logic for tracking progress
    return {"weight": 75.0, "workout_performance": "Increase in strength", "calories_intake": 2200}
