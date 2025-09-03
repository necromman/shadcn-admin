import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  BookOpen, Search, Menu, User, LogOut, 
  BookMarked, Calendar, Bell, ChevronDown
} from 'lucide-react'
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
      { title: '희망도서 신청', href: '/services/request', description: '구입 희망 도서 신청' },
      { title: '상호대차', href: '/services/ill', description: '타 도서관 자료 이용' },
      { title: '원문복사', href: '/services/copy', description: '학술자료 원문복사 서비스' },
      { title: '도서관 이용교육', href: '/services/education', description: '도서관 활용 교육 프로그램' },
    ]
  },
  { 
    title: '시설이용', 
    href: '/facilities',
    subItems: [
      { title: '열람실 좌석 예약', href: '/facilities/seat', description: '열람실 좌석 실시간 예약' },
      { title: '스터디룸 예약', href: '/facilities/study', description: '그룹 스터디룸 예약' },
      { title: '세미나실 예약', href: '/facilities/seminar', description: '세미나실 예약 신청' },
      { title: '시설 안내', href: '/facilities/guide', description: '도서관 시설 이용 안내' },
      { title: '예약 현황', href: '/facilities/status', description: '시설 예약 현황 조회' },
    ]
  },
  { 
    title: '도서관 소식', 
    href: '/news',
    subItems: [
      { title: '공지사항', href: '/news/notice', description: '도서관 공지사항' },
      { title: '도서관 소식', href: '/news/library', description: '도서관 뉴스 및 소식' },
      { title: '이벤트/행사', href: '/news/event', description: '도서관 행사 안내' },
      { title: 'FAQ', href: '/news/faq', description: '자주 묻는 질문' },
      { title: 'Q&A 게시판', href: '/news/qna', description: '질문 게시판' },
    ]
  },
  { 
    title: '이용안내', 
    href: '/guide',
    subItems: [
      { title: '도서관 소개', href: '/guide/about', description: '세종샘물도서관 소개' },
      { title: '이용시간', href: '/guide/hours', description: '도서관 운영 시간' },
      { title: '대출/반납 안내', href: '/guide/loan-info', description: '자료 대출 및 반납 방법' },
      { title: '시설 안내', href: '/guide/facilities', description: '층별 시설 안내' },
      { title: '오시는 길', href: '/guide/location', description: '도서관 위치 및 교통' },
      { title: '규정/지침', href: '/guide/rules', description: '도서관 이용 규정' },
    ]
  },
]

