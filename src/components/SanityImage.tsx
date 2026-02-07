'use client'

import Image from 'next/image'
import { buildSanityImageUrl } from '@/lib/sanity'
import { SanityImage as SanityImageType } from '@/types/sanity'

type SanityImageProps = {
  asset: SanityImageType
  alt?: string
  [key: string]: any
}

export const SanityImage = ({ asset, alt, ...props }: SanityImageProps) => {
  const src = buildSanityImageUrl(asset) || '/images/logo.ico'
  const width = 1200
  const height = 800
  const imageAlt = alt || asset.description || asset.alt || ''

  return <Image src={src} width={width} height={height} alt={imageAlt} {...props} />
}
