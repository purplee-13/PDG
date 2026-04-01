import CategoriesSection from "@/components/categories-section"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import NewsCarousel from "@/components/news-carousel"
import ServicesSection from "@/components/services-section"
import TourismSection from "@/components/tourism-section"
import { MfaLoginPromptDialog } from "@/components/dashboard/mfa-login-prompt-dialog"
import { auth } from "@/auth"

export default async function HomePage() {
  const session = await auth()

  // Tanpa login: anggap MFA "sudah aktif" agar dialog tidak tampil. Jika login: hanya true jika MFA benar aktif.
  let mfaEnabled = true
  if (session?.user) {
    mfaEnabled = session.user.mfaEnabled === true
  }

  return (
    <div className="min-h-screen bg-white">
      <MfaLoginPromptDialog mfaEnabled={mfaEnabled} dismissPath="/" />
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
