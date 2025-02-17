import { origin } from '@/app/host'
import { Metadata } from 'next'
import Image from 'next/image'
import MetaObserver from '@/app/metadata-observer'

export default async function ContactPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const info = await fetchInfo(name)

  return (
    <div className='flex flex-col max-w-6xl'>
      <MetaObserver />
      <div className="flex flex-col items-left min-h-screen bg-gray-100 p-2 md:p-4">
        <h1 className="font-bold mb-8 text-6xl md:text-9xl">{name}</h1>
        <p className="text-lg text-gray-600">
          <b>Base:</b> {info.location}
        </p>
        <p className="text-lg text-gray-600 whitespace-pre-wrap">
          <b>Intro:</b> {info.intro}
        </p>
        <p className="text-lg text-gray-600">
          <b>Phone:</b> {info.tel}
        </p>
        <Image src={info.avatar} alt={name} width={200} height={200} className="mt-4" />

        <hr className="my-8 text-neutral-300" />
        <p className="text-lg text-gray-600">{`👋 I believe you can find me based on the above information : )`}</p>
      </div>
    </div>
  )
}

async function fetchInfo(
  name: string,
  metadata: boolean = false
): Promise<{
  name: string
  location: string
  intro: string
  avatar: string
  tel: string
}> {
  const info = await fetch(`${origin}/api/user?name=${name}${metadata ? '&metadata=1' : ''}`)
  return info.json()
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  const info = await fetchInfo(name, true)

  return {
    title: `${name}`,
    description: `Contact details of ${name}`,
    openGraph: {
      type: 'website',
      images: [`${origin}${info.avatar}`],
    },
  }
}

export const dynamic = 'force-dynamic'
