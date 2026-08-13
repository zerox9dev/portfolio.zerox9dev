'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { ContentImage } from '@/components/ContentImage'
import { type ProjectFields } from '@/types/content'

interface ProjectStoryProps extends ProjectFields {
  href: string
}

const panelClass =
  'flex items-center justify-center border border-neutral-200 bg-neutral-100 p-5 dark:border-neutral-800 dark:bg-neutral-900'

export const ProjectStory = ({
  title,
  strapline,
  story,
  href,
}: ProjectStoryProps) => {
  const images = (story?.images ?? []).filter(Boolean)
  const [hero, ...rest] = images
  const row = rest.slice(0, 2)

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group/story flex flex-col gap-3"
    >
      <Link
        href={href}
        className="group flex flex-col gap-1 border-l border-transparent pl-0 transition-all duration-200 group-hover/story:border-neutral-300 group-hover/story:pl-5 dark:group-hover/story:border-neutral-700"
      >
        <h3 className="text-base font-normal tracking-tight group-hover:underline">
          {story?.title ?? title}
        </h3>
        <p className="text-sm leading-relaxed [text-wrap:pretty] text-neutral-400 dark:text-neutral-500">
          {story?.result ?? strapline}
        </p>
      </Link>

      {hero && (
        <Link href={href} className={panelClass}>
          <ContentImage
            asset={{ asset: { url: hero } }}
            alt=""
            sizes="(min-width: 1024px) 620px, 92vw"
            className="h-auto max-h-64 w-auto max-w-full object-contain"
          />
        </Link>
      )}

      {row.length > 0 && (
        <div className={`grid gap-3 ${row.length > 1 ? 'grid-cols-2' : ''}`}>
          {row.map((src) => (
            <Link key={src} href={href} className={panelClass}>
              <ContentImage
                asset={{ asset: { url: src } }}
                alt=""
                sizes="(min-width: 1024px) 300px, 46vw"
                className="h-auto max-h-40 w-auto max-w-full object-contain"
              />
            </Link>
          ))}
        </div>
      )}
    </motion.article>
  )
}
