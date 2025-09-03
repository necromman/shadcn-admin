import { Button } from '@/components/ui/button'
import { HiOutlineBars3, HiChevronDown, HiMagnifyingGlass, HiUser, HiBookOpen } from 'react-icons/hi2'
import { useState, useEffect, useRef } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

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

export function DSLibraryHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 도서관 네비게이션 메뉴 구조
  const navItems: NavItem[] = [
    {
      label: '자료검색',
      href: '/search',
      subItems: [
        { label: '통합검색', href: '/search/integrated', description: '도서, 논문, 멀티미디어 통합 검색' },
        { label: '상세검색', href: '/search/advanced', description: '상세 조건으로 자료 검색' },
        { label: '신착자료', href: '/search/new', description: '최근 입수된 도서 및 자료' },
        { label: '인기자료', href: '/search/popular', description: '많이 대출된 인기 도서' },
        { label: '주제별 브라우징', href: '/search/browse', description: '주제별로 자료 둘러보기' },
      ],
    },
    {
      label: '도서관 서비스',
      href: '/services',
      subItems: [
        { label: '대출/예약/연장', href: '/services/loan', description: '도서 대출 및 예약 서비스' },
        { label: '희망도서 신청', href: '/services/request', description: '구입 희망 도서 신청' },
        { label: '상호대차', href: '/services/ill', description: '타 도서관 자료 이용' },
        { label: '원문복사', href: '/services/copy', description: '학술자료 원문복사 서비스' },
        { label: '도서관 이용교육', href: '/services/education', description: '도서관 활용 교육 프로그램' },
      ],
    },
    {
      label: '시설이용',
      href: '/facilities',
      subItems: [
        { label: '열람실 좌석 예약', href: '/facilities/seat', description: '열람실 좌석 실시간 예약' },
        { label: '스터디룸 예약', href: '/facilities/study', description: '그룹 스터디룸 예약' },
        { label: '세미나실 예약', href: '/facilities/seminar', description: '세미나실 예약 신청' },
        { label: '시설 안내', href: '/facilities/guide', description: '도서관 시설 이용 안내' },
        { label: '예약 현황', href: '/facilities/status', description: '시설 예약 현황 조회' },
      ],
    },
    {
      label: '도서관 소식',
      href: '/news',
      subItems: [
        { label: '공지사항', href: '/news/notice', description: '도서관 공지사항' },
        { label: '도서관 소식', href: '/news/library', description: '도서관 뉴스 및 소식' },
        { label: '이벤트/행사', href: '/news/event', description: '도서관 행사 안내' },
        { label: 'FAQ', href: '/news/faq', description: '자주 묻는 질문' },
        { label: 'Q&A 게시판', href: '/news/qna', description: '질문 게시판' },
      ],
    },
    {
      label: '이용안내',
      href: '/guide',
      subItems: [
        { label: '도서관 소개', href: '/guide/about', description: '세종샘물도서관 소개' },
        { label: '이용시간', href: '/guide/hours', description: '도서관 운영 시간' },
        { label: '대출/반납 안내', href: '/guide/loan', description: '자료 대출 및 반납 방법' },
        { label: '시설 안내', href: '/guide/facilities', description: '층별 시설 안내' },
        { label: '오시는 길', href: '/guide/location', description: '도서관 위치 및 교통' },
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <HiBookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-lg">세종샘물도서관</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                      "hover:bg-accent flex items-center gap-1",
                      activeDropdown === item.label && "text-primary bg-accent"
                    )}
                  >
                    {item.label}
                    {item.subItems && <HiChevronDown className="h-3 w-3" />}
                  </button>

                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full mt-1 w-64 rounded-md border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <div className="font-medium">{subItem.label}</div>
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
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center gap-2 mr-2">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="도서 검색..."
                  className="pl-9 pr-3 h-9 w-[200px] lg:w-[250px]"
                />
              </div>
            </div>

            {/* My Library Button */}
            <Button variant="ghost" size="sm" className="gap-2">
              <HiUser className="h-4 w-4" />
              <span className="hidden sm:inline">My Library</span>
            </Button>

            {/* Login Button */}
            <Button variant="default" size="sm">
              로그인
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <HiOutlineBars3 className="h-5 w-5" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>메뉴</SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <div className="mt-4 mb-6">
                  <div className="relative">
                    <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="도서 검색..."
                      className="pl-9 pr-3"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileSubmenu(
                          mobileSubmenu === item.label ? null : item.label
                        )}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.label}
                        {item.subItems && (
                          <HiChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              mobileSubmenu === item.label && "rotate-180"
                            )}
                          />
                        )}
                      </button>
                      
                      {/* Mobile Submenu */}
                      {item.subItems && mobileSubmenu === item.label && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile User Actions */}
                <div className="mt-6 pt-6 border-t space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <HiUser className="h-4 w-4" />
                    My Library
                  </Button>
                  <Button variant="default" className="w-full">
                    로그인
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}