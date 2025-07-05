"use client"

import Link from "next/link"
import { useState } from "react"
import { fertilizerDistributionData } from "@/lib/data/trading-services"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function FertilizerDistributionPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Kecamatan")

  const { summary, distribution, storeData } = fertilizerDistributionData

  const pieData = [{ name: "NPK", value: 36, color: "#ef4444" }]

  const barData = [{ year: "2025", total: 166 }]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/trading" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Layanan Perdagangan
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">Sobat Distributor Kota Parepare</h1>
          <p className="text-gray-600">Temukan Kemudahan dalam mengecek distribusi barang bersubsidi</p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <div className="relative inline-block">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50">
              <span>{selectedDistrict}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Distribution Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {distribution.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{item.area}</span>
                <span className="text-2xl font-bold text-gray-900">{item.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Jumlah Toko</h3>
            <p className="text-4xl font-bold text-gray-900 mb-1">{summary.totalStores}</p>
            <p className="text-gray-600">Toko</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Jumlah Pupuk Terdistribusi</h3>
            <p className="text-4xl font-bold text-gray-900 mb-1">{summary.totalFertilizerDistributed}</p>
            <p className="text-gray-600">Sak</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Informasi Penyaluran</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">NPK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Table */}
        <div className="bg-orange-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Distribusi Penyaluran Pupuk</h2>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Nama Usaha</th>
                    <th className="px-6 py-4 text-left font-semibold">No. Register</th>
                    <th className="px-6 py-4 text-center font-semibold" colSpan={3}>
                      Jumlah Distribusi
                    </th>
                  </tr>
                  <tr className="bg-slate-700 text-white">
                    <th className="px-6 py-2"></th>
                    <th className="px-6 py-2"></th>
                    <th className="px-6 py-2 text-center font-medium">UREA</th>
                    <th className="px-6 py-2 text-center font-medium">NPK</th>
                    <th className="px-6 py-2 text-center font-medium">NPK-FK</th>
                  </tr>
                </thead>
                <tbody>
                  {storeData.map((store, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-medium text-gray-900">{store.name}</td>
                      <td className="px-6 py-4 text-gray-700">{store.registrationNumber}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{store.urea}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{store.npk}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{store.npkFk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Grafik Perkembangan Pupuk</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                  label={{ value: "Total Penyaluran", angle: -90, position: "insideLeft" }}
                />
                <Bar dataKey="total" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-3 bg-cyan-500 rounded"></div>
              <span className="text-sm text-gray-600">Total Penyaluran Pupuk per Tahun</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
