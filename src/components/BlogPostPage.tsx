import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import LiveTimeText from '@/components/LiveTimeText'
import { ThemeToggleText } from '@/components/ThemeToggleText'
import {
  getLocaleTag,
  getSiteDictionary,
  type SiteLocale,
} from '@/lib/site-copy'
import { type BlogPostPageData } from '@/types/content'

interface BlogPostPageProps {
  post: BlogPostPageData
  locale: SiteLocale
}

export default function BlogPostPage({ post, locale }: BlogPostPageProps) {
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
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between gap-4 text-sm"
      >
        <ol className="flex min-w-0 items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
          <li className="shrink-0">
            <Link
              href={backHref}
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {dictionary.profileName}
            </Link>
          </li>
          <li aria-hidden="true" className="shrink-0">
            /
          </li>
          <li className="shrink-0">{dictionary.sections.blog}</li>
          <li aria-hidden="true" className="shrink-0">
            /
          </li>
          <li
            aria-current="page"
            className="truncate text-neutral-900 dark:text-neutral-100"
          >
            {post.fields.title}
          </li>
        </ol>
        <Link
          href={backHref}
          className="inline-flex shrink-0 items-center gap-1 border border-neutral-200 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {dictionary.actions.back}
        </Link>
      </nav>

      <article className="bg-white dark:bg-black">
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
        <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none text-neutral-600 dark:text-neutral-400">
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
