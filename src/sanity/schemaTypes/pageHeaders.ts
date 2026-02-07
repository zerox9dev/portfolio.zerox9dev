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

export const pageHeadersType = defineType({
  name: 'pageHeaders',
  title: 'Page Headers',
  type: 'document',
  fields: [
    localizedStringField('aboutMeTitle', 'About section title', true),
    localizedStringField('projectsTitle', 'Projects section title', true),
    localizedStringField('blogTitle', 'Blog section title'),
    localizedStringField('contactTitle', 'Contact section title', true),
    localizedStringField('designCategory', 'Design category label', true),
    localizedStringField('developmentCategory', 'Development category label', true),
    localizedStringField('viewButtonText', 'View button text', true),
  ],
})
