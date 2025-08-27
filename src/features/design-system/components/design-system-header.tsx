import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { ThemeSelector } from '../theme/components/theme-selector'
import { Button } from '@/components/ui/button'
import { 
  HiSwatch, 
  HiViewColumns, 
  HiSquares2X2, 
  HiAdjustmentsHorizontal,
  HiBars3,
  HiChevronDown
} from 'react-icons/hi2'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface DesignSystemHeaderProps {
  activeTab: string
  onTabChange: (value: string) => void
  onOpenThemeEditor: () => void
  onToggleAll?: () => void
  onOpenCategoryManager?: () => void
  allExpanded?: boolean
  showCategoryButton?: boolean
}

export function DesignSystemHeader({
  activeTab,
  onTabChange,
  onOpenThemeEditor,
  onToggleAll,
  onOpenCategoryManager,
  allExpanded = false,
  showCategoryButton = false
}: DesignSystemHeaderProps) {

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-background/80 border-b border-border/40 shadow-sm">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        {/* 단일 라인 헤더 - 모든 디바이스에서 동일한 높이 */}
        <div className="h-12 sm:h-14 flex items-center justify-between">
          
          {/* 왼쪽: 브랜드 + 탭 (데스크톱) */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* 브랜드 로고 - 모던한 디자인 */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm">P</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-black text-base tracking-tight">PROST</h1>
                <p className="text-[10px] text-muted-foreground -mt-0.5">Design System</p>
              </div>
            </div>

            {/* 데스크톱 탭 - 더 컴팩트하고 모던한 스타일 */}
            <div className="hidden md:block">
              <Tabs value={activeTab} onValueChange={onTabChange}>
                <TabsList className="h-8 p-0.5 bg-muted/50">
                  <TabsTrigger 
                    value="frontend" 
                    className="text-xs px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger 
                    value="backoffice" 
                    className="text-xs px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Backoffice
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* 오른쪽: 액션 버튼들 - 더 컴팩트하게 */}
          <div className="flex items-center gap-1">
            {/* 데스크톱 액션 버튼들 */}
            <div className="hidden lg:flex items-center gap-1">
              <ThemeToggleButton />
              <ThemeSelector 
                scopeFilter={activeTab === 'frontend' ? 'frontend' : activeTab === 'backoffice' ? 'backoffice' : 'all'}
              />
              
              {/* 테마 에디터 버튼 - 새로운 스타일 */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenThemeEditor}
                title="테마 에디터"
                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
              >
                <HiSwatch className="h-3.5 w-3.5" />
              </Button>

              {activeTab === 'frontend' && (
                <>
                  {/* 토글 버튼 - 새로운 스타일 */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleAll}
                    title={allExpanded ? "모두 접기" : "모두 펼치기"}
                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                  >
                    {allExpanded ? 
                      <HiViewColumns className="h-3.5 w-3.5" /> : 
                      <HiSquares2X2 className="h-3.5 w-3.5" />
                    }
                  </Button>
                  
                  {/* 카테고리 관리 버튼 */}
                  {showCategoryButton && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onOpenCategoryManager}
                      title="카테고리 관리"
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                    >
                      <HiAdjustmentsHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* 모바일/태블릿 액션 - 통합 메뉴 */}
            <div className="flex items-center gap-1 lg:hidden">
              {/* 모바일 탭 셀렉터 - FE/BE 간결하게 표시 */}
              <div className="flex md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 bg-muted/50 border-muted-foreground/20"
                    >
                      <span className="text-xs font-semibold">
                        {activeTab === 'frontend' ? 'FE' : 'BE'}
                      </span>
                      <HiChevronDown className="h-3 w-3 ml-1 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="min-w-[140px]">
                    <DropdownMenuItem 
                      onClick={() => onTabChange('frontend')}
                      className={cn(
                        "text-xs",
                        activeTab === 'frontend' && "bg-primary/10 text-primary font-semibold"
                      )}
                    >
                      Frontend
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onTabChange('backoffice')}
                      className={cn(
                        "text-xs",
                        activeTab === 'backoffice' && "bg-primary/10 text-primary font-semibold"
                      )}
                    >
                      Backoffice
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* 다크모드 토글은 항상 표시 */}
              <ThemeToggleButton />
              
              {/* 모든 기능 통합 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-primary/10"
                  >
                    <HiBars3 className="h-4 w-4" />
                    <span className="sr-only">메뉴</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-muted-foreground">테마</p>
                  </div>
                  <DropdownMenuItem
                    onClick={onOpenThemeEditor}
                    className="text-xs"
                  >
                    <HiSwatch className="h-3.5 w-3.5 mr-2" />
                    테마 에디터
                  </DropdownMenuItem>
                  
                  {activeTab === 'frontend' && (
                    <>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-semibold text-muted-foreground">도구</p>
                      </div>
                      <DropdownMenuItem
                        onClick={onToggleAll}
                        className="text-xs"
                      >
                        {allExpanded ? 
                          <HiViewColumns className="h-3.5 w-3.5 mr-2" /> : 
                          <HiSquares2X2 className="h-3.5 w-3.5 mr-2" />
                        }
                        {allExpanded ? '모두 접기' : '모두 펼치기'}
                      </DropdownMenuItem>
                      {showCategoryButton && (
                        <DropdownMenuItem
                          onClick={onOpenCategoryManager}
                          className="text-xs"
                        >
                          <HiAdjustmentsHorizontal className="h-3.5 w-3.5 mr-2" />
                          카테고리 관리
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <ThemeSelector 
                      scopeFilter={activeTab === 'frontend' ? 'frontend' : activeTab === 'backoffice' ? 'backoffice' : 'all'}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 하단 인디케이터 - 시각적 강조 */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  )
}