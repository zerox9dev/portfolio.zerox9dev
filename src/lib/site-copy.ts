export type SiteLocale = 'en' | 'ru' | 'ua'

type SiteDictionary = {
  profileName: string
  role: string
  tabs: {
    own: string
    client: string
  }
  sections: {
    about: string
    projects: string
    blog: string
    otherProjects: string
    otherPosts: string
  }
  actions: {
    moreProjects: string
    hideProjects: string
    telegram: string
    telegramAriaLabel: string
    bookCall: string
    bookCallAriaLabel: string
    back: string
    copyEmail: string
    copiedEmail: string
  }
  messages: {
    noProjects: string
    noBlogPosts: string
    loading: string
    timezone: string
  }
  theme: {
    label: string
    names: Record<'light' | 'dark' | 'system', string>
  }
}

const dictionaries: Record<SiteLocale, SiteDictionary> = {
  en: {
    profileName: 'Vadym Mirvald',
    role: 'Product Designer & Design Engineer',
    tabs: {
      own: 'My products',
      client: 'Commercial',
    },
    sections: {
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      otherProjects: 'Other projects',
      otherPosts: 'Other posts',
    },
    actions: {
      moreProjects: 'More projects',
      hideProjects: 'Hide projects',
      telegram: 'Telegram',
      telegramAriaLabel: 'Open Telegram',
      bookCall: 'Book a call',
      bookCallAriaLabel: 'Book a call',
      back: 'Back',
      copyEmail: 'Copy email',
      copiedEmail: 'Copied',
    },
    messages: {
      noProjects: 'No published projects yet.',
      noBlogPosts: 'No published blog posts yet.',
      loading: 'Loading...',
      timezone: 'GMT+1',
    },
    theme: {
      label: 'Toggle theme',
      names: {
        light: 'light',
        dark: 'dark',
        system: 'system',
      },
    },
  },
  ru: {
    profileName: 'Vadym Mirvald',
    role: 'Product Designer & Design Engineer',
    tabs: {
      own: 'Мои продукты',
      client: 'Коммерческие',
    },
    sections: {
      about: 'Обо мне',
      projects: 'Проекты',
      blog: 'Блог',
      otherProjects: 'Другие проекты',
      otherPosts: 'Другие посты',
    },
    actions: {
      moreProjects: 'Еще проекты',
      hideProjects: 'Скрыть проекты',
      telegram: 'Telegram',
      telegramAriaLabel: 'Открыть Telegram',
      bookCall: 'Созвон',
      bookCallAriaLabel: 'Забронировать созвон',
      back: 'Назад',
      copyEmail: 'Скопировать почту',
      copiedEmail: 'Скопировано',
    },
    messages: {
      noProjects: 'Пока нет опубликованных проектов.',
      noBlogPosts: 'Пока нет опубликованных постов.',
      loading: 'Загрузка...',
      timezone: 'GMT+1',
    },
    theme: {
      label: 'Переключить тему',
      names: {
        light: 'светлая',
        dark: 'темная',
        system: 'системная',
      },
    },
  },
  ua: {
    profileName: 'Vadym Mirvald',
    role: 'Product Designer & Design Engineer',
    tabs: {
      own: 'Мої продукти',
      client: 'Комерційні',
    },
    sections: {
      about: 'Про мене',
      projects: 'Проєкти',
      blog: 'Блог',
      otherProjects: 'Інші проєкти',
      otherPosts: 'Інші пости',
    },
    actions: {
      moreProjects: 'Ще проєкти',
      hideProjects: 'Сховати проєкти',
      telegram: 'Telegram',
      telegramAriaLabel: 'Відкрити Telegram',
      bookCall: 'Дзвінок',
      bookCallAriaLabel: 'Забронювати дзвінок',
      back: 'Назад',
      copyEmail: 'Скопіювати пошту',
      copiedEmail: 'Скопійовано',
    },
    messages: {
      noProjects: 'Опублікованих проєктів поки немає.',
      noBlogPosts: 'Опублікованих постів поки немає.',
      loading: 'Завантаження...',
      timezone: 'GMT+1',
    },
    theme: {
      label: 'Перемкнути тему',
      names: {
        light: 'світла',
        dark: 'темна',
        system: 'системна',
      },
    },
  },
}

export function getSiteDictionary(locale: SiteLocale): SiteDictionary {
  return dictionaries[locale]
}

export function getLocaleTag(locale: SiteLocale): string {
  if (locale === 'ua') return 'uk-UA'
  if (locale === 'ru') return 'ru-RU'
  return 'en-US'
}

export function getContactLinks() {
  return {
    telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '',
    bookCallUrl: process.env.NEXT_PUBLIC_BOOK_CALL_URL ?? '',
    githubUrl:
      process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/zerox9dev',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  }
}
