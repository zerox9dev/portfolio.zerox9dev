import { defineField, defineType } from 'sanity'

const localizedStringField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => (required ? rule.required() : rule) }),
      defineField({ name: 'ru', title: 'Russian', type: 'string' }),
      defineField({ name: 'ua', title: 'Ukrainian', type: 'string' }),
    ],
    validation: (rule) => (required ? rule.required() : rule),
  })

const localizedTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
      defineField({ name: 'ru', title: 'Russian', type: 'text', rows: 3 }),
      defineField({ name: 'ua', title: 'Ukrainian', type: 'text', rows: 3 }),
    ],
  })

const localizedPortableTextField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] }),
      defineField({ name: 'ru', title: 'Russian', type: 'array', of: [{ type: 'block' }] }),
      defineField({ name: 'ua', title: 'Ukrainian', type: 'array', of: [{ type: 'block' }] }),
    ],
    validation: (rule) => (required ? rule.required() : rule),
  })

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    localizedStringField('title', 'Title', true),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc as { title?: { en?: string } }).title?.en || '',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    localizedTextField('excerpt', 'Excerpt'),
    localizedPortableTextField('body', 'Content', true),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
})
