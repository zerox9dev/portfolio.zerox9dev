import Link from 'next/link'
import { portableTextToParagraphs } from '@/lib/portableText'
import { TypeBlogPost } from '@/types/sanity'

interface BlogPostPageProps {
  post: TypeBlogPost
  locale: 'en' | 'ru' | 'ua'
}

export default function BlogPostPage({ post, locale }: BlogPostPageProps) {
  const paragraphs = portableTextToParagraphs(post.fields.body)
  const backHref = locale === 'en' ? '/' : `/${locale}`

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 md:px-0 md:py-4 antialiased">
      <Link href={backHref} className="text-sm text-muted-foreground hover:underline px-4">
        ← Назад
      </Link>
      <article className="rounded-xl bg-white p-4 dark:bg-black">
        <h1 className="text-2xl font-bold">{post.fields.title}</h1>
        {post.fields.excerpt && <p className="mt-2 text-muted-foreground">{post.fields.excerpt}</p>}
        <div className="mt-6 flex flex-col gap-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
