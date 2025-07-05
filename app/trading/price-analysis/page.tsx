'use client';

import Navbar from "@/components/navbar";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const lokasiOptions = ['Pasar Sumpang', 'Pasar Lakessi'];
const barangs = [
  'Beras', 'Cabai', 'Telur', 'Minyak', 'Gula',
  'Daging Ayam', 'Daging Sapi', 'Ikan', 'Bawang Merah', 'Bawang Putih'
];
const tanggalList = ['2025-07-01', '2025-07-02', '2025-07-03'];

// Struktur dataHarga baru: { [tanggal]: { [lokasi]: { [barang]: harga } } }
const dataHarga: Record<
  string,
  Record<string, Record<string, number>>
> = {
  '2025-07-01': {
    'Pasar Sumpang': {
      Beras: 10000,
      Cabai: 20000,
      Telur: 18000,
      Minyak: 14000,
      Gula: 13000,
      'Daging Ayam': 32000,
      'Daging Sapi': 90000,
      Ikan: 27000,
      'Bawang Merah': 25000,
      'Bawang Putih': 24000,
    },
    'Pasar Lakessi': {
      Beras: 10200,
      Cabai: 21000,
      Telur: 18200,
      Minyak: 14200,
      Gula: 13200,
      'Daging Ayam': 33000,
      'Daging Sapi': 92000,
      Ikan: 27500,
      'Bawang Merah': 26000,
      'Bawang Putih': 24500,
    },
  },
  '2025-07-02': {
    'Pasar Sumpang': {
      Beras: 10100,
      Cabai: 21500,
      Telur: 18300,
      Minyak: 14100,
      Gula: 13100,
      'Daging Ayam': 32500,
      'Daging Sapi': 91000,
      Ikan: 27200,
      'Bawang Merah': 25500,
      'Bawang Putih': 24200,
    },
    'Pasar Lakessi': {
      Beras: 10300,
      Cabai: 22000,
      Telur: 18600,
      Minyak: 14300,
      Gula: 13300,
      'Daging Ayam': 33500,
      'Daging Sapi': 93000,
      Ikan: 27800,
      'Bawang Merah': 26200,
      'Bawang Putih': 24800,
    },
  },
  '2025-07-03': {
    'Pasar Sumpang': {
      Beras: 10200,
      Cabai: 21200,
      Telur: 18100,
      Minyak: 13900,
      Gula: 13200,
      'Daging Ayam': 32100,
      'Daging Sapi': 90500,
      Ikan: 26800,
      'Bawang Merah': 25200,
      'Bawang Putih': 23900,
    },
    'Pasar Lakessi': {
      Beras: 10400,
      Cabai: 21800,
      Telur: 18500,
      Minyak: 14100,
      Gula: 13400,
      'Daging Ayam': 33800,
      'Daging Sapi': 93500,
      Ikan: 28000,
      'Bawang Merah': 26500,
      'Bawang Putih': 25000,
    },
  },
};

const topHargaNaik = [
  { label: 'Cabai', price_change: 1000, color: '#60a5fa' },
  { label: 'Daging Sapi', price_change: 1000, color: '#fbbf24' },
  { label: 'Daging Ayam', price_change: 450, color: '#fbbf24' },
  { label: 'Bawang Merah', price_change: 350, color: '#fbbf24' },
  { label: 'Gula', price_change: 200, color: '#c084fc' },
];

const topHargaTurun = [
  { label: 'Telur', price_change: 120, color: '#60a5fa' },
  { label: 'Cabai', price_change: 180, color: '#34d399' },
  { label: 'Ikan', price_change: 90, color: '#fbbf24' },
  { label: 'Gula', price_change: 75, color: '#fbbf24' },
  { label: 'Bawang Putih', price_change: 110, color: '#c084fc' },
];


