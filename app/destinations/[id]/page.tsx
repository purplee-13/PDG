import DestinationDetailPageClient from "./DestinationDetailPageClient"

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  return <DestinationDetailPageClient params={params} />
}

export function generateStaticParams() {
  return [
    { id: "pelabuhan-nusantara" },
    { id: "monument-habibie" },
    { id: "ladoma-resort" },
    { id: "bulu-nepo" },
    { id: "tonrangeng-river-side" },
  ]
}
