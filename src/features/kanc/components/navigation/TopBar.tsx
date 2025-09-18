import { Globe, Home, BookOpen, Users, Youtube, Share2, Settings, Code, ExternalLink } from 'lucide-react'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/theme-provider'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTranslation } from '@/lib/i18n/hooks'

interface TopBarProps {
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
  onOpenDevSettings?: () => void
  onDemoSelect?: (demo: string) => void
}

export function TopBar({ currentTab, onTabChange, onOpenDevSettings, onDemoSelect }: TopBarProps) {
  const { theme, setTheme } = useTheme()
  const { t, currentLanguage, setLanguage } = useTranslation()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className="relative bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-11">
          {/* Tab Switcher */}
          <div className="flex items-center overflow-x-auto no-scrollbar">
            <button
              onClick={() => onTabChange('intro')}
              className={cn(
                "relative px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                currentTab === 'intro'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {currentTab === 'intro' && (
                <div className="absolute inset-0 bg-card rounded-t-md shadow-sm" />
              )}
              <span className="relative flex items-center gap-1.5 sm:gap-2">
                <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">{t('kanc:header.tabs.intro')}</span>
                <span className="sm:hidden">{t('kanc:header.tabs.intro').split(' ')[1] || t('kanc:header.tabs.intro')}</span>
              </span>
            </button>
            <button
              onClick={() => onTabChange('service')}
              className={cn(
                "relative px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                currentTab === 'service'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {currentTab === 'service' && (
                <div className="absolute inset-0 bg-card rounded-t-md shadow-sm" />
              )}
              <span className="relative flex items-center gap-1.5 sm:gap-2">
                <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">{t('kanc:header.tabs.service')}</span>
                <span className="sm:hidden">{t('kanc:header.tabs.service').split(' ')[1] || t('kanc:header.tabs.service')}</span>
              </span>
            </button>
          </div>

          {/* Utility Links */}
          <div className="hidden md:flex items-center gap-1 text-xs">
            {/* 요구사항 데모 셀렉트박스 */}
            {onDemoSelect && (
              <>
                <Select onValueChange={onDemoSelect}>
                  <SelectTrigger className="h-7 w-[180px] text-xs">
                    <Code className="w-3.5 h-3.5 mr-1" />
                    <SelectValue placeholder="요구사항 데모" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sfr-002">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-002</span>
                        <span className="text-muted-foreground">디자인 적용</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-003">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-003</span>
                        <span className="text-muted-foreground">서비스 취소</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-004">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-004</span>
                        <span className="text-muted-foreground">정산 동기화</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-005">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-005</span>
                        <span className="text-muted-foreground">금액 동기화</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-006">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-006</span>
                        <span className="text-muted-foreground">파일 인터페이스</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
              </>
            )}
            <a
              href="https://intranet.kanc.re.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Intranet</span>
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
            <a
              href="/sitemap"
              className="flex items-center gap-1 px-3 py-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded transition-colors"
            >
              <span>홈페이지 안내</span>
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
            {/* Language Switcher */}
            <Select value={currentLanguage} onValueChange={(value) => setLanguage(value as 'ko' | 'en')}>
              <SelectTrigger className="h-7 w-[70px] text-xs">
                <Globe className="w-3.5 h-3.5 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">KO</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
            <div className="flex items-center gap-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded transition-colors"
                aria-label="Blog"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />

            {/* 테마 토글 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative h-7 w-7 p-0 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50"
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
                className="h-7 px-2 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 gap-1"
              >
                <Settings className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            {/* 테마 토글 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative h-8 w-8 p-0 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50"
            >
              <HiSun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <HiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">테마 변경</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}