from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api import auth, profile, goals, workout, meal, progress

app = FastAPI()

# List of allowed origins (can also be "*" to allow all domains)
origins = [
    "http://localhost:3000",
    "https://yourfrontenddomain.com",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allowed origins (list of URLs)
    allow_credentials=True,  # Allow credentials like cookies or authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],
)

# Include the routers for different API endpoints
app.include_router(auth.router, prefix="/api")
app.include_router(profile.router, prefix="/api")
# app.include_router(goals.router, prefix="/api")
app.include_router(workout.router, prefix="/api")
app.include_router(meal.router, prefix="/api")
app.include_router(progress.router, prefix="/api")
