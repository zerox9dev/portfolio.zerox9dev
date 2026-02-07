
import { FC } from 'react'
import Image from 'next/image'
import { TypeContactFields, PortableText } from '@/types/sanity'
import PortableTextRenderer from '@/components/PortableTextRenderer'

type IntroProps = {
  body: PortableText
  availabilityText?: string
  contactData?: TypeContactFields
}

export const Intro: FC<IntroProps> = ({ body, availabilityText, contactData }) => {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-black rounded-xl">
      {availabilityText && (
        <p className="text-sm text-green-600 dark:text-green-400 font-medium inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 border-2 border-green-200 rounded-full animate-pulse" aria-hidden="true" />
          {availabilityText}
        </p>
      )}
      <div className="text-lg font-normal leading-normal [text-wrap:pretty] text-neutral-400 dark:text-neutral-500 [&_strong]:text-neutral-950 dark:[&_strong]:text-neutral-100 [&_strong]:font-normal">
        <div className="[&_p]:m-0 [&_p:not(:last-child)]:mb-2">
          <PortableTextRenderer value={body} />
        </div>
      </div>
      
      {contactData && (
        <div className="flex justify-start gap-3">
          <button
            onClick={() => window.open(contactData.bookCallUrl, '_blank')}
            className="bg-neutral-200/50 hover:bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
            aria-label={contactData.bookCallAriaLabel}
          >
            {contactData.bookCallButtonText}
          </button>
          <button
            onClick={() => window.open(contactData.telegramUrl, '_blank')}
            className="border border-neutral-100 dark:border-neutral-800 text-black px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label={contactData.buttonAriaLabel}
          >
            <Image
              src="/tglogo.svg"
              alt="Telegram"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            {contactData.buttonText}
          </button>
        </div>
      )}
    </div>
  )
}
