"""Tests for the LLM response handling in the server."""

import json
import unittest

from pydantic import ValidationError

from models import ServerDietResponse, ServerWorkoutResponse


class TestWorkoutTrainer(unittest.TestCase):
    """Tests for the LLM response handling in the server."""

    def load_json(self, file_path):
        """Helper function to load JSON from a file."""

        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    def test_workout_response_schema(self):
        """Test that the WorkoutResponse model is valid."""
        data = self.load_json("examples/workout_response.json")
        try:
            ServerWorkoutResponse(**data)
        except ValidationError as e:
            self.fail(f"WorkoutResponse schema validation failed: {e}")

    def test_diet_response_schema(self):
        """Test that the DietResponse model is valid."""
        data = self.load_json("examples/diet_response.json")
        try:
            ServerDietResponse(**data)
        except ValidationError as e:
            self.fail(f"DietResponse schema validation failed: {e}")

    def test_invalid_workout_response(self):
        """Test that the WorkoutResponse model raises a ValidationError for invalid input."""
        data = self.load_json("examples/tests/invalid_workout_response.json")
        with self.assertRaises(ValidationError):
            ServerWorkoutResponse(**data)

    def test_invalid_diet_response(self):
        """Test that the DietResponse model raises a ValidationError for invalid input."""
        data = self.load_json("examples/tests/invalid_diet_response.json")
        with self.assertRaises(ValidationError):
            ServerDietResponse(**data)


if __name__ == "__main__":
    unittest.main()
