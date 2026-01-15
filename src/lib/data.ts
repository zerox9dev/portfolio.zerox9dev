// Local data structure to replace Contentful

export interface LocalImage {
  url: string;
  description?: string;
  width: number;
  height: number;
}

export interface Project {
  title: string;
  slug: string;
  link: string;
  logo: LocalImage;
  strapline: string;
  description: string;
  body: string; // Rich text as HTML string
  tech: string[];
  media: LocalImage[];
  category: 'Дизайн' | 'Разработка';
}

export interface Intro {
  body: string; // Rich text as HTML string
  avatar: LocalImage;
}

export interface Contact {
  message: string;
  buttonText: string;
  buttonAriaLabel: string;
  telegramUrl: string;
}

export interface PageHeaders {
  aboutMeTitle: string;
  projectsTitle: string;
  contactTitle: string;
  designCategory: string;
  developmentCategory: string;
  viewButtonText: string;
}

export interface LocaleData {
  intro: Intro;
  projects: Project[];
  contact: Contact;
  pageHeaders: PageHeaders;
}

// English data
export const enData: LocaleData = {
  intro: {
    body: `<p>Hi! I'm a creative developer and designer passionate about building beautiful, functional digital experiences. With expertise in modern web technologies and a keen eye for design, I love bringing ideas to life through code.</p>`,
    avatar: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMzNzQxNTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BdmF0YXI8L3RleHQ+Cjwvc3ZnPgo=',
      description: 'My avatar',
      width: 400,
      height: 400,
    },
  },
  projects: [
    {
      title: 'Sample Project 1',
      slug: 'sample-project-1',
      link: 'https://example.com',
      logo: {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjM2I4MmY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UDE8L3RleHQ+Cjwvc3ZnPgo=',
        description: 'Project 1 Logo',
        width: 200,
        height: 200,
      },
      strapline: 'A sample development project',
      description: 'This is a sample project description',
      body: '<p>This project showcases modern web development techniques...</p>',
      tech: ['React', 'TypeScript', 'Next.js'],
      media: [
        {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjMTBiOTgxIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2NyZWVuc2hvdCAxPC90ZXh0Pgo8L3N2Zz4K',
          description: 'Project 1 screenshot 1',
          width: 1200,
          height: 800,
        },
        {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjU5ZTBiIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2NyZWVuc2hvdCAyPC90ZXh0Pgo8L3N2Zz4K',
          description: 'Project 1 screenshot 2',
          width: 1200,
          height: 800,
        },
      ],
      category: 'Разработка',
    },
    {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      link: 'https://zerox9dev.vercel.app',
      logo: {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOGI1Y2Y2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UG9ydGZvbGlvPC90ZXh0Pgo8L3N2Zz4K',
        description: 'Portfolio Logo',
        width: 200,
        height: 200,
      },
      strapline: 'Modern portfolio website with dark mode',
      description: 'A responsive portfolio website built with Next.js and TypeScript',
      body: '<p>This portfolio website showcases modern web development practices with a clean, minimal design. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring dark/light mode toggle, responsive design, and smooth animations.</p><p>The site includes project showcases with image carousels, contact forms, and internationalization support for multiple languages.</p>',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Vercel'],
      media: [
        {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjMDZiNmQ0Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SG9tZXBhZ2U8L3RleHQ+Cjwvc3ZnPgo=',
          description: 'Portfolio website homepage',
          width: 1200,
          height: 800,
        },
        {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZWM0ODk5Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvamVjdCBNb2RhbDwvdGV4dD4KPC9zdmc+Cg==',
          description: 'Project details modal',
          width: 1200,
          height: 800,
        },
      ],
      category: 'Разработка',
    },
  ],
  contact: {
    message: 'Let\'s work together!',
    buttonText: 'Send Message',
    buttonAriaLabel: 'Send message via Telegram',
    telegramUrl: 'https://t.me/username',
  },
  pageHeaders: {
    aboutMeTitle: 'About Me',
    projectsTitle: 'Projects',
    contactTitle: 'Contact',
    designCategory: 'Design',
    developmentCategory: 'Development',
    viewButtonText: 'View',
  },
}

