export type SiteLocale = 'en' | 'ru' | 'ua'

type SiteDictionary = {
  profileName: string
  role: string
  roleTooltip: string
  sections: {
    about: string
    projects: string
    blog: string
  }
  actions: {
    moreProjects: string
    hideProjects: string
    telegram: string
    telegramAriaLabel: string
    bookCall: string
    bookCallAriaLabel: string
    back: string
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
    role: 'Product Designer + Engineer',
    roleTooltip: 'Design in Figma, build in React. From interface to production — no handoff.',
    sections: {
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
    },
    actions: {
      moreProjects: 'More projects',
      hideProjects: 'Hide projects',
      telegram: 'Telegram',
      telegramAriaLabel: 'Open Telegram',
      bookCall: 'Book a call',
      bookCallAriaLabel: 'Book a call',
      back: 'Back',
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
    role: 'Product Designer + Engineer',
    roleTooltip: 'Дизайн в Figma, разработка в React. От интерфейса до продакшена — без handoff.',
    sections: {
      about: 'Обо мне',
      projects: 'Проекты',
      blog: 'Блог',
    },
    actions: {
      moreProjects: 'Еще проекты',
      hideProjects: 'Скрыть проекты',
      telegram: 'Telegram',
      telegramAriaLabel: 'Открыть Telegram',
      bookCall: 'Созвон',
      bookCallAriaLabel: 'Забронировать созвон',
      back: 'Назад',
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
    role: 'Product Designer + Engineer',
    roleTooltip: 'Дизайн у Figma, розробка в React. Від інтерфейсу до продакшену — без handoff.',
    sections: {
      about: 'Про мене',
      projects: 'Проєкти',
      blog: 'Блог',
    },
    actions: {
      moreProjects: 'Ще проєкти',
      hideProjects: 'Сховати проєкти',
      telegram: 'Telegram',
      telegramAriaLabel: 'Відкрити Telegram',
      bookCall: 'Дзвінок',
      bookCallAriaLabel: 'Забронювати дзвінок',
      back: 'Назад',
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
  }
}
