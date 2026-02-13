import React from 'react'
import { PortableText as SanityPortableText } from 'next-sanity'
import { PortableText } from '@/types/sanity'

type PortableTextRendererProps = {
  value?: PortableText
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!Array.isArray(value) || value.length === 0) return null

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <SanityPortableText value={value} />
    </div>
  )
}
