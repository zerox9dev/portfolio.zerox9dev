import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProjectPage from '@/components/ProjectPage'
import { getIntroContent } from '@/content/intro'
import { getProjectBySlug, getProjectStaticSlugs } from '@/lib/project-content'
import { type SiteLocale } from '@/lib/site-copy'

interface ProjectRouteProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

function toSiteLocale(value: string): SiteLocale | null {
  const locale = value.toLowerCase()
  return locale === 'en' || locale === 'ru' || locale === 'ua' ? locale : null
}

export async function generateStaticParams() {
  const [enSlugs, ruSlugs, uaSlugs] = await Promise.all([
    getProjectStaticSlugs('en'),
    getProjectStaticSlugs('ru'),
    getProjectStaticSlugs('ua'),
  ])

  return [
    ...enSlugs.map((slug) => ({ locale: 'en', slug })),
    ...ruSlugs.map((slug) => ({ locale: 'ru', slug })),
    ...uaSlugs.map((slug) => ({ locale: 'ua', slug })),
  ]
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { locale, slug } = await params
  const siteLocale = toSiteLocale(locale)

  if (!siteLocale) {
    return {}
  }

  const project = await getProjectBySlug(siteLocale, slug)

  if (!project) {
    return {}
  }

  const canonical = siteLocale === 'en' ? `/projects/${slug}` : `/${siteLocale}/projects/${slug}`

  return {
    title: `${project.fields.title} — Vadym Mirvald`,
    description: project.fields.strapline,
    alternates: {
      canonical,
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
      url: canonical,
    },
  }
}

export default async function LocalizedProjectRoute({ params }: ProjectRouteProps) {
  const { locale, slug } = await params
  const siteLocale = toSiteLocale(locale)

  if (!siteLocale) {
    notFound()
  }

  const project = await getProjectBySlug(siteLocale, slug)

  if (!project) {
    notFound()
  }

  const introData = getIntroContent(siteLocale)

  return (
    <ProjectPage
      project={project}
      locale={siteLocale}
      avatarSrc={introData.avatarSrc}
      avatarAlt={introData.avatarAlt}
    />
  )
}
