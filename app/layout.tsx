import type React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-between p-2 bg-zinc-200">
          <Link href="/">Home</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Find My Neighbors',
  description: 'A radar app to find your neighbors',
}
