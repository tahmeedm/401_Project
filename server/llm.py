import json
from datetime import datetime
from schemas import ProgressModel
from agent import WorkoutTrainer

with open("examples/mock-workouts.json", "r", encoding="utf-8") as file:
    MOCK_WORKOUTS = json.load(file)

with open("examples/mock-meals.json", "r", encoding="utf-8") as file:
    MOCK_MEALS = json.load(file)

MOCK_PROGRESS = ProgressModel(
    weight=[
        {"date": "2023-01-01", "value": 80},
        {"date": "2023-01-15", "value": 79},
        {"date": "2023-02-01", "value": 78},
        {"date": "2023-02-15", "value": 77},
    ],
    workouts_completed=0,
    streak=0,
    calories_burned=0,
    last_workout_day=int(datetime.today().strftime("%Y%m%d")),
    personal_records=[
        {"exercise": "Bench Press", "value": "80kg", "date": "2023-02-10"},
        {"exercise": "Squat", "value": "120kg", "date": "2023-02-05"},
        {"exercise": "Deadlift", "value": "140kg", "date": "2023-01-20"},
    ],
)

with open("mock-workouts.json", "r", encoding="utf-8") as file:
    MOCK_NEW_WORKOUT = json.load(file)


def generate_workout(workout, biometrics):
    print(workout, biometrics)
    llm_instance = WorkoutTrainer()
    workout = MOCK_WORKOUTS
    workout_plan = llm_instance.generate_workout_plan(workout, biometrics)
    if "workout" in workout_plan:
        workout["workouts"] = workout_plan["workout"]
    return workout


def generate_meal_plan(workout, meal_plan, biometrics):
    print(meal_plan, biometrics)
    llm_instance = WorkoutTrainer()
    meal_plan = MOCK_MEALS
    diet_plan = llm_instance.generate_diet_plan(workout, biometrics, meal_plan)
    print(diet_plan)
    if "diet_plan" in diet_plan:
        meal_plan["meals"] = diet_plan["diet_plan"][0]["meals"]
    return meal_plan


def generate_progress():
    return MOCK_PROGRESS


def generate_new_workout():
    return MOCK_NEW_WORKOUT
