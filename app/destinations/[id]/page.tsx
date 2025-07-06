import DestinationDetailPageClient from "./DestinationDetailPageClient"
import { destinations } from "@/lib/data/destinations"

export default async function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return <DestinationDetailPageClient params={resolvedParams} />
}

export function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }))
}
