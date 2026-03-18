'use client'

import * as React from 'react'

type LiveTimeTextProps = {
  prefix: string
}

export default function LiveTimeText({ prefix }: LiveTimeTextProps) {
  const [time, setTime] = React.useState('--:--')

  React.useEffect(() => {
    const formatGmtPlusOne = () => {
      const now = new Date()
      const hours = (now.getUTCHours() + 1) % 24
      const minutes = now.getUTCMinutes()
      const hh = String(hours).padStart(2, '0')
      const mm = String(minutes).padStart(2, '0')
      setTime(`${hh}:${mm}`)
    }

    formatGmtPlusOne()
    const timer = setInterval(formatGmtPlusOne, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="text-xs text-neutral-400 dark:text-neutral-500">
      {prefix} : {time}
    </span>
  )
}
