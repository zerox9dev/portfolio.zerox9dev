import { getIntroContent } from '@/content/intro'
import { getBlogEntries } from '@/lib/blog-content'
import {
  getArchivedProjectEntries,
  getFeaturedProjectEntries,
  getProjectEntries,
} from '@/lib/project-content'
import { getSiteDictionary } from '@/lib/site-copy'
import HomePageContent from './HomePageContent'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

export const revalidate = 60

// Tell Next.js which locales are supported
export async function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ua' }]
}

interface HomeProps {
  params: Promise<{
    locale: string
  }>
}

export default async function Home({ params }: HomeProps) {
  const { locale: localeParam } = await params
  const routeLocale = localeParam.toLowerCase()
  const localeByRoute: Record<string, string> = {
    ru: 'ru',
    ua: 'ua',
  }
  const locale = localeByRoute[routeLocale]

  if (!locale) {
    notFound()
  }

  const [allProjectEntries, blogEntries] = await Promise.all([
    getProjectEntries(routeLocale as 'ru' | 'ua'),
    getBlogEntries(routeLocale as 'ru' | 'ua'),
  ])
  const projectEntries = getFeaturedProjectEntries(allProjectEntries)
  const archivedProjectEntries = getArchivedProjectEntries(allProjectEntries)
  const introData = getIntroContent(routeLocale as 'ru' | 'ua')
  const dictionary = getSiteDictionary(routeLocale as 'ru' | 'ua')

  // Render the client component with the fetched data
  return (
    <Suspense fallback={<div>{dictionary.messages.loading}</div>}>
      <HomePageContent
        locale={routeLocale as 'ru' | 'ua'}
        introData={introData}
        projectEntries={projectEntries}
        archivedProjectEntries={archivedProjectEntries}
        blogEntries={blogEntries}
      />
    </Suspense>
  )
}
