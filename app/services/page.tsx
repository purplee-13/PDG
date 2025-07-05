import Link from "next/link"
import { services, serviceCategories } from "@/lib/data/services"
import { GraduationCap, Heart, CreditCard, ShoppingCart, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const iconMap = {
  GraduationCap,
  Heart,
  CreditCard,
  ShoppingCart,
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Kota Parepare</h1>
          <p className="text-xl text-green-100">Temukan berbagai layanan publik yang tersedia untuk masyarakat</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Service Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Kategori Layanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              const categoryServices = services.filter((service) => service.category === category.id)

              return (
                <Link
                  key={category.id}
                  href={`/services/category/${category.id}`}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{categoryServices.length} layanan</span>
                    <ArrowRight className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All Services */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Semua Layanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 flex-1">
                    {service.title}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
                    {serviceCategories.find((cat) => cat.id === service.category)?.title}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
