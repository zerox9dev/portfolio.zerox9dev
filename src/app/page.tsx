import { Suspense } from 'react'
import { fetchHomePageData } from '@/lib/sanity'
import HomePageContent from './[locale]/HomePageContent'

export default async function RootPage() {
  const { introData, projectEntries, blogEntries, contactData, pageHeaders } = await fetchHomePageData('en')
  const safeIntroData = introData ?? { body: [], avatar: {} }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent
        locale="en"
        introData={safeIntroData}
        projectEntries={projectEntries}
        blogEntries={blogEntries}
        contactData={contactData}
        pageHeaders={pageHeaders}
      />
    </Suspense>
  )
}
