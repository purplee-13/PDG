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
import { Edit2, Trash2, Search, Filter, RefreshCw, X } from "lucide-react"
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
            case "admin": return <Badge variant="default" className="bg-red-600 hover:bg-red-700">Admin</Badge>
            case "walikota": return <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">Walikota</Badge>
            case "department_head": return <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">Kepala Dinas</Badge>
            case "staff": return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Staff</Badge>
            default: return <Badge variant="outline">{role}</Badge>
        }
    }

    const hasActiveFilters = currentSearch || currentRole !== "all";

    return (
        <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Daftar Pengguna</CardTitle>
                        <CardDescription>Kelola akses dan akun pengguna sistem.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {/* Visual Toolbar */}
                <div className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between bg-gray-50/50">
                    <div className="flex flex-1 w-full sm:max-w-sm items-center space-x-2">
                         <div className="relative flex-1">
                             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                             <Input
                                type="search"
                                placeholder="Cari nama atau email..."
                                className="pl-9 bg-white"
                                defaultValue={currentSearch}
                                onChange={(e) => handleSearch(e.target.value)}
                             />
                         </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select value={currentRole} onValueChange={handleRoleFilter}>
                            <SelectTrigger className="w-[160px] bg-white">
                                <div className="flex items-center">
                                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Semua Role" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Role</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="walikota">Walikota</SelectItem>
                                <SelectItem value="department_head">Kepala Dinas</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        {hasActiveFilters && (
                            <Button variant="ghost" size="icon" onClick={clearFilters} title="Reset Filter">
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[200px]">Nama User</TableHead>
                                <TableHead className="min-w-[200px]">Email Address</TableHead>
                                <TableHead>Role Access</TableHead>
                                <TableHead>Unit Kerja</TableHead>
                                <TableHead className="w-[100px]">Status MFA</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-semibold text-gray-900">
                                        <div className="flex flex-col">
                                            <span>{user.name}</span>
                                            {/* Mobile only email */}
                                            <span className="sm:hidden text-xs text-gray-500 font-normal">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-gray-600">{user.email}</TableCell>
                                    <TableCell>{getRoleLabel(user.role)}</TableCell>
                                    <TableCell>
                                        {user.department ? (
                                            <span className="capitalize px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700 border border-gray-200">
                                                {user.department}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.mfaEnabled ? (
                                            <div className="flex items-center text-green-600">
                                                 <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                                                 <span className="text-xs font-bold">Aktif</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-400">
                                                 <div className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
                                                 <span className="text-xs">Non-aktif</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <UserDialog user={user} trigger={
                                                <Button variant="ghost" size="sm" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                            } />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
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
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Search className="h-8 w-8 mb-2 opacity-20" />
                                            <p>Tidak ada pengguna ditemukan.</p>
                                            {hasActiveFilters && (
                                                <Button variant="link" size="sm" onClick={clearFilters} className="mt-1 text-blue-600">
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
                <div className="p-4 border-t bg-gray-50/30 text-xs text-gray-500 flex justify-between items-center">
                    <span>Menampilkan {users.length} pengguna</span>
                    {/* Pagination Placeholder */}
                </div>
            </CardContent>
        </Card>
    )
}
