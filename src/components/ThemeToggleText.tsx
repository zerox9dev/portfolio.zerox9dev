'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeToggleText = () => {
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
      aria-label="Toggle theme"
    >
      {theme || 'system'}
    </button>
  )
}
