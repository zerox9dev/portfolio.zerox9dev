import { createClient } from 'contentful'

// This function creates a new Contentful client for each request,
// ensuring the locale is explicitly and correctly set.
export const createContentfulClient = (locale: string) => {

  return createClient({
    space: 'j8w4akwtbe1n',
    accessToken: 'KlxM0uX1vTYi28ILKIMqjg1EgKjnKgdBLkx94xMsbXk',
  })
}

