import React, { useState } from 'react'
import { 
  RotateCcw, 
  ChevronDown, 
  Code2,
  Monitor,
  Palette,
  Layout,
  FileText,
  Sparkles,
  Eye,
  Zap,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { cn } from '@/lib/utils'

// ========================================
// 플로팅 버튼 컴포넌트
// ========================================
export function LibraryDevSettingsFloatingButton() {
  const { isDeveloperMode, setSettingsOpen } = useLibraryDevSettings()
  
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
    <div className="fixed left-4 top-24 z-50">
      <Button
        size="icon"
        className="shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
        onClick={() => setSettingsOpen(true)}
        title="개발자 설정 (Ctrl+Shift+D)"
      >
        <Code2 className="h-4 w-4" />
      </Button>
      <div className="absolute -top-1 -right-1">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
    </div>
  )
}

// ========================================
// 설정 섹션 컴포넌트
// ========================================
interface SettingSectionProps {
  title: string
  description?: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
}

function SettingSection({ 
  title, 
  description, 
  icon,
  children, 
  defaultExpanded = true 
}: SettingSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            <div>
              <h4 className="text-sm font-medium">{title}</h4>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 pb-4">
        <div className="mt-3 space-y-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ========================================
// 메인 설정 패널 컴포넌트
// ========================================
export function LibraryDevSettingsPanel() {
  const {
    settings,
    updateSettings,
    resetSettings,
    isDeveloperMode,
    setDeveloperMode,
    isSettingsOpen,
    setSettingsOpen,
  } = useLibraryDevSettings()

  return (
    <>
      {/* 플로팅 버튼 */}
      <LibraryDevSettingsFloatingButton />
      
      {/* 설정 패널 */}
      <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              도서관 개발자 설정
            </SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-6">
              {/* 개발자 모드 토글 */}
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="dev-mode" className="text-base">개발자 모드</Label>
                    <p className="text-xs text-muted-foreground">
                      플로팅 버튼 표시 및 디버그 정보 활성화
                    </p>
                  </div>
                </div>
                <Switch
                  id="dev-mode"
                  checked={isDeveloperMode}
                  onCheckedChange={setDeveloperMode}
                />
              </div>
              
              <Tabs defaultValue="preheader" className="w-full">
                <TabsList className="grid w-full grid-cols-3 p-1 h-auto gap-1">
                  <TabsTrigger value="preheader" className="text-xs py-2">프리헤더</TabsTrigger>
                  <TabsTrigger value="header" className="text-xs py-2">헤더</TabsTrigger>
                  <TabsTrigger value="carousel" className="text-xs py-2">캐러셀</TabsTrigger>
                  <TabsTrigger value="hero" className="text-xs py-2">히어로</TabsTrigger>
                  <TabsTrigger value="footer" className="text-xs py-2">푸터</TabsTrigger>
                  <TabsTrigger value="general" className="text-xs py-2">일반</TabsTrigger>
                </TabsList>
                
                {/* 프리헤더 설정 */}
                <TabsContent value="preheader" className="mt-6 space-y-6">
                  <SettingSection 
                    title="프리헤더 표시" 
                    description="상단 공지 바 설정"
                    icon={<Info className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-preheader">프리헤더 표시</Label>
                        <Switch
                          id="show-preheader"
                          checked={settings.preHeader.showTopNotice}
                          onCheckedChange={(checked) => 
                            updateSettings('preHeader', { showTopNotice: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-preheader-button">액션 버튼</Label>
                        <Switch
                          id="show-preheader-button"
                          checked={settings.preHeader.showActionButton}
                          onCheckedChange={(checked) => 
                            updateSettings('preHeader', { showActionButton: checked })
                          }
                        />
                      </div>
                    </div>
                  </SettingSection>
                  
                  <SettingSection 
                    title="프리헤더 스타일" 
                    description="공지 타입 설정"
                    icon={<Palette className="h-4 w-4" />}
                  >
                    <RadioGroup 
                      value={settings.preHeader.noticeType}
                      onValueChange={(value) => 
                        updateSettings('preHeader', { 
                          noticeType: value as 'info' | 'warning' | 'success' | 'error'
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="info" id="info" />
                        <Label htmlFor="info">정보</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="warning" id="warning" />
                        <Label htmlFor="warning">경고</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="success" id="success" />
                        <Label htmlFor="success">성공</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="error" id="error" />
                        <Label htmlFor="error">오류</Label>
                      </div>
                    </RadioGroup>
                  </SettingSection>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => resetSettings('preHeader')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      프리헤더 설정 초기화
                    </Button>
                  </div>
                </TabsContent>

                {/* 헤더 설정 */}
                <TabsContent value="header" className="mt-6 space-y-6">
                  <SettingSection 
                    title="표시 요소" 
                    description="헤더에 표시할 요소를 선택하세요"
                    icon={<Eye className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-search">검색바</Label>
                        <Switch
                          id="show-search"
                          checked={settings.header.showSearchBar}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { showSearchBar: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-notifications">알림 아이콘</Label>
                        <Switch
                          id="show-notifications"
                          checked={settings.header.showNotifications}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { showNotifications: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-user-menu">사용자 메뉴</Label>
                        <Switch
                          id="show-user-menu"
                          checked={settings.header.showUserMenu}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { showUserMenu: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-quick-links">빠른 링크</Label>
                        <Switch
                          id="show-quick-links"
                          checked={settings.header.showQuickLinks}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { showQuickLinks: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hover-enabled">호버 메뉴 활성화</Label>
                        <Switch
                          id="hover-enabled"
                          checked={settings.header.hoverEnabled}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { hoverEnabled: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-all-menus">메가 메뉴 표시</Label>
                        <Switch
                          id="show-all-menus"
                          checked={settings.header.showAllMenus}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { showAllMenus: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enable-blur">백그라운드 블러</Label>
                        <Switch
                          id="enable-blur"
                          checked={settings.header.enableBlur}
                          onCheckedChange={(checked) => 
                            updateSettings('header', { enableBlur: checked })
                          }
                        />
                      </div>
                    </div>
                  </SettingSection>
                  
                  <SettingSection 
                    title="헤더 스타일" 
                    description="헤더 동작 방식을 선택하세요"
                    icon={<Layout className="h-4 w-4" />}
                  >
                    <RadioGroup 
                      value={settings.header.headerStyle}
                      onValueChange={(value) => 
                        updateSettings('header', { 
                          headerStyle: value as 'sticky' | 'fixed' | 'static' 
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sticky" id="sticky" />
                        <Label htmlFor="sticky">Sticky (스크롤 시 고정)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed" id="fixed" />
                        <Label htmlFor="fixed">Fixed (항상 고정)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="static" id="static" />
                        <Label htmlFor="static">Static (고정 안함)</Label>
                      </div>
                    </RadioGroup>
                  </SettingSection>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => resetSettings('header')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      헤더 설정 초기화
                    </Button>
                  </div>
                </TabsContent>
                
                {/* 캐러셀 설정 */}
                <TabsContent value="carousel" className="mt-6 space-y-6">
                  <SettingSection 
                    title="캐러셀 표시 옵션" 
                    description="메인 캐러셀 설정"
                    icon={<Sparkles className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-carousel">캐러셀 표시</Label>
                        <Switch
                          id="show-carousel"
                          checked={settings.carousel.showCarousel}
                          onCheckedChange={(checked) => 
                            updateSettings('carousel', { showCarousel: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="carousel-auto-play">자동 재생</Label>
                        <Switch
                          id="carousel-auto-play"
                          checked={settings.carousel.autoPlay}
                          onCheckedChange={(checked) => 
                            updateSettings('carousel', { autoPlay: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="carousel-indicators">인디케이터 표시</Label>
                        <Switch
                          id="carousel-indicators"
                          checked={settings.carousel.showIndicators}
                          onCheckedChange={(checked) => 
                            updateSettings('carousel', { showIndicators: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="carousel-arrows">화살표 표시</Label>
                        <Switch
                          id="carousel-arrows"
                          checked={settings.carousel.showArrows}
                          onCheckedChange={(checked) => 
                            updateSettings('carousel', { showArrows: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="carousel-play-pause">재생/일시정지 버튼</Label>
                        <Switch
                          id="carousel-play-pause"
                          checked={settings.carousel.showPlayPause}
                          onCheckedChange={(checked) => 
                            updateSettings('carousel', { showPlayPause: checked })
                          }
                        />
                      </div>
                    </div>
                  </SettingSection>
                  
                  <SettingSection
                    title="캐러셀 높이"
                    description="캐러셀 높이 조절 (300-800px)"
                    icon={<Layout className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>높이: {settings.carousel.height}px</Label>
                        <Badge variant="secondary">{settings.carousel.height}px</Badge>
                      </div>
                      <Slider
                        value={[settings.carousel.height]}
                        onValueChange={(value) => 
                          updateSettings('carousel', { height: value[0] })
                        }
                        min={300}
                        max={800}
                        step={50}
                      />
                    </div>
                  </SettingSection>
                  
                  <SettingSection
                    title="인디케이터 설정"
                    description="인디케이터 스타일 및 위치"
                    icon={<Eye className="h-4 w-4" />}
                  >
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">인디케이터 스타일</Label>
                        <RadioGroup
                          value={settings.carousel.indicatorStyle}
                          onValueChange={(value) =>
                            updateSettings('carousel', { indicatorStyle: value as 'circle' | 'square' })
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="circle" id="circle" />
                            <Label htmlFor="circle">원형</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="square" id="square" />
                            <Label htmlFor="square">사각형</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">인디케이터 위치</Label>
                        <RadioGroup
                          value={settings.carousel.indicatorPosition}
                          onValueChange={(value) =>
                            updateSettings('carousel', { indicatorPosition: value as 'inside' | 'outside' })
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inside" id="inside" />
                            <Label htmlFor="inside">내부</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outside" id="outside" />
                            <Label htmlFor="outside">외부</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">인디케이터 패딩</Label>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">데스크톱: {settings.carousel.indicatorPaddingDesktop}px</Label>
                              <Badge variant="secondary">{settings.carousel.indicatorPaddingDesktop}px</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.indicatorPaddingDesktop]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { indicatorPaddingDesktop: value[0] })
                              }
                              min={0}
                              max={300}
                              step={5}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">모바일: {settings.carousel.indicatorPaddingMobile}px</Label>
                              <Badge variant="secondary">{settings.carousel.indicatorPaddingMobile}px</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.indicatorPaddingMobile]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { indicatorPaddingMobile: value[0] })
                              }
                              min={0}
                              max={100}
                              step={5}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SettingSection>
                  
                  <SettingSection
                    title="네비게이션 버튼"
                    description="좌우 화살표 버튼 설정"
                    icon={<ChevronDown className="h-4 w-4 rotate-90" />}
                  >
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">버튼 크기</Label>
                        <RadioGroup
                          value={settings.carousel.navigationSize}
                          onValueChange={(value) =>
                            updateSettings('carousel', { navigationSize: value as 'small' | 'medium' | 'large' | 'custom' })
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="small" id="small" />
                            <Label htmlFor="small">작게 (버튼: 32px, 아이콘: 16px)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">보통 (버튼: 48px, 아이콘: 24px)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="large" id="large" />
                            <Label htmlFor="large">크게 (버튼: 64px, 아이콘: 32px)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom">커스텀</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {settings.carousel.navigationSize === 'custom' && (
                        <div className="space-y-3 pl-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">버튼 크기: {settings.carousel.customButtonSize}px</Label>
                              <Badge variant="secondary">{settings.carousel.customButtonSize}px</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.customButtonSize]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { customButtonSize: value[0] })
                              }
                              min={24}
                              max={96}
                              step={4}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">아이콘 크기: {settings.carousel.customIconSize}px</Label>
                              <Badge variant="secondary">{settings.carousel.customIconSize}px</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.customIconSize]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { customIconSize: value[0] })
                              }
                              min={12}
                              max={48}
                              step={2}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <Label className="mb-2 block">버튼 위치</Label>
                        <RadioGroup
                          value={settings.carousel.navigationPosition}
                          onValueChange={(value) =>
                            updateSettings('carousel', { navigationPosition: value as 'safe' | 'edge' | 'custom' })
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="safe" id="safe" />
                            <Label htmlFor="safe">안전 영역 (좌우 80px)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="edge" id="edge" />
                            <Label htmlFor="edge">가장자리 (좌우 40px)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="nav-custom" />
                            <Label htmlFor="nav-custom">커스텀</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {settings.carousel.navigationPosition === 'custom' && (
                        <div className="space-y-3 pl-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">버튼 기준점: {settings.carousel.buttonBasePercent}%</Label>
                              <Badge variant="secondary">{settings.carousel.buttonBasePercent}%</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.buttonBasePercent]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { buttonBasePercent: value[0] })
                              }
                              min={0}
                              max={100}
                              step={1}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">좌측 버튼 위치: {settings.carousel.buttonLeftPosition}px</Label>
                              <Badge variant="secondary">{settings.carousel.buttonLeftPosition}px</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.buttonLeftPosition]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { buttonLeftPosition: value[0] })
                              }
                              min={0}
                              max={200}
                              step={5}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">우측 버튼 위치: {settings.carousel.buttonRightPosition}px</Label>
                              <Badge variant="secondary">{settings.carousel.buttonRightPosition}px</Badge>
                            </div>
                            <Slider
                              value={[settings.carousel.buttonRightPosition]}
                              onValueChange={(value) =>
                                updateSettings('carousel', { buttonRightPosition: value[0] })
                              }
                              min={0}
                              max={200}
                              step={5}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </SettingSection>
                  
                  <SettingSection 
                    title="캐러셀 타이밍" 
                    description="슬라이드 전환 설정"
                    icon={<Zap className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>슬라이드 간격: {settings.carousel.slideInterval / 1000}초</Label>
                        <Badge variant="secondary">
                          {settings.carousel.slideInterval}ms
                        </Badge>
                      </div>
                      <Slider
                        value={[settings.carousel.slideInterval]}
                        onValueChange={(value) => 
                          updateSettings('carousel', { slideInterval: value[0] })
                        }
                        min={2000}
                        max={10000}
                        step={500}
                      />
                      <div className="flex items-center justify-between">
                        <Label>전환 애니메이션: {settings.carousel.transitionDuration}ms</Label>
                        <Badge variant="secondary">
                          {settings.carousel.transitionDuration}ms
                        </Badge>
                      </div>
                      <Slider
                        value={[settings.carousel.transitionDuration]}
                        onValueChange={(value) => 
                          updateSettings('carousel', { transitionDuration: value[0] })
                        }
                        min={200}
                        max={1500}
                        step={100}
                      />
                    </div>
                  </SettingSection>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => resetSettings('carousel')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      캐러셀 설정 초기화
                    </Button>
                  </div>
                </TabsContent>
                
                {/* 히어로 설정 */}
                <TabsContent value="hero" className="mt-6 space-y-6">
                  <SettingSection 
                    title="배너 옵션" 
                    description="메인 배너 표시 옵션"
                    icon={<Sparkles className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-banner">배너 표시</Label>
                        <Switch
                          id="show-banner"
                          checked={settings.hero.showBanner}
                          onCheckedChange={(checked) => 
                            updateSettings('hero', { showBanner: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-play">자동 재생</Label>
                        <Switch
                          id="auto-play"
                          checked={settings.hero.autoPlay}
                          onCheckedChange={(checked) => 
                            updateSettings('hero', { autoPlay: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-indicators">인디케이터 표시</Label>
                        <Switch
                          id="show-indicators"
                          checked={settings.hero.showIndicators}
                          onCheckedChange={(checked) => 
                            updateSettings('hero', { showIndicators: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-arrows">화살표 표시</Label>
                        <Switch
                          id="show-arrows"
                          checked={settings.hero.showArrows}
                          onCheckedChange={(checked) => 
                            updateSettings('hero', { showArrows: checked })
                          }
                        />
                      </div>
                    </div>
                  </SettingSection>
                  
                  <SettingSection 
                    title="슬라이드 간격" 
                    description="자동 재생 시 전환 간격"
                    icon={<Zap className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{settings.hero.slideInterval / 1000}초</Label>
                        <Badge variant="secondary">
                          {settings.hero.slideInterval}ms
                        </Badge>
                      </div>
                      <Slider
                        value={[settings.hero.slideInterval]}
                        onValueChange={(value) => 
                          updateSettings('hero', { slideInterval: value[0] })
                        }
                        min={2000}
                        max={10000}
                        step={1000}
                      />
                    </div>
                  </SettingSection>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => resetSettings('hero')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      히어로 설정 초기화
                    </Button>
                  </div>
                </TabsContent>
                
                {/* 푸터 설정 */}
                <TabsContent value="footer" className="mt-6 space-y-6">
                  <SettingSection 
                    title="푸터 섹션" 
                    description="푸터에 표시할 섹션을 선택하세요"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-info">도서관 정보</Label>
                        <Switch
                          id="footer-info"
                          checked={settings.footer.showInfo}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showInfo: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-links">빠른 링크</Label>
                        <Switch
                          id="footer-links"
                          checked={settings.footer.showQuickLinks}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showQuickLinks: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-contact">연락처</Label>
                        <Switch
                          id="footer-contact"
                          checked={settings.footer.showContact}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showContact: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-social">소셜 미디어</Label>
                        <Switch
                          id="footer-social"
                          checked={settings.footer.showSocial}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showSocial: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-related-sites">관련 사이트</Label>
                        <Switch
                          id="footer-related-sites"
                          checked={settings.footer.showRelatedSites}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showRelatedSites: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-search-links">자료검색 링크</Label>
                        <Switch
                          id="footer-search-links"
                          checked={settings.footer.showSearchLinks}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showSearchLinks: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-newsletter">뉴스레터 구독</Label>
                        <Switch
                          id="footer-newsletter"
                          checked={settings.footer.showNewsletter}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showNewsletter: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="footer-copyright">저작권 표시</Label>
                        <Switch
                          id="footer-copyright"
                          checked={settings.footer.showCopyright}
                          onCheckedChange={(checked) => 
                            updateSettings('footer', { showCopyright: checked })
                          }
                        />
                      </div>
                    </div>
                  </SettingSection>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => resetSettings('footer')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      푸터 설정 초기화
                    </Button>
                  </div>
                </TabsContent>
                
                {/* 일반 설정 */}
                <TabsContent value="general" className="mt-6 space-y-6">
                  <SettingSection 
                    title="일반 설정" 
                    description="전체 사이트 옵션"
                    icon={<Palette className="h-4 w-4" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enable-animations">애니메이션</Label>
                        <Switch
                          id="enable-animations"
                          checked={settings.general.enableAnimations}
                          onCheckedChange={(checked) => 
                            updateSettings('general', { enableAnimations: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-debug">디버그 정보</Label>
                        <Switch
                          id="show-debug"
                          checked={settings.general.showDebugInfo}
                          onCheckedChange={(checked) => 
                            updateSettings('general', { showDebugInfo: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="use-mock">모의 데이터</Label>
                        <Switch
                          id="use-mock"
                          checked={settings.general.useMockData}
                          onCheckedChange={(checked) => 
                            updateSettings('general', { useMockData: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-dev-tools">개발 도구 표시</Label>
                        <Switch
                          id="show-dev-tools"
                          checked={settings.general.showDevTools}
                          onCheckedChange={(checked) => 
                            updateSettings('general', { showDevTools: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="preserve-settings">설정 유지</Label>
                        <Switch
                          id="preserve-settings"
                          checked={settings.general.preserveSettings}
                          onCheckedChange={(checked) => 
                            updateSettings('general', { preserveSettings: checked })
                          }
                        />
                      </div>
                    </div>
                  </SettingSection>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      설정은 브라우저 쿠키에 저장되며 30일간 유지됩니다.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="pt-4 space-y-2">
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
              </Tabs>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}