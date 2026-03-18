import { FC } from 'react';

interface SectionDividerProps {
  title: string;
}

export const SectionDivider: FC<SectionDividerProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-neutral-300 dark:text-neutral-300">
      <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-800" />
      <h2 className="flex-shrink-0">\\ {title}</h2>
      <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-800" />
    </div>
  );
};
