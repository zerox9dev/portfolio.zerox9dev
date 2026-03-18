'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Intro } from '@/components/Intro'
import { LocaleToggleText } from '@/components/LocaleToggleText'
import { Project } from '@/components/Project'
import RoleTooltip from '@/components/RoleTooltip'
import { SectionDivider } from '@/components/SectionDivider'
import { ThemeToggleText } from '@/components/ThemeToggleText'
import Image from 'next/image'
import { type IntroContent } from '@/content/intro'
import { getContactLinks, getLocaleTag, getSiteDictionary, type SiteLocale } from '@/lib/site-copy'
import { BlogPostEntry, ProjectPageData } from '@/types/content'

interface HomePageContentProps {
  locale: SiteLocale
  introData: IntroContent
  projectEntries: ProjectPageData[]
  archivedProjectEntries: ProjectPageData[]
  blogEntries: BlogPostEntry[]
}

export default function HomePageContent({
  locale,
  introData,
  projectEntries,
  archivedProjectEntries,
  blogEntries,
}: HomePageContentProps) {
  const dictionary = getSiteDictionary(locale)
  const contactLinks = getContactLinks()
  const pathname = usePathname()
  const [gmtPlusOneTime, setGmtPlusOneTime] = React.useState('')
  const [showArchivedProjects, setShowArchivedProjects] = React.useState(false)
  const dateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(getLocaleTag(locale), {
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

  const localeLinks = React.useMemo(() => {
    const path = pathname || '/'

    const stripLocalePrefix = (value: string) => {
      if (value === '/ru' || value === '/ua') return '/'
      if (value.startsWith('/ru/')) return value.slice(3)
      if (value.startsWith('/ua/')) return value.slice(3)
      return value
    }

    const basePath = stripLocalePrefix(path)

    return {
      en: basePath,
      ru: basePath === '/' ? '/ru' : `/ru${basePath}`,
      ua: basePath === '/' ? '/ua' : `/ua${basePath}`,
    }
  }, [pathname])

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 md:px-0 md:py-4 antialiased">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={introData.avatarSrc}
            alt={introData.avatarAlt}
            width={52}
            height={52}
            priority
            className="h-13 w-13 rounded-full border border-neutral-200 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">{dictionary.profileName}</span>
            <RoleTooltip
              role={dictionary.role}
              text={dictionary.roleTooltip}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {introData.availabilityText && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.35, ease: 'easeOut' }}
              className="hidden sm:flex"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-300">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                {introData.availabilityText}
              </span>
            </motion.div>
          )}
        {(contactLinks.bookCallUrl || contactLinks.telegramUrl) && (
          <div className="flex gap-2">
            {contactLinks.bookCallUrl && (
              <button
                onClick={() => window.open(contactLinks.bookCallUrl, '_blank', 'noopener,noreferrer')}
                className="bg-neutral-200/50 hover:bg-neutral-100 text-black px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                aria-label={dictionary.actions.bookCallAriaLabel}
              >
                {dictionary.actions.bookCall}
              </button>
            )}
            {contactLinks.telegramUrl && (
              <button
                onClick={() => window.open(contactLinks.telegramUrl, '_blank', 'noopener,noreferrer')}
                className="border border-neutral-200 dark:border-neutral-800 text-black px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label={dictionary.actions.telegramAriaLabel}
              >
                <Image
                  src="/tglogo.svg"
                  alt="Telegram"
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
                {dictionary.actions.telegram}
              </button>
            )}
          </div>
        )}
        </div>
      </header>
      <SectionDivider title={dictionary.sections.about} />
      <Intro body={introData.body} />
      <SectionDivider title={dictionary.sections.projects} />
      {projectEntries.length > 0 && (
        <div className="flex flex-col bg-white dark:bg-black  gap-4">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-1">
            {projectEntries.map((project) => (
              <div className="group relative flex flex-col" key={project._id}>
                {project.fields && (
                  <Project {...project.fields}>
                    {project.content}
                  </Project>
                )}
              </div>
            ))}
            {showArchivedProjects &&
              archivedProjectEntries.map((project) => (
                <div className="group relative flex flex-col" key={project._id}>
                  {project.fields && (
                    <Project {...project.fields}>
                      {project.content}
                    </Project>
                  )}
                </div>
              ))}
          </div>
          {archivedProjectEntries.length > 0 && !showArchivedProjects && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowArchivedProjects((value) => !value)}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {`${dictionary.actions.moreProjects} (${archivedProjectEntries.length})`}
              </button>
            </div>
          )}
        </div>
      )}
      {projectEntries.length === 0 && (
        <div className="rounded-xl border border-dashed border-muted-foreground/30 p-4 text-sm text-muted-foreground">
          {dictionary.messages.noProjects}
        </div>
      )}
      <SectionDivider title={dictionary.sections.blog} />
      {blogEntries.length > 0 && (
        <div className="bg-white dark:bg-black">
          <div className="flex flex-col gap-3">
            {blogEntries.map((post) => (
              <Link
                key={post._id}
                href={locale === 'en' ? `/blog/${post.fields.slug}` : `/${locale}/blog/${post.fields.slug}`}
                className="transition hover:text-neutral-950 dark:hover:text-neutral-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-normal line-clamp-1 hover:text-neutral-400 dark:hover:text-white-400">
                    {post.fields.title}
                  </h3>
                  {post.fields.publishedAt && (
                    <time
                      dateTime={post.fields.publishedAt}
                      className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500"
                    >
                      {dateFormatter.format(new Date(post.fields.publishedAt))}
                    </time>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {blogEntries.length === 0 && (
        <div className="rounded-xl border border-dashed border-muted-foreground/30 p-4 text-sm text-muted-foreground">
          {dictionary.messages.noBlogPosts}
        </div>
      )}
      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs dark:border-neutral-800">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">© 2026</span>
        <div className="flex items-center gap-4">
          <LocaleToggleText locale={locale} hrefs={localeLinks} />
          <ThemeToggleText
            labels={dictionary.theme.names}
            ariaLabel={dictionary.theme.label}
          />
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            {dictionary.messages.timezone} : {gmtPlusOneTime || '--:--'}
          </span>
        </div>
      </footer>
    </main>
  )
}
