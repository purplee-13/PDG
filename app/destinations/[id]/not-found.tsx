import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destinasi Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Maaf, destinasi yang Anda cari tidak dapat ditemukan.</p>
          <Link
            href="/destinations"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Destinasi
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
} 