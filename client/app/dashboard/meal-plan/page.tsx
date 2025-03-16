"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils, Calendar, RefreshCw, Plus, Coffee, Apple, Beef, Moon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { getMealPlan, createMealPlan } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function MealPlanPage() {
  const { toast } = useToast()
  const [mealPlan, setMealPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [activeDay, setActiveDay] = useState("day1")

  useEffect(() => {
    fetchMealPlan()
  }, [])

  const fetchMealPlan = async () => {
    try {
      setLoading(true)
      const data = await getMealPlan()
      setMealPlan(data)

      // Set active day based on current day
      const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
      const dayIndex = today === 0 ? 6 : today - 1 // Convert to 0 = Monday, 6 = Sunday
      setActiveDay(`day${dayIndex + 1}`)
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

  const handleGenerateNewPlan = async () => {
    try {
      setGenerating(true)
      await createMealPlan({
        userId: mealPlan?.userId || "user123",
        goal: mealPlan?.goal || "weight-loss",
        calories: mealPlan?.targetCalories || 2200,
        dietaryPreferences: mealPlan?.dietaryPreferences || ["High Protein"],
      })

      toast({
        title: "Success!",
        description: "Your new meal plan has been generated.",
      })

      // Fetch the newly generated plan
      await fetchMealPlan()
    } catch (error) {
      console.error("Error generating meal plan:", error)
      toast({
        title: "Error generating plan",
        description: "Failed to generate a new meal plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleAddCustomMeal = () => {
    // In a real app, this would open a modal to add a custom meal
    toast({
      title: "Feature coming soon",
      description: "Custom meal creation will be available in a future update.",
    })
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-gray-400">Loading your meal plan...</p>
        </div>
      </div>
    )
  }

  if (!mealPlan) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <p className="mb-6 text-xl font-medium">No meal plan found</p>
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
              Generate Meal Plan
            </>
          )}
        </Button>
      </div>
    )
  }

  // Get the active day's data
  const activeDayIndex = Number.parseInt(activeDay.replace("day", "")) - 1
  const activeDayData = mealPlan.days?.[activeDayIndex] || {
    meals: [],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-3xl font-bold">Meal Plan</h1>
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
            onClick={handleAddCustomMeal}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Custom Meal
          </Button>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-cyan-500" />
            Weekly Meal Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="mb-6 grid w-full grid-cols-7 bg-gray-800">
              {(mealPlan.days || []).map((day: any, index: number) => (
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

            <TabsContent value={activeDay}>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <NutritionCard
                    title="Calories"
                    value={activeDayData.nutrition?.calories?.toString() || "0"}
                    target={mealPlan.targetCalories?.toString() || "2,200"}
                    progress={Math.round(
                      ((activeDayData.nutrition?.calories || 0) / (mealPlan.targetCalories || 2200)) * 100,
                    )}
                    color="purple"
                  />
                  <NutritionCard
                    title="Protein"
                    value={`${activeDayData.nutrition?.protein || 0}g`}
                    target={`${mealPlan.targetProtein || 180}g`}
                    progress={Math.round(
                      ((activeDayData.nutrition?.protein || 0) / (mealPlan.targetProtein || 180)) * 100,
                    )}
                    color="cyan"
                  />
                  <NutritionCard
                    title="Carbs"
                    value={`${activeDayData.nutrition?.carbs || 0}g`}
                    target={`${mealPlan.targetCarbs || 250}g`}
                    progress={Math.round(((activeDayData.nutrition?.carbs || 0) / (mealPlan.targetCarbs || 250)) * 100)}
                    color="green"
                  />
                  <NutritionCard
                    title="Fat"
                    value={`${activeDayData.nutrition?.fat || 0}g`}
                    target={`${mealPlan.targetFat || 70}g`}
                    progress={Math.round(((activeDayData.nutrition?.fat || 0) / (mealPlan.targetFat || 70)) * 100)}
                    color="yellow"
                  />
                </div>

                <div className="space-y-6">
                  {activeDayData.meals?.map((meal: any, index: number) => (
                    <MealSection key={index} title={meal.title} type={meal.type} meal={meal} />
                  ))}

                  {activeDayData.meals?.length === 0 && (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800/30 p-6">
                      <div className="text-center">
                        <p className="text-lg font-medium">No meals found for this day</p>
                        <p className="mt-2 text-sm text-gray-400">Generate a meal plan or add custom meals</p>
                        <Button
                          className="mt-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                          size="sm"
                          onClick={handleGenerateNewPlan}
                          disabled={generating}
                        >
                          {generating ? "Generating..." : "Generate Plan"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="mr-2 h-5 w-5 text-cyan-500" />
              Weekly Nutrition Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Calories</span>
                  <span className="text-sm font-medium">
                    {activeDayData.nutrition?.calories || 0} / {mealPlan.weeklyCalories || 15400} weekly
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    ((activeDayData.nutrition?.calories || 0) / (mealPlan.weeklyCalories || 15400)) * 100,
                  )}
                  className="h-2 bg-gray-700"
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Protein</span>
                  <span className="text-sm font-medium">
                    {activeDayData.nutrition?.protein || 0}g / {mealPlan.weeklyProtein || 1260}g weekly
                  </span>
                </div>
                <Progress
                  value={Math.round(((activeDayData.nutrition?.protein || 0) / (mealPlan.weeklyProtein || 1260)) * 100)}
                  className="h-2 bg-gray-700"
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Water Intake</span>
                  <span className="text-sm font-medium">
                    {mealPlan.waterIntake || 2.5}L / {mealPlan.targetWaterIntake || 3}L daily
                  </span>
                </div>
                <Progress
                  value={Math.round(((mealPlan.waterIntake || 2.5) / (mealPlan.targetWaterIntake || 3)) * 100)}
                  className="h-2 bg-gray-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-500" />
              Meal Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[180px] items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{mealPlan.compliance || 92}%</div>
                      <div className="text-xs text-gray-400">plan adherence</div>
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
                      strokeDashoffset={282.7 - ((mealPlan.compliance || 92) / 100) * 282.7}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  {mealPlan.compliance >= 90
                    ? "Great job! You're sticking to your meal plan"
                    : mealPlan.compliance >= 70
                      ? "Good progress! Keep working on consistency"
                      : "Try to follow your meal plan more closely"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function NutritionCard({
  title,
  value,
  target,
  progress,
  color,
}: {
  title: string
  value: string
  target: string
  progress: number
  color: "purple" | "cyan" | "green" | "yellow"
}) {
  const colorClasses = {
    purple: "text-purple-500",
    cyan: "text-cyan-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
  }

  return (
    <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <span className={`text-sm font-medium ${colorClasses[color]}`}>{progress}%</span>
        </div>
        <div className="mb-2">
          <Progress value={progress} className="h-1 bg-gray-700" />
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-400">of {target}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function MealSection({
  title,
  type,
  meal,
}: {
  title: string
  type: string
  meal: {
    title: string
    description: string
    calories: number
    protein: number
    carbs: number
    fat: number
    completed: boolean
  }
}) {
  const getIcon = () => {
    switch (type) {
      case "breakfast":
        return <Coffee className="h-5 w-5 text-yellow-500" />
      case "lunch":
        return <Utensils className="h-5 w-5 text-green-500" />
      case "dinner":
        return <Beef className="h-5 w-5 text-orange-500" />
      case "snack":
        return <Apple className="h-5 w-5 text-red-500" />
      case "evening_snack":
        return <Moon className="h-5 w-5 text-blue-500" />
      default:
        return <Utensils className="h-5 w-5 text-gray-500" />
    }
  }

  const getIconBgColor = () => {
    switch (type) {
      case "breakfast":
        return "bg-yellow-500/20"
      case "lunch":
        return "bg-green-500/20"
      case "dinner":
        return "bg-orange-500/20"
      case "snack":
        return "bg-red-500/20"
      case "evening_snack":
        return "bg-blue-500/20"
      default:
        return "bg-gray-700"
    }
  }

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`mr-3 rounded-full p-2 ${getIconBgColor()}`}>{getIcon()}</div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        {meal.completed && (
          <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-500">Completed</div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-400">{meal.description}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="rounded-lg bg-gray-800 p-3 text-center">
          <div className="text-sm text-gray-400">Calories</div>
          <div className="text-lg font-bold">{meal.calories}</div>
        </div>
        <div className="rounded-lg bg-gray-800 p-3 text-center">
          <div className="text-sm text-gray-400">Protein</div>
          <div className="text-lg font-bold">{meal.protein}g</div>
        </div>
        <div className="rounded-lg bg-gray-800 p-3 text-center">
          <div className="text-sm text-gray-400">Carbs</div>
          <div className="text-lg font-bold">{meal.carbs}g</div>
        </div>
        <div className="rounded-lg bg-gray-800 p-3 text-center">
          <div className="text-sm text-gray-400">Fat</div>
          <div className="text-lg font-bold">{meal.fat}g</div>
        </div>
      </div>
    </div>
  )
}

