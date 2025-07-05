import type { Metadata } from "next"
import MayorTradeDashboard from "@/components/dashboard/mayor-trade-dashboard"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export const metadata: Metadata = {
  title: "Dinas Perdagangan - Dashboard Walikota",
  description: "Strategic insights for Mayor from Department of Trade",
}

export default function MayorTradePage() {
  return (
    <DashboardLayout>
      <MayorTradeDashboard />
    </DashboardLayout>
  )
}
