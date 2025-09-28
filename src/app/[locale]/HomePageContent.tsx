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
import { TypeIntroFields, TypeProjectSkeleton, TypeProjectFields } from '@/types/contentful'

interface HomePageContentProps {
  introData: TypeIntroFields
  projectEntries: Entry<TypeProjectSkeleton>[]
}

export default function HomePageContent({
  introData,
  projectEntries,
}: HomePageContentProps) {
  const [activeTab, setActiveTab] = React.useState('Дизайн')

  if (!projectEntries.length || !introData) return null

  const renderProjects = (category: 'Разработка' | 'Дизайн') => {
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
      <SectionDivider title="КРАТКО ОБО МНЕ" />
      <Intro
        body={introData.body}
        avatar={introData.avatar}
      />
      <SectionDivider title="ПОСЛЕДНИЕ ПРОЕКТЫ" />
      <div className="bg-white dark:bg-black p-4 rounded-xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-fit grid-cols-2 rounded-xl">
            <TabsTrigger value="Дизайн" className="rounded-xl">Дизайн</TabsTrigger>
            <TabsTrigger value="Разработка" className="rounded-xl">Разработка</TabsTrigger>
          </TabsList>
          <TabsContent value="Дизайн">{renderProjects('Дизайн')}</TabsContent>
          <TabsContent value="Разработка">
            {renderProjects('Разработка')}
          </TabsContent>
        </Tabs>
      </div>
      <SectionDivider title="ХОТИТЕ ОБСУДИТЬ ПРОЕКТ?" />
      <ContactForm />
    </main>
  )
}
