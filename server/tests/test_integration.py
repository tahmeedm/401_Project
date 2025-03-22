import pytest
from fastapi.testclient import TestClient
from main import app  # Ensure this imports your FastAPI app instance

client = TestClient(app)

# Mock Data
REGISTER_PAYLOAD = {"email": "test@example.com", "password": "password123"}
LOGIN_PAYLOAD = {"email": "test@example.com", "password": "password123"}
PROFILE_PAYLOAD = {
    "name": "John Doe",
    "age": 30,
    "weight": 70,
    "height": 175,
    "sex": "male",
    "fitness_level": "intermediate",
    "dietary_preference": "vegetarian"
}

MEAL_PLAN_PAYLOAD = {"calories": 2500, "preferences": "vegan"}
WORKOUT_PLAN_PAYLOAD = {"goal": "muscle_gain", "experience": "beginner"}
PROGRESS_PAYLOAD = {"weight": 72, "steps": 10000}

def get_auth_token():
    client.post("/api/register/", json=REGISTER_PAYLOAD)
    response = client.post("/api/login/", json=LOGIN_PAYLOAD)
    return response.json().get("token")


def test_register_user():
    response = client.post("/api/register/", json=REGISTER_PAYLOAD)
    assert response.status_code == 200
    assert "User registered successfully" in response.json()["message"]

def test_register_existing_user():
    client.post("/api/register/", json=REGISTER_PAYLOAD)
    response = client.post("/api/register/", json=REGISTER_PAYLOAD)
    assert response.status_code == 400
    assert "User already exists" in response.json()["detail"]

def test_login_user():
    client.post("/api/register/", json=REGISTER_PAYLOAD)
    response = client.post("/api/login/", json=LOGIN_PAYLOAD)
    assert response.status_code == 200
    assert "token" in response.json()

def test_login_invalid_user():
    response = client.post("/api/login/", json={"email": "invalid@example.com", "password": "wrong"})
    assert response.status_code == 401
    assert "Invalid credentials" in response.json()["detail"]

def test_create_profile():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/api/profile/", json=PROFILE_PAYLOAD, headers=headers)
    assert response.status_code == 200
    assert "Profile created successfully" in response.json()["message"]

def test_get_profile():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/api/profile/", json=PROFILE_PAYLOAD, headers=headers)
    response = client.get("/api/profile/", headers=headers)

    assert response.status_code == 200
    assert response.json()["name"] == "John Doe"

def test_create_meal_plan():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/api/meal-plan/", json=MEAL_PLAN_PAYLOAD, headers=headers)
    assert response.status_code == 200
    assert "Meal plan created successfully" in response.json()["message"]

def test_get_meal_plan():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/api/meal-plan/", json=MEAL_PLAN_PAYLOAD, headers=headers)
    response = client.get("/api/meal-plan/", headers=headers)

    assert response.status_code == 200
    assert "generated_plan" in response.json()

def test_create_workout_plan():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/api/workout-plan/", json=WORKOUT_PLAN_PAYLOAD, headers=headers)
    assert response.status_code == 200
    assert "Workout plan created successfully" in response.json()["message"]

def test_get_workout_plan():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/api/workout-plan/", json=WORKOUT_PLAN_PAYLOAD, headers=headers)
    response = client.get("/api/workout-plan/", headers=headers)

    assert response.status_code == 200
    assert "generated_plan" in response.json()

def test_create_progress():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/api/progress/", json=PROGRESS_PAYLOAD, headers=headers)
    assert response.status_code == 200
    assert "Progress created successfully" in response.json()["message"]

def test_get_progress():
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/api/progress/", json=PROGRESS_PAYLOAD, headers=headers)
    response = client.get("/api/progress/", headers=headers)

    assert response.status_code == 200
    assert "weight" in response.json()
