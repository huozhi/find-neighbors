'use client'

import { useEffect, useState } from 'react'

export default function MetaObserver() {
  if (typeof window === 'undefined') {
    return null
  }
  const [title, setTitle] = useState(document.title)
  const [metaTags, setMetaTags] = useState<Record<string, string>>({})

  useEffect(() => {
    const updateMetaState = () => {
      setTitle(document.title)
      const metaElements = document.querySelectorAll('meta[name]')
      const metaData: Record<string, string> = {}
      metaElements.forEach((meta) => {
        const name = meta.getAttribute('name') || meta.getAttribute('property')
        const content = meta.getAttribute('content')
        if (name && content) {
          metaData[name] = content
        }
      })
      setMetaTags(metaData)
    }

    const observer = new MutationObserver(() => updateMetaState())

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['content', 'name', 'property'],
    })

    updateMetaState() // Initial update

    return () => observer.disconnect()
  }, [])

  return (
    <div className="p-2 rounded shadow-md text-sm bg-white-200 max-w-400 text-[#577579]">
      <div className="mt-2">
        <ul className="list-disc ml-5">
          <li>
            <strong>{`title: `}</strong> {title}
          </li>
          {Object.entries(metaTags).map(([name, content]) => (
            <li key={name}>
              <strong>{name}:</strong> {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
