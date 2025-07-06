"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/navbar";
import Chart from "chart.js/auto";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";

// Data dummy per kecamatan
const dummyDataPerKecamatan: Record<string, any> = {
  Soreang: {
    jumlahToko: 10,
    totalDistribusi: 5200,
    dataPupuk: {
      UREA: 2000,
      NPK: 2500,
      "NPK-FK": 700,
    },
    dataTabel: [
      {
        nama_usaha: "Toko Soreang Jaya",
        no_register: "SR-001",
        UREA: 300,
        NPK: 400,
        NPK_FK: 100,
      },
    ],
  },
  Bacukiki: {
    jumlahToko: 6,
    totalDistribusi: 3400,
    dataPupuk: {
      UREA: 1300,
      NPK: 1600,
      "NPK-FK": 500,
    },
    dataTabel: [
      {
        nama_usaha: "Toko Bacukiki Sejahtera",
        no_register: "BK-002",
        UREA: 200,
        NPK: 300,
        NPK_FK: 100,
      },
    ],
  },
  "Bacukiki Barat": {
    jumlahToko: 5,
    totalDistribusi: 4100,
    dataPupuk: {
      UREA: 1600,
      NPK: 1800,
      "NPK-FK": 700,
    },
    dataTabel: [
      {
        nama_usaha: "Toko Barat Makmur",
        no_register: "BB-003",
        UREA: 250,
        NPK: 350,
        NPK_FK: 150,
      },
    ],
  },
  Ujung: {
    jumlahToko: 8,
    totalDistribusi: 4900,
    dataPupuk: {
      UREA: 1900,
      NPK: 2200,
      "NPK-FK": 800,
    },
    dataTabel: [
      {
        nama_usaha: "Toko Ujung Sentosa",
        no_register: "UJ-004",
        UREA: 280,
        NPK: 360,
        NPK_FK: 160,
      },
    ],
  },
};

