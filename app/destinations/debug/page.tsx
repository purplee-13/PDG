import { destinations } from "@/lib/data/destinations"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DestinationsDebugPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Destinations (Debug)</h1>
        <div className="space-y-4">
          {destinations.map((destination) => (
            <div key={destination.id} className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{destination.name}</h2>
              <p className="text-gray-600 mb-2">ID: {destination.id}</p>
              <p className="text-gray-600 mb-4">URL: /destinations/{destination.id}</p>
              <Link
                href={`/destinations/${destination.id}`}
                className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Visit Page
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
