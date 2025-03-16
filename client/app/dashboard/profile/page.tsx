"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Settings, Save, Camera } from "lucide-react"
import { getUserProfile } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    fitnessGoal: "",
    dietaryPreferences: [] as string[],
    experienceLevel: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await getUserProfile()
        setProfile({
          name: data.name || "",
          email: data.email || "",
          age: data.age?.toString() || "",
          gender: data.gender || "",
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          activityLevel: data.activityLevel || "",
          fitnessGoal: data.fitnessGoal || "",
          dietaryPreferences: data.dietaryPreferences || [],
          experienceLevel: data.experienceLevel || "",
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error loading profile",
          description: "Failed to load your profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // In a real app, you would save the profile data to an API
      // await updateUserProfile(profile);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error updating profile",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? (
            <>
              <LoadingSpinner className="mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-purple-500" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-700">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="w-full space-y-2 text-center">
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-sm text-gray-400">{profile.email}</p>
              <div className="mt-2 flex justify-center space-x-2">
                <div className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
                  Premium Member
                </div>
                <div className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">Level 3</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-cyan-500" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
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
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
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
                  />
                </div>
                <div>
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
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fitnessGoal">Fitness Goal</Label>
                <Select value={profile.fitnessGoal} onValueChange={(value) => handleSelectChange("fitnessGoal", value)}>
                  <SelectTrigger className="mt-1 border-gray-700 bg-gray-800/50 text-white">
                    <SelectValue placeholder="Select fitness goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="build-muscle">Build Muscle</SelectItem>
                    <SelectItem value="improve-fitness">Improve Overall Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