export default function AnalisisPage() {
  const [selectedLokasi, setSelectedLokasi] = useState('Pasar Sumpang');
  const [tanggalAwal, setTanggalAwal] = useState('2025-07-01');
  const [tanggalAkhir, setTanggalAkhir] = useState('2025-07-03');
  const router = useRouter();
  const hargaKemarin = dataHarga['2025-07-02'];
  const hargaHariIni = dataHarga['2025-07-03'];

  return (
    <div className="min-h-screen p-4 space-y-4 bg-gray-50">
      <Navbar/>
      <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-600 hover:text-green-700 transition border border-green-600 px-4 py-2 rounded-lg mb-4"
        >
          ← <span className="ml-2">Kembali</span>
        </button>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* KIRI */}
        <div className="w-full lg:w-[67.5%] flex flex-col space-y-4">
          {/* Dropdown Pasar */}
          <div>
            <select
              value={selectedLokasi}
              onChange={(e) => setSelectedLokasi(e.target.value)}
              className="bg-[#083458] text-white rounded-xl px-6 py-2 w-full"
            >
              {lokasiOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Tanggal */}
          <div className="p-4 space-y-2 bg-white shadow rounded-xl">
            <div className="flex items-center space-x-2 font-semibold text-gray-700">
              <span className="material-symbols-outlined">Filter</span>
              <span>Tanggal</span>
            </div>
            <form className="flex flex-col items-center gap-4 md:flex-row">
              <div className="flex items-center w-full px-4 py-2 bg-blue-100 rounded-xl md:w-1/2">
                <label className="mr-2 font-semibold">Dari</label>
                <input
                  type="date"
                  value={tanggalAwal}
                  onChange={(e) => setTanggalAwal(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center w-full px-4 py-2 bg-blue-100 rounded-xl md:w-1/2">
                <label className="mr-2 font-semibold">Sampai</label>
                <input
                  type="date"
                  value={tanggalAkhir}
                  onChange={(e) => setTanggalAkhir(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none"
                />
              </div>
            </form>
          </div>

          {/* Tabel Harga */}
          <div className="overflow-x-auto bg-white shadow rounded-xl max-h-[604px]">
            <table className="min-w-full text-sm text-center whitespace-nowrap">
              <thead className="bg-[#083458] text-white sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-2 sticky left-0 bg-[#083458] z-30">TANGGAL</th>
                  {barangs.map((barang) => (
                    <th key={barang} className="px-4 py-2">
                      {barang.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {tanggalList
                  .filter((tgl) => tgl >= tanggalAwal && tgl <= tanggalAkhir)
                  .map((tanggal) => (
                    <tr key={tanggal} className="border-b">
                      <td className="sticky left-0 px-4 py-2 bg-white z-10">{tanggal}</td>
                      {barangs.map((barang) => (
                        <td key={barang} className="px-4 py-2">
                          {dataHarga[tanggal]?.[selectedLokasi]?.[barang]?.toLocaleString('id-ID') ?? '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KANAN */}
        <div className="w-full lg:w-[30%] flex flex-col space-y-4">
          {/* Pie Chart Naik */}
          <div className="p-4 bg-white shadow rounded-xl">
            <h3 className="mb-3 font-semibold text-center text-black">Tren Harga Naik</h3>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <Pie
                  data={{
                    labels: topHargaNaik.map((item) => item.label),
                    datasets: [
                      {
                        data: topHargaNaik.map((item) => item.price_change),
                        backgroundColor: topHargaNaik.map((item) => item.color),
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </div>
              <div className="w-1/2 space-y-2 overflow-y-auto max-h-48">
                {topHargaNaik.map((item) => (
                  <div key={item.label} className="flex items-center text-sm text-gray-700">
                    <span
                      className="inline-block w-3 h-3 mr-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pie Chart Turun */}
          <div className="p-4 bg-white shadow rounded-xl">
            <h3 className="mb-3 font-semibold text-center text-black">Tren Harga Turun</h3>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <Pie
                  data={{
                    labels: topHargaTurun.map((item) => item.label),
                    datasets: [
                      {
                        data: topHargaTurun.map((item) => item.price_change),
                        backgroundColor: topHargaTurun.map((item) => item.color),
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </div>
              <div className="w-1/2 space-y-2 overflow-y-auto max-h-48">
                {topHargaTurun.map((item) => (
                  <div key={item.label} className="flex items-center text-sm text-gray-700">
                    <span
                      className="inline-block w-3 h-3 mr-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top 5 List */}
          <div className="p-4 text-sm bg-white shadow rounded-xl">
            <div className="mb-4">
              <div className="mb-2 font-semibold text-gray-700">Top 5 Harga Naik</div>
              <ul className="space-y-1 text-green-600">
                {topHargaNaik.map((item) => (
                  <li key={item.label}>
                    {item.label} (Naik: Rp{item.price_change.toLocaleString('id-ID')})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 font-semibold text-gray-700">Top 5 Harga Turun</div>
              <ul className="space-y-1 text-red-600">
                {topHargaTurun.map((item) => (
                  <li key={item.label}>
                    {item.label} (Turun: Rp{item.price_change.toLocaleString('id-ID')})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Perbandingan */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="mb-4 font-semibold text-gray-700">Perbandingan Harga Kemarin dan Hari Ini</h2>
        <div className="w-full overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[1000px]" style={{ height: '300px' }}>
              <Bar
                data={{
                  labels: barangs,
                  datasets: [
                    {
                      label: 'Kemarin',
                      backgroundColor: '#f87171',
                      data: [9500, 19500, 17800, 13900 , 12900, 20900, 18200, 10200, 23000, 22000],
                      barThickness: 20, // diperkecil
                    },
                    {
                      label: 'Hari Ini',
                      backgroundColor: '#34d399',
                      data: [10200, 22000, 18500, 14500, 10200, 20000, 18200, 8200, 21300, 21000],
                      barThickness: 20, // diperkecil
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // penting untuk kontrol tinggi manual
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
