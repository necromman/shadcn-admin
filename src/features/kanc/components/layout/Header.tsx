import { useState, useEffect } from 'react'
import { TopBar } from '../navigation/TopBar'
import { MegaMenu } from '../navigation/MegaMenu'
import { MobileDrawer } from '../navigation/MobileDrawer'
import { DevSettingsDrawer, DevSettings } from '../dev-settings/DevSettingsDrawer'
import { Menu, Search, Phone, MapPin } from 'lucide-react'
import { getMenuItems } from '@/features/kanc/data/menu.mock'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

interface HeaderProps {
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
  onDemoSelect?: (demo: string) => void
}

export function Header({ currentTab, onTabChange, onDemoSelect }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState(false)
  const [hidePreHeader, setHidePreHeader] = useState(false)
  const { t } = useTranslation()
  const menuItems = getMenuItems(currentTab)

  // 개발자 설정 상태
  const [devSettings, setDevSettings] = useState<DevSettings>({
    navigation: {
      style: 'mega-menu',
      sticky: true,
      transparentOnScroll: true,
      showPreHeader: true
    },
    layout: {
      containerWidth: 'wide',
      spacing: 'normal'
    },
    developer: {
      showDevInfo: false,
      showGrid: false,
      showBoundaries: false
    }
  })

  // Ctrl+Shift+D 단축키 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setIsDevSettingsOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 스크롤 시 프리헤더 숨기기
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 아래로 스크롤하고 50px 이상이면 프리헤더 숨기기
      if (currentScrollY > 50) {
        setHidePreHeader(true)
      }
      // 위로 스크롤하고 최상단에 가까워지면 프리헤더 표시
      else if (currentScrollY < 10) {
        setHidePreHeader(false)
      }

      lastScrollY = currentScrollY
    }

    if (devSettings.navigation.showPreHeader) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [devSettings.navigation.showPreHeader])

  const handleDevSettingsChange = (newSettings: DevSettings) => {
    setDevSettings(newSettings)
  }

  return (
    <>
      {/* TopBar (PreHeader) - 스크롤 시 숨김 */}
      {devSettings.navigation.showPreHeader && (
        <div
          className={cn(
            "transition-all duration-300",
            hidePreHeader ? "h-0 overflow-hidden" : "h-auto"
          )}
        >
          <TopBar
            currentTab={currentTab}
            onTabChange={onTabChange}
            onOpenDevSettings={() => setIsDevSettingsOpen(true)}
            onDemoSelect={onDemoSelect}
          />
        </div>
      )}

      {/* Main Navigation - 스크롤 시 프리헤더 높이만큼 위치 조정 */}
      <header
        className={cn(
          "sticky z-40 w-full bg-card shadow-sm transition-all duration-300",
          devSettings.navigation.sticky ? "sticky" : "relative",
          devSettings.developer.showBoundaries && "border-2 border-red-500",
          hidePreHeader ? "top-0" : "top-11"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <a
                href="/"
                className="flex items-center gap-3 group"
              >
                <img
                  src="https://css.kanc.re.kr/images/kor/logo.png"
                  alt="한국나노기술원"
                  className="h-8 md:h-10 w-auto object-contain dark:filter dark:invert"
                />
              </a>
            </div>

            {/* Desktop Navigation - 메가 메뉴가 전체 너비를 사용할 수 있도록 static 위치 */}
            <div className="hidden lg:block flex-1 px-8 static">
              <MegaMenu
                menuItems={menuItems}
                variant={currentTab}
                style={devSettings.navigation.style === 'mega-menu' ? 'mega' : 'default'}
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">            
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-[#002D83]/10"
              >
                <Search className="w-5 h-5" />
                <span className="sr-only">{t('kanc:common.search')}</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden hover:bg-[#002D83]/10"
                aria-label={t('kanc:common.menu')}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">{t('kanc:common.menu')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />

      {/* 개발자 설정 드로어 */}
      <DevSettingsDrawer
        isOpen={isDevSettingsOpen}
        onClose={() => setIsDevSettingsOpen(false)}
        settings={devSettings}
        onSettingsChange={handleDevSettingsChange}
      />

      {/* 개발자 모드 - 그리드 오버레이 */}
      {devSettings.developer.showGrid && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <div className="container mx-auto h-full">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-500/5 border-x border-blue-500/20 border-dashed"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}