
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
      {contactData?.buttonText && (
        <div className="flex justify-start">
          <button
            onClick={() => window.open(contactData.telegramUrl, '_blank')}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            aria-label={contactData.buttonAriaLabel}
          >
            {contactData.buttonText}
          </button>
        </div>
      )}
    </div>
  )
}
