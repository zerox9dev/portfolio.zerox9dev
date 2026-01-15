'use client'

import * as React from 'react';
import { Entry } from 'contentful'
import { useSearchParams } from 'next/navigation'
import { Intro } from '@/components/Intro'
import { Project } from '@/components/Project'
import { SectionDivider } from '@/components/SectionDivider'
import { TypeIntroFields, TypeProjectSkeleton, TypeProjectFields, TypeContactFields, TypePageHeadersFields } from '@/types/contentful'

interface HomePageContentProps {
  introData: TypeIntroFields
  projectEntries: Entry<TypeProjectSkeleton>[]
  contactData?: TypeContactFields
  pageHeaders?: TypePageHeadersFields
}

export default function HomePageContent({
  introData,
  projectEntries,
  contactData,
  pageHeaders,
}: HomePageContentProps) {
  const headers = pageHeaders
  const searchParams = useSearchParams()
  const hasVibeCoding = searchParams.has('vibecoding')

  // Determine active category based on URL parameter
  // Default: designer (design category)
  // ?vibecoding: developer (development category)
  const activeCategory = hasVibeCoding ? headers?.developmentCategory : headers?.designCategory

  if (!projectEntries.length || !introData) return null

  const renderProjects = (category: string) => {
    const filteredProjects = projectEntries.filter(
      (p) => p.fields && (p.fields as TypeProjectFields).category === category,
    )
    return (
      <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 mt-4">
        {filteredProjects.map((project) => (
          <div
            className="group relative flex flex-col"
            key={project.sys.id}
          >
            {project.fields && <Project {...(project.fields as TypeProjectFields)} pageHeaders={pageHeaders} />}
            <hr className="absolute -bottom-3 right-0 w-[calc(100%-3.5rem)] self-end group-last:hidden md:group-[:nth-last-child(2)]:hidden" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[896px] flex-col gap-8 px-4 py-8 md:px-0 md:py-4 antialiased">
      {headers?.aboutMeTitle && <SectionDivider title={headers.aboutMeTitle} />}
      <Intro
        body={introData.body}
        avatar={introData.avatar}
        contactData={contactData}
        alternativeBody={hasVibeCoding ? introData.alternativeBody : undefined}
      />
      {headers?.projectsTitle && <SectionDivider title={headers.projectsTitle} />}
      {activeCategory && (
        <div className="bg-white dark:bg-black p-4 rounded-xl">
          {renderProjects(activeCategory)}
        </div>
      )}
    </main>
  )
}
