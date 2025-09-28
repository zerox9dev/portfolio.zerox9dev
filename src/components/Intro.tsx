
import { FC } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Asset } from 'contentful'
import { Document } from '@contentful/rich-text-types'
import Image from 'next/image'

type IntroProps = {
  body: Document
  avatar: Asset
}

export const Intro: FC<IntroProps> = ({ body, avatar }) => {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-black p-4 rounded-xl">
      <div className="flex justify-between items-center gap-4">
        <Image
          src={`https:${avatar.fields.file?.url as string}`}
          alt={avatar.fields.description as string || 'Avatar'}
          width={64}
          height={64}
          className="rounded-full"
        />
        <ThemeToggle />
      </div>
      <div className="prose dark:prose-invert text-sm font-medium leading-normal">
        {documentToReactComponents(body)}
      </div>
    </div>
  )
}
