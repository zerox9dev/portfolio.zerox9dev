'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { ContentImage } from '@/components/ContentImage'
import { type ContentImage as ContentImageType } from '@/types/content'

const closeButtonClass =
  'inline-flex h-9 w-9 items-center justify-center border border-neutral-200 bg-background/90 text-black backdrop-blur transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-neutral-700'

type ProjectMediaFigureProps = {
  asset: ContentImageType
  caption?: string
  priority?: boolean
  className?: string
}

export const ProjectMediaFigure = ({
  asset,
  caption,
  priority,
  className,
}: ProjectMediaFigureProps) => {
  const text = caption ?? asset.description ?? asset.alt ?? ''

  return (
    <figure className={`my-6 ${className ?? ''}`}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button" className="block w-full cursor-zoom-in">
            <ContentImage
              asset={asset}
              sizes="(min-width: 768px) 496px, 92vw"
              priority={priority}
              className="border-muted-foreground/20 block h-auto w-full border"
            />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <Dialog.Content className="bg-background fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[min(90vw,64rem)] -translate-x-1/2 -translate-y-1/2 border border-white/10 p-3 shadow-2xl outline-none">
            <Dialog.Title className="sr-only">
              {text || 'Project image preview'}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Expanded preview of the selected project image.
            </Dialog.Description>
            <ContentImage
              asset={asset}
              sizes="(min-width: 1024px) 1024px, 90vw"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
            <Dialog.Close asChild>
              <button
                type="button"
                className={`${closeButtonClass} absolute top-4 right-4`}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close image preview</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {text && (
        <figcaption className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
          {text}
        </figcaption>
      )}
    </figure>
  )
}
