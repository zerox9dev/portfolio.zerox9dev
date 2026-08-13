'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

type CompanyMentionProps = {
  href: string
  name: string
  favicon: string
  description?: string
  children: ReactNode
}

export const CompanyMention = ({
  href,
  name,
  favicon,
  description,
  children,
}: CompanyMentionProps) => {
  const [open, setOpen] = useState(false)
  // the favicon is optional content — if the file is missing, drop it silently
  const [faviconBroken, setFaviconBroken] = useState(false)
  const showFavicon = Boolean(favicon) && !faviconBroken

  return (
    <span
      className="not-prose relative inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="whitespace-nowrap underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 dark:decoration-neutral-700 dark:hover:text-neutral-100"
      >
        {children}
        {showFavicon && (
          // eslint-disable-next-line @next/next/no-img-element -- tiny static icon, no optimisation needed
          <img
            src={favicon}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            onError={() => setFaviconBroken(true)}
            className="m-0 ml-1 inline-block h-4 w-4 shrink-0 object-contain align-text-bottom"
          />
        )}
      </a>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            role="tooltip"
            className="not-prose absolute bottom-full left-0 z-40 mb-2 flex w-64 flex-col gap-1.5 border border-neutral-200 bg-white p-3 text-left shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
          >
            <span className="flex items-center gap-2">
              {showFavicon && (
                // eslint-disable-next-line @next/next/no-img-element -- see above
                <img
                  src={favicon}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="m-0 h-6 w-6 shrink-0 object-contain"
                />
              )}
              <span className="text-sm font-semibold text-black dark:text-white">
                {name}
              </span>
            </span>
            {description && (
              <span className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                {description}
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
