export interface DepartmentStats {
  department: string
  departmentName: string
  totalUsers: number
  activeServices: number
  monthlyRequests: number
  completionRate: number
  avgResponseTime: string
  popularServices: Array<{
    name: string
    requests: number
  }>
  monthlyData: Array<{
    month: string
    requests: number
    completed: number
  }>
  recentActivities: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    status: "completed" | "pending" | "in-progress"
  }>
}

export interface CityWideStats {
  totalUsers: number
  totalDepartments: number
  totalServices: number
  totalMonthlyRequests: number
  avgCompletionRate: number
  avgResponseTime: string
  topPerformingDepartments: Array<{
    department: string
    departmentName: string
    completionRate: number
    monthlyRequests: number
  }>
  cityWideActivities: Array<{
    id: string
    department: string
    departmentName: string
    description: string
    timestamp: string
    status: "completed" | "pending" | "in-progress"
  }>
  departmentComparison: Array<{
    department: string
    departmentName: string
    totalUsers: number
    monthlyRequests: number
    completionRate: number
    trend: "up" | "down" | "stable"
  }>
}

export const departmentStats: Record<string, DepartmentStats> = {
  kesehatan: {
    department: "kesehatan",
    departmentName: "Dinas Kesehatan",
    totalUsers: 15420,
    activeServices: 8,
    monthlyRequests: 2340,
    completionRate: 94.5,
    avgResponseTime: "2.3 hari",
    popularServices: [
      { name: "Pendaftaran BPJS", requests: 890 },
      { name: "Surat Sehat", requests: 654 },
      { name: "Imunisasi", requests: 432 },
      { name: "Sertifikat Kesehatan", requests: 364 },
    ],
    monthlyData: [
      { month: "Jul", requests: 2100, completed: 1980 },
      { month: "Aug", requests: 2250, completed: 2120 },
      { month: "Sep", requests: 2400, completed: 2280 },
      { month: "Oct", requests: 2340, completed: 2210 },
      { month: "Nov", requests: 2180, completed: 2050 },
      { month: "Dec", requests: 2340, completed: 2210 },
    ],
    recentActivities: [
      {
        id: "1",
        type: "service_request",
        description: "Permohonan BPJS Kesehatan - Ahmad Rizki",
        timestamp: "2025-01-05T10:30:00Z",
        status: "pending",
      },
      {
        id: "2",
        type: "document_approval",
        description: "Surat Sehat disetujui - Siti Nurhaliza",
        timestamp: "2025-01-05T09:15:00Z",
        status: "completed",
      },
      {
        id: "3",
        type: "service_request",
        description: "Jadwal Imunisasi - Keluarga Budi",
        timestamp: "2025-01-05T08:45:00Z",
        status: "in-progress",
      },
    ],
  },
  pendidikan: {
    department: "pendidikan",
    departmentName: "Dinas Pendidikan",
    totalUsers: 23150,
    activeServices: 12,
    monthlyRequests: 3240,
    completionRate: 96.2,
    avgResponseTime: "1.8 hari",
    popularServices: [
      { name: "Beasiswa Pendidikan", requests: 1240 },
      { name: "Legalisir Ijazah", requests: 890 },
      { name: "Surat Rekomendasi", requests: 654 },
      { name: "Izin Sekolah", requests: 456 },
    ],
    monthlyData: [
      { month: "Jul", requests: 3100, completed: 2980 },
      { month: "Aug", requests: 3350, completed: 3220 },
      { month: "Sep", requests: 3400, completed: 3280 },
      { month: "Oct", requests: 3240, completed: 3110 },
      { month: "Nov", requests: 3180, completed: 3050 },
      { month: "Dec", requests: 3240, completed: 3110 },
    ],
    recentActivities: [
      {
        id: "1",
        type: "scholarship_application",
        description: "Aplikasi Beasiswa - Maya Sari (SMA 1 Parepare)",
        timestamp: "2025-01-05T11:20:00Z",
        status: "pending",
      },
      {
        id: "2",
        type: "document_legalization",
        description: "Legalisir Ijazah selesai - Budi Santoso",
        timestamp: "2025-01-05T10:30:00Z",
        status: "completed",
      },
    ],
  },
  perdagangan: {
    department: "perdagangan",
    departmentName: "Dinas Perdagangan",
    totalUsers: 8940,
    activeServices: 6,
    monthlyRequests: 1540,
    completionRate: 91.8,
    avgResponseTime: "3.1 hari",
    popularServices: [
      { name: "Izin Usaha", requests: 540 },
      { name: "Monitoring Harga", requests: 420 },
      { name: "Distribusi Pupuk", requests: 320 },
      { name: "Data IKM", requests: 260 },
    ],
    monthlyData: [
      { month: "Jul", requests: 1400, completed: 1280 },
      { month: "Aug", requests: 1520, completed: 1390 },
      { month: "Sep", requests: 1600, completed: 1470 },
      { month: "Oct", requests: 1540, completed: 1410 },
      { month: "Nov", requests: 1480, completed: 1350 },
      { month: "Dec", requests: 1540, completed: 1410 },
    ],
    recentActivities: [
      {
        id: "1",
        type: "business_permit",
        description: "Permohonan Izin Usaha - Toko Mandiri",
        timestamp: "2025-01-05T14:20:00Z",
        status: "in-progress",
      },
      {
        id: "2",
        type: "price_monitoring",
        description: "Update harga beras di Pasar Sumpang",
        timestamp: "2025-01-05T13:15:00Z",
        status: "completed",
      },
    ],
  },
  keuangan: {
    department: "keuangan",
    departmentName: "Badan Pendapatan Daerah",
    totalUsers: 12380,
    activeServices: 7,
    monthlyRequests: 1890,
    completionRate: 98.1,
    avgResponseTime: "1.2 hari",
    popularServices: [
      { name: "Pembayaran Pajak", requests: 1120 },
      { name: "Konsultasi Pajak", requests: 340 },
      { name: "Retribusi Daerah", requests: 280 },
      { name: "Surat Keterangan", requests: 150 },
    ],
    monthlyData: [
      { month: "Jul", requests: 1780, completed: 1750 },
      { month: "Aug", requests: 1920, completed: 1890 },
      { month: "Sep", requests: 2000, completed: 1960 },
      { month: "Oct", requests: 1890, completed: 1850 },
      { month: "Nov", requests: 1840, completed: 1800 },
      { month: "Dec", requests: 1890, completed: 1850 },
    ],
    recentActivities: [
      {
        id: "1",
        type: "tax_payment",
        description: "Pembayaran PBB - Jl. Sudirman No. 45",
        timestamp: "2025-01-05T15:30:00Z",
        status: "completed",
      },
      {
        id: "2",
        type: "tax_consultation",
        description: "Konsultasi pajak usaha - CV Maju Jaya",
        timestamp: "2025-01-05T14:45:00Z",
        status: "in-progress",
      },
    ],
  },
  umum: {
    department: "umum",
    departmentName: "Layanan Umum",
    totalUsers: 5420,
    activeServices: 4,
    monthlyRequests: 890,
    completionRate: 89.5,
    avgResponseTime: "2.8 hari",
    popularServices: [
      { name: "Informasi Umum", requests: 340 },
      { name: "Pengaduan Masyarakat", requests: 280 },
      { name: "Surat Keterangan", requests: 170 },
      { name: "Permohonan Data", requests: 100 },
    ],
    monthlyData: [
      { month: "Jul", requests: 820, completed: 730 },
      { month: "Aug", requests: 910, completed: 810 },
      { month: "Sep", requests: 950, completed: 850 },
      { month: "Oct", requests: 890, completed: 790 },
      { month: "Nov", requests: 870, completed: 780 },
      { month: "Dec", requests: 890, completed: 790 },
    ],
    recentActivities: [
      {
        id: "1",
        type: "general_inquiry",
        description: "Pertanyaan layanan publik",
        timestamp: "2025-01-05T16:20:00Z",
        status: "pending",
      },
      {
        id: "2",
        type: "complaint",
        description: "Pengaduan pelayanan - Kelurahan Watang",
        timestamp: "2025-01-05T15:30:00Z",
        status: "in-progress",
      },
    ],
  },
}

