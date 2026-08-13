import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProjectPage from '@/components/ProjectPage'
import {
  getFeaturedProjectEntries,
  getProjectBySlug,
  getProjectEntries,
  getProjectStaticSlugs,
} from '@/lib/project-content'

interface ProjectRouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getProjectStaticSlugs('en')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
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

  const otherProjects = await getOtherProjects('en', slug)

  return (
    <ProjectPage project={project} locale="en" otherProjects={otherProjects} />
  )
}

async function getOtherProjects(locale: 'en' | 'ru' | 'ua', slug: string) {
  const entries = await getProjectEntries(locale)
  const featured = getFeaturedProjectEntries(entries)
  const featuredSlugs = new Set(featured.map((entry) => entry.fields.slug))
  const rest = entries.filter((entry) => !featuredSlugs.has(entry.fields.slug))

  return [...featured, ...rest]
    .filter((entry) => entry.fields.slug !== slug)
    .slice(0, 4)
}
