"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createUser, updateUser } from "@/actions/users"
import { Loader2 } from "lucide-react"

// Simple type definition
type User = {
    id: string
    name: string | null
    email: string
    role: "admin" | "mayor" | "department_head" | "public" | string | null
    department: string | null
}

interface UserDialogProps {
    user?: User // If provided, it's Edit mode
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function UserDialog({ user, trigger, open, onOpenChange }: UserDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isOpen, setIsOpen] = useState(false) // Internal state if not controlled

    const isEdit = !!user

    // Form States
    const [name, setName] = useState(user?.name || "")
    const [email, setEmail] = useState(user?.email || "")
    const [role, setRole] = useState(user?.role || "department_head")
    const [department, setDepartment] = useState(user?.department || "")
    const [password, setPassword] = useState("") // Only for create

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("role", role as string)
        formData.append("department", department)
        if (!isEdit) {
            formData.append("password", password)
        }

        try {
            const res = isEdit
                ? await updateUser(user.id, formData)
                : await createUser(formData)

            if (res.error) {
                setError(res.error)
            } else {
                // Success
                setIsOpen(false)
                onOpenChange?.(false)
                // Reset form if create
                if (!isEdit) {
                    setName("")
                    setEmail("")
                    setPassword("")
                }
            }
        } catch (e) {
            setError("Terjadi kesalahan sistem")
        } finally {
            setIsLoading(false)
        }
    }

    const showOpen = open !== undefined ? open : isOpen
    const setShowOpen = onOpenChange || setIsOpen

    return (
        <Dialog open={showOpen} onOpenChange={setShowOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Pengguna" : "Tambah Pengguna Baru"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Ubah detail pengguna di sini." : "Isi form berikut untuk membuat akun baru."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nama</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3" required disabled={isEdit} />
                    </div>
                    {!isEdit && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">Password</Label>
                            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="col-span-3" required />
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Role</Label>
                        <Select value={role as string} onValueChange={setRole}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="walikota">Walikota</SelectItem>
                                <SelectItem value="department_head">Kepala Dinas</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {(role === "department_head" || role === "staff") && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="department" className="text-right">Dinas</Label>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Pilih Dinas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kesehatan">Kesehatan</SelectItem>
                                    <SelectItem value="pendidikan">Pendidikan</SelectItem>
                                    <SelectItem value="perdagangan">Perdagangan</SelectItem>
                                    <SelectItem value="keuangan">Keuangan</SelectItem>
                                    <SelectItem value="umum">Umum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Simpan Perubahan" : "Buat Akun"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
