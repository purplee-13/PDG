"use client"

import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { facilities, FacilityPackage } from "@/lib/data/facilities"
import { Button } from "@/components/ui/button"
import {
    MapPin,
    ArrowLeft,
    Calendar,
    Info,
    Share2,
    Heart,
    CheckCircle2,
    Clock,
    User,
    CreditCard,
    ChevronRight,
    Wallet,
    Smartphone,
    Building,
    RotateCcw,
    Users,
    Upload,
    FileText
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type Step = "DATE_TIME" | "CART" | "USER_INFO" | "PAYMENT" | "SUCCESS"

export default function FacilityDetailPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const [bookingStep, setBookingStep] = useState<Step>("DATE_TIME")
    const [selectedDate, setSelectedDate] = useState<number | null>(25)
    const [selectedPackage, setSelectedPackage] = useState<FacilityPackage | null>(null)
    const [selectedPayment, setSelectedPayment] = useState<string>("")
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [ktpFileName, setKtpFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const facility = facilities.find((f) => f.id === id)

    if (!facility) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-2xl font-bold">Fasilitas tidak ditemukan</h1>
                    <Link href="/fasilitasUmum" className="mt-4 text-green-600 hover:underline">
                        Kembali ke Daftar
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-40">
                    <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md">
                        <div className="text-6xl mb-6">🔒</div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Akses Terbatas</h2>
                        <p className="text-slate-600 mb-8">Anda harus login terlebih dahulu untuk melihat detail fasilitas ini.</p>
                        <Link href="/login">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg rounded-xl">
                                Login Sekarang
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price).replace(/\,00$/, '')
    }

    const nextStep = () => {
        if (bookingStep === "DATE_TIME") {
            if (!selectedPackage && facility.packages) return;
            setBookingStep("CART")
        }
        else if (bookingStep === "CART") setBookingStep("USER_INFO")
        else if (bookingStep === "USER_INFO") setBookingStep("PAYMENT")
        else if (bookingStep === "PAYMENT") setBookingStep("SUCCESS")
    }

    const prevStep = () => {
        if (bookingStep === "CART") setBookingStep("DATE_TIME")
        else if (bookingStep === "USER_INFO") setBookingStep("CART")
        else if (bookingStep === "PAYMENT") setBookingStep("USER_INFO")
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setKtpFileName(file.name)
        }
    }

    const renderStepContent = () => {
        switch (bookingStep) {
            case "DATE_TIME":
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-gray-900 mb-2">Pilih Tanggal</p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                                        <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase">{day}</div>
                                    ))}
                                    {Array.from({ length: 31 }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedDate(i + 1)}
                                            className={`h-10 rounded-lg text-sm transition-all flex items-center justify-center ${selectedDate === i + 1 ? 'bg-green-600 text-white font-bold shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                {selectedDate && (
                                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                                        <p className="text-xs text-gray-500 mb-3">January {selectedDate}, 2026</p>
                                        {selectedPackage ? (
                                            <div className="inline-flex items-center bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-green-100 animate-in zoom-in duration-300">
                                                {selectedPackage.timeRange}
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center bg-gray-100 text-gray-400 px-8 py-2.5 rounded-xl font-medium border border-dashed border-gray-300">
                                                Pilih Paket Waktu Di Bawah
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {selectedDate && facility.packages && (
                            <div className="space-y-4 pt-2">
                                <p className="text-sm font-bold text-gray-900">Opsi Waktu Tersedia</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {facility.packages.map((pkg, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPackage(pkg)}
                                            className={`text-left p-4 rounded-2xl border transition-all flex flex-col h-full ${selectedPackage?.name === pkg.name ? 'border-green-600 bg-green-50 shadow-md ring-1 ring-green-600' : 'border-gray-100 bg-white hover:border-green-200'}`}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="font-bold text-gray-900">{pkg.name}</span>
                                                <Badge variant="outline" className="text-[10px] text-green-700 border-green-200 bg-green-50 whitespace-nowrap">
                                                    {formatPrice(pkg.price)}
                                                </Badge>
                                            </div>
                                            <div className="space-y-2 mt-auto">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Clock className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                                                    {pkg.timeRange}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 font-medium">
                                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                                                    Tersedia
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={nextStep}
                            disabled={!selectedDate || (facility.packages && !selectedPackage)}
                            className="w-full bg-green-600 hover:bg-green-700 py-6 rounded-xl mt-4 shadow-lg shadow-green-100"
                        >
                            Lanjutkan
                        </Button>
                    </div>
                )
            case "CART":
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Fasilitas & Paket</p>
                                    <p className="font-bold text-gray-900">{facility.name}</p>
                                    {selectedPackage && (
                                        <div className="mt-1 space-y-0.5">
                                            <p className="text-sm text-green-600 font-medium">{selectedPackage.name}</p>
                                            <p className="text-xs text-gray-400">{selectedPackage.timeRange} ({selectedPackage.duration})</p>
                                        </div>
                                    )}
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-none">1 {facility.unitLabel || 'Unit'}</Badge>
                            </div>
                            <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center">
                                <p className="text-sm font-medium text-gray-600">Total Harga</p>
                                <p className="text-xl font-extrabold text-orange-600">{formatPrice(selectedPackage ? selectedPackage.price : facility.price)}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={prevStep} className="flex-1 py-6 rounded-xl">Kembali</Button>
                            <Button onClick={nextStep} className="flex-[2] bg-green-600 hover:bg-green-700 py-6 rounded-xl">Konfirmasi Data</Button>
                        </div>
                    </div>
                )
            case "USER_INFO":
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Nama Lengkap</label>
                                <input type="text" defaultValue={user.name} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">NIK / No. Identitas</label>
                                <input type="text" placeholder="Masukkan NIK Anda" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Upload KTP</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors flex flex-col items-center justify-center space-y-2 ${ktpFileName ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-500 hover:bg-green-50'}`}
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*,.pdf"
                                    />
                                    {ktpFileName ? (
                                        <>
                                            <FileText className="w-8 h-8 text-green-600" />
                                            <span className="text-sm text-green-700 font-medium">{ktpFileName}</span>
                                            <span className="text-[10px] text-green-600">Klik untuk mengganti file</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400" />
                                            <span className="text-sm text-gray-500">Klik untuk upload foto KTP</span>
                                            <span className="text-[10px] text-gray-400">Format: JPG, PNG, atau PDF (Maks. 2MB)</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Tujuan Penggunaan</label>
                                <textarea placeholder="Contoh: Acara Pernikahan / Seminar" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 outline-none h-24" />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={prevStep} className="flex-1 py-6 rounded-xl">Kembali</Button>
                            <Button onClick={nextStep} className="flex-[2] bg-green-600 hover:bg-green-700 py-6 rounded-xl">Lanjut ke Pembayaran</Button>
                        </div>
                    </div>
                )
            case "PAYMENT":
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => setSelectedPayment("QRIS")}
                                className={`flex items-center p-4 rounded-xl border transition-all ${selectedPayment === "QRIS" ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
                            >
                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center mr-4">
                                    <Smartphone className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">QRIS / E-Wallet</p>
                                    <p className="text-xs text-gray-500">GoPay, OVO, Dana, LinkAja</p>
                                </div>
                            </button>
                            <button
                                onClick={() => setSelectedPayment("VA")}
                                className={`flex items-center p-4 rounded-xl border transition-all ${selectedPayment === "VA" ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
                            >
                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center mr-4">
                                    <Building className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">Virtual Account</p>
                                    <p className="text-xs text-gray-500">BCA, BNI, BRI, Mandiri</p>
                                </div>
                            </button>
                            <button
                                onClick={() => setSelectedPayment("DANA")}
                                className={`flex items-center p-4 rounded-xl border transition-all ${selectedPayment === "DANA" ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
                            >
                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center mr-4">
                                    <Wallet className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">DANA</p>
                                    <p className="text-xs text-gray-500">Bayar langsung dengan saldo DANA</p>
                                </div>
                            </button>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button variant="outline" onClick={prevStep} className="flex-1 py-6 rounded-xl">Kembali</Button>
                            <Button onClick={nextStep} disabled={!selectedPayment} className="flex-[2] bg-green-600 hover:bg-green-700 py-6 rounded-xl shadow-lg shadow-green-200">Selesaikan Pembayaran</Button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 italic">Pembayaran tunai tidak tersedia untuk fasilitas ini.</p>
                    </div>
                )
            case "SUCCESS":
                return (
                    <div className="text-center py-8 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-16 h-16 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pemesanan Berhasil!</h3>
                        <p className="text-gray-600 mb-8 px-4">Terima kasih. Permohonan persewaan Anda telah kami terima dan sedang diproses.</p>
                        <Button onClick={() => setIsBookingModalOpen(false)} className="w-full bg-slate-900 hover:bg-black py-6 rounded-xl">Tutup</Button>
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-grow pb-20">
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-8 left-0 right-0">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Link href="/fasilitasUmum">
                                <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-0 right-0">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                                        {facility.category}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                                    {facility.name}
                                </h1>
                                <div className="flex items-center text-white/90 space-x-6">
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-green-400" />
                                        <span>{facility.address || "Parepare, Indonesia"}</span>
                                    </div>
                                    <div className="hidden sm:flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-green-400" />
                                        <span>Tersedia untuk disewa</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold flex items-center mb-6">
                                    <Info className="w-6 h-6 mr-3 text-green-600" />
                                    Tentang Fasilitas
                                </h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>{facility.description}</p>
                                    <p className="mt-4">
                                        Fasilitas ini dikelola oleh Pemerintah Kota Parepare dan tersedia untuk berbagai kegiatan komersial maupun sosial masyarakat.
                                        Kondisi fasilitas senantiasa dipantau untuk memastikan standar kenyamanan pengunjung.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 p-6 bg-slate-50 rounded-2xl">
                                    <div className="text-center border-r border-gray-200">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Status</p>
                                        <p className="text-green-600 font-bold">Aktif</p>
                                    </div>
                                    <div className="text-center border-r border-gray-200">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Kapasitas</p>
                                        <p className="text-slate-900 font-bold">{facility.capacity || "Bervariasi"}</p>
                                    </div>
                                    <div className="text-center border-r border-gray-200">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Listrik</p>
                                        <p className="text-slate-900 font-bold">Tersedia</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Air</p>
                                        <p className="text-slate-900 font-bold">Lancar</p>
                                    </div>
                                </div>
                            </div>

                            {/* Related/Features */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6">Informasi Tambahan</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Protokol kebersihan harian",
                                        "Aksesibilitas untuk penyandang disabilitas",
                                        "Parkir luas dan aman",
                                        "Penerangan memadai di malam hari"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 sticky top-24">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase font-bold">Harga Sewa</p>
                                        <p className="text-3xl font-extrabold text-orange-600">
                                            {facility.price > 0 ? formatPrice(facility.price) : 'Gratis'}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">Mulai Per {facility.unitLabel || 'Paket'}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <Heart className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <Share2 className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 mb-1">Ketersediaan</p>
                                        <p className="text-xs text-gray-500">{facility.count} {facility.unitLabel || 'paket'} terdata di sistem.</p>
                                    </div>

                                    <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    setBookingStep("DATE_TIME")
                                                    setSelectedPackage(null)
                                                }}
                                                className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg rounded-xl shadow-lg shadow-green-100"
                                            >
                                                Pesan Sekarang
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-3xl w-[95vw] md:w-full max-h-[95vh] flex flex-col">
                                            <div className="flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[700px]">
                                                {/* Sidebar Steps */}
                                                <div className="w-full md:w-64 bg-slate-900 p-6 md:p-8 text-white flex flex-row md:flex-col items-center md:items-start shrink-0">
                                                    <div className="mb-0 md:mb-12 flex items-center md:block mr-4 md:mr-0">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-xl flex items-center justify-center mb-0 md:mb-4 text-white">
                                                            <span className="font-bold text-sm md:text-base">P</span>
                                                        </div>
                                                        <div className="ml-3 md:ml-0">
                                                            <h2 className="text-sm md:text-lg font-bold leading-tight">Pemesanan</h2>
                                                            <p className="hidden md:block text-[10px] text-green-500 font-bold mt-1 line-clamp-1">{facility.name}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-6 overflow-x-auto no-scrollbar py-2 md:py-0">
                                                        {[
                                                            { label: "Tanggal & Waktu", icon: <Clock className="w-4 h-4" />, id: "DATE_TIME" },
                                                            { label: "Keranjang", icon: <CreditCard className="w-4 h-4" />, id: "CART" },
                                                            { label: "Data Diri", icon: <User className="w-4 h-4" />, id: "USER_INFO" },
                                                            { label: "Pembayaran", icon: <Wallet className="w-4 h-4" />, id: "PAYMENT" }
                                                        ].map((s, idx) => {
                                                            const isActive = bookingStep === s.id
                                                            const isCompleted = ["DATE_TIME", "CART", "USER_INFO", "PAYMENT", "SUCCESS"].indexOf(bookingStep) > idx

                                                            return (
                                                                <div key={s.id} className="flex items-center group shrink-0">
                                                                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2 md:mr-3 border transition-all ${isActive ? 'bg-green-600 border-green-600 scale-110' :
                                                                        isCompleted ? 'bg-green-600/20 border-green-600/40 text-green-500' : 'border-slate-700 text-slate-500'
                                                                        }`}>
                                                                        {isCompleted ? <CheckCircle2 className="w-3 md:w-4 h-3 md:h-4" /> : <div className="scale-75 md:scale-100">{s.icon}</div>}
                                                                    </div>
                                                                    <span className={`text-[10px] md:text-sm font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
                                                                    {isActive && <div className="hidden md:block ml-auto w-1 h-4 bg-green-600 rounded-full" />}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                    <div className="hidden md:flex mt-auto">
                                                        <button
                                                            onClick={() => {
                                                                setBookingStep("DATE_TIME")
                                                                setSelectedPackage(null)
                                                                setKtpFileName(null)
                                                            }}
                                                            className="flex items-center text-xs text-slate-500 hover:text-white transition-colors"
                                                        >
                                                            <RotateCcw className="w-3 h-3 mr-2" />
                                                            Reset Pemesanan
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Content Area */}
                                                <div className="flex-1 bg-white p-8 md:p-10 overflow-y-auto">
                                                    <DialogHeader className="mb-6">
                                                        <DialogTitle className="text-2xl font-bold">
                                                            {bookingStep === "DATE_TIME" ? "Tanggal & Waktu" :
                                                                bookingStep === "USER_INFO" ? "Data Diri Pemesan" :
                                                                    bookingStep === "SUCCESS" ? "Pemesanan Selesai" : "Detail Pemesanan"}
                                                        </DialogTitle>
                                                        <p className="text-sm text-gray-500">
                                                            {bookingStep === "DATE_TIME" ? "Tentukan jadwal penggunaan fasilitas." :
                                                                bookingStep === "USER_INFO" ? "Lengkapi identitas Anda untuk verifikasi." :
                                                                    bookingStep === "SUCCESS" ? "Konfirmasi pemesanan Anda." : "Lengkapi langkah-langkah di bawah."}
                                                        </p>
                                                    </DialogHeader>

                                                    {renderStepContent()}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <p className="text-xs text-center text-gray-400">
                                        Pemesanan online aman dengan enkripsi SSL.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
