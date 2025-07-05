"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import Carousel from "@/components/carousel"
import Footer from "@/components/footer"

// Types for API data
interface Service {
  id: string
  name: string
  description: string
  icon: string
  category: string
}

interface TourismDestination {
  id: string
  name: string
  image: string
  description: string
}

interface NewsItem {
  id: string
  title: string
  image: string
  date: string
  description: string
}

export default function ParepareLandingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [destinations, setDestinations] = useState<TourismDestination[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Mock API calls - replace with actual API endpoints
  useEffect(() => {
    const loadData = async () => {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock services data
      setServices([
        { id: "1", name: "Pendidikan", description: "Layanan Pendidikan Digital", icon: "🎓", category: "education" },
        { id: "2", name: "Keuangan", description: "Layanan Keuangan Terpadu", icon: "💰", category: "finance" },
        { id: "3", name: "Kesehatan", description: "Layanan Kesehatan Online", icon: "🏥", category: "health" },
        { id: "4", name: "Perdagangan", description: "Sobat Harga & E-Commerce", icon: "🛒", category: "trade" },
      ])

      // Mock destinations data
      setDestinations([
        {
          id: "1",
          name: "Pelabuhan Nusantara",
          image: "/images/tourism.png",
          description: "Pelabuhan utama Kota Parepare dengan pemandangan laut yang menawan",
        },
        {
          id: "2",
          name: "Monument B.J. Habibie dan Ainun",
          image: "/images/tourism.png",
          description: "Monument bersejarah yang mengenang tokoh besar Indonesia",
        },
        {
          id: "3",
          name: "Ladoma Resort",
          image: "/images/tourism.png",
          description: "Resort wisata alam dengan fasilitas lengkap dan pemandangan indah",
        },
        {
          id: "4",
          name: "Bulu Nepo",
          image: "/images/tourism.png",
          description: "Wisata alam pegunungan dengan udara sejuk dan pemandangan spektakuler",
        },
        {
          id: "5",
          name: "Tonrangeng River Side",
          image: "/images/tourism.png",
          description: "Wisata sungai yang menawarkan ketenangan dan keindahan alam",
        },
        {
          id: "6",
          name: "Pantai Lumpue",
          image: "/images/tourism.png",
          description: "Pantai indah dengan pasir putih dan air laut yang jernih",
        },
      ])

      // Mock news data
      setNews([
        {
          id: "1",
          title: "ITH Jalankan Program MBKM 2025",
          image: "/images/news.png",
          date: "2025-01-02",
          description: "Institut Teknologi Habibie meluncurkan program Merdeka Belajar Kampus Merdeka untuk tahun 2025",
        },
        {
          id: "2",
          title: "Program Pembangunan Infrastruktur Digital",
          image: "/images/news.png",
          date: "2025-01-01",
          description: "Pemerintah Kota Parepare meluncurkan program pembangunan infrastruktur digital terbaru",
        },
        {
          id: "3",
          title: "Pelayanan Digital Terbaru untuk Masyarakat",
          image: "/images/news.png",
          date: "2024-12-30",
          description: "Inovasi pelayanan digital terbaru untuk memudahkan masyarakat dalam mengakses layanan publik",
        },
        {
          id: "4",
          title: "Festival Budaya Parepare 2025",
          image: "/images/news.png",
          date: "2024-12-28",
          description: "Perayaan budaya lokal yang meriah dengan berbagai atraksi dan pertunjukan tradisional",
        },
        {
          id: "5",
          title: "Peningkatan Fasilitas Kesehatan Modern",
          image: "/images/news.png",
          date: "2024-12-25",
          description: "Modernisasi rumah sakit daerah dengan teknologi medis terkini untuk pelayanan terbaik",
        },
      ])
      
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleServiceClick = (service: Service) => {
    if (service.name === "Perdagangan") {
      router.push("/layanan/sobat-harga")
    }
    // Add other service routes here
  }

  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category)
    // Handle category navigation
  }

  const handleDestinationClick = (item: any) => {
    console.log("Destination clicked:", item)
    // Handle destination detail navigation
  }

  const handleNewsClick = (item: any) => {
    console.log("News clicked:", item)
    // Handle news detail navigation
  }

  const handleViewAllNews = () => {
    router.push("/berita")
  }

  // Transform data for carousel components
  const destinationItems = destinations.map((dest) => ({
    id: dest.id,
    title: dest.name,
    image: dest.image,
    description: dest.description,
  }))

  const newsItems = news.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    description: item.description,
    date: item.date,
  }))

  const categories = ["Wirausaha", "Wisatawan", "Pelajar", "Masyarakat"]

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4E8D8] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#35AC3E] to-[#2D8A33] rounded-full flex items-center justify-center shadow-lg animate-float mx-auto">
            <span className="text-white font-bold text-xl">PDG</span>
          </div>
          <div className="text-xl font-semibold text-[#35AC3E]">
            Memuat Parepare Digital...
          </div>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#35AC3E] to-[#FF6B35] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4E8D8]">
      <Navbar />

      <main className="animate-fade-in">
        <HeroSection
          title="Parepare dalam Genggaman"
          subtitle="Layanan digital kota Parepare, mudah diakses, cepat, dan terpercaya—semuanya hanya dalam satu genggaman."
          description="Temukan berbagai layanan publik, informasi kota, dan pelaporan langsung dari masyarakat."
          ctaText="Jelajahi Layanan"
          onCtaClick={() => {
            // Scroll to services section with smooth animation
            document.getElementById("services")?.scrollIntoView({ 
              behavior: "smooth",
              block: "start"
            })
          }}
        />

        <div id="services">
          <ServicesSection
            services={services}
            categories={categories}
            onServiceClick={handleServiceClick}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        <Carousel
          title="Destinasi Wisata di Kota Parepare"
          subtitle="Jelajahi keindahan dan pesona wisata Kota Parepare yang menawan"
          items={destinationItems}
          variant="tourism"
          onItemClick={handleDestinationClick}
        />

        <Carousel
          title="Berita Utama"
          subtitle="Informasi terkini seputar perkembangan Kota Parepare"
          items={newsItems}
          variant="news"
          showButton={true}
          buttonText="Lihat Semua"
          onButtonClick={handleViewAllNews}
          onItemClick={handleNewsClick}
        />
      </main>

      <Footer />
    </div>
  )
}
