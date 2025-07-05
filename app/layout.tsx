import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Parepare Dalam Genggaman',
  description: 'Created with Pintesia',
  generator: 'pintesia.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
