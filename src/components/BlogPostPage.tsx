'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { portableTextToParagraphs } from '@/lib/portableText'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TypeBlogPost } from '@/types/sanity'

interface BlogPostPageProps {
  post: TypeBlogPost
  locale: 'en' | 'ru' | 'ua'
  avatarSrc?: string
  avatarAlt?: string
}

export default function BlogPostPage({ post, locale, avatarSrc = '/images/logo.ico', avatarAlt = 'zerox9dev' }: BlogPostPageProps) {
  const paragraphs = portableTextToParagraphs(post.fields.body)
  const backHref = locale === 'en' ? '/' : `/${locale}`
  const [gmtPlusOneTime, setGmtPlusOneTime] = React.useState('')
  const dateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'ua' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    [locale],
  )

  React.useEffect(() => {
    const formatGmtPlusOne = () => {
      const now = new Date()
      const hours = (now.getUTCHours() + 1) % 24
      const minutes = now.getUTCMinutes()
      const hh = String(hours).padStart(2, '0')
      const mm = String(minutes).padStart(2, '0')
      setGmtPlusOneTime(`${hh}:${mm}`)
    }

    formatGmtPlusOne()
    const timer = setInterval(formatGmtPlusOne, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 md:px-0 md:py-4 antialiased">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-neutral-200 object-cover"
          />
          <span className="text-base font-semibold tracking-tight">zerox9dev</span>
        </div>
        <ThemeToggle />
      </header>

      <article className="bg-white dark:bg-black">
        <Link href={backHref} className="text-sm text-muted-foreground hover:underline mb-4">
          ← Назад
        </Link>
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold">{post.fields.title}</h1>
          {post.fields.publishedAt && (
            <time
              dateTime={post.fields.publishedAt}
              className="shrink-0 pt-1 text-xs text-neutral-400 dark:text-neutral-500"
            >
              {dateFormatter.format(new Date(post.fields.publishedAt))}
            </time>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-md dark:border-neutral-800">
        <span className="text-md text-neutral-400 dark:text-neutral-500">© 2026 zerox9dev</span>
        <span className="text-md text-neutral-400 dark:text-neutral-500">GMT+1 : {gmtPlusOneTime || '--:--'}</span>
      </footer>
    </main>
  )
}
