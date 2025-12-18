"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#F4E8D8] px-4 sm:px-6 lg:px-12 py-12 overflow-hidden">
      {/* Background Blur Image */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/images/hero-bg.png"
          alt="Background Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-8 lg:gap-12 items-center">

          {/* Kiri - Judul dan Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-center lg:text-left mt-10 sm:mt-0 order-2 lg:order-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-orange-500 leading-tight">
              Parepare dalam <br className="hidden lg:block" /> Genggaman
            </h1>
            <p className="text-lg text-gray-700 max-w-sm mx-auto lg:mx-0 leading-relaxed">
              Layanan digital kota Parepare, mudah diakses, cepat, dan terpercaya—semuanya hanya dalam satu genggaman.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Jelajahi Layanan <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Tengah - Gambar */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center h-full order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-[500px]">
              <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-3xl transform scale-90 translate-y-10"></div>
              <Image
                src="/images/fotowalikota.png"
                alt="Ilustrasi Parepare"
                width={500}
                height={600}
                className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Kanan - Deskripsi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center lg:text-right order-3"
          >
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-2">
                Smart City, Smart Living
              </h2>
              <p className="text-base text-gray-700">
                Temukan berbagai layanan publik, informasi kota, dan pelaporan langsung dari masyarakat.
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500 bg-white/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
              Dirancang untuk memudahkan warga, membangun kota bersama.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Desain Bawah */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none translate-y-[1px]">
        <Image
          src="/images/desain3.png"
          alt="Desain Bawah"
          width={1920}
          height={150}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  )
}
