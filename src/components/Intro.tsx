
import { FC } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Asset } from 'contentful'
import { Document } from '@contentful/rich-text-types'
import Image from 'next/image'
import { TypeContactFields } from '@/types/contentful'

type IntroProps = {
  body: Document
  avatar: Asset
  contactData?: TypeContactFields
  alternativeBody?: Document
}

export const Intro: FC<IntroProps> = ({ body, avatar, contactData, alternativeBody }) => {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-black p-4 rounded-xl">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2">
          <Image
            src={`https:${avatar.fields.file?.url as string}`}
            alt={avatar.fields.description as string || 'Avatar'}
            width={64}
            height={64}
            className="rounded-full border-4 border-muted-foreground/20"
          />
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
            Founder at
            <Image
              src="/images/logo.ico"
              alt="Znaidy logo"
              width={16}
              height={16}
              className="inline-block rounded-full"
            />
            <a
              href="http://znaidy.com?utm_source=portfolio&utm_medium=referral&utm_campaign=founder_badge"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Znaidy
            </a>
          </p>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-2 dark:prose-invert text-lg font-normal leading-normal">
        {documentToReactComponents(alternativeBody || body)}
      </div>
      {contactData && (
        <div className="flex justify-start gap-3">
          <button
            onClick={() => window.open(contactData.bookCallUrl, '_blank')}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            aria-label={contactData.bookCallAriaLabel}
          >
            {contactData.bookCallButtonText}
          </button>
          <button
            onClick={() => window.open(contactData.telegramUrl, '_blank')}
            className="relative inline-flex items-center justify-center rounded-full corner-superellipse/1.5 font-medium cursor-pointer transition-all whitespace-nowrap outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-400 active:scale-97 select-none disabled:pointer-events-none disabled:opacity-50 bg-neutral-200/50 text-neutral-600 hover:bg-neutral-200/80 backdrop-blur-md dark:border dark:bg-white/20 dark:text-white dark:hover:bg-white/30 dark:border-white/8 h-10 px-4 text-sm gap-1.5 pl-3"
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
