import { PortableText } from '@/types/sanity';

export function portableTextToParagraphs(value?: PortableText): string[] {
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

export function portableTextToText(value?: PortableText): string {
  return portableTextToParagraphs(value).join('\n\n');
}
