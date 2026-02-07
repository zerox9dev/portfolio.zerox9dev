import { createClient } from '@sanity/client';
import {
  HomePageData,
  LocaleCode,
  PortableText,
  SanityImage,
  TypeBlogPost,
  TypeBlogPostFields,
  TypeContactFields,
  TypeIntroFields,
  TypePageHeadersFields,
  TypeProject,
  TypeProjectFields,
} from '@/types/sanity';

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';

function getSanityClient() {
  if (!sanityProjectId) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: true,
  });
}

function getLocaleCandidates(locale: LocaleCode): string[] {
  const normalized = locale.replace('_', '-');
  const short = normalized.split('-')[0];

  return Array.from(new Set([normalized, normalized.replace('-', '_'), short]));
}

function pickLocalizedValue<T>(value: unknown, localeCandidates: string[]): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'object' || Array.isArray(value)) return value as T;

  const localized = value as Record<string, unknown>;
  const hasLocaleKeys = localeCandidates.some((key) => key in localized);

  if (hasLocaleKeys) {
    for (const key of localeCandidates) {
      if (localized[key] !== undefined && localized[key] !== null) {
        return localized[key] as T;
      }
    }

    const firstLocalizedValue = Object.values(localized).find((entry) => entry !== null && entry !== undefined);
    return firstLocalizedValue as T | undefined;
  }

  return value as T;
}

function ensurePortableText(value: unknown, localeCandidates: string[]): PortableText {
  const localized = pickLocalizedValue<unknown>(value, localeCandidates);
  return Array.isArray(localized) ? (localized as PortableText) : [];
}

function ensureString(value: unknown, localeCandidates: string[], fallback = ''): string {
  const localized = pickLocalizedValue<unknown>(value, localeCandidates);
  if (typeof localized === 'string') return localized;

  if (localized && typeof localized === 'object' && !Array.isArray(localized)) {
    const maybeSlug = (localized as { current?: unknown }).current;
    if (typeof maybeSlug === 'string') return maybeSlug;
  }

  return fallback;
}

function ensureStringArray(value: unknown, localeCandidates: string[]): string[] | string {
  const localized = pickLocalizedValue<unknown>(value, localeCandidates);
  if (Array.isArray(localized)) {
    return localized.filter((item): item is string => typeof item === 'string');
  }
  if (typeof localized === 'string') {
    return localized;
  }
  return [];
}

function ensureImage(value: unknown, localeCandidates: string[]): SanityImage {
  const localized = pickLocalizedValue<unknown>(value, localeCandidates);
  if (!localized || typeof localized !== 'object' || Array.isArray(localized)) {
    return {};
  }

  return localized as SanityImage;
}

const HOME_PAGE_QUERY = `{
  "intro": *[_type == "intro"] | order(select(locale in $localeCandidates => 0, !defined(locale) => 1, 2), _createdAt desc)[0],
  "projects": *[_type == "project"] | order(_createdAt desc),
  "blogPosts": *[_type == "blogPost"] | order(publishedAt desc, _createdAt desc),
  "contact": *[_type == "contact"] | order(_createdAt desc)[0],
  "pageHeaders": *[_type == "pageHeaders"] | order(_createdAt desc)[0]
}`;

type HomePageQueryResult = {
  intro?: Record<string, unknown>;
  projects?: Array<Record<string, unknown>>;
  blogPosts?: Array<Record<string, unknown>>;
  contact?: Record<string, unknown>;
  pageHeaders?: Record<string, unknown>;
};

function normalizeIntro(doc: Record<string, unknown> | undefined, localeCandidates: string[]): TypeIntroFields | undefined {
  if (!doc) return undefined;

  return {
    body: ensurePortableText(doc.body, localeCandidates),
    avatar: ensureImage(doc.avatar, localeCandidates),
    availabilityText: ensureString(doc.availabilityText, localeCandidates),
  };
}

function normalizeContact(
  doc: Record<string, unknown> | undefined,
  localeCandidates: string[],
): TypeContactFields | undefined {
  if (!doc) return undefined;

  return {
    message: ensureString(doc.message, localeCandidates),
    buttonText: ensureString(doc.buttonText, localeCandidates),
    buttonAriaLabel: ensureString(doc.buttonAriaLabel, localeCandidates),
    telegramUrl: ensureString(doc.telegramUrl, localeCandidates),
    bookCallButtonText: ensureString(doc.bookCallButtonText, localeCandidates),
    bookCallUrl: ensureString(doc.bookCallUrl, localeCandidates),
    bookCallAriaLabel: ensureString(doc.bookCallAriaLabel, localeCandidates),
  };
}

