'use client'

import * as React from 'react';
import Link from 'next/link'
import { Intro } from '@/components/Intro'
import { Project } from '@/components/Project'
import { SectionDivider } from '@/components/SectionDivider'
import { ThemeToggle } from '@/components/ThemeToggle'
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

  const [activeCategory, setActiveCategory] = React.useState<'all' | 'Дизайн' | 'Разработка'>('all')
  const [gmtPlusOneTime, setGmtPlusOneTime] = React.useState('')
  const allCategoryLabel = locale === 'ru' ? 'Все' : locale === 'ua' ? 'Усі' : 'All'
  const filledButtonClass =
    'bg-neutral-200/50 hover:bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2'
  const outlineButtonClass =
    'border border-neutral-200 text-black px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:bg-neutral-100'
  const categoryOptions = [
    { value: 'all' as const, label: allCategoryLabel },
    { value: 'Дизайн' as const, label: headers?.designCategory || 'Design' },
    { value: 'Разработка' as const, label: headers?.developmentCategory || 'Development' },
  ]

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

  const filteredProjects =
    activeCategory === 'all'
      ? projectEntries
      : projectEntries.filter((project) => project.fields?.category === activeCategory)
  const avatarSrc = buildSanityImageUrl(introData.avatar, { width: 64, height: 64 }) || '/images/logo.ico'
  const avatarAlt = introData.avatar.description || introData.avatar.alt || 'Avatar'

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
      {headers?.aboutMeTitle && <SectionDivider title={headers.aboutMeTitle} />}
      <Intro
        body={introData.body}
        availabilityText={introData.availabilityText}
        contactData={contactData}
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
                <hr className="absolute -bottom-3 right-0 w-[calc(100%-3.5rem)] self-end group-last:hidden md:group-[:nth-last-child(2)]:hidden" />
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
                className="rounded-xl border border-neutral-100 dark:border-neutral-800 p-3 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <h3 className="text-sm font-semibold">{post.fields.title}</h3>
                {post.fields.excerpt && (
                  <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">{post.fields.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-md  dark:border-neutral-800">
        <span className="text-md text-neutral-400 dark:text-neutral-500">© 2026 zerox9dev</span>
        <span className="text-md text-neutral-400 dark:text-neutral-500">GMT+1 : {gmtPlusOneTime || '--:--'}</span>
      </footer>
    </main>
  )
}
