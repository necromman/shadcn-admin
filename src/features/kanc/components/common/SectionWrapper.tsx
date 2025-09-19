import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

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
    white: 'bg-card',
    gray: 'bg-muted/30',
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