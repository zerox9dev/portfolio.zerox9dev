'use client'

import * as Dialog from '@radix-ui/react-dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { type ProjectFields } from '@/types/content'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import Image from 'next/image'
import { type FC, type ReactNode, useCallback, useEffect, useState } from 'react'

import { ContentImage } from '@/components/ContentImage'
import { getContentImageUrl, getProjectLogoUrl } from '@/lib/content-images'

interface ProjectProps extends ProjectFields {
  children: ReactNode
}

const viewButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-black dark:hover:text-neutral-100'

const iconButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 disabled:pointer-events-none disabled:opacity-40 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-neutral-700'

const tagClass =
  'pointer-events-none inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:text-neutral-300'

type ProjectCarouselProps = {
  media: NonNullable<ProjectFields['media']>
}

function getProjectBadge(category?: string) {
  if (!category) return null

  const normalized = category.trim().toLowerCase()

  if (normalized === 'разработка' || normalized === 'розробка' || normalized === 'build') {
    return 'Build'
  }

  if (normalized === 'дизайн' || normalized === 'design') {
    return 'Design'
  }

  return null
}

function getProjectBadgeClass(badge: string) {
  if (badge === 'Build') {
    return 'bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300'
  }

  return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
}

const ProjectCarousel = ({ media }: ProjectCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [loadedImages, setLoadedImages] = useState(0)

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

    const reInit = () => emblaApi.reInit()

    updateButtons()
    requestAnimationFrame(reInit)
    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi, updateButtons])

  useEffect(() => {
    if (!emblaApi || loadedImages === 0) {
      return
    }

    emblaApi.reInit()
  }, [emblaApi, loadedImages])

  return (
    <div className="relative mt-4">
      <div ref={emblaRef} className="overflow-hidden px-4 md:px-4">
        <div className="flex items-start gap-4">
          {media.map((item, index) =>
            item ? (
              <div
                key={index}
                className="min-w-0 shrink-0 basis-10/12 self-start"
              >
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      type="button"
                      className="block w-full cursor-pointer"
                    >
                      <ContentImage
                        asset={item}
                        sizes="(min-width: 1024px) 793px, 83vw"
                        className="block h-auto w-full rounded-xl border border-muted-foreground/20 data-[loading]:top-0"
                        onLoad={() => setLoadedImages((count) => count + 1)}
                      />
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,64rem)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-background p-3 shadow-2xl outline-none">
                      <Dialog.Title className="sr-only">
                        {item.description || 'Project image preview'}
                      </Dialog.Title>
                      <Dialog.Description className="sr-only">
                        Expanded preview of the selected project image.
                      </Dialog.Description>
                      <ContentImage
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
  category,
  tech,
  media,
  link,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const badge = getProjectBadge(category)
  const techList = Array.isArray(tech)
    ? tech
    : typeof tech === 'string'
      ? tech.split(',').map((item) => item.trim())
      : []
  const logoSrc = getProjectLogoUrl(title, logo)
  const logoAlt = logo.description || logo.alt || `${title} logo`

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        whileHover={{ y: -4 }}
        transition={{
          opacity: { duration: 0.45, ease: 'easeOut' },
          y: { type: 'spring', stiffness: 280, damping: 24 },
        }}
        className="group flex items-center justify-between gap-3 rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-900"
      >
        <Image
          alt={logoAlt}
          src={logoSrc}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-xl"
        />
        <div className="mr-2 min-w-0 w-full">
          <div className="flex items-center gap-2">
            <h2 className="min-w-0 text-base font-normal">{title}</h2>
            {badge && (
              <span
                className={`inline-flex shrink-0 rounded-full px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.08em] ${getProjectBadgeClass(
                  badge,
                )}`}
              >
                {badge}
              </span>
            )}
          </div>
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-neutral-400 md:whitespace-normal md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2] dark:text-neutral-400">
            {strapline}
          </span>
        </div>
        <motion.button
          type="button"
          aria-label={`Open project details for ${title}`}
          className={`${viewButtonClass} self-center shrink-0`}
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span className="sr-only">Open project details</span>
        </motion.button>
      </motion.div>

      {open && (
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
          <Dialog.Content className="fixed inset-4 z-50 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-background shadow-2xl outline-none md:inset-8 dark:border-neutral-800">
            <div className="relative h-full max-h-[calc(100dvh-2rem)] overflow-y-auto md:max-h-[calc(100dvh-4rem)]">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className={`${iconButtonClass} absolute right-4 top-4 z-50 md:right-6 md:top-6`}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close project details</span>
                </button>
              </Dialog.Close>

              <div className="flex items-center gap-4 px-4 pt-6 md:px-6">
                <Image
                  alt={logoAlt}
                  src={logoSrc}
                  width={64}
                  height={64}
                  className="h-20 w-20 rounded-2xl border border-muted-foreground/20"
                />
                <div className="flex flex-col gap-1">
                  <Dialog.Title className="text-lg font-bold">
                    {title}
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-muted-foreground">
                    {strapline}
                  </Dialog.Description>
                  {link && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(link, '_blank', 'noopener,noreferrer')
                      }
                      className={`${viewButtonClass} w-fit`}
                      aria-label={`Open live project for ${title}`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span className="sr-only">Open live project</span>
                    </button>
                  )}
                </div>
              </div>

              {techList.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 pt-4 md:px-6">
                  {techList.map((item) => (
                    <span key={item} className={tagClass}>
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {media && media.length > 0 && <ProjectCarousel media={media} />}

              <div className="prose prose-neutral max-w-none w-full p-4 text-neutral-600 md:px-6 md:pb-6 dark:prose-invert dark:text-neutral-400">
                {children}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}
