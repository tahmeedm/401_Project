from database import get_db
from schemas import ProgressModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import User, Profile, WorkoutPlan, MealPlan, Progress
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# CRUD Operations
def create_user(db: Session, email: str, password: str):
    hashed_password = hash_password(password)
    db_user = User(email=email, password=hashed_password)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise ValueError("User already exists")
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt_token(email: str):
    to_encode = {"sub": email}
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = get_user_by_email(db, email=email)  # ✅ Use db session here
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Function to create a profile
def create_profile(db: Session, email: str, profile: Profile):
    db_profile = db.query(Profile).filter(Profile.user_email == email).first()
    if db_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

# Function to get a profile
def get_profile(db: Session, email: str):
    return db.query(Profile).filter(Profile.user_email == email).first()

# Create workout plan
def create_workout_plan(db: Session, user_email: str, preferences: dict, generated_plan: dict):
    db_workout = WorkoutPlan(user_email=user_email, preferences=preferences, generated_plan=generated_plan)
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    return db_workout

# Get workout plan
def get_workout_plan(db: Session, user_email: str):
    db_workout = db.query(WorkoutPlan).filter(WorkoutPlan.user_email == user_email).first()
    return db_workout

# Update workout plan
def update_workout_plan(db: Session, user_email: str, preferences: dict, generated_plan: dict):
    db_workout = db.query(WorkoutPlan).filter(WorkoutPlan.user_email == user_email).first()
    if db_workout:
        db_workout.preferences = preferences
        db_workout.generated_plan = generated_plan
        db.commit()
        db.refresh(db_workout)
        return db_workout
    else:
        raise HTTPException(status_code=404, detail="Workout plan not found")


def create_meal_plan(db: Session, user_email: str, preferences: dict, generated_plan: dict):
    db_meal = MealPlan(user_email=user_email, preferences=preferences, generated_plan=generated_plan)
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal

def get_meal_plan(db: Session, user_email: str):
    db_meal = db.query(MealPlan).filter(MealPlan.user_email == user_email).first()
    return db_meal

def update_meal_plan(db: Session, user_email: str, preferences: dict, generated_plan: dict):
    db_meal = db.query(MealPlan).filter(MealPlan.user_email == user_email).first()
    if db_meal:
        db_meal.preferences = preferences
        db_meal.generated_plan = generated_plan
        db.commit()
        db.refresh(db_meal)
        return db_meal
    else:
        raise HTTPException(status_code=404, detail="Meal plan not found")


def create_progress(db: Session, user_email: str, progress_data: ProgressModel):
    db_progress = Progress(
        user_email=user_email,
        weight=progress_data.weight,
        workouts_completed=progress_data.workouts_completed,
        streak=progress_data.streak,
        calories_burned=progress_data.calories_burned,
        last_workout_day=progress_data.last_workout_day,
        personal_records=progress_data.personal_records
    )
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress

def get_progress(db: Session, user_email: str):
    db_progress = db.query(Progress).filter(Progress.user_email == user_email).first()
    return db_progress

def update_progress(db: Session, user_email: str, progress_data: dict):
    db_progress = db.query(Progress).filter(Progress.user_email == user_email).first()
    if db_progress:
        db_progress.weight = progress_data.get("weight", db_progress.weight)
        db_progress.workouts_completed = progress_data.get("workouts_completed", db_progress.workouts_completed)
        db_progress.streak = progress_data.get("streak", db_progress.streak)
        db_progress.calories_burned = progress_data.get("calories_burned", db_progress.calories_burned)
        db_progress.last_workout_day = progress_data.get("last_workout_day", db_progress.last_workout_day)
        db_progress.personal_records = progress_data.get("personal_records", db_progress.personal_records)
        
        db.commit()
        db.refresh(db_progress)
        return db_progress
    else:
        raise HTTPException(status_code=404, detail="Progress not found")