"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  adminSearchUserForRecovery,
  adminUnlockUserAccount,
  type LockedUserRow,
} from "@/actions/account-recovery"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ShieldAlert, Search, Unlock, Mail, AlertTriangle, CheckCircle2 } from "lucide-react"

type AccountRecoveryPanelProps = {
  lockedUsers: LockedUserRow[]
}

export default function AccountRecoveryPanel({ lockedUsers }: AccountRecoveryPanelProps) {
  const router = useRouter()
  const [searchEmail, setSearchEmail] = useState("")
  const [searchResult, setSearchResult] = useState<LockedUserRow | null | "not_found">(null)
  const [searchError, setSearchError] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [unlockingId, setUnlockingId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState("")
  const [actionError, setActionError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setSearchError("")
    setSearchResult(null)
    setSuccessMsg("")
    setActionError("")
    setSearchLoading(true)

    try {
      const res = await adminSearchUserForRecovery(searchEmail)
      if ("error" in res && res.error) {
        setSearchError(res.error)
      } else if (!res.found) {
        setSearchResult("not_found")
      } else {
        setSearchResult(res.user)
      }
    } catch {
      setSearchError("Gagal mencari pengguna.")
    } finally {
      setSearchLoading(false)
    }
  }

  const handleUnlock = async (userId: string, email: string) => {
    if (
      !confirm(
        `Pulihkan akun ${email}?\n\nStatus ditangguhkan akan dihapus dan percobaan MFA gagal direset. Pengguna dapat login kembali.`
      )
    ) {
      return
    }

    setUnlockingId(userId)
    setSuccessMsg("")
    setActionError("")

    const res = await adminUnlockUserAccount(userId)
    setUnlockingId(null)

    if (res?.error) {
      setActionError(res.error)
    } else {
      setSuccessMsg(`Akun ${res.email ?? email} berhasil dipulihkan.`)
      setSearchResult(null)
      setSearchEmail("")
      router.refresh()
    }
  }

  const renderRoleBadge = (role: string | null) => {
    const label = role ?? "—"
    return (
      <Badge variant="outline" className="capitalize text-xs">
        {label}
      </Badge>
    )
  }

  const renderUserRow = (user: LockedUserRow, showActions = true) => (
    <TableRow key={user.id}>
      <TableCell className="font-medium">{user.name || "—"}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{renderRoleBadge(user.role)}</TableCell>
      <TableCell>
        <span className="text-sm text-red-600 font-medium">
          {user.mfaFailedAttempts ?? 0}/5
        </span>
      </TableCell>
      <TableCell>
        {user.mfaEnabled ? (
          <Badge className="bg-green-600 text-xs">MFA aktif</Badge>
        ) : (
          <Badge variant="secondary" className="text-xs">
            MFA nonaktif
          </Badge>
        )}
      </TableCell>
      {showActions && (
        <TableCell className="text-right">
          <Button
            size="sm"
            disabled={unlockingId === user.id}
            onClick={() => handleUnlock(user.id, user.email)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Unlock className="w-4 h-4 mr-1.5" />
            {unlockingId === user.id ? "Memproses..." : "Pulihkan akun"}
          </Button>
        </TableCell>
      )}
    </TableRow>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pemulihan Akun</h1>
        <p className="mt-2 text-sm text-gray-600">
          Kelola akun pengguna yang ditangguhkan setelah 5 kali gagal verifikasi MFA.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{successMsg}</p>
        </div>
      )}

      {actionError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{actionError}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Akun Ditangguhkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{lockedUsers.length}</div>
            <p className="text-xs text-gray-500 mt-1">Menunggu pemulihan oleh admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Alur Pemulihan</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-gray-600 space-y-1">
            <p>1. Pengguna gagal MFA 5 kali → akun ditangguhkan</p>
            <p>2. Pengguna mengajukan via halaman pemulihan akun</p>
            <p>3. Admin verifikasi identitas lalu klik &quot;Pulihkan akun&quot;</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="w-5 h-5 text-gray-500" />
            Cari Akun untuk Dipulihkan
          </CardTitle>
          <CardDescription>Masukkan email pengguna yang melapor akun ditangguhkan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                required
                placeholder="email@contoh.com"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={searchLoading} className="bg-green-600 hover:bg-green-700">
              {searchLoading ? "Mencari..." : "Cari"}
            </Button>
          </form>

          {searchError && <p className="text-sm text-red-600">{searchError}</p>}

          {searchResult === "not_found" && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              Email tidak ditemukan di sistem.
            </p>
          )}

          {searchResult && searchResult !== "not_found" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-gray-900">{searchResult.name || searchResult.email}</p>
                {searchResult.isLocked ? (
                  <Badge variant="destructive">Ditangguhkan</Badge>
                ) : (
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    Tidak ditangguhkan
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-700">
                Email: {searchResult.email} · Percobaan MFA gagal:{" "}
                <strong>{searchResult.mfaFailedAttempts ?? 0}/5</strong>
              </p>
              {searchResult.isLocked ? (
                <Button
                  size="sm"
                  disabled={unlockingId === searchResult.id}
                  onClick={() => handleUnlock(searchResult.id, searchResult.email)}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Unlock className="w-4 h-4 mr-1.5" />
                  {unlockingId === searchResult.id ? "Memproses..." : "Pulihkan akun ini"}
                </Button>
              ) : (
                <p className="text-sm text-gray-600">
                  Akun tidak ditangguhkan. Tidak perlu tindakan pemulihan.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Daftar Akun Ditangguhkan
          </CardTitle>
          <CardDescription>
            Semua akun yang saat ini tidak dapat login karena kegagalan MFA berulang
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Gagal MFA</TableHead>
                  <TableHead>Status MFA</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lockedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                      Tidak ada akun ditangguhkan saat ini.
                    </TableCell>
                  </TableRow>
                ) : (
                  lockedUsers.map((user) => renderUserRow(user))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
