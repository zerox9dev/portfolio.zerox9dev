import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProjectPage from '@/components/ProjectPage'
import { getIntroContent } from '@/content/intro'
import { getProjectBySlug, getProjectStaticSlugs } from '@/lib/project-content'

interface ProjectRouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getProjectStaticSlugs('en')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug('en', slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.fields.title} — Vadym Mirvald`,
    description: project.fields.strapline,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        en: `/projects/${slug}`,
        ru: `/ru/projects/${slug}`,
        uk: `/ua/projects/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: project.fields.title,
      description: project.fields.strapline,
      url: `/projects/${slug}`,
    },
  }
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params
  const project = await getProjectBySlug('en', slug)

  if (!project) {
    notFound()
  }

  const introData = getIntroContent('en')

  return (
    <ProjectPage
      project={project}
      locale="en"
      avatarSrc={introData.avatarSrc}
      avatarAlt={introData.avatarAlt}
    />
  )
}
