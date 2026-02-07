import React from 'react'
import { PortableText } from '@/types/sanity'

type PortableTextRendererProps = {
  value?: PortableText
}

function applyMark(mark: string, content: React.ReactNode, href?: string) {
  if (mark === 'strong') return <strong>{content}</strong>
  if (mark === 'em') return <em>{content}</em>
  if (mark === 'code') return <code>{content}</code>
  if (mark === 'underline') return <u>{content}</u>
  if (mark === 'strike-through') return <s>{content}</s>

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
        {content}
      </a>
    )
  }

  return content
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!Array.isArray(value) || value.length === 0) return null

  return (
    <>
      {value
        .filter((block) => block?._type === 'block')
        .map((block, blockIndex) => {
          const markDefs = block.markDefs ?? []

          return (
            <p key={block._key ?? `block-${blockIndex}`}>
              {(block.children ?? []).map((span, spanIndex) => {
                const text = span?.text ?? ''
                const marks = span?.marks ?? []

                const rendered = marks.reduce<React.ReactNode>((acc, mark) => {
                  const markDef = markDefs.find((def) => def?._key === mark)
                  const href = markDef?._type === 'link' ? markDef.href : undefined
                  return (
                    <React.Fragment key={`${blockIndex}-${spanIndex}-${mark}`}>
                      {applyMark(mark, acc, href)}
                    </React.Fragment>
                  )
                }, text)

                return <React.Fragment key={span?._key ?? `${blockIndex}-${spanIndex}`}>{rendered}</React.Fragment>
              })}
            </p>
          )
        })}
    </>
  )
}
