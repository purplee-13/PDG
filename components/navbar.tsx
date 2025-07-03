"use client"

import { ChevronDown } from "lucide-react"

interface NavbarProps {
  variant?: "default" | "service"
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const menuItems =[
          { label: "Layanan", hasDropdown: true },
          { label: "Berita", hasDropdown: false },
          { label: "FAQ", hasDropdown: false },
          { label: "Support", hasDropdown: false },
        ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-green-500 rounded-full px-8 py-3 shadow-lg">
        <div className="flex items-center space-x-8 text-white">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 cursor-pointer hover:text-green-100 transition-colors"
            >
              <span className="font-medium">{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
