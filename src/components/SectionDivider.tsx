import { FC } from 'react'

interface SectionDividerProps {
  title: string
}

export const SectionDivider: FC<SectionDividerProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="flex-shrink-0 text-base tracking-tight text-neutral-400 dark:text-neutral-500">
        {title}
      </h2>
      <div className="h-px flex-grow bg-neutral-200 dark:bg-neutral-800" />
    </div>
  )
}
