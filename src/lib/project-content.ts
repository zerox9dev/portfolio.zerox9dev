import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import { ProjectShot } from '@/components/ProjectShot'
import { ProjectShotRow } from '@/components/ProjectShotRow'
import { type SiteLocale } from '@/lib/site-copy'
import {
  type ContentImage,
  type ProjectEntry,
  type ProjectPageData,
} from '@/types/content'

export const FEATURED_PROJECT_SLUGS = [
  'logr',
  'oceangroup',
  'holyheld',
  'turbo-work',
] as const

type ProjectFrontmatter = {
  title: string
  slug: string
  strapline: string
  category: 'Дизайн' | 'Разработка' | string
  link?: string
  tech?: string[] | string
  logo: ContentImage
  media?: ContentImage[]
  ownership?: 'own' | 'client'
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

function toProjectEntry(
  filePath: string,
  frontmatter: ProjectFrontmatter,
): ProjectEntry {
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
      ownership: frontmatter.ownership ?? 'client',
    },
  }
}

export async function getProjectEntries(
  locale: SiteLocale,
): Promise<ProjectEntry[]> {
  const filePaths = await readMdxFiles(locale)

  return Promise.all(
    filePaths.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8')
      const { data } = matter(source)
      return toProjectEntry(filePath, data as ProjectFrontmatter)
    }),
  )
}

export async function getProjectBySlug(
  locale: SiteLocale,
  slug: string,
): Promise<ProjectPageData | null> {
  const filePaths = await readMdxFiles(locale)

  for (const filePath of filePaths) {
    const source = await fs.readFile(filePath, 'utf8')
    const { data } = matter(source)

    if ((data as ProjectFrontmatter).slug !== slug) {
      continue
    }

    const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
      source,
      components: { ProjectShot, ProjectShotRow },
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
  }

  return null
}

export async function getProjectStaticSlugs(
  locale: SiteLocale,
): Promise<string[]> {
  const entries = await getProjectEntries(locale)
  return entries.map((entry) => entry.fields.slug)
}

export function getFeaturedProjectEntries<T extends ProjectEntry>(
  entries: T[],
): T[] {
  const bySlug = new Map(entries.map((entry) => [entry.fields.slug, entry]))

  return FEATURED_PROJECT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (entry): entry is T => Boolean(entry),
  )
}

export function getArchivedProjectEntries<T extends ProjectEntry>(
  entries: T[],
): T[] {
  const featuredSlugs = new Set<string>(FEATURED_PROJECT_SLUGS)
  return entries.filter((entry) => !featuredSlugs.has(entry.fields.slug))
}
