import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MenuItem } from '@/features/kanc/data/menu.mock'
import { ChevronDown, ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

interface MegaMenuProps {
  menuItems: MenuItem[]
  variant: 'intro' | 'service'
  style?: 'default' | 'mega' | 'simple'
}

export function MegaMenu({ menuItems, style = 'default' }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuTop, setMenuTop] = useState(120)
  const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>({})
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const { t } = useTranslation()

  const toggleSubMenu = (menuId: string) => {
    setExpandedSubMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }))
  }

  // 헤더 위치 계산 및 스크롤 감지 - hooks는 조건부 return 전에 모두 선언
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
                {t(item.title)}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </button>

              {item.children && item.children.length > 0 && activeMenu === item.id && (
                <div className="absolute top-full left-0 min-w-[280px] max-w-[360px] bg-card shadow-lg border rounded-md z-50">
                  <ul className="py-2 max-h-[520px] overflow-y-auto">
                    {item.children.map((child) => (
                      <li key={child.id} className="relative">
                        {child.children && child.children.length > 0 ? (
                          <div>
                            <button
                              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleSubMenu(child.id);
                              }}
                            >
                              <span className="font-medium">{t(child.title)}</span>
                              <ChevronRight className={cn(
                                "w-4 h-4 transition-transform",
                                expandedSubMenus[child.id] ? "rotate-90" : ""
                              )} />
                            </button>
                            {/* 확장 가능한 서브메뉴 - 아코디언 스타일 */}
                            {expandedSubMenus[child.id] && (
                              <div className="bg-muted/30 border-l-2 border-primary/20 ml-4 mr-2 my-1">
                                <ul className="py-1">
                                  {child.children.map((subChild) => (
                                    <li key={subChild.id}>
                                      {subChild.children && subChild.children.length > 0 ? (
                                        <div>
                                          <button
                                            className="w-full flex items-center justify-between px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              toggleSubMenu(subChild.id);
                                            }}
                                          >
                                            <span className="font-medium">{t(subChild.title)}</span>
                                            <ChevronRight className={cn(
                                              "w-3 h-3 transition-transform",
                                              expandedSubMenus[subChild.id] ? "rotate-90" : ""
                                            )} />
                                          </button>
                                          {/* 3depth 메뉴 */}
                                          {expandedSubMenus[subChild.id] && (
                                            <div className="bg-muted/20 ml-3 mr-1">
                                              <ul className="py-1">
                                                {subChild.children.map((subSubChild) => (
                                                  <li key={subSubChild.id}>
                                                    <a
                                                      href={subSubChild.path || '#'}
                                                      className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                                      onClick={() => setActiveMenu(null)}
                                                    >
                                                      • {t(subSubChild.title)}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <a
                                          href={subChild.path || '#'}
                                          className="block px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                                          onClick={() => setActiveMenu(null)}
                                        >
                                          {t(subChild.title)}
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          <a
                            href={child.path || '#'}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                            onClick={() => setActiveMenu(null)}
                          >
                            {t(child.title)}
                          </a>
                        )}
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
                  {t(item.title)}
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
                              <span>{t(child.title)}</span>
                              <ChevronRight className="w-3 h-3 opacity-50" />
                            </div>

                            {/* 3depth는 호버 시에만 표시 */}
                            {child.children && child.children.length > 0 && (
                              <div className="absolute left-full top-0 ml-2 w-48 bg-card shadow-lg border rounded-md opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50">
                                <ul className="py-2">
                                  {child.children.map((subChild) => (
                                    <li key={subChild.id}>
                                    {subChild.children ? (
                                      <div className="group/sub relative">
                                        <div className="flex items-center justify-between px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-primary cursor-pointer">
                                          <span>{t(subChild.title)}</span>
                                          <ChevronRight className="w-3 h-3 opacity-50" />
                                        </div>
                                        {/* 4depth는 더 작은 폰트로 */}
                                        {subChild.children && subChild.children.length > 0 && (
                                          <div className="absolute left-full top-0 ml-2 w-44 bg-card shadow-lg border rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                                            <ul className="py-1">
                                              {subChild.children.map((subSubChild) => (
                                                <li key={subSubChild.id}>
                                                  <a
                                                    href={subSubChild.path || '#'}
                                                    className="block px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-primary"
                                                    onClick={() => setIsMenuOpen(false)}
                                                  >
                                                    {t(subSubChild.title)}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <a
                                        href={subChild.path || '#'}
                                        className="block px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-primary"
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {t(subChild.title)}
                                      </a>
                                    )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        ) : (
                          <a
                            href={child.path || '#'}
                            className={cn(
                              "group flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all",
                              activeMenu === item.id
                                ? "text-foreground hover:bg-accent hover:text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                            onMouseEnter={() => setActiveMenu(item.id)}
                          >
                            <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            <span>{t(child.title)}</span>
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
                        <span>{t('kanc:common.more')}</span>
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
                  {t('kanc:footer.quickLinks.sitemap')}
                </a>
                <a
                  href="/kanc/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('kanc:footer.quickLinks.directions')}
                </a>
                <a
                  href="/kanc/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('kanc:navigation.menu.servicePortal.faq')}
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                {t('kanc:navigation.megaMenu.quickServiceInfo')}
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
                {t(item.title)}
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