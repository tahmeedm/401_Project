from typing import List, Optional
from models import UserProfile, WorkoutPlan, MealPlan, FitnessGoal
from passlib.context import CryptContext
import jwt
import datetime
# In-memory storage (simulating a database)
db_users = {}
db_goals = {}
db_workout_plans = {}
db_meal_plans = {}
auth_db = {}

# Helper functions to simulate DB operations
def create_user(profile: UserProfile):
    user_id = len(db_users) + 1  # Simulate user ID generation
    db_users[user_id] = profile
    return user_id

def get_user(user_id: int):
    return db_users.get(user_id)

def create_goal(goal: FitnessGoal):
    goal_id = len(db_goals) + 1  # Simulate goal ID generation
    db_goals[goal_id] = goal
    return goal_id

def get_goal(user_id: int):
    return db_goals.get(user_id)

# def create_workout_plans(user_id: int):
#     profile = get_user(user_id)
#     # generate workout plan based on user's fitness level
#     workout_plan = ["Monday: Chest and Triceps", "Wednesday: Back and Biceps", "Friday: Legs and Shoulders"]
#     db_workout_plans[user_id] = workout_plan
#     return workout_plan

def create_workout_plans(workout_data: WorkoutPlan):
    user_id = len(db_workout_plans) + 1  # Simulate user ID generation
    db_workout_plans[user_id] = workout_data
    return workout_data

def get_workout_plan(user_id: int):
    # Placeholder logic for generating a workout plan
    return db_workout_plans.get(user_id)

def generate_meal_plan(user_id: int):
    profile = get_user(user_id)
    # generate meal plan based on user's dietary preference from LLM
    meal_plan = ["Breakfast: Oatmeal", "Lunch: Grilled Chicken Salad", "Dinner: Salmon with Vegetables"]
    db_meal_plans[user_id] = meal_plan
    return meal_plan

def create_meal_plans(meal_plan: MealPlan):
    user_id = len(db_meal_plans) + 1  # Simulate user ID generation
    db_meal_plans[user_id] = meal_plan
    return meal_plan

def get_meal_plans(user_id: int):
    return db_meal_plans.get(user_id)
    
def get_progress(user_id: int):
    return {"weight": 75.0, "workout_performance": "Increase in strength", "calories_intake": 2200}



## auth
# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key for JWT
SECRET_KEY = "supersecretkey" 

# JWT Token Expiry
TOKEN_EXPIRY_MINUTES = 30



# Helper function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Helper function to verify passwords
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Helper function to create JWT token
def create_jwt_token(email: str):
    expiration = datetime.datetime.now() + datetime.timedelta(minutes=TOKEN_EXPIRY_MINUTES)
    payload = {"sub": email, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")