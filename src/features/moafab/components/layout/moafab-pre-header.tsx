import { useState, useEffect } from 'react'
import { ExternalLink, MoreVertical, Globe, LogIn, UserPlus, HelpCircle } from 'lucide-react'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DevSettingsButton } from '../dev-settings/dev-settings-button'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { type LanguageCode } from '@/lib/i18n/types'
import { useTheme } from '@/context/theme-provider'
import { cn } from '@/lib/utils'

export function MoafabPreHeader() {
  const { settings } = useMoafabDevSettings()
  const { currentLanguage, setLanguage } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [currentLang, setCurrentLang] = useState(currentLanguage || 'ko')

  // 언어가 변경되면 업데이트
  useEffect(() => {
    if (currentLanguage) {
      setCurrentLang(currentLanguage)
    }
  }, [currentLanguage])

  if (!settings.layout.showPreHeader) {
    return null
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as LanguageCode)
    setCurrentLang(lang as LanguageCode)
  }

  const toggleTheme = () => {
    // light -> dark -> light 순환
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme === 'dark' ? 'light' : 'dark')
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        settings.layout.containerWidth === 'full' && "max-w-full",
        settings.layout.containerWidth === 'wide' && "max-w-7xl",
        settings.layout.containerWidth === 'narrow' && "max-w-5xl"
      )}>
        <div className="flex items-center justify-between py-2">
          {/* 왼쪽: KION 링크 */}
          <a 
            href="https://www.kion.or.kr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group"
          >
            <img 
              src="https://www.moafab.kr/resources/images/kion/portal/common/logo.png"
              alt="KION"
              className="h-6 w-auto"
            />
            <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* 오른쪽: 액션 버튼들 */}
          <div className="flex items-center gap-2">
            {/* 데스크톱: 모든 버튼 표시 */}
            <div className="hidden md:flex items-center gap-2">
              {/* 언어 선택 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    <span className="text-xs">{currentLang === 'ko' ? '한국어' : 'English'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLanguageChange('ko')}>
                    한국어
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 로그인 */}
              <Button variant="ghost" size="sm" className="gap-1">
                <LogIn className="h-3.5 w-3.5" />
                <span className="text-xs">로그인</span>
              </Button>

              {/* 회원가입 */}
              <Button variant="ghost" size="sm" className="gap-1">
                <UserPlus className="h-3.5 w-3.5" />
                <span className="text-xs">회원가입</span>
              </Button>

              {/* 고객센터 */}
              <Button variant="ghost" size="sm" className="gap-1">
                <HelpCircle className="h-3.5 w-3.5" />
                <span className="text-xs">고객센터</span>
              </Button>

              {/* 테마 토글 버튼 */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="relative overflow-hidden p-1.5"
              >
                <HiSun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <HiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* 개발자 설정 버튼 */}
              <DevSettingsButton />
            </div>

            {/* 모바일: 더보기 메뉴 */}
            <div className="flex md:hidden items-center gap-2">
              {/* 언어 선택 (모바일에서도 별도 표시) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLanguageChange('ko')}>
                    한국어
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 테마 토글 버튼 (모바일) */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="relative overflow-hidden p-1"
              >
                <HiSun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <HiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* 더보기 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="gap-2">
                    <LogIn className="h-3.5 w-3.5" />
                    로그인
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <UserPlus className="h-3.5 w-3.5" />
                    회원가입
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2">
                    <HelpCircle className="h-3.5 w-3.5" />
                    고객센터
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 개발자 설정 버튼 (모바일에서도 표시) */}
              <DevSettingsButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}