export type LocaleCode = 'en' | 'ru' | 'ua' | string;

export type PortableTextSpan = {
  _key?: string;
  _type?: 'span';
  text?: string;
  marks?: string[];
};

export type PortableTextMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
};

export type PortableText = PortableTextBlock[];

export type SanityAssetRef = {
  _ref?: string;
  url?: string;
};

export type SanityImage = {
  _type?: 'image';
  asset?: SanityAssetRef;
  alt?: string;
  description?: string;
};

export interface TypeProjectFields {
  title: string;
  slug: string;
  link?: string;
  logo: SanityImage;
  strapline: string;
  body: PortableText;
  tech: string[] | string;
  media: SanityImage[];
  category: 'Дизайн' | 'Разработка' | string;
}

export interface TypeIntroFields {
  body: PortableText;
  avatar: SanityImage;
  availabilityText?: string;
}

export interface TypeContactFields {
  message: string;
  buttonText: string;
  buttonAriaLabel: string;
  telegramUrl: string;
  bookCallButtonText: string;
  bookCallUrl: string;
  bookCallAriaLabel: string;
}

export interface TypePageHeadersFields {
  aboutMeTitle: string;
  projectsTitle: string;
  blogTitle?: string;
  contactTitle: string;
  designCategory: string;
  developmentCategory: string;
  viewButtonText: string;
}

export interface TypeProject {
  _id: string;
  fields: TypeProjectFields;
}

export interface TypeBlogPostFields {
  title: string;
  slug: string;
  excerpt?: string;
  body: PortableText;
  publishedAt?: string;
}

export interface TypeBlogPost {
  _id: string;
  fields: TypeBlogPostFields;
}

export interface HomePageData {
  introData?: TypeIntroFields;
  projectEntries: TypeProject[];
  blogEntries: TypeBlogPost[];
  contactData?: TypeContactFields;
  pageHeaders?: TypePageHeadersFields;
}
