import Link from "next/link"
import { ArrowLeft, HelpCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const faqs = [
  {
    question: "Bagaimana cara mengakses layanan publik online?",
    answer:
      "Anda dapat mengakses layanan publik online melalui portal Parepare dalam Genggaman dengan membuat akun terlebih dahulu, kemudian memilih layanan yang dibutuhkan.",
  },
  {
    question: "Apa saja persyaratan untuk mengurus dokumen kependudukan?",
    answer:
      "Persyaratan umumnya meliputi KTP asli, Kartu Keluarga, dan dokumen pendukung lainnya sesuai jenis layanan yang diminta.",
  },
  {
    question: "Bagaimana cara melaporkan keluhan atau masukan?",
    answer:
      "Anda dapat menyampaikan keluhan melalui fitur Support di website ini atau datang langsung ke kantor pelayanan terkait.",
  },
  {
    question: "Berapa lama proses pengurusan dokumen?",
    answer: "Waktu proses bervariasi tergantung jenis dokumen, umumnya 1-7 hari kerja untuk dokumen standar.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100">Pertanyaan yang sering diajukan seputar layanan Kota Parepare</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
