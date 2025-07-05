import CategoriesSection from "@/components/categories-section"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import NewsCarousel from "@/components/news-carousel"
import ServicesSection from "@/components/services-section"
import TourismSection from "@/components/tourism-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CategoriesSection />
      <NewsCarousel />
      <TourismSection />
      <Footer />
    </div>
  )
}
