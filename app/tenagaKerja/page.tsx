'use client';

import Navbar from "@/components/navbar";
import DisnakerChart from '@/components/charts/DisnakerChart';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="mb-6 px-4 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#35AC3E] hover:text-[#2b8b33] mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-[#083358] mb-2">
            Portal Informasi Ketenagakerjaan
          </h1>

          <p className="text-base text-gray-700 leading-relaxed text-justify">
            Platform digital yang menyajikan data ketenagakerjaan seperti keterampilan yang paling dibutuhkan, sektor industri dengan kebutuhan tenaga kerja tertinggi, dan tren pengangguran. Portal ini bertujuan membantu pengambilan kebijakan yang lebih tepat sasaran dalam meningkatkan kualitas dan penempatan tenaga kerja.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <DisnakerChart />
        </div>
      </div>
    </div>
  );
}
