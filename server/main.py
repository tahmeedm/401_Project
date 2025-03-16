from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api import auth, profile, goals, workout, meal, progress

# Create the FastAPI application instance
app = FastAPI()

# List of allowed origins (can also be "*" to allow all domains)
origins = [
    "http://localhost:3000",  # Frontend running on localhost:3000 (adjust as needed)
    "https://yourfrontenddomain.com",  # Replace with your frontend domain
    # "*"  # Uncomment this if you want to allow all origins (caution)
]

# Add CORSMiddleware to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allowed origins (list of URLs)
    allow_credentials=True,  # Allow credentials like cookies or authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the routers for different API endpoints
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(goals.router)
app.include_router(workout.router)
app.include_router(meal.router)
app.include_router(progress.router)
