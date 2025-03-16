from fastapi import FastAPI
from api import auth, profile, goals, workout, meal, progress

# Create the FastAPI application instance
app = FastAPI()

# Include the routers for different API endpoints
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(goals.router)
app.include_router(workout.router)
app.include_router(meal.router)
app.include_router(progress.router)
