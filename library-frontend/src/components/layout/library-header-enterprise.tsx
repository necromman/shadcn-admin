import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  BookOpen, Search, Menu, User, LogOut, 
  BookMarked, Calendar, Bell, ChevronDown
} from 'lucide-react'
import { HiCog6Tooth } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

interface SubMenuItem {
  title: string
  href: string
  description?: string
}

interface MenuItem {
  title: string
  href: string
  subItems?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  { 
    title: '자료검색', 
    href: '/search',
    subItems: [
      { title: '통합검색', href: '/search', description: '도서, 논문, 멀티미디어 통합 검색' },
      { title: '상세검색', href: '/search/advanced', description: '상세 조건으로 자료 검색' },
      { title: '신착자료', href: '/search/new', description: '최근 입수된 도서 및 자료' },
      { title: '인기자료', href: '/search/popular', description: '많이 대출된 인기 도서' },
      { title: '주제별 브라우징', href: '/search/browse', description: '주제별로 자료 둘러보기' },
    ]
  },
  { 
    title: '도서관 서비스', 
    href: '/services',
    subItems: [
      { title: '대출/예약/연장', href: '/services/loan', description: '도서 대출 및 예약 서비스' },
      { title: '희망도서 신청', href: '/services/book-request', description: '원하는 도서 구입 신청' },
      { title: '상호대차', href: '/services/interlibrary', description: '타 도서관 자료 이용' },
      { title: '원문복사', href: '/services/document-copy', description: '학술자료 복사 서비스' },
      { title: '이용교육', href: '/services/education', description: '도서관 이용 교육 프로그램' },
    ]
  },
  { 
    title: '시설이용', 
    href: '/facilities',
    subItems: [
      { title: '열람실 좌석', href: '/facilities/seat', description: '열람실 좌석 예약' },
      { title: '스터디룸', href: '/facilities/study-room', description: '그룹 스터디룸 예약' },
      { title: '세미나실', href: '/facilities/seminar', description: '세미나실 대관 신청' },
      { title: '시설 안내', href: '/facilities/guide', description: '도서관 시설 정보' },
      { title: '예약 현황', href: '/facilities/status', description: '시설 예약 현황 조회' },
    ]
  },
  { 
    title: '도서관 소식', 
    href: '/news',
    subItems: [
      { title: '공지사항', href: '/news/notice', description: '도서관 공지사항' },
      { title: '도서관 소식', href: '/news/library', description: '도서관 새 소식' },
      { title: '이벤트/행사', href: '/news/events', description: '진행중인 이벤트와 행사' },
      { title: 'FAQ', href: '/news/faq', description: '자주 묻는 질문' },
      { title: 'Q&A', href: '/news/qna', description: '문의하기' },
    ]
  },
  { 
    title: '이용안내', 
    href: '/guide',
    subItems: [
      { title: '도서관 소개', href: '/guide/intro', description: '도서관 소개 및 연혁' },
      { title: '이용시간', href: '/guide/hours', description: '개관 시간 안내' },
      { title: '대출/반납', href: '/guide/loan', description: '대출 및 반납 안내' },
      { title: '시설', href: '/guide/facilities', description: '시설 이용 안내' },
      { title: '오시는 길', href: '/guide/location', description: '위치 및 교통 안내' },
      { title: '규정', href: '/guide/rules', description: '도서관 이용 규정' },
    ]
  },
]

