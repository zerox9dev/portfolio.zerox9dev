import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import {
  getBlogEntries,
  getBlogPostBySlug,
  getBlogStaticSlugs,
} from '@/lib/blog-content'

interface BlogPostRouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getBlogStaticSlugs('en')
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug('en', slug)

  if (!post) {
    notFound()
  }

  const otherPosts = await getOtherPosts('en', slug)

  return <BlogPostPage post={post} locale="en" otherPosts={otherPosts} />
}

async function getOtherPosts(locale: 'en' | 'ru' | 'ua', slug: string) {
  const entries = await getBlogEntries(locale)
  return entries.filter((entry) => entry.fields.slug !== slug).slice(0, 4)
}
