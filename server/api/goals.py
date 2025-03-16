from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from models import FitnessGoal
from crud import get_goal, create_goal
router = APIRouter()


# Create Fitness Goal
@router.post("/goals")
async def create_fitness_goal(goal: FitnessGoal):
    goal_id = create_goal(goal)
    return {"goal_id": goal_id, "goal": goal}

# Get Goal Details
@router.get("/goals/{goal_id}")
async def get_fitness_goal(goal_id: int):
    goal = get_goal(goal_id)
    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal
