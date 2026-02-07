import { FC } from 'react';

interface SectionDividerProps {
  title: string;
}

export const SectionDivider: FC<SectionDividerProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 text-neutral-400 dark:text-neutral-500 text-xs uppercase">
      <div className="flex-grow border-t border-neutral-100 dark:border-neutral-800"></div>
      <h2 className="flex-shrink-0">\\ {title}</h2>
      <div className="flex-grow border-t border-neutral-100 dark:border-neutral-800"></div>
    </div>
  );
};
