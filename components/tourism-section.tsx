"use client"

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function TourismSection() {
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 3
  const slideStep = 1

  const destinations = [
    {
      id: "pelabuhan-nusantara",
      name: "Pelabuhan Nusantara Parepare",
      image: "/images/destinasi/pelabuhan.jpg",
    },
    {
      id: "monument-habibie",
      name: "Monument B.J. Habibie dan Ainun",
      image: "/images/destinasi/monumen.jpeg",
    },
    {
      id: "ladoma-resort",
      name: "Ladoma Resort",
      image: "/images/destinasi/ladoma.jpg",
    },
    {
      id: "bulu-nepo",
      name: "Bulu Nepo",
      image: "/images/destinasi/bulu_nepo.jpg",
    },
    {
      id: "tonrangeng-river-side",
      name: "Tonrangeng River Side",
      image: "/images/destinasi/tonrangeng.jpg",
    },
  ]

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + slideStep, destinations.length - itemsToShow)
    )
  }

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - slideStep, 0))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Destinasi Wisata di Kota Parepare</h2>
          <p className="text-gray-600 text-lg">Lihat berbagai macam penawaran menarik disini</p>
          <div className="mt-6 flex justify-end">
            <Link href="/destinations" className="text-orange-500 hover:text-orange-600 flex items-center space-x-1">
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`
              }}
            >
              {destinations.map((destination, index) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.id}`}
                  className="relative rounded-lg overflow-hidden group flex-shrink-0"
                  style={{ 
                    width: `calc(${100 / itemsToShow}% - ${24 * (itemsToShow - 1) / itemsToShow}px)`,
                    height: '256px'
                  }}
                >
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg transition-shadow ${
              startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:shadow-xl"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsToShow >= destinations.length}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg transition-shadow ${
              startIndex + itemsToShow >= destinations.length
                ? "opacity-30 cursor-not-allowed"
                : "hover:shadow-xl"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
