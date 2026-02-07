import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import { buildSanityImageUrl, fetchBlogPostBySlug, fetchHomePageData } from '@/lib/sanity'

interface BlogPostRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params
  const [post, homePageData] = await Promise.all([
    fetchBlogPostBySlug('en', slug),
    fetchHomePageData('en'),
  ])

  if (!post) {
    notFound()
  }

  const avatarSrc = homePageData.introData
    ? buildSanityImageUrl(homePageData.introData.avatar, { width: 64, height: 64 }) || '/images/logo.ico'
    : '/images/logo.ico'
  const avatarAlt = homePageData.introData?.avatar?.description || homePageData.introData?.avatar?.alt || 'Avatar'

  return <BlogPostPage post={post} locale="en" avatarSrc={avatarSrc} avatarAlt={avatarAlt} />
}
