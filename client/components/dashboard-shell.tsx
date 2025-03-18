"use client"

import type React from "react"
import { Bell, Dumbbell, LayoutDashboard, LogOut, Salad, User, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { logout, user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Dumbbell className="h-6 w-6 text-cyan-600" />
            <span className="text-gray-900 dark:text-white">FitMate</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only sm:inline">Notifications</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only sm:inline">Profile</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only sm:inline">Logout</span>
            </Button>
          </nav>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <div className="mb-6 px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Welcome, {user?.email?.split("@")[0] || "User"}
              </p>
            </div>
            <nav className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100 hover:text-cyan-600 dark:hover:bg-gray-800 dark:hover:text-cyan-400"
                asChild
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4 text-cyan-600" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100 hover:text-cyan-600 dark:hover:bg-gray-800 dark:hover:text-cyan-400"
                asChild
              >
                <Link href="/dashboard/workouts">
                  <Dumbbell className="mr-2 h-4 w-4 text-cyan-600" />
                  Workouts
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                asChild
              >
                <Link href="/dashboard/nutrition">
                  <Salad className="mr-2 h-4 w-4 text-blue-600" />
                  Nutrition
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                asChild
              >
                <Link href="/dashboard/progress">
                  <BarChart3 className="mr-2 h-4 w-4 text-blue-600" />
                  Progress
                </Link>
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

