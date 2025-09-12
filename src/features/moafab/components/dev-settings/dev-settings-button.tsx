import { HiCog6Tooth } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'

export function DevSettingsButton() {
  const { setSettingsOpen } = useMoafabDevSettings()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSettingsOpen(true)}
          >
            <HiCog6Tooth className="h-4 w-4" />
            <span className="sr-only">개발자 설정 (Ctrl+Shift+D)</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>개발자 설정 (Ctrl+Shift+D)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}