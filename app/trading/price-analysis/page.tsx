import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PriceAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/trading" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Layanan Perdagangan
        </Link>

        <div className="text-center py-16">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Analisis Harga Bahan Pokok</h1>
          <p className="text-gray-600 text-lg mb-8">Halaman ini sedang dalam pengembangan</p>
          <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md mx-auto">
            <p className="text-gray-700">
              Fitur analisis harga bahan pokok akan segera tersedia untuk memberikan insight mendalam tentang tren harga
              komoditas di Kota Parepare.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
