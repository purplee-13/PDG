"use client"

import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F4E8D8] px-4 sm:px-6 lg:px-12 py-12">
      {/* Background Blur Image */}
      <div className="absolute inset-0 opacity-20">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-12 items-center">

          {/* Kiri - Judul dan Subtitle */}
          <div className="space-y-4 text-center lg:text-left mt-10 sm:mt-0">
            <h1 className="text-2xl md:text-4xl font-bold text-orange-500">
              Parepare dalam Genggaman
            </h1>
            <p className="text-base text-gray-700 max-w-sm mx-auto lg:mx-0">
              Layanan digital kota Parepare, mudah diakses, cepat, dan terpercaya—semuanya hanya dalam satu genggaman.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-base">
              Jelajahi Layanan
            </button>
          </div>

          {/* Tengah - Gambar */}
          <div className="flex justify-center items-center h-full">
            <Image
              src="/images/fotowalikota.png"
              alt="Ilustrasi"
              width={500}
              height={600}
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </div>

          {/* Kanan - Deskripsi */}
          <div className="space-y-4 text-center lg:text-right">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500">
              Temukan berbagai layanan publik, informasi kota, dan pelaporan langsung dari masyarakat.
            </h2>
            <p className="text-base text-gray-700">
              Dirancang untuk memudahkan warga, membangun kota bersama.
            </p>
          </div>
        </div>
      </div>

      {/* Desain Bawah */}
      <div className="absolute bottom-0 left-0 right-0 z-50 -mb-[2rem] sm:-mb-[2rem] lg:-mb-[1rem]">
        <Image
          src="/images/desain3.png"
          alt="Desain Bawah"
          width={1920}
          height={150}
          className="w-screen h-auto object-cover"
        />
      </div>
    </section>
  )
}
