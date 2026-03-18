import React from 'react'

import { type RichText } from '@/types/content'

type RichTextRendererProps = {
  value?: RichText
}

function renderChildren(block: NonNullable<RichText>[number]) {
  const markDefs = new Map(
    (block.markDefs ?? [])
      .filter((markDef) => markDef?._key)
      .map((markDef) => [markDef._key as string, markDef]),
  )

  return (block.children ?? []).map((child, index) => {
    const text = child?.text ?? ''
    const key = child?._key || `${block._key || 'block'}-${index}`

    if (!child?.marks?.length) {
      return <React.Fragment key={key}>{text}</React.Fragment>
    }

    return child.marks.reduce<React.ReactNode>((content, mark) => {
      const markDef = markDefs.get(mark)

      if (mark === 'strong') {
        return <strong key={`${key}-${mark}`}>{content}</strong>
      }

      if (mark === 'em') {
        return <em key={`${key}-${mark}`}>{content}</em>
      }

      if (mark === 'code') {
        return (
          <code key={`${key}-${mark}`} className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-900">
            {content}
          </code>
        )
      }

      if (markDef?._type === 'link' && markDef.href) {
        return (
          <a
            key={`${key}-${mark}`}
            href={markDef.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 dark:decoration-neutral-700 dark:hover:text-neutral-100"
          >
            {content}
          </a>
        )
      }

      return <React.Fragment key={`${key}-${mark}`}>{content}</React.Fragment>
    }, text)
  })
}

export default function RichTextRenderer({ value }: RichTextRendererProps) {
  if (!Array.isArray(value) || value.length === 0) return null

  return (
    <div className="prose prose-neutral max-w-none text-neutral-600 dark:prose-invert dark:text-neutral-400">
      {value.map((block, index) => {
        if (block?._type !== 'block') return null

        const key = block._key || `block-${index}`
        const children = renderChildren(block)

        if (block.style === 'h1') {
          return <h1 key={key}>{children}</h1>
        }

        if (block.style === 'h2') {
          return <h2 key={key}>{children}</h2>
        }

        if (block.style === 'h3') {
          return <h3 key={key}>{children}</h3>
        }

        if (block.style === 'blockquote') {
          return <blockquote key={key}>{children}</blockquote>
        }

        return <p key={key}>{children}</p>
      })}
    </div>
  )
}
