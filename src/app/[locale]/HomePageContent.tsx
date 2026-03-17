'use client'

import * as React from 'react';
import Link from 'next/link'
import { Intro } from '@/components/Intro'
import { Project } from '@/components/Project'
import { SectionDivider } from '@/components/SectionDivider'
import { ThemeToggleText } from '@/components/ThemeToggleText'
import Image from 'next/image'
import { buildSanityImageUrl } from '@/lib/sanity'
import { TypeIntroFields, TypeProject, TypeBlogPost, TypeContactFields, TypePageHeadersFields } from '@/types/sanity'

interface HomePageContentProps {
  locale: 'en' | 'ru' | 'ua'
  introData: TypeIntroFields
  projectEntries: TypeProject[]
  blogEntries: TypeBlogPost[]
  contactData?: TypeContactFields
  pageHeaders?: TypePageHeadersFields
}

export default function HomePageContent({
  locale,
  introData,
  projectEntries,
  blogEntries,
  contactData,
  pageHeaders,
}: HomePageContentProps) {
  const headers = pageHeaders

  const [activeCategory, setActiveCategory] = React.useState<'Дизайн' | 'Разработка'>('Дизайн')
  const [gmtPlusOneTime, setGmtPlusOneTime] = React.useState('')
  const filledButtonClass =
    'bg-neutral-200/50 hover:bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2'
  const outlineButtonClass =
    'border border-neutral-200 text-black px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:bg-neutral-100'
  const categoryOptions = [
    { value: 'Дизайн' as const, label: headers?.designCategory || 'Design' },
    { value: 'Разработка' as const, label: headers?.developmentCategory || 'Development' },
  ]
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

  if (!introData) return null

  const filteredProjects = projectEntries.filter((project) => project.fields?.category === activeCategory)
  const avatarSrc = buildSanityImageUrl(introData.avatar, { width: 104, height: 104 }) || '/images/logo.ico'
  const avatarAlt = introData.avatar.description || introData.avatar.alt || 'Avatar'

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 md:px-0 md:py-4 antialiased">
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
            <span className="text-base font-semibold tracking-tight">Vadym Mirvald</span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500">Design Engineer</span>
          </div>
        </div>
        {contactData && (
          <div className="flex gap-2">
            <button
              onClick={() => window.open(contactData.bookCallUrl, '_blank')}
              className="bg-neutral-200/50 hover:bg-neutral-100 text-black px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              aria-label={contactData.bookCallAriaLabel}
            >
              {contactData.bookCallButtonText}
            </button>
            <button
              onClick={() => window.open(contactData.telegramUrl, '_blank')}
              className="border border-neutral-200 dark:border-neutral-800 text-black px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label={contactData.buttonAriaLabel}
            >
              <Image
                src="/tglogo.svg"
                alt="Telegram"
                width={12}
                height={12}
                className="w-3 h-3"
              />
              {contactData.buttonText}
            </button>
          </div>
        )}
      </header>
      {headers?.aboutMeTitle && <SectionDivider title={headers.aboutMeTitle} />}
      <Intro
        body={introData.body}
        availabilityText={introData.availabilityText}
      />
      {headers?.projectsTitle && projectEntries.length > 0 && <SectionDivider title={headers.projectsTitle} />}
      {projectEntries.length > 0 && (
        <div className="bg-white dark:bg-black rounded-xl">
          <div className="mb-4 flex gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`whitespace-nowrap ${
                  activeCategory === category.value
                    ? filledButtonClass
                    : outlineButtonClass
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-1 mt-4">
            {filteredProjects.map((project) => (
              <div className="group relative flex flex-col" key={project._id}>
                {project.fields && <Project {...project.fields} pageHeaders={pageHeaders} />}
              </div>
            ))}
          </div>
        </div>
      )}
      {projectEntries.length === 0 && (
        <div className="rounded-xl border border-dashed border-muted-foreground/30 p-4 text-sm text-muted-foreground">
          No published projects found in Sanity for this locale yet.
        </div>
      )}
      {headers?.blogTitle && blogEntries.length > 0 && <SectionDivider title={headers.blogTitle} />}
      {blogEntries.length > 0 && (
        <div className="bg-white dark:bg-black rounded-xl">
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
      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs dark:border-neutral-800">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">© 2026 Vadym Mirvald</span>
        <div className="flex items-center gap-4">
          <ThemeToggleText />
          <span className="text-xs text-neutral-400 dark:text-neutral-500">GMT+1 : {gmtPlusOneTime || '--:--'}</span>
        </div>
      </footer>
    </main>
  )
}
