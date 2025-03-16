"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, ArrowRight, Coffee, Apple, Beef } from "lucide-react"
import Link from "next/link"
import { getMealPlan } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function MealPlanCard() {
  const { toast } = useToast()
  const [mealPlan, setMealPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const data = await getMealPlan()
        setMealPlan(data)
      } catch (error) {
        console.error("Error fetching meal plan:", error)
        toast({
          title: "Error loading meal plan",
          description: "Failed to load your meal plan. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlan()
  }, [toast])

  if (loading) {
    return (
      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardContent className="flex h-[300px] items-center justify-center p-6">
          <div className="text-center">
            <LoadingSpinner className="mx-auto mb-4" />
            <p className="text-gray-400">Loading your meal plan...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!mealPlan) {
    return (
      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardContent className="flex h-[300px] items-center justify-center p-6">
          <div className="text-center">
            <p className="mb-4 text-lg font-medium">No meal plan found</p>
            <Link href="/dashboard/meal-plan">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                Generate Meal Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get today's meals
  const todayMeals = mealPlan.days?.find((day: any) => day.isToday)?.meals || mealPlan.days?.[0]?.meals || []
  const completedCount = todayMeals.filter((meal: any) => meal.completed).length

  return (
    <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Today&apos;s Meals</h3>
          <div className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
            {completedCount}/{todayMeals.length} Completed
          </div>
        </div>

        <div className="mb-6 space-y-4">
          {todayMeals.slice(0, 3).map((meal: any, index: number) => {
            const MealIcon = () => {
              switch (meal.type) {
                case "breakfast":
                  return <Coffee className="h-4 w-4 text-yellow-500" />
                case "lunch":
                  return <Utensils className="h-4 w-4 text-green-500" />
                case "dinner":
                  return <Beef className="h-4 w-4 text-orange-500" />
                case "snack":
                  return <Apple className="h-4 w-4 text-red-500" />
                default:
                  return <Utensils className="h-4 w-4" />
              }
            }

            return (
              <div key={index} className="rounded-lg bg-gray-800 p-4">
                <div className="mb-2 flex items-center">
                  <div
                    className={`mr-3 rounded-full p-1 ${
                      meal.type === "breakfast"
                        ? "bg-yellow-500/20"
                        : meal.type === "lunch"
                          ? "bg-green-500/20"
                          : meal.type === "dinner"
                            ? "bg-orange-500/20"
                            : "bg-red-500/20"
                    }`}
                  >
                    <MealIcon />
                  </div>
                  <span className="font-medium">{meal.title}</span>
                  {meal.completed && (
                    <div className="ml-auto rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-500">
                      Completed
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400">{meal.description}</p>
              </div>
            )
          })}
        </div>

        <Link href="/dashboard/meal-plan">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
            View Full Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

