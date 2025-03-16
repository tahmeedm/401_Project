"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce
    .number()
    .min(16, {
      message: "Age must be at least 16.",
    })
    .max(100, {
      message: "Age must be less than 100.",
    }),
  sex: z.string({
    required_error: "Please select a sex.",
  }),
  height: z.coerce
    .number()
    .min(100, {
      message: "Height must be at least 100 cm.",
    })
    .max(250, {
      message: "Height must be less than 250 cm.",
    }),
  weight: z.coerce
    .number()
    .min(30, {
      message: "Weight must be at least 30 kg.",
    })
    .max(300, {
      message: "Weight must be less than 300 kg.",
    }),
  fitness_level: z.string({
    required_error: "Please select a fitness level.",
  }),
  dietary_preference: z.string().optional(),
})

export default function ProfileForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      sex: "",
      height: undefined,
      weight: undefined,
      fitness_level: "",
      dietary_preference: "",
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

    // Check if profile already exists
    const userProfiles = JSON.parse(localStorage.getItem("fitmate_profiles") || "[]")
    const existingProfile = userProfiles.find((profile: any) => profile.userId === JSON.parse(currentUser).id)

    if (existingProfile) {
      // Pre-fill form with existing profile data
      form.reset({
        name: existingProfile.name,
        age: existingProfile.age,
        sex: existingProfile.sex,
        height: existingProfile.height,
        weight: existingProfile.weight,
        fitness_level: existingProfile.fitness_level,
        dietary_preference: existingProfile.dietary_preference || "",
      })
    } else {
      // Pre-fill name from user account
      form.setValue("name", JSON.parse(currentUser).name)
    }
  }, [router, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to save the profile
      console.log("Saving profile data:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save profile to localStorage (simulating a database)
      const userProfiles = JSON.parse(localStorage.getItem("fitmate_profiles") || "[]")
      const existingProfileIndex = userProfiles.findIndex((profile: any) => profile.userId === user.id)

      const profileData = {
        userId: user.id,
        ...values,
        updatedAt: new Date().toISOString(),
      }

      if (existingProfileIndex >= 0) {
        // Update existing profile
        userProfiles[existingProfileIndex] = profileData
      } else {
        // Add new profile
        userProfiles.push(profileData)
      }

      localStorage.setItem("fitmate_profiles", JSON.stringify(userProfiles))

      toast({
        title: "Profile saved!",
        description: "Your fitness profile has been saved to the database.",
      })

      // Redirect to meal plan creation
      router.push(`/meal-plan`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
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
            Your Fitness Profile
          </CardTitle>
          <CardDescription>Step 1: Fill in your details to get personalized fitness recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="glass-effect border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} className="glass-effect border-white/10" />
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
                          <SelectTrigger className="glass-effect border-white/10">
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

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} className="glass-effect border-white/10" />
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
                        <Input type="number" placeholder="70" {...field} className="glass-effect border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fitness_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fitness Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-effect border-white/10">
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
                      <FormLabel>Dietary Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-effect border-white/10">
                            <SelectValue placeholder="Select your dietary preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="keto">Keto</SelectItem>
                          <SelectItem value="paleo">Paleo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Optional: Select your dietary preference for meal planning</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Profile & Continue"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

