"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Clock, Flame, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getWorkoutPlan } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function WorkoutPlanCard() {
  const { toast } = useToast()
  const [workoutPlan, setWorkoutPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const data = await getWorkoutPlan()
        setWorkoutPlan(data)
      } catch (error) {
        console.error("Error fetching workout plan:", error)
        toast({
          title: "Error loading workout plan",
          description: "Failed to load your workout plan. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWorkoutPlan()
  }, [toast])

  if (loading) {
    return (
      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardContent className="flex h-[300px] items-center justify-center p-6">
          <div className="text-center">
            <LoadingSpinner className="mx-auto mb-4" />
            <p className="text-gray-400">Loading your workout plan...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!workoutPlan) {
    return (
      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardContent className="flex h-[300px] items-center justify-center p-6">
          <div className="text-center">
            <p className="mb-4 text-lg font-medium">No workout plan found</p>
            <Link href="/dashboard/workout">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                Generate Workout Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get today's workout
  const todayWorkout = workoutPlan.days?.find((day: any) => day.isToday) || workoutPlan.days?.[0]

  return (
    <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{todayWorkout?.title || "Today's Workout"}</h3>
          <div className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
            {todayWorkout?.status || "Not Started"}
          </div>
        </div>

        <div className="mb-6 flex space-x-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {todayWorkout?.duration || "45"} min
          </div>
          <div className="flex items-center">
            <Flame className="mr-1 h-4 w-4" />
            {todayWorkout?.calories || "320"} calories
          </div>
          <div className="flex items-center">
            <Dumbbell className="mr-1 h-4 w-4" />
            {todayWorkout?.exercises?.length || "5"} exercises
          </div>
        </div>

        <div className="mb-6 space-y-3">
          {(todayWorkout?.exercises || []).slice(0, 3).map((exercise: any, index: number) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg bg-gray-800 p-3 ${
                exercise.completed ? "border border-green-500/30 bg-green-500/10" : ""
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 rounded-full p-1 ${
                    exercise.completed ? "bg-green-500/20 text-green-500" : "bg-gray-700"
                  }`}
                >
                  {exercise.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <Dumbbell className="h-4 w-4" />
                  )}
                </div>
                <span>{exercise.name}</span>
              </div>
              <span className="text-sm text-gray-400">
                {exercise.sets} × {exercise.reps} reps
              </span>
            </div>
          ))}
        </div>

        <Link href="/dashboard/workout">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
            {todayWorkout?.status === "In Progress" ? "Continue Workout" : "Start Workout"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

