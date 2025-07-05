"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { getFilteredStatsForRole } from "@/lib/data/dashboard-stats"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DepartmentStatistics from "@/components/dashboard/department-statistics"
import CityStatistics from "@/components/dashboard/city-statistics"

export default function StatisticsPage() {
  const { user, isLoading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user || !hasPermission("view_department_stats")) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akses Terbatas</h2>
          <p className="text-gray-600">Anda tidak memiliki akses ke halaman statistik.</p>
        </div>
      </DashboardLayout>
    )
  }

  const statsData = getFilteredStatsForRole(user.role, user.department)

  return (
    <DashboardLayout>
      {user.role === "walikota" ? (
        <CityStatistics data={statsData.data} />
      ) : (
        <DepartmentStatistics data={statsData.data} userDepartment={user.department} />
      )}
    </DashboardLayout>
  )
}
