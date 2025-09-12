import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { 
  HiOutlineUser, 
  HiOutlineUserPlus,
  HiOutlineGlobeAlt,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DevSettingsButton } from '../dev-settings/dev-settings-button'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { cn } from '@/lib/utils'

export function MoafabPreHeader() {
  const { settings } = useMoafabDevSettings()
  const { t, currentLanguage, setLanguage } = useTranslation()

  if (!settings.layout.showPreHeader) {
    return null
  }

  return (
    <div className="border-b bg-muted/40">
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        settings.layout.containerWidth === 'full' && "max-w-full",
        settings.layout.containerWidth === 'wide' && "max-w-7xl",
        settings.layout.containerWidth === 'narrow' && "max-w-5xl"
      )}>
        <div className="flex h-10 items-center justify-between">
          {/* 왼쪽: 안내 텍스트 */}
          <div className="hidden md:flex items-center text-sm text-muted-foreground">
            <span>{t('moafab.preHeader.tagline')}</span>
          </div>

          {/* 오른쪽: 유틸리티 메뉴 */}
          <div className="ml-auto flex items-center gap-2">
            {/* 서비스 이용료 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              asChild
            >
              <a href="/moafab/pricing">
                <HiOutlineCurrencyDollar className="mr-1 h-3.5 w-3.5" />
                {t('moafab.preHeader.serviceFee')}
              </a>
            </Button>

            {/* 언어 선택 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                >
                  <HiOutlineGlobeAlt className="mr-1 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {currentLanguage === 'ko' ? 'KR' : 'EN'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('ko')}>
                  한국어
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-4 w-px bg-border" />

            {/* 로그인 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              asChild
            >
              <Link to="/sign-in">
                <HiOutlineUser className="mr-1 h-3.5 w-3.5" />
                {t('moafab.preHeader.login')}
              </Link>
            </Button>

            {/* 회원가입 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              asChild
            >
              <Link to="/sign-up">
                <HiOutlineUserPlus className="mr-1 h-3.5 w-3.5" />
                {t('moafab.preHeader.signup')}
              </Link>
            </Button>

            <div className="h-4 w-px bg-border" />

            {/* 개발자 설정 버튼 */}
            <DevSettingsButton />
          </div>
        </div>
      </div>
    </div>
  )
}