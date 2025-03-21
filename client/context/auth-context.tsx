"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

var API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fitmatebackend.org"

type User = {
  email: string
  token: string
  hasProfile: boolean
  hasWorkoutPlan: boolean
  hasMealPlan: boolean
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
  setHasProfile: (value: boolean) => void
  setHasWorkoutPlan: (value: boolean) => void
  setHasMealPlan: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("fitmate_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // API call to login
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()

      // Create user object with token
      const userData: User = {
        email,
        token: data.token,
        hasProfile: false, // Will be updated after checking profile
        hasWorkoutPlan: false, // Will be updated after checking workout plan
        hasMealPlan: false, // Will be updated after checking meal plan
      }

      // Store user in localStorage
      localStorage.setItem("fitmate_user", JSON.stringify(userData))
      setUser(userData)

      // Check if user has profile
      const profileResponse = await fetch(`${API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })

      if (profileResponse.ok) {
        userData.hasProfile = true
        localStorage.setItem("fitmate_user", JSON.stringify(userData))
        setUser({ ...userData })

        // Check if user has workout plan
        const workoutPlanResponse = await fetch(`${API_URL}/api/workout`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })

        if (workoutPlanResponse.ok) {
          userData.hasWorkoutPlan = true
          localStorage.setItem("fitmate_user", JSON.stringify(userData))
          setUser({ ...userData })

          // Check if user has meal plan
          const mealPlanResponse = await fetch(`${API_URL}/api/meal-plan`, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })

          if (mealPlanResponse.ok) {
            userData.hasMealPlan = true
            localStorage.setItem("fitmate_user", JSON.stringify(userData))
            setUser({ ...userData })
            router.push("/dashboard")
          } else {
            router.push("/meal-setup")
          }
        } else {
          router.push("/workout-setup")
        }
      } else {
        router.push("/profile-setup")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // API call to register
      const response = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()

      // Create user object with token
      const userData: User = {
        email,
        token: data.token,
        hasProfile: false,
        hasWorkoutPlan: false,
        hasMealPlan: false,
      }

      // Store user in localStorage
      localStorage.setItem("fitmate_user", JSON.stringify(userData))
      setUser(userData)

      // Redirect to profile setup
      router.push("/profile-setup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("fitmate_user")
    setUser(null)
    router.push("/")
  }

  const setHasProfile = (value: boolean) => {
    if (user) {
      const updatedUser = { ...user, hasProfile: value }
      localStorage.setItem("fitmate_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  const setHasWorkoutPlan = (value: boolean) => {
    if (user) {
      const updatedUser = { ...user, hasWorkoutPlan: value }
      localStorage.setItem("fitmate_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  const setHasMealPlan = (value: boolean) => {
    if (user) {
      const updatedUser = { ...user, hasMealPlan: value }
      localStorage.setItem("fitmate_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
        setHasProfile,
        setHasWorkoutPlan,
        setHasMealPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

