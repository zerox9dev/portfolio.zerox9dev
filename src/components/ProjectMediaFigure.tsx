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
  const text = caption ?? asset.description ?? asset.alt ?? ''

  return (
    <figure
      className={`my-6 ${
        wide
          ? 'relative left-1/2 w-[1078px] max-w-[calc(100vw-2rem)] -translate-x-1/2'
          : ''
      } ${className ?? ''}`}
    >
      <div className="flex w-full items-center justify-center border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <ContentImage
          asset={asset}
          alt={text}
          sizes={
            wide
              ? '(min-width: 1140px) 1078px, 92vw'
              : '(min-width: 768px) 496px, 92vw'
          }
          priority={priority}
          className="h-auto max-h-[640px] w-auto max-w-full object-contain"
        />
      </div>
      {text && (
        <figcaption className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
          {text}
        </figcaption>
      )}
    </figure>
  )
}
