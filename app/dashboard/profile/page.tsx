import MfaSetup from "@/components/auth/mfa-setup"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { User, Mail, Phone, MapPin, CreditCard, Shield, Edit, Calendar } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    const { user } = session

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header Banner */}
            <div className="h-48 bg-gradient-to-r from-green-600 to-green-400 relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6 relative z-10">
                    <h1 className="text-3xl font-bold text-white">Profil Saya</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Profile Card */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 flex flex-col items-center border-b border-gray-100">
                                <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                    <User className="w-16 h-16 text-orange-500" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 text-center">{user?.name}</h2>
                                <p className="text-sm text-gray-500 mb-4">{user?.email}</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                    {user?.role || "Pengguna"}
                                </span>
                            </div>
                            <div className="p-6 bg-gray-50/50">
                                <div className="text-sm text-gray-500 text-center">
                                    Bergabung sejak {new Date().getFullYear()}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                                    <Edit className="w-4 h-4" />
                                    <span>Edit Profil</span>
                                </button>
                                <Link href="/" className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                                    <span>Kembali ke Beranda</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details & Security */}
                    <div className="col-span-1 lg:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <User className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Informasi Pribadi</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</label>
                                    <div className="flex items-center space-x-3 text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium font-mono">{user?.nik || "-"}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Telepon</label>
                                    <div className="flex items-center space-x-3 text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium">{user?.phone || "-"}</span>
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat Lengkap</label>
                                    <div className="flex items-start space-x-3 text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <span className="font-medium">{user?.address || "-"}</span>
                                    </div>
                                </div>

                                {user?.department && (
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Kerja / Instansi</label>
                                        <div className="flex items-start space-x-3 text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <span className="font-medium capitalize">{user?.department}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Security Section (MFA) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Keamanan Akun</h3>
                                    <p className="text-sm text-gray-500">Kelola keamanan dan otentikasi dua faktor</p>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                                <MfaSetup />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
