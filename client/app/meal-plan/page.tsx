"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  calories: z.enum(["low", "medium", "high"], {
    required_error: "Please select a calorie target.",
  }),
  allergies: z.array(z.string()).optional(),
})

const allergiesList = [
  { id: "dairy", label: "Dairy" },
  { id: "nuts", label: "Nuts" },
  { id: "gluten", label: "Gluten" },
  { id: "shellfish", label: "Shellfish" },
  { id: "soy", label: "Soy" },
  { id: "eggs", label: "Eggs" },
]

export default function MealPlanForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calories: "medium",
      allergies: [],
    },
  })

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("fitmate_current_user")
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to access this page.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setUser(JSON.parse(currentUser))

    // Check if meal plan already exists
    const mealPlans = JSON.parse(localStorage.getItem("fitmate_meal_plans") || "[]")
    const existingPlan = mealPlans.find((plan: any) => plan.userId === JSON.parse(currentUser).id)

    if (existingPlan) {
      // Pre-fill form with existing meal plan data
      form.reset({
        calories: existingPlan.calories,
        allergies: existingPlan.allergies || [],
      })
    }
  }, [router, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to save the meal plan
      console.log("Saving meal plan data:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save meal plan to localStorage (simulating a database)
      const mealPlans = JSON.parse(localStorage.getItem("fitmate_meal_plans") || "[]")
      const existingPlanIndex = mealPlans.findIndex((plan: any) => plan.userId === user.id)

      const mealPlanData = {
        userId: user.id,
        ...values,
        updatedAt: new Date().toISOString(),
      }

      if (existingPlanIndex >= 0) {
        // Update existing meal plan
        mealPlans[existingPlanIndex] = mealPlanData
      } else {
        // Add new meal plan
        mealPlans.push(mealPlanData)
      }

      localStorage.setItem("fitmate_meal_plans", JSON.stringify(mealPlans))

      toast({
        title: "Meal preferences saved!",
        description: "Your meal plan has been created and saved to the database.",
      })

      // Redirect to workout plan creation
      router.push(`/workout-plan`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create meal plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal">
            Create Meal Plan
          </CardTitle>
          <CardDescription>Step 2: Set your meal preferences for your personalized nutrition plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorie Target</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass-effect border-white/10">
                          <SelectValue placeholder="Select your calorie target" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low (Weight Loss)</SelectItem>
                        <SelectItem value="medium">Medium (Maintenance)</SelectItem>
                        <SelectItem value="high">High (Muscle Gain)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your calorie target based on your fitness goals</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Allergies</FormLabel>
                      <FormDescription>Select any food allergies or intolerances</FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {allergiesList.map((allergy) => (
                        <FormField
                          key={allergy.id}
                          control={form.control}
                          name="allergies"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={allergy.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 glass-effect border-white/10"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(allergy.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), allergy.id])
                                        : field.onChange(field.value?.filter((value) => value !== allergy.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{allergy.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Meal Plan & Continue"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

