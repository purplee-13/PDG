import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { tradingServices } from "@/lib/data/trading-services"
import { ArrowLeft, BarChart3, Building2, ShoppingCart, TrendingUp } from "lucide-react"
import Link from "next/link"

const iconMap = {
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Building2,
}

export default function TradingServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="mb-8 px-4 md:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 text-center md:text-left">
            Dinas Perdagangan Kota Parepare
          </h1>
          <p className="text-gray-700 leading-relaxed text-justify">
            Dinas Perdagangan Kota Parepare adalah instansi pemerintah daerah yang menangani urusan di bidang{" "}
            <span className="font-semibold text-blue-600">Perdagangan</span>,{" "}
            <span className="font-semibold text-blue-600">Industri</span>, dan{" "}
            <span className="font-semibold text-blue-600">Metrologi</span>. Dinas ini berkomitmen untuk meningkatkan
            pelayanan publik, mendukung pertumbuhan usaha lokal, dan menjaga keadilan dalam transaksi melalui pengawasan
            alat ukur. Kini, layanan dan informasi dinas dapat diakses dengan mudah melalui portal Parepare Dalam
            Genggaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tradingServices.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]

            return (
              <Link
                key={service.id}
                href={service.route}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2 group-hover:text-green-700">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
