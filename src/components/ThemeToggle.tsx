'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { CheckIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-neutral-700"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="z-50 min-w-36 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-lg outline-none dark:border-neutral-800 dark:bg-neutral-950"
        >
          <DropdownMenu.Item
            onClick={() => setTheme('light')}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm text-black outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          >
          Light
          {theme === 'light' && <CheckIcon className="ml-auto h-4 w-4" />}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setTheme('dark')}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm text-black outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          >
          Dark
          {theme === 'dark' && <CheckIcon className="ml-auto h-4 w-4" />}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setTheme('system')}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm text-black outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          >
          System
          {theme === 'system' && <CheckIcon className="ml-auto h-4 w-4" />}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
