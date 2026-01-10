import { getUsers } from "@/actions/users"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import UserManagementTable from "@/components/dashboard/users/user-management-table"

// Define types for SearchParams
type SearchParams = {
    q?: string
    role?: string
}

import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default async function UserManagementPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const session = await auth()
    const params = await searchParams; // Await params in Next.js 15+

    if (session?.user?.role !== "admin") {
        redirect("/dashboard")
    }

    const users = await getUsers(params?.q, params?.role)

    return (
        <DashboardLayout user={session.user}>
            <UserManagementTable users={users} />
        </DashboardLayout>
    )
}
