'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useState } from 'react'

type RoleTooltipProps = {
  role: string
  text: string
}

export default function RoleTooltip({
  role,
  text,
}: RoleTooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative flex items-center gap-1.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="text-sm text-neutral-400 dark:text-neutral-500">{role}</span>
      <button
        type="button"
        aria-label="Show role details"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <Info className="h-3 w-3" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: -4 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 top-full z-30 mt-3 w-64 rounded-2xl bg-neutral-950 px-4 py-3 text-sm text-neutral-100 shadow-xl dark:bg-neutral-100 dark:text-neutral-900"
          >
            <p className="text-neutral-300 dark:text-neutral-700">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
