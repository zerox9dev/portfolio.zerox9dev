import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import { buildSanityImageUrl, fetchBlogPostBySlug, fetchHomePageData } from '@/lib/sanity'

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

  const [post, homePageData] = await Promise.all([
    fetchBlogPostBySlug(routeLocale, slug),
    fetchHomePageData(routeLocale),
  ])

  if (!post) {
    notFound()
  }

  const avatarSrc = homePageData.introData
    ? buildSanityImageUrl(homePageData.introData.avatar, { width: 64, height: 64 }) || '/images/logo.ico'
    : '/images/logo.ico'
  const avatarAlt = homePageData.introData?.avatar?.description || homePageData.introData?.avatar?.alt || 'Avatar'

  return <BlogPostPage post={post} locale={routeLocale as 'ru' | 'ua'} avatarSrc={avatarSrc} avatarAlt={avatarAlt} />
}
