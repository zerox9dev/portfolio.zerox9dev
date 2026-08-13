import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

interface SectionDividerProps {
  title: string
  icon?: IconDefinition
}

export const SectionDivider: FC<SectionDividerProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-4 text-xs tracking-[0.16em] text-neutral-300 uppercase dark:text-neutral-300">
      <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-800" />
      <h2 className="flex flex-shrink-0 items-center gap-1.5">
        {icon ? (
          <FontAwesomeIcon icon={icon} className="h-3 w-3" aria-hidden="true" />
        ) : (
          '\\\\'
        )}
        {title}
      </h2>
      <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-800" />
    </div>
  )
}
