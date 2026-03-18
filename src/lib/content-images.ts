import { type ContentImage } from '@/types/content'

export function getContentImageUrl(
  image: ContentImage,
  _options?: { width?: number; height?: number },
): string {
  return image?.asset?.url || ''
}

export function getProjectLogoUrl(title: string, image?: ContentImage): string {
  const explicitUrl = getContentImageUrl(image ?? {})

  if (explicitUrl && explicitUrl !== '/images/logo.ico') {
    return explicitUrl
  }

  const seed = encodeURIComponent(title.trim() || 'project')
  return `https://api.dicebear.com/9.x/glass/png?seed=${seed}`
}
