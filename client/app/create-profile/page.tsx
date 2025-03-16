"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight } from "lucide-react"
import { createUserProfile, createFitnessGoal } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function CreateProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    fitnessGoal: "",
    dietaryPreferences: [] as string[],
    experienceLevel: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleDietaryPreferenceToggle = (preference: string) => {
    setProfile((prev) => {
      const preferences = [...prev.dietaryPreferences]
      if (preferences.includes(preference)) {
        return {
          ...prev,
          dietaryPreferences: preferences.filter((p) => p !== preference),
        }
      } else {
        return {
          ...prev,
          dietaryPreferences: [...preferences, preference],
        }
      }
    })
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create user profile
      const userProfile = await createUserProfile({
        name: profile.name,
        age: Number.parseInt(profile.age),
        gender: profile.gender,
        height: Number.parseInt(profile.height),
        weight: Number.parseInt(profile.weight),
        activityLevel: profile.activityLevel,
        experienceLevel: profile.experienceLevel,
        dietaryPreferences: profile.dietaryPreferences,
      })

      // Create fitness goal
      await createFitnessGoal({
        userId: userProfile.id, // Assuming the API returns the user ID
        goalType: profile.fitnessGoal,
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      })

      toast({
        title: "Profile created successfully!",
        description: "Redirecting to your dashboard...",
      })

      // Redirect to dashboard after profile creation
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating profile:", error)
      toast({
        title: "Error creating profile",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Create Your Profile</h1>
            <p className="text-gray-400">Help us personalize your fitness journey</p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="flex w-full max-w-md items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1">
                  <div
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                      step >= i ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-700"
                    }`}
                  >
                    {step > i ? "✓" : <span className="text-sm font-medium">{i}</span>}
                  </div>
                  {i < 3 && (
                    <div
                      className={`h-1 ${step > i ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-700"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gray-800/30 p-8 backdrop-blur">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Basic Information</h2>

                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="16"
                      max="100"
                      value={profile.age}
                      onChange={handleChange}
                      className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={profile.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger className="mt-1 border-gray-700 bg-gray-800/50 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        min="100"
                        max="250"
                        value={profile.height}
                        onChange={handleChange}
                        className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        min="30"
                        max="300"
                        value={profile.weight}
                        onChange={handleChange}
                        className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Fitness Profile</h2>

                  <div>
                    <Label htmlFor="activityLevel">Activity Level</Label>
                    <Select
                      value={profile.activityLevel}
                      onValueChange={(value) => handleSelectChange("activityLevel", value)}
                    >
                      <SelectTrigger className="mt-1 border-gray-700 bg-gray-800/50 text-white">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="very-active">Very active (very hard exercise & physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Fitness Goal</Label>
                    <RadioGroup
                      value={profile.fitnessGoal}
                      onValueChange={(value) => handleSelectChange("fitnessGoal", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lose-weight" id="lose-weight" className="border-gray-600" />
                        <Label htmlFor="lose-weight" className="font-normal">
                          Lose Weight
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maintain" id="maintain" className="border-gray-600" />
                        <Label htmlFor="maintain" className="font-normal">
                          Maintain Weight
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="build-muscle" id="build-muscle" className="border-gray-600" />
                        <Label htmlFor="build-muscle" className="font-normal">
                          Build Muscle
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="improve-fitness" id="improve-fitness" className="border-gray-600" />
                        <Label htmlFor="improve-fitness" className="font-normal">
                          Improve Overall Fitness
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select
                      value={profile.experienceLevel}
                      onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                    >
                      <SelectTrigger className="mt-1 border-gray-700 bg-gray-800/50 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Dietary Preferences</h2>

                  <div>
                    <Label className="mb-2 block">Dietary Restrictions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo", "Low-Carb", "Low-Fat"].map(
                        (preference) => (
                          <div
                            key={preference}
                            className={`cursor-pointer rounded-lg border p-3 transition-all ${
                              profile.dietaryPreferences.includes(preference)
                                ? "border-purple-500 bg-purple-500/20"
                                : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                            }`}
                            onClick={() => handleDietaryPreferenceToggle(preference)}
                          >
                            {preference}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800"
                      disabled={isSubmitting}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner className="mr-2" />
                          Creating Profile...
                        </>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

