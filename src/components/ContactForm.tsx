'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';
import { Button } from './ui/button';
import Image from 'next/image';
import { TypeContactFields } from '@/types/sanity';

interface ContactFormProps {
  contactData?: TypeContactFields;
}

export const ContactForm = ({ contactData }: ContactFormProps) => {
  return (
    <div className="bg-white p-4 dark:border-zinc-800 rounded-xl dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <div className="shrink-0 h-20 w-20 sm:h-24 sm:w-24">
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <Image
              decoding="async"
              loading="lazy"
              alt="Smiley face"
              className="absolute inset-0 h-full w-full rounded-full object-cover"
              src="https://framerusercontent.com/images/3sjNdfyCygTCuZNPyWxI8SMMA10.png?scale-down-to=512"
              width={96}
              height={96}
            />
            <div className="absolute inset-0">
              <DotLottiePlayer
                src="https://lottie.host/eb2ab27a-1a14-47b0-aeff-c2cd33d51e30/jIhjgwmYGO.json"
                autoplay
                loop
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm dark:text-zinc-400 font-medium">
            {contactData?.message}
          </p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <Button
              variant="default"
              aria-label={contactData?.buttonAriaLabel}
              onClick={() => window.open(contactData?.telegramUrl, '_blank')}
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-700 text-white hover:text-white"
            >
              {contactData?.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
