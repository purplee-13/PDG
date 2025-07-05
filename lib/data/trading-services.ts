export interface TradingService {
  id: string
  title: string
  description: string
  icon: string
  color: string
  route: string
}

export interface PriceData {
  date: string
  today: number
  yesterday: number
  difference: number
}

export interface MarketPrice {
  market: string
  lastUpdated: string
  data: PriceData
  chartData: Array<{
    date: string
    price: number
  }>
}

export interface FertilizerDistribution {
  area: string
  urea: number
  npkFk: number
  npk: number
}

export interface IndustryData {
  name: string
  address: string
  certificate: string
  registrationNumber: string
}

export const tradingServices: TradingService[] = [
  {
    id: "sobat-harga",
    title: "Sobat Harga",
    description: "Monitoring dan analisis harga komoditas pangan",
    icon: "TrendingUp",
    color: "bg-green-500",
    route: "/trading/price-monitoring",
  },
  {
    id: "distribusi-pupuk",
    title: "Distribusi Pupuk",
    description: "Sistem distribusi dan monitoring pupuk bersubsidi",
    icon: "ShoppingCart",
    color: "bg-blue-500",
    route: "/trading/fertilizer-distribution",
  },
  {
    id: "analisis-harga",
    title: "Analisis Harga Bahan Pokok",
    description: "Analisis tren harga bahan pokok dan komoditas",
    icon: "BarChart3",
    color: "bg-orange-500",
    route: "/trading/price-analysis",
  },
  {
    id: "data-ikm",
    title: "Data Industri Kecil Menengah",
    description: "Database dan statistik industri kecil menengah",
    icon: "Building2",
    color: "bg-purple-500",
    route: "/trading/sme-data",
  },
]

// Sample data for price monitoring
export const priceMonitoringData = {
  commodity: "Beras Varietas Kristal (Premium)/Kg",
  markets: [
    {
      market: "Pasar Sumpang",
      lastUpdated: "Selasa, 01 Jul 2025",
      data: {
        date: "01 Jul 2025",
        today: 20000,
        yesterday: 22000,
        difference: -2000,
      },
      chartData: [
        { date: "27 Jun", price: 23500 },
        { date: "28 Jun", price: 21000 },
        { date: "29 Jun", price: 24000 },
        { date: "30 Jun", price: 20000 },
        { date: "01 Jul", price: 20000 },
        { date: "02 Jul", price: 20000 },
      ],
    },
    {
      market: "Pasar Lakessi",
      lastUpdated: "Selasa, 01 Jul 2025",
      data: {
        date: "01 Jul 2025",
        today: 20000,
        yesterday: 22000,
        difference: -2000,
      },
      chartData: [
        { date: "27 Jun", price: 23500 },
        { date: "28 Jun", price: 21000 },
        { date: "29 Jun", price: 24000 },
        { date: "30 Jun", price: 20000 },
        { date: "01 Jul", price: 20000 },
        { date: "02 Jul", price: 20000 },
      ],
    },
  ],
}

// Sample data for fertilizer distribution
export const fertilizerDistributionData = {
  summary: {
    totalStores: 10,
    totalFertilizerDistributed: 100,
  },
  distribution: [
    {
      area: "UREA",
      count: 25,
    },
    {
      area: "NPK-FK",
      count: 30,
    },
    {
      area: "NPK",
      count: 120,
    },
  ],
  storeData: [
    {
      name: "Toko Uceng",
      registrationNumber: "0923",
      urea: 0,
      npk: 36,
      npkFk: 0,
    },
  ],
}

// Sample data for SME industry
export const smeIndustryData = {
  summary: {
    totalIndustries: 100,
    halalCertified: 59,
  },
  halalCertifiedList: [
    {
      name: "US.Reski",
      address: "Jl. Jend Sudirman",
      certificate: "Lihat Sertifikat",
      registrationNumber: "001",
    },
    {
      name: "US.Reski",
      address: "Jl. Jend Sudirman",
      certificate: "Lihat Sertifikat",
      registrationNumber: "002",
    },
    {
      name: "US.Reski",
      address: "Jl. Jend Sudirman",
      certificate: "Lihat Sertifikat",
      registrationNumber: "003",
    },
  ],
  growthData: [{ year: "2025", count: 2 }],
}
