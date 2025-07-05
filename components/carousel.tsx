"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface CarouselItem {
  id: string
  title: string
  image: string
  description: string
  date?: string
}

interface CarouselProps {
  title: string
  subtitle?: string
  items: CarouselItem[]
  itemsPerView?: number
  showButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
  onItemClick?: (item: CarouselItem) => void
  variant?: "tourism" | "news"
}

export default function Carousel({
  title,
  subtitle,
  items,
  itemsPerView = 3,
  showButton = false,
  buttonText = "Lihat Semua",
  onButtonClick,
  onItemClick,
  variant = "tourism",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= items.length - itemsPerView ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? Math.max(0, items.length - itemsPerView) : prev - 1))
  }

  const sectionBg = variant === "tourism" 
    ? "bg-gradient-to-b from-[#FEFCF8] to-[#F4E8D8]" 
    : "bg-gradient-to-b from-[#F4E8D8] to-white"

  return (
    <section className={`py-20 ${sectionBg}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          
          {showButton && (
            <Button
              variant="outline"
              className="text-[#35AC3E] border-[#35AC3E] hover:bg-[#35AC3E] hover:text-white bg-transparent rounded-full px-8 py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={onButtonClick}
            >
              {buttonText} →
            </Button>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#35AC3E] hover:bg-[#35AC3E] hover:text-white transition-all duration-300 group"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#35AC3E] hover:bg-[#35AC3E] hover:text-white transition-all duration-300 group"
            disabled={currentIndex >= items.length - itemsPerView}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(items.length * 100) / itemsPerView}%`,
              }}
            >
              {items.map((item, index) => (
                <div key={item.id} className={`w-1/${itemsPerView} flex-shrink-0 px-4`}>
                  <Card
                    className="pdg-card overflow-hidden h-full cursor-pointer group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                    onClick={() => onItemClick?.(item)}
                  >
                    <div className={`relative ${variant === "tourism" ? "h-72" : "h-56"} overflow-hidden`}>
                      <Image 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className={`font-bold ${variant === "tourism" ? "text-xl" : "text-lg"} mb-2 line-clamp-2`}>
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-90 line-clamp-2 mb-2">
                          {item.description}
                        </p>
                        {item.date && (
                          <p className="text-xs opacity-75">
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-[#35AC3E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold">→</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === Math.floor(currentIndex / itemsPerView)
                    ? "bg-[#35AC3E] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
