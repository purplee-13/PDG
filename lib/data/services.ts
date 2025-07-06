export interface Service {
  id: string
  title: string
  description: string
  category: string
  icon: string
  details: string
  requirements: string[]
  process: string[]
  contactInfo: {
    phone: string
    email: string
    office: string
  }
  relatedServices: string[]
}

export const services: Service[] = [
  {
    id: "pendidikan-beasiswa",
    title: "Beasiswa Pendidikan",
    description: "Program beasiswa untuk siswa berprestasi dan kurang mampu",
    category: "pendidikan",
    icon: "GraduationCap",
    details:
      "Program beasiswa yang disediakan oleh Pemerintah Kota Parepare untuk mendukung pendidikan siswa berprestasi dan dari keluarga kurang mampu. Program ini mencakup bantuan biaya sekolah, buku, dan kebutuhan pendidikan lainnya.",
    requirements: [
      "Warga Kota Parepare",
      "Surat keterangan tidak mampu dari kelurahan",
      "Rapor dengan nilai rata-rata minimal 8.0",
      "Surat rekomendasi dari sekolah",
      "Fotokopi KTP orang tua",
      "Fotokopi Kartu Keluarga",
    ],
    process: [
      "Mengisi formulir pendaftaran online",
      "Melengkapi dokumen persyaratan",
      "Verifikasi berkas oleh tim seleksi",
      "Wawancara dan tes",
      "Pengumuman hasil seleksi",
      "Pencairan bantuan beasiswa",
    ],
    contactInfo: {
      phone: "(0421) 21234",
      email: "pendidikan@parepare.go.id",
      office: "Dinas Pendidikan Kota Parepare, Jl. Bau Massepe No. 23",
    },
    relatedServices: ["pendidikan-sertifikat", "pendidikan-izin-sekolah"],
  },
  {
    id: "pendidikan-sertifikat",
    title: "Sertifikat Pendidikan",
    description: "Penerbitan sertifikat dan legalisir dokumen pendidikan",
    category: "pendidikan",
    icon: "FileText",
    details:
      "Layanan penerbitan sertifikat pendidikan, legalisir ijazah, dan dokumen pendidikan lainnya untuk keperluan administrasi dan pekerjaan.",
    requirements: ["Fotokopi ijazah asli", "Fotokopi KTP", "Surat permohonan", "Pas foto 3x4 (2 lembar)"],
    process: [
      "Mengajukan permohonan online",
      "Upload dokumen persyaratan",
      "Verifikasi dokumen",
      "Proses penerbitan sertifikat",
      "Pengambilan sertifikat",
    ],
    contactInfo: {
      phone: "(0421) 21234",
      email: "pendidikan@parepare.go.id",
      office: "Dinas Pendidikan Kota Parepare, Jl. Bau Massepe No. 23",
    },
    relatedServices: ["pendidikan-beasiswa", "pendidikan-izin-sekolah"],
  },
  {
    id: "kesehatan-bpjs",
    title: "Pendaftaran BPJS Kesehatan",
    description: "Bantuan pendaftaran dan pengurusan BPJS Kesehatan",
    category: "kesehatan",
    icon: "Heart",
    details:
      "Layanan bantuan pendaftaran BPJS Kesehatan untuk masyarakat Kota Parepare, termasuk konsultasi dan pendampingan dalam proses pendaftaran.",
    requirements: [
      "Fotokopi KTP",
      "Fotokopi Kartu Keluarga",
      "Pas foto 3x4 (2 lembar)",
      "Surat keterangan penghasilan",
    ],
    process: [
      "Konsultasi awal",
      "Pengisian formulir pendaftaran",
      "Verifikasi dokumen",
      "Proses pendaftaran ke BPJS",
      "Penyerahan kartu BPJS",
    ],
    contactInfo: {
      phone: "(0421) 21567",
      email: "kesehatan@parepare.go.id",
      office: "Dinas Kesehatan Kota Parepare, Jl. Jenderal Sudirman No. 45",
    },
    relatedServices: ["kesehatan-imunisasi", "kesehatan-sertifikat"],
  },
  {
    id: "keuangan-pajak",
    title: "Pembayaran Pajak Daerah",
    description: "Layanan pembayaran dan konsultasi pajak daerah",
    category: "keuangan",
    icon: "CreditCard",
    details:
      "Layanan pembayaran pajak daerah secara online dan offline, termasuk konsultasi perpajakan dan pengurusan keberatan pajak.",
    requirements: [
      "NPWPD (Nomor Pokok Wajib Pajak Daerah)",
      "Fotokopi KTP",
      "Dokumen objek pajak",
      "Bukti pembayaran tahun sebelumnya",
    ],
    process: [
      "Login ke sistem pajak online",
      "Input data pembayaran",
      "Verifikasi jumlah pajak",
      "Pembayaran melalui bank/online",
      "Cetak bukti pembayaran",
    ],
    contactInfo: {
      phone: "(0421) 21890",
      email: "pajak@parepare.go.id",
      office: "Badan Pendapatan Daerah Kota Parepare, Jl. Andi Makkasau No. 12",
    },
    relatedServices: ["keuangan-retribusi", "perdagangan-izin-usaha"],
  },
  // Trading Services (Layanan Perdagangan)
  {
    id: "perdagangan-sobat-harga",
    title: "Sobat Harga",
    description: "Monitoring dan analisis harga komoditas pangan di pasar tradisional",
    category: "perdagangan",
    icon: "TrendingUp",
    details: "Sistem informasi harga komoditas pangan yang menyediakan data real-time harga bahan pokok di berbagai pasar tradisional Kota Parepare. Membantu masyarakat untuk mendapatkan informasi harga terkini sebelum berbelanja.",
    requirements: [
      "Tidak ada persyaratan khusus",
      "Akses internet untuk melihat data terkini",
    ],
    process: [
      "Akses halaman Sobat Harga",
      "Pilih komoditas yang ingin dilihat",
      "Pilih pasar yang ingin dimonitor",
      "Lihat grafik tren harga",
      "Bandingkan harga antar pasar",
    ],
    contactInfo: {
      phone: "(0421) 21345",
      email: "perdagangan@parepare.go.id",
      office: "Dinas Perdagangan Kota Parepare, Jl. Bau Massepe No. 45",
    },
    relatedServices: ["perdagangan-analisis-harga", "perdagangan-distribusi-pupuk"],
  },
  {
    id: "perdagangan-distribusi-pupuk",
    title: "Distribusi Pupuk Bersubsidi",
    description: "Sistem distribusi dan monitoring pupuk bersubsidi untuk petani",
    category: "perdagangan",
    icon: "ShoppingCart",
    details: "Sistem distribusi pupuk bersubsidi yang memastikan pupuk tersalurkan dengan tepat sasaran kepada petani. Dilengkapi dengan monitoring stok dan distribusi untuk transparansi.",
    requirements: [
      "Kartu Tani atau Surat Keterangan Petani",
      "Fotokopi KTP",
      "Fotokopi Kartu Keluarga",
      "Surat keterangan luas lahan dari kepala desa",
    ],
    process: [
      "Registrasi sebagai petani penerima subsidi",
      "Verifikasi data dan lahan",
      "Penjadwalan distribusi pupuk",
      "Pengambilan pupuk di kios resmi",
      "Monitoring penggunaan pupuk",
    ],
    contactInfo: {
      phone: "(0421) 21345",
      email: "perdagangan@parepare.go.id",
      office: "Dinas Perdagangan Kota Parepare, Jl. Bau Massepe No. 45",
    },
    relatedServices: ["perdagangan-sobat-harga", "perdagangan-data-ikm"],
  },
  {
    id: "perdagangan-analisis-harga",
    title: "Analisis Harga Bahan Pokok",
    description: "Analisis tren harga bahan pokok dan komoditas strategis",
    category: "perdagangan",
    icon: "BarChart3",
    details: "Layanan analisis mendalam terhadap tren harga bahan pokok untuk mendukung kebijakan pemerintah dan membantu masyarakat memahami fluktuasi harga di pasar.",
    requirements: [
      "Tidak ada persyaratan khusus",
      "Akses internet untuk melihat dashboard analisis",
    ],
    process: [
      "Akses dashboard analisis harga",
      "Pilih periode analisis",
      "Pilih komoditas yang ingin dianalisis",
      "Lihat grafik tren dan prediksi",
      "Download laporan analisis",
    ],
    contactInfo: {
      phone: "(0421) 21345",
      email: "perdagangan@parepare.go.id",
      office: "Dinas Perdagangan Kota Parepare, Jl. Bau Massepe No. 45",
    },
    relatedServices: ["perdagangan-sobat-harga", "perdagangan-data-ikm"],
  },
  {
    id: "perdagangan-data-ikm",
    title: "Data Industri Kecil Menengah",
    description: "Database dan statistik industri kecil menengah serta sertifikasi halal",
    category: "perdagangan",
    icon: "Building2",
    details: "Sistem informasi database industri kecil menengah (IKM) di Kota Parepare, termasuk data sertifikasi halal dan statistik pertumbuhan industri untuk mendukung pembangunan ekonomi lokal.",
    requirements: [
      "Surat izin usaha",
      "NPWP perusahaan",
      "Dokumen legalitas perusahaan",
      "Data produksi dan kapasitas",
    ],
    process: [
      "Pendaftaran perusahaan dalam database",
      "Verifikasi dokumen legalitas",
      "Input data produksi dan kapasitas",
      "Proses sertifikasi halal (jika diperlukan)",
      "Update data berkala",
    ],
    contactInfo: {
      phone: "(0421) 21345",
      email: "perdagangan@parepare.go.id",
      office: "Dinas Perdagangan Kota Parepare, Jl. Bau Massepe No. 45",
    },
    relatedServices: ["perdagangan-sobat-harga", "perdagangan-distribusi-pupuk"],
  },
]

export const serviceCategories = [
  {
    id: "pendidikan",
    title: "Pendidikan",
    description: "Layanan terkait pendidikan dan pembelajaran",
    icon: "GraduationCap",
    color: "bg-blue-500",
  },
  {
    id: "kesehatan",
    title: "Kesehatan",
    description: "Layanan kesehatan masyarakat",
    icon: "Heart",
    color: "bg-red-500",
  },
  {
    id: "keuangan",
    title: "Keuangan",
    description: "Layanan keuangan dan perpajakan",
    icon: "CreditCard",
    color: "bg-green-500",
  },
  {
    id: "perdagangan",
    title: "Perdagangan",
    description: "Layanan perdagangan dan usaha",
    icon: "ShoppingCart",
    color: "bg-orange-500",
  },
]

export function getServicesByCategory(category: string): Service[] {
  return services.filter((service) => service.category === category)
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}
