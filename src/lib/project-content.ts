import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import { type SiteLocale } from '@/lib/site-copy'
import { type ContentImage, type ProjectEntry, type ProjectPageData } from '@/types/content'

export const FEATURED_PROJECT_SLUGS = ['oceangroup', 'holyheld', 'turbo-work'] as const

type ProjectFrontmatter = {
  title: string
  slug: string
  strapline: string
  category: 'Дизайн' | 'Разработка' | string
  link?: string
  tech?: string[] | string
  logo: ContentImage
  media?: ContentImage[]
}

function getProjectLocaleDirectory(locale: SiteLocale) {
  return path.join(process.cwd(), 'src', 'content', 'projects', locale)
}

async function readMdxFiles(locale: SiteLocale) {
  const directory = getProjectLocaleDirectory(locale)

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
      .map((entry) => path.join(directory, entry.name))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

function toProjectEntry(filePath: string, frontmatter: ProjectFrontmatter): ProjectEntry {
  const fileName = path.basename(filePath, '.mdx')

  return {
    _id: `project-${fileName}`,
    fields: {
      title: frontmatter.title,
      slug: frontmatter.slug,
      link: frontmatter.link,
      logo: frontmatter.logo,
      strapline: frontmatter.strapline,
      tech: frontmatter.tech ?? [],
      media: frontmatter.media ?? [],
      category: frontmatter.category,
    },
  }
}

export async function getProjectEntries(locale: SiteLocale): Promise<ProjectPageData[]> {
  const filePaths = await readMdxFiles(locale)

  return Promise.all(
    filePaths.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8')
      const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
        source,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      })

      return {
        ...toProjectEntry(filePath, frontmatter),
        content,
      }
    }),
  )
}

export function getFeaturedProjectEntries(entries: ProjectPageData[]): ProjectPageData[] {
  const bySlug = new Map(entries.map((entry) => [entry.fields.slug, entry]))

  return FEATURED_PROJECT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (entry): entry is ProjectPageData => Boolean(entry),
  )
}

export function getArchivedProjectEntries(entries: ProjectPageData[]): ProjectPageData[] {
  const featuredSlugs = new Set(FEATURED_PROJECT_SLUGS)
  return entries.filter((entry) => !featuredSlugs.has(entry.fields.slug as (typeof FEATURED_PROJECT_SLUGS)[number]))
}
