"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, LogOut, Menu, User, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const currentUser = localStorage.getItem("fitmate_current_user")
        if (currentUser) {
          setUser(JSON.parse(currentUser))
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setUser(null)
      }
    }

    checkAuth()

    // Listen for storage events (for when user logs in/out in another tab)
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("fitmate_current_user")
    setUser(null)

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home page
    router.push("/")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass-effect border-b border-white/10" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-cyber-teal flex items-center justify-center shadow-glow">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal">FitMate</span>
        </Link>

        {user ? (
          // Logged in navigation
          <>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Dashboard
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyber-teal transition-all duration-300 group-hover:w-full",
                    pathname === "/dashboard" ? "w-full" : "",
                  )}
                ></span>
              </Link>
              <Link
                href="/workout-plan"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname?.startsWith("/workout-plan") ? "text-primary" : "text-muted-foreground",
                )}
              >
                Workouts
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyber-teal transition-all duration-300 group-hover:w-full",
                    pathname?.startsWith("/workout-plan") ? "w-full" : "",
                  )}
                ></span>
              </Link>
              <Link
                href="/meal-plan"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname?.startsWith("/meal-plan") ? "text-primary" : "text-muted-foreground",
                )}
              >
                Nutrition
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyber-teal transition-all duration-300 group-hover:w-full",
                    pathname?.startsWith("/meal-plan") ? "w-full" : "",
                  )}
                ></span>
              </Link>
              <Link
                href="/profile"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname?.startsWith("/profile") ? "text-primary" : "text-muted-foreground",
                )}
              >
                Profile
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyber-teal transition-all duration-300 group-hover:w-full",
                    pathname?.startsWith("/profile") ? "w-full" : "",
                  )}
                ></span>
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <div className="text-sm text-muted-foreground mr-2">Hi, {user.name.split(" ")[0]}</div>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </>
        ) : (
          // Logged out navigation
          <>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/features"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === "/features" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Features
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyber-teal transition-all duration-300 group-hover:w-full",
                    pathname === "/features" ? "w-full" : "",
                  )}
                ></span>
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === "/about" ? "text-primary" : "text-muted-foreground",
                )}
              >
                About
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyber-teal transition-all duration-300 group-hover:w-full",
                    pathname === "/about" ? "w-full" : "",
                  )}
                ></span>
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-white/10 hover:text-primary transition-all duration-300">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300">
                  Register
                </Button>
              </Link>
            </div>
          </>
        )}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-effect border-l border-white/10">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setOpen(false)}>
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-cyber-teal flex items-center justify-center shadow-glow">
                  <Dumbbell className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal">
                  FitMate
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="rounded-full hover:bg-white/10"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {user ? (
              // Logged in mobile navigation
              <nav className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-2 mb-2 glass-effect border-white/10 rounded-md">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-white/5 transition-all duration-300",
                    pathname === "/dashboard" ? "bg-white/5 text-primary" : "text-muted-foreground",
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  href="/workout-plan"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-white/5 transition-all duration-300",
                    pathname?.startsWith("/workout-plan") ? "bg-white/5 text-primary" : "text-muted-foreground",
                  )}
                >
                  Workouts
                </Link>
                <Link
                  href="/meal-plan"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-white/5 transition-all duration-300",
                    pathname?.startsWith("/meal-plan") ? "bg-white/5 text-primary" : "text-muted-foreground",
                  )}
                >
                  Nutrition
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-white/5 transition-all duration-300",
                    pathname?.startsWith("/profile") ? "bg-white/5 text-primary" : "text-muted-foreground",
                  )}
                >
                  Profile
                </Link>

                <div className="border-t border-white/10 my-4"></div>

                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                  className="w-full gap-2 glass-effect border-white/10 hover:shadow-glow transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </nav>
            ) : (
              // Logged out mobile navigation
              <nav className="flex flex-col gap-4">
                <Link
                  href="/features"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-white/5 transition-all duration-300",
                    pathname === "/features" ? "bg-white/5 text-primary" : "text-muted-foreground",
                  )}
                >
                  Features
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-white/5 transition-all duration-300",
                    pathname === "/about" ? "bg-white/5 text-primary" : "text-muted-foreground",
                  )}
                >
                  About
                </Link>

                <div className="border-t border-white/10 my-4"></div>

                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full glass-effect border-white/10 hover:shadow-glow transition-all duration-300 bg-white/5 hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full mt-2 bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300">
                    Register
                  </Button>
                </Link>
              </nav>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

