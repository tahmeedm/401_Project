"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Salad, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  calories: z.string().min(1, { message: "Please select your caloric preference" }),
  allergies: z.array(z.string()).optional(),
})
var API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fitmatebackend.org"
export default function MealSetup() {
  const { user, setHasMealPlan } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allergies, setAllergies] = useState<string[]>([])
  const [allergyInput, setAllergyInput] = useState("")
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
      calories: "",
      allergies: [], // Ensure this is always initialized as an empty array
    },
  })

  const addAllergy = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      const newAllergies = [...allergies, allergyInput.trim()]
      setAllergies(newAllergies)
      form.setValue("allergies", newAllergies)
      setAllergyInput("")
    }
  }

  const removeAllergy = (allergy: string) => {
    const newAllergies = allergies.filter((a) => a !== allergy)
    setAllergies(newAllergies)
    form.setValue("allergies", newAllergies)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // API call to create meal plan
      const response = await fetch(`${API_URL}/api/meal-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          calories: values.calories,
          allergies: allergies,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create meal plan")
      }

      setHasMealPlan(true)
      router.push("/dashboard")
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
          <Salad className="h-10 w-10 text-purple-500" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Set Up Your Meal Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Tell us about your dietary preferences so we can create a personalized meal plan
        </p>
      </div>

      <Card className="professional-card shadow-md">
        <CardHeader className="bg-gray-50 dark:bg-gray-800 rounded-t-lg">
          <CardTitle className="text-gray-800 dark:text-white">Meal Preferences</CardTitle>
          <CardDescription>This information helps us create meal plans that match your needs</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caloric Intake Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="professional-input">
                          <SelectValue placeholder="Select your caloric preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low (Weight Loss)</SelectItem>
                        <SelectItem value="medium">Medium (Maintenance)</SelectItem>
                        <SelectItem value="high">High (Muscle Gain)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This determines the calorie target for your meal plans</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies or Foods to Avoid</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Enter an allergy or food"
                          value={allergyInput}
                          onChange={(e) => setAllergyInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addAllergy()
                            }
                          }}
                          className="professional-input"
                        />
                      </FormControl>
                      <Button type="button" size="sm" onClick={addAllergy} className="bg-cyan-600 hover:bg-cyan-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {allergies.map((allergy) => (
                        <Badge
                          key={allergy}
                          variant="secondary"
                          className="flex items-center gap-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {allergy}
                          <button
                            type="button"
                            onClick={() => removeAllergy(allergy)}
                            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 p-0.5"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {allergy}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>Add any foods you're allergic to or want to avoid</FormDescription>
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
                {loading ? "Creating Meal Plan..." : "Complete Setup"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

