'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Drawer as VaulDrawer } from 'vaul'
import useEmblaCarousel from 'embla-carousel-react'
import { type TypeProjectFields, type TypePageHeadersFields } from '@/types/sanity'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import Image from 'next/image'
import { type FC, useCallback, useEffect, useState } from 'react'

import PortableTextRenderer from '@/components/PortableTextRenderer'
import { SanityImage } from '@/components/SanityImage'
import { buildSanityImageUrl } from '@/lib/sanity'

interface ProjectProps extends TypeProjectFields {
  pageHeaders?: TypePageHeadersFields
}

const viewButtonClass =
  'inline-flex items-center gap-1.5 rounded-xl border border-neutral-100 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800'

const iconButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 disabled:pointer-events-none disabled:opacity-40 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-neutral-700'

const tagClass =
  'pointer-events-none inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:text-neutral-300'

type ProjectCarouselProps = {
  media: NonNullable<TypeProjectFields['media']>
}

const ProjectCarousel = ({ media }: ProjectCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateButtons = useCallback(() => {
    if (!emblaApi) {
      return
    }

    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    updateButtons()
    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi, updateButtons])

  return (
    <div className="relative mt-4" data-vaul-no-drag>
      <div ref={emblaRef} className="overflow-hidden px-4 md:px-4">
        <div className="flex gap-4">
          {media.map((item, index) =>
            item ? (
              <div
                key={index}
                className="min-w-0 shrink-0 basis-10/12"
                data-vaul-no-drag
              >
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      type="button"
                      className="block w-full cursor-pointer"
                      data-vaul-no-drag
                    >
                      <SanityImage
                        asset={item}
                        sizes="(min-width: 1024px) 793px, 83vw"
                        className="rounded-xl border border-muted-foreground/20 data-[loading]:top-0"
                      />
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,64rem)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-background p-3 shadow-2xl outline-none">
                      <SanityImage
                        asset={item}
                        sizes="(min-width: 1024px) 1024px, 90vw"
                        className="h-auto max-h-[80vh] w-full rounded-2xl object-contain"
                      />
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className={`${iconButtonClass} absolute right-4 top-4 h-9 w-9 bg-background/90 backdrop-blur`}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close image preview</span>
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            ) : null,
          )}
        </div>
      </div>

      <button
        type="button"
        className={`${iconButtonClass} absolute left-6 top-1/2 hidden -translate-y-1/2 md:inline-flex`}
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`${iconButtonClass} absolute right-6 top-1/2 hidden -translate-y-1/2 md:inline-flex`}
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        aria-label="Next slide"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export const Project: FC<ProjectProps> = ({
  title,
  strapline,
  logo,
  tech,
  media,
  body,
  link,
  pageHeaders,
}) => {
  const [open, setOpen] = useState(false)
  const techList = Array.isArray(tech)
    ? tech
    : typeof tech === 'string'
      ? tech.split(',').map((item) => item.trim())
      : []
  const logoSrc =
    buildSanityImageUrl(logo, { width: 128, height: 128 }) || '/images/logo.ico'
  const logoAlt = logo.description || logo.alt || `${title} logo`

  return (
    <VaulDrawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground>
      <div className="group flex cursor-pointer justify-between gap-2">
        <Image
          alt={logoAlt}
          src={logoSrc}
          width={48}
          height={48}
          className="h-12 w-12 rounded-xl"
        />
        <div className="mr-4 w-full">
          <h2 className="text-base font-bold">{title}</h2>
          <span className="block line-clamp-1 text-sm font-normal text-neutral-400 dark:text-neutral-400">
            {strapline}
          </span>
        </div>
        <button
          type="button"
          aria-label={`View ${title}`}
          className={`${viewButtonClass} self-center shrink-0`}
          onClick={() => setOpen(true)}
        >
          {pageHeaders?.viewButtonText}
        </button>
      </div>

      {open && (
        <VaulDrawer.Portal>
          <VaulDrawer.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur" />
          <VaulDrawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-auto max-w-[896px] flex-col rounded-t-xl border bg-background outline-none">
            <div className="mx-auto my-3 h-2 w-[100px] rounded-xl bg-black/10 dark:bg-white/10" />

            <div className="relative h-[calc(100dvh-6rem)] overflow-y-auto">
              <VaulDrawer.Close asChild>
                <button
                  type="button"
                  className={`${iconButtonClass} absolute right-8 top-1 z-50 hidden md:inline-flex`}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close project details</span>
                </button>
              </VaulDrawer.Close>

              <div className="flex items-center gap-4 px-4 pt-2 md:px-4">
                <Image
                  alt={logoAlt}
                  src={logoSrc}
                  width={64}
                  height={64}
                  className="h-20 w-20 rounded-2xl border border-muted-foreground/20"
                />
                <div className="flex flex-col gap-1">
                  <VaulDrawer.Title className="text-lg font-bold">
                    {title}
                  </VaulDrawer.Title>
                  <VaulDrawer.Description className="text-sm text-muted-foreground">
                    {strapline}
                  </VaulDrawer.Description>
                  {link && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(link, '_blank', 'noopener,noreferrer')
                      }
                      className={`${viewButtonClass} w-fit`}
                    >
                      {pageHeaders?.viewButtonText}
                    </button>
                  )}
                </div>
              </div>

              {techList.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 pt-4 md:px-4">
                  {techList.map((item) => (
                    <span key={item} className={tagClass}>
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {media && media.length > 0 && <ProjectCarousel media={media} />}

              <div className="flex w-fit flex-col gap-4 p-4 dark:prose-invert">
                <PortableTextRenderer value={body} />
              </div>
            </div>
          </VaulDrawer.Content>
        </VaulDrawer.Portal>
      )}
    </VaulDrawer.Root>
  )
}
