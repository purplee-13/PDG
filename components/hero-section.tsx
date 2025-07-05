"use client"

import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaText: string
  onCtaClick?: () => void
  backgroundImage?: string
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  backgroundImage = "/images/hero-bg.png",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-[#F4E8D8] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FF6B35] leading-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            <Button
              className="bg-[#35AC3E] hover:bg-[#2D8A33] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-6">
            {/* Central Image/Logo Placeholder */}
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#35AC3E] to-[#2D8A33] flex items-center justify-center shadow-2xl">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-white text-6xl md:text-7xl font-bold">
                  PDG
                </div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FF6B35]">
                {description}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dirancang untuk memudahkan warga, membangun kota bersama dengan teknologi terdepan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#35AC3E]/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#35AC3E]/5 rounded-full blur-lg" />
    </section>
  )
}
