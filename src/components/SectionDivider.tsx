import { FC } from 'react';

interface SectionDividerProps {
  title: string;
}

export const SectionDivider: FC<SectionDividerProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 text-muted-foreground text-xs uppercase">
      <div className="flex-grow border-t border-border"></div>
      <span className="flex-shrink-0">\\ {title}</span>
      <div className="flex-grow border-t border-border"></div>
    </div>
  );
};
