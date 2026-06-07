import { auth } from "@/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import AccountRecoveryPanel from "@/components/dashboard/account-recovery-panel"
import { getLockedUsers } from "@/actions/account-recovery"

export default async function AdminAccountRecoveryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  const result = await getLockedUsers()
  const lockedUsers = "users" in result ? result.users : []

  return (
    <DashboardLayout user={session.user}>
      <AccountRecoveryPanel lockedUsers={lockedUsers} />
    </DashboardLayout>
  )
}
