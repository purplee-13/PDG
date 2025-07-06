"use client"

import { ChevronLeft, ChevronRight, ArrowRight, Clock, User } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getLatestNews, newsCategories } from "@/lib/data/news"

export default function NewsCarousel() {
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 3
  const slideStep = 1
  const latestNews = getLatestNews(5)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + slideStep, latestNews.length - itemsToShow)
    )
  }

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - slideStep, 0))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-4">Berita Terkini Kota Parepare</h2>
          <p className="text-gray-600 text-lg">Informasi terbaru seputar perkembangan dan kegiatan di Kota Parepare</p>
          <div className="mt-6 flex justify-end">
            <Link href="/news" className="text-green-500 hover:text-green-600 flex items-center space-x-1">
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`
              }}
            >
              {latestNews.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex-shrink-0"
                  style={{ width: `calc(${100 / itemsToShow}% - ${24 * (itemsToShow - 1) / itemsToShow}px)` }}
                >
                <div className="relative h-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {newsCategories.find((cat) => cat.id === article.category)?.title}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </Link>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg transition-shadow ${
              startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:shadow-xl"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsToShow >= latestNews.length}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg transition-shadow ${
              startIndex + itemsToShow >= latestNews.length
                ? "opacity-30 cursor-not-allowed"
                : "hover:shadow-xl"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