export function LibraryHeaderEnterprise() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // ========================================
  // 개발자 설정 옵션 (Developer Configuration)
  // ========================================
  const [enableBlur, setEnableBlur] = useState(false)
  const [showAllMenus, setShowAllMenus] = useState(false)
  const [hoverEnabled, setHoverEnabled] = useState(true)
  const [showSearchBar, setShowSearchBar] = useState(true)
  const [showNotifications, setShowNotifications] = useState(true)
  const [showTopNotice, setShowTopNotice] = useState(true)

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const toggleMobileSubmenu = (title: string) => {
    setMobileSubmenu(mobileSubmenu === title ? null : title)
  }

  return (
    <>
      {/* 콘텐츠 표시 옵션 */}
      <div className="container mb-4">
        <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiCog6Tooth className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
            <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">헤더 표시 옵션</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable-blur"
                checked={enableBlur}
                onCheckedChange={(checked) => setEnableBlur(checked as boolean)}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label htmlFor="enable-blur" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                드롭다운 배경 블러
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-all-menus"
                checked={showAllMenus}
                onCheckedChange={(checked) => setShowAllMenus(checked as boolean)}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label htmlFor="show-all-menus" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                메가 메뉴 모드
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hover-enabled"
                checked={hoverEnabled}
                onCheckedChange={(checked) => setHoverEnabled(checked as boolean)}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label htmlFor="hover-enabled" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                마우스오버 활성화
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-search"
                checked={showSearchBar}
                onCheckedChange={(checked) => setShowSearchBar(checked as boolean)}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label htmlFor="show-search" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                검색바 표시
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-notifications"
                checked={showNotifications}
                onCheckedChange={(checked) => setShowNotifications(checked as boolean)}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label htmlFor="show-notifications" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                알림 아이콘 표시
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-notice"
                checked={showTopNotice}
                onCheckedChange={(checked) => setShowTopNotice(checked as boolean)}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label htmlFor="show-notice" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                상단 공지 표시
              </Label>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
            헤더 네비게이션의 동작과 표시 요소를 관리할 수 있습니다
          </p>
        </div>
      </div>

      {/* 배경 블러 오버레이 */}
      {enableBlur && (activeDropdown || megaMenuOpen) && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          onClick={() => {
            setActiveDropdown(null)
            setMegaMenuOpen(false)
          }}
        />
      )}

      {/* 상단 공지 바 */}
      {showTopNotice && (
        <div className="bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex items-center justify-between py-2 text-sm">
              <span>📢 2024년 1월 15일(월) 시스템 점검으로 인한 서비스 일시 중단 안내</span>
              <Link to="/news/notice" className="hover:underline">자세히 보기 →</Link>
            </div>
          </div>
        </div>
      )}

      {/* 메인 헤더 */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold hidden md:block">세종샘물도서관</span>
                <span className="text-xl font-bold md:hidden">도서관</span>
              </Link>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {menuItems.map((item) => (
                <div key={item.title} className="relative">
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      (!showAllMenus && activeDropdown === item.title) || 
                      (showAllMenus && megaMenuOpen && activeDropdown === item.title) 
                        ? "bg-accent text-accent-foreground" 
                        : "",
                      location.pathname.startsWith(item.href) ? "text-primary" : ""
                    )}
                    onClick={() => {
                      if (showAllMenus) {
                        // 메가 메뉴 모드
                        if (megaMenuOpen && activeDropdown === item.title) {
                          setMegaMenuOpen(false)
                          setActiveDropdown(null)
                        } else {
                          setMegaMenuOpen(true)
                          setActiveDropdown(item.title)
                        }
                      } else {
                        // 개별 드롭다운 모드
                        if (!item.subItems) {
                          navigate(item.href)
                        } else {
                          setActiveDropdown(activeDropdown === item.title ? null : item.title)
                          setMegaMenuOpen(false)
                        }
                      }
                    }}
                    onMouseEnter={() => {
                      if (!hoverEnabled) return
                      
                      if (showAllMenus && item.subItems) {
                        setMegaMenuOpen(true)
                        setActiveDropdown(item.title)
                      } else if (!showAllMenus && item.subItems) {
                        setActiveDropdown(item.title)
                        setMegaMenuOpen(false)
                      }
                    }}
                  >
                    {item.title}
                    {item.subItems && <ChevronDown className="h-3 w-3" />}
                  </button>

                  {/* 개별 드롭다운 */}
                  {!showAllMenus && item.subItems && activeDropdown === item.title && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-72 rounded-lg border bg-popover p-2 shadow-lg z-50"
                      onMouseLeave={() => hoverEnabled && setActiveDropdown(null)}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="block rounded-md px-3 py-2 hover:bg-accent transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-medium text-sm">{subItem.title}</div>
                          {subItem.description && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {subItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* 메가 메뉴 */}
              {showAllMenus && megaMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-full rounded-lg border bg-popover shadow-xl z-50"
                  onMouseLeave={() => {
                    if (hoverEnabled) {
                      setMegaMenuOpen(false)
                      setActiveDropdown(null)
                    }
                  }}
                >
                  <div className="grid grid-cols-5 gap-6 p-6">
                    {menuItems.map((category) => (
                      category.subItems && (
                        <div key={category.title} className="space-y-3">
                          <h3 className={cn(
                            "font-semibold text-sm border-b pb-2",
                            activeDropdown === category.title ? "text-primary" : ""
                          )}>
                            {category.title}
                          </h3>
                          <div className="space-y-1">
                            {category.subItems.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                className="block rounded-md px-2 py-1.5 hover:bg-accent transition-colors"
                                onClick={() => {
                                  setMegaMenuOpen(false)
                                  setActiveDropdown(null)
                                }}
                              >
                                <div className="text-sm">{subItem.title}</div>
                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </nav>

            {/* 오른쪽 액션 영역 */}
            <div className="flex items-center gap-3">
              {/* 검색바 */}
              {showSearchBar && (
                <form onSubmit={handleSearch} className="hidden md:flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 h-9 w-[200px] lg:w-[250px]"
                    />
                  </div>
                </form>
              )}

              {/* 알림 */}
              {showNotifications && (
                <Button variant="ghost" size="icon" className="relative hidden md:flex">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 px-1.5 min-w-[1.25rem] h-5">3</Badge>
                </Button>
              )}

              {/* 테마 토글 */}
              <ThemeToggle />

              {/* 사용자 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-library" className="flex items-center gap-2">
                      <BookMarked className="h-4 w-4" />
                      My Library
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-library/loans" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      대출 현황
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 모바일 메뉴 */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle>메뉴</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    {showSearchBar && (
                      <div className="p-4 border-b">
                        <form onSubmit={handleSearch}>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="검색..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-9"
                            />
                          </div>
                        </form>
                      </div>
                    )}
                    <nav className="flex-1 overflow-y-auto py-4">
                      {menuItems.map((item) => (
                        <div key={item.title}>
                          <button
                            onClick={() => item.subItems ? toggleMobileSubmenu(item.title) : navigate(item.href)}
                            className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
                          >
                            {item.title}
                            {item.subItems && (
                              <ChevronDown className={cn(
                                "h-4 w-4 transition-transform",
                                mobileSubmenu === item.title && "rotate-180"
                              )} />
                            )}
                          </button>
                          {item.subItems && mobileSubmenu === item.title && (
                            <div className="bg-muted/50 py-2">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  to={subItem.href}
                                  className="block px-8 py-2 text-sm hover:bg-accent transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div>{subItem.title}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {subItem.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}