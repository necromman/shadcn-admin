import { Button } from '@/components/ui/button'
import { HiOutlineBars3, HiChevronDown } from 'react-icons/hi2'
import { useState, useEffect, useRef } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface SubMenuItem {
  label: string
  href: string
  description?: string
}

interface NavItem {
  label: string
  href: string
  subItems?: SubMenuItem[]
}

export function DSHeaderEnterprise() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [enableBlur, setEnableBlur] = useState(false)
  const [showAllMenus, setShowAllMenus] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems: NavItem[] = [
    {
      label: '제품',
      href: '#',
      subItems: [
        { label: '제품 소개', href: '#', description: '주요 제품 및 기능 소개' },
        { label: '가격', href: '#', description: '플랜별 가격 정보' },
        { label: '데모 체험', href: '#', description: '무료 체험판 신청' },
        { label: '기술 사양', href: '#', description: '상세 기술 스펙' },
      ],
    },
    {
      label: '솔루션',
      href: '#',
      subItems: [
        { label: '기업용', href: '#', description: '대기업 맞춤 솔루션' },
        { label: '중소기업', href: '#', description: 'SMB 전용 패키지' },
        { label: '스타트업', href: '#', description: '성장 단계별 지원' },
        { label: '산업별', href: '#', description: '업종별 특화 솔루션' },
      ],
    },
    {
      label: '리소스',
      href: '#',
      subItems: [
        { label: '문서', href: '#', description: '기술 문서 및 가이드' },
        { label: '블로그', href: '#', description: '최신 소식 및 인사이트' },
        { label: '웨비나', href: '#', description: '온라인 세미나 일정' },
        { label: '사례 연구', href: '#', description: '고객 성공 사례' },
      ],
    },
    {
      label: '고객지원',
      href: '#',
      subItems: [
        { label: '지원 센터', href: '#', description: '24/7 고객 지원' },
        { label: 'FAQ', href: '#', description: '자주 묻는 질문' },
        { label: '커뮤니티', href: '#', description: '사용자 커뮤니티' },
        { label: '문의하기', href: '#', description: '1:1 문의 접수' },
      ],
    },
    {
      label: '회사소개',
      href: '#',
      subItems: [
        { label: '회사 정보', href: '#', description: '기업 소개 및 비전' },
        { label: '채용', href: '#', description: '함께할 인재 모집' },
        { label: '뉴스룸', href: '#', description: '언론 보도 자료' },
        { label: '파트너', href: '#', description: '파트너십 프로그램' },
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setMegaMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* 드롭다운 활성화 시 배경 블러 오버레이 */}
      {enableBlur && (activeDropdown || megaMenuOpen) && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          onClick={() => {
            setActiveDropdown(null)
            setMegaMenuOpen(false)
          }}
        />
      )}
      
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary" />
                <span className="text-xl font-bold">Enterprise</span>
              </div>
              
              {/* 토글 버튼들 */}
              <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l">
                {/* 배경 블러 토글 */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm text-muted-foreground">배경 블러</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enableBlur}
                    onClick={() => setEnableBlur(!enableBlur)}
                    className={cn(
                      "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                      enableBlur ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3 w-3 transform rounded-full bg-background transition-transform",
                        enableBlur ? "translate-x-5" : "translate-x-1"
                      )}
                    />
                  </button>
                </label>
                
                {/* 모든 메뉴 표시 토글 */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm text-muted-foreground">전체 메뉴</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showAllMenus}
                    onClick={() => setShowAllMenus(!showAllMenus)}
                    className={cn(
                      "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                      showAllMenus ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3 w-3 transform rounded-full bg-background transition-transform",
                        showAllMenus ? "translate-x-5" : "translate-x-1"
                      )}
                    />
                  </button>
                </label>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    (!showAllMenus && activeDropdown === item.label) || (showAllMenus && megaMenuOpen && activeDropdown === item.label) ? "bg-accent text-accent-foreground" : ""
                  )}
                  onClick={() => {
                    if (showAllMenus) {
                      // 전체 메뉴 모드: 메가 메뉴 토글
                      if (megaMenuOpen && activeDropdown === item.label) {
                        // 같은 아이템 클릭 시 닫기
                        setMegaMenuOpen(false)
                        setActiveDropdown(null)
                      } else {
                        // 다른 아이템 클릭 시 열기/변경
                        setMegaMenuOpen(true)
                        setActiveDropdown(item.label)
                      }
                    } else {
                      // 기본 모드: 개별 메뉴 토글
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      setMegaMenuOpen(false)
                    }
                  }}
                  onMouseEnter={() => {
                    if (!showAllMenus && item.subItems) {
                      setActiveDropdown(item.label)
                      setMegaMenuOpen(false)
                    }
                  }}
                >
                  {item.label}
                  {item.subItems && <HiChevronDown className="h-3 w-3" />}
                </button>
                
                {/* 기본 모드: 개별 드롭다운 */}
                {!showAllMenus && item.subItems && activeDropdown === item.label && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 rounded-lg border bg-popover p-2 shadow-lg z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block rounded-md px-3 py-2 hover:bg-accent transition-colors"
                      >
                        <div className="font-medium text-sm">{subItem.label}</div>
                        {subItem.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {subItem.description}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* 전체 메뉴 모드: 메가 메뉴 (모든 서브메뉴를 한 번에 표시) */}
            {showAllMenus && megaMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-lg border bg-popover shadow-xl z-50">
                <div className="grid grid-cols-5 gap-6 p-6">
                  {navItems.map((category) => (
                    category.subItems && (
                      <div key={category.label} className="space-y-3">
                        <h3 className="font-semibold text-sm text-primary border-b pb-2">
                          {category.label}
                        </h3>
                        <div className="space-y-1">
                          {category.subItems.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="block rounded-md px-2 py-1.5 hover:bg-accent transition-colors"
                              onClick={() => setMegaMenuOpen(false)}
                            >
                              <div className="font-medium text-sm">{subItem.label}</div>
                              {subItem.description && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {subItem.description}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">로그인</Button>
              <Button size="sm">시작</Button>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="relative">
                  <HiOutlineBars3 className="h-5 w-5" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 overflow-y-auto">
                <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
                  <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">메뉴</SheetTitle>
                  </SheetHeader>
                </div>
                <nav className="flex flex-col px-4 py-6">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <div key={item.label} className="border-b last:border-0">
                        {item.subItems ? (
                          <>
                            <button
                              className={cn(
                                "flex items-center justify-between w-full px-4 py-4 text-base font-medium transition-colors",
                                "hover:bg-accent/50 active:bg-accent",
                                mobileSubmenu === item.label && "bg-accent/30"
                              )}
                              onClick={() => setMobileSubmenu(
                                mobileSubmenu === item.label ? null : item.label
                              )}
                            >
                              <span>{item.label}</span>
                              <HiChevronDown className={cn(
                                "h-5 w-5 transition-transform duration-200",
                                mobileSubmenu === item.label && "rotate-180"
                              )} />
                            </button>
                            <div className={cn(
                              "overflow-hidden transition-all duration-200",
                              mobileSubmenu === item.label ? "max-h-96" : "max-h-0"
                            )}>
                              <div className="pb-2">
                                {item.subItems.map((subItem) => (
                                  <a
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="flex flex-col px-8 py-3 hover:bg-accent/30 active:bg-accent/50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span className="text-sm font-medium">{subItem.label}</span>
                                    {subItem.description && (
                                      <span className="text-xs text-muted-foreground mt-0.5">
                                        {subItem.description}
                                      </span>
                                    )}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <a
                            href={item.href}
                            className="flex items-center px-4 py-4 text-base font-medium hover:bg-accent/50 active:bg-accent transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 px-2 space-y-3 border-t">
                    <Button variant="outline" size="lg" className="w-full justify-center font-medium">
                      로그인
                    </Button>
                    <Button size="lg" className="w-full justify-center font-medium">
                      시작
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      문의: support@enterprise.com
                    </p>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}