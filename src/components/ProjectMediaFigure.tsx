import { ContentImage } from '@/components/ContentImage'
import { type ContentImage as ContentImageType } from '@/types/content'

type ProjectMediaFigureProps = {
  asset: ContentImageType
  caption?: string
  priority?: boolean
  className?: string
  /** break out of the 496px text column up to 1078px; off inside image rows */
  wide?: boolean
}

export const ProjectMediaFigure = ({
  asset,
  caption,
  priority,
  className,
  wide = true,
}: ProjectMediaFigureProps) => {
  // the caption text now only lives in alt — no visible captions
  const text = caption ?? asset.description ?? asset.alt ?? ''

  return (
    <figure
      className={`my-6 ${
        wide
          ? 'relative left-1/2 w-[1078px] max-w-[calc(100vw-2rem)] -translate-x-1/2'
          : ''
      } ${className ?? ''}`}
    >
      <div className="w-full border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <ContentImage
          asset={asset}
          alt={text}
          sizes={
            wide
              ? '(min-width: 1140px) 1078px, 92vw'
              : '(min-width: 768px) 496px, 92vw'
          }
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </figure>
  )
}
