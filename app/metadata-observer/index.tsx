'use client'

import dynamic from 'next/dynamic'

export default dynamic(() => import('./metadata-observer'), { ssr: false })