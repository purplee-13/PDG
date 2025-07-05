"use client"

import Link from "next/link"
import { useState } from "react"
import { priceMonitoringData } from "@/lib/data/trading-services"
import { ArrowLeft, ChevronDown, TrendingDown, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PriceMonitoringPage() {
  const [selectedCategory, setSelectedCategory] = useState("Kategori")
  const [selectedItem, setSelectedItem] = useState("Barang")

  const { commodity, markets } = priceMonitoringData

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/trading" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Layanan Perdagangan
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">Sobat Harga Kota Parepare</h1>
          <p className="text-gray-600">Temukan Kemudahan dalam mengecek harga barang</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50">
              <span>{selectedCategory}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50">
              <span>{selectedItem}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Commodity Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">{commodity}</h2>
        </div>

        {/* Price Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {markets.map((market, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Market Header */}
              <div className="bg-slate-800 text-white px-6 py-4">
                <h3 className="text-lg font-semibold text-center">{market.market}</h3>
              </div>

              {/* Market Data */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Terakhir diperbarui: <span className="font-medium">{market.lastUpdated}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Hari ini</p>
                      <p className="text-lg font-bold text-gray-900">Rp. {market.data.today.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Kemarin</p>
                      <p className="text-lg font-bold text-gray-900">Rp. {market.data.yesterday.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Selisih</p>
                      <div className="flex items-center justify-center space-x-1">
                        {market.data.difference < 0 ? (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        )}
                        <p
                          className={`text-lg font-bold ${market.data.difference < 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {market.data.difference < 0 ? "- " : ""}Rp.{" "}
                          {Math.abs(market.data.difference).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Change Alert */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                    <div className="flex items-center space-x-2 text-orange-700">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm">
                        Harga barang mengalami <span className="font-semibold">tidak berubah</span> 0.00% dari harga
                        kemarin
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={market.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                        tickFormatter={(value) => `Rp${(value / 1000).toFixed(0)}k`}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm font-medium text-gray-700">Data Harga Penjualan Perhari</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Commodity Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">{commodity}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {markets.map((market, index) => (
            <div
              key={`second-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-slate-800 text-white px-6 py-4">
                <h3 className="text-lg font-semibold text-center">{market.market}</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Terakhir diperbarui: <span className="font-medium">{market.lastUpdated}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Hari ini</p>
                      <p className="text-lg font-bold text-gray-900">Rp. {market.data.today.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Kemarin</p>
                      <p className="text-lg font-bold text-gray-900">Rp. {market.data.yesterday.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Selisih</p>
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingDown className="w-4 h-4 text-green-500" />
                        <p className="text-lg font-bold text-green-600">
                          - Rp. {Math.abs(market.data.difference).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
