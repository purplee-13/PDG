"use client"

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Destinasi Wisata di Kota Parepare</h2>
          <p className="text-gray-600 text-lg">Lihat berbagai macam penawaran menarik disini</p>
          <div className="mt-6 flex justify-end">
            <Link href="/destinations" className="text-orange-500 hover:text-orange-600 flex items-center space-x-1 font-medium group">
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden py-4 -my-4 px-1 -mx-1">
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
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsToShow}% - ${24 * (itemsToShow - 1) / itemsToShow}px)`,
                    height: '280px'
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-2xl overflow-hidden group h-full shadow-md"
                  >
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-xl mb-1 leading-tight">{destination.name}</h3>
                      <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 delay-100">Klik untuk detail</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 ${startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:shadow-xl hover:bg-gray-50"
              }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsToShow >= destinations.length}
            className={`absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 ${startIndex + itemsToShow >= destinations.length
                ? "opacity-30 cursor-not-allowed"
                : "hover:shadow-xl hover:bg-gray-50"
              }`}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
