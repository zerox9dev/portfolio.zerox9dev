'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'
import { RichText } from '@/types/content'
import RichTextRenderer from '@/components/RichTextRenderer'

type IntroProps = {
  body: RichText
}

export const Intro: FC<IntroProps> = ({ body }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-xl bg-white dark:bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.08, duration: 0.4, ease: 'easeOut' }}
        className="text-lg font-normal leading-normal [text-wrap:pretty] text-neutral-500 dark:text-neutral-400"
      >
        <div className="[&_p]:m-0 [&_p:not(:last-child)]:mb-1">
          <RichTextRenderer value={body} />
        </div>
      </motion.div>
    </motion.div>
  )
}
