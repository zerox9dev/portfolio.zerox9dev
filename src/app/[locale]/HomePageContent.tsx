'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  faPenNib,
  faTableCellsLarge,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Intro } from '@/components/Intro'
import { LocaleToggleText } from '@/components/LocaleToggleText'
import { Project } from '@/components/Project'
import { SectionDivider } from '@/components/SectionDivider'
import { ThemeToggleText } from '@/components/ThemeToggleText'
import Image from 'next/image'
import { type IntroContent } from '@/content/intro'
import {
  getContactLinks,
  getLocaleTag,
  getSiteDictionary,
  type SiteLocale,
} from '@/lib/site-copy'
import { BlogPostEntry, ProjectEntry } from '@/types/content'

interface HomePageContentProps {
  locale: SiteLocale
  introData: IntroContent
  projectEntries: ProjectEntry[]
  archivedProjectEntries: ProjectEntry[]
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
  const getProjectHref = React.useCallback(
    (slug: string) =>
      locale === 'en' ? `/projects/${slug}` : `/${locale}/projects/${slug}`,
    [locale],
  )
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
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 antialiased md:px-0 md:py-4 lg:max-w-[1060px] lg:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14">
        {/* contents on mobile so the blog can be ordered below projects; a sticky column on lg */}
        <div className="contents lg:sticky lg:top-8 lg:flex lg:flex-col lg:gap-8 lg:self-start">
          <div className="order-1 flex flex-col gap-8 lg:order-none">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={introData.avatarSrc}
                  alt={introData.avatarAlt}
                  width={60}
                  height={60}
                  priority
                  className="h-16 w-16 border border-neutral-200 object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold tracking-tight">
                      {dictionary.profileName}
                    </span>
                    {introData.availabilityText && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.05,
                          duration: 0.35,
                          ease: 'easeOut',
                        }}
                        className="inline-flex items-center gap-1.5 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:bg-green-500/10 dark:text-green-300"
                      >
                        <span
                          className="relative flex h-2 w-2"
                          aria-hidden="true"
                        >
                          <span className="absolute inline-flex h-full w-full animate-ping bg-green-400/50" />
                          <span className="relative inline-flex h-2 w-2 bg-green-500" />
                        </span>
                        {introData.availabilityText}
                      </motion.span>
                    )}
                  </div>
                  <span className="text-sm text-neutral-400 dark:text-neutral-500">
                    {dictionary.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(contactLinks.bookCallUrl || contactLinks.telegramUrl) && (
                  <div className="flex gap-2">
                    {contactLinks.bookCallUrl && (
                      <button
                        onClick={() =>
                          window.open(
                            contactLinks.bookCallUrl,
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                        className="flex items-center gap-1 bg-neutral-200/50 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-100"
                        aria-label={dictionary.actions.bookCallAriaLabel}
                      >
                        {dictionary.actions.bookCall}
                      </button>
                    )}
                    {contactLinks.telegramUrl && (
                      <button
                        onClick={() =>
                          window.open(
                            contactLinks.telegramUrl,
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                        className="flex items-center gap-1 border border-neutral-200 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
                        aria-label={dictionary.actions.telegramAriaLabel}
                      >
                        <Image
                          src="/tglogo.svg"
                          alt="Telegram"
                          width={12}
                          height={12}
                          className="h-3 w-3"
                        />
                        {dictionary.actions.telegram}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </header>
            <SectionDivider title={dictionary.sections.about} icon={faUser} />
            <Intro body={introData.body} />
          </div>

          <div className="order-3 flex flex-col gap-8 lg:order-none">
            <SectionDivider title={dictionary.sections.blog} icon={faPenNib} />
            {blogEntries.length > 0 && (
              <div className="bg-white dark:bg-black">
                <div className="flex flex-col gap-3">
                  {blogEntries.map((post) => (
                    <Link
                      key={post._id}
                      href={
                        locale === 'en'
                          ? `/blog/${post.fields.slug}`
                          : `/${locale}/blog/${post.fields.slug}`
                      }
                      className="transition hover:text-neutral-950 dark:hover:text-neutral-100"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="dark:hover:text-white-400 line-clamp-1 text-sm font-normal hover:text-neutral-400">
                          {post.fields.title}
                        </h3>
                        {post.fields.publishedAt && (
                          <time
                            dateTime={post.fields.publishedAt}
                            className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500"
                          >
                            {dateFormatter.format(
                              new Date(post.fields.publishedAt),
                            )}
                          </time>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {blogEntries.length === 0 && (
              <div className="border-muted-foreground/30 text-muted-foreground border border-dashed p-4 text-sm">
                {dictionary.messages.noBlogPosts}
              </div>
            )}
          </div>
        </div>

        <div className="order-2 flex flex-col gap-8 lg:order-none">
          <SectionDivider
            title={dictionary.sections.projects}
            icon={faTableCellsLarge}
          />
          <p className="text-sm leading-relaxed [text-wrap:pretty] text-black dark:text-white">
            {dictionary.messages.projectsIntro}
          </p>
          {projectEntries.length > 0 && (
            <div className="flex flex-col gap-4 bg-white dark:bg-black">
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-1">
                {projectEntries.map((project) => (
                  <div className="relative flex flex-col" key={project._id}>
                    {project.fields && (
                      <Project
                        {...project.fields}
                        href={getProjectHref(project.fields.slug)}
                      />
                    )}
                  </div>
                ))}
                {showArchivedProjects &&
                  archivedProjectEntries.map((project) => (
                    <div className="relative flex flex-col" key={project._id}>
                      {project.fields && (
                        <Project
                          {...project.fields}
                          href={getProjectHref(project.fields.slug)}
                        />
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
            <div className="border-muted-foreground/30 text-muted-foreground border border-dashed p-4 text-sm">
              {dictionary.messages.noProjects}
            </div>
          )}
        </div>
      </div>

      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs dark:border-neutral-800">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          © 2026
        </span>
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
