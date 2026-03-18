import { getIntroContent } from '@/content/intro'
import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import { getBlogPostBySlug, getBlogStaticSlugs } from '@/lib/blog-content'

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

  const introData = getIntroContent('en')

  return (
    <BlogPostPage
      post={post}
      locale="en"
      avatarSrc={introData.avatarSrc}
      avatarAlt={introData.avatarAlt}
    />
  )
}
