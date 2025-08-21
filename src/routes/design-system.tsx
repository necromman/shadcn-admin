import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FrontendSection } from '@/features/design-system/frontend-section'
import { BackofficeSection } from '@/features/design-system/backoffice-section'
import { ThemeToggle } from '@/components/theme-toggle'
import { ThemeSelector } from '@/features/design-system/theme/components/theme-selector'
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
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
  
  // 컴포넌트 마운트 시 테마 등록
  useEffect(() => {
    // 기본 테마들 등록
    themeRegistry.registerTheme(defaultTheme)
    themeRegistry.registerTheme(custom_themeTheme)
  }, [])
  
  // 테마 에디터 새 창 열기
  const openThemeEditor = () => {
    const width = 1400
    const height = 800
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    
    window.open(
      '/theme-editor',
      'theme-editor',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    )
  }
  
  // 테마 에디터에서 메시지 받기
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'APPLY_THEME' && event.data.theme) {
        applyTheme(event.data.theme as ThemeConfig)
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
            <ThemeSelector 
              scopeFilter={activeTab === 'frontend' ? 'frontend' : activeTab === 'backoffice' ? 'backoffice' : 'all'}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={openThemeEditor}
              className="gap-2"
            >
              <Palette className="h-4 w-4" />
              테마 에디터
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <main className="w-full">
        {activeTab === 'frontend' ? <FrontendSection /> : <BackofficeSection />}
      </main>

    </div>
  )
}