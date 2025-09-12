import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { LuCheck } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const brandCheckboxVariants = cva(
  'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary brand color
        primary: cn(
          'border-input dark:bg-input/30',
          'data-[state=checked]:bg-[var(--brand-primary)] data-[state=checked]:border-[var(--brand-primary)]',
          'data-[state=checked]:text-[var(--brand-primary-foreground)]',
          'focus-visible:border-[var(--brand-primary)] focus-visible:ring-[var(--brand-primary)]/20',
          'data-[state=indeterminate]:bg-[var(--brand-primary)] data-[state=indeterminate]:border-[var(--brand-primary)]'
        ),
        
        // Secondary brand color
        secondary: cn(
          'border-input dark:bg-input/30',
          'data-[state=checked]:bg-[var(--brand-secondary)] data-[state=checked]:border-[var(--brand-secondary)]',
          'data-[state=checked]:text-[var(--brand-secondary-foreground)]',
          'focus-visible:border-[var(--brand-secondary)] focus-visible:ring-[var(--brand-secondary)]/20',
          'data-[state=indeterminate]:bg-[var(--brand-secondary)] data-[state=indeterminate]:border-[var(--brand-secondary)]'
        ),
        
        // Accent brand color
        accent: cn(
          'border-input dark:bg-input/30',
          'data-[state=checked]:bg-[var(--brand-accent)] data-[state=checked]:border-[var(--brand-accent)]',
          'data-[state=checked]:text-[var(--brand-accent-foreground)]',
          'focus-visible:border-[var(--brand-accent)] focus-visible:ring-[var(--brand-accent)]/20',
          'data-[state=indeterminate]:bg-[var(--brand-accent)] data-[state=indeterminate]:border-[var(--brand-accent)]'
        ),
        
        // Success variant
        success: cn(
          'border-input dark:bg-input/30',
          'data-[state=checked]:bg-[var(--brand-success)] data-[state=checked]:border-[var(--brand-success)]',
          'data-[state=checked]:text-white',
          'focus-visible:border-[var(--brand-success)] focus-visible:ring-[var(--brand-success)]/20',
          'data-[state=indeterminate]:bg-[var(--brand-success)] data-[state=indeterminate]:border-[var(--brand-success)]'
        ),
        
        // Error variant
        error: cn(
          'border-input dark:bg-input/30',
          'data-[state=checked]:bg-[var(--brand-error)] data-[state=checked]:border-[var(--brand-error)]',
          'data-[state=checked]:text-white',
          'focus-visible:border-[var(--brand-error)] focus-visible:ring-[var(--brand-error)]/20',
          'data-[state=indeterminate]:bg-[var(--brand-error)] data-[state=indeterminate]:border-[var(--brand-error)]'
        ),
        
        // Outline variant - only border color changes
        outline: cn(
          'border-2 bg-transparent',
          'border-input hover:border-[var(--brand-primary)]',
          'data-[state=checked]:border-[var(--brand-primary)] data-[state=checked]:bg-transparent',
          'data-[state=checked]:text-[var(--brand-primary)]',
          'focus-visible:border-[var(--brand-primary)] focus-visible:ring-[var(--brand-primary)]/20'
        ),
      },
      size: {
        sm: 'size-3.5',
        default: 'size-4',
        lg: 'size-5',
        xl: 'size-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface BrandCheckboxProps 
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof brandCheckboxVariants> {
  iconClassName?: string
}

function BrandCheckbox({
  className,
  variant,
  size,
  iconClassName,
  ...props
}: BrandCheckboxProps) {
  // Adjust icon size based on checkbox size
  const iconSizeClass = {
    sm: 'size-3',
    default: 'size-3.5',
    lg: 'size-4',
    xl: 'size-5',
  }[size || 'default']

  return (
    <CheckboxPrimitive.Root
      data-slot='brand-checkbox'
      className={cn(brandCheckboxVariants({ variant, size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <LuCheck className={cn(iconSizeClass, iconClassName)} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { BrandCheckbox, brandCheckboxVariants }
export type { BrandCheckboxProps }