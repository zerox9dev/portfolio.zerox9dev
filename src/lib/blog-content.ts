import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import { type SiteLocale } from '@/lib/site-copy'
import { type BlogPostEntry, type BlogPostPageData } from '@/types/content'

type BlogFrontmatter = {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string | Date
}

function normalizePublishedAt(value?: string | Date): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return undefined
}

function getBlogLocaleDirectory(locale: SiteLocale) {
  return path.join(process.cwd(), 'src', 'content', 'blog', locale)
}

async function readMdxFiles(locale: SiteLocale) {
  const directory = getBlogLocaleDirectory(locale)

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
      .map((entry) => path.join(directory, entry.name))
  } catch {
    return []
  }
}

function toBlogEntry(filePath: string, frontmatter: BlogFrontmatter): BlogPostEntry {
  const fileName = path.basename(filePath, '.mdx')

  return {
    _id: `blog-${fileName}`,
    fields: {
      title: frontmatter.title,
      slug: frontmatter.slug,
      excerpt: frontmatter.excerpt,
      publishedAt: normalizePublishedAt(frontmatter.publishedAt),
    },
  }
}

export async function getBlogEntries(locale: SiteLocale): Promise<BlogPostEntry[]> {
  const filePaths = await readMdxFiles(locale)
  const posts = await Promise.all(
    filePaths.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8')
      const { data } = matter(source)
      return toBlogEntry(filePath, data as BlogFrontmatter)
    }),
  )

  return posts.sort((left, right) =>
    (right.fields.publishedAt ?? '').localeCompare(left.fields.publishedAt ?? ''),
  )
}

export async function getBlogPostBySlug(
  locale: SiteLocale,
  slug: string,
): Promise<BlogPostPageData | null> {
  const filePath = path.join(getBlogLocaleDirectory(locale), `${slug}.mdx`)

  try {
    const source = await fs.readFile(filePath, 'utf8')
    const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    })

    return {
      _id: `blog-${locale}-${slug}`,
      fields: {
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt,
        publishedAt: normalizePublishedAt(frontmatter.publishedAt),
      },
      content,
    }
  } catch {
    return null
  }
}

export async function getBlogStaticSlugs(locale: SiteLocale): Promise<string[]> {
  const entries = await getBlogEntries(locale)
  return entries.map((entry) => entry.fields.slug)
}
