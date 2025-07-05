import Link from "next/link"
import { notFound } from "next/navigation"
import { getServicesByCategory, serviceCategories } from "@/lib/data/services"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface ServiceCategoryPageProps {
  params: {
    category: string
  }
}

export default function ServiceCategoryPage({ params }: ServiceCategoryPageProps) {
  const categoryInfo = serviceCategories.find((cat) => cat.id === params.category)
  const services = getServicesByCategory(params.category)

  if (!categoryInfo || services.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center text-green-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Layanan
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryInfo.title}</h1>
          <p className="text-xl text-green-100">{categoryInfo.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <span>Lihat Detail</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.id,
  }))
}
