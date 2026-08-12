import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import LiveTimeText from '@/components/LiveTimeText'
import { ProjectMediaFigure } from '@/components/ProjectMediaFigure'
import { ThemeToggleText } from '@/components/ThemeToggleText'
import { getProjectLogoUrl } from '@/lib/content-images'
import { getProjectBadge, getProjectBadgeClass } from '@/lib/project-badge'
import { getSiteDictionary, type SiteLocale } from '@/lib/site-copy'
import { type ProjectPageData } from '@/types/content'

interface ProjectPageProps {
  project: ProjectPageData
  locale: SiteLocale
  avatarSrc?: string
  avatarAlt?: string
}

const tagClass =
  'inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:text-neutral-300'

export default function ProjectPage({
  project,
  locale,
  avatarSrc = '/images/logo.ico',
  avatarAlt = 'Vadym',
}: ProjectPageProps) {
  const dictionary = getSiteDictionary(locale)
  const backHref = locale === 'en' ? '/' : `/${locale}`
  const { title, strapline, logo, category, tech, media, link } = project.fields
  const badge = getProjectBadge(category)
  const techList = Array.isArray(tech)
    ? tech
    : typeof tech === 'string'
      ? tech.split(',').map((item) => item.trim())
      : []
  const mediaList = (media ?? []).filter(Boolean)
  const [hero, ...restMedia] = mediaList
  const logoSrc = getProjectLogoUrl(title, logo)
  const logoAlt = logo.description || logo.alt || `${title} logo`

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[496px] flex-col gap-8 px-4 py-8 antialiased md:px-0 md:py-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={52}
            height={52}
            priority
            className="h-13 w-13 rounded-full border border-neutral-200 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              {dictionary.profileName}
            </span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500">
              {dictionary.role}
            </span>
          </div>
        </div>
      </header>

      <article className="bg-white dark:bg-black">
        <Link
          href={backHref}
          className="mb-4 inline-block text-sm text-muted-foreground hover:underline"
        >
          ← {dictionary.actions.back}
        </Link>

        <div className="flex items-center gap-4">
          <Image
            alt={logoAlt}
            src={logoSrc}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-2xl border border-muted-foreground/20"
          />
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              {badge && (
                <span
                  className={`inline-flex shrink-0 rounded-full px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.08em] ${getProjectBadgeClass(
                    badge,
                  )}`}
                >
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{strapline}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {link.replace(/^https?:\/\//, '')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {techList.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techList.map((item) => (
              <span key={item} className={tagClass}>
                {item}
              </span>
            ))}
          </div>
        )}

        {hero && <ProjectMediaFigure asset={hero} priority className="mt-6" />}

        <div className="prose prose-neutral mt-6 max-w-none text-neutral-600 dark:prose-invert dark:text-neutral-400">
          {project.content}
        </div>

        {restMedia.map((item, index) => (
          <ProjectMediaFigure key={index} asset={item} />
        ))}
      </article>

      <footer className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs dark:border-neutral-800">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          © 2026 {dictionary.profileName}
        </span>
        <div className="flex items-center gap-4">
          <ThemeToggleText
            labels={dictionary.theme.names}
            ariaLabel={dictionary.theme.label}
          />
          <LiveTimeText prefix={dictionary.messages.timezone} />
        </div>
      </footer>
    </main>
  )
}
