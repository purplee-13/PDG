import { MapPin, Phone, Printer, Twitter, Linkedin, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</p>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">(123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Printer className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">(123) 456-7890</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About Parepare */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Tentang Parepare dalam Genggaman</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              "Parepare dalam Genggaman" adalah platform digital terpadu milik Pemerintah Kota Parepare yang bertujuan
              untuk memudahkan masyarakat dalam mengakses berbagai layanan publik, mendapatkan informasi terkini,
              menyampaikan laporan, dan memantau perkembangan kota hanya melalui satu portal online.
            </p>
          </div>

          {/* Satu Data Parepare */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tentang Satu Data Parepare</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Satu Data Parepare adalah portal resmi Pemerintah Kota Parepare yang menyediakan data terbuka dan
              terstandarisasi dari berbagai instansi daerah. Portal ini menyajikan kebijakan berbasis data, keterbukaan
              informasi publik, serta kolaborasi antara pemerintah dan masyarakat.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Pemerintah Kota Parepare - Parepare dalam Genggaman. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Syarat dan Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
