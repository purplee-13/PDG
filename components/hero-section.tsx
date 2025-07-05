import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 min-h-[600px] flex items-center">
      <div className="absolute inset-0 opacity-20">
        <Image src="/images/hero-bg.png" alt="Parepare City Background" fill className="object-cover" priority />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 leading-tight">
              Parepare dalam Genggaman
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              Layanan digital kota Parepare, mudah diakses, cepat, dan terpercaya—semuanya hanya dalam satu genggaman.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Jelajahi Layanan
            </button>
          </div>

          {/* Right Content */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-3">
                Temukan berbagai layanan publik, informasi kota, dan pelaporan langsung dari masyarakat.
              </h3>
              <p className="text-gray-700">Dirancang untuk memudahkan warga, membangun kota bersama.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
