import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm',
  {
    variants: {
      variant: {
        default: 'gap-6 pb-6 has-[data-slot=card-header]:pb-6 [&:not(:has([data-slot=card-header]))]:py-6',
        compact: 'gap-4 pb-4 has-[data-slot=card-header]:pb-4 [&:not(:has([data-slot=card-header]))]:py-4',
        list: 'gap-0 py-0',
        hero: 'gap-6 pb-8 has-[data-slot=card-header]:pb-8 [&:not(:has([data-slot=card-header]))]:py-8',
      },
      spacing: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

interface CardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {}

function Card({ className, variant, spacing, ...props }: CardProps) {
  return (
    <div
      data-slot='card'
      className={cn(cardVariants({ variant, spacing }), className)}
      {...props}
    />
  )
}

const cardHeaderVariants = cva(
  '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
  {
    variants: {
      variant: {
        default: 'pt-6 px-6 [.border-b]:pb-6',
        compact: 'pt-4 px-4 [.border-b]:pb-4',
        list: 'px-4 py-3',
        hero: 'pt-8 px-8 [.border-b]:pb-8',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

interface CardHeaderProps extends React.ComponentProps<'div'>, VariantProps<typeof cardHeaderVariants> {}

function CardHeader({ className, variant, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot='card-header'
      className={cn(cardHeaderVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

const cardContentVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'px-6',
        compact: 'px-4',
        list: 'px-4 py-3',
        hero: 'px-8',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

interface CardContentProps extends React.ComponentProps<'div'>, VariantProps<typeof cardContentVariants> {}

function CardContent({ className, variant, ...props }: CardContentProps) {
  return (
    <div
      data-slot='card-content'
      className={cn(cardContentVariants({ variant }), className)}
      {...props}
    />
  )
}

const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      variant: {
        default: 'px-6 [.border-t]:pt-6',
        compact: 'px-4 [.border-t]:pt-4',
        list: 'px-4 py-3',
        hero: 'px-8 [.border-t]:pt-8',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

interface CardFooterProps extends React.ComponentProps<'div'>, VariantProps<typeof cardFooterVariants> {}

function CardFooter({ className, variant, ...props }: CardFooterProps) {
  return (
    <div
      data-slot='card-footer'
      className={cn(cardFooterVariants({ variant }), className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
}
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps }
