import { Metadata } from 'next'
import { origin } from './host'
export { default } from './page-client'

export async function generateMetadata(): Promise<Metadata> {
  await fetch(`${origin}/api/register`)
  return {
    generator: 'next.js',
    applicationName: 'oiiai-find-my-neighbors',
    referrer: 'origin-when-cross-origin',
    keywords: ['next.js', 'react', 'javascript'],
    authors: [{ name: 'huozhi', url: 'https://huozhi.im' }, { name: 'v0' }],
    creator: 'huozhi',
    publisher: 'huozhi-org',
    robots: 'index, follow',
    alternates: {},
    pagination: {
      previous: '/basic?page=1',
      next: '/basic?page=3',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  }
}

export const viewport = {
  // viewport meta tag
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: 'resizes-visual',
  // visual meta tags
  colorScheme: 'light',
  themeColor: { color: 'white', media: '(prefers-color-scheme: light)' },
}


export const dynamic = 'force-dynamic'
