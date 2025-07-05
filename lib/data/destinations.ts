export interface Destination {
  id: string
  name: string
  subtitle?: string
  description: string
  fullDescription?: string[]
  category: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  images: string[]
  facilities: string[]
  activities: string[]
  openingHours: string
  ticketPrice: string
  contactInfo: {
    phone?: string
    website?: string
  }
  howToGet: string[]
  nearbyDestinations: string[]
}

export const destinations: Destination[] = [
  {
    id: "pelabuhan-nusantara",
    name: "Pelabuhan Nusantara Parepare",
    subtitle: "Menikmati Senja, Laut, dan Hiruk Pikuk Kapal di Jantung Kota Parepare",
    description:
      "Pelabuhan Nusantara Parepare merupakan salah satu pelabuhan penting di wilayah Sulawesi Selatan, sekaligus menjadi ikon kebanggaan masyarakat Parepare. Terletak strategis di tepi Selat Makassar, pelabuhan ini tidak hanya berfungsi sebagai simpul transportasi laut dan logistik, tetapi juga telah berkembang menjadi salah satu spot wisata favorit bagi masyarakat lokal dan para pelancong.",
    fullDescription: [
      "Pelabuhan ini menyuguhkan pemandangan laut lepas yang menenangkan, di mana kapal-kapal besar bersandar atau melintas di kejauhan, menciptakan latar yang hidup dan dinamis. Suasana khas pelabuhan—dengan suara kapal, angin laut, dan aktivitas pekerja memberikan pengalaman yang otentik dan unik bagi pengunjung.",
      "Namun daya tarik utamanya adalah momen matahari terbenam. Saat senja tiba, langit perlahan berubah warna menjadi gradasi orange yang ungu, membiaskan panorama yang luar biasa indah. Pantulan cahaya matahari yang memantul di permukaan air dan siluet kapal yang tenang menjadikan Pelabuhan Nusantara sebagai tempat yang sangat cocok untuk menikmati sore, merenungi, atau sekadar berbincang dengan teman dan keluarga sambil menikmati keindahan alam yang estetik.",
      "Di sekitar area pelabuhan, pengunjung bisa menemukan beberapa fasilitas pendukung seperti taman kecil, area pejalan kaki, kursi untuk bersantai, dan pedagang kaki lima yang menjajakan makanan ringan khas Parepare. Ini membuat pengalaman berkunjung ke pelabuhan semakin nyaman dan menyenangkan, baik untuk wisata keluarga, anak muda, maupun wisatawan dari luar daerah.",
      "Selain fungsi wisatanya, pelabuhan ini juga menjadi jalur utama distribusi barang dan penumpang ke berbagai daerah di Sulawesi dan pulau sekitarnya. Hal ini mencerminkan betapa pentingnya peran Pelabuhan Nusantara tidak hanya bagi ekonomi kota, tetapi juga dalam membentuk identitas Parepare sebagai kota pelabuhan yang aktif dan terbuka.",
      "Bagi kamu yang mencari tempat santai di sore hari dengan pemandangan laut yang memukau, Pelabuhan Nusantara Parepare adalah pilihan yang tidak boleh dilewatkan. Datanglah menjelang matahari terbenam, duduk di tepian pelabuhan, dan rasakan ketenangan yang hanya bisa ditemukan ketika langit bertemu laut di ujung pandanganmu.",
    ],
    category: "transportasi",
    location: "XJPC+R72, Mallusetasi, Kec. Ujung, Kota Parepare, Sulawesi Selatan",
    coordinates: {
      lat: -4.002780085661,
      lng: 119.6210602676,
    },
    images: [
      "/images/pelabuhan-nusantara.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facilities: [
      "Terminal penumpang",
      "Area parkir luas",
      "Ruang tunggu ber-AC",
      "Toilet umum",
      "Kantin dan warung makan",
      "ATM dan money changer",
    ],
    activities: [
      "Melihat aktivitas bongkar muat kapal",
      "Fotografi sunset di dermaga",
      "Wisata kuliner seafood",
      "Berbelanja oleh-oleh khas Parepare",
    ],
    openingHours: "24 jam",
    ticketPrice: "Gratis (kecuali naik kapal)",
    contactInfo: {
      phone: "(0421) 21069, (0421) 21635, (0421) 24071",
      website: "www.pelabuhan-parepare.co.id",
    },
    howToGet: [
      "Dari pusat kota naik angkot jurusan Pelabuhan",
      "Menggunakan ojek online atau taksi",
      "Kendaraan pribadi dengan parkir tersedia",
    ],
    nearbyDestinations: ["monument-habibie", "pantai-lumpue"],
  },
  {
    id: "monument-habibie",
    name: "Monumen Cinta Sejati Habibie & Ainun",
    subtitle: "Simbol Romantis Abadi di Kota Parepare",
    description:
      "Monumen Cinta Sejati Habibie & Ainun adalah salah satu landmark paling ikonik di Kota Parepare. Monumen ini dibangun sebagai bentuk penghormatan sekaligus simbol kisah cinta abadi antara Presiden ke-3 Republik Indonesia, Prof. Dr. Ing. B.J. Habibie, dan sang tercinta, Hasri Ainun Besari. Letaknya berada di kawasan strategis kota, menghadap langsung ke laut lepas, menjadikannya salah satu tempat paling romantis di Parepare.",
    fullDescription: [
      "Patung perunggu sepasang suami istri ini berdiri berdampingan dengan ekspresi penuh kehangatan dan ketenangan. Bukan sekadar patung biasa, monumen ini menyimpan nilai historis dan emosional yang dalam, tidak hanya bagi warga Parepare sebagai kota kelahiran Habibie, tetapi juga bagi seluruh masyarakat Indonesia yang mengenang kisah cinta dan dedikasi beliau terhadap negara dan keluarga.",
      "Di sekitar monumen, terdapat taman yang tertata rapi dengan bangku-bangku untuk bersantai, lampu-lampu malam yang cantik, serta akses langsung ke pelabuhan. Lokasinya yang strategis membuat pengunjung bisa menikmati pemandangan matahari terbenam, suara ombak yang menenangkan, dan kapal-kapal yang melintas di kejauhan.",
      "Monumen ini sering dijadikan tempat swafoto, lokasi prewedding, hingga destinasi edukasi sejarah. Tidak jarang pula pengunjung datang hanya untuk merenungi sejenak atau menggaumi keindahan laut sambil mengenang nilai-nilai cinta, kesetiaan, dan pengabdian yang terpancar dari sosok Habibie dan Ainun.",
      "Bagi pasangan muda, keluarga, ataupun pelancong yang mencari tempat tenang dengan makna mendalam, Monumen Cinta Sejati Habibie & Ainun adalah destinasi yang wajib dikunjungi saat berada di Parepare.",
    ],
    category: "sejarah",
    location: "XJPC+XR6 Lapangan Andi Makkasau, Jl. Karaeng Burane, Mallusetasi, Ujung, Parepare, South Sulawesi 91111",
    coordinates: {
      lat: -4.012535376097922,
      lng: 119.62207936639304,
    },
    images: [
      "/images/monument-habibie.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facilities: ["Taman yang indah", "Area parkir", "Toilet umum", "Gazebo untuk istirahat", "Penerangan yang baik"],
    activities: [
      "Berfoto dengan monument",
      "Belajar sejarah B.J. Habibie",
      "Piknik keluarga di taman",
      "Jogging pagi atau sore",
    ],
    openingHours: "06:00 - 22:00 WIB",
    ticketPrice: "Gratis",
    contactInfo: {
      phone: "(0421) 232631",
    },
    howToGet: [
      "Dari pusat kota berjalan kaki 10 menit",
      "Naik angkot jurusan Bacukiki",
      "Menggunakan kendaraan pribadi",
    ],
    nearbyDestinations: ["pelabuhan-nusantara", "masjid-agung"],
  },
  {
    id: "ladoma-resort",
    name: "Ladoma Resort",
    subtitle: "Resort Wisata Alam dengan Fasilitas Lengkap",
    description:
      "Resort dan tempat wisata alam yang menawarkan pemandangan indah dan berbagai fasilitas rekreasi keluarga.",
    fullDescription: [
      "Ladoma Resort merupakan destinasi wisata yang sempurna untuk liburan keluarga dengan berbagai fasilitas lengkap dan pemandangan alam yang menakjubkan.",
      "Resort ini menawarkan pengalaman menginap yang nyaman dengan berbagai aktivitas menarik untuk semua anggota keluarga.",
    ],
    category: "alam",
    location: "Jl. Poros Pinrang, Kecamatan Suppa, Kota Parepare",
    coordinates: {
      lat: -4.05,
      lng: 119.58,
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facilities: [
      "Kolam renang",
      "Restaurant dan cafe",
      "Kamar penginapan",
      "Area bermain anak",
      "Gazebo dan saung",
      "Area parkir luas",
    ],
    activities: [
      "Berenang di kolam renang",
      "Menikmati kuliner lokal",
      "Bermain dengan keluarga",
      "Fotografi pemandangan alam",
      "Menginap di resort",
    ],
    openingHours: "08:00 - 22:00 WIB",
    ticketPrice: "Rp 15.000 - Rp 25.000",
    contactInfo: {
      phone: "(0421) 22345",
      website: "www.ladomaresort.com",
    },
    howToGet: [
      "Dari pusat kota naik kendaraan pribadi 20 menit",
      "Menggunakan ojek online",
      "Naik angkot jurusan Suppa",
    ],
    nearbyDestinations: ["bulu-nepo", "pantai-lumpue"],
  },
  {
    id: "bulu-nepo",
    name: "Bulu Nepo",
    subtitle: "Bukit Indah untuk Menikmati Sunrise dan Sunset",
    description:
      "Bukit dengan pemandangan indah yang menjadi spot favorit untuk melihat sunrise dan sunset di Kota Parepare.",
    fullDescription: [
      "Bulu Nepo adalah destinasi wisata alam yang menawarkan pemandangan spektakuler dari ketinggian, terutama saat matahari terbit dan terbenam.",
      "Tempat ini menjadi favorit para pecinta alam dan fotografer untuk mengabadikan keindahan panorama Kota Parepare dari atas.",
    ],
    category: "alam",
    location: "Kecamatan Soreang, Kota Parepare",
    coordinates: {
      lat: -4.03,
      lng: 119.59,
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facilities: ["Jalur pendakian", "Area parkir", "Warung sederhana", "Spot foto instagramable"],
    activities: ["Hiking dan trekking", "Melihat sunrise/sunset", "Fotografi landscape", "Camping (dengan izin)"],
    openingHours: "24 jam",
    ticketPrice: "Gratis",
    contactInfo: {
      phone: "(0421) 21234",
    },
    howToGet: [
      "Dari pusat kota naik motor 30 menit",
      "Menggunakan kendaraan 4WD untuk akses lebih mudah",
      "Trekking dari kaki bukit",
    ],
    nearbyDestinations: ["ladoma-resort", "pantai-lumpue"],
  },
  {
    id: "tonrangeng-river-side",
    name: "Tonrangeng River Side",
    subtitle: "Wisata Sungai dengan Pemandangan Alam Asri",
    description: "Kawasan wisata sungai dengan pemandangan alam yang asri dan berbagai aktivitas air yang menarik.",
    fullDescription: [
      "Tonrangeng River Side menawarkan pengalaman wisata alam yang unik dengan suasana sungai yang tenang dan pemandangan yang menyejukkan mata.",
      "Destinasi ini cocok untuk keluarga yang ingin menikmati aktivitas air dan bersantai di tepi sungai sambil menikmati keindahan alam.",
    ],
    category: "alam",
    location: "Kecamatan Bacukiki Barat, Kota Parepare",
    coordinates: {
      lat: -4.02,
      lng: 119.61,
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facilities: ["Dermaga kayu", "Gazebo tepi sungai", "Area parkir", "Toilet umum", "Warung makan"],
    activities: ["Berperahu di sungai", "Memancing", "Fotografi alam", "Piknik keluarga", "Menikmati sunset"],
    openingHours: "06:00 - 18:00 WIB",
    ticketPrice: "Rp 5.000 - Rp 10.000",
    contactInfo: {
      phone: "(0421) 23456",
    },
    howToGet: ["Dari pusat kota naik angkot 15 menit", "Menggunakan kendaraan pribadi", "Ojek online tersedia"],
    nearbyDestinations: ["monument-habibie", "masjid-agung"],
  },
]

export const destinationCategories = [
  {
    id: "alam",
    title: "Wisata Alam",
    description: "Destinasi wisata alam dan outdoor",
  },
  {
    id: "sejarah",
    title: "Wisata Sejarah",
    description: "Tempat bersejarah dan budaya",
  },
  {
    id: "transportasi",
    title: "Transportasi",
    description: "Hub transportasi dan infrastruktur",
  },
  {
    id: "kuliner",
    title: "Wisata Kuliner",
    description: "Tempat makan dan kuliner khas",
  },
]

export function getDestinationsByCategory(category: string): Destination[] {
  return destinations.filter((destination) => destination.category === category)
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((destination) => destination.id === id)
}
