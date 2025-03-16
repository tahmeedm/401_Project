import type { ReactNode } from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="container mx-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

