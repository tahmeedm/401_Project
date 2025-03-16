"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, Calendar, Award, Flame, Droplet } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import WorkoutPlanCard from "@/components/workout-plan-card"
import MealPlanCard from "@/components/meal-plan-card"
import { getUserProfile, getUserProgress } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<any>(null)
  const [progress, setProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, progressData] = await Promise.all([getUserProfile(), getUserProgress()])

        setProfile(profileData)
        setProgress(progressData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast({
          title: "Error loading dashboard",
          description: "Failed to load your data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-1">
          <div className="rounded-full bg-gray-900 px-4 py-1">
            <span className="text-sm font-medium">
              Day {progress?.currentDay || 1} of {progress?.totalDays || 90}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Workouts Completed"
          value={progress?.workoutsCompleted?.toString() || "0"}
          icon={<Activity className="h-5 w-5 text-purple-500" />}
          change={`+${progress?.workoutsThisWeek || 0} this week`}
          trend="up"
        />
        <StatCard
          title="Calories Burned"
          value={progress?.caloriesBurned?.toLocaleString() || "0"}
          icon={<Flame className="h-5 w-5 text-orange-500" />}
          change={`+${progress?.caloriesThisWeek || 0} this week`}
          trend="up"
        />
        <StatCard
          title="Water Intake"
          value={`${progress?.waterIntake || 0}L`}
          icon={<Droplet className="h-5 w-5 text-blue-500" />}
          change={`${progress?.waterIntakePercentage || 0}% of goal`}
          trend="neutral"
        />
        <StatCard
          title="Achievements"
          value={progress?.achievements?.length?.toString() || "0"}
          icon={<Award className="h-5 w-5 text-yellow-500" />}
          change={`${progress?.newAchievements || 0} new this week`}
          trend="up"
        />
      </div>

      {/* Progress Tracking */}
      <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-cyan-500" />
            Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Weight Goal</span>
                <span className="text-sm font-medium">
                  {progress?.currentWeight || 0}kg / {progress?.targetWeight || 0}kg
                </span>
              </div>
              <Progress value={progress?.weightProgress || 0} className="h-2 bg-gray-700" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Strength Progress</span>
                <span className="text-sm font-medium">{progress?.strengthProgress || 0}%</span>
              </div>
              <Progress value={progress?.strengthProgress || 0} className="h-2 bg-gray-700" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Cardio Endurance</span>
                <span className="text-sm font-medium">{progress?.cardioProgress || 0}%</span>
              </div>
              <Progress value={progress?.cardioProgress || 0} className="h-2 bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workout and Meal Plans */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Workout Plan</h2>
            <span className="text-sm text-gray-400">
              <Calendar className="mr-1 inline-block h-4 w-4" /> Today
            </span>
          </div>
          <WorkoutPlanCard />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Meal Plan</h2>
            <span className="text-sm text-gray-400">
              <Calendar className="mr-1 inline-block h-4 w-4" /> Today
            </span>
          </div>
          <MealPlanCard />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  change,
  trend,
}: {
  title: string
  value: string
  icon: React.ReactNode
  change: string
  trend: "up" | "down" | "neutral"
}) {
  return (
    <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          </div>
          <div className="rounded-full bg-gray-800 p-2">{icon}</div>
        </div>
        <div
          className={`mt-4 text-xs ${
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-400"
          }`}
        >
          {change}
        </div>
      </CardContent>
    </Card>
  )
}

