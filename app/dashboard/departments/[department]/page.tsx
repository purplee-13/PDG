"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { getDepartmentStats } from "@/lib/data/dashboard-stats"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DepartmentDetailView from "@/components/dashboard/department-detail-view"

interface DepartmentPageProps {
  params: {
    department: string
  }
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const departmentData = getDepartmentStats(params.department)

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

  if (!user || !departmentData) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Departemen Tidak Ditemukan</h2>
          <p className="text-gray-600">Departemen yang Anda cari tidak tersedia.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DepartmentDetailView department={params.department} />
    </DashboardLayout>
  )
}
