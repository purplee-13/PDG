"use client"

import { useAuth } from "@/lib/auth/auth-context"
import type { CityWideStats } from "@/lib/data/dashboard-stats"
import { TrendingUp, Users, Building2, FileText, BarChart3, Target, Award, Activity } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface CityStatisticsProps {
  data: CityWideStats | undefined
}

export default function CityStatistics({ data }: CityStatisticsProps) {
  const { user } = useAuth()

  if (!data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Statistik Kota Tidak Tersedia</h2>
        <p className="text-gray-600">Data statistik kota belum tersedia.</p>
      </div>
    )
  }

  const radarData = data.topPerformingDepartments.map((dept) => ({
    department: dept.departmentName.substring(0, 10),
    performance: dept.completionRate,
    requests: dept.monthlyRequests / 100, // Scale down for radar
  }))

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-100"
      case "down":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />
      case "down":
        return <TrendingUp className="w-4 h-4 transform rotate-180" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Statistik Kota Parepare</h1>
            <p className="mt-1 text-blue-100">Analisis komprehensif seluruh dinas dan layanan kota</p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Akses Penuh - Semua Data Kota
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Periode Analisis</p>
            <p className="text-xl font-semibold">12 Bulan Terakhir</p>
          </div>
        </div>
      </div>

      {/* City-wide Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pengguna Kota</p>
              <p className="text-3xl font-bold text-gray-900">{data.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">Seluruh dinas aktif</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Dinas</p>
              <p className="text-3xl font-bold text-gray-900">{data.totalDepartments}</p>
              <p className="text-sm text-green-600 mt-1">Semua beroperasi</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Layanan</p>
              <p className="text-3xl font-bold text-gray-900">{data.totalServices}</p>
              <p className="text-sm text-blue-600 mt-1">Lintas dinas</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Permohonan Total</p>
              <p className="text-3xl font-bold text-gray-900">{data.totalMonthlyRequests.toLocaleString()}</p>
              <p className="text-sm text-purple-600 mt-1">{data.avgCompletionRate}% selesai</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Perbandingan Kinerja Dinas</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.departmentComparison} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="departmentName" type="category" axisLine={false} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="completionRate" fill="#10b981" name="Tingkat Penyelesaian (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Radar Kinerja Dinas</h3>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="department" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Kinerja"
                  dataKey="performance"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Department Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Analisis Detail Semua Dinas</h3>
          <Building2 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ranking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Dinas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pengguna
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permohonan/Bulan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tingkat Penyelesaian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.departmentComparison
                .sort((a, b) => b.completionRate - a.completionRate)
                .map((dept, index) => (
                  <tr key={dept.department} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-600"
                              : index === 1
                                ? "bg-gray-100 text-gray-600"
                                : index === 2
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <span className="text-sm font-bold">#{index + 1}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{dept.departmentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.totalUsers.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.monthlyRequests.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              dept.completionRate >= 95
                                ? "bg-green-500"
                                : dept.completionRate >= 90
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${dept.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{dept.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(dept.trend)}`}
                      >
                        {getTrendIcon(dept.trend)}
                        <span className="ml-1">
                          {dept.trend === "up" ? "Naik" : dept.trend === "down" ? "Turun" : "Stabil"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          dept.completionRate >= 95
                            ? "bg-green-100 text-green-800"
                            : dept.completionRate >= 90
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dept.completionRate >= 95
                          ? "Excellent"
                          : dept.completionRate >= 90
                            ? "Good"
                            : "Needs Improvement"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* City Performance Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Ringkasan Kinerja Kota</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Efisiensi Kota</h4>
            <p className="text-3xl font-bold text-green-600 mb-1">{data.avgCompletionRate}%</p>
            <p className="text-sm text-gray-600">Rata-rata semua dinas</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.avgCompletionRate}%` }}></div>
            </div>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Penetrasi Layanan</h4>
            <p className="text-3xl font-bold text-blue-600 mb-1">78%</p>
            <p className="text-sm text-gray-600">Dari total populasi</p>
            <div className="mt-3 inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Target Tercapai
            </div>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Waktu Respon</h4>
            <p className="text-3xl font-bold text-orange-600 mb-1">{data.avgResponseTime}</p>
            <p className="text-sm text-gray-600">Rata-rata kota</p>
            <div className="mt-3 inline-flex px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
              Dalam Target
            </div>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Kepuasan Masyarakat</h4>
            <p className="text-3xl font-bold text-purple-600 mb-1">4.6/5</p>
            <p className="text-sm text-gray-600">Survei kota 2024</p>
            <div className="mt-3 flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
