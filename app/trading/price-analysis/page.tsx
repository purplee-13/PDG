'use client';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const lokasiOptions = ['Pasar Sumpang', 'Pasar Lakessi'];
const barangs = ['Beras', 'Cabai', 'Telur', 'Minyak'];
const tanggalList = ['2025-07-01', '2025-07-02', '2025-07-03'];

const dataHarga: Record<string, Record<string, number>> = {
  '2025-07-01': { Beras: 10000, Cabai: 20000, Telur: 18000, Minyak: 14000 },
  '2025-07-02': { Beras: 10200, Cabai: 22000, Telur: 18500, Minyak: 14500 },
  '2025-07-03': { Beras: 10100, Cabai: 21000, Telur: 18200, Minyak: 14200 },
};

const topHargaNaik = [
  { label: 'Cabai', price_change: 2000, color: '#f87171' },
  { label: 'Telur', price_change: 700, color: '#facc15' },
];

const topHargaTurun = [
  { label: 'Minyak', price_change: 1000, color: '#60a5fa' },
  { label: 'Beras', price_change: 500, color: '#34d399' },
];

export default function AnalisisPage() {
  const [selectedLokasi, setSelectedLokasi] = useState('Pasar Sumpang');
  const [tanggalAwal, setTanggalAwal] = useState('2025-07-01');
  const [tanggalAkhir, setTanggalAkhir] = useState('2025-07-03');

  const hargaKemarin = dataHarga['2025-07-02'];
  const hargaHariIni = dataHarga['2025-07-03'];

  return (
    <div className="min-h-screen p-4 space-y-4 bg-gray-50">
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
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Filter Tanggal</span>
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
                          {dataHarga[tanggal]?.[barang]?.toLocaleString('id-ID') ?? '-'}
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
          <div className="min-w-[1000px] h-80">
            <Bar
              data={{
                labels: barangs,
                datasets: [
                  {
                    label: 'Kemarin',
                    backgroundColor: '#f87171',
                    data: barangs.map((item) => hargaKemarin[item]),
                    barThickness: 30,
                  },
                  {
                    label: 'Hari Ini',
                    backgroundColor: '#34d399',
                    data: barangs.map((item) => hargaHariIni[item]),
                    barThickness: 30,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value: number | string) {
                        return `Rp${Number(value).toLocaleString('id-ID')}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
