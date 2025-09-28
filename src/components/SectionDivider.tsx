import { FC } from 'react';

interface SectionDividerProps {
  title: string;
}

export const SectionDivider: FC<SectionDividerProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 text-muted-foreground text-xs uppercase">
      <div className="flex-grow border-t border-border"></div>
      <h2 className="flex-shrink-0">\\ {title}</h2>
      <div className="flex-grow border-t border-border"></div>
    </div>
  );
};
