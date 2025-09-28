'use client'

import * as React from 'react';
import { Entry } from 'contentful'
import { Intro } from '@/components/Intro'
import { Project } from '@/components/Project'
import { SectionDivider } from '@/components/SectionDivider'
import { ContactForm } from '@/components/ContactForm'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
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
  const [activeTab, setActiveTab] = React.useState(headers?.designCategory || 'Дизайн')

  if (!projectEntries.length || !introData) return null

  const renderProjects = (category: string) => {
    const filteredProjects = projectEntries.filter(
      (p) => p.fields && (p.fields as TypeProjectFields).category === category,
    )
    return (
      <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-1 mt-4">
        {filteredProjects.map((project) => (
          <div
            className="group relative flex flex-col"
            key={project.sys.id}
          >
            {project.fields && <Project {...(project.fields as TypeProjectFields)} />}
            <hr className="absolute -bottom-3 right-0 w-[calc(100%-3.5rem)] self-end group-last:hidden md:group-[:nth-last-child(2)]:hidden" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col gap-8 lg:px-4 lg:py-8 antialiased">
      {headers && headers.aboutMeTitle && <SectionDivider title={headers.aboutMeTitle} />}
      <Intro
        body={introData.body}
        avatar={introData.avatar}
      />
      {headers && headers.projectsTitle && <SectionDivider title={headers.projectsTitle} />}
      {headers && headers.designCategory && headers.developmentCategory && (
        <div className="bg-white dark:bg-black p-4 rounded-xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-fit grid-cols-2 rounded-xl">
              <TabsTrigger value={headers.designCategory} className="rounded-xl">{headers.designCategory}</TabsTrigger>
              <TabsTrigger value={headers.developmentCategory} className="rounded-xl">{headers.developmentCategory}</TabsTrigger>
            </TabsList>
            <TabsContent value={headers.designCategory}>{renderProjects(headers.designCategory)}</TabsContent>
            <TabsContent value={headers.developmentCategory}>
              {renderProjects(headers.developmentCategory)}
            </TabsContent>
          </Tabs>
        </div>
      )}
      {headers && headers.contactTitle && <SectionDivider title={headers.contactTitle} />}
      <ContactForm contactData={contactData} />
    </main>
  )
}
