import React from 'react'
import { PortableText as SanityPortableText } from 'next-sanity'
import type { TypedObject } from '@portabletext/types'
import { PortableText } from '@/types/sanity'

type PortableTextRendererProps = {
  value?: PortableText
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!Array.isArray(value) || value.length === 0) return null

  const portableTextValue = value as unknown as TypedObject[]

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <SanityPortableText value={portableTextValue} />
    </div>
  )
}
