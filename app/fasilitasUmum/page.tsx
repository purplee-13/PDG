"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { facilities, Facility } from "@/lib/data/facilities"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, Search, Eye, MapPin, Building2, Trophy, Trees, MonitorPlay } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function FasilitasUmumPage() {
    const { user } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState<string>("Semua")
    const [searchQuery, setSearchQuery] = useState("")

    const categories = ["Semua", "Gedung", "Lapangan", "Stadion", "Taman", "Panggung", "Mes"]

    const filteredFacilities = facilities.filter((f) => {
        const matchesCategory = selectedCategory === "Semua" || f.category === selectedCategory
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const formatPrice = (price: number) => {
        if (price === 0) return "Gratis"
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price).replace(/\,00$/, '')
    }

    // Group icons by category
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Gedung": return <Building2 className="w-4 h-4" />
            case "Lapangan": return <Trophy className="w-4 h-4" />
            case "Stadion": return <Trophy className="w-4 h-4" />
            case "Taman": return <Trees className="w-4 h-4" />
            case "Panggung": return <MonitorPlay className="w-4 h-4" />
            default: return <Building2 className="w-4 h-4" />
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-green-600 py-16 text-white text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Fasilitas Umum Kota Parepare
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-green-50 text-xl max-w-2xl mx-auto"
                        >
                            Temukan informasi lengkap mengenai aset dan fasilitas publik di Kota Parepare untuk kenyamanan Anda.
                        </motion.p>
                    </div>
                </section>

                {!user ? (
                    /* Locked State for Guest Users */
                    <section className="py-24 flex flex-col items-center justify-center">
                        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
                            <Link href="/login" className="block hover:scale-110 transition-transform">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer">
                                    <Lock className="w-10 h-10 text-orange-600" />
                                </div>
                            </Link>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Terbatas</h2>
                            <p className="text-gray-600 mb-8">
                                Halaman ini hanya dapat diakses oleh pengguna yang sudah memiliki akun. Silakan login untuk melihat daftar fasilitas umum.
                            </p>
                            <Link href="/login" passHref>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]">
                                    Login Sekarang
                                </Button>
                            </Link>
                        </div>
                    </section>
                ) : (
                    /* Content for Logged-in Users */
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Filters and Search */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                            ? "bg-green-600 text-white shadow-md shadow-green-200"
                                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari fasilitas..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Facilities Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredFacilities.map((facility) => (
                                    <motion.div
                                        key={facility.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
                                            <div className="relative h-56 w-full overflow-hidden">
                                                <Image
                                                    src={facility.image}
                                                    alt={facility.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <Badge className="bg-white/90 text-green-700 hover:bg-white backdrop-blur-sm border-none shadow-sm flex items-center gap-1.5 px-3 py-1.5">
                                                        {getCategoryIcon(facility.category)}
                                                        {facility.category}
                                                    </Badge>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                    <Link href={`/fasilitasUmum/${facility.id}`} className="w-full">
                                                        <Button size="sm" className="bg-white text-green-700 hover:bg-green-50 border-none w-full">
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            Cek Ketersediaan
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <CardContent className="p-6 flex-grow flex flex-col">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1">{facility.name}</h3>
                                                    <Badge variant="outline" className="ml-2 border-green-200 text-green-700 bg-green-50">
                                                        {facility.count} {facility.unitLabel || 'Unit'}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm mb-2">
                                                    <MapPin className="w-4 h-4 mr-1 text-green-500" />
                                                    <span>Kota Parepare</span>
                                                </div>
                                                <p className="text-orange-600 font-bold text-lg mb-4">
                                                    {formatPrice(facility.price)}
                                                    <span className="text-xs text-gray-400 font-normal ml-1">/{facility.unitLabel || 'unit'}</span>
                                                </p>
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                                                    {facility.description}
                                                </p>
                                                <div className="mt-auto">
                                                    <Link href={`/fasilitasUmum/${facility.id}`} className="block">
                                                        <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 group">
                                                            Lihat Detail
                                                            <motion.span
                                                                animate={{ x: [0, 4, 0] }}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                                className="ml-2 font-bold"
                                                            >
                                                                &rsaquo;
                                                            </motion.span>
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredFacilities.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Tidak ada fasilitas ditemukan</h3>
                                <p className="text-gray-500">Coba ubah kategori atau kata kunci pencarian Anda.</p>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}
