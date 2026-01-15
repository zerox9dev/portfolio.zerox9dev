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
  alternativeBody?: Document;
}

export type TypeIntro = Entry<TypeIntroSkeleton>;

export type TypeIntroSkeleton = EntrySkeletonType<TypeIntroFields, 'intro'>;

export interface TypeContactFields {
  message: string;
  buttonText: string;
  buttonAriaLabel: string;
  telegramUrl: string;
  bookCallButtonText: string;
  bookCallUrl: string;
  bookCallAriaLabel: string;
}

export type TypeContact = Entry<TypeContactSkeleton>;

export type TypeContactSkeleton = EntrySkeletonType<TypeContactFields, 'contact'>;

export interface TypePageHeadersFields {
  aboutMeTitle: string;
  projectsTitle: string;
  contactTitle: string;
  designCategory: string;
  developmentCategory: string;
  viewButtonText: string;
}

export type TypePageHeaders = Entry<TypePageHeadersSkeleton>;

export type TypePageHeadersSkeleton = EntrySkeletonType<TypePageHeadersFields, 'pageHeaders'>;