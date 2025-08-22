import { type Root, type Content, type Trigger } from '@radix-ui/react-popover'
import { LuCircleHelp } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type LearnMoreProps = React.ComponentProps<typeof Root> & {
  contentProps?: React.ComponentProps<typeof Content>
  triggerProps?: React.ComponentProps<typeof Trigger>
}

export function LearnMore({
  children,
  contentProps,
  triggerProps,
  ...props
}: LearnMoreProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger
        asChild
        {...triggerProps}
        className={cn('size-5 rounded-full', triggerProps?.className)}
      >
        <Button variant='outline' size='icon'>
          <span className='sr-only'>Learn more</span>
          <LuCircleHelp className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='start'
        {...contentProps}
        className={cn('text-muted-foreground text-sm', contentProps?.className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
