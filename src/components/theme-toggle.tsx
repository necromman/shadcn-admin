import { LuMoon, LuSun, LuMonitor } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/theme-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // 순환 토글: system -> light -> dark -> system
  const handleToggle = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  // 현재 테마에 따른 툴팁 텍스트
  const getTooltipText = () => {
    if (theme === 'system') return '시스템 설정 (클릭: 라이트 모드)'
    if (theme === 'light') return '라이트 모드 (클릭: 다크 모드)'
    return '다크 모드 (클릭: 시스템 설정)'
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            className="relative"
          >
            {/* 시스템 아이콘 - theme === 'system'일 때만 표시 */}
            <LuMonitor
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                theme === 'system'
                  ? 'rotate-0 scale-100'
                  : 'rotate-90 scale-0 absolute'
              }`}
            />
            {/* 태양 아이콘 - theme === 'light'일 때만 표시 */}
            <LuSun
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                theme === 'light'
                  ? 'rotate-0 scale-100'
                  : '-rotate-90 scale-0 absolute'
              }`}
            />
            {/* 달 아이콘 - theme === 'dark'일 때만 표시 */}
            <LuMoon
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                theme === 'dark'
                  ? 'rotate-0 scale-100'
                  : 'rotate-90 scale-0 absolute'
              }`}
            />
            <span className="sr-only">테마 전환</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}