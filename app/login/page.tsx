"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth/auth-context"
import { Eye, EyeOff, QrCode, Chrome } from "lucide-react"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!identifier || !password) {
      setError("Semua field harus diisi")
      return
    }

    const success = await login({ identifier, password })
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Username/Email/NIK atau password salah")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Welcome message with background */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <div className="absolute inset-0">
          <Image src="/images/login-bg.png" alt="Parepare Background" fill className="object-cover" priority />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Selamat Datang!
            <br />
            Parepare Dalam Genggaman
          </h1>
          <p className="text-lg text-white/90 mb-8">Kemudahan untuk mendapatkan semua layanan dalam satu aplikasi</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 lg:flex-none lg:w-96 xl:w-[500px] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Masuk SSO PDG</h2>
            <p className="text-gray-600">
              Belum mempunyai akun?{" "}
              <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                Registrasi disini!
              </Link>
            </p>
          </div>

          {/* QR Code Section */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Scan kode QR dengan
              <br />
              Aplikasi PDG di HP Anda.
            </p>
          </div>

          <div className="text-center text-gray-500 mb-6">atau</div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Masukkan Username, Email, atau NIK*"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
                Lupa Kata Sandi?
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-8">
            <button className="w-full flex items-center justify-center space-x-3 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Chrome className="w-5 h-5 text-red-500" />
              <span className="text-gray-700">Masuk dengan Google</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              🏠 Mengalami kendala dengan PDG? <span className="text-orange-500 hover:text-orange-600">Bantuan</span>
            </Link>
          </div>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700">Email: budi.santoso@parepare.go.id</p>
            <p className="text-xs text-blue-700">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
