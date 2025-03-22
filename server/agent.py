"""The logic for the fitmate LLM interactions."""

import os
import sys
from threading import Lock

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
from pydantic import ValidationError

from prompts import DIET_PLAN_PROMPT, WORKOUT_PLAN_PROMPT
from models import ServerDietResponse, ServerWorkoutResponse

GEMINI_MODEL = "gemini-2.0-flash-lite"

try:
    GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
except KeyError as e:
    print("GOOGLE_API_KEY not set. Please set it in your environment variables.")
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
        self.llm = ChatGoogleGenerativeAI(model=GEMINI_MODEL, api_key=GOOGLE_API_KEY)
        self.parser = JsonOutputParser()

    def generate_workout_plan(
        self, goal="general fitness", biometrics="not provided", max_retries=3
    ):
        """
        Generate a workout plan based on user goals.

        Args:
            goal (str, optional): The fitness goal for which the workout plan is being generated.
                Defaults to "general fitness".
            biometrics (str, optional): The user's biometric information, such as age, weight,
                and height. Defaults to "not provided".
            max_retries (int, optional): The maximum number of retries to attempt if the
               API call fails. Defaults to 3.

        Returns:
            dict: A dictionary containing the generated workout plan.
        """
        retry = max_retries
        while retry > 0:
            try:
                response = self.llm.invoke(
                    WORKOUT_PLAN_PROMPT.format(goal=goal, biometrics=biometrics)
                )

                # Parse and validate
                output = self.parser.parse(response.content)
                if isinstance(output, list) and len(output) > 0:
                    output = output[0]
                ServerWorkoutResponse(**output)

                return output
            except OutputParserException as e:
                print(f"OutputParserException occurred: {e}. Retrying ({retry})...")
                retry -= 1
            except ValidationError as e:
                print(f"ValidationError occurred: {e}. Retrying ({retry})...")
                retry -= 1

        return {"error": f"Failed to generate workout plan after {max_retries} retries"}

    def generate_diet_plan(
        self,
        goal="general fitness",
        biometrics="not provided",
        dietary_preferences="balanced",
        max_retries=3,
    ):
        """
        Generate a diet plan based on user preferences.

        Args:
            goal (str, optional): The health or fitness goal for which the diet plan is
                being generated. Defaults to "general fitness".
            biometrics (str, optional): The user's biometric information, such as age, weight,
                and height. Defaults to "not provided".
            dietary_preferences (str, optional): The user's dietary preferences, such as
                vegetarian, vegan, etc. Defaults to "balanced".
            max_retries (int, optional): The maximum number of retries to attempt if the
                API call fails. Defaults to 3.

        Returns:
            dict: A dictionary containing the generated diet plan.
        """
        retry = max_retries
        while retry > 0:
            try:
                response = self.llm.invoke(
                    DIET_PLAN_PROMPT.format(
                        goal=goal,
                        biometrics=biometrics,
                        dietary_preferences=dietary_preferences,
                    ),
                )

                # Parse and Validate
                output = self.parser.parse(response.content)
                ServerDietResponse(**output)

                return output
            except OutputParserException as e:
                print(f"OutputParserException occurred: {e}. Retrying ({retry})...")
                retry -= 1
            except ValidationError as e:
                print(f"ValidationError occurred: {e}. Retrying ({retry})...")
                retry -= 1

        return {"error": f"Failed to generate diet plan after {max_retries} retries"}
