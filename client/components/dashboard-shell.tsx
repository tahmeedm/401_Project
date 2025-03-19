"use client"

import type React from "react"
import { Bell, Dumbbell, LayoutDashboard, LogOut, Salad, User, BarChart3, BarChart, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { logout, user } = useAuth()
  const [showPopup, setShowPopup] = useState(false);

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
              onClick={() => {
                alert("No new notifications");
              }}
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only sm:inline">Notifications</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={() => {
                setShowPopup(true);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only sm:inline">Profile</span>
            </Button>
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                {/* Close Button */}
                <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => setShowPopup(false)}
                >
                <X size={24} />
                </button>

                {/* Popup Content */}
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">User Information</h2>
                <div className="space-y-3">
                <p className="text-gray-700">
                  <strong className="font-semibold text-gray-900">Email:</strong> {user?.email || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold text-gray-900">Meal Plan:</strong> {user?.hasMealPlan ? "Active" : "Not Active"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold text-gray-900">Profile:</strong> {user?.hasProfile ? "Complete" : "Incomplete"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold text-gray-900">Workout Plan:</strong> {user?.hasWorkoutPlan ? "Active" : "Not Active"}
                </p>
                </div>
                <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  className="text-cyan-600 border-cyan-600 hover:bg-cyan-50"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </Button>
                </div>
              </div>
              </div>
            )}
            
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
                className="justify-start hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight * 0.1,
                    behavior: "smooth"
                  });
                }}
              >
                <Dumbbell className="mr-2 h-4 w-4 text-blue-600" />
                Workouts
              </Button>

              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight * 0.42,
                    behavior: "smooth"
                  });
                }}
              >
                <Salad className="mr-2 h-4 w-4 text-blue-600" />
                Nutrition
              </Button>

              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight * 0.6,
                    behavior: "smooth"
                  });
                }}
              >
                <BarChart className="mr-2 h-4 w-4 text-blue-600" />
                Progress
              </Button>

            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

