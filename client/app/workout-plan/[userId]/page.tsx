"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WorkoutPlan {
  workout_routine: string
}

export default function WorkoutPlanPage({ params }: { params: { userId: string } }) {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkoutPlan() {
      try {
        const response = await fetch(`http://localhost:80/workout-plan/${params.userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch workout plan")
        }

        const data = await response.json()
        setWorkoutPlan(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load workout plan. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWorkoutPlan()
  }, [params.userId])

  // For demo purposes, let's create a structured workout plan
  const parsedWorkoutPlan = {
    monday:
      "Chest and Triceps:\n- Bench Press: 3 sets of 10 reps\n- Incline Dumbbell Press: 3 sets of 12 reps\n- Chest Flyes: 3 sets of 15 reps\n- Tricep Pushdowns: 3 sets of 12 reps\n- Overhead Tricep Extensions: 3 sets of 12 reps",
    tuesday:
      "Back and Biceps:\n- Pull-ups: 3 sets of 8 reps\n- Bent Over Rows: 3 sets of 10 reps\n- Lat Pulldowns: 3 sets of 12 reps\n- Bicep Curls: 3 sets of 12 reps\n- Hammer Curls: 3 sets of 12 reps",
    wednesday: "Rest Day or Light Cardio:\n- 30 minutes of walking or cycling at a moderate pace",
    thursday:
      "Legs and Shoulders:\n- Squats: 3 sets of 10 reps\n- Leg Press: 3 sets of 12 reps\n- Lunges: 3 sets of 10 reps per leg\n- Shoulder Press: 3 sets of 10 reps\n- Lateral Raises: 3 sets of 15 reps",
    friday:
      "Full Body:\n- Deadlifts: 3 sets of 8 reps\n- Push-ups: 3 sets of 15 reps\n- Dumbbell Rows: 3 sets of 12 reps per arm\n- Leg Curls: 3 sets of 12 reps\n- Plank: 3 sets of 30 seconds",
    saturday:
      "Cardio and Core:\n- 20 minutes of HIIT (High-Intensity Interval Training)\n- Crunches: 3 sets of 20 reps\n- Russian Twists: 3 sets of 20 reps\n- Leg Raises: 3 sets of 15 reps",
    sunday: "Rest Day:\n- Complete rest or light stretching for recovery",
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Workout Plan</CardTitle>
          <CardDescription>Personalized workout routine based on your profile and goals</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : workoutPlan ? (
            <Tabs defaultValue="monday" className="w-full">
              <TabsList className="grid grid-cols-7 mb-4">
                <TabsTrigger value="monday">Mon</TabsTrigger>
                <TabsTrigger value="tuesday">Tue</TabsTrigger>
                <TabsTrigger value="wednesday">Wed</TabsTrigger>
                <TabsTrigger value="thursday">Thu</TabsTrigger>
                <TabsTrigger value="friday">Fri</TabsTrigger>
                <TabsTrigger value="saturday">Sat</TabsTrigger>
                <TabsTrigger value="sunday">Sun</TabsTrigger>
              </TabsList>

              {Object.entries(parsedWorkoutPlan).map(([day, routine]) => (
                <TabsContent key={day} value={day} className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium text-lg capitalize mb-2">{day}</h3>
                    <div className="whitespace-pre-line text-muted-foreground">{routine}</div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <p className="text-center text-muted-foreground">Workout plan not found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

