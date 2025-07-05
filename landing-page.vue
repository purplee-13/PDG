<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div class="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <div class="bg-green-500 text-white px-8 py-2 rounded-full flex items-center space-x-6">
                <button class="flex items-center space-x-1 hover:text-green-100 transition-colors">
                  <span>Topik</span>
                  <ChevronDown class="w-4 h-4" />
                </button>
                <a href="#" class="hover:text-green-100 transition-colors">Berita</a>
                <a href="#" class="hover:text-green-100 transition-colors">FAQ</a>
                <a href="#" class="hover:text-green-100 transition-colors">Support</a>
              </div>
            </div>
          </div>

          <!-- Login Button -->
          <div class="hidden md:block">
            <button class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors">
              Login
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 hover:text-gray-900">
              <Menu class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="#" class="block px-3 py-2 text-gray-700 hover:text-gray-900">Topik</a>
          <a href="#" class="block px-3 py-2 text-gray-700 hover:text-gray-900">Berita</a>
          <a href="#" class="block px-3 py-2 text-gray-700 hover:text-gray-900">FAQ</a>
          <a href="#" class="block px-3 py-2 text-gray-700 hover:text-gray-900">Support</a>
          <button class="w-full text-left bg-orange-500 text-white px-3 py-2 rounded-lg mt-2">Login</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-gray-100 to-gray-200 min-h-[600px] flex items-center">
      <div class="absolute inset-0 bg-cover bg-center opacity-20" 
           style="background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Kcu3kmvDDoAVNe9VLxtKi0cXuYZmW8.png')"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 leading-tight">
              Parepare dalam Genggaman
            </h1>
            <p class="text-lg text-gray-700 leading-relaxed max-w-lg">
              Layanan digital kota Parepare, mudah diakses, cepat, dan terpercaya—semuanya hanya dalam satu genggaman.
            </p>
            <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Jelajahi Layanan
            </button>
          </div>

          <!-- Right Content -->
          <div class="space-y-4">
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 class="text-xl font-semibold text-orange-500 mb-3">
                Temukan berbagai layanan publik, informasi kota, dan pelaporan langsung dari masyarakat.
              </h3>
              <p class="text-gray-700">
                Dirancang untuk memudahkan warga, membangun kota bersama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            Layanan Kota Parepare
          </h2>
          <p class="text-gray-600 text-lg">
            Temukan aplikasi dan pelayanan di Kota Parepare
          </p>
          <div class="mt-6 flex justify-end">
            <a href="#" class="text-green-500 hover:text-green-600 flex items-center space-x-1">
              <span>Lihat Semua</span>
              <ArrowRight class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="max-w-4xl mx-auto mb-12">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari Layanan"
              class="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <X class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>

        <!-- Service Categories -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GraduationCap class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Pendidikan</h3>
            <p class="text-sm text-gray-600">Layanan Pendidikan</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Keuangan</h3>
            <p class="text-sm text-gray-600">Layanan Keuangan</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Kesehatan</h3>
            <p class="text-sm text-gray-600">Layanan Kesehatan</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingCart class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Perdagangan</h3>
            <p class="text-sm text-gray-600">Layanan Perdagangan</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            Kategori Layanan
          </h2>
          <p class="text-gray-600 text-lg">
            Temukan aplikasi dan pelayanan di Kota Parepare berdasarkan kategori!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Users class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Wirausaha</h3>
          </div>

          <div class="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <MapPin class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Wisatawan</h3>
          </div>

          <div class="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <GraduationCap class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Pelajar</h3>
          </div>

          <div class="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Users class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Masyarakat</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Tourism Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            Destinasi Wisata di Kota Parepare
          </h2>
          <p class="text-gray-600 text-lg">
            Lihat berbagai macam penawaran menarik disini
          </p>
        </div>

        <div class="relative">
          <div class="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            <div class="flex-none w-80 h-64 bg-cover bg-center rounded-lg relative" 
                 style="background-image: url('/placeholder.svg?height=256&width=320')">
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-semibold text-lg">Pelabuhan Nusantara Parepare</h3>
              </div>
            </div>

            <div class="flex-none w-80 h-64 bg-cover bg-center rounded-lg relative" 
                 style="background-image: url('/placeholder.svg?height=256&width=320')">
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-semibold text-lg">Monument B.J. Habibie dan Ainun</h3>
              </div>
            </div>

            <div class="flex-none w-80 h-64 bg-cover bg-center rounded-lg relative" 
                 style="background-image: url('/placeholder.svg?height=256&width=320')">
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-semibold text-lg">Ladoma Resort</h3>
              </div>
            </div>

            <div class="flex-none w-80 h-64 bg-cover bg-center rounded-lg relative" 
                 style="background-image: url('/placeholder.svg?height=256&width=320')">
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-semibold text-lg">Bulu Nepo</h3>
              </div>
            </div>

            <div class="flex-none w-80 h-64 bg-cover bg-center rounded-lg relative" 
                 style="background-image: url('/placeholder.svg?height=256&width=320')">
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-semibold text-lg">Tonrangeng River Side</h3>
              </div>
            </div>
          </div>

          <!-- Navigation arrows -->
          <button class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
            <ChevronLeft class="w-6 h-6 text-gray-600" />
          </button>
          <button class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
            <ChevronRight class="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Logo and Contact -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div class="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <MapPin class="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <p class="text-gray-300 text-sm">345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</p>
              </div>
              
              <div class="flex items-center space-x-8">
                <div class="flex items-center space-x-2">
                  <Phone class="w-4 h-4 text-gray-400" />
                  <span class="text-gray-300 text-sm">(123) 456-7890</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Printer class="w-4 h-4 text-gray-400" />
                  <span class="text-gray-300 text-sm">(123) 456-7890</span>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Twitter class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Linkedin class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Facebook class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- About Parepare -->
          <div class="lg:col-span-2">
            <h3 class="text-xl font-semibold mb-4">Tentang Parepare dalam Genggaman</h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-6">
              "Parepare dalam Genggaman" adalah platform digital terpadu milik Pemerintah Kota Parepare yang bertujuan untuk memudahkan masyarakat dalam mengakses berbagai layanan publik, mendapatkan informasi terkini, menyampaikan laporan, dan memantau perkembangan kota hanya melalui satu portal online.
            </p>
          </div>

          <!-- Satu Data Parepare -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Tentang Satu Data Parepare</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Satu Data Parepare adalah portal resmi Pemerintah Kota Parepare yang menyediakan data terbuka dan terstandarisasi dari berbagai instansi daerah. Portal ini menyajikan kebijakan berbasis data, keterbukaan informasi publik, serta kolaborasi antara pemerintah dan masyarakat.
            </p>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-gray-700 mt-12 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-gray-400 text-sm text-center md:text-left">
              © 2025 Pemerintah Kota Parepare - Parepare dalam Genggaman. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Kebijakan Privasi</a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Syarat dan Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Menu, 
  ChevronDown, 
  Search, 
  X, 
  ArrowRight,
  GraduationCap,
  CreditCard,
  Heart,
  ShoppingCart,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Phone,
  Printer,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