// Ukrainian data
export const ukData: LocaleData = {
  intro: {
    body: `<p>Привіт! Я креативний розробник і дизайнер, захоплений створенням красивих і функціональних цифрових вражень. Маю експертизу в сучасних веб-технологіях і гостре око на дизайн, я люблю втілювати ідеї в життя через код.</p>`,
    avatar: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMzNzQxNTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BdmF0YXI8L3RleHQ+Cjwvc3ZnPgo=',
      description: 'Моє фото',
      width: 400,
      height: 400,
    },
  },
  projects: [
    {
      title: 'Приклад проекту 1',
      slug: 'sample-project-1',
      link: 'https://example.com',
      logo: {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjM2I4MmY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UDE8L3RleHQ+Cjwvc3ZnPgo=',
        description: 'Логотип проекту 1',
        width: 200,
        height: 200,
      },
      strapline: 'Приклад проекту розробки',
      description: 'Це приклад опису проекту',
      body: '<p>Цей проект демонструє сучасні техніки веб-розробки...</p>',
      tech: ['React', 'TypeScript', 'Next.js'],
      media: [
        {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjMTBiOTgxIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2NyZWVuc2hvdCAxPC90ZXh0Pgo8L3N2Zz4K',
          description: 'Знімок екрана проекту 1',
          width: 1200,
          height: 800,
        },
        {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjU5ZTBiIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2NyZWVuc2hvdCAyPC90ZXh0Pgo8L3N2Zz4K',
          description: 'Знімок екрана проекту 2',
          width: 1200,
          height: 800,
        },
      ],
      category: 'Разработка',
    },
    {
      title: 'Сайт-портфоліо',
      slug: 'portfolio-website',
      link: 'https://zerox9dev.vercel.app',
      logo: {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOGI1Y2Y2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UG9ydGZvbGlvPC90ZXh0Pgo8L3N2Zz4K',
        description: 'Логотип портфоліо',
        width: 200,
        height: 200,
      },
      strapline: 'Сучасний сайт-портфоліо з темним режимом',
      description: 'Адаптивний сайт-портфоліо, створений з Next.js та TypeScript',
      body: '<p>Цей сайт-портфоліо демонструє сучасні практики веб-розробки з чистим, мінімалістичним дизайном. Створений з Next.js 14, TypeScript та Tailwind CSS, має перемикач темного/світлого режиму, адаптивний дизайн та плавні анімації.</p><p>Сайт включає демонстрацію проектів з каруселями зображень, контактні форми та підтримку інтернаціоналізації для декількох мов.</p>',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Vercel'],
      media: [
        {
          url: 'https://via.placeholder.com/1200x800/06b6d4/ffffff?text=Portfolio+Homepage',
          description: 'Головна сторінка портфоліо',
          width: 1200,
          height: 800,
        },
        {
          url: 'https://via.placeholder.com/1200x800/ec4899/ffffff?text=Project+Modal',
          description: 'Модальне вікно деталей проекту',
          width: 1200,
          height: 800,
        },
      ],
      category: 'Разработка',
    },
  ],
  contact: {
    message: 'Давайте працювати разом!',
    buttonText: 'Надіслати повідомлення',
    buttonAriaLabel: 'Надіслати повідомлення через Telegram',
    telegramUrl: 'https://t.me/username',
  },
  pageHeaders: {
    aboutMeTitle: 'Про мене',
    projectsTitle: 'Проекти',
    contactTitle: 'Контакти',
    designCategory: 'Дизайн',
    developmentCategory: 'Розробка',
    viewButtonText: 'Переглянути',
  },
}

export function getLocaleData(locale: string): LocaleData {
  return locale === 'uk-UA' ? ukData : enData;
}