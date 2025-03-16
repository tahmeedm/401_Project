"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Calendar, CheckCircle, Clock, Flame, Play, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { getWorkoutPlan, generateWorkoutPlan } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function WorkoutPage() {
  const { toast } = useToast()
  const [workoutPlan, setWorkoutPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [activeDay, setActiveDay] = useState("day1")

  useEffect(() => {
    fetchWorkoutPlan()
  }, [])

  const fetchWorkoutPlan = async () => {
    try {
      setLoading(true)
      const data = await getWorkoutPlan()
      setWorkoutPlan(data)

      // Set active day based on current day
      const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
      const dayIndex = today === 0 ? 6 : today - 1 // Convert to 0 = Monday, 6 = Sunday
      setActiveDay(`day${dayIndex + 1}`)
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

  const handleGenerateNewPlan = async () => {
    try {
      setGenerating(true)
      await generateWorkoutPlan({
        userId: workoutPlan?.userId || "user123",
        goal: workoutPlan?.goal || "build-muscle",
        duration: workoutPlan?.duration || "8-weeks",
        equipment: workoutPlan?.equipment || "full-gym",
      })

      toast({
        title: "Success!",
        description: "Your new workout plan has been generated.",
      })

      // Fetch the newly generated plan
      await fetchWorkoutPlan()
    } catch (error) {
      console.error("Error generating workout plan:", error)
      toast({
        title: "Error generating plan",
        description: "Failed to generate a new workout plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleStartWorkout = () => {
    // In a real app, this would update the workout status in the API
    toast({
      title: "Workout started!",
      description: "Your workout has been started. Good luck!",
    })
  }

  const handleMarkComplete = (dayIndex: number, exerciseIndex: number) => {
    // In a real app, this would update the exercise completion status in the API
    const updatedWorkoutPlan = { ...workoutPlan }
    updatedWorkoutPlan.days[dayIndex].exercises[exerciseIndex].completed = true
    setWorkoutPlan(updatedWorkoutPlan)

    toast({
      title: "Exercise completed!",
      description: "Great job! Keep up the good work.",
    })
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-gray-400">Loading your workout plan...</p>
        </div>
      </div>
    )
  }

  if (!workoutPlan) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <p className="mb-6 text-xl font-medium">No workout plan found</p>
        <Button
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
          onClick={handleGenerateNewPlan}
          disabled={generating}
        >
          {generating ? (
            <>
              <LoadingSpinner className="mr-2" />
              Generating Plan...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Workout Plan
            </>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-3xl font-bold">Workout Plan</h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
            onClick={handleGenerateNewPlan}
            disabled={generating}
          >
            {generating ? (
              <>
                <LoadingSpinner className="mr-2" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Plan
              </>
            )}
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
            onClick={handleStartWorkout}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Workout
          </Button>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-purple-500" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="mb-6 grid w-full grid-cols-7 bg-gray-800">
              {(workoutPlan.days || []).map((day: any, index: number) => (
                <TabsTrigger
                  key={`day${index + 1}`}
                  value={`day${index + 1}`}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                    </span>
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {(workoutPlan.days || []).map((day: any, dayIndex: number) => (
              <TabsContent key={`day${dayIndex + 1}`} value={`day${dayIndex + 1}`}>
                <WorkoutDay
                  title={day.title}
                  exercises={day.exercises || []}
                  duration={day.duration}
                  calories={day.calories}
                  progress={day.progress || 0}
                  isRestDay={day.isRestDay}
                  onMarkComplete={(exerciseIndex) => handleMarkComplete(dayIndex, exerciseIndex)}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-purple-500" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Workouts Completed</span>
                  <span className="text-sm font-medium">
                    {workoutPlan.completedWorkouts || 0}/{workoutPlan.totalWorkouts || 7}
                  </span>
                </div>
                <Progress
                  value={((workoutPlan.completedWorkouts || 0) / (workoutPlan.totalWorkouts || 7)) * 100}
                  className="h-2 bg-gray-700"
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Total Time</span>
                  <span className="text-sm font-medium">
                    {workoutPlan.completedTime || "0h 0m"} / {workoutPlan.totalTime || "5h 30m"}
                  </span>
                </div>
                <Progress value={workoutPlan.timeProgress || 0} className="h-2 bg-gray-700" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Calories Burned</span>
                  <span className="text-sm font-medium">
                    {workoutPlan.caloriesBurned || 0} / {workoutPlan.targetCalories || 2500}
                  </span>
                </div>
                <Progress
                  value={((workoutPlan.caloriesBurned || 0) / (workoutPlan.targetCalories || 2500)) * 100}
                  className="h-2 bg-gray-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Flame className="mr-2 h-5 w-5 text-orange-500" />
              Workout Intensity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[180px] items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{workoutPlan.intensity || 75}%</div>
                      <div className="text-xs text-gray-400">of max capacity</div>
                    </div>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#374151" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeDasharray="282.7"
                      strokeDashoffset={282.7 - ((workoutPlan.intensity || 75) / 100) * 282.7}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="mt-4 text-sm text-gray-400">Your workout intensity is optimal for your goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function WorkoutDay({
  title,
  exercises,
  duration,
  calories,
  progress,
  isRestDay = false,
  onMarkComplete,
}: {
  title: string
  exercises: Array<{
    name: string
    sets: number
    reps: string
    completed: boolean
  }>
  duration: string
  calories: string
  progress: number
  isRestDay?: boolean
  onMarkComplete: (index: number) => void
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="mr-1 h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Flame className="mr-1 h-4 w-4" />
            {calories} cal
          </div>
        </div>
      </div>

      {isRestDay ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800/30 p-6">
          <div className="text-center">
            <p className="text-lg font-medium">Rest Day</p>
            <p className="mt-2 text-sm text-gray-400">Take it easy today. Recovery is an important part of progress.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-700" />
          </div>

          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg border ${
                  exercise.completed ? "border-green-500/30 bg-green-500/10" : "border-gray-700 bg-gray-800/30"
                } p-4`}
              >
                <div className="flex items-center">
                  {exercise.completed ? (
                    <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  ) : (
                    <Dumbbell className="mr-3 h-5 w-5 text-purple-500" />
                  )}
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-gray-400">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                </div>
                {!exercise.completed && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => onMarkComplete(index)}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

