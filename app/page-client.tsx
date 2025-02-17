'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { User as UserLogo } from 'lucide-react'
import MetaObserver from './metadata-observer'

const neighbors = [
  {
    name: 'Shumart',
    location: '23 Somewhere St',
  },
  {
    name: 'Jafeeier',
    location: '19 Main St',
  },
  {
    name: 'Antomady',
    location: '5 Potsdam St',
  },
]

export default function FindMyNeighbor() {
  const [visibleNeighbors, setVisibleNeighbors] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleNeighbors((prev) => {
        if (prev.length >= 3) {
          clearInterval(interval)
          return prev
        }
        return [...prev, prev.length]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <MetaObserver />

      <h1 className="text-3xl font-bold mb-8" style={{ marginLeft: '-48px' }}>
        {/* loading gif oiia.gif */}
        <img src="/oiia.gif" alt="loading" className="w-20 h-20 md:w-24 md:h-24 inline-block" />
        Find My Neighbors
      </h1>

      <div className="relative w-64 h-64 md:w-96 md:h-96">
        {/* Radar background */}
        <div className="absolute inset-0 bg-green-100 rounded-full border-4 border-green-500"></div>

        {/* Radar waves */}
        {[0, 1, 2].map((wave) => (
          <motion.div
            key={wave}
            className="absolute inset-0 rounded-full border-2 border-green-500"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: 1,
              opacity: 0,
            }}
            transition={{
              duration: 4,
              delay: wave * 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}

        {/* Neighbors */}
        {neighbors.map((neighbor, index) => (
          <motion.div
            key={neighbor.name}
            className={`absolute ${getNeighborPosition(index)} p-2 bg-white rounded-full shadow-lg`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: visibleNeighbors.includes(index) ? 1 : 0,
              opacity: visibleNeighbors.includes(index) ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <Link href={'/contact/' + neighbor.name.toLowerCase()}>
              <div className="flex items-center space-x-2">
                <UserLogo className="w-6 h-6 text-green-500" name={neighbor.name} />
                <p className="text-sm font-bold">{neighbor.name}</p>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  )
}

function getNeighborPosition(index: number) {
  switch (index) {
    case 0:
      return 'top-1/4 right-1/4'
    case 1:
      return 'bottom-1/8 right-1/5'
    case 2:
      return 'bottom-1/3 left-1/6'
    default:
      return ''
  }
}
