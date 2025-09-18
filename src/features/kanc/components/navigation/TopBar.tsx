import { Globe, Home, BookOpen, Users, Youtube, Share2, Settings } from 'lucide-react'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/theme-provider'
import { cn } from '@/lib/utils'

interface TopBarProps {
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
  onOpenDevSettings?: () => void
}

export function TopBar({ currentTab, onTabChange, onOpenDevSettings }: TopBarProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className="bg-gradient-to-r from-[#002D83] to-[#0044AA] text-white border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-11">
          {/* Tab Switcher */}
          <div className="flex items-center">
            <button
              onClick={() => onTabChange('intro')}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-all duration-300",
                currentTab === 'intro'
                  ? 'text-[#002D83]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              {currentTab === 'intro' && (
                <div className="absolute inset-0 bg-white rounded-t-md" />
              )}
              <span className="relative flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                KANC 소개 홈페이지
              </span>
            </button>
            <button
              onClick={() => onTabChange('service')}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-all duration-300",
                currentTab === 'service'
                  ? 'text-[#002D83]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              {currentTab === 'service' && (
                <div className="absolute inset-0 bg-white rounded-t-md" />
              )}
              <span className="relative flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                KANC 서비스 홈페이지
              </span>
            </button>
          </div>

          {/* Utility Links */}
          <div className="hidden md:flex items-center gap-1 text-xs">
            <a
              href="https://intranet.kanc.re.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 hover:bg-white/10 rounded transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Intranet</span>
            </a>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <a
              href="/sitemap"
              className="flex items-center gap-1 px-3 py-1.5 hover:bg-white/10 rounded transition-colors"
            >
              <span>홈페이지 안내</span>
            </a>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <a
              href="/eng"
              className="flex items-center gap-1 px-3 py-1.5 hover:bg-white/10 rounded transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>ENG</span>
            </a>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <div className="flex items-center gap-2">
              <a
                href="https://blog.naver.com/kanc_info"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                aria-label="Blog"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/@kanc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-px h-4 bg-white/20 mx-1" />

            {/* 테마 토글 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative h-7 w-7 p-0 hover:bg-white/10"
            >
              <HiSun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <HiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">테마 변경</span>
            </Button>

            {/* 개발자 설정 버튼 */}
            {onOpenDevSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenDevSettings}
                className="h-7 px-2 hover:bg-white/10 gap-1"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>개발자</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}