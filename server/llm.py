
from datetime import datetime
from models import Progress

MOCK_WORKOUTS = {
    "workout_type": "Strength Training",
    "days_per_week": 4,
    "equipment_access": ["Dumbbells", "Bench"],
    "workout_duration": "45-60",
    "workouts": [
        {
            "day": "Monday",
            "exercises": [
                {"name": "Bench Press", "sets": 3, "reps": 10, "rest": "90s"},
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

MOCK_MEALS = {
    "calories": "medium",
    "allergies": ["Peanuts", "Shellfish"],
    "meals": [
        {
            "type": "Breakfast",
            "name": "Greek Yogurt with Berries and Granola",
            "calories": 350,
            "protein": 20,
            "carbs": 45,
            "fat": 10,
        },
        {
            "type": "Lunch",
            "name": "Grilled Chicken Salad with Avocado",
            "calories": 450,
            "protein": 35,
            "carbs": 20,
            "fat": 25,
        },
        {
            "type": "Dinner",
            "name": "Salmon with Quinoa and Roasted Vegetables",
            "calories": 550,
            "protein": 40,
            "carbs": 45,
            "fat": 20,
        },
        {
            "type": "Snack",
            "name": "Protein Shake with Banana",
            "calories": 250,
            "protein": 25,
            "carbs": 30,
            "fat": 5,
        },
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
def generate_workout(workout):
    return MOCK_WORKOUTS

def generate_meal_plan(meal_plan):
    return MOCK_MEALS

def generate_progress():
    return MOCK_PROGRESS

def generate_new_workout():
    return MOCk_NEW_WORKOUT
    