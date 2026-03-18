'use client'

import Image from 'next/image'

import { getContentImageUrl } from '@/lib/content-images'
import { type ContentImage as ContentImageType } from '@/types/content'

type ContentImageProps = {
  asset: ContentImageType
  alt?: string
  [key: string]: any
}

export const ContentImage = ({ asset, alt, ...props }: ContentImageProps) => {
  const src = getContentImageUrl(asset) || '/images/logo.ico'
  const width = 1200
  const height = 800
  const imageAlt = alt || asset.description || asset.alt || ''

  return <Image src={src} width={width} height={height} alt={imageAlt} {...props} />
}