export function LibraryHeader() {
  // ========================================
  // 개발자 설정 영역 시작 (Developer Configuration)
  // 아래 설정을 변경하여 헤더의 동작과 표시를 제어할 수 있습니다
  // ========================================
  
  // [옵션 1] 헤더 스타일 설정
  // - 'sticky': 스크롤 시 상단 고정 (기본값)
  // - 'static': 고정하지 않음
  // - 'fixed': 항상 상단 고정
  const HEADER_STYLE = 'sticky';
  
  // [옵션 2] 상단 공지 바 표시
  // - true: 공지 바 표시
  // - false: 공지 바 숨김
  const SHOW_TOP_NOTICE = true;
  
  // [옵션 3] 검색바 표시 옵션
  // - 'always': 항상 표시
  // - 'desktop': 데스크톱에서만 표시
  // - 'none': 표시하지 않음
  const SHOW_SEARCH_BAR = 'desktop';
  
  // [옵션 4] 알림 기능 활성화
  // - true: 알림 아이콘과 뱃지 표시
  // - false: 알림 기능 비활성화
  const ENABLE_NOTIFICATIONS = true;
  
  // [옵션 5] 알림 뱃지 숫자
  // - 0: 뱃지 숨김
  // - 1-99: 해당 숫자 표시
  const NOTIFICATION_COUNT = 3;
  
  // [옵션 6] 드롭다운 메뉴 트리거 방식
  // - 'hover': 마우스 오버 시 표시 (데스크톱)
  // - 'click': 클릭 시 표시
  const DROPDOWN_TRIGGER = 'hover';
  
  // [옵션 7] 서브메뉴 설명 표시
  // - true: 각 서브메뉴 항목의 설명 표시
  // - false: 제목만 표시
  const SHOW_SUBMENU_DESCRIPTIONS = true;
  
  // [옵션 8] 로그인 상태 시뮬레이션
  // - true: 로그인된 상태 (사용자 메뉴 표시)
  // - false: 로그아웃 상태 (로그인 버튼 표시)
  const SIMULATE_LOGGED_IN = false;
  
  // ========================================
  // 개발자 설정 영역 끝
  // ========================================
  
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(SIMULATE_LOGGED_IN)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  // 헤더 스타일 클래스 결정
  const headerClassName = `${HEADER_STYLE === 'sticky' ? 'sticky' : HEADER_STYLE === 'fixed' ? 'fixed' : 'relative'} top-0 z-50 bg-white dark:bg-gray-950 border-b`;

  return (
    <header className={headerClassName}>
      {/* 
        ========================================
        조건부 렌더링: 상단 공지 바
        설정: SHOW_TOP_NOTICE (라인 106)
        ========================================
      */}
      {SHOW_TOP_NOTICE && (
        <div className="bg-blue-600 text-white py-1.5 px-4 text-center text-sm">
          <span>도서관 이용시간: 평일 09:00-22:00 | 토요일 09:00-17:00</span>
        </div>
      )}

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl">세종샘물도서관</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((menu) => (
              <div
                key={menu.title}
                className="relative"
                onMouseEnter={() => DROPDOWN_TRIGGER === 'hover' && setActiveDropdown(menu.title)}
                onMouseLeave={() => DROPDOWN_TRIGGER === 'hover' && setActiveDropdown(null)}
                onClick={() => DROPDOWN_TRIGGER === 'click' && setActiveDropdown(activeDropdown === menu.title ? null : menu.title)}
              >
                <Link
                  to={menu.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors ${
                    location.pathname.startsWith(menu.href) ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {menu.title}
                  {menu.subItems && <ChevronDown className="h-3 w-3" />}
                </Link>
                
                {/* Dropdown Menu */}
                {menu.subItems && activeDropdown === menu.title && (
                  <div className="absolute left-0 top-full mt-1 w-64 rounded-md border bg-white dark:bg-gray-900 shadow-lg py-2 z-50">
                    {menu.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {subItem.title}
                        </div>
                        {SHOW_SUBMENU_DESCRIPTIONS && subItem.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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

          {/* 
            ========================================
            조건부 렌더링: 검색바
            설정: SHOW_SEARCH_BAR (라인 112)
            ========================================
          */}
          {(SHOW_SEARCH_BAR === 'always' || SHOW_SEARCH_BAR === 'desktop') && (
          <form onSubmit={handleSearch} className={`${SHOW_SEARCH_BAR === 'desktop' ? 'hidden md:flex' : 'flex'} items-center space-x-2 flex-1 max-w-md mx-8`}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="도서, 저자, ISBN 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3"
              />
            </div>
          </form>
          )}

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* 
              ========================================
              조건부 렌더링: 알림
              설정: ENABLE_NOTIFICATIONS (라인 117)
              ========================================
            */}
            {ENABLE_NOTIFICATIONS && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {NOTIFICATION_COUNT > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    {NOTIFICATION_COUNT}
                  </Badge>
                )}
              </Button>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-library')}>
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Library
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-library')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    대출 현황
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/login')} size="sm">
                로그인
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>메뉴</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </form>

                  {/* Mobile Menu Items */}
                  <nav className="space-y-1">
                    {menuItems.map((menu) => (
                      <div key={menu.title}>
                        <button
                          onClick={() => setMobileSubmenu(
                            mobileSubmenu === menu.title ? null : menu.title
                          )}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                        >
                          {menu.title}
                          {menu.subItems && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                mobileSubmenu === menu.title ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </button>
                        
                        {/* Mobile Submenu */}
                        {menu.subItems && mobileSubmenu === menu.title && (
                          <div className="ml-4 mt-1 space-y-1">
                            {menu.subItems.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-accent rounded-md"
                              >
                                {subItem.title}
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
  )
}