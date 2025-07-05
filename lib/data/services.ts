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
