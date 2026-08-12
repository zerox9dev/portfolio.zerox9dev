export function getProjectBadge(category?: string) {
  if (!category) return null

  const normalized = category.trim().toLowerCase()

  if (normalized === 'разработка' || normalized === 'розробка' || normalized === 'build') {
    return 'Build'
  }

  if (normalized === 'дизайн' || normalized === 'design') {
    return 'Design'
  }

  return null
}

export function getProjectBadgeClass(badge: string) {
  if (badge === 'Build') {
    return 'bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300'
  }

  return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
}
