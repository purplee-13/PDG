import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getDestinationsByCategory, destinationCategories } from "@/lib/data/destinations"
import { ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface DestinationCategoryPageProps {
  params: {
    category: string
  }
}

export default function DestinationCategoryPage({ params }: DestinationCategoryPageProps) {
  const categoryInfo = destinationCategories.find((cat) => cat.id === params.category)
  const destinations = getDestinationsByCategory(params.category)

  if (!categoryInfo || destinations.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/destinations" className="inline-flex items-center text-orange-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Destinasi
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryInfo.title}</h1>
          <p className="text-xl text-orange-100">{categoryInfo.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 mb-3">
                  {destination.name}
                </h3>
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

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return destinationCategories.map((category) => ({
    category: category.id,
  }))
}
