"use client"

import { useState } from "react"
import { Bell, Search, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function DashboardHeader() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New workout available",
      description: "Your custom HIIT workout is ready",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Goal achieved!",
      description: "You've reached your weekly protein goal",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Workout reminder",
      description: "Don't forget your leg day workout today",
      time: "Yesterday",
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex flex-1 items-center md:justify-end">
          <div className="relative mr-4 hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-gray-800 bg-gray-900">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="link" className="h-auto p-0 text-xs text-gray-400">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex cursor-pointer items-start p-3 hover:bg-gray-800 ${
                      !notification.read ? "bg-gray-800/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div
                      className={`mr-3 h-2 w-2 rounded-full ${
                        !notification.read ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-700"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-400">{notification.description}</p>
                      <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-400">No notifications</div>
              )}
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="cursor-pointer justify-center text-center text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-700">
            <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  )
}

