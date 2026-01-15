'use client'

import { type TypeProjectFields, type TypePageHeadersFields } from '@/types/contentful'
import { FC, useState } from 'react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { X } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ScrollArea } from './ui/scroll-area'
import { ContentfulImage } from '@/components/ContentfulImage'

import Image from 'next/image'

interface ProjectProps extends TypeProjectFields {
  pageHeaders?: TypePageHeadersFields;
}

export const Project: FC<ProjectProps> = ({
  title,
  strapline,
  logo,
  tech,
  media,
  body,
  link,
  pageHeaders,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const techList = Array.isArray(tech)
    ? tech
    : typeof tech === 'string'
    ? tech.split(',').map((t) => t.trim())
    : []

  return (
    <Drawer shouldScaleBackground={true}>
      <div className="group flex cursor-pointer gap-2 justify-between">
        <Image
          alt={`${title} logo`}
          src={`https:${logo.fields.file?.url as string}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-xl border "
        />
        <div className="mr-4 w-full">
          <h2 className="text-base font-medium font-bold">{title}</h2>
          <span className="block text-sm font-normal text-muted-foreground line-clamp-1">
            {strapline}
          </span>
        </div>
        <DrawerTrigger asChild>
          <Button
            aria-label={`View ${title}`}
            size="sm"
            variant="outline"
          >
            {pageHeaders?.viewButtonText}
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <ScrollArea className="h-[calc(100dvh-6rem)]">
          <DrawerClose
            asChild
            className="absolute right-8 top-1 z-50 hidden md:flex"
          >
            <Button variant="ghost" size="icon">
              <X />
            </Button>
          </DrawerClose>
          <div className="flex items-center gap-4 px-4 pt-2 md:px-4">
            <Image
              alt={`${title} logo`}
              src={`https:${logo.fields.file?.url as string}`}
              width={64}
              height={64}
              className="h-20 w-20 rounded-2xl border border-muted-foreground/20"
            />
            <div className="flex flex-col gap-1">
              <DrawerTitle className="text-lg font-bold">
                {title}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {strapline}
              </DrawerDescription>
              <Button onClick={() => window.open(link, '_blank')} className="rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white hover:text-white w-fit" variant="default" size="sm">
                {pageHeaders?.viewButtonText}
            </Button>
              
            </div>
          </div>
          <hr className="m-4 md:mx-4" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 px-4 md:px-4">
              {techList?.map((t) => (
                <Badge
                  key={t}
                  className="pointer-events-none"
                  variant="outline"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <Carousel data-vaul-no-drag>
            <CarouselContent className="-ml-4 mt-4 px-4 md:-ml-4 md:px-4">
              {media?.map((m, i) =>
                m ? (
                  <CarouselItem
                    key={i}
                    className="basis-10/12 pl-4 last:mr-4 md:pl-4 md:last:mr-4"
                    data-vaul-no-drag
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer">
                          <ContentfulImage
                            asset={m}
                            data-vaul-no-drag
                            sizes="(min-width: 1024px) 793px, 83vw"
                            className="rounded-xl border border-muted-foreground/20 data-[loading]:top-0"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                        <div className="relative">
                          <ContentfulImage
                            asset={m}
                            data-vaul-no-drag
                            sizes="(min-width: 1024px) 793px, 83vw"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ) : null,
              )}
            </CarouselContent>
            <CarouselPrevious className="left-6 hidden bg-white transition-opacity disabled:opacity-0 md:flex" />
            <CarouselNext className="right-6 hidden bg-white transition-opacity disabled:opacity-0 md:flex" />
          </Carousel>

            <div className="flex flex-col gap-4 dark:prose-invert w-fit p-4">
              {documentToReactComponents(body)}
            </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
