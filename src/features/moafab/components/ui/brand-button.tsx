import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const brandButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        // Brand primary - main CTA buttons
        primary:
          'bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] shadow-xs hover:bg-[var(--brand-primary-dark)] dark:hover:bg-[var(--brand-primary-light)]',
        
        // Brand secondary - secondary actions
        secondary:
          'bg-[var(--brand-secondary)] text-[var(--brand-secondary-foreground)] shadow-xs hover:bg-[var(--brand-secondary-dark)] dark:hover:bg-[var(--brand-secondary-light)]',
        
        // Brand accent - special emphasis
        accent:
          'bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] shadow-xs hover:bg-[var(--brand-accent-dark)] dark:hover:bg-[var(--brand-accent-light)]',
        
        // Outline with brand color
        outline:
          'border-2 border-[var(--brand-primary)] bg-transparent text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--brand-primary-foreground)]',
        
        // Ghost with brand hover
        ghost:
          'hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] dark:hover:bg-[var(--brand-primary)]/20',
        
        // Destructive for dangerous actions
        destructive:
          'bg-[var(--brand-error)] text-white shadow-xs hover:bg-[var(--brand-error)]/90',
        
        // Success variant
        success:
          'bg-[var(--brand-success)] text-white shadow-xs hover:bg-[var(--brand-success)]/90',
        
        // Warning variant  
        warning:
          'bg-[var(--brand-warning)] text-white shadow-xs hover:bg-[var(--brand-warning)]/90',
        
        // Info variant
        info:
          'bg-[var(--brand-info)] text-white shadow-xs hover:bg-[var(--brand-info)]/90',
        
        // Link style with brand color
        link: 'text-[var(--brand-primary)] underline-offset-4 hover:underline hover:text-[var(--brand-primary-dark)]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        xl: 'h-12 rounded-md px-8 text-base has-[>svg]:px-6',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface BrandButtonProps 
  extends React.ComponentProps<'button'>,
    VariantProps<typeof brandButtonVariants> {
  asChild?: boolean
}

function BrandButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BrandButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='brand-button'
      className={cn(brandButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { BrandButton, brandButtonVariants }
export type { BrandButtonProps }