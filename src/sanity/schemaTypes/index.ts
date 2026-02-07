import { type SchemaTypeDefinition } from 'sanity'
import { blogPostType } from './blogPost'
import { contactType } from './contact'
import { introType } from './intro'
import { pageHeadersType } from './pageHeaders'
import { projectType } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [introType, projectType, blogPostType, contactType, pageHeadersType],
}
