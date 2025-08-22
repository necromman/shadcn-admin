import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FrontendSection } from '@/features/design-system/frontend-section'
import { BackofficeSection } from '@/features/design-system/backoffice-section'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { ThemeSelector } from '@/features/design-system/theme/components/theme-selector'
import { Button } from '@/components/ui/button'
import { HiSwatch, HiViewColumns, HiSquares2X2 } from 'react-icons/hi2'
import { applyTheme, resetTheme } from '@/features/design-system/theme/core/theme-utils'
import { type ThemeConfig } from '@/features/design-system/theme/core/types'
import { themeRegistry } from '@/features/design-system/theme/core/theme-registry'
import { defaultTheme } from '@/features/design-system/theme/presets/default'
import { custom_themeTheme } from '@/features/design-system/theme/presets/theme-custom-theme'

export const Route = createFileRoute('/design-system')({
  component: DesignSystemPage,
})

function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('frontend')
  const [allExpanded, setAllExpanded] = useState(false)
  const frontendSectionRef = useRef<{ toggleAll: () => void } | null>(null)
  
  // 컴포넌트 마운트 시 테마 등록 및 초기화
  useEffect(() => {
    // 기본 테마들 등록
    themeRegistry.registerTheme(defaultTheme)
    themeRegistry.registerTheme(custom_themeTheme)
    
    // localStorage에서 커스텀 테마들 로드
    const savedThemes = localStorage.getItem('custom-themes')
    if (savedThemes) {
      try {
        const themes = JSON.parse(savedThemes) as ThemeConfig[]
        themes.forEach(theme => themeRegistry.registerTheme(theme))
      } catch {
        // 파싱 에러 무시
      }
    }
    
    // 저장된 테마가 없고 기본 테마가 있으면 첫 번째 테마 활성화
    const currentThemeId = themeRegistry.getCurrentThemeId()
    if (!currentThemeId) {
      const allThemes = themeRegistry.getAllThemes()
      if (allThemes.length > 0) {
        themeRegistry.activateTheme(allThemes[0].id)
      }
    } else {
      // 저장된 테마가 있으면 다시 적용 (색상 확실히 적용)
      const theme = themeRegistry.getTheme(currentThemeId)
      if (theme) {
        applyTheme(theme)
      }
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
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'APPLY_THEME' && event.data.theme) {
        const theme = event.data.theme as ThemeConfig
        applyTheme(theme)
        themeRegistry.registerTheme(theme)
        
        // localStorage에 커스텀 테마 저장
        const savedThemes = localStorage.getItem('custom-themes')
        let customThemes: ThemeConfig[] = []
        if (savedThemes) {
          try {
            customThemes = JSON.parse(savedThemes)
          } catch {
            // 파싱 에러 무시
          }
        }
        
        const existingIndex = customThemes.findIndex(t => t.id === theme.id)
        if (existingIndex >= 0) {
          customThemes[existingIndex] = theme
        } else {
          customThemes.push(theme)
        }
        
        localStorage.setItem('custom-themes', JSON.stringify(customThemes))
      } else if (event.data.type === 'RESET_THEME') {
        resetTheme()
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                P
              </div>
              <div>
                <h1 className="text-xl font-bold">PROST SPV</h1>
                <p className="text-xs text-muted-foreground -mt-1">Static Proto View</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backoffice">Backoffice</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'frontend' && (
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
            )}
            <ThemeSelector 
              scopeFilter={activeTab === 'frontend' ? 'frontend' : activeTab === 'backoffice' ? 'backoffice' : 'all'}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={openThemeEditor}
              className="gap-2"
            >
              <HiSwatch className="h-4 w-4" />
              테마 에디터
            </Button>
            <ThemeToggleButton />
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