import { type SiteLocale } from '@/lib/site-copy'
import { type RichText } from '@/types/content'

export type IntroContent = {
  body: RichText
  availabilityText?: string
  avatarSrc: string
  avatarAlt: string
}

function paragraphsToPortableText(paragraphs: string[]): RichText {
  return paragraphs.map((text, index) => ({
    _key: `intro-${index}`,
    _type: 'block',
    style: 'normal',
    children: [
      {
        _key: `intro-${index}-span`,
        _type: 'span',
        text,
        marks: [],
      },
    ],
    markDefs: [],
  }))
}

function createBlock(
  key: string,
  children: Array<{ text: string; marks?: string[] }>,
  markDefs: Array<{ _key: string; _type: 'link'; href: string }> = [],
): RichText[number] {
  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    children: children.map((child, index) => ({
      _key: `${key}-span-${index}`,
      _type: 'span',
      text: child.text,
      marks: child.marks ?? [],
    })),
    markDefs,
  }
}

const introContent: Record<SiteLocale, IntroContent> = {
  en: {
    body: [
      ...paragraphsToPortableText([
        'Designing and shipping products - from concept to production code.',
        'I build tools and interfaces that solve real problems.',
      ]),
      createBlock(
        'intro-community-en',
        [
          { text: 'I run a ' },
          { text: 'community', marks: ['community-link'] },
          { text: ' for vibe-coders who ship their own products.' },
        ],
        [
          {
            _key: 'community-link',
            _type: 'link',
            href: 'https://t.me/+rDmRBLt6_PliN2I0',
          },
        ],
      ),
    ],
    availabilityText: 'Open to work',
    avatarSrc: '/logo.JPG',
    avatarAlt: 'Vadym Mirvald avatar',
  },
  ru: {
    body: [
      ...paragraphsToPortableText([
        'Проектирую и довожу продукты до релиза - от концепции до production code.',
        'Я создаю инструменты и интерфейсы, которые решают реальные проблемы.',
      ]),
      createBlock(
        'intro-community-ru',
        [
          { text: 'Я веду ' },
          { text: 'сообщество', marks: ['community-link'] },
          { text: ' для vibe-coders, которые запускают собственные продукты.' },
        ],
        [
          {
            _key: 'community-link',
            _type: 'link',
            href: 'https://t.me/+rDmRBLt6_PliN2I0',
          },
        ],
      ),
    ],
    availabilityText: 'Open to work',
    avatarSrc: '/logo.JPG',
    avatarAlt: 'Аватар Vadym Mirvald',
  },
  ua: {
    body: [
      ...paragraphsToPortableText([
        'Проєктую і запускаю продукти - від концепції до production code.',
        'Cтворюю інструменти та інтерфейси, які вирішують реальні проблеми.',
      ]),
      createBlock(
        'intro-community-ua',
        [
          { text: 'Створив ' },
          { text: 'спільноту', marks: ['community-link'] },
          { text: ' для vibe-coders, які запускають власні продукти.' },
        ],
        [
          {
            _key: 'community-link',
            _type: 'link',
            href: 'https://t.me/+rDmRBLt6_PliN2I0',
          },
        ],
      ),
    ],
    availabilityText: 'Open to work',
    avatarSrc: '/logo.JPG',
    avatarAlt: 'Аватар Vadym Mirvald',
  },
}

export function getIntroContent(locale: SiteLocale): IntroContent {
  return introContent[locale]
}
