'use client'

import { Asset, AssetDetails } from 'contentful'
import Image from 'next/image'

type ContentfulImageProps = {
  asset: Asset
  [key: string]: any
}

export const ContentfulImage = ({ asset, ...props }: ContentfulImageProps) => {
  const details = asset.fields.file?.details as AssetDetails;
  const image = details?.image;
  const width = image?.width || 0;
  const height = image?.height || 0;
  const url = `https:${asset.fields.file?.url as string}`

  return <Image src={url} width={width} height={height} alt={asset.fields.description as string || ''} {...props} />
}
