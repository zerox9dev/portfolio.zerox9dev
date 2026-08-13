import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import {
  getBlogEntries,
  getBlogPostBySlug,
  getBlogStaticSlugs,
} from '@/lib/blog-content'

interface BlogPostRouteProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const [enSlugs, ruSlugs, uaSlugs] = await Promise.all([
    getBlogStaticSlugs('en'),
    getBlogStaticSlugs('ru'),
    getBlogStaticSlugs('ua'),
  ])

  return [
    ...enSlugs.map((slug) => ({ locale: 'en', slug })),
    ...ruSlugs.map((slug) => ({ locale: 'ru', slug })),
    ...uaSlugs.map((slug) => ({ locale: 'ua', slug })),
  ]
}

export default async function LocalizedBlogPostRoute({
  params,
}: BlogPostRouteProps) {
  const { locale, slug } = await params
  const routeLocale = locale.toLowerCase()

  if (routeLocale !== 'en' && routeLocale !== 'ru' && routeLocale !== 'ua') {
    notFound()
  }

  const post = await getBlogPostBySlug(routeLocale as 'en' | 'ru' | 'ua', slug)

  if (!post) {
    notFound()
  }

  const siteLocale = routeLocale as 'en' | 'ru' | 'ua'
  const otherPosts = await getOtherPosts(siteLocale, slug)

  return (
    <BlogPostPage post={post} locale={siteLocale} otherPosts={otherPosts} />
  )
}

async function getOtherPosts(locale: 'en' | 'ru' | 'ua', slug: string) {
  const entries = await getBlogEntries(locale)
  return entries.filter((entry) => entry.fields.slug !== slug).slice(0, 4)
}
