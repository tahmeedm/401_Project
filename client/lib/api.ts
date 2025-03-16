// API service functions to interact with the backend

// For now, we'll use a mock user ID until authentication is implemented
export const MOCK_USER_ID = "user123"

const API_BASE_URL = "http://localhost:8000" // Replace with your actual API base URL

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred")
  }
  return response.json()
}

// Profile API
export const createUserProfile = async (profileData: any) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  })
  return handleResponse(response)
}

export const getUserProfile = async (userId: string = MOCK_USER_ID) => {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`)
  return handleResponse(response)
}

// Goals API
export const createFitnessGoal = async (goalData: any) => {
  const response = await fetch(`${API_BASE_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goalData),
  })
  return handleResponse(response)
}

export const getFitnessGoal = async (goalId: string) => {
  const response = await fetch(`${API_BASE_URL}/goals/${goalId}`)
  return handleResponse(response)
}

// Workout Plan API
export const generateWorkoutPlan = async (planData: any) => {
  const response = await fetch(`${API_BASE_URL}/workout-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planData),
  })
  return handleResponse(response)
}

export const getWorkoutPlan = async (userId: string = MOCK_USER_ID) => {
  const response = await fetch(`${API_BASE_URL}/workout-plan/${userId}`)
  return handleResponse(response)
}

// Meal Plan API
export const createMealPlan = async (planData: any) => {
  const response = await fetch(`${API_BASE_URL}/meal-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planData),
  })
  return handleResponse(response)
}

export const getMealPlan = async (userId: string = MOCK_USER_ID) => {
  const response = await fetch(`${API_BASE_URL}/meal-plan/${userId}`)
  return handleResponse(response)
}

// Progress API
export const getUserProgress = async (userId: string = MOCK_USER_ID) => {
  const response = await fetch(`${API_BASE_URL}/progress/${userId}`)
  return handleResponse(response)
}

