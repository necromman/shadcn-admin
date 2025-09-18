import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MenuItem } from '@/features/kanc/data/menu.mock'
import { ChevronDown, ArrowRight } from 'lucide-react'
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

  // 디폴트 스타일 - 개별 드롭다운
  if (style === 'default' || style === 'simple') {
    return (
      <nav className="relative">
        <ul className="flex items-center justify-center space-x-8">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 py-4 text-foreground hover:text-primary font-medium transition-colors">
                {item.title}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </button>

              {item.children && activeMenu === item.id && (
                <div className="absolute top-full left-0 w-64 bg-card shadow-lg border z-50">
                  <ul className="py-2">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={child.path}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  // 헤더 위치 계산
  useEffect(() => {
    if (isMenuOpen && navRef.current) {
      const rect = navRef.current.getBoundingClientRect()
      const headerBottom = rect.bottom
      setMenuTop(headerBottom)
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
          <div className="grid grid-cols-5 gap-8">
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

                {/* 서브메뉴 아이템들 */}
                <ul className="space-y-1">
                  {item.children?.map((child) => (
                    <li key={child.id}>
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
                    </li>
                  ))}
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