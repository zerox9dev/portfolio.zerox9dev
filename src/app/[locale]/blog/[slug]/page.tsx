import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import { fetchBlogPostBySlug } from '@/lib/sanity'

interface BlogPostRouteProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function LocalizedBlogPostRoute({ params }: BlogPostRouteProps) {
  const { locale, slug } = await params
  const routeLocale = locale.toLowerCase()

  if (routeLocale !== 'ru' && routeLocale !== 'ua') {
    notFound()
  }

  const post = await fetchBlogPostBySlug(routeLocale, slug)

  if (!post) {
    notFound()
  }

  return <BlogPostPage post={post} locale={routeLocale as 'ru' | 'ua'} />
}
