import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ''))
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
