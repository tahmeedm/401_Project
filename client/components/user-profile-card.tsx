import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Dumbbell, Ruler, Weight, Utensils } from "lucide-react"

interface UserProfileProps {
  name: string
  age: number
  sex: string
  height: number
  weight: number
  fitness_level: string
  dietary_preference: string
}

export function UserProfileCard({
  name,
  age,
  sex,
  height,
  weight,
  fitness_level,
  dietary_preference,
}: UserProfileProps) {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gray-50 dark:bg-gray-800 rounded-t-lg">
        <CardTitle className="flex items-center text-gray-800 dark:text-white">
          <User className="mr-2 h-5 w-5 text-cyan-600" /> Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <div className="font-medium">Name</div>
            <div>{name}</div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <div className="font-medium flex items-center">
              <Dumbbell className="mr-2 h-4 w-4 text-cyan-600" /> Fitness Level
            </div>
            <div className="capitalize">{fitness_level}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Ruler className="mr-1 h-3 w-3" /> Height
              </div>
              <div className="font-bold text-lg">{height} cm</div>
            </div>

            <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Weight className="mr-1 h-3 w-3" /> Weight
              </div>
              <div className="font-bold text-lg">{weight} kg</div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <div className="font-medium flex items-center">
              <Utensils className="mr-2 h-4 w-4 text-blue-600" /> Dietary Preference
            </div>
            <div className="capitalize">{dietary_preference || "None"}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-medium">Age</div>
            <div>{age} years</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-medium">Sex</div>
            <div className="capitalize">{sex}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

