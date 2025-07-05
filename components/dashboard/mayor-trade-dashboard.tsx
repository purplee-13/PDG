"use client"

import { getMayorTradeInsights } from "@/lib/data/dashboard-stats"
import { Store, FileText, MapPin, TrendingUp, AlertCircle, Star, BarChart3 } from "lucide-react"

export default function MayorTradeDashboard() {
  const tradeStats = getMayorTradeInsights()

  const formatNumber = (num: number) => {
    return num.toLocaleString("id-ID")
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dinas Perdagangan</h1>
            <p className="text-gray-600 mt-1">Walikota Insight View</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Hari ini</p>
            <p className="text-lg font-semibold text-gray-900">Sabtu, 5 Juli 2025</p>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total UMKM Terdaftar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total UMKM Terdaftar</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(tradeStats.totalUMKM)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{tradeStats.umkmGrowth}% dari bulan lalu</span>
          </div>
        </div>

        {/* Izin Usaha Diterbitkan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Izin Usaha Diterbitkan</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(tradeStats.businessPermits)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{tradeStats.permitGrowth}% dari bulan lalu</span>
          </div>
        </div>

        {/* Pasar Aktif Terpantau */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pasar Aktif Terpantau</p>
              <p className="text-3xl font-bold text-gray-900">{tradeStats.activeMarkets} pasar</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">{tradeStats.marketCoverage}% dilaporkan aktif</span>
          </div>
        </div>

        {/* Kepatuhan Harga Komoditas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kepatuhan Harga Komoditas</p>
              <p className="text-3xl font-bold text-gray-900">{tradeStats.priceCompliance}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Waktu respons aduan: {tradeStats.responseTime}</span>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumer Complaints */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aduan Konsumen</h3>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Aduan Masuk</span>
                <span className="text-2xl font-bold text-gray-900">{tradeStats.consumerComplaints}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(tradeStats.complaintResolution)}`}
                  style={{ width: `${tradeStats.complaintResolution}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{tradeStats.complaintResolution}% terselesaikan</p>
            </div>
          </div>
        </div>

        {/* Satisfaction Index */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Indeks Kepuasan Pelayanan</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{tradeStats.satisfactionIndex}%</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(tradeStats.satisfactionIndex / 20)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Berdasarkan survei pelayanan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Ringkasan Kinerja</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Pertumbuhan UMKM</h4>
            <p className="text-2xl font-bold text-green-600">+{tradeStats.umkmGrowth}%</p>
            <p className="text-sm text-gray-600">Target tercapai</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Efisiensi Perizinan</h4>
            <p className="text-2xl font-bold text-blue-600">{tradeStats.responseTime}</p>
            <p className="text-sm text-gray-600">Waktu rata-rata</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Stabilitas Harga</h4>
            <p className="text-2xl font-bold text-purple-600">{tradeStats.priceCompliance}%</p>
            <p className="text-sm text-gray-600">Kepatuhan pasar</p>
          </div>
        </div>
      </div>
    </div>
  )
}
