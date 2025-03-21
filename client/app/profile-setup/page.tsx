"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell } from "lucide-react"

var API_URL = process.env.NEXT_PUBLIC_API_URL || "http://35.183.135.139:8000"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.coerce
    .number()
    .min(16, { message: "You must be at least 16 years old" })
    .max(100, { message: "Age must be less than 100" }),
  sex: z.string().min(1, { message: "Please select your sex" }),
  height: z.coerce
    .number()
    .min(100, { message: "Height must be at least 100 cm" })
    .max(250, { message: "Height must be less than 250 cm" }),
  weight: z.coerce
    .number()
    .min(30, { message: "Weight must be at least 30 kg" })
    .max(300, { message: "Weight must be less than 300 kg" }),
  fitness_level: z.string().min(1, { message: "Please select your fitness level" }),
  dietary_preference: z.string().optional(),
})

export default function ProfileSetup() {
  const { user, setHasProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0, // Changed from undefined to 0
      sex: "",
      height: 0, // Changed from undefined to 0
      weight: 0, // Changed from undefined to 0
      fitness_level: "",
      dietary_preference: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // API call to create profile
      const response = await fetch(`${API_URL}/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to create profile")
      }

      setHasProfile(true)
      router.push("/workout-setup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="container max-w-3xl py-10 bg-gradient-to-b from-white to-cyan-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Dumbbell className="h-10 w-10 text-cyan-500" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          Set Up Your Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Let's get to know you better so we can create a personalized fitness plan
        </p>
      </div>

      <Card className="professional-card shadow-md">
        <CardHeader className="bg-gray-50 dark:bg-gray-800 rounded-t-lg">
          <CardTitle className="text-gray-800 dark:text-white">Personal Information</CardTitle>
          <CardDescription>This information helps us create a fitness plan tailored to your needs</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="professional-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} className="professional-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="professional-input">
                            <SelectValue placeholder="Select your sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rest of the form fields with professional-input class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} className="professional-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} className="professional-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fitness_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="professional-input">
                          <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietary_preference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preference (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="professional-input">
                          <SelectValue placeholder="Select your dietary preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No Preference</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This helps us tailor your meal plans</FormDescription>
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
                {loading ? "Saving Profile..." : "Continue to Workout Setup"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

