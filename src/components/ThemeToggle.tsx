'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { faCheck, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
          className="relative inline-flex h-10 w-10 items-center justify-center border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-neutral-700"
        >
          <FontAwesomeIcon
            icon={faSun}
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <FontAwesomeIcon
            icon={faMoon}
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="z-50 min-w-36 border border-neutral-200 bg-white p-1.5 shadow-lg outline-none dark:border-neutral-800 dark:bg-neutral-950"
        >
          <DropdownMenu.Item
            onClick={() => setTheme('light')}
            className="flex cursor-pointer items-center px-3 py-2 text-sm text-black transition-colors outline-none hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          >
            Light
            {theme === 'light' && (
              <FontAwesomeIcon icon={faCheck} className="ml-auto h-4 w-4" />
            )}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setTheme('dark')}
            className="flex cursor-pointer items-center px-3 py-2 text-sm text-black transition-colors outline-none hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          >
            Dark
            {theme === 'dark' && (
              <FontAwesomeIcon icon={faCheck} className="ml-auto h-4 w-4" />
            )}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setTheme('system')}
            className="flex cursor-pointer items-center px-3 py-2 text-sm text-black transition-colors outline-none hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          >
            System
            {theme === 'system' && (
              <FontAwesomeIcon icon={faCheck} className="ml-auto h-4 w-4" />
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
