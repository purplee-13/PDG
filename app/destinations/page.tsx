import Link from "next/link"
import Image from "next/image"
import { destinations, destinationCategories } from "@/lib/data/destinations"
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Destinasi Wisata Parepare</h1>
          <p className="text-xl text-orange-100">Jelajahi keindahan dan keunikan tempat wisata di Kota Parepare</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Destination Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Kategori Wisata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationCategories.map((category) => {
              const categoryDestinations = destinations.filter((dest) => dest.category === category.id)

              return (
                <Link
                  key={category.id}
                  href={`/destinations/category/${category.id}`}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{categoryDestinations.length} destinasi</span>
                    <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All Destinations */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Semua Destinasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48">
                  <Image
                    src={destination.images[0] || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                        {destination.name}
                      </h3>
                      {destination.subtitle && (
                        <p className="text-sm text-blue-600 font-medium mb-2">{destination.subtitle}</p>
                      )}
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {destinationCategories.find((cat) => cat.id === destination.category)?.title}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{destination.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{destination.openingHours}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{destination.ticketPrice}</span>
                    </div>
                  </div>
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