export interface MayorTradeInsights {
  totalUMKM: number
  umkmGrowth: number
  businessPermits: number
  permitGrowth: number
  activeMarkets: number
  marketCoverage: number
  priceCompliance: number
  responseTime: string
  consumerComplaints: number
  complaintResolution: number
  satisfactionIndex: number
}

export const mayorTradeInsights: MayorTradeInsights = {
  totalUMKM: 18730,
  umkmGrowth: 9,
  businessPermits: 1120,
  permitGrowth: 6,
  activeMarkets: 42,
  marketCoverage: 100,
  priceCompliance: 91.3,
  responseTime: "1.8 hari",
  consumerComplaints: 87,
  complaintResolution: 76,
  satisfactionIndex: 88.7,
}

export function getDepartmentStats(department: string): DepartmentStats | undefined {
  return departmentStats[department]
}

export function getAllDepartmentsSummary() {
  return Object.values(departmentStats).map((dept) => ({
    department: dept.department,
    departmentName: dept.departmentName,
    totalUsers: dept.totalUsers,
    monthlyRequests: dept.monthlyRequests,
    completionRate: dept.completionRate,
  }))
}

export function getCityWideStats(): CityWideStats {
  const allDepartments = Object.values(departmentStats)

  const totalUsers = allDepartments.reduce((sum, dept) => sum + dept.totalUsers, 0)
  const totalServices = allDepartments.reduce((sum, dept) => sum + dept.activeServices, 0)
  const totalMonthlyRequests = allDepartments.reduce((sum, dept) => sum + dept.monthlyRequests, 0)
  const avgCompletionRate = allDepartments.reduce((sum, dept) => sum + dept.completionRate, 0) / allDepartments.length

  const topPerformingDepartments = allDepartments
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 5)
    .map((dept) => ({
      department: dept.department,
      departmentName: dept.departmentName,
      completionRate: dept.completionRate,
      monthlyRequests: dept.monthlyRequests,
    }))

  const cityWideActivities = allDepartments
    .flatMap((dept) =>
      dept.recentActivities.map((activity) => ({
        ...activity,
        department: dept.department,
        departmentName: dept.departmentName,
      })),
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)

  const departmentComparison = allDepartments.map((dept) => ({
    department: dept.department,
    departmentName: dept.departmentName,
    totalUsers: dept.totalUsers,
    monthlyRequests: dept.monthlyRequests,
    completionRate: dept.completionRate,
    trend:
      dept.completionRate > 90 ? ("up" as const) : dept.completionRate > 80 ? ("stable" as const) : ("down" as const),
  }))

  return {
    totalUsers,
    totalDepartments: allDepartments.length,
    totalServices,
    totalMonthlyRequests,
    avgCompletionRate: Math.round(avgCompletionRate * 10) / 10,
    avgResponseTime: "2.1 hari",
    topPerformingDepartments,
    cityWideActivities,
    departmentComparison,
  }
}

export function getMayorTradeInsights(): MayorTradeInsights {
  return mayorTradeInsights
}

export function getFilteredStatsForRole(userRole: string, userDepartment: string) {
  if (userRole === "walikota") {
    return {
      type: "citywide",
      data: getCityWideStats(),
    }
  } else if (userRole === "kepala_dinas") {
    return {
      type: "department",
      data: getDepartmentStats(userDepartment),
    }
  }

  return {
    type: "basic",
    data: getDepartmentStats(userDepartment || "umum"),
  }
}
