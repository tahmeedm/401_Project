"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Dumbbell, Plus, Utensils, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface UserProfile {
  name: string
  age: number
  sex: string
  height: number
  weight: number
  fitness_level: string
  dietary_preference?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [waterIntake, setWaterIntake] = useState(3)
  const [todaySteps, setTodaySteps] = useState(8)
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(2)
  const [weeklyGoal, setWeeklyGoal] = useState(4)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("fitmate_current_user")
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to access your dashboard.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setUser(JSON.parse(currentUser))

    // Fetch user profile
    const fetchData = async () => {
      try {
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Get profile from localStorage
        const userProfiles = JSON.parse(localStorage.getItem("fitmate_profiles") || "[]")
        const userProfile = userProfiles.find((p: any) => p.userId === JSON.parse(currentUser).id)

        if (userProfile) {
          setProfile(userProfile)
        } else {
          // If no profile exists, redirect to profile creation
          toast({
            title: "Profile needed",
            description: "Please complete your profile to access the dashboard.",
          })
          router.push("/profile")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const todayWorkout = {
    name: "Upper Body Strength",
    exercises: [
      { name: "Bench Press", sets: "3", reps: "10", weight: "60kg" },
      { name: "Shoulder Press", sets: "3", reps: "12", weight: "40kg" },
      { name: "Lat Pulldowns", sets: "3", reps: "12", weight: "50kg" },
      { name: "Bicep Curls", sets: "3", reps: "15", weight: "15kg" },
      { name: "Tricep Extensions", sets: "3", reps: "15", weight: "15kg" },
    ],
  }

  const todayMeals = {
    breakfast: "Oatmeal with berries and nuts (350 calories)",
    snack1: "Greek yogurt with honey (150 calories)",
    lunch: "Grilled chicken salad with olive oil dressing (450 calories)",
    snack2: "Apple with almond butter (200 calories)",
    dinner: "Baked salmon with roasted vegetables (500 calories)",
  }

  const incrementWater = () => {
    setWaterIntake((prev) => Math.min(prev + 1, 8))
    toast({
      title: "Water intake updated",
      description: `You've logged ${waterIntake + 1} of 8 glasses today.`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 relative">
      <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-10 pointer-events-none"></div>

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal">
            {loading ? "Loading..." : `Welcome, ${user?.name?.split(" ")[0] || "User"}`}
          </h1>
          <p className="text-muted-foreground">{format(new Date(), "EEEE, MMMM do, yyyy")} | Your fitness dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/workout-plan">
            <Button
              variant="outline"
              className="gap-2 glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
            >
              <Plus className="h-4 w-4" /> Update Workout Plan
            </Button>
          </Link>
          <Link href="/meal-plan">
            <Button
              variant="outline"
              className="gap-2 glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
            >
              <Plus className="h-4 w-4" /> Update Meal Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weeklyWorkouts} / {weeklyGoal}
            </div>
            <div className="flex items-center pt-1">
              <Progress
                value={(weeklyWorkouts / weeklyGoal) * 100}
                className="h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-cyber-teal"
              />
              <span className="text-xs text-muted-foreground ml-2">
                {Math.round((weeklyWorkouts / weeklyGoal) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total sleep</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M19 5.93 12.73 12 19 18.07" />
              <path d="M16.27 12 5 12" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySteps.toLocaleString()}</div>
            <div className="flex items-center pt-1">
              <Progress
                value={Math.min((todaySteps / 8) * 100, 100)}
                className="h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-cyber-teal"
              />
              <span className="text-xs text-muted-foreground ml-2">{Math.round((todaySteps / 8) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2v1" />
              <path d="M12 7v1" />
              <path d="M12 12v1" />
              <path d="M12 17v1" />
              <path d="M12 22v1" />
              <path d="m19 5-1.5-1.5" />
              <path d="m14.5 9.5-1.5-1.5" />
              <path d="m8.5 3.5 1.5 1.5" />
              <path d="m3 8 1.5 1.5" />
              <path d="M3 17h1" />
              <path d="M8 17h1" />
              <path d="M13 17h1" />
              <path d="M18 17h1" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterIntake} / 8</div>
            <div className="flex items-center justify-between pt-1">
              <Progress
                value={(waterIntake / 8) * 100}
                className="h-2 flex-1 mr-4 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-cyber-teal"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={incrementWater}
                className="h-7 w-7 p-0 glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {loading ? (
                <p>Loading profile...</p>
              ) : profile ? (
                <div className="space-y-1">
                  <p>
                    <span className="text-muted-foreground">Height:</span> {profile.height} cm
                  </p>
                  <p>
                    <span className="text-muted-foreground">Weight:</span> {profile.weight} kg
                  </p>
                  <p>
                    <span className="text-muted-foreground">Level:</span> {profile.fitness_level}
                  </p>
                </div>
              ) : (
                <p>No profile found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Plan */}
          <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>Your workout and nutrition for today</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="workout" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
                  <TabsTrigger
                    value="workout"
                    className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-cyber-teal/20 data-[state=active]:text-primary"
                  >
                    <Dumbbell className="h-4 w-4" /> Workout
                  </TabsTrigger>
                  <TabsTrigger
                    value="nutrition"
                    className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-cyber-teal/20 data-[state=active]:text-primary"
                  >
                    <Utensils className="h-4 w-4" /> Nutrition
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="workout" className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{todayWorkout.name}</h3>
                    <Link href="/workout-plan">
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
                      >
                        View Full Plan
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {todayWorkout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5"
                      >
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                        </div>
                        <div className="text-sm font-medium">{exercise.weight}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-2">
                    <Link href="/workout-log">
                      <Button className="gap-2 bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-clipboard-check"
                        >
                          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <path d="m9 14 2 2 4-4" />
                        </svg>
                        Start Workout
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="nutrition" className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Today's Meal Plan</h3>
                    <Link href="/meal-plan">
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
                      >
                        View Full Plan
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="font-medium">Breakfast</p>
                      <p className="text-sm text-muted-foreground">{todayMeals.breakfast}</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="font-medium">Morning Snack</p>
                      <p className="text-sm text-muted-foreground">{todayMeals.snack1}</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="font-medium">Lunch</p>
                      <p className="text-sm text-muted-foreground">{todayMeals.lunch}</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="font-medium">Afternoon Snack</p>
                      <p className="text-sm text-muted-foreground">{todayMeals.snack2}</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="font-medium">Dinner</p>
                      <p className="text-sm text-muted-foreground">{todayMeals.dinner}</p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <Link href="/meal-log">
                      <Button className="gap-2 bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-clipboard-check"
                        >
                          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <path d="m9 14 2 2 4-4" />
                        </svg>
                        Log Meals
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Update your fitness data or create new plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/profile">
                  <Button className="w-full glass-effect text-gray-700 border-white/10 hover:shadow-glow transition-all duration-300 bg-white/5 hover:bg-white/10">
                    Update Profile
                  </Button>
                </Link>
                <Link href="/workout-plan">
                  <Button className="w-full glass-effect text-gray-700 border-white/10 hover:shadow-glow transition-all duration-300 bg-white/5 hover:bg-white/10">
                    Modify Workout Plan
                  </Button>
                </Link>
                <Link href="/meal-plan">
                  <Button className="w-full glass-effect text-gray-700 border-white/10 hover:shadow-glow transition-all duration-300 bg-white/5 hover:bg-white/10">
                    Modify Meal Plan
                  </Button>
                </Link>
                <Link href="/progress">
                  <Button className="w-full glass-effect text-gray-700 border-white/10 hover:shadow-glow transition-all duration-300 bg-white/5 hover:bg-white/10">
                    View Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Profile Summary */}
          <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="h-[150px] animate-pulse bg-white/5 rounded-md" />
              ) : profile ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-cyber-teal/20 flex items-center justify-center border border-white/10 shadow-glow">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {profile.age} years •{" "}
                        {profile.sex === "male" ? "Male" : profile.sex === "female" ? "Female" : profile.sex}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-medium">{profile.height} cm</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-medium">{profile.weight} kg</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="text-xs text-muted-foreground">BMI</p>
                      <p className="font-medium">{(profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)}</p>
                    </div>
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                      <p className="text-xs text-muted-foreground">Fitness Level</p>
                      <p className="font-medium capitalize">{profile.fitness_level}</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Link href="/profile">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
                      >
                        Edit Profile <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No profile found</p>
                  <Link href="/profile">
                    <Button className="bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300">
                      Create Profile
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card className="glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                Session Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                  <p className="text-xs text-muted-foreground">Session Status</p>
                  <p className="font-medium text-green-400">Active</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                  <p className="text-xs text-muted-foreground">Last Login</p>
                  <p className="font-medium">{format(new Date(), "MMM d, yyyy h:mm a")}</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/5">
                  <p className="text-xs text-muted-foreground">Data Saved</p>
                  <p className="font-medium">Profile, Meal Plan, Workout Plan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

