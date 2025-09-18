import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MenuItem } from '@/features/kanc/data/menu.mock'
import { ChevronDown, ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MegaMenuProps {
  menuItems: MenuItem[]
  variant: 'intro' | 'service'
  style?: 'default' | 'mega' | 'simple'
}

export function MegaMenu({ menuItems, style = 'default' }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuTop, setMenuTop] = useState(120)
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)

  // 디폴트 스타일 - 개별 드롭다운
  if (style === 'default' || style === 'simple') {
    return (
      <nav className="relative">
        <ul className="flex items-center justify-center space-x-8">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="relative group"
              onMouseEnter={() => {
                setActiveMenu(item.id)
                // 스크롤 시 메뉴 닫기를 위한 현재 스크롤 위치 저장
                lastScrollY.current = window.scrollY
              }}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 py-4 text-foreground hover:text-primary font-medium transition-colors">
                {item.title}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </button>

              {item.children && activeMenu === item.id && (
                <div className="absolute top-full left-0 w-64 bg-card shadow-lg border rounded-md z-50">
                  <ul className="py-2 max-h-96 overflow-y-auto">
                    {item.children.slice(0, 8).map((child) => (
                      <li key={child.id} className="relative group/sub">
                        {child.children ? (
                          <>
                            <button
                              className="w-full flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <span>{child.title}</span>
                              <ChevronRight className="w-4 h-4 opacity-50" />
                            </button>
                            {/* 2depth 호버 메뉴 */}
                            <div className="absolute left-full top-0 ml-1 w-60 bg-card shadow-lg border rounded-md hidden group-hover/sub:block z-50">
                              <ul className="py-2 max-h-80 overflow-y-auto">
                                {child.children.map((subChild) => (
                                  <li key={subChild.id}>
                                    {subChild.children ? (
                                      <div className="px-3 py-1.5">
                                        <div className="text-xs font-medium text-muted-foreground mb-1">
                                          {subChild.title}
                                        </div>
                                        <ul className="ml-2 space-y-0.5">
                                          {subChild.children.slice(0, 5).map((subSubChild) => (
                                            <li key={subSubChild.id}>
                                              <a
                                                href={subSubChild.path}
                                                className="block px-2 py-0.5 text-xs text-muted-foreground/80 hover:text-primary transition-colors"
                                              >
                                                · {subSubChild.title}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ) : (
                                      <a
                                        href={subChild.path}
                                        className="block px-4 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                                      >
                                        {subChild.title}
                                      </a>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <a
                            href={child.path}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                          >
                            {child.title}
                          </a>
                        )}
                      </li>
                    ))}
                    {/* 더 많은 항목이 있으면 "전체보기" 링크 */}
                    {item.children.length > 8 && (
                      <li className="border-t mt-2 pt-2">
                        <a
                          href={`/${item.id}`}
                          className="block px-4 py-2 text-sm text-primary hover:bg-accent transition-colors font-medium"
                        >
                          전체 메뉴 보기 →
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  // 헤더 위치 계산 및 스크롤 감지
  useEffect(() => {
    if (isMenuOpen && navRef.current) {
      const rect = navRef.current.getBoundingClientRect()
      const headerBottom = rect.bottom
      setMenuTop(headerBottom)
    }
  }, [isMenuOpen])

  // 스크롤 시 메가메뉴 닫기
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 스크롤이 발생하면 메가메뉴 닫기
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        if (isMenuOpen) {
          setIsMenuOpen(false)
          setActiveMenu(null)
        }
      }

      lastScrollY.current = currentScrollY
    }

    if (isMenuOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isMenuOpen])

  // 메가 메뉴 스타일 - 모든 메뉴 한번에 표시 (포털 사용)
  const megaMenuContent = isMenuOpen && (
    <div
      className="fixed left-0 right-0 w-full z-50"
      style={{ top: `${menuTop}px` }} // 동적으로 계산된 헤더 높이 사용
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => {
        setIsMenuOpen(false)
        setActiveMenu(null)
      }}
    >
      <div className="bg-card shadow-xl border-y">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className={cn(
                "space-y-3 transition-opacity duration-200",
                activeMenu === item.id ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}>
                {/* 메뉴 타이틀 */}
                <h3 className={cn(
                  "font-semibold text-sm uppercase tracking-wider pb-2 border-b",
                  activeMenu === item.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-border"
                )}>
                  {item.title}
                </h3>

                {/* 서브메뉴 아이템들 - 2depth까지만 기본 표시 */}
                <ul className="space-y-1">
                  {item.children?.map((child, childIdx) => {
                    // 처음 5개만 기본 표시, 나머지는 "더보기"로 처리
                    if (!child.children && childIdx >= 5) return null;

                    return (
                      <li key={child.id} className="group/item relative">
                        {child.children ? (
                          <>
                            <div className={cn(
                              "flex items-center justify-between px-2 py-1.5 text-sm rounded cursor-pointer transition-all",
                              activeMenu === item.id
                                ? "text-foreground hover:bg-accent/50"
                                : "text-muted-foreground hover:text-foreground"
                            )}>
                              <span>{child.title}</span>
                              <ChevronRight className="w-3 h-3 opacity-50" />
                            </div>

                            {/* 3depth는 호버 시에만 표시 */}
                            <div className="absolute left-full top-0 ml-2 w-48 bg-card shadow-lg border rounded-md opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50">
                              <ul className="py-2">
                                {child.children.map((subChild) => (
                                  <li key={subChild.id}>
                                    {subChild.children ? (
                                      <div className="group/sub relative">
                                        <div className="flex items-center justify-between px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-primary cursor-pointer">
                                          <span>{subChild.title}</span>
                                          <ChevronRight className="w-3 h-3 opacity-50" />
                                        </div>
                                        {/* 4depth는 더 작은 폰트로 */}
                                        <div className="absolute left-full top-0 ml-2 w-44 bg-card shadow-lg border rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                                          <ul className="py-1">
                                            {subChild.children.map((subSubChild) => (
                                              <li key={subSubChild.id}>
                                                <a
                                                  href={subSubChild.path}
                                                  className="block px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-primary"
                                                  onClick={() => setIsMenuOpen(false)}
                                                >
                                                  {subSubChild.title}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    ) : (
                                      <a
                                        href={subChild.path}
                                        className="block px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-primary"
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {subChild.title}
                                      </a>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <a
                            href={child.path}
                            className={cn(
                              "group flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all",
                              activeMenu === item.id
                                ? "text-foreground hover:bg-accent hover:text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                            onMouseEnter={() => setActiveMenu(item.id)}
                          >
                            <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            <span>{child.title}</span>
                          </a>
                        )}
                      </li>
                    );
                  })}

                  {/* 숨겨진 항목이 있으면 "더보기" 표시 */}
                  {item.children && item.children.filter(c => !c.children).length > 5 && (
                    <li>
                      <a
                        href={`/${item.id}`}
                        className="flex items-center gap-1 px-2 py-1.5 text-xs text-muted-foreground hover:text-primary"
                      >
                        <span>더보기</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </li>
                  )}
                </ul>

                {/* 추가 정보 또는 아이콘 (옵션) - description 필드가 추가되면 사용 */}
              </div>
            ))}
          </div>

          {/* 하단 빠른 링크 영역 (옵션) */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <a
                  href="/kanc/sitemap"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  사이트맵
                </a>
                <a
                  href="/kanc/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  오시는 길
                </a>
                <a
                  href="/kanc/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  자주 묻는 질문
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                빠른 서비스 이용을 위한 메가 메뉴
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <nav ref={navRef} className="relative">
        <ul className="flex items-center justify-center space-x-8">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => {
                setActiveMenu(item.id)
                setIsMenuOpen(true)
                // 스크롤 시 메뉴 닫기를 위한 현재 스크롤 위치 저장
                lastScrollY.current = window.scrollY
              }}
            >
              <button
                className={cn(
                  "flex items-center gap-1 py-4 text-foreground hover:text-primary font-medium transition-colors",
                  activeMenu === item.id && isMenuOpen && "text-primary"
                )}
              >
                {item.title}
                {item.children && <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeMenu === item.id && isMenuOpen && "rotate-180"
                )} />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 포털로 메가 메뉴 렌더링 */}
      {typeof document !== 'undefined' && createPortal(megaMenuContent, document.body)}
    </>
  )
}