function normalizePageHeaders(
  doc: Record<string, unknown> | undefined,
  localeCandidates: string[],
): TypePageHeadersFields | undefined {
  if (!doc) return undefined;

  return {
    aboutMeTitle: ensureString(doc.aboutMeTitle, localeCandidates),
    projectsTitle: ensureString(doc.projectsTitle, localeCandidates),
    blogTitle: ensureString(doc.blogTitle, localeCandidates),
    contactTitle: ensureString(doc.contactTitle, localeCandidates),
    designCategory: ensureString(doc.designCategory, localeCandidates),
    developmentCategory: ensureString(doc.developmentCategory, localeCandidates),
    viewButtonText: ensureString(doc.viewButtonText, localeCandidates),
  };
}

function normalizeBlogPost(doc: Record<string, unknown>, localeCandidates: string[]): TypeBlogPost {
  const fields: TypeBlogPostFields = {
    title: ensureString(doc.title, localeCandidates),
    slug: ensureString(doc.slug, localeCandidates),
    excerpt: ensureString(doc.excerpt, localeCandidates),
    body: ensurePortableText(doc.body, localeCandidates),
    publishedAt: ensureString(doc.publishedAt, localeCandidates),
  };

  return {
    _id: typeof doc._id === 'string' ? doc._id : `${fields.slug || fields.title}-blog-post`,
    fields,
  };
}

const BLOG_POST_BY_SLUG_QUERY = `*[
  _type == "blogPost" &&
  slug.current == $slug
] | order(publishedAt desc, _createdAt desc)[0]`;

export async function fetchBlogPostBySlug(locale: LocaleCode, slug: string): Promise<TypeBlogPost | null> {
  const sanityClient = getSanityClient();
  if (!sanityClient) return null;

  const localeCandidates = getLocaleCandidates(locale);
  const data = await sanityClient.fetch<Record<string, unknown> | null>(BLOG_POST_BY_SLUG_QUERY, {
    slug,
    localeCandidates,
  });

  if (!data) return null;
  return normalizeBlogPost(data, localeCandidates);
}

function normalizeProject(doc: Record<string, unknown>, localeCandidates: string[]): TypeProject {
  const fields: TypeProjectFields = {
    title: ensureString(doc.title, localeCandidates),
    slug: ensureString(doc.slug, localeCandidates),
    link: ensureString(doc.link, localeCandidates),
    logo: ensureImage(doc.logo, localeCandidates),
    strapline: ensureString(doc.strapline, localeCandidates),
    body: ensurePortableText(doc.body, localeCandidates),
    tech: ensureStringArray(doc.tech, localeCandidates),
    media: Array.isArray(doc.media)
      ? doc.media.map((item) => ensureImage(item, localeCandidates))
      : [],
    category: ensureString(doc.category, localeCandidates),
  };

  return {
    _id: typeof doc._id === 'string' ? doc._id : `${fields.slug || fields.title}-project`,
    fields,
  };
}

export async function fetchHomePageData(locale: LocaleCode): Promise<HomePageData> {
  const sanityClient = getSanityClient();
  if (!sanityClient) {
    return {
      introData: undefined,
      projectEntries: [],
      blogEntries: [],
      contactData: undefined,
      pageHeaders: undefined,
    };
  }

  const localeCandidates = getLocaleCandidates(locale);

  const data = await sanityClient.fetch<HomePageQueryResult>(HOME_PAGE_QUERY, {
    localeCandidates,
  });

  return {
    introData: normalizeIntro(data.intro, localeCandidates),
    projectEntries: (data.projects ?? []).map((doc) => normalizeProject(doc, localeCandidates)),
    blogEntries: (data.blogPosts ?? []).map((doc) => normalizeBlogPost(doc, localeCandidates)),
    contactData: normalizeContact(data.contact, localeCandidates),
    pageHeaders: normalizePageHeaders(data.pageHeaders, localeCandidates),
  };
}

export function buildSanityImageUrl(image: SanityImage, options?: { width?: number; height?: number }): string {
  const directUrl = image?.asset?.url;
  if (directUrl) return directUrl;

  const ref = image?.asset?._ref;
  if (!ref || !sanityProjectId || !sanityDataset) return '';

  const match = ref.match(/^image-(.+)-(\d+x\d+)-([a-zA-Z0-9]+)$/);
  if (!match) return '';

  const [, assetId, dimensions, format] = match;
  const baseUrl = `https://cdn.sanity.io/images/${sanityProjectId}/${sanityDataset}/${assetId}-${dimensions}.${format}`;

  const searchParams = new URLSearchParams();
  searchParams.set('auto', 'format');

  if (options?.width) searchParams.set('w', String(options.width));
  if (options?.height) searchParams.set('h', String(options.height));

  return `${baseUrl}?${searchParams.toString()}`;
}
