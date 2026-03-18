'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type ThemeToggleTextProps = {
  labels?: Record<'light' | 'dark' | 'system', string>
  ariaLabel?: string
}

export const ThemeToggleText = ({
  labels = {
    light: 'light',
    dark: 'dark',
    system: 'system',
  },
  ariaLabel = 'Toggle theme',
}: ThemeToggleTextProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = ['light', 'dark', 'system']
  const currentIndex = themes.indexOf(theme || 'system')
  const nextTheme = themes[(currentIndex + 1) % themes.length]

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="text-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-pointer capitalize"
      aria-label={ariaLabel}
    >
      {labels[(theme as 'light' | 'dark' | 'system') || 'system']}
    </button>
  )
}
