import { MetadataRoute } from 'next'

import { getBlogStaticSlugs } from '@/lib/blog-content'
import { getProjectStaticSlugs } from '@/lib/project-content'
import { type SiteLocale } from '@/lib/site-copy'

const LOCALES: SiteLocale[] = ['en', 'ru', 'ua']

function localizedPath(locale: SiteLocale, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3001'
  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/ru`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ua`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
  ]

  for (const locale of LOCALES) {
    const [projectSlugs, blogSlugs] = await Promise.all([
      getProjectStaticSlugs(locale),
      getBlogStaticSlugs(locale),
    ])

    for (const slug of projectSlugs) {
      entries.push({
        url: `${siteUrl}${localizedPath(locale, `/projects/${slug}`)}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.8 : 0.7,
      })
    }

    for (const slug of blogSlugs) {
      entries.push({
        url: `${siteUrl}${localizedPath(locale, `/blog/${slug}`)}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.7 : 0.6,
      })
    }
  }

  return entries
}
