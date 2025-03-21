"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApiError } from "next/dist/server/api-utils"

const formSchema = z.object({
  workout_type: z.string().min(1, { message: "Please select a workout type" }),
  equipment_access: z.array(z.string()).min(1, { message: "Please select at least one equipment option" }),
})
var API_URL = process.env.NEXT_PUBLIC_API_URL || "http://35.183.135.139:8000"
const equipmentOptions = [
  { id: "none", label: "No Equipment (Bodyweight Only)" },
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbell", label: "Barbell" },
  { id: "bench", label: "Bench" },
  { id: "pullup_bar", label: "Pull-up Bar" },
  { id: "resistance_bands", label: "Resistance Bands" },
  { id: "kettlebells", label: "Kettlebells" },
  { id: "gym", label: "Full Gym Access" },
]

export default function WorkoutSetup() {
  const { user, setHasWorkoutPlan } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (!user.hasProfile) {
      router.push("/profile-setup")
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workout_type: "",
      equipment_access: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // API call to create workout plan
      const response = await fetch(`${API_URL}/api/workout-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...values,
          // We'll let the API generate the workouts based on these preferences
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create workout plan")
      }

      setHasWorkoutPlan(true)
      router.push("/meal-setup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!user || !user.hasProfile) {
    return null
  }

  return (
    <div className="container max-w-3xl py-10 bg-gradient-to-b from-white to-cyan-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Dumbbell className="h-10 w-10 text-cyan-500" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          Set Up Your Workout Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Tell us about your workout preferences so we can create a personalized training program
        </p>
      </div>

      <Card className="professional-card shadow-md">
        <CardHeader className="bg-gray-50 dark:bg-gray-800 rounded-t-lg">
          <CardTitle className="text-gray-800 dark:text-white">Workout Preferences</CardTitle>
          <CardDescription>This information helps us create a workout plan tailored to your goals</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="workout_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="professional-input">
                          <SelectValue placeholder="Select your workout type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="strength">Strength Training</SelectItem>
                        <SelectItem value="hypertrophy">Muscle Building</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="hiit">HIIT</SelectItem>
                        <SelectItem value="flexibility">Flexibility & Mobility</SelectItem>
                        <SelectItem value="mixed">Mixed (Balanced Approach)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This determines the focus of your workout program</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipment_access"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Equipment Access</FormLabel>
                      <FormDescription>Select all equipment you have access to for your workouts</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equipmentOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="equipment_access"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(field.value?.filter((value) => value !== option.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{option.label}</FormLabel>
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

              {error && <div className="text-sm font-medium text-destructive">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Creating Workout Plan..." : "Continue to Meal Setup"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

