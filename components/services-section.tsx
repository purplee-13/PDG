"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Service {
  id: string
  name: string
  description: string
  icon: string
  category: string
}

interface ServicesSectionProps {
  services: Service[]
  categories: string[]
  onServiceClick?: (service: Service) => void
  onCategoryClick?: (category: string) => void
}

export default function ServicesSection({
  services,
  categories,
  onServiceClick,
  onCategoryClick,
}: ServicesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-20 bg-gradient-to-b from-[#F4E8D8] to-[#FEFCF8]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-6">
            Layanan Kota Parepare
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Temukan aplikasi dan pelayanan di Kota Parepare yang memudahkan kehidupan sehari-hari Anda
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              placeholder="Cari Layanan..."
              className="pl-16 py-4 text-lg rounded-full border-2 border-[#35AC3E]/20 focus:border-[#35AC3E] bg-white/80 backdrop-blur-sm shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <Card
              key={service.id}
              className="pdg-card hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onServiceClick?.(service)}
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-[#35AC3E] transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Services */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#35AC3E] mb-4">
              Layanan Berdasarkan Kategori
            </h3>
            <p className="text-gray-600 text-lg">
              Pilih kategori yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="pdg-card p-6 text-center cursor-pointer group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => onCategoryClick?.(category)}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#35AC3E] to-[#2D8A33] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">
                    {category.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-[#35AC3E] transition-colors">
                  {category}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
