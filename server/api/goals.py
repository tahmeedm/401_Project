# from fastapi import APIRouter, Depends
# from schemas import FitnessGoal
# from crud import db_goals, get_current_user

# router = APIRouter()

# @router.post("/goals/")
# def create_goal(goal: FitnessGoal, user: dict = Depends(get_current_user)):
#     db_goals[user["email"]] = goal
#     return {"message": "Goal created successfully"}

# @router.get("/goals/")
# def get_goal(user: dict = Depends(get_current_user)):
#     return db_goals.get(user["email"], {"message": "No goal found"})
