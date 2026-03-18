import { getIntroContent } from '@/content/intro'
import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import { getBlogPostBySlug, getBlogStaticSlugs } from '@/lib/blog-content'

interface BlogPostRouteProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const [ruSlugs, uaSlugs] = await Promise.all([
    getBlogStaticSlugs('ru'),
    getBlogStaticSlugs('ua'),
  ])

  return [
    ...ruSlugs.map((slug) => ({ locale: 'ru', slug })),
    ...uaSlugs.map((slug) => ({ locale: 'ua', slug })),
  ]
}

export default async function LocalizedBlogPostRoute({ params }: BlogPostRouteProps) {
  const { locale, slug } = await params
  const routeLocale = locale.toLowerCase()

  if (routeLocale !== 'ru' && routeLocale !== 'ua') {
    notFound()
  }

  const post = await getBlogPostBySlug(routeLocale as 'ru' | 'ua', slug)

  if (!post) {
    notFound()
  }

  const introData = getIntroContent(routeLocale as 'ru' | 'ua')

  return (
    <BlogPostPage
      post={post}
      locale={routeLocale as 'ru' | 'ua'}
      avatarSrc={introData.avatarSrc}
      avatarAlt={introData.avatarAlt}
    />
  )
}
