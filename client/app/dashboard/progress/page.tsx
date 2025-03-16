"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Activity, TrendingUp, Scale, Ruler, Camera, Plus } from "lucide-react"
import { getUserProgress } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function ProgressPage() {
  const { toast } = useToast()
  const [progress, setProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true)
        const data = await getUserProgress()
        setProgress(data)
      } catch (error) {
        console.error("Error fetching progress data:", error)
        toast({
          title: "Error loading progress",
          description: "Failed to load your progress data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [toast])

  const handleAddProgressPhoto = () => {
    // In a real app, this would open a modal to upload a photo
    toast({
      title: "Feature coming soon",
      description: "Progress photo upload will be available in a future update.",
    })
  }

  const handleLogMeasurements = () => {
    // In a real app, this would open a modal to log measurements
    toast({
      title: "Feature coming soon",
      description: "Measurement logging will be available in a future update.",
    })
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-gray-400">Loading your progress data...</p>
        </div>
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <p className="mb-6 text-xl font-medium">No progress data found</p>
        <Button
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
          onClick={handleLogMeasurements}
        >
          <Plus className="mr-2 h-4 w-4" />
          Log Initial Measurements
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
            onClick={handleAddProgressPhoto}
          >
            <Camera className="mr-2 h-4 w-4" />
            Add Progress Photo
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
            onClick={handleLogMeasurements}
          >
            <Plus className="mr-2 h-4 w-4" />
            Log Measurements
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weight">
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger
            value="weight"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
          >
            <Scale className="mr-2 h-4 w-4" />
            Weight
          </TabsTrigger>
          <TabsTrigger
            value="measurements"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
          >
            <Ruler className="mr-2 h-4 w-4" />
            Measurements
          </TabsTrigger>
          <TabsTrigger
            value="strength"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
          >
            <Activity className="mr-2 h-4 w-4" />
            Strength
          </TabsTrigger>
          <TabsTrigger
            value="cardio"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Cardio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weight">
          <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-purple-500" />
                Weight Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <WeightChart />
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <StatCard
                  title="Current Weight"
                  value={`${progress.weight?.current || 0} kg`}
                  change={`${progress.weight?.change || 0} kg`}
                  trend={progress.weight?.trend || "neutral"}
                  isPositive={progress.weight?.isPositiveChange || false}
                />
                <StatCard
                  title="Goal Weight"
                  value={`${progress.weight?.goal || 0} kg`}
                  change={`${progress.weight?.remaining || 0} kg to go`}
                  trend="neutral"
                  isPositive={false}
                />
                <StatCard
                  title="Weekly Change"
                  value={`${progress.weight?.weeklyChange || 0} kg`}
                  change={`Last week: ${progress.weight?.previousWeekChange || 0} kg`}
                  trend={progress.weight?.weeklyTrend || "neutral"}
                  isPositive={progress.weight?.isWeeklyPositive || false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="measurements">
          <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ruler className="mr-2 h-5 w-5 text-cyan-500" />
                Body Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <MeasurementsChart />
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-4">
                {progress.measurements?.map((measurement: any, index: number) => (
                  <MeasurementCard
                    key={index}
                    title={measurement.name}
                    current={`${measurement.current} cm`}
                    previous={`${measurement.previous} cm`}
                    change={`${measurement.change > 0 ? "+" : ""}${measurement.change} cm`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strength">
          <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-500" />
                Strength Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <StrengthChart />
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {progress.strength?.exercises?.map((exercise: any, index: number) => (
                  <ExerciseCard
                    key={index}
                    title={exercise.name}
                    current={`${exercise.current} kg`}
                    previous={`${exercise.previous} kg`}
                    change={`${exercise.change > 0 ? "+" : ""}${exercise.change} kg`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cardio">
          <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                Cardio Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <CardioChart />
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {progress.cardio?.metrics?.map((metric: any, index: number) => (
                  <CardioCard
                    key={index}
                    title={metric.name}
                    current={metric.current}
                    previous={metric.previous}
                    change={metric.change}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
          <CardHeader>
            <CardTitle>Progress Photos</CardTitle>
          </CardHeader>
          <CardContent>
            {progress.photos && progress.photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {progress.photos.slice(0, 3).map((photo: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img
                        src={photo.url || "/placeholder.svg?height=200&width=200"}
                        alt={`Progress photo - ${photo.angle}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400">{photo.angle}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <div className="text-center">
                  <p className="mb-4 text-lg font-medium">No progress photos yet</p>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                    onClick={handleAddProgressPhoto}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Add First Photo
                  </Button>
                </div>
              </div>
            )}
            {progress.photos && progress.photos.length > 0 && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={handleAddProgressPhoto}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  View All Photos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-800/30 backdrop-blur">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {progress.achievements && progress.achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {progress.achievements.map((achievement: any, index: number) => (
                  <AchievementCard
                    key={index}
                    title={achievement.title}
                    description={achievement.description}
                    date={achievement.date}
                    unlocked={achievement.unlocked}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <div className="text-center">
                  <p className="mb-4 text-lg font-medium">No achievements yet</p>
                  <p className="text-sm text-gray-400">Complete workouts and reach goals to earn achievements</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function WeightChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Weight Chart Visualization</p>
        <p className="mt-2 text-sm text-gray-400">
          (In a real app, this would be a chart showing weight progress over time)
        </p>
      </div>
    </div>
  )
}

function MeasurementsChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Measurements Chart Visualization</p>
        <p className="mt-2 text-sm text-gray-400">
          (In a real app, this would be a chart showing body measurements over time)
        </p>
      </div>
    </div>
  )
}

function StrengthChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Strength Progress Visualization</p>
        <p className="mt-2 text-sm text-gray-400">
          (In a real app, this would be a chart showing strength gains over time)
        </p>
      </div>
    </div>
  )
}

function CardioChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Cardio Performance Visualization</p>
        <p className="mt-2 text-sm text-gray-400">
          (In a real app, this would be a chart showing cardio metrics over time)
        </p>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  trend,
  isPositive,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  isPositive: boolean
}) {
  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p
        className={`mt-2 text-sm ${
          trend === "neutral" ? "text-gray-400" : isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </p>
    </div>
  )
}

function MeasurementCard({
  title,
  current,
  previous,
  change,
}: {
  title: string
  current: string
  previous: string
  change: string
}) {
  const isPositive = !change.startsWith("+")

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-xl font-bold">{current}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">Previous: {previous}</span>
        <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</span>
      </div>
    </div>
  )
}

function ExerciseCard({
  title,
  current,
  previous,
  change,
}: {
  title: string
  current: string
  previous: string
  change: string
}) {
  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-xl font-bold">{current}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">Previous: {previous}</span>
        <span className="text-xs text-green-500">{change}</span>
      </div>
    </div>
  )
}

function CardioCard({
  title,
  current,
  previous,
  change,
}: {
  title: string
  current: string
  previous: string
  change: string
}) {
  const isPositive = title === "5K Run" || title === "Recovery Time"

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-xl font-bold">{current}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">Previous: {previous}</span>
        <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</span>
      </div>
    </div>
  )
}

function AchievementCard({
  title,
  description,
  date,
  unlocked,
}: {
  title: string
  description: string
  date: string
  unlocked: boolean
}) {
  return (
    <div
      className={`rounded-lg p-4 ${unlocked ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30" : "bg-gray-800/50"}`}
    >
      <div className="flex items-start">
        <div
          className={`mr-3 rounded-full p-2 ${
            unlocked ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-700"
          }`}
        >
          {unlocked ? <Award className="h-4 w-4 text-white" /> : <Lock className="h-4 w-4 text-gray-400" />}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
          <p className={`mt-2 text-xs ${unlocked ? "text-purple-400" : "text-gray-500"}`}>{date}</p>
        </div>
      </div>
    </div>
  )
}

function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

