import { Suspense } from 'react'
import { getIntroContent } from '@/content/intro'
import { getBlogEntries } from '@/lib/blog-content'
import {
  getArchivedProjectEntries,
  getFeaturedProjectEntries,
  getProjectEntries,
} from '@/lib/project-content'
import { getSiteDictionary } from '@/lib/site-copy'
import HomePageContent from './[locale]/HomePageContent'

export const revalidate = 60

export default async function RootPage() {
  const [allProjectEntries, blogEntries] = await Promise.all([
    getProjectEntries('en'),
    getBlogEntries('en'),
  ])
  const projectEntries = getFeaturedProjectEntries(allProjectEntries)
  const archivedProjectEntries = getArchivedProjectEntries(allProjectEntries)
  const introData = getIntroContent('en')
  const dictionary = getSiteDictionary('en')

  return (
    <Suspense fallback={<div>{dictionary.messages.loading}</div>}>
      <HomePageContent
        locale="en"
        introData={introData}
        projectEntries={projectEntries}
        archivedProjectEntries={archivedProjectEntries}
        blogEntries={blogEntries}
      />
    </Suspense>
  )
}
