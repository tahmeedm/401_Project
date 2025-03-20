
from datetime import datetime
from models import Progress
from agent import WorkoutTrainer

mock_workouts = {
    "workout_type": "Strength Training",
    "days_per_week": 4,
    "equipment_access": ["Dumbbells", "Bench"],
    "workout_duration": "45-60",
    "workouts": [
            {
                "day": "Monday",
                "exercises": [
                    {
                        "name": "Barbell Bench Press",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Incline Dumbbell Press",
                        "sets": 3,
                        "reps": 10,
                        "rest": 75
                    },
                    {
                        "name": "Dumbbell Flyes",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                    {
                        "name": "Overhead Press",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Lateral Raises",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                ]
            },
            {
                "day": "Tuesday",
                "exercises": [
                    {
                        "name": "Barbell Squats",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Romanian Deadlifts",
                        "sets": 3,
                        "reps": 10,
                        "rest": 75
                    },
                    {
                        "name": "Leg Press",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                    {
                        "name": "Leg Extensions",
                        "sets": 3,
                        "reps": 15,
                        "rest": 60
                    },
                    {
                        "name": "Hamstring Curls",
                        "sets": 3,
                        "reps": 15,
                        "rest": 60
                    },
                    {
                        "name": "Calf Raises",
                        "sets": 4,
                        "reps": 15,
                        "rest": 60
                    }
                ]
            },
            {
                "day": "Wednesday",
                "exercises": [
                    {
                        "name": "Pull-ups (or Lat Pulldowns)",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Barbell Rows",
                        "sets": 3,
                        "reps": 10,
                        "rest": 75
                    },
                    {
                        "name": "Seated Cable Rows",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                    {
                        "name": "Face Pulls",
                        "sets": 3,
                        "reps": 15,
                        "rest": 60
                    },
                    {
                        "name": "Bicep Curls (Barbell or Dumbbell)",
                        "sets": 3,
                        "reps": 10,
                        "rest": 60
                    },
                    {
                        "name": "Hammer Curls",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    }
                ]
            },
            {
                "day": "Thursday",
                "exercises": [
                    {
                        "name": "Overhead Press",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Incline Dumbbell Press",
                        "sets": 3,
                        "reps": 10,
                        "rest": 75
                    },
                    {
                        "name": "Lateral Raises",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                    {
                        "name": "Front Raises",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                    {
                        "name": "Triceps Dips",
                        "sets": 3,
                        "reps": 10,
                        "rest": 60
                    },
                    {
                        "name": "Close-Grip Bench Press",
                        "sets": 3,
                        "reps": 10,
                        "rest": 60
                    }
                ]
            },
            {
                "day": "Friday",
                "exercises": [
                    {
                        "name": "Deadlifts",
                        "sets": 1,
                        "reps": 5,
                        "rest": 120
                    },
                    {
                        "name": "Barbell Rows",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Pull-ups (or Lat Pulldowns)",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Dumbbell Rows",
                        "sets": 3,
                        "reps": 10,
                        "rest": 75
                    },
                    {
                        "name": "Bicep Curls (Barbell or Dumbbell)",
                        "sets": 3,
                        "reps": 10,
                        "rest": 60
                    },
                    {
                        "name": "Hammer Curls",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    }
                ]
            },
            {
                "day": "Saturday",
                "exercises": [
                    {
                        "name": "Barbell Squats",
                        "sets": 3,
                        "reps": 8,
                        "rest": 90
                    },
                    {
                        "name": "Romanian Deadlifts",
                        "sets": 3,
                        "reps": 10,
                        "rest": 75
                    },
                    {
                        "name": "Leg Press",
                        "sets": 3,
                        "reps": 12,
                        "rest": 60
                    },
                    {
                        "name": "Leg Extensions",
                        "sets": 3,
                        "reps": 15,
                        "rest": 60
                    },
                    {
                        "name": "Hamstring Curls",
                        "sets": 3,
                        "reps": 15,
                        "rest": 60
                    },
                    {
                        "name": "Calf Raises",
                        "sets": 4,
                        "reps": 15,
                        "rest": 60
                    }
                ]
            },
            {
                "day": "Sunday",
                "exercises": []
            }
        ]
}

mock_meals = {
    "calories": "medium",
    "allergies": ["Peanuts", "Shellfish"],
    "meals": [
                    {
                        "type": "Breakfast",
                        "name": "Scrambled eggs (3) with whole-wheat toast and avocado",
                        "calories": 480,
                        "carbs": 30,
                        "protein": 30,
                        "fat": 25
                    },
                    {
                        "type": "Snack",
                        "name": "Protein shake with spinach and peanut butter",
                        "calories": 320,
                        "carbs": 20,
                        "protein": 40,
                        "fat": 10
                    },
                    {
                        "type": "Lunch",
                        "name": "Tuna salad (made with Greek yogurt) on whole-wheat bread",
                        "calories": 500,
                        "carbs": 40,
                        "protein": 40,
                        "fat": 20
                    },
                    {
                        "type": "Snack",
                        "name": "Beef jerky and a handful of mixed nuts",
                        "calories": 280,
                        "carbs": 10,
                        "protein": 20,
                        "fat": 18
                    },
                    {
                        "type": "Dinner",
                        "name": "Chicken and vegetable skewers with couscous",
                        "calories": 650,
                        "carbs": 60,
                        "protein": 45,
                        "fat": 20
                    }
                ],
}

MOCK_PROGRESS = Progress(
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
    ]
)

MOCk_NEW_WORKOUT = {
    "workout_type": "Strength Training",
    "days_per_week": 4,
    "equipment_access": ["Dumbbells", "Bench"],
    "workout_duration": "45-60",
    "workouts": [
        {
            "day": "Monday",
            "exercises": [
                {"name": "Bench Press", "sets": 7, "reps": 8, "rest": "200s"},
                {"name": "Dumbbell Rows", "sets": 3, "reps": 12, "rest": "60s"},
                {"name": "Shoulder Press", "sets": 3, "reps": 10, "rest": "90s"},
                {"name": "Bicep Curls", "sets": 3, "reps": 12, "rest": "60s"},
            ],
        },
        {
            "day": "Wednesday",
            "exercises": [
                {"name": "Squats", "sets": 3, "reps": 10, "rest": "90s"},
                {"name": "Lunges", "sets": 3, "reps": 12, "rest": "60s"},
                {"name": "Leg Press", "sets": 3, "reps": 10, "rest": "90s"},
                {"name": "Calf Raises", "sets": 3, "reps": 15, "rest": "60s"},
            ],
        },
        {
            "day": "Friday",
            "exercises": [
                {"name": "Pull-ups", "sets": 3, "reps": 8, "rest": "90s"},
                {"name": "Push-ups", "sets": 3, "reps": 12, "rest": "60s"},
                {"name": "Tricep Dips", "sets": 3, "reps": 10, "rest": "60s"},
                {"name": "Plank", "sets": 3, "reps": 1, "rest": "60s"},
            ],
        },
        {
            "day": "Saturday",
            "exercises": [
                {"name": "Deadlifts", "sets": 3, "reps": 8, "rest": "120s"},
                {"name": "Lat Pulldowns", "sets": 3, "reps": 12, "rest": "60s"},
                {"name": "Face Pulls", "sets": 3, "reps": 15, "rest": "60s"},
                {"name": "Russian Twists", "sets": 3, "reps": 20, "rest": "60s"},
            ],
        },
    ],
}
def generate_workout(workout, biometrics):
    print(workout, biometrics)
    llm_instance = WorkoutTrainer()
    workout = mock_workouts
    workout_plan = llm_instance.generate_workout_plan(workout, biometrics)
    print(workout_plan)
    if "workout" in workout_plan:
        workout["workouts"] = workout_plan["workout"]
    return workout

def generate_meal_plan(workout, meal_plan, biometrics):
    print(meal_plan, biometrics)
    llm_instance = WorkoutTrainer()
    meal_plan = mock_meals
    diet_plan = llm_instance.generate_diet_plan(workout, biometrics, meal_plan)
    print(diet_plan)
    if "diet_plan" in diet_plan:
        meal_plan["meals"] = diet_plan["diet_plan"][0]["meals"]
    return meal_plan

def generate_progress():
    return MOCK_PROGRESS

def generate_new_workout():
    return MOCk_NEW_WORKOUT
    