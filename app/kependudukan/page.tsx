'use client'

import { BarChart } from '@/components/charts/BarChart'
import { BarChart2 } from '@/components/charts/BarChart2'
import { LineChart } from '@/components/charts/LineChart'
import Navbar from "@/components/navbar"
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const dummyDataMap = {
  'BACUKIKI': {
    baduta_laki: 12,
    baduta_perempuan: 18,
    baduta: 30,
    catin: 10,
    bumil: 24,
    pasca_persalinan: 5,
    bumil_usia_remaja: 3,
    bumil_usia_ideal: 18,
    bumil_usia_risiko: 3,
  },
  'BACUKIKI BARAT': {
    baduta_laki: 15,
    baduta_perempuan: 15,
    baduta: 30,
    catin: 5,
    bumil: 12,
    pasca_persalinan: 2,
    bumil_usia_remaja: 1,
    bumil_usia_ideal: 10,
    bumil_usia_risiko: 1,
  },
  'SOREANG': {
    baduta_laki: 23,
    baduta_perempuan: 21,
    baduta: 32,
    catin: 2,
    bumil: 13,
    pasca_persalinan: 3,
    bumil_usia_remaja: 10,
    bumil_usia_ideal: 15,
    bumil_usia_risiko: 3,
  },
  'UJUNG': {
    baduta_laki: 13,
    baduta_perempuan: 11,
    baduta: 22,
    catin: 21,
    bumil: 3,
    pasca_persalinan: 4,
    bumil_usia_remaja: 11,
    bumil_usia_ideal: 10,
    bumil_usia_risiko: 30,
  },
}

const dummyProps = {
  totalPerKategori: 1280,
  totalStunting: 456,
  totalPerkembangan: 230,
  persentasebaduta: '18.2%',
  persentasebumil: '7.6%',
}

