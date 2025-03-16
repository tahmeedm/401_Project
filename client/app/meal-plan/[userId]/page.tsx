"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MealPlan {
  meal_plan: string
}

export default function MealPlanPage({ params }: { params: { userId: string } }) {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMealPlan() {
      try {
        const response = await fetch(`/meal-plan/${params.userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch meal plan")
        }

        const data = await response.json()
        setMealPlan(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load meal plan. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlan()
  }, [params.userId])

  // For demo purposes, let's create a structured meal plan
  const parsedMealPlan = {
    monday: {
      breakfast: "Oatmeal with berries and nuts (350 calories)",
      snack1: "Greek yogurt with honey (150 calories)",
      lunch: "Grilled chicken salad with olive oil dressing (450 calories)",
      snack2: "Apple with almond butter (200 calories)",
      dinner: "Baked salmon with roasted vegetables (500 calories)",
    },
    tuesday: {
      breakfast: "Scrambled eggs with spinach and whole grain toast (400 calories)",
      snack1: "Protein smoothie (200 calories)",
      lunch: "Quinoa bowl with mixed vegetables and tofu (500 calories)",
      snack2: "Handful of mixed nuts (180 calories)",
      dinner: "Turkey chili with mixed beans (450 calories)",
    },
    wednesday: {
      breakfast: "Protein pancakes with banana (380 calories)",
      snack1: "Cottage cheese with pineapple (150 calories)",
      lunch: "Mediterranean wrap with hummus (420 calories)",
      snack2: "Carrot sticks with guacamole (150 calories)",
      dinner: "Grilled steak with sweet potato and broccoli (550 calories)",
    },
    thursday: {
      breakfast: "Avocado toast with poached egg (350 calories)",
      snack1: "Protein bar (200 calories)",
      lunch: "Lentil soup with whole grain bread (400 calories)",
      snack2: "Greek yogurt with berries (180 calories)",
      dinner: "Chicken stir-fry with brown rice (500 calories)",
    },
    friday: {
      breakfast: "Smoothie bowl with granola and fruits (420 calories)",
      snack1: "Hard-boiled eggs (140 calories)",
      lunch: "Tuna salad sandwich on whole grain bread (450 calories)",
      snack2: "Hummus with vegetable sticks (200 calories)",
      dinner: "Baked cod with quinoa and roasted vegetables (480 calories)",
    },
    saturday: {
      breakfast: "Whole grain waffles with berries and maple syrup (400 calories)",
      snack1: "Banana with peanut butter (220 calories)",
      lunch: "Grilled vegetable and mozzarella sandwich (480 calories)",
      snack2: "Trail mix (200 calories)",
      dinner: "Homemade pizza with lean protein and vegetables (550 calories)",
    },
    sunday: {
      breakfast: "Vegetable omelet with whole grain toast (380 calories)",
      snack1: "Fruit salad (150 calories)",
      lunch: "Chicken and avocado wrap (450 calories)",
      snack2: "Protein shake (180 calories)",
      dinner: "Grilled shrimp with zucchini noodles (420 calories)",
    },
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Meal Plan</CardTitle>
          <CardDescription>Personalized meal plan based on your preferences and goals</CardDescription>
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
          ) : mealPlan ? (
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

              {Object.entries(parsedMealPlan).map(([day, meals]) => (
                <TabsContent key={day} value={day} className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium text-lg capitalize mb-4">{day}</h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-background rounded-md">
                          <h4 className="font-medium mb-1">Breakfast</h4>
                          <p className="text-sm text-muted-foreground">{meals.breakfast}</p>
                        </div>

                        <div className="p-3 bg-background rounded-md">
                          <h4 className="font-medium mb-1">Morning Snack</h4>
                          <p className="text-sm text-muted-foreground">{meals.snack1}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-background rounded-md">
                        <h4 className="font-medium mb-1">Lunch</h4>
                        <p className="text-sm text-muted-foreground">{meals.lunch}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-background rounded-md">
                          <h4 className="font-medium mb-1">Afternoon Snack</h4>
                          <p className="text-sm text-muted-foreground">{meals.snack2}</p>
                        </div>

                        <div className="p-3 bg-background rounded-md">
                          <h4 className="font-medium mb-1">Dinner</h4>
                          <p className="text-sm text-muted-foreground">{meals.dinner}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <p className="text-center text-muted-foreground">Meal plan not found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

