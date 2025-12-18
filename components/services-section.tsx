"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ServicesSection() {
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 4
  const slideStep = 1

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
    setStartIndex((prev) => Math.max(prev - slideStep, 0))
  }

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + slideStep, services.length - itemsToShow)
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#35AC3E] mb-3">
            Layanan Kota Parepare
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan aplikasi dan pelayanan di Kota Parepare
          </p>
          <div className="mt-4 flex justify-end">
            <Link
              href="/services"
              className="text-[#35AC3E] hover:underline font-medium flex items-center gap-1 group"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Slide navigation */}
        <div className="relative">

          {/* Tombol navigasi desktop (tengah kiri & kanan) */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg border rounded-full p-3 transition hidden md:block hover:scale-110 active:scale-95 ${startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
          >
            <ArrowLeft className="w-5 h-5 text-[#35AC3E]" />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsToShow >= services.length}
            className={`absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg border rounded-full p-3 transition hidden md:block hover:scale-110 active:scale-95 ${startIndex + itemsToShow >= services.length
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-50"
              }`}
          >
            <ArrowRight className="w-5 h-5 text-[#35AC3E]" />
          </button>

          {/* Service Grid */}
          <div className="overflow-hidden py-4 -my-4 px-1 -mx-1"> {/* Add padding for shadows */}
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`
              }}
            >
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsToShow}% - ${24 * (itemsToShow - 1) / itemsToShow}px)` }}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 h-full group"
                  >
                    <div className="w-16 h-16 bg-[#E6F7EA] text-[#35AC3E] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#35AC3E] group-hover:text-white transition-colors duration-300">
                      <Image
                        src={service.icon}
                        alt={`Icon ${service.name}`}
                        width={40}
                        height={40}
                        className="group-hover:brightness-0 group-hover:invert transition duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#35AC3E] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600">{service.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tombol navigasi mobile (di bawah) */}
          <div className="flex justify-center mt-8 md:hidden gap-4">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`bg-white shadow-md border rounded-full p-3 transition ${startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
            >
              <ArrowLeft className="w-5 h-5 text-[#35AC3E]" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + itemsToShow >= services.length}
              className={`bg-white shadow-md border rounded-full p-3 transition ${startIndex + itemsToShow >= services.length
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