export default function DashboardPage() {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('')

  const data = useMemo(() => {
    if (selectedKecamatan && dummyDataMap[selectedKecamatan]) {
      return dummyDataMap[selectedKecamatan]
    }

    return Object.values(dummyDataMap).reduce((acc, cur) => {
      Object.keys(cur).forEach((key) => {
        acc[key] = (acc[key] || 0) + cur[key]
      })
      return acc
    }, {} as any)
  }, [selectedKecamatan])

    const pieDataBaduta = {
        labels: ['Laki-laki', 'Perempuan'],
        datasets: [
        {
            label: 'Baduta',
            data: [data.baduta_laki, data.baduta_perempuan],
            backgroundColor: ['#35AC3E', '#083358'],
        },
        ],
    }

  const barDataBumil = {
    labels: ['Remaja', 'Usia Ideal', 'Risiko'],
    datasets: [
      {
        label: 'Bumil',
        data: [data.bumil_usia_remaja, data.bumil_usia_ideal, data.bumil_usia_risiko],
        backgroundColor: ['#35AC3E', '#0F4C75', '#50B08C'],
      },
    ],
  }

  return (
    <main className="min-h-screen p-6 bg-[#F9FAFB] text-[#083358] space-y-8">
    <Navbar />
      <div className="mb-6 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#35AC3E] hover:text-[#2b8b33] mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-[#083358] mb-2">
            Portal Informasi DPPKB
          </h1>

          <p className="text-base text-gray-700 leading-relaxed text-justify">
            Platform digital yang menyajikan data terkait total penduduk, total stunting, baduta yang mendapatkan terapi, baduta yang terkena stunting, serta ibu hamil yang mengalami stunting. Portal ini mendukung pengambilan keputusan yang efektif dan berbasis data.
          </p>
        </div>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#35AC3E] text-white">
          <CardContent className="p-4">
            <p className="text-sm opacity-90">Total Penduduk</p>
            <p className="text-2xl font-semibold">{dummyProps.totalPerKategori}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#35AC3E] text-white">
          <CardContent className="p-4">
            <p className="text-sm opacity-90">Total Stunting</p>
            <p className="text-2xl font-semibold">{dummyProps.totalStunting}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#35AC3E] text-white">
          <CardContent className="p-4">
            <p className="text-sm opacity-90">Baduta Dapat Terapi</p>
            <p className="text-2xl font-semibold">{dummyProps.totalPerkembangan}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#083358]">
          <CardContent className="p-4">
            <p className="text-sm text-[#083358]">Baduta Terkena Stunting</p>
            <p className="text-2xl font-semibold text-[#35AC3E]">{dummyProps.persentasebaduta}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#083358]">
          <CardContent className="p-4">
            <p className="text-sm text-[#083358]">Bumil Terkena Stunting</p>
            <p className="text-2xl font-semibold text-[#35AC3E]">{dummyProps.persentasebumil}</p>
          </CardContent>
        </Card>
      </div>
      {/* Dropdown Kecamatan */}
      <div className="flex justify-end">
        <div className="text-right">
            <label className="mr-2 font-medium">Pilih Kecamatan:</label>
            <select
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="border border-[#083358] text-[#083358] px-3 py-2 rounded-md"
            >
            <option value="">Semua Kecamatan</option>
            {Object.keys(dummyDataMap).map((nama) => (
                <option key={nama} value={nama}>
                {nama}
                </option>
            ))}
            </select>
        </div>
    </div>

      {/* Statistik Baduta & Bumil */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card className="bg-[#083358] text-white">
        <CardContent className="p-4">
        <p className="text-sm opacity-90">Total Baduta</p>
        <p className="text-2xl font-semibold">👶 {data.baduta}</p>
        <p className="text-sm mt-1">
            👦 Laki: {data.baduta_laki} | 👧 Perempuan: {data.baduta_perempuan}
        </p>
        </CardContent>
    </Card>

    <Card className="bg-[#083358] text-white">
        <CardContent className="p-4">
        <p className="text-sm opacity-90">Total Ibu Hamil</p>
        <p className="text-2xl font-semibold">🤰 {data.bumil}</p>
        <p className="text-sm mt-1">
            Remaja: {data.bumil_usia_remaja} | Ideal: {data.bumil_usia_ideal} | Risiko: {data.bumil_usia_risiko}
        </p>
        </CardContent>
    </Card>
    </div>

      <Separator className="my-6" />

      {/* Grafik Chart.js */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
        <Card className="p-4 border border-[#083358] rounded-2xl shadow bg-white">
        <h3 className="text-lg font-semibold text-center mb-2">Sebaran Baduta</h3>
        <div className="w-60 h-60 mx-auto"> {/* Ini mengecilkan ukuran Pie */}
            <Pie data={pieDataBaduta} />
        </div>
        </Card>

        <Card className="p-4 border border-[#083358] rounded-2xl shadow bg-white">
          <h3 className="text-lg font-semibold text-center mb-2">Kategori Bumil</h3>
          <Bar data={barDataBumil} />
        </Card>
      </div>

      {/* Komponen Grafik Kustom */}
      <div className="space-y-6 mt-10">
        <h2 className="text-xl font-bold text-[#083358] mb-2">Grafik Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-[#083358]">
            <CardContent className="p-4">
              <p className="text-[#083358] font-semibold mb-2">JUMLAH KATEGORI TIAP KECAMATAN</p>
              <BarChart />
            </CardContent>
          </Card>

          <Card className="border border-[#083358]">
            <CardContent className="p-4">
              <p className="text-[#083358] font-semibold mb-2">LAJU PERKEMBANGAN STUNTING</p>
              <LineChart />
            </CardContent>
          </Card>

          <Card className="border border-[#083358]">
            <CardContent className="p-4">
              <p className="text-[#083358] font-semibold mb-2">JUMLAH TERKENA DAN TIDAK TERKENA STUNTING</p>
              <BarChart2 />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
