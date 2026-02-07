import { defineField, defineType } from 'sanity'

const localizedPortableTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    description: 'Описания пишите обычным текстом (серый). Цифры, факты и конкретику выделяйте Bold (чёрный).',
    fields: [
      defineField({
        name: 'en',
        title: 'English',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'ru',
        title: 'Russian',
        type: 'array',
        of: [{ type: 'block' }],
      }),
      defineField({
        name: 'ua',
        title: 'Ukrainian',
        type: 'array',
        of: [{ type: 'block' }],
      }),
    ],
    validation: (rule) => rule.required(),
  })

const localizedStringField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'string' }),
      defineField({ name: 'ru', title: 'Russian', type: 'string' }),
      defineField({ name: 'ua', title: 'Ukrainian', type: 'string' }),
    ],
  })

export const introType = defineType({
  name: 'intro',
  title: 'Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      description: 'Deprecated: intro теперь хранится в одном документе с локализованными полями.',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
          { title: 'Ukrainian', value: 'ua' },
        ],
        layout: 'radio',
      },
      hidden: true,
      readOnly: true,
    }),
    localizedPortableTextField(
      'body',
      'Body',
    ),
    localizedStringField('availabilityText', 'Availability text'),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'string' }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
