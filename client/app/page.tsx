import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, Salad, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Dumbbell className="h-6 w-6 text-cyan-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">FitMate</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-cyan-500 transition-colors">
              Login
            </Link>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your AI-Powered <span className="text-cyan-200">Fitness</span> Journey
                </h1>
                <p className="max-w-[600px] text-white/90 md:text-xl">
                  Personalized workouts, meal plans, and progress tracking - all powered by AI to help you achieve your
                  fitness goals.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-cyan-700 hover:bg-white/90 transition-colors">
                  <Link href="/register" className="flex items-center">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://img.freepik.com/premium-photo/man-running-treadmill-with-words-muscular-muscular_71956-45543.jpg"
                  alt="Fitness Training"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/30 to-cyan-500/30 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-gray-900 dark:text-white">
            Powered by AI, Designed for You
          </h2>
          <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7 dark:text-gray-300">
            FitMate uses advanced AI to create personalized fitness and nutrition plans that adapt to your progress.
          </p>
        </div>

        <div className="mx-auto grid gap-8 md:grid-cols-3 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-16">
          <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 shadow-sm">
              <Dumbbell className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Smart Workouts</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              AI-generated workout plans that adapt to your progress, equipment, and time constraints.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm">
              <Salad className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Personalized Nutrition</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Custom meal plans based on your dietary preferences, allergies, and fitness goals.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 shadow-sm">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress Tracking</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Visualize your fitness journey with detailed analytics and progress reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0 bg-gradient-to-r from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} FitMate. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

