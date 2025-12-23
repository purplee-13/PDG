"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit2, Trash2, Search, Filter, RefreshCw, X, Users as UsersIcon, Shield } from "lucide-react"
import { UserDialog } from "./user-dialog"
import { deleteUser } from "@/actions/users"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type User = {
    id: string
    name: string | null
    email: string
    role: "admin" | "mayor" | "department_head" | "public" | string | null
    department: string | null
    mfaEnabled: boolean | null
}

export default function UserManagementTable({ users }: { users: User[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    // Sync local state with URL params
    const currentSearch = searchParams.get("q") || ""
    const currentRole = searchParams.get("role") || "all"

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("q", term)
        } else {
            params.delete("q")
        }
        router.replace(`?${params.toString()}`)
    }, 300)

    const handleRoleFilter = (role: string) => {
        const params = new URLSearchParams(searchParams)
        if (role && role !== "all") {
            params.set("role", role)
        } else {
            params.delete("role")
        }
        router.replace(`?${params.toString()}`)
    }
    
    const clearFilters = () => {
        router.replace("/dashboard/users")
    }

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
            setIsDeleting(id)
            await deleteUser(id)
            setIsDeleting(null)
            router.refresh()
        }
    }

    const getRoleLabel = (role: string | null) => {
        switch (role) {
            case "admin": 
                return <Badge variant="default" className="bg-red-600 hover:bg-red-700 text-white">Admin</Badge>
            case "mayor":
            case "walikota": 
                return <Badge variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">Walikota</Badge>
            case "department_head": 
                return <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">Kepala Dinas</Badge>
            case "staff": 
                return <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">Staff</Badge>
            case "public":
                return <Badge variant="outline" className="border-gray-300 text-gray-700">Public</Badge>
            default: 
                return <Badge variant="outline" className="border-gray-300 text-gray-700">{role || "N/A"}</Badge>
        }
    }

    const hasActiveFilters = currentSearch || currentRole !== "all";

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kelola Pengguna</h1>
                    <p className="mt-2 text-sm text-gray-600">Kelola akses dan akun pengguna sistem dengan mudah</p>
                </div>
                <UserDialog trigger={
                    <Button className="shadow-sm bg-green-600 hover:bg-green-700 text-white">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        Tambah Pengguna
                    </Button>
                } />
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Pengguna</CardTitle>
                        <UsersIcon className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                        <p className="text-xs text-gray-500 mt-1">Pengguna aktif dalam sistem</p>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">MFA Aktif</CardTitle>
                        <Shield className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {users.filter(u => u.mfaEnabled).length}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Pengguna dengan autentikasi 2FA</p>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Admin</CardTitle>
                        <UsersIcon className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {users.filter(u => u.role === "admin").length}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Pengguna dengan akses admin</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Table Card */}
            <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4 border-b border-gray-200 bg-gray-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                            <CardTitle className="text-xl font-semibold text-gray-900">Daftar Pengguna</CardTitle>
                            <CardDescription className="mt-1">Cari dan filter pengguna berdasarkan nama, email, atau role</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                    {/* Enhanced Toolbar */}
                    <div className="p-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                        <div className="flex flex-1 w-full sm:max-w-md items-center space-x-2">
                         <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                             <Input
                                type="search"
                                placeholder="Cari nama atau email..."
                                    className="pl-10 pr-4 h-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                                defaultValue={currentSearch}
                                onChange={(e) => handleSearch(e.target.value)}
                             />
                         </div>
                    </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Select value={currentRole} onValueChange={handleRoleFilter}>
                                <SelectTrigger className="w-full sm:w-[180px] h-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500">
                                <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4 text-gray-400" />
                                    <SelectValue placeholder="Semua Role" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Role</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="mayor">Walikota</SelectItem>
                                <SelectItem value="walikota">Walikota</SelectItem>
                                <SelectItem value="department_head">Kepala Dinas</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="public">Public</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        {hasActiveFilters && (
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={clearFilters} 
                                    className="h-10 px-4 border-gray-300 hover:bg-gray-50"
                                    title="Reset Filter"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Reset
                            </Button>
                        )}
                    </div>
                </div>

                    <div className="relative w-full overflow-x-auto">
                    <Table>
                            <TableHeader className="bg-gray-50/80">
                                <TableRow className="hover:bg-gray-50/80">
                                    <TableHead className="w-[220px] font-semibold text-gray-700 py-4">Nama User</TableHead>
                                    <TableHead className="min-w-[240px] font-semibold text-gray-700 py-4">Email Address</TableHead>
                                    <TableHead className="min-w-[140px] font-semibold text-gray-700 py-4">Role Access</TableHead>
                                    <TableHead className="min-w-[150px] font-semibold text-gray-700 py-4">Unit Kerja</TableHead>
                                    <TableHead className="w-[120px] font-semibold text-gray-700 py-4">Status MFA</TableHead>
                                    <TableHead className="text-right w-[120px] font-semibold text-gray-700 py-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                    <TableRow 
                                        key={user.id} 
                                        className="hover:bg-green-50/30 transition-colors border-b border-gray-100"
                                    >
                                        <TableCell className="py-4">
                                        <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900">{user.name || "N/A"}</span>
                                            {/* Mobile only email */}
                                                <span className="sm:hidden text-xs text-gray-500 font-normal mt-1">{user.email}</span>
                                        </div>
                                    </TableCell>
                                        <TableCell className="hidden sm:table-cell py-4">
                                            <span className="text-gray-700 text-sm">{user.email}</span>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {getRoleLabel(user.role)}
                                        </TableCell>
                                        <TableCell className="py-4">
                                        {user.department ? (
                                                <span className="inline-flex items-center capitalize px-3 py-1.5 rounded-md bg-blue-50 text-xs font-medium text-blue-700 border border-blue-200">
                                                {user.department}
                                            </span>
                                        ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                        )}
                                    </TableCell>
                                        <TableCell className="py-4">
                                        {user.mfaEnabled ? (
                                                <div className="flex items-center text-green-700">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                                                    <span className="text-xs font-semibold">Aktif</span>
                                            </div>
                                        ) : (
                                                <div className="flex items-center text-gray-500">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-gray-300 mr-2" />
                                                 <span className="text-xs">Non-aktif</span>
                                            </div>
                                        )}
                                    </TableCell>
                                        <TableCell className="text-right py-4">
                                            <div className="flex justify-end gap-2">
                                            <UserDialog user={user} trigger={
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all"
                                                    >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                            } />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                    className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-all"
                                                onClick={() => handleDelete(user.id)}
                                                disabled={isDeleting === user.id}
                                            >
                                                {isDeleting === user.id ? (
                                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center py-8">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                                    <Search className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <p className="text-base font-medium text-gray-700 mb-1">Tidak ada pengguna ditemukan</p>
                                                <p className="text-sm text-gray-500 mb-4">
                                                    {hasActiveFilters 
                                                        ? "Coba ubah filter atau kata kunci pencarian Anda" 
                                                        : "Belum ada pengguna terdaftar dalam sistem"}
                                                </p>
                                            {hasActiveFilters && (
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={clearFilters} 
                                                        className="text-green-600 border-green-200 hover:bg-green-50"
                                                    >
                                                        <X className="h-4 w-4 mr-2" />
                                                    Reset Filter
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                            <UsersIcon className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Menampilkan <span className="text-gray-900 font-semibold">{users.length}</span> pengguna</span>
                        </div>
                    {/* Pagination Placeholder */}
                        <div className="text-xs text-gray-500">
                            {hasActiveFilters && "Hasil pencarian"}
                        </div>
                </div>
            </CardContent>
        </Card>
        </div>
    )
}
