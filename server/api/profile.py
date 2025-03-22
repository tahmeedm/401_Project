"""Profile routes for the fitmate application."""

import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas import UserProfile, UserRequest
from models import Profile
from crud import get_profile, create_profile, get_current_user
from database import get_db  # Assuming you have a function to get DB session
from fastapi import Depends

router = APIRouter()

logger = logging.getLogger(__name__)


@router.post("/profile/")
def create_profile_endpoint(
    profile: UserProfile,
    db: Session = Depends(get_db),
    user: UserRequest = Depends(get_current_user),
):
    try:
        logger.info(f"Creating profile for user: {user}")
        new_profile = Profile(
            name=profile.name,
            age=profile.age,
            weight=profile.weight,
            height=profile.height,
            sex=profile.sex,
            fitness_level=profile.fitness_level,
            dietary_preference=profile.dietary_preference,
            user_email=user.email,
        )
        db_profile = create_profile(
            db=db, email=user.email, profile=new_profile
        )
        return {
            "message": "Profile created successfully",
            "profile": db_profile,
        }
    except Exception as e:
        logger.error(f"Error creating profile: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/profile/")
def get_profile_endpoint(
    db: Session = Depends(get_db), user: UserRequest = Depends(get_current_user)
):
    email = user.email
    db_profile = get_profile(db=db, email=email)
    if db_profile is None:
        raise HTTPException(status_code=404, detail="No profile found")
    return db_profile
