"use client"

import type React from "react"

import { useAuth } from "@/lib/auth/auth-context"
import { Chrome, Eye, EyeOff, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isMfaRequired, setIsMfaRequired] = useState(false)
  const [mfaCode, setMfaCode] = useState("")

  const { isLoading: isContextLoading, setAuthenticatedUser } = useAuth() // Keep context for now just to not break hook rules
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)
      if (isMfaRequired && mfaCode) {
        formData.append("code", mfaCode)
      }

      // Use the unified API login endpoint
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          code: isMfaRequired && mfaCode ? mfaCode : undefined
        }),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        setError(result?.error || "Kredensial tidak valid");
        if (result?.mfaRequired) {
          setIsMfaRequired(true)
        }
      } else if (result?.mfaRequired) {
        setIsMfaRequired(true)
        setError("")
      } else if (result?.success) {
        // Success
        if (result.user && setAuthenticatedUser) {
          // @ts-ignore
          setAuthenticatedUser(result.user);
        }

        router.push(result.redirectTo || "/dashboard")
        router.refresh()
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan sistem")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = isContextLoading || isSubmitting

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:flex-1 relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bg.png"
            alt="Parepare Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 text-white w-full">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#FF9100' }}>
            Selamat Datang!
            <br />
            Parepare Dalam Genggaman
          </h1>

          <div className="mb-6 w-[300px] h-[300px] relative">
            <Image
              src="/images/IconLogin.png"
              alt="Icon Login"
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="text-lg max-w-md " style={{ color: '#083358' }}>
            Kemudahan untuk mendapatkan semua layanan dalam satu aplikasi
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 lg:flex-none lg:w-96 xl:w-[500px] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Masuk SSO PDG</h2>
            {!isMfaRequired && (
              <p className="text-gray-600">
                Belum mempunyai akun?{" "}
                <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                  Registrasi disini!
                </Link>
              </p>
            )}
            {isMfaRequired && (
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-sm mt-2">
                🔒 Keamanan Tambahan Diaktifkan. Masukkan kode Authenticator Anda.
              </p>
            )}
          </div>

          {!isMfaRequired && (
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
          )}

          {!isMfaRequired && <div className="text-center text-gray-500 mb-6">atau</div>}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isMfaRequired ? (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
              </>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kode Autentikasi (6 Digit)</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                    autoFocus
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => { setIsMfaRequired(false); setMfaCode(""); setError(""); }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Kembali ke halamam login
                  </button>
                </div>
              </div>
            )}

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
              {isLoading ? "Memproses..." : (isMfaRequired ? "Verifikasi Kode" : "Masuk")}
            </button>
          </form>

          {!isMfaRequired && (
            <>
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
                <p className="text-xs text-blue-700">Email: admin@parepare.go.id</p>
                <p className="text-xs text-blue-700">Password: admin</p>
                <p className="text-xs text-blue-700 mt-2 italic">Note: Akun ini disetup melalui /api/seed</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
