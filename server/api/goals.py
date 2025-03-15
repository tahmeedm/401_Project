from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
router = APIRouter()

# Pydantic models
class FitnessGoal(BaseModel):
    goal_type: str  # Lose weight, Gain muscle, etc.
    target_value: int
    start_date: str
    end_date: Optional[str] = None

# Simulate a database
fake_goals_db = {}

# Create Fitness Goal
@router.post("/goals")
async def create_fitness_goal(goal: FitnessGoal):
    goal_id = len(fake_goals_db) + 1
    fake_goals_db[goal_id] = goal.dict()
    return {"goal_id": goal_id, "goal": fake_goals_db[goal_id]}

# Get Goal Details
@router.get("/goals/{goal_id}")
async def get_fitness_goal(goal_id: int):
    if goal_id not in fake_goals_db:
        raise HTTPException(status_code=404, detail="Goal not found")
    return fake_goals_db[goal_id]
