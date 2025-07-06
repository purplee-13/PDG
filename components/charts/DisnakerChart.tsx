'use client';

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const DisnakerChart: React.FC = () => {
  useEffect(() => {
    // Keterampilan Paling Diharapkan
    new Chart(document.getElementById('desiredSkills') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['Bahasa Jepang', 'Memasak', 'Bahasa Inggris', 'Akuntansi', 'Operasi Alat Berat', 'Menyanyi', 'Mengoperasikan Kapal', 'Mengemudi'],
        datasets: [{
          label: 'Jumlah Pengguna',
          data: [5, 4, 3, 2, 2, 2, 1, 1],
          backgroundColor: '#a78bfa'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

    // Keterampilan Paling Banyak Saat Ini
    new Chart(document.getElementById('currentSkills') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['Bahasa Inggris', 'Matematika', 'Public Speaking', 'Menjaring Ikan', 'Memasak', 'Mengajar', 'Bahasa Arab', 'Menangkap Ikan'],
        datasets: [{
          label: 'Jumlah Pengguna',
          data: [4, 3, 3, 2, 2, 2, 2, 2],
          backgroundColor: '#34d399'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

    // Minat Bekerja di Luar Negeri
    new Chart(document.getElementById('foreignInterest') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['Berminat', 'Tidak Berminat', 'Belum Menjawab'],
        datasets: [{
          data: [10, 3, 20],
          backgroundColor: ['#3b82f6', '#6b7280', '#f59e0b']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            position: 'bottom'
            }
        },
        layout: {
            padding: 10
        }
        }
    });

    // Distribusi Pengalaman Kerja
    new Chart(document.getElementById('workExperience') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['<1 tahun', '1-3 tahun', '3-5 tahun', '5-10 tahun', '>10 tahun', 'Lain-lain'],
        datasets: [{
          label: 'Jumlah Pengguna',
          data: [1, 5, 4, 3, 2, 1],
          backgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const labels = ['Bacukiki', 'Bacukiki Barat', 'Soreang', 'Ujung'];

    // AKB Chart
    new Chart(document.getElementById('akbChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'AKB',
          data: [50, 40, 60, 35],
          backgroundColor: '#f43f5e'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // AKTB Chart
    new Chart(document.getElementById('aktbChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'AKTB',
          data: [20, 15, 25, 10],
          backgroundColor: '#6366f1'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // BAK Chart
    new Chart(document.getElementById('bakChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'BAK',
          data: [30, 28, 35, 25],
          backgroundColor: '#22c55e'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  }, []);

  return (
    <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">AKB per Kecamatan</h2>
        <canvas id="akbChart" className="w-full h-64" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">AKTB per Kecamatan</h2>
        <canvas id="aktbChart" className="w-full h-64" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">BAK per Kecamatan</h2>
        <canvas id="bakChart" className="w-full h-64" />
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">Keterampilan Paling Diharapkan</h2>
        <canvas id="desiredSkills" className="w-full h-64" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">Keterampilan Paling Banyak Saat Ini</h2>
        <canvas id="currentSkills" className="w-full h-64" />
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow h-88">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">Minat Bekerja di Luar Negeri</h2>
        <div className="flex items-center justify-center h-full">
            <div className="w-80 h-80">
            <canvas id="foreignInterest" />
            </div>
        </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#083358]">Distribusi Pengalaman Kerja</h2>
        <canvas id="workExperience" className="w-full h-64" />
        </div>
    </div>
    </div>

  );
};

export default DisnakerChart;
