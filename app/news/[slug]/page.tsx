import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getNewsBySlug, newsCategories, newsArticles } from "@/lib/data/news"
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface NewsDetailPageProps {
  params: {
    slug: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = getNewsBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const relatedArticles = newsArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/news" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Kembali ke Berita</span>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              {newsCategories.find((cat) => cat.id === article.category)?.title}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{article.title}</h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} menit baca</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">{article.excerpt}</p>
          <div className="text-gray-700 leading-relaxed">
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-32">
                    <Image
                      src={relatedArticle.image || "/placeholder.svg"}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }))
}
