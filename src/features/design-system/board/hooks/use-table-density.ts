import { useState, useCallback } from 'react'

export type TableDensity = 'compact' | 'normal' | 'comfortable'

interface DensityStyles {
  rowHeight: string
  padding: string
  fontSize: string
  avatarSize: string
  iconSize: string
  gapSize: string
}

const STORAGE_KEY = 'board-table-density'

export const densityStyles: Record<TableDensity, DensityStyles> = {
  compact: {
    rowHeight: 'h-8',
    padding: 'py-1 px-2',
    fontSize: 'text-xs',
    avatarSize: 'h-5 w-5',
    iconSize: 'h-3 w-3',
    gapSize: 'gap-1'
  },
  normal: {
    rowHeight: 'h-12',
    padding: 'py-2 px-4',
    fontSize: 'text-sm',
    avatarSize: 'h-6 w-6',
    iconSize: 'h-4 w-4',
    gapSize: 'gap-2'
  },
  comfortable: {
    rowHeight: 'h-16',
    padding: 'py-4 px-6',
    fontSize: 'text-base',
    avatarSize: 'h-8 w-8',
    iconSize: 'h-5 w-5',
    gapSize: 'gap-3'
  }
}

export function useTableDensity(defaultDensity: TableDensity = 'normal') {
  const [density, setDensityState] = useState<TableDensity>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      return (stored as TableDensity) || defaultDensity
    }
    return defaultDensity
  })
  
  const setDensity = useCallback((newDensity: TableDensity) => {
    setDensityState(newDensity)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newDensity)
    }
  }, [])
  
  const styles = densityStyles[density]
  
  return {
    density,
    setDensity,
    styles
  }
}