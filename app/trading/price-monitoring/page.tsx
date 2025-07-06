'use client';

import Navbar from "@/components/navbar";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const dummyData = [
  {
    kategori: 'Buah',
    items: [
      {
        namaBarang: 'Pisang',
        pasar: [
          {
            namaPasar: 'Pasar Sumpang',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 15000,
            kemarin: 14800,
            selisihPersen: 1.35,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [14000, 14200, 14500, 14700, 14600, 14800, 15000],
          },
          {
            namaPasar: 'Pasar Lakessi',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 15200,
            kemarin: 15100,
            selisihPersen: 0.66,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [14300, 14450, 14700, 14900, 15000, 15100, 15200],
          },
        ],
      },
      {
        namaBarang: 'Apel',
        pasar: [
          {
            namaPasar: 'Pasar Sumpang',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 25500,
            kemarin: 26000,
            selisihPersen: -1.92,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [25000, 25200, 25800, 26000, 26000, 26000, 25500],
          },
          {
            namaPasar: 'Pasar Lakessi',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 24500,
            kemarin: 25000,
            selisihPersen: -2,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [24000, 24200, 24600, 24800, 25000, 25000, 24500],
          },
        ],
      },
    ],
  },
  {
    kategori: 'Sayur',
    items: [
      {
        namaBarang: 'Bayam',
        pasar: [
          {
            namaPasar: 'Pasar Sumpang',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 7000,
            kemarin: 6800,
            selisihPersen: 2.94,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [6000, 6200, 6500, 6600, 6700, 6800, 7000],
          },
          {
            namaPasar: 'Pasar Lakessi',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 7300,
            kemarin: 7100,
            selisihPersen: 2.82,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [6200, 6400, 6700, 6800, 7000, 7100, 7300],
          },
        ],
      },
      {
        namaBarang: 'Wortel',
        pasar: [
          {
            namaPasar: 'Pasar Sumpang',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 9200,
            kemarin: 9000,
            selisihPersen: 2.22,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [8700, 8800, 8900, 9000, 9000, 9000, 9200],
          },
          {
            namaPasar: 'Pasar Lakessi',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 9400,
            kemarin: 9200,
            selisihPersen: 2.17,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [8900, 9000, 9100, 9200, 9200, 9200, 9400],
          },
        ],
      },
    ],
  },
  {
    kategori: 'Daging',
    items: [
      {
        namaBarang: 'Daging Ayam',
        pasar: [
          {
            namaPasar: 'Pasar Sumpang',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 38500,
            kemarin: 38000,
            selisihPersen: 1.32,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [36000, 36500, 37000, 37500, 37800, 38000, 38500],
          },
          {
            namaPasar: 'Pasar Lakessi',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 39500,
            kemarin: 39000,
            selisihPersen: 1.28,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [36500, 37000, 37500, 38000, 38500, 39000, 39500],
          },
        ],
      },
      {
        namaBarang: 'Daging Sapi',
        pasar: [
          {
            namaPasar: 'Pasar Sumpang',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 121000,
            kemarin: 120000,
            selisihPersen: 0.83,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [118000, 119000, 119500, 120000, 120000, 120000, 121000],
          },
          {
            namaPasar: 'Pasar Lakessi',
            tanggal: 'Minggu, 07 Jul 2025',
            hariIni: 122500,
            kemarin: 121000,
            selisihPersen: 1.24,
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            data: [119000, 120000, 120500, 121000, 121000, 121000, 122500],
          },
        ],
      },
    ],
  },
];

export default function SobatHargaPage() {
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedBarang, setSelectedBarang] = useState('');

  const kategoriOptions = dummyData.map((d) => d.kategori);

  const handleResetBarang = () => setSelectedBarang('');

  // Filter data sesuai pilihan
  let filteredItems = [];

  if (!selectedKategori && !selectedBarang) {
    // Semua data jika tidak ada filter
    filteredItems = dummyData.flatMap((d) =>
      d.items.map((item) => ({ ...item }))
    );
  } else if (selectedKategori && !selectedBarang) {
    // Semua barang dalam 1 kategori
    const found = dummyData.find((d) => d.kategori === selectedKategori);
    filteredItems = found?.items.map((item) => ({ ...item })) || [];
  } else if (selectedKategori && selectedBarang) {
    // Barang spesifik
    const found = dummyData.find((d) => d.kategori === selectedKategori);
    const item = found?.items.find((i) => i.namaBarang === selectedBarang);
    if (item) filteredItems = [{ ...item }];
  }

  const barangOptions =
    dummyData.find((d) => d.kategori === selectedKategori)?.items.map((i) => i.namaBarang) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <Navbar/>
              <Link href="/trading" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 mt-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Layanan Perdagangan
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">Sobat Harga Kota Parepare</h1>
          <p className="text-gray-600">Temukan Kemudahan dalam mengecek harga barang</p>
        </div>

      {/* Filter Dropdown */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative">
          <select
            className="px-6 py-2 border border-[#083358] rounded-xl bg-white text-[#083358] font-medium focus:ring-2 focus:ring-[#083358] focus:outline-none transition duration-200"
            value={selectedKategori}
            onChange={(e) => {
              setSelectedKategori(e.target.value);
              handleResetBarang();
            }}
          >
            <option value="">Semua Kategori</option>
            {kategoriOptions.map((kat, idx) => (
              <option key={idx} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        {selectedKategori && (
          <div className="relative">
            <select
              className="px-6 py-2 border border-[#083358] rounded-xl bg-white text-[#083358] font-medium focus:ring-2 focus:ring-[#083358] focus:outline-none transition duration-200"
              value={selectedBarang}
              onChange={(e) => setSelectedBarang(e.target.value)}
            >
              <option value="">Semua Barang</option>
              {barangOptions.map((nama, idx) => (
                <option key={idx} value={nama}>
                  {nama}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>


      {/* Tampilkan semua item yang terfilter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item, index) =>
          item.pasar.map((pasar, i) => {
            const selisih = pasar.hariIni - pasar.kemarin;
            const naik = selisih > 0;
            const turun = selisih < 0;

            const chartData = {
              labels: pasar.labels,
              datasets: [
                {
                  label: item.namaBarang,
                  data: pasar.data,
                  borderColor: '#083358',
                  tension: 0.2,
                },
              ],
            };

            const chartOptions = {
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2,
              plugins: {
                legend: {
                  display: false,
                },
              },
            };

            return (
              <div
                key={`${index}-${i}`}
                className="p-4 bg-white border shadow-lg rounded-xl w-full"
              >
                <div className="bg-[#083358] text-white text-center py-2 rounded-t-xl mb-4 text-lg font-semibold">
                  {item.namaBarang} - {pasar.namaPasar}
                </div>

                <div className="text-center text-sm text-gray-600 mb-4">
                  Terakhir diperbarui:{' '}
                  <span className="font-semibold text-black">{pasar.tanggal}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm text-center text-gray-700 mb-4">
                  <div>
                    <div className="font-semibold">Hari Ini</div>
                    <div className="text-base font-bold text-black">
                      Rp. {pasar.hariIni.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Kemarin</div>
                    <div className="text-base font-bold text-black">
                      Rp. {pasar.kemarin.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Selisih</div>
                    <div
                      className={`text-base font-bold ${
                        naik ? 'text-green-600' : turun ? 'text-red-600' : 'text-gray-600'
                      }`}
                    >
                      {selisih > 0 && '+'}
                      {selisih.toLocaleString()} ({pasar.selisihPersen}%)
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

