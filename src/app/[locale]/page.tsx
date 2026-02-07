import { fetchHomePageData } from '@/lib/sanity'
import HomePageContent from './HomePageContent'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

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

  const { introData, projectEntries, blogEntries, contactData, pageHeaders } = await fetchHomePageData(locale)
  const safeIntroData = introData ?? { body: [], avatar: {} }

  // Render the client component with the fetched data
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent
        locale={routeLocale as 'ru' | 'ua'}
        introData={safeIntroData}
        projectEntries={projectEntries}
        blogEntries={blogEntries}
        contactData={contactData}
        pageHeaders={pageHeaders}
      />
    </Suspense>
  )
}
