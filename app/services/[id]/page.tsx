import Link from "next/link"
import { notFound } from "next/navigation"
import { getServiceById, services } from "@/lib/data/services"
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface ServiceDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = await params
  const service = getServiceById(resolvedParams.id)

  if (!service) {
    notFound()
  }

  const relatedServices = services.filter((s) => service.relatedServices.includes(s.id) && s.id !== service.id)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center text-green-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Layanan
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-green-100">{service.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Layanan</h2>
              <p className="text-gray-700 leading-relaxed">{service.details}</p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Persyaratan</h2>
              <ul className="space-y-3">
                {service.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alur Proses</h2>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{service.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{service.contactInfo.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{service.contactInfo.office}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {service.id.startsWith('perdagangan-') && service.id !== 'perdagangan-pajak' ? (
              <Link 
                href={`/trading/${service.id.replace('perdagangan-', '').replace('sobat-harga', 'price-monitoring').replace('distribusi-pupuk', 'fertilizer-distribution').replace('analisis-harga', 'price-analysis').replace('data-ikm', 'sme-data')}`}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
              >
                Akses Layanan
              </Link>
            ) : (
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Ajukan Permohonan
              </button>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Layanan Terkait</h3>
                <div className="space-y-3">
                  {relatedServices.map((relatedService) => (
                    <Link
                      key={relatedService.id}
                      href={`/services/${relatedService.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">{relatedService.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{relatedService.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }))
}
