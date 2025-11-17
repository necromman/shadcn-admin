import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/theme-provider'
import {
  Globe,
  Building2,
  User,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react'

export function LmsTopBar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState('개인 학습자')

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const organizations = [
    '개인 학습자',
    '삼성전자',
    'LG전자',
    'SK하이닉스',
    '현대자동차',
    'POSCO'
  ]

  return (
    <div className="border-b bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="flex h-11 items-center justify-between">
          {/* 왼쪽 영역 - 훈련기관 선택 */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{selectedOrg}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org}
                    onClick={() => setSelectedOrg(org)}
                    className={selectedOrg === org ? 'bg-gray-100 dark:bg-gray-800' : ''}
                  >
                    {org}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 오른쪽 영역 - 유틸리티 메뉴 */}
          <div className="flex items-center gap-2">
            {/* 언어 선택 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {i18n.language === 'ko' ? '한국어' : 'English'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
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

            {/* 테마 전환 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="gap-2"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">테마 전환</span>
            </Button>

            {/* 로그인/회원가입 또는 마이페이지 */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">홍길동</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>마이페이지</DropdownMenuItem>
                  <DropdownMenuItem>학습 현황</DropdownMenuItem>
                  <DropdownMenuItem>수료증 관리</DropdownMenuItem>
                  <DropdownMenuItem>설정</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsLoggedIn(true)}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">로그인</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">회원가입</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}