import { type ReactNode } from 'react'

export type LocaleCode = 'en' | 'ru' | 'ua' | string

export type RichTextSpan = {
  _key?: string
  _type?: 'span'
  text?: string
  marks?: string[]
}

export type RichTextMarkDef = {
  _key?: string
  _type?: string
  href?: string
}

export type RichTextBlock = {
  _key?: string
  _type?: string
  style?: string
  children?: RichTextSpan[]
  markDefs?: RichTextMarkDef[]
}

export type RichText = RichTextBlock[]

export type ContentAssetRef = {
  _ref?: string
  url?: string
}

export type ContentImage = {
  _type?: 'image'
  asset?: ContentAssetRef
  alt?: string
  description?: string
}

export interface ProjectFields {
  title: string
  slug: string
  link?: string
  logo: ContentImage
  strapline: string
  tech: string[] | string
  media: ContentImage[]
  category: 'Дизайн' | 'Разработка' | string
}

export interface ProjectEntry {
  _id: string
  fields: ProjectFields
}

export interface ProjectPageData extends ProjectEntry {
  content: ReactNode
}

export interface BlogPostFields {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
}

export interface BlogPostEntry {
  _id: string
  fields: BlogPostFields
}

export interface BlogPostPageData extends BlogPostEntry {
  content: ReactNode
}
