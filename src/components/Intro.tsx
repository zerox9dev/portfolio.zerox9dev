
import { FC } from 'react'
import Image from 'next/image'
import { PortableText } from '@/types/sanity'
import PortableTextRenderer from '@/components/PortableTextRenderer'

type IntroProps = {
  body: PortableText
  availabilityText?: string
}

export const Intro: FC<IntroProps> = ({ body, availabilityText }) => {
  return (
    <div className="flex flex-col gap-2 bg-white dark:bg-black rounded-xl">
      {availabilityText && (
        <p className="text-sm text-green-600 dark:text-green-400 font-medium inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 border-2 border-green-200 rounded-full animate-pulse" aria-hidden="true" />
          {availabilityText}
        </p>
      )}
      <div className="text-lg font-normal leading-normal [text-wrap:pretty] text-neutral-500 dark:text-neutral-400">
        <div className="[&_p]:m-0 [&_p:not(:last-child)]:mb-1">
          <PortableTextRenderer value={body} />
        </div>
      </div>
    </div>
  )
}
