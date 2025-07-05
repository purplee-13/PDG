"use client"

import { Search, X, ArrowRight, GraduationCap, CreditCard, Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ServicesSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const services = [
    {
      icon: GraduationCap,
      title: "Pendidikan",
      description: "Layanan Pendidikan",
      href: "/services/category/pendidikan",
    },
    {
      icon: CreditCard,
      title: "Keuangan",
      description: "Layanan Keuangan",
      href: "/services/category/keuangan",
    },
    {
      icon: Heart,
      title: "Kesehatan",
      description: "Layanan Kesehatan",
      href: "/services/category/kesehatan",
    },
    {
      icon: ShoppingCart,
      title: "Perdagangan",
      description: "Layanan Perdagangan",
      href: "/trading",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Layanan Kota Parepare</h2>
          <p className="text-gray-600 text-lg">Temukan aplikasi dan pelayanan di Kota Parepare</p>
          <div className="mt-6 flex justify-end">
            <Link href="/services" className="text-green-500 hover:text-green-600 flex items-center space-x-1">
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari Layanan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Link
                key={index}
                href={service.href}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
