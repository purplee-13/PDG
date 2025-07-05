"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { getDestinationById } from "@/lib/data/destinations"
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Phone, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface DestinationDetailPageProps {
  params: {
    id: string
  }
}

export default function DestinationDetailPageClient({ params }: DestinationDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const destination = getDestinationById(params.id)

  if (!destination) {
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/destinations" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Kembali</span>
        </Link>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">{destination.name}</h1>
          {destination.subtitle && <p className="text-lg text-blue-700 font-medium">{destination.subtitle}</p>}
        </div>

        {/* Hero Image with Navigation */}
        <div className="relative mb-8">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={destination.images[currentImageIndex] || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />

            {/* Image Navigation Arrows */}
            {destination.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Description Content */}
        <div className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6 text-base">{destination.description}</p>

            {destination.fullDescription &&
              destination.fullDescription.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* Location and Contact Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Map */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-6">Lokasi</h2>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for map - you can integrate with Google Maps or other map service */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300">
                <div className="absolute inset-4 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-blue-800 font-medium">Interactive Map</p>
                    <p className="text-blue-700 text-sm">Click to view full map</p>
                  </div>
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute top-4 left-4 flex flex-col space-y-1">
                <button className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  +
                </button>
                <button className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  −
                </button>
              </div>

              {/* Map attribution */}
              <div className="absolute bottom-2 left-2 text-xs text-blue-700">
                <span className="bg-white/80 px-2 py-1 rounded">Leaflet | Map data © OpenStreetMap contributors</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-6">Info Kontak</h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">{destination.location}</p>
                </div>
              </div>

              {/* Coordinates */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-700">
                    {destination.coordinates.lat},{destination.coordinates.lng}
                  </p>
                </div>
              </div>

              {/* Phone */}
              {destination.contactInfo.phone && (
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">{destination.contactInfo.phone}</p>
                  </div>
                </div>
              )}

              {/* Website */}
              {destination.contactInfo.website && (
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <a
                      href={destination.contactInfo.website}
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {destination.contactInfo.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
