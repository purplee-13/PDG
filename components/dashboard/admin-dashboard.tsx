import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DepartmentStats } from "@/lib/data/dashboard-stats"
import { Users, Shield, Activity, Settings } from "lucide-react"
import Link from "next/link"

interface AdminDashboardProps {
    data: DepartmentStats | undefined
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.totalUsers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Active system users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MFA Status</CardTitle>
                        <Shield className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-xs text-muted-foreground">System-wide security</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>System Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-gray-500">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Link href="/dashboard/profile" className="flex items-center p-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                                <Settings className="w-4 h-4 mr-3" />
                                MFA Settings
                            </Link>
                            <div className="flex items-center p-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-not-allowed opacity-60">
                                <Activity className="w-4 h-4 mr-3" />
                                View System Logs
                            </div>
                            <Link href="/dashboard/users" className="flex items-center p-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                                <Users className="w-4 h-4 mr-3" />
                                Manage Users
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
