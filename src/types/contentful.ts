import { Asset, Entry, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface TypeProjectFields {
  title: string;
  slug: string;
  link: string;
  logo: Asset;
  strapline: string;
  description: string;
  body: Document;
  tech: string[] | string;
  media: Asset[];
  category: 'Дизайн' | 'Разработка';
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, 'project'>;

export type TypeProject = Entry<TypeProjectSkeleton>;

export interface TypeHomeFields {
  title: string;
  projects: TypeProject[];
}

export type TypeHome = Entry<TypeHomeSkeleton>;

export type TypeHomeSkeleton = EntrySkeletonType<TypeHomeFields, 'home'>;

export interface TypeIntroFields {
  body: Document;
  avatar: Asset;
}

export type TypeIntro = Entry<TypeIntroSkeleton>;

export type TypeIntroSkeleton = EntrySkeletonType<TypeIntroFields, 'intro'>;