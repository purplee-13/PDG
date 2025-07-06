"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ServicesSection() {
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 4

  const services = [
    {
      id: "1",
      name: "Pendidikan",
      description: "Layanan Pendidikan",
      icon: "/images/icon/IconSekolah.svg",
      href: "/services/category/pendidikan",
    },
    {
      id: "2",
      name: "Keuangan",
      description: "Layanan Keuangan",
      icon: "/images/icon/IconKeuangan.svg",
      href: "/services/category/keuangan",
    },
    {
      id: "3",
      name: "Kesehatan",
      description: "Layanan Kesehatan",
      icon: "/images/icon/IconKesehatan.svg",
      href: "/services/category/kesehatan",
    },
    {
      id: "5",
      name: "Perdagangan",
      description: "Layanan Perdagangan",
      icon: "/images/icon/IconPerdagangan.svg",
      href: "/trading",
    },
    {
      id: "14",
      name: "Pengawasan",
      description: "Layanan Pengawasan",
      icon: "/images/icon/Pengawasan.svg",
      href: "/services/category/Pengawasan",
    },
    {
      id: "11",
      name: "Kependudukan",
      description: "Layanan Kependudukan",
      icon: "/images/icon/IconKependudukan.svg",
      href: "/kependudukan",
    },
    {
      id: "15",
      name: "Tenaga Kerja",
      description: "Layanan Tenaga Kerja",
      icon: "/images/icon/IconTenagaKerja.svg",
      href: "/tenagaKerja",
    },
    {
      id: "4",
      name: "Telekomunikasi",
      description: "Layanan Telekomunikasi",
      icon: "/images/icon/IconTelekomunikasi.svg",
      href: "/services/category/telecommunication",
    },
    {
      id: "6",
      name: "Industri",
      description: "Layanan Industri",
      icon: "/images/icon/IconIndustri.svg",
      href: "/services/category/industry",
    },
    {
      id: "7",
      name: "Pariwisata",
      description: "Layanan Pariwisata",
      icon: "/images/icon/IconPariwisata.svg",
      href: "/services/category/tourism",
    },
    {
      id: "8",
      name: "Geografis",
      description: "Informasi Geografis",
      icon: "/images/icon/IconGeografis.svg",
      href: "/services/category/geography",
    },
    {
      id: "9",
      name: "Pemerintahan",
      description: "Layanan Pemerintahan",
      icon: "/images/icon/IconPemerintahan.svg",
      href: "/services/category/government",
    },
    {
      id: "10",
      name: "Sosial",
      description: "Layanan Sosial",
      icon: "/images/icon/IconSosial.svg",
      href: "/services/category/social",
    },

    {
      id: "12",
      name: "Transportasi",
      description: "Layanan Transportasi",
      icon: "/images/icon/IconTransportasi.svg",
      href: "/services/category/transportation",
    },
    {
      id: "13",
      name: "Pertanian",
      description: "Layanan Pertanian",
      icon: "/images/icon/IconPertanian.svg",
      href: "/services/category/agriculture",
    },
  ]

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0))
  }

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, services.length - itemsPerPage)
    )
  }

  const visibleServices = services.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#35AC3E] mb-3">
            Layanan Kota Parepare
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan aplikasi dan pelayanan di Kota Parepare
          </p>
          <div className="mt-4 flex justify-end">
            <Link
              href="/services"
              className="text-[#35AC3E] hover:underline font-medium flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Slide navigation */}
        <div className="relative">

          {/* Tombol navigasi desktop (tengah kiri & kanan) */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md border rounded-full p-2 transition hidden md:block ${
              startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-5 h-5 text-[#35AC3E]" />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= services.length}
            className={`absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md border rounded-full p-2 transition hidden md:block ${
              startIndex + itemsPerPage >= services.length
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ArrowRight className="w-5 h-5 text-[#35AC3E]" />
          </button>

          {/* Service Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {visibleServices.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition duration-300 group"
              >
                <div className="w-14 h-14 bg-[#E6F7EA] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={service.icon}
                    alt={`Icon ${service.name}`}
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#35AC3E] mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>

          {/* Tombol navigasi mobile (di bawah) */}
          <div className="flex justify-center mt-6 md:hidden gap-4">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`bg-white shadow-md border rounded-full p-2 transition ${
                startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-5 h-5 text-[#35AC3E]" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= services.length}
              className={`bg-white shadow-md border rounded-full p-2 transition ${
                startIndex + itemsPerPage >= services.length
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ArrowRight className="w-5 h-5 text-[#35AC3E]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
