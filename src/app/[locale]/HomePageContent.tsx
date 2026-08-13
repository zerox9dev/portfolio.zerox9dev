'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  faCheck,
  faCopy,
  faPenNib,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  const [projectTab, setProjectTab] = React.useState<'own' | 'client'>('client')
  const [emailCopied, setEmailCopied] = React.useState(false)

  const contactRows = React.useMemo(() => {
    const rows: Array<{
      label: string
      href: string
      external?: boolean
      copyable?: boolean
    }> = []

    if (contactLinks.telegramUrl) {
      rows.push({
        label: dictionary.actions.telegram,
        href: contactLinks.telegramUrl,
        external: true,
      })
    }
    if (contactLinks.githubUrl) {
      rows.push({
        label: 'GitHub',
        href: contactLinks.githubUrl,
        external: true,
      })
    }
    if (contactLinks.bookCallUrl) {
      rows.push({
        label: dictionary.actions.bookCall,
        href: contactLinks.bookCallUrl,
        external: true,
      })
    }
    if (contactLinks.email) {
      rows.push({
        label: contactLinks.email,
        href: `mailto:${contactLinks.email}`,
        copyable: true,
      })
    }

    return rows
  }, [contactLinks, dictionary.actions.bookCall, dictionary.actions.telegram])

  const copyEmail = React.useCallback(async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      setEmailCopied(false)
    }
  }, [])

  const allProjects = React.useMemo(
    () => [...projectEntries, ...archivedProjectEntries],
    [archivedProjectEntries, projectEntries],
  )
  const projectsByTab = React.useMemo(
    () => allProjects.filter((p) => p.fields.ownership === projectTab),
    [allProjects, projectTab],
  )
  const projectTabs = React.useMemo(
    () =>
      (['client', 'own'] as const).map((value) => ({
        value,
        label: dictionary.tabs[value],
        count: allProjects.filter((p) => p.fields.ownership === value).length,
      })),
    [allProjects, dictionary.tabs],
  )

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
          <div className="order-1 flex flex-col gap-5 lg:order-none">
            <div className="flex items-stretch gap-2">
              <Image
                src={introData.avatarSrc}
                alt={introData.avatarAlt}
                width={60}
                height={60}
                priority
                className="h-auto w-11 self-stretch border border-neutral-200 object-cover dark:border-neutral-800"
              />
              <div className="flex flex-col gap-0.5">
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

            <Intro body={introData.body} />

            <div className="flex flex-col gap-1 text-xs text-neutral-400 dark:text-neutral-500">
              <span>
                {dictionary.messages.timezone} · {gmtPlusOneTime || '--:--'}
              </span>
              <div className="flex flex-wrap items-center gap-x-1.5">
                {contactRows.map((row, index) => (
                  <span key={row.label} className="flex items-center gap-1.5">
                    {index > 0 && <span aria-hidden="true">·</span>}
                    <a
                      href={row.href}
                      target={row.external ? '_blank' : undefined}
                      rel={row.external ? 'noopener noreferrer' : undefined}
                      className="hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      {row.label}
                    </a>
                    {row.copyable && (
                      <button
                        type="button"
                        onClick={() => copyEmail(row.label)}
                        aria-label={dictionary.actions.copyEmail}
                        className="hover:text-neutral-900 dark:hover:text-neutral-100"
                      >
                        <FontAwesomeIcon
                          icon={emailCopied ? faCheck : faCopy}
                          className="h-3 w-3"
                        />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {emailCopied && (
                <span role="status">{dictionary.actions.copiedEmail}</span>
              )}
            </div>
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
          <div className="flex items-center gap-4 border-b border-neutral-100 text-sm dark:border-neutral-800">
            {projectTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setProjectTab(tab.value)}
                aria-pressed={projectTab === tab.value}
                className={`-mb-px border-b-2 pb-2 transition-colors ${
                  projectTab === tab.value
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
                }`}
              >
                {tab.label}
                <span className="ml-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          {projectsByTab.length > 0 && (
            <div className="flex flex-col gap-4 bg-white dark:bg-black">
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-1">
                {projectsByTab.map((project) => (
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
            </div>
          )}
          {projectsByTab.length === 0 && (
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
        </div>
      </footer>
    </main>
  )
}
