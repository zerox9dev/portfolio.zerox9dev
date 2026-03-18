'use client'

import Link from 'next/link'

import { type SiteLocale } from '@/lib/site-copy'

type LocaleToggleTextProps = {
  locale: SiteLocale
  hrefs: Record<SiteLocale, string>
  ariaLabel?: string
}

const localeOrder: SiteLocale[] = ['en', 'ru', 'ua']

export const LocaleToggleText = ({
  locale,
  hrefs,
  ariaLabel = 'Switch language',
}: LocaleToggleTextProps) => {
  const currentIndex = localeOrder.indexOf(locale)
  const nextLocale = localeOrder[(currentIndex + 1) % localeOrder.length]

  return (
    <Link
      href={hrefs[nextLocale]}
      className="text-md text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-400"
      aria-label={ariaLabel}
    >
      {locale.toUpperCase()}
    </Link>
  )
}
