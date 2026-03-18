import { RichText } from '@/types/content';

export function portableTextToParagraphs(value?: RichText): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((block) => block?._type === 'block')
    .map((block) =>
      (block.children ?? [])
        .map((child) => child?.text ?? '')
        .join('')
        .trim(),
    )
    .filter(Boolean);
}

export function portableTextToText(value?: RichText): string {
  return portableTextToParagraphs(value).join('\n\n');
}
