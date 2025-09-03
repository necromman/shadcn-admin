import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { 
  BookOpen, Search, Menu, User, LogOut, 
  BookMarked, Calendar, Bell, Settings, ChevronDown
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
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'

interface SubMenuItem {
  title: string
  description?: string
}

interface MenuItem {
  title: string
  subItems?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  { 
    title: '자료검색', 
    subItems: [
      { title: '통합검색', description: '도서, 논문, 멀티미디어 통합 검색' },
      { title: '상세검색', description: '상세 조건으로 자료 검색' },
      { title: '신착자료', description: '최근 입수된 도서 및 자료' },
      { title: '인기자료', description: '많이 대출된 인기 도서' },
      { title: '주제별 브라우징', description: '주제별로 자료 둘러보기' },
    ]
  },
  { 
    title: '도서관 서비스', 
    subItems: [
      { title: '대출/예약/연장', description: '도서 대출 및 예약 서비스' },
      { title: '희망도서 신청', description: '원하는 도서 구입 신청' },
      { title: '상호대차', description: '타 도서관 자료 이용' },
      { title: '원문복사', description: '학술자료 복사 서비스' },
      { title: '이용교육', description: '도서관 이용 교육 프로그램' },
    ]
  },
  { 
    title: '시설이용', 
    subItems: [
      { title: '열람실 좌석', description: '열람실 좌석 예약' },
      { title: '스터디룸', description: '그룹 스터디룸 예약' },
      { title: '세미나실', description: '세미나실 대관 신청' },
      { title: '시설 안내', description: '도서관 시설 정보' },
      { title: '예약 현황', description: '시설 예약 현황 조회' },
    ]
  },
  { 
    title: '도서관 소식', 
    subItems: [
      { title: '공지사항', description: '도서관 공지사항' },
      { title: '도서관 소식', description: '도서관 새 소식' },
      { title: '이벤트/행사', description: '진행중인 이벤트와 행사' },
      { title: 'FAQ', description: '자주 묻는 질문' },
      { title: 'Q&A', description: '문의하기' },
    ]
  },
  { 
    title: '이용안내', 
    subItems: [
      { title: '도서관 소개', description: '도서관 소개 및 연혁' },
      { title: '이용시간', description: '개관 시간 안내' },
      { title: '대출/반납', description: '대출 및 반납 안내' },
      { title: '시설', description: '시설 이용 안내' },
      { title: '오시는 길', description: '위치 및 교통 안내' },
      { title: '규정', description: '도서관 이용 규정' },
    ]
  },
]

export function LibraryHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { settings, setSettingsOpen } = useLibraryDevSettings()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality will be implemented later
  }

  const toggleMobileSubmenu = (title: string) => {
    setMobileSubmenu(mobileSubmenu === title ? null : title)
  }

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
      {/* Background blur overlay */}
      {settings.header.enableBlur && (activeDropdown || megaMenuOpen) && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          onClick={() => {
            setActiveDropdown(null)
            setMegaMenuOpen(false)
          }}
        />
      )}

      {/* Main Header */}
      <header className={cn(
        "bg-background border-b",
        settings.header.headerStyle === 'sticky' && "sticky top-0 z-50",
        settings.header.headerStyle === 'fixed' && "fixed top-0 left-0 right-0 z-50"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">세종샘물도서관</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {menuItems.map((item) => (
                <div key={item.title} className="relative">
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      activeDropdown === item.title && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => {
                      if (!item.subItems) {
                        // No submenu
                      } else if (settings.header.showAllMenus) {
                        // Mega menu mode
                        if (megaMenuOpen && activeDropdown === item.title) {
                          setMegaMenuOpen(false)
                          setActiveDropdown(null)
                        } else {
                          setMegaMenuOpen(true)
                          setActiveDropdown(item.title)
                        }
                      } else {
                        // Individual dropdown mode
                        setActiveDropdown(activeDropdown === item.title ? null : item.title)
                        setMegaMenuOpen(false)
                      }
                    }}
                    onMouseEnter={() => {
                      if (!settings.header.hoverEnabled) return
                      
                      if (settings.header.showAllMenus && item.subItems) {
                        setMegaMenuOpen(true)
                        setActiveDropdown(item.title)
                      } else if (!settings.header.showAllMenus && item.subItems) {
                        setActiveDropdown(item.title)
                        setMegaMenuOpen(false)
                      }
                    }}
                  >
                    {item.title}
                    {item.subItems && <ChevronDown className="h-3 w-3" />}
                  </button>

                  {/* Individual dropdown */}
                  {!settings.header.showAllMenus && item.subItems && activeDropdown === item.title && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-72 rounded-lg border bg-background p-2 shadow-lg z-50"
                      onMouseLeave={() => settings.header.hoverEnabled && setActiveDropdown(null)}
                    >
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.title}
                          className="block rounded-md px-3 py-2 hover:bg-accent transition-colors cursor-pointer"
                        >
                          <div className="font-medium text-sm">{subItem.title}</div>
                          {subItem.description && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {subItem.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mega menu */}
              {settings.header.showAllMenus && megaMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-full rounded-lg border bg-background shadow-xl z-50"
                  onMouseLeave={() => {
                    if (settings.header.hoverEnabled) {
                      setMegaMenuOpen(false)
                      setActiveDropdown(null)
                    }
                  }}
                >
                  <div className="container mx-auto px-4">
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
                                <div
                                  key={subItem.title}
                                  className="block rounded-md px-2 py-1.5 hover:bg-accent transition-colors cursor-pointer"
                                >
                                  <div className="text-sm">{subItem.title}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-muted-foreground">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </nav>

            {/* Search Bar */}
            {settings.header.showSearchBar && (
              <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="도서, 저자, 출판사 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </form>
            )}

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              {settings.header.showNotifications && (
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              )}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Library
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    예약 현황
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    로그인
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dev Settings */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <ModeToggle />

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>메뉴</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </form>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-1">
                      {menuItems.map((item) => (
                        <div key={item.title}>
                          <button
                            onClick={() => item.subItems && toggleMobileSubmenu(item.title)}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
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
                            <div className="ml-4 mt-1 space-y-1">
                              {item.subItems.map((subItem) => (
                                <div
                                  key={subItem.title}
                                  className="block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors cursor-pointer"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div>{subItem.title}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
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