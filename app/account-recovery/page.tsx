"use client"

import { useState } from "react"
import Link from "next/link"
import { checkAccountLockStatus } from "@/actions/account-recovery"
import { ShieldAlert, Home, Mail, MessageCircle } from "lucide-react"

const PDG_ADMIN_WHATSAPP = "6282188219814"

function buildAdminRecoveryWhatsAppUrl(email: string) {
  const message = `Halo Admin PDG,

Akun saya dengan email ${email} telah dibekukan karena salah memasukkan kode OTP sebanyak 5 kali. Saya memohon bantuan untuk mengaktifkan kembali akun saya.

Terima kasih.`
  return `https://wa.me/${PDG_ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`
}

export default function AccountRecoveryPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<{
    found: boolean
    isLocked?: boolean
    mfaFailedAttempts?: number
    email?: string
  } | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setStatus(null)
    setLoading(true)
    try {
      const result = await checkAccountLockStatus(email)
      if (result.error) {
        setError(result.error)
      } else if (!result.found) {
        setStatus({ found: false })
      } else {
        setStatus({
          found: true,
          isLocked: result.isLocked,
          mfaFailedAttempts: result.mfaFailedAttempts,
          email: result.email,
        })
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-amber-700" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center text-gray-900 mb-2">Pemulihan Akun</h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Akun dapat ditangguhkan setelah 5 kali salah memasukkan kode MFA. Masukkan email untuk
          memeriksa status akun Anda.
        </p>

        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email terdaftar</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="nama@email.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Memeriksa..." : "Periksa Status Akun"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {status?.found === false && (
          <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            Email tidak ditemukan. Pastikan Anda memasukkan email yang digunakan saat registrasi.
          </p>
        )}

        {status?.found && status.isLocked && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 space-y-2">
            <p className="font-semibold">Akun ditangguhkan</p>
            <p>
              Akun <strong>{status.email}</strong> dibekukan karena terlalu banyak percobaan MFA
              gagal ({status.mfaFailedAttempts ?? 0}/5).
            </p>
            <p>
              Untuk membuka kembali akun, hubungi administrator PDG melalui WhatsApp. Admin akan
              memverifikasi identitas Anda lalu memulihkan akun melalui menu{" "}
              <strong>Pemulihan Akun</strong> di dashboard admin.
            </p>
            <a
              href={buildAdminRecoveryWhatsAppUrl(status.email ?? email)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              Hubungi Admin PDG via WhatsApp
            </a>
          </div>
        )}

        {status?.found && !status.isLocked && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
            Akun tidak dalam status ditangguhkan. Anda dapat{" "}
            <Link href="/login" className="font-medium underline">
              masuk kembali
            </Link>
            .
          </div>
        )}

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-green-600"
        >
          <Home className="w-4 h-4" />
          Kembali ke halaman login
        </Link>
      </div>
    </div>
  )
}
