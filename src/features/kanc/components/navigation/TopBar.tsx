import { Globe, Home, BookOpen, Users, Settings, Code, ExternalLink, LogIn, UserPlus } from 'lucide-react'
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
                "relative px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
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
                "relative px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
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
                    <SelectValue placeholder={t('kanc:header.topbar.demoSelect')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sfr-002">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-002</span>
                        <span className="text-muted-foreground">{t('kanc:header.topbar.demos.sfr002')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-003">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-003</span>
                        <span className="text-muted-foreground">{t('kanc:header.topbar.demos.sfr003')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-004">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-004</span>
                        <span className="text-muted-foreground">{t('kanc:header.topbar.demos.sfr004')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-005">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-005</span>
                        <span className="text-muted-foreground">{t('kanc:header.topbar.demos.sfr005')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sfr-006">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SFR-006</span>
                        <span className="text-muted-foreground">{t('kanc:header.topbar.demos.sfr006')}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
              </>
            )}
            {/* 인트라넷 링크 - intro 탭에서만 표시 */}
            {currentTab === 'intro' && (
              <>
                <a
                  href="https://intranet.kanc.re.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('kanc:header.topbar.intranet')}</span>
                </a>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
              </>
            )}
            <a
              href="/sitemap"
              className="flex items-center gap-1 px-3 py-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded"
            >
              <span>{t('kanc:header.topbar.sitemap')}</span>
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
            {/* Language Switcher */}
            <Select value={currentLanguage} onValueChange={(value) => setLanguage(value as 'ko' | 'en')}>
              <SelectTrigger className="h-7 w-[85px] text-xs">
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-medium">{currentLanguage.toUpperCase()}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">
                  <span className="font-medium">KO</span>
                  <span className="ml-2 text-muted-foreground">한국어</span>
                </SelectItem>
                <SelectItem value="en">
                  <span className="font-medium">EN</span>
                  <span className="ml-2 text-muted-foreground">English</span>
                </SelectItem>
              </SelectContent>
            </Select>
            {/* 블로그 링크 - intro 탭에서만 표시 */}
            {currentTab === 'intro' && (
              <>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
                <a
                  href="https://blog.naver.com/kanc5525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50 rounded"
                  aria-label="Naver Blog"
                >
                  <img
                    src="https://ssl.pstatic.net/static/blog/icon/favicon.ico"
                    alt="Naver Blog"
                    className="w-3.5 h-3.5"
                  />
                </a>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
              </>
            )}

            {/* 로그인/회원가입 버튼 - service 탭에서만 표시 */}
            {currentTab === 'service' && (
              <>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs gap-1 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
                  onClick={() => {/* 로그인 모달 또는 페이지로 이동 */}}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('kanc:header.topbar.login')}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-3 text-xs gap-1"
                  onClick={() => {/* 회원가입 페이지로 이동 */}}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t('kanc:header.topbar.signup')}</span>
                </Button>
                <div className="w-px h-4 bg-gray-300 dark:bg-border mx-1" />
              </>
            )}

            {/* 테마 토글 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative h-7 w-7 p-0 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50"
            >
              <HiSun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <HiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t('kanc:header.topbar.changeTheme')}</span>
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
            {/* Language Switcher for Mobile */}
            <Select value={currentLanguage} onValueChange={(value) => setLanguage(value as 'ko' | 'en')}>
              <SelectTrigger className="h-8 w-[75px] text-xs px-2">
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-medium">{currentLanguage.toUpperCase()}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">
                  <span className="font-medium">KO</span>
                  <span className="ml-2 text-muted-foreground">한국어</span>
                </SelectItem>
                <SelectItem value="en">
                  <span className="font-medium">EN</span>
                  <span className="ml-2 text-muted-foreground">English</span>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* 테마 토글 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative h-8 w-8 p-0 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100/50 dark:hover:bg-secondary/50"
            >
              <HiSun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <HiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t('kanc:header.topbar.changeTheme')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}