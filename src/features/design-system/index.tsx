import { useState, useEffect, useRef } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FrontendSection } from './frontend-section-new'
import { BackofficeSection } from './backoffice-section'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { ThemeSelector } from './theme/components/theme-selector'
import { Button } from '@/components/ui/button'
import { HiSwatch, HiViewColumns, HiSquares2X2, HiEllipsisVertical, HiAdjustmentsHorizontal } from 'react-icons/hi2'
import { applyTheme, resetTheme } from './theme/core/theme-utils'
import { type ThemeConfig } from './theme/core/types'
import { themeRegistry } from './theme/core/theme-registry'
import { defaultTheme } from './theme/presets/default'
import { custom_themeTheme } from './theme/presets/theme-custom-theme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CategoryManagerDialog } from './components/category-manager-dialog'
import type { CategoryConfig } from './types/frontend-category'

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('frontend')
  const [allExpanded, setAllExpanded] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [categories, setCategories] = useState<CategoryConfig[]>([])
  const frontendSectionRef = useRef<{ 
    toggleAll: () => void;
    getCategories: () => CategoryConfig[];
    updateCategories: (categories: CategoryConfig[]) => void;
    resetCategories: () => void;
  } | null>(null)
  
  // 컴포넌트 마운트 시 테마 등록 및 초기화
  useEffect(() => {
    // 기존 localStorage 데이터 정리 (한 번만 실행)
    localStorage.removeItem('custom-themes')
    localStorage.removeItem('selected-theme')
    
    // 기본 테마들만 등록 (커스텀 테마 로드 제거)
    themeRegistry.registerTheme(defaultTheme)
    themeRegistry.registerTheme(custom_themeTheme)
    
    // 항상 첫 번째 기본 테마 활성화
    const allThemes = themeRegistry.getAllThemes()
    if (allThemes.length > 0) {
      themeRegistry.activateTheme(allThemes[0].id)
    }
  }, [])
  
  // 테마 에디터 새 창 열기
  const openThemeEditor = () => {
    const width = 1400
    const height = 800
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    
    // 현재 선택된 테마 ID 가져오기
    const currentThemeId = themeRegistry.getCurrentThemeId()
    const url = currentThemeId 
      ? `/theme-editor?theme=${encodeURIComponent(currentThemeId)}`
      : '/theme-editor'
    
    window.open(
      url,
      'theme-editor',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    )
  }
  
  // 테마 에디터에서 메시지 받기
  useEffect(() => {
    const handleThemeMessage = (data: unknown) => {
      const message = data as { type: string; theme?: ThemeConfig }
    if (message.type === 'APPLY_THEME' && message.theme) {
        const theme = message.theme
        
        // 테마 적용 (현재 다크 모드 상태 반영) - 임시 적용만
        applyTheme(theme)
        themeRegistry.registerTheme(theme)
        themeRegistry.activateTheme(theme.id)
        
        // localStorage 저장 제거 - 임시 적용만 지원
        
        // 강제로 다크모드 클래스 재적용하여 스타일 갱신
        const isDark = document.documentElement.classList.contains('dark')
        if (isDark) {
          document.documentElement.classList.remove('dark')
          setTimeout(() => {
            document.documentElement.classList.add('dark')
          }, 0)
        }
      } else if (message.type === 'RESET_THEME') {
        resetTheme()
      }
    }
    
    // 1. window.postMessage 리스너
    const handleMessage = (event: MessageEvent) => {
      handleThemeMessage(event.data)
    }
    
    // 2. BroadcastChannel 리스너
    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel('theme-editor-channel')
      channel.onmessage = (event) => {
        handleThemeMessage(event.data)
      }
    } catch {
      // BroadcastChannel not supported
    }
    
    window.addEventListener('message', handleMessage)
    
    return () => {
      window.removeEventListener('message', handleMessage)
      if (channel) {
        channel.close()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col sm:flex-row sm:h-14 items-start sm:items-center justify-between py-3 sm:py-0 gap-3 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                P
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">PROST SPV</h1>
                <p className="text-xs text-muted-foreground -mt-1">Static Proto View</p>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border" />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backoffice">Backoffice</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ThemeToggleButton />
            <ThemeSelector 
              scopeFilter={activeTab === 'frontend' ? 'frontend' : activeTab === 'backoffice' ? 'backoffice' : 'all'}
            />
            
            {/* Frontend 전용 버튼들 */}
            {activeTab === 'frontend' && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    frontendSectionRef.current?.toggleAll()
                    setAllExpanded(!allExpanded)
                  }}
                  className="h-8 w-8"
                  title={allExpanded ? "모두 접기" : "모두 펼치기"}
                >
                  {allExpanded ? (
                    <HiViewColumns className="h-4 w-4" />
                  ) : (
                    <HiSquares2X2 className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (frontendSectionRef.current) {
                      setCategories(frontendSectionRef.current.getCategories())
                    }
                    setShowCategoryManager(true)
                  }}
                  className="h-8 w-8"
                  title="카테고리 관리"
                >
                  <HiAdjustmentsHorizontal className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {/* 테마 에디터 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openThemeEditor}
              className="h-8 w-8"
              title="테마 에디터"
            >
              <HiSwatch className="h-4 w-4" />
            </Button>
            
            {/* 더보기 드롭다운 메뉴 (숨김 처리, 나중에 사용 가능) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hidden"
                  title="더보기"
                >
                  <HiEllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {/* 나중에 필요한 메뉴 항목들 추가 가능 */}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* 카테고리 관리자 다이얼로그 */}
            <CategoryManagerDialog
              categories={categories}
              onCategoriesChange={(newCategories) => {
                frontendSectionRef.current?.updateCategories(newCategories)
              }}
              onReset={() => {
                if (frontendSectionRef.current) {
                  frontendSectionRef.current.resetCategories()
                  setCategories(frontendSectionRef.current.getCategories())
                }
              }}
              open={showCategoryManager}
              onOpenChange={setShowCategoryManager}
            />
          </div>
        </div>
      </div>

      <main className="w-full">
        {activeTab === 'frontend' ? (
          <FrontendSection ref={frontendSectionRef} />
        ) : (
          <BackofficeSection />
        )}
      </main>
    </div>
  )
}