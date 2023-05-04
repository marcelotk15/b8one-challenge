import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatPrice = (value: number) =>
  value.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
