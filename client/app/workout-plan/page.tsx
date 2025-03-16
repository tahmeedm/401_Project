"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
  workout_type: z.string({
    required_error: "Please select a workout type.",
  }),
  days_per_week: z.coerce.number().min(1).max(7),
  equipment_access: z.array(z.string()),
  workout_duration: z.string(),
})

const equipmentOptions = [
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbell", label: "Barbell" },
  { id: "kettlebells", label: "Kettlebells" },
  { id: "resistance_bands", label: "Resistance Bands" },
  { id: "pull_up_bar", label: "Pull-up Bar" },
  { id: "none", label: "No Equipment" },
]

export default function WorkoutPlanForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workout_type: "",
      days_per_week: 3,
      equipment_access: [],
      workout_duration: "30-45",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to save the workout plan
      console.log("Saving workout plan data:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Workout plan created!",
        description: "Your workout plan has been saved to the database.",
      })

      // Redirect to dashboard
      router.push(`/dashboard`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workout plan. Please try again.",
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
            Create Workout Plan
          </CardTitle>
          <CardDescription>Step 3: Set your workout preferences for your personalized fitness routine</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="workout_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass-effect border-white/10">
                          <SelectValue placeholder="Select your workout type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="strength">Strength Training</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="hiit">HIIT</SelectItem>
                        <SelectItem value="flexibility">Flexibility & Mobility</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose the type of workout you prefer</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="days_per_week"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Days Per Week</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={7}
                          step={1}
                          defaultValue={[value]}
                          onValueChange={(vals) => onChange(vals[0])}
                          className="[&>span]:bg-gradient-to-r [&>span]:from-primary [&>span]:to-cyber-teal"
                        />
                        <div className="flex justify-between">
                          <span className="text-xs">1 day</span>
                          <span className="text-xs font-medium">{value} days</span>
                          <span className="text-xs">7 days</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>How many days per week can you workout?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipment_access"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Equipment Access</FormLabel>
                      <FormDescription>Select the equipment you have access to</FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {equipmentOptions.map((equipment) => (
                        <FormField
                          key={equipment.id}
                          control={form.control}
                          name="equipment_access"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={equipment.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 glass-effect border-white/10"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(equipment.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), equipment.id])
                                        : field.onChange(field.value?.filter((value) => value !== equipment.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{equipment.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workout_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass-effect border-white/10">
                          <SelectValue placeholder="Select workout duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15-30">15-30 minutes</SelectItem>
                        <SelectItem value="30-45">30-45 minutes</SelectItem>
                        <SelectItem value="45-60">45-60 minutes</SelectItem>
                        <SelectItem value="60+">60+ minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How long do you want your workouts to be?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Workout Plan & Go to Dashboard"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

