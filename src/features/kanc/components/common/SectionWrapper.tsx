import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gray' | 'transparent'
}

export function SectionWrapper({
  children,
  className,
  background = 'transparent'
}: SectionWrapperProps) {
  const bgClasses = {
    white: 'bg-white dark:bg-background',
    gray: 'bg-gray-50/50 dark:bg-gray-900/50',
    transparent: ''
  }

  return (
    <section className={cn(
      'py-8',
      bgClasses[background],
      className
    )}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}