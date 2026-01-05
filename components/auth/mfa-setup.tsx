"use client"

import { useState } from "react"
import Image from "next/image"
import { generateMfaSecretAction, enableMfaAction } from "@/actions/mfa"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function MfaSetup() {
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [secret, setSecret] = useState<string | null>(null)
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const startSetup = async () => {
        setIsLoading(true)
        setError("")
        try {
            const res = await generateMfaSecretAction()
            setSecret(res.secret)
            setQrCode(res.qrCodeUrl)
        } catch (e) {
            setError("Gagal menghasilkan Kode QR. Pastikan Anda sudah login.")
        } finally {
            setIsLoading(false)
        }
    }

    const verifyAndEnable = async () => {
        if (!secret || !code) return
        setIsLoading(true)
        setError("")
        try {
            const res = await enableMfaAction(secret, code)
            if (res?.error) {
                setError(res.error)
            } else {
                setIsSuccess(true)
                setQrCode(null) // Hide QR after success
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Gagal verifikasi.")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 text-green-700 mb-2">
                    <CheckCircle className="w-6 h-6" />
                    <h3 className="text-lg font-medium">MFA Berhasil Diaktifkan!</h3>
                </div>
                <p className="text-green-600 ml-9">Akun Anda sekarang lebih aman. Logout dan Login kembali untuk mencoba.</p>
            </div>
        )
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Factor Authentication (MFA)</h3>
            <p className="text-gray-500 mb-6">Tambahkan lapisan keamanan ekstra dengan aplikasi Authenticator (Google Auth / Authy).</p>

            {!qrCode ? (
                <div>
                    <button
                        onClick={startSetup}
                        disabled={isLoading}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Mulai Setup MFA
                    </button>
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                        <p className="text-sm font-medium mb-4 text-gray-700">Scan QR Code ini dengan aplikasi Authenticator Anda:</p>
                        <div className="relative w-48 h-48 bg-white p-2 rounded shadow-sm">
                            <Image src={qrCode} alt="MFA QR Code" fill className="object-contain" />
                        </div>
                        <p className="mt-4 text-xs text-gray-400 font-mono select-all">Secret: {secret}</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Masukkan 6-digit Kode Verifikasi</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                placeholder="000000"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest text-center text-lg"
                            />
                            <button
                                onClick={verifyAndEnable}
                                disabled={isLoading || code.length < 6}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                {isLoading ? "Memeriksa..." : "Verifikasi & Aktifkan"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
