import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { HiOutlineBars3, HiChevronDown } from 'react-icons/hi2'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { NavMenuItem } from '../../types'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { useTranslation } from '@/lib/i18n/hooks'

export function MoafabHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { settings } = useMoafabDevSettings()
  const { t } = useTranslation()

  // 번역된 네비게이션 아이템 생성
  const navItems: NavMenuItem[] = useMemo(() => [
    {
      id: 'intro',
      title: t('moafab.nav.aboutService'),
      children: [
        { id: 'intro-1', title: t('moafab.submenus.aboutService.howToUse'), href: '/moafab/guide' },
        { id: 'intro-2', title: t('moafab.submenus.aboutService.procedure'), href: '/moafab/process' },
        { id: 'intro-3', title: t('moafab.submenus.aboutService.institutionStatus'), href: '/moafab/institutions' },
      ],
    },
    {
      id: 'apply',
      title: t('moafab.nav.applyService'),
      children: [
        { id: 'apply-1', title: t('moafab.submenus.applyService.consultation'), href: '/moafab/apply/consult' },
        { id: 'apply-2', title: t('moafab.submenus.applyService.quote'), href: '/moafab/apply/quote' },
        { id: 'apply-3', title: t('moafab.submenus.applyService.service'), href: '/moafab/apply/service' },
        { id: 'apply-4', title: t('moafab.submenus.applyService.byEquipment'), href: '/moafab/apply/equipment' },
        { id: 'apply-5', title: t('moafab.submenus.applyService.moafab'), href: '/moafab/apply/moafab' },
        { id: 'apply-6', title: t('moafab.submenus.applyService.mychip'), href: '/moafab/apply/mychip' },
      ],
    },
    {
      id: 'status',
      title: t('moafab.nav.serviceStatus'),
      children: [
        { id: 'status-1', title: t('moafab.submenus.serviceStatus.consultationStatus'), href: '/moafab/status/consult' },
        { id: 'status-2', title: t('moafab.submenus.serviceStatus.quoteStatus'), href: '/moafab/status/quote' },
        { id: 'status-3', title: t('moafab.submenus.serviceStatus.serviceStatus'), href: '/moafab/status/service' },
        { id: 'status-4', title: t('moafab.submenus.serviceStatus.monitoring'), href: '/moafab/status/monitoring' },
        { id: 'status-5', title: t('moafab.submenus.serviceStatus.settlement'), href: '/moafab/status/billing' },
      ],
    },
    {
      id: 'support',
      title: t('moafab.nav.customerCenter'),
      children: [
        { id: 'support-1', title: t('moafab.submenus.customerCenter.notice'), href: '/moafab/support/notice' },
        { id: 'support-2', title: t('moafab.submenus.customerCenter.press'), href: '/moafab/support/news' },
        { id: 'support-3', title: t('moafab.submenus.customerCenter.inquiry'), href: '/moafab/support/contact' },
        { id: 'support-4', title: t('moafab.submenus.customerCenter.faq'), href: '/moafab/support/faq' },
      ],
    },
  ], [t])

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        settings.layout.containerWidth === 'full' && "max-w-full",
        settings.layout.containerWidth === 'wide' && "max-w-7xl",
        settings.layout.containerWidth === 'narrow' && "max-w-5xl"
      )}>
        <div className="flex h-16 items-center justify-between">
          {/* 왼쪽: 햄버거 메뉴 + 로고 */}
          <div className="flex items-center gap-3">
            {/* 햄버거 메뉴 버튼 - 모든 화면에서 표시 */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <HiOutlineBars3 className="h-5 w-5" />
                  <span className="sr-only">메뉴</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>메뉴</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-2">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      <button
                        className={cn(
                          "flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md",
                          "hover:bg-accent hover:text-accent-foreground transition-colors",
                          mobileSubmenu === item.id && "bg-accent"
                        )}
                        onClick={() => setMobileSubmenu(mobileSubmenu === item.id ? null : item.id)}
                      >
                        {item.title}
                        {item.children && (
                          <HiChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            mobileSubmenu === item.id && "rotate-180"
                          )} />
                        )}
                      </button>
                      {item.children && mobileSubmenu === item.id && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              to={child.href || '#'}
                              className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                              onClick={() => {
                                setIsOpen(false)
                                setMobileSubmenu(null)
                              }}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* 로고 */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://www.moafab.kr/resources/images/kion/fab/common/moa_logo.png"
                alt="MOAFAB"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeDropdown === item.id && "bg-accent text-accent-foreground"
                  )}
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                >
                  {item.title}
                  {item.children && (
                    <HiChevronDown className={cn(
                      "ml-1 h-3 w-3 transition-transform",
                      activeDropdown === item.id && "rotate-180"
                    )} />
                  )}
                </button>

                {/* 드롭다운 메뉴 */}
                {item.children && activeDropdown === item.id && (
                  <div
                    className="absolute left-0 mt-2 w-56 rounded-md bg-background border shadow-lg"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.href || '#'}
                          className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 오른쪽: 추가 액션 버튼들 (향후 확장용) */}
          <div className="flex items-center gap-2">
            {/* 추가 버튼들을 여기에 배치 가능 */}
          </div>
        </div>
      </div>
    </header>
  )
}