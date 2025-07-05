"use client"

import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  variant?: "default" | "service"
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const menuItems = [
    { label: "Layanan", hasDropdown: true },
    { label: "Berita", hasDropdown: false },
    { label: "FAQ", hasDropdown: false },
    { label: "Support", hasDropdown: false },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-[#35AC3E] rounded-full px-6 py-3 shadow-lg backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-[#35AC3E] to-[#2D8A33] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              Parepare Digital
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 cursor-pointer hover:text-green-100 transition-colors group"
              >
                <span className="font-medium text-white group-hover:text-green-100 transition-colors">
                  {item.label}
                </span>
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-white group-hover:text-green-100 transition-colors" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-green-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between cursor-pointer hover:text-green-100 transition-colors py-2"
                >
                  <span className="font-medium text-white">{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 text-white" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
