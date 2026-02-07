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

export const projectType = defineType({
  name: 'project',
  title: 'Project',
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
    localizedStringField('link', 'Project URL'),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'string' }),
      ],
      validation: (rule) => rule.required(),
    }),
    localizedStringField('strapline', 'Strapline', true),
    localizedPortableTextField('body', 'Body', true),
    defineField({
      name: 'tech',
      title: 'Tech stack',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'ru', title: 'Russian', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'ua', title: 'Ukrainian', type: 'array', of: [{ type: 'string' }] }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          ['Дизайн', 'Разработка'].includes(String(value))
            ? true
            : 'Use only Дизайн or Разработка',
        ),
      options: {
        list: [
          { title: 'Дизайн', value: 'Дизайн' },
          { title: 'Разработка', value: 'Разработка' },
        ],
        layout: 'radio',
      },
      initialValue: 'Дизайн',
    }),
  ],
})
