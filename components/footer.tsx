"use client"

import { MapPin, Phone, Printer, Mail, Globe } from "lucide-react"

interface ContactInfo {
  address: string
  phone: string
  fax: string
  email?: string
  website?: string
}

interface AboutSection {
  title: string
  content: string
}

interface FooterProps {
  contactInfo?: ContactInfo
  aboutSections?: AboutSection[]
  socialLinks?: Record<string, string>
  copyright?: string
}

export default function Footer({
  contactInfo = {
    address: "Jl. Andi Tadda Petta Ponggawa No.2, Lumpue, Kec. Bacukiki Bar., Kota Parepare, Sulawesi Selatan 91131",
    phone: "(0421) 21012",
    fax: "(0421) 21012",
    email: "info@parepare.go.id",
    website: "www.parepare.go.id",
  },
  aboutSections = [
    {
      title: "Tentang Parepare dalam Genggaman",
      content:
        '"Parepare dalam Genggaman" adalah platform digital terpadu milik Pemerintah Kota Parepare yang bertujuan untuk memudahkan masyarakat dalam mengakses berbagai layanan publik, mendapatkan informasi, dan memantau perkembangan kota hanya melalui satu portal online.',
    },
    {
      title: "Tentang Satu Data Parepare",
      content:
        "Satu Data Parepare adalah portal resmi Pemerintah Kota Parepare yang menyediakan data terbuka dan terstandarisasi dari berbagai instansi daerah. Portal ini menjadi kebijakan berbagi data, keterbukaan informasi publik, serta kolaborasi antara pemerintah dan masyarakat.",
    },
  ],
  socialLinks = {},
  copyright = "© 2025 Pemerintah Kota Parepare - Parepare dalam Genggaman. Seluruh hak cipta dilindungi undang-undang.",
}: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Logo and Contact */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#35AC3E] to-[#2D8A33] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">PDG</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Parepare Digital
                </h3>
                <p className="text-sm text-gray-300">
                  Kota dalam Genggaman
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#35AC3E] mb-4">
                Kontak Kami
              </h4>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#35AC3E] flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-300 leading-relaxed">
                  {contactInfo.address}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#35AC3E] flex-shrink-0" />
                <span className="text-sm text-gray-300">{contactInfo.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Printer className="w-5 h-5 text-[#35AC3E] flex-shrink-0" />
                <span className="text-sm text-gray-300">{contactInfo.fax}</span>
              </div>

              {contactInfo.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#35AC3E] flex-shrink-0" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-gray-300 hover:text-[#35AC3E] transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}

              {contactInfo.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-[#35AC3E] flex-shrink-0" />
                  <a 
                    href={`https://${contactInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-[#35AC3E] transition-colors"
                  >
                    {contactInfo.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* About Sections */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {aboutSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-semibold text-[#FF6B35]">
                  {section.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            {copyright}
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#35AC3E] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-400 hover:text-[#35AC3E] transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-gray-400 hover:text-[#35AC3E] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
