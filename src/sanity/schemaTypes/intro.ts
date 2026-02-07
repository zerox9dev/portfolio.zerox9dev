import { defineField, defineType } from 'sanity'

export const introType = defineType({
  name: 'intro',
  title: 'Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          ['en', 'ru', 'ua'].includes(String(value)) ? true : 'Use only en, ru, ua',
        ),
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
          { title: 'Ukrainian', value: 'ua' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availabilityText',
      title: 'Availability text',
      type: 'string',
      description: 'Например: Открыт к предложениям',
    }),
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
