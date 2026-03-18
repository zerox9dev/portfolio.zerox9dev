import Link from 'next/link'
import Image from 'next/image'

import LiveTimeText from '@/components/LiveTimeText'
import { ThemeToggleText } from '@/components/ThemeToggleText'
import { getLocaleTag, getSiteDictionary, type SiteLocale } from '@/lib/site-copy'
import { type BlogPostPageData } from '@/types/content'

interface BlogPostPageProps {
  post: BlogPostPageData
  locale: SiteLocale
  avatarSrc?: string
  avatarAlt?: string
}

export default function BlogPostPage({
  post,
  locale,
  avatarSrc = '/images/logo.ico',
  avatarAlt = 'Vadym Mirvald',
}: BlogPostPageProps) {
  const dictionary = getSiteDictionary(locale)
  const backHref = locale === 'en' ? '/' : `/${locale}`
  const formattedDate = post.fields.publishedAt
    ? new Intl.DateTimeFormat(getLocaleTag(locale), {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(post.fields.publishedAt))
    : null

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 antialiased md:px-0 md:py-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={52}
            height={52}
            priority
            className="h-13 w-13 rounded-full border border-neutral-200 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              {dictionary.profileName}
            </span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500">
              {dictionary.role}
            </span>
          </div>
        </div>
      </header>

      <article className="bg-white dark:bg-black">
        <Link
          href={backHref}
          className="mb-4 inline-block text-sm text-muted-foreground hover:underline"
        >
          ← {dictionary.actions.back}
        </Link>
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold">{post.fields.title}</h1>
          {formattedDate && (
            <time
              dateTime={post.fields.publishedAt}
              className="shrink-0 pt-1 text-xs text-neutral-400 dark:text-neutral-500"
            >
              {formattedDate}
            </time>
          )}
        </div>
        <div className="prose prose-neutral mt-6 max-w-none text-neutral-600 dark:prose-invert dark:text-neutral-400">
          {post.content}
        </div>
      </article>

      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs dark:border-neutral-800">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          © 2026 {dictionary.profileName}
        </span>
        <div className="flex items-center gap-4">
          <ThemeToggleText
            labels={dictionary.theme.names}
            ariaLabel={dictionary.theme.label}
          />
          <LiveTimeText prefix={dictionary.messages.timezone} />
        </div>
      </footer>
    </main>
  )
}
