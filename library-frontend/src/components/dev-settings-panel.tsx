import React, { useState } from 'react'
import { Settings, RotateCcw, ChevronDown, ChevronUp, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useDevSettings } from '@/context/dev-settings-provider'

// ========================================
// 토글 버튼 컴포넌트 (항상 표시)
// ========================================
export function DevSettingsToggleButton() {
  const { setSettingsOpen } = useDevSettings()
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 shadow-lg hover:shadow-xl transition-all duration-200"
      onClick={() => setSettingsOpen(true)}
    >
      <Settings className="h-4 w-4 mr-2" />
      개발자 설정
    </Button>
  )
}

// ========================================
// 플로팅 버튼 컴포넌트
// ========================================
export function DevSettingsFloatingButton() {
  const { isDeveloperMode, setSettingsOpen } = useDevSettings()
  
  // Ctrl+Shift+D 단축키로 설정 패널 열기
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setSettingsOpen(true)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSettingsOpen])

  if (!isDeveloperMode) return null

  return (
    <Button
      size="icon"
      className="fixed left-4 top-24 z-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
      onClick={() => setSettingsOpen(true)}
      title="개발자 설정 (Ctrl+Shift+D)"
    >
      <Settings className="h-4 w-4" />
    </Button>
  )
}

// ========================================
// 설정 섹션 컴포넌트
// ========================================
interface SettingSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function SettingSection({ title, description, children, defaultOpen = true }: SettingSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-0 hover:bg-transparent"
        >
          <div className="text-left">
            <h3 className="font-semibold">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 pb-6 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

// ========================================
// 메인 설정 패널 컴포넌트
// ========================================
export function DevSettingsPanel() {
  const {
    settings,
    updateSettings,
    resetSettings,
    isDeveloperMode,
    setDeveloperMode,
    isSettingsOpen,
    setSettingsOpen,
  } = useDevSettings()

  return (
    <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <SheetContent side="left" className="w-full sm:w-[480px] p-0">
        <SheetHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              <SheetTitle>개발자 설정</SheetTitle>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="dev-mode" className="text-sm">개발자 모드</Label>
              <Switch
                id="dev-mode"
                checked={isDeveloperMode}
                onCheckedChange={setDeveloperMode}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            단축키: Ctrl+Shift+D | 개발자 모드를 끄면 왼쪽 플로팅 버튼이 숨겨집니다
          </p>
        </SheetHeader>

        <Tabs defaultValue="header" className="h-[calc(100vh-5rem)]">
          <TabsList className="grid w-full grid-cols-4 p-1">
            <TabsTrigger value="header">헤더</TabsTrigger>
            <TabsTrigger value="hero">히어로</TabsTrigger>
            <TabsTrigger value="footer">푸터</TabsTrigger>
            <TabsTrigger value="general">일반</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100%-3rem)]">
            {/* 헤더 설정 */}
            <TabsContent value="header" className="px-6 py-4 space-y-6">
              <SettingSection title="표시 요소" description="헤더에 표시할 요소를 선택하세요">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-top-notice">상단 공지 표시</Label>
                    <Checkbox
                      id="show-top-notice"
                      checked={settings.header.showTopNotice}
                      onCheckedChange={(checked) =>
                        updateSettings('header', { showTopNotice: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-search">검색바 표시</Label>
                    <Checkbox
                      id="show-search"
                      checked={settings.header.showSearchBar}
                      onCheckedChange={(checked) =>
                        updateSettings('header', { showSearchBar: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-notifications">알림 아이콘 표시</Label>
                    <Checkbox
                      id="show-notifications"
                      checked={settings.header.showNotifications}
                      onCheckedChange={(checked) =>
                        updateSettings('header', { showNotifications: checked as boolean })
                      }
                    />
                  </div>
                </div>
              </SettingSection>

              <Separator />

              <SettingSection title="네비게이션 동작" description="메뉴 동작 방식을 설정하세요">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-blur">드롭다운 배경 블러</Label>
                    <Checkbox
                      id="enable-blur"
                      checked={settings.header.enableBlur}
                      onCheckedChange={(checked) =>
                        updateSettings('header', { enableBlur: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-all-menus">메가 메뉴 모드</Label>
                    <Checkbox
                      id="show-all-menus"
                      checked={settings.header.showAllMenus}
                      onCheckedChange={(checked) =>
                        updateSettings('header', { showAllMenus: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hover-enabled">마우스오버 활성화</Label>
                    <Checkbox
                      id="hover-enabled"
                      checked={settings.header.hoverEnabled}
                      onCheckedChange={(checked) =>
                        updateSettings('header', { hoverEnabled: checked as boolean })
                      }
                    />
                  </div>
                </div>
              </SettingSection>

              <Separator />

              <SettingSection title="헤더 스타일" description="헤더 위치 동작을 선택하세요">
                <RadioGroup
                  value={settings.header.headerStyle}
                  onValueChange={(value) =>
                    updateSettings('header', { headerStyle: value as 'sticky' | 'fixed' | 'static' })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sticky" id="sticky" />
                    <Label htmlFor="sticky">Sticky (스크롤시 상단 고정)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed (항상 고정)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="static" id="static" />
                    <Label htmlFor="static">Static (일반 흐름)</Label>
                  </div>
                </RadioGroup>
              </SettingSection>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => resetSettings('header')}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                헤더 설정 초기화
              </Button>
            </TabsContent>

            {/* 히어로 설정 */}
            <TabsContent value="hero" className="px-6 py-4 space-y-6">
              <SettingSection title="배너 설정" description="히어로 배너 표시 옵션">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-banner">배너 표시</Label>
                    <Checkbox
                      id="show-banner"
                      checked={settings.hero.showBanner}
                      onCheckedChange={(checked) =>
                        updateSettings('hero', { showBanner: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-play">자동 재생</Label>
                    <Checkbox
                      id="auto-play"
                      checked={settings.hero.autoPlay}
                      onCheckedChange={(checked) =>
                        updateSettings('hero', { autoPlay: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-indicators">인디케이터 표시</Label>
                    <Checkbox
                      id="show-indicators"
                      checked={settings.hero.showIndicators}
                      onCheckedChange={(checked) =>
                        updateSettings('hero', { showIndicators: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-arrows">화살표 표시</Label>
                    <Checkbox
                      id="show-arrows"
                      checked={settings.hero.showArrows}
                      onCheckedChange={(checked) =>
                        updateSettings('hero', { showArrows: checked as boolean })
                      }
                    />
                  </div>
                </div>
              </SettingSection>

              <Separator />

              <SettingSection title="슬라이드 간격" description="자동 재생 간격 설정">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>간격: {settings.hero.slideInterval / 1000}초</Label>
                  </div>
                  <Slider
                    value={[settings.hero.slideInterval]}
                    onValueChange={(value) =>
                      updateSettings('hero', { slideInterval: value[0] })
                    }
                    min={2000}
                    max={10000}
                    step={1000}
                    className="w-full"
                  />
                </div>
              </SettingSection>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => resetSettings('hero')}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                히어로 설정 초기화
              </Button>
            </TabsContent>

            {/* 푸터 설정 */}
            <TabsContent value="footer" className="px-6 py-4 space-y-6">
              <SettingSection title="푸터 섹션" description="푸터에 표시할 섹션 선택">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-info">도서관 정보</Label>
                    <Checkbox
                      id="footer-info"
                      checked={settings.footer.showInfo}
                      onCheckedChange={(checked) =>
                        updateSettings('footer', { showInfo: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-quick-links">빠른 링크</Label>
                    <Checkbox
                      id="footer-quick-links"
                      checked={settings.footer.showQuickLinks}
                      onCheckedChange={(checked) =>
                        updateSettings('footer', { showQuickLinks: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-contact">연락처</Label>
                    <Checkbox
                      id="footer-contact"
                      checked={settings.footer.showContact}
                      onCheckedChange={(checked) =>
                        updateSettings('footer', { showContact: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-social">소셜 미디어</Label>
                    <Checkbox
                      id="footer-social"
                      checked={settings.footer.showSocial}
                      onCheckedChange={(checked) =>
                        updateSettings('footer', { showSocial: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-newsletter">뉴스레터</Label>
                    <Checkbox
                      id="footer-newsletter"
                      checked={settings.footer.showNewsletter}
                      onCheckedChange={(checked) =>
                        updateSettings('footer', { showNewsletter: checked as boolean })
                      }
                    />
                  </div>
                </div>
              </SettingSection>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => resetSettings('footer')}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                푸터 설정 초기화
              </Button>
            </TabsContent>

            {/* 일반 설정 */}
            <TabsContent value="general" className="px-6 py-4 space-y-6">
              <SettingSection title="개발 옵션" description="개발 관련 설정">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-animations">애니메이션 활성화</Label>
                    <Checkbox
                      id="enable-animations"
                      checked={settings.general.enableAnimations}
                      onCheckedChange={(checked) =>
                        updateSettings('general', { enableAnimations: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-debug">디버그 정보 표시</Label>
                    <Checkbox
                      id="show-debug"
                      checked={settings.general.showDebugInfo}
                      onCheckedChange={(checked) =>
                        updateSettings('general', { showDebugInfo: checked as boolean })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="use-mock">모의 데이터 사용</Label>
                    <Checkbox
                      id="use-mock"
                      checked={settings.general.useMockData}
                      onCheckedChange={(checked) =>
                        updateSettings('general', { useMockData: checked as boolean })
                      }
                    />
                  </div>
                </div>
              </SettingSection>

              <Separator />

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => resetSettings('general')}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  일반 설정 초기화
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => resetSettings()}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  모든 설정 초기화
                </Button>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}