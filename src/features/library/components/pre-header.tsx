import { Button } from '@/components/ui/button'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useState } from 'react'

export function LibraryPreHeader() {
  const { settings } = useLibraryDevSettings()
  const [isDismissed, setIsDismissed] = useState(false)
  
  if (!settings.preHeader.showTopNotice || isDismissed) return null
  
  const noticeTypeClasses = {
    info: 'bg-primary text-primary-foreground',
    warning: 'bg-yellow-500 text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
  }
  
  return (
    <div className={cn(
      'py-2 relative',
      noticeTypeClasses[settings.preHeader.noticeType]
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex-1 pr-4">
            {settings.preHeader.noticeText}
          </span>
          <div className="flex items-center gap-2">
            {settings.preHeader.showActionButton && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "hover:bg-white/20",
                  settings.preHeader.noticeType === 'info' 
                    ? "text-primary-foreground hover:text-primary-foreground/90"
                    : "text-white hover:text-white/90"
                )}
              >
                자세히 보기
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "hover:bg-white/20 p-1 h-6 w-6",
                settings.preHeader.noticeType === 'info' 
                  ? "text-primary-foreground hover:text-primary-foreground/90"
                  : "text-white hover:text-white/90"
              )}
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}