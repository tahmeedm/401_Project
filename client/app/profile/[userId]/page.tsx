"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"

interface UserProfile {
  name: string
  age: number
  sex: string
  height: number
  weight: number
  fitness_level: string
  dietary_preference?: string
}

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`localhost:80/profile/${params.userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        setProfile(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [params.userId])

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{loading ? <Skeleton className="h-8 w-48" /> : profile?.name}</CardTitle>
          <CardDescription>User Profile</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : profile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Age</p>
                <p className="text-lg">{profile.age} years</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Sex</p>
                <p className="text-lg capitalize">{profile.sex}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Height</p>
                <p className="text-lg">{profile.height} cm</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Weight</p>
                <p className="text-lg">{profile.weight} kg</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Fitness Level</p>
                <p className="text-lg capitalize">{profile.fitness_level}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Dietary Preference</p>
                <p className="text-lg capitalize">{profile.dietary_preference || "None"}</p>
              </div>

              <div className="space-y-1 md:col-span-2">
                <p className="text-sm font-medium">BMI</p>
                <p className="text-lg">{(profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Profile not found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

