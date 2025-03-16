"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Dumbbell, Utensils, LineChart, Settings, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Workout Plan",
      href: "/dashboard/workout",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "Meal Plan",
      href: "/dashboard/meal-plan",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      name: "Progress",
      href: "/dashboard/progress",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center">
          <div className="mr-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-1">
            <div className="rounded-full bg-gray-900 p-2">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold">FitFuture</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-3 flex items-center">
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-700">
              <img src="/placeholder.svg?height=40&width=40" alt="User avatar" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-medium">Alex Johnson</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-700">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>

        {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition-transform duration-200 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
          {sidebarContent}
        </div>
      </>
    )
  }

  return <div className="hidden w-64 bg-gray-900 md:block">{sidebarContent}</div>
}

