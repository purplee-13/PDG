import { auth } from "@/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DashboardOverview from "@/components/dashboard/dashboard-overview"
import AdminDashboard from "@/components/dashboard/admin-dashboard" // We need to create this

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const role = session.user.role // This is now available thanks to our fix

  return (
    <DashboardLayout user={session.user}>
      {role === "admin" ? (
        <AdminDashboard />
      ) : ["walikota", "kepala_dinas"].includes(role) ? (
        <DashboardOverview />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akses Terbatas</h2>
          <p className="text-gray-600">
            Role Anda: <strong>{role}</strong><br />
            Anda tidak memiliki akses ke dashboard khusus.
          </p>
          <p className="mt-4 text-sm text-gray-500">Silakan hubungi administrator jika ini kesalahan.</p>
        </div>
      )}
    </DashboardLayout>
  )
}
