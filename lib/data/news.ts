export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  image: string
  slug: string
  tags: string[]
  readTime: number
}

export const newsCategories = [
  {
    id: "pemerintahan",
    title: "Pemerintahan",
    description: "Berita seputar pemerintahan kota",
  },
  {
    id: "pembangunan",
    title: "Pembangunan",
    description: "Update pembangunan infrastruktur",
  },
  {
    id: "ekonomi",
    title: "Ekonomi",
    description: "Perkembangan ekonomi daerah",
  },
  {
    id: "sosial",
    title: "Sosial",
    description: "Kegiatan sosial masyarakat",
  },
  {
    id: "wisata",
    title: "Wisata",
    description: "Berita pariwisata dan budaya",
  },
]

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Pelabuhan Nusantara Parepare Raih Penghargaan Pelabuhan Terbaik 2025",
    excerpt:
      "Pelabuhan Nusantara Parepare berhasil meraih penghargaan sebagai pelabuhan terbaik di Sulawesi Selatan tahun 2025 berkat peningkatan layanan dan fasilitas yang signifikan.",
    content:
      "Pelabuhan Nusantara Parepare kembali mengukir prestasi membanggakan dengan meraih penghargaan sebagai pelabuhan terbaik di Sulawesi Selatan tahun 2025. Penghargaan ini diberikan berdasarkan penilaian komprehensif terhadap kualitas layanan, fasilitas, dan kontribusi terhadap perekonomian daerah...",
    category: "pembangunan",
    author: "Tim Redaksi",
    publishedAt: "2025-01-05T10:00:00Z",
    image: "/images/pelabuhan-nusantara.png",
    slug: "pelabuhan-nusantara-raih-penghargaan-terbaik-2025",
    tags: ["pelabuhan", "penghargaan", "infrastruktur"],
    readTime: 3,
  },
  {
    id: "2",
    title: "Festival Budaya Parepare 2025 Siap Digelar Bulan Februari",
    excerpt:
      "Pemerintah Kota Parepare mengumumkan akan menggelar Festival Budaya Parepare 2025 pada bulan Februari dengan menampilkan berbagai kesenian tradisional dan kuliner khas daerah.",
    content:
      "Festival Budaya Parepare 2025 akan segera digelar pada bulan Februari mendatang dengan tema 'Parepare Bersatu dalam Keberagaman'. Festival ini akan menampilkan berbagai pertunjukan seni tradisional, pameran budaya, dan festival kuliner khas Parepare...",
    category: "wisata",
    author: "Dinas Pariwisata",
    publishedAt: "2025-01-04T14:30:00Z",
    image: "/placeholder.svg?height=300&width=400",
    slug: "festival-budaya-parepare-2025-februari",
    tags: ["festival", "budaya", "pariwisata"],
    readTime: 4,
  },
  {
    id: "3",
    title: "Program Beasiswa Pendidikan Kota Parepare Dibuka untuk 500 Siswa",
    excerpt:
      "Pemerintah Kota Parepare membuka program beasiswa pendidikan untuk 500 siswa berprestasi dan kurang mampu tahun ajaran 2025/2026.",
    content:
      "Dalam upaya meningkatkan kualitas pendidikan di Kota Parepare, pemerintah daerah membuka program beasiswa untuk 500 siswa berprestasi dan dari keluarga kurang mampu. Program ini mencakup bantuan biaya sekolah, buku, dan kebutuhan pendidikan lainnya...",
    category: "sosial",
    author: "Dinas Pendidikan",
    publishedAt: "2025-01-03T09:15:00Z",
    image: "/placeholder.svg?height=300&width=400",
    slug: "program-beasiswa-pendidikan-500-siswa",
    tags: ["beasiswa", "pendidikan", "siswa"],
    readTime: 5,
  },
  {
    id: "4",
    title: "Monumen Habibie-Ainun Menjadi Destinasi Favorit Wisatawan",
    excerpt:
      "Monumen Cinta Sejati Habibie & Ainun semakin populer di kalangan wisatawan dengan peningkatan kunjungan hingga 200% dibanding tahun lalu.",
    content:
      "Monumen Cinta Sejati Habibie & Ainun terus menarik perhatian wisatawan dari berbagai daerah. Data dari Dinas Pariwisata menunjukkan peningkatan kunjungan yang signifikan, menjadikannya salah satu ikon wisata utama Kota Parepare...",
    category: "wisata",
    author: "Humas Pemkot",
    publishedAt: "2025-01-02T16:45:00Z",
    image: "/images/monument-habibie.png",
    slug: "monumen-habibie-ainun-destinasi-favorit",
    tags: ["monumen", "wisata", "habibie"],
    readTime: 3,
  },
  {
    id: "5",
    title: "Pembangunan Jalan Tol Parepare-Pinrang Memasuki Tahap Akhir",
    excerpt:
      "Proyek pembangunan jalan tol yang menghubungkan Parepare dengan Pinrang telah memasuki tahap akhir dan diperkirakan akan selesai pada pertengahan 2025.",
    content:
      "Pembangunan jalan tol Parepare-Pinrang yang telah berlangsung selama tiga tahun kini memasuki tahap penyelesaian. Proyek strategis ini diharapkan dapat meningkatkan konektivitas dan mendorong pertumbuhan ekonomi di wilayah Sulawesi Selatan...",
    category: "pembangunan",
    author: "Dinas PUPR",
    publishedAt: "2025-01-01T11:20:00Z",
    image: "/placeholder.svg?height=300&width=400",
    slug: "pembangunan-tol-parepare-pinrang-tahap-akhir",
    tags: ["jalan tol", "infrastruktur", "pembangunan"],
    readTime: 4,
  },
]

export function getNewsByCategory(category: string): NewsArticle[] {
  return newsArticles.filter((article) => article.category === category)
}

export function getNewsById(id: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.id === id)
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug)
}

export function getLatestNews(limit = 5): NewsArticle[] {
  return newsArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
