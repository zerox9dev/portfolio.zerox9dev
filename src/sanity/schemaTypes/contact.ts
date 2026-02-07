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

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    localizedStringField('message', 'Message', true),
    localizedStringField('buttonText', 'Telegram button text', true),
    localizedStringField('buttonAriaLabel', 'Telegram button aria-label', true),
    defineField({ name: 'telegramUrl', title: 'Telegram URL', type: 'url', validation: (rule) => rule.required() }),
    localizedStringField('bookCallButtonText', 'Book-call button text', true),
    defineField({ name: 'bookCallUrl', title: 'Book-call URL', type: 'url', validation: (rule) => rule.required() }),
    localizedStringField('bookCallAriaLabel', 'Book-call aria-label', true),
  ],
})
