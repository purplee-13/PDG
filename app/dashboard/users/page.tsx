import { getUsers } from "@/actions/users"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import UserManagementTable from "@/components/dashboard/users/user-management-table"
import { UserDialog } from "@/components/dashboard/users/user-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Define types for SearchParams
type SearchParams = {
    q?: string
    role?: string
}

export default async function UserManagementPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const session = await auth()
    const params = await searchParams; // Await params in Next.js 15+

    if (session?.user?.role !== "admin") {
        redirect("/dashboard")
    }

    const users = await getUsers(params?.q, params?.role)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h1>
                <UserDialog trigger={
                    <Button className="shadow-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Pengguna
                    </Button>
                } />
            </div>


            <UserManagementTable users={users} />
        </div>
    )
}
