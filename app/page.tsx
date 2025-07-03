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
  const router = useRouter()

  // Mock API calls - replace with actual API endpoints
  useEffect(() => {
    // Mock services data
    setServices([
      { id: "1", name: "Pendidikan", description: "Layanan Pendidikan", icon: "🎓", category: "education" },
      { id: "2", name: "Keuangan", description: "Layanan Keuangan", icon: "💰", category: "finance" },
      { id: "3", name: "Kesehatan", description: "Layanan Kesehatan", icon: "🏥", category: "health" },
      { id: "4", name: "Perdagangan", description: "Layanan Perdagangan", icon: "🛒", category: "trade" },
    ])

    // Mock destinations data
    setDestinations([
      {
        id: "1",
        name: "Pelabuhan Nusantara",
        image: "/placeholder.svg?height=300&width=400",
        description: "Pelabuhan utama Parepare",
      },
      {
        id: "2",
        name: "Monument B.J. Habibie dan Ainun",
        image: "/placeholder.svg?height=300&width=400",
        description: "Monument bersejarah",
      },
      {
        id: "3",
        name: "Ladoma Resort",
        image: "/placeholder.svg?height=300&width=400",
        description: "Resort wisata alam",
      },
      {
        id: "4",
        name: "Bulu Nepo",
        image: "/placeholder.svg?height=300&width=400",
        description: "Wisata alam pegunungan",
      },
      {
        id: "5",
        name: "Tonrangeng River Side",
        image: "/placeholder.svg?height=300&width=400",
        description: "Wisata sungai",
      },
      {
        id: "6",
        name: "Pantai Lumpue",
        image: "/placeholder.svg?height=300&width=400",
        description: "Pantai indah di Parepare",
      },
    ])

    // Mock news data
    setNews([
      {
        id: "1",
        title: "ITH Jalankan Program MBKM 2025",
        image: "/placeholder.svg?height=300&width=500",
        date: "2025-01-02",
        description: "ITH Jalankan Program MBKM 2025",
      },
      {
        id: "2",
        title: "Program Pembangunan Infrastruktur",
        image: "/placeholder.svg?height=300&width=500",
        date: "2025-01-01",
        description: "Update pembangunan infrastruktur kota",
      },
      {
        id: "3",
        title: "Pelayanan Digital Terbaru",
        image: "/placeholder.svg?height=300&width=500",
        date: "2024-12-30",
        description: "Inovasi pelayanan digital untuk masyarakat",
      },
      {
        id: "4",
        title: "Festival Budaya Parepare 2025",
        image: "/placeholder.svg?height=300&width=500",
        date: "2024-12-28",
        description: "Perayaan budaya lokal yang meriah",
      },
      {
        id: "5",
        title: "Peningkatan Fasilitas Kesehatan",
        image: "/placeholder.svg?height=300&width=500",
        date: "2024-12-25",
        description: "Modernisasi rumah sakit daerah",
      },
    ])
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

  const handleDestinationClick = (destination: TourismDestination) => {
    console.log("Destination clicked:", destination)
    // Handle destination detail navigation
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    console.log("News clicked:", newsItem)
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <HeroSection
        title="Parepare dalam Genggaman"
        subtitle="Layanan digital kota Parepare, mudah diakses, cepat, dan terpercaya—semuanya hanya dalam satu genggaman."
        description="Temukan berbagai layanan publik, informasi kota, dan pelaporan langsung dari masyarakat."
        ctaText="Jelajahi Layanan"
        onCtaClick={() => {
          // Scroll to services section or navigate
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
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
        subtitle="Lihat berbagai macam penawaran menarik disini"
        items={destinationItems}
        variant="tourism"
        onItemClick={handleDestinationClick}
      />

      <Carousel
        title="Berita Utama"
        subtitle="Berita Seputar Kota Parepare"
        items={newsItems}
        variant="news"
        showButton={true}
        buttonText="Lihat Semua"
        onButtonClick={handleViewAllNews}
        onItemClick={handleNewsClick}
      />

      <Footer />
    </div>
  )
}
