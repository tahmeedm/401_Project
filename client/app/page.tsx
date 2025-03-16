import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, Target, Utensils } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Your Personal{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal">
                Fitness Assistant
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              FitMate helps you create personalized workout and meal plans based on your profile and goals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          </div>
          <div className="relative w-full max-w-5xl mx-auto mt-8 animate-float">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyber-teal rounded-xl blur-xl opacity-30"></div>
            <div className="relative glass-effect rounded-xl overflow-hidden border-white/10 shadow-glow">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                width={1200}
                height={600}
                alt="FitMate Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-24 relative">
        <div className="absolute inset-0 hexagon-pattern opacity-30"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How FitMate Works</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Getting started is easy. Follow these simple steps to begin your fitness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 -translate-y-1/2"></div>

            <div className="flex flex-col items-center text-center p-6 relative z-10">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-cyber-teal flex items-center justify-center text-primary-foreground text-2xl font-bold mb-6 relative z-10 shadow-glow">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-muted-foreground">Register and login to access your personal dashboard</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-cyber-teal flex items-center justify-center text-primary-foreground text-2xl font-bold mb-6 relative z-10 shadow-glow">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Profile</h3>
              <p className="text-muted-foreground">Enter your fitness details and preferences</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-cyber-teal flex items-center justify-center text-primary-foreground text-2xl font-bold mb-6 relative z-10 shadow-glow">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Create Plans</h3>
              <p className="text-muted-foreground">Generate personalized workout and meal plans</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-cyber-teal flex items-center justify-center text-primary-foreground text-2xl font-bold mb-6 relative z-10 shadow-glow">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">Monitor your fitness journey on your dashboard</p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/register">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300"
              >
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-transparent"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Everything you need for your fitness journey in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col p-6 rounded-xl glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-cyber-teal/20 flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Workout Plans</h3>
              <p className="text-muted-foreground">
                Create personalized workout routines based on your fitness level and goals
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-cyber-teal/20 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Meal Plans</h3>
              <p className="text-muted-foreground">
                Get nutrition recommendations tailored to your dietary preferences
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl glass-effect border-white/10 hover:shadow-glow transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-cyber-teal/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your fitness journey with easy-to-understand metrics and visualizations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-cyber-teal/80"></div>
        <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-10"></div>
        <div className="container px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl max-w-[800px] mx-auto mb-8 text-white/80">
            Create your account now and get personalized workout and meal plans
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-primary hover:bg-white/90 hover:shadow-glow-lg transition-all duration-300"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

