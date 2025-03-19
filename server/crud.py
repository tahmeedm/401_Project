from passlib.context import CryptContext
from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
import jwt
import datetime
from models import UserProfile, FitnessGoal, WorkoutPlan, MealPlan

# In-memory storage (mock database)
db_users = {}
db_goals = {}
db_workout_plans = {}
db_meal_plans = {}
auth_db = {}
db_progress = {}

# Security Setup
SECRET_KEY = "supersecretkey"
TOKEN_EXPIRY_MINUTES = 30
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash & Verify Passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Generate JWT Token
def create_jwt_token(email: str):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(minutes=TOKEN_EXPIRY_MINUTES)
    payload = {"sub": email, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Decode JWT & Get Current User
def get_current_user(token: str = Security(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None or email not in auth_db:
            raise HTTPException(status_code=401, detail="Invalid token")
        return auth_db[email]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_progress(user_id: int):
    return db_goals.get(user_id, {"message": "No progress found"})
