"""The logic for the fitmate LLM interactions."""

import os
import sys
import json
from threading import Lock

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser

from server.prompts import DIET_PLAN_PROMPT, WORKOUT_PLAN_PROMPT

GEMINI_MODEL = "gemini-2.0-flash-lite"

try:
    GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
except KeyError as e:
    print(
        "GOOGLE_API_KEY not set. Please set it in your environment variables."
    )
    sys.exit(1)


class WorkoutTrainer:
    """A singleton class to manage the interactions with the LLM"""

    _instance = None
    _lock = Lock()

    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(WorkoutTrainer, cls).__new__(cls)
                cls._instance.__init__()
        return cls._instance

    def __init__(self):
        """Initialize the Gemini LLM instance."""
        self.llm = ChatGoogleGenerativeAI(
            model=GEMINI_MODEL, api_key=GOOGLE_API_KEY
        )
        self.parser = JsonOutputParser()

    def generate_workout_plan(
        self, goal="general fitness", biometrics="not provided"
    ):
        """Generate a workout plan based on user goals."""
        response = self.llm.invoke(
            WORKOUT_PLAN_PROMPT.format(goal=goal, biometrics=biometrics)
        )
        return self.parser.parse(response.content)

    def generate_diet_plan(
        self, goal, biometrics, dietary_preferences="balanced"
    ):
        """Generate a diet plan based on user preferences."""
        response = self.llm.invoke(
            DIET_PLAN_PROMPT.format(
                goal=goal,
                biometrics=biometrics,
                dietary_preferences=dietary_preferences,
            ),
        )

        return self.parser.parse(response.content)


if __name__ == "__main__":
    # User input
    GOAL = "muscle gain"
    BIOMETRICS = "180 lbs, 6'2\" tall"
    DIETARY_PREFERENCES = "high protein"

    # LLM response
    llm_instance = WorkoutTrainer()
    workout_plan = llm_instance.generate_workout_plan(GOAL, BIOMETRICS)
    diet_plan = llm_instance.generate_diet_plan(
        GOAL, BIOMETRICS, DIETARY_PREFERENCES
    )

    print(
        "Response of FitMate trainer:",
        json.dumps(
            {"workout_plan": workout_plan, "diet_plan": diet_plan}, indent=4
        ),
    )
