import { type SiteLocale } from '@/lib/site-copy'
import { type RichText, type RichTextMarkDef } from '@/types/content'

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
  markDefs: RichTextMarkDef[] = [],
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
        'Design in Figma, build in React. From interface to production — no handoff.',
        'I build tools and interfaces that solve real problems.',
      ]),
      createBlock(
        'intro-topnetics-en',
        [
          { text: "Right now I'm a product designer at " },
          { text: 'Topnetics', marks: ['topnetics-link'] },
          { text: ', where I design interfaces and build AI into products.' },
        ],
        [
          {
            _key: 'topnetics-link',
            _type: 'company',
            href: 'https://topnetics.com',
            name: 'Topnetics',
            favicon: 'https://topnetics.com/favicon-v2.png',
            description:
              'Technical co-founding team for AI, blockchain and fintech startups in the UAE and GCC: CTO as a Service, R&D sprints, venture building.',
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
        'Дизайн в Figma, разработка в React. От интерфейса до продакшена — без handoff.',
        'Я создаю инструменты и интерфейсы, которые решают реальные проблемы.',
      ]),
      createBlock(
        'intro-topnetics-ru',
        [
          { text: 'Сейчас продуктовый дизайнер в ' },
          { text: 'Topnetics', marks: ['topnetics-link'] },
          { text: ', где проектирую интерфейсы и внедряю ИИ в продукты.' },
        ],
        [
          {
            _key: 'topnetics-link',
            _type: 'company',
            href: 'https://topnetics.com',
            name: 'Topnetics',
            favicon: 'https://topnetics.com/favicon-v2.png',
            description:
              'Техническая команда-соосновать для AI-, блокчейн- и fintech-стартапов в ОАЭ и странах Персидского залива: CTO as a Service, R&D-спринты, venture building.',
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
        'Дизайн у Figma, розробка в React. Від інтерфейсу до продакшену — без handoff.',
        'Cтворюю інструменти та інтерфейси, які вирішують реальні проблеми.',
      ]),
      createBlock(
        'intro-topnetics-ua',
        [
          { text: 'Зараз продуктовий дизайнер у ' },
          { text: 'Topnetics', marks: ['topnetics-link'] },
          { text: ', де проєктую інтерфейси та впроваджую ШІ у продукти.' },
        ],
        [
          {
            _key: 'topnetics-link',
            _type: 'company',
            href: 'https://topnetics.com',
            name: 'Topnetics',
            favicon: 'https://topnetics.com/favicon-v2.png',
            description:
              'Технічна команда-співзасновник для AI-, блокчейн- та fintech-стартапів в ОАЕ і країнах Перської затоки: CTO as a Service, R&D-спринти, venture building.',
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
