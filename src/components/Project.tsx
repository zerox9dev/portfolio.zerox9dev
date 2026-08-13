'use client'

import { motion } from 'framer-motion'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

import { getProjectLogoUrl } from '@/lib/content-images'
import { getProjectBadge, getProjectBadgeClass } from '@/lib/project-badge'
import { type ProjectFields } from '@/types/content'

interface ProjectProps extends ProjectFields {
  href: string
}

const viewButtonClass =
  'inline-flex h-8 w-8 items-center justify-center text-neutral-400 transition-colors group-hover:bg-white group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:bg-black dark:group-hover:text-neutral-100'

export const Project: FC<ProjectProps> = ({
  title,
  strapline,
  logo,
  category,
  href,
}) => {
  const badge = getProjectBadge(category)
  const logoSrc = getProjectLogoUrl(title, logo)
  const logoAlt = logo.description || logo.alt || `${title} logo`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -4 }}
      transition={{
        opacity: { duration: 0.45, ease: 'easeOut' },
        y: { type: 'spring', stiffness: 280, damping: 24 },
      }}
    >
      <Link
        href={href}
        className="group flex items-center justify-between gap-3 border border-neutral-200 p-4 dark:border-neutral-800"
      >
        <Image
          alt={logoAlt}
          src={logoSrc}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0"
        />
        <div className="mr-2 w-full min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="min-w-0 text-base font-normal">{title}</h2>
            {badge && (
              <span
                className={`inline-flex shrink-0 px-1.5 py-px text-[9px] font-medium tracking-[0.08em] uppercase ${getProjectBadgeClass(
                  badge,
                )}`}
              >
                {badge}
              </span>
            )}
          </div>
          <span className="block overflow-hidden text-sm font-normal text-ellipsis whitespace-nowrap text-neutral-400 md:[display:-webkit-box] md:whitespace-normal md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2] dark:text-neutral-400">
            {strapline}
          </span>
        </div>
        <span
          className={`${viewButtonClass} shrink-0 self-center`}
          aria-hidden="true"
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="h-3.5 w-3.5"
          />
        </span>
      </Link>
    </motion.div>
  )
}
