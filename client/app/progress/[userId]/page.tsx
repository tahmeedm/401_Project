"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Progress {
  weight: { date: string; value: number }[]
  strength: { date: string; value: number }[]
  endurance: { date: string; value: number }[]
}

export default function ProgressPage({ params }: { params: { userId: string } }) {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch(`/progress/${params.userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch progress")
        }

        const data = await response.json()
        setProgress(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load progress data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [params.userId])

  // For demo purposes, let's create sample progress data
  const sampleProgress: Progress = {
    weight: [
      { date: "2023-01-01", value: 80 },
      { date: "2023-02-01", value: 78 },
      { date: "2023-03-01", value: 76 },
      { date: "2023-04-01", value: 75 },
      { date: "2023-05-01", value: 74 },
      { date: "2023-06-01", value: 73 },
    ],
    strength: [
      { date: "2023-01-01", value: 50 },
      { date: "2023-02-01", value: 55 },
      { date: "2023-03-01", value: 60 },
      { date: "2023-04-01", value: 65 },
      { date: "2023-05-01", value: 70 },
      { date: "2023-06-01", value: 75 },
    ],
    endurance: [
      { date: "2023-01-01", value: 20 },
      { date: "2023-02-01", value: 25 },
      { date: "2023-03-01", value: 30 },
      { date: "2023-04-01", value: 35 },
      { date: "2023-05-01", value: 40 },
      { date: "2023-06-01", value: 45 },
    ],
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Track your fitness journey over time</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-[300px] w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          ) : progress ? (
            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="strength">Strength</TabsTrigger>
                <TabsTrigger value="endurance">Endurance</TabsTrigger>
              </TabsList>

              <TabsContent value="weight">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleProgress.weight}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Weight (kg)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="strength">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleProgress.strength}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: "Strength (kg)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#82ca9d"
                        activeDot={{ r: 8 }}
                        name="Bench Press (kg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="endurance">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleProgress.endurance}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: "Endurance (min)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ffc658"
                        activeDot={{ r: 8 }}
                        name="Running (min)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <p className="text-center text-muted-foreground">Progress data not found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

