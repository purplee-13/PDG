"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [topicsDropdownOpen, setTopicsDropdownOpen] = useState(false)

  const topicCategories = [
    { title: "Layanan Publik", href: "/services" },
    { title: "Destinasi Wisata", href: "/destinations" },
    { title: "Perdagangan", href: "/trading" },
    { title: "Data Kota", href: "/data" },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="bg-green-500 text-white px-8 py-2 rounded-full flex items-center space-x-6">
                <div className="relative">
                  <button
                    onClick={() => setTopicsDropdownOpen(!topicsDropdownOpen)}
                    className="flex items-center space-x-1 hover:text-green-100 transition-colors"
                  >
                    <span>Topik</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Topics Dropdown */}
                  {topicsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {topicCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setTopicsDropdownOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/news" className="hover:text-green-100 transition-colors">
                  Berita
                </Link>
                <Link href="/faq" className="hover:text-green-100 transition-colors">
                  FAQ
                </Link>
                <Link href="/support" className="hover:text-green-100 transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-gray-900">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 text-gray-700 font-medium">Topik</div>
            {topicCategories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="block px-6 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.title}
              </Link>
            ))}
            <Link
              href="/news"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Berita
            </Link>
            <Link
              href="/faq"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/support"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/login"
              className="block w-full text-left bg-orange-500 text-white px-3 py-2 rounded-lg mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