export default function DistribusiPupukPage() {
  const [kecamatan, setKecamatan] = useState("");
  const [dataPupuk, setDataPupuk] = useState({ UREA: 0, NPK: 0, "NPK-FK": 0 });
  const [jumlahToko, setJumlahToko] = useState(0);
  const [totalDistribusi, setTotalDistribusi] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pieChartRef = useRef<Chart | null>(null);
  const lineChartRef = useRef<Chart | null>(null);
  const router = useRouter();

  useEffect(() => {
  setIsLoading(true);
  setTimeout(() => {
    if (kecamatan === "") {
      // Hitung total semua data
      let totalPupuk = { UREA: 0, NPK: 0, "NPK-FK": 0 };
      let totalToko = 0;
      let totalDistribusi = 0;
      let semuaDataTabel: any[] = [];

      for (const data of Object.values(dummyDataPerKecamatan)) {
        totalPupuk.UREA += data.dataPupuk.UREA;
        totalPupuk.NPK += data.dataPupuk.NPK;
        totalPupuk["NPK-FK"] += data.dataPupuk["NPK-FK"];
        totalToko += data.jumlahToko;
        totalDistribusi += data.totalDistribusi;
        semuaDataTabel = semuaDataTabel.concat(data.dataTabel);
      }

      setDataPupuk(totalPupuk);
      setJumlahToko(totalToko);
      setTotalDistribusi(totalDistribusi);
      setDataTable(semuaDataTabel);
    } else {
      const data = dummyDataPerKecamatan[kecamatan];
      if (data) {
        setDataPupuk(data.dataPupuk);
        setJumlahToko(data.jumlahToko);
        setTotalDistribusi(data.totalDistribusi);
        setDataTable(data.dataTabel);
      }
    }
    setIsLoading(false);
  }, 500);
}, [kecamatan]);


  useEffect(() => {
    const pieCanvas = document.getElementById("pieChart") as HTMLCanvasElement;
    const lineCanvas = document.getElementById("lineChart") as HTMLCanvasElement;

    if (pieChartRef.current) pieChartRef.current.destroy();
    if (lineChartRef.current) lineChartRef.current.destroy();

    if (pieCanvas) {
      pieChartRef.current = new Chart(pieCanvas, {
        type: "pie",
        data: {
          labels: ["UREA", "NPK", "NPK-FK"],
          datasets: [{
            label: "Distribusi",
            data: [dataPupuk.UREA, dataPupuk.NPK, dataPupuk["NPK-FK"]],
            backgroundColor: ["#60A5FA", "#34D399", "#FBBF24"],
          }],
        },
      });
    }

    if (lineCanvas) {
      lineChartRef.current = new Chart(lineCanvas, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr"],
          datasets: [{
            label: "Distribusi UREA",
            data: [100, 200, 180, 220],
            borderColor: "#3B82F6",
            fill: false,
          }],
        },
      });
    }
  }, [dataPupuk]);

  return (
    <div className="relative p-4 md:p-6">
      <Navbar/>
      <div className="p-4 md:p-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-600 hover:text-green-700 transition border border-green-600 px-4 py-2 rounded-lg mb-4"
        >
          ← <span className="ml-2">Kembali</span>
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
          Sobat Distributor Kota Parepare
        </h1>
        <p className="text-gray-700 leading-relaxed mb-10">
          Temukan Kemudahan dalam mengecek distribusi barang bersubsidi
        </p>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <LoadingSpinner />
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isLoading ? "opacity-30 pointer-events-none" : ""}`}>
        {/* KIRI */}
        <div className="space-y-6">
          <div className="space-y-4 p-4 bg-white rounded-xl shadow">
            <div className="bg-[#083458] text-white px-4 py-2 rounded-md flex justify-between items-center">
              <span className="font-semibold">Analisis Pupuk</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                <span className="text-base material-symbols-outlined">Filter</span>
                <span>Kecamatan</span>
              </div>

              <select
                className="bg-[#CDE4F7] text-black px-4 py-2 rounded-lg w-full cursor-pointer"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
              >
                <option value="">-- Pilih Kecamatan --</option>
                <option value="Soreang">Soreang</option>
                <option value="Bacukiki">Bacukiki</option>
                <option value="Bacukiki Barat">Bacukiki Barat</option>
                <option value="Ujung">Ujung</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                {["UREA", "NPK-FK", "NPK"].map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      item === "NPK" ? "col-span-2" : ""
                    } flex justify-between items-center bg-[#CDE4F7] px-4 py-2 rounded-full text-black font-medium`}
                  >
                    <span>{item}</span>
                    <span>{Number(dataPupuk[item] || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2 bg-white shadow rounded-xl text-center">
            <h2 className="text-lg font-medium text-black">Informasi Penyaluran</h2>
            <div className="flex justify-center">
              <canvas id="pieChart" className="w-28 h-28" />
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between h-32 p-4 bg-white shadow rounded-xl">
              <p className="text-base font-semibold text-black">Jumlah Toko</p>
              <h1 className="text-3xl font-extrabold text-black">{jumlahToko}</h1>
              <p className="text-sm text-gray-500">Total toko</p>
            </div>

            <div className="flex flex-col justify-between h-32 p-4 bg-white shadow rounded-xl">
              <p className="text-base font-semibold text-black">Jumlah Pupuk Terdistribusi</p>
              <h1 className="text-3xl font-extrabold text-black">{totalDistribusi.toLocaleString()}</h1>
              <p className="text-sm text-gray-500">Sak</p>
            </div>
          </div>

          <div className="p-4 bg-white shadow rounded-xl">
            <h2 className="mb-4 text-lg font-medium">Distribusi Pupuk</h2>
            <div className="overflow-x-auto">
              <div className="max-h-[320px] overflow-y-auto border border-gray-300 rounded-t-lg">
                <table className="w-full table-auto border-collapse">
                  <thead className="bg-[#083458] sticky top-0 z-10 text-white">
                    <tr>
                      <th className="p-3 border-r">Nama Usaha</th>
                      <th className="p-3 border-r">No. Register</th>
                      <th className="p-3 border-r">UREA</th>
                      <th className="p-3 border-r">NPK</th>
                      <th className="p-3">NPK-FK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable.map((row: any, index: number) => (
                      <tr key={index} className="border-t hover:bg-gray-100">
                        <td className="p-2 capitalize">{row.nama_usaha}</td>
                        <td className="p-2">{row.no_register}</td>
                        <td className="p-2 text-center">{row.UREA}</td>
                        <td className="p-2 text-center">{row.NPK}</td>
                        <td className="p-2 text-center">{row["NPK_FK"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white shadow rounded-xl">
            <p className="mb-2 text-lg font-semibold">Grafik Perkembangan Pupuk</p>
            <canvas id="lineChart" className="w-full" height="150" />
          </div>
        </div>
      </div>
    </div>
  );
}
