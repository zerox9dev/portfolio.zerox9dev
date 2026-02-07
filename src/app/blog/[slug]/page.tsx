import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'
import { fetchBlogPostBySlug } from '@/lib/sanity'

interface BlogPostRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params
  const post = await fetchBlogPostBySlug('en', slug)

  if (!post) {
    notFound()
  }

  return <BlogPostPage post={post} locale="en" />
}
