"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { format, differenceInDays } from "date-fns"
import { Progress } from "@/components/ui/progress"

interface FitnessGoal {
  goal_type: string
  target_value: number
  start_date: string
  end_date?: string
}

const goalTypeLabels: Record<string, string> = {
  lose_weight: "Lose Weight",
  gain_muscle: "Gain Muscle",
  improve_endurance: "Improve Endurance",
  increase_strength: "Increase Strength",
  improve_flexibility: "Improve Flexibility",
}

export default function GoalPage({ params }: { params: { goalId: string } }) {
  const [goal, setGoal] = useState<FitnessGoal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGoal() {
      try {
        const response = await fetch(`/goals/${params.goalId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch goal")
        }

        const data = await response.json()
        setGoal(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load goal. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGoal()
  }, [params.goalId])

  const calculateProgress = () => {
    if (!goal || !goal.end_date) return 0

    const startDate = new Date(goal.start_date)
    const endDate = new Date(goal.end_date)
    const today = new Date()

    const totalDays = differenceInDays(endDate, startDate)
    const daysPassed = differenceInDays(today, startDate)

    if (daysPassed <= 0) return 0
    if (daysPassed >= totalDays) return 100

    return Math.round((daysPassed / totalDays) * 100)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {loading ? <Skeleton className="h-8 w-48" /> : goalTypeLabels[goal?.goal_type || ""] || "Goal Details"}
          </CardTitle>
          <CardDescription>Fitness Goal Details</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : goal ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Goal Type</p>
                  <p className="text-lg">{goalTypeLabels[goal.goal_type] || goal.goal_type}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Target Value</p>
                  <p className="text-lg">
                    {goal.target_value} {goal.goal_type === "lose_weight" ? "kg" : ""}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-lg">{format(new Date(goal.start_date), "PPP")}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">End Date</p>
                  <p className="text-lg">{goal.end_date ? format(new Date(goal.end_date), "PPP") : "Not specified"}</p>
                </div>
              </div>

              {goal.end_date && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Time Progress</p>
                    <p className="text-sm">{calculateProgress()}%</p>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Goal not found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

