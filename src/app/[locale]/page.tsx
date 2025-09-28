import { createContentfulClient } from '@/lib/contentful'
import { TypeIntroSkeleton, TypeProjectSkeleton, TypeContactSkeleton, TypePageHeadersSkeleton } from '@/types/contentful'
import HomePageContent from './HomePageContent'
import { notFound } from 'next/navigation'

// Tell Next.js which locales are supported
export async function generateStaticParams() {
  return [{ locale: 'en-US' }, { locale: 'uk-UA' }]
}

interface HomeProps {
  params: {
    locale: string
  }
}

export default async function Home({ params }: HomeProps) {
  console.log(`[5] Page: Received locale "${params.locale}"`);
  const locale = params.locale.replace('_', '-')
  const contentfulClient = createContentfulClient(locale)

  // Fetch data in parallel
  const [introEntry, projectEntries, contactEntry, pageHeadersEntry] = await Promise.all([
    contentfulClient.getEntries<TypeIntroSkeleton>({
      content_type: 'intro',
      limit: 1,
      include: 1,
      locale,
    }),
    contentfulClient.getEntries<TypeProjectSkeleton>({
      content_type: 'project',
      include: 2,
      locale,
    }),
    contentfulClient.getEntries<TypeContactSkeleton>({
      content_type: 'contact',
      limit: 1,
      locale,
    }),
    contentfulClient.getEntries<TypePageHeadersSkeleton>({
      content_type: 'pageHeaders',
      limit: 1,
      locale,
    }),
  ])

  const introData = introEntry.items[0]?.fields
  const contactData = contactEntry.items[0]?.fields
  const pageHeadersData = pageHeadersEntry.items[0]?.fields

  // If essential data is missing, render the 404 page
  if (!introData) {
    notFound()
  }

  // Render the client component with the fetched data
  return (
    <HomePageContent
      introData={introData}
      projectEntries={projectEntries.items}
      contactData={contactData}
      pageHeaders={pageHeadersData}
    />
  )
}