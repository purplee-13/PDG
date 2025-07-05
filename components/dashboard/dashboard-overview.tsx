"use client"

import { useAuth } from "@/lib/auth/auth-context"
import { getFilteredStatsForRole } from "@/lib/data/dashboard-stats"
import DepartmentDashboard from "./department-dashboard"
import MayorDashboard from "./mayor-dashboard"

export default function DashboardOverview() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const statsData = getFilteredStatsForRole(user.role, user.department)

  if (user.role === "walikota") {
    return <MayorDashboard data={statsData.data} />
  } else if (user.role === "kepala_dinas") {
    return <DepartmentDashboard data={statsData.data} userDepartment={user.department} />
  }

  // Default fallback for other roles
  return <DepartmentDashboard data={statsData.data} userDepartment={user.department} />
}
