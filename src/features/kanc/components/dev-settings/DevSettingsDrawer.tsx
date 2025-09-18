import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Settings, Layout, Menu, Eye, Code, RefreshCw } from 'lucide-react'

export interface DevSettings {
  // 네비게이션 설정
  navigation: {
    style: 'default' | 'mega-menu'
    sticky: boolean
    transparentOnScroll: boolean
    showPreHeader: boolean
  }
  // 레이아웃 설정
  layout: {
    containerWidth: 'full' | 'wide' | 'narrow'
    spacing: 'compact' | 'normal' | 'comfortable'
  }
  // 개발자 모드
  developer: {
    showDevInfo: boolean
    showGrid: boolean
    showBoundaries: boolean
  }
}

interface DevSettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
  settings: DevSettings
  onSettingsChange: (settings: DevSettings) => void
}

export function DevSettingsDrawer({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}: DevSettingsDrawerProps) {
  const [localSettings, setLocalSettings] = useState<DevSettings>(settings)

  const handleChange = (category: keyof DevSettings, key: string, value: any) => {
    const newSettings = {
      ...localSettings,
      [category]: {
        ...localSettings[category],
        [key]: value
      }
    }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const resetSettings = () => {
    const defaultSettings: DevSettings = {
      navigation: {
        style: 'mega-menu',
        sticky: true,
        transparentOnScroll: true,
        showPreHeader: true
      },
      layout: {
        containerWidth: 'wide',
        spacing: 'normal'
      },
      developer: {
        showDevInfo: false,
        showGrid: false,
        showBoundaries: false
      }
    }
    setLocalSettings(defaultSettings)
    onSettingsChange(defaultSettings)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            개발자 설정
          </SheetTitle>
          <SheetDescription>
            개발 및 테스트를 위한 UI 설정을 조정할 수 있습니다.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="navigation" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="navigation">
              <Menu className="h-4 w-4 mr-1" />
              네비게이션
            </TabsTrigger>
            <TabsTrigger value="layout">
              <Layout className="h-4 w-4 mr-1" />
              레이아웃
            </TabsTrigger>
            <TabsTrigger value="developer">
              <Code className="h-4 w-4 mr-1" />
              개발자
            </TabsTrigger>
          </TabsList>

          <TabsContent value="navigation" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">네비게이션 스타일</CardTitle>
                <CardDescription>헤더 네비게이션 표시 방식을 선택합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nav-style">스타일</Label>
                  <Select
                    value={localSettings.navigation.style}
                    onValueChange={(value) => handleChange('navigation', 'style', value)}
                  >
                    <SelectTrigger id="nav-style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">기본 (개별 드롭다운)</SelectItem>
                      <SelectItem value="mega-menu">메가 메뉴 (전체 표시)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sticky">고정 네비게이션</Label>
                      <p className="text-xs text-muted-foreground">
                        스크롤 시 상단에 고정
                      </p>
                    </div>
                    <Switch
                      id="sticky"
                      checked={localSettings.navigation.sticky}
                      onCheckedChange={(checked) => handleChange('navigation', 'sticky', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <p className="text-xs text-muted-foreground">
                        스크롤 시 배경 투명도 적용
                      </p>
                    </div>
                    <Switch
                      id="transparent"
                      checked={localSettings.navigation.transparentOnScroll}
                      onCheckedChange={(checked) => handleChange('navigation', 'transparentOnScroll', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pre-header">프리헤더 표시</Label>
                      <p className="text-xs text-muted-foreground">
                        상단 프리헤더 영역 표시
                      </p>
                    </div>
                    <Switch
                      id="pre-header"
                      checked={localSettings.navigation.showPreHeader}
                      onCheckedChange={(checked) => handleChange('navigation', 'showPreHeader', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">레이아웃 설정</CardTitle>
                <CardDescription>전체 레이아웃 옵션을 조정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="container-width">컨테이너 너비</Label>
                  <Select
                    value={localSettings.layout.containerWidth}
                    onValueChange={(value) => handleChange('layout', 'containerWidth', value)}
                  >
                    <SelectTrigger id="container-width">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">전체 너비</SelectItem>
                      <SelectItem value="wide">넓게 (1536px)</SelectItem>
                      <SelectItem value="narrow">좁게 (1280px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spacing">여백 크기</Label>
                  <Select
                    value={localSettings.layout.spacing}
                    onValueChange={(value) => handleChange('layout', 'spacing', value)}
                  >
                    <SelectTrigger id="spacing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">좁게</SelectItem>
                      <SelectItem value="normal">보통</SelectItem>
                      <SelectItem value="comfortable">넓게</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="developer" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">개발자 도구</CardTitle>
                <CardDescription>디버깅 및 개발에 도움이 되는 도구들</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dev-info">개발 정보 표시</Label>
                    <p className="text-xs text-muted-foreground">
                      컴포넌트 이름, 상태 등 표시
                    </p>
                  </div>
                  <Switch
                    id="dev-info"
                    checked={localSettings.developer.showDevInfo}
                    onCheckedChange={(checked) => handleChange('developer', 'showDevInfo', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="grid">그리드 표시</Label>
                    <p className="text-xs text-muted-foreground">
                      레이아웃 그리드 오버레이
                    </p>
                  </div>
                  <Switch
                    id="grid"
                    checked={localSettings.developer.showGrid}
                    onCheckedChange={(checked) => handleChange('developer', 'showGrid', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="boundaries">경계선 표시</Label>
                    <p className="text-xs text-muted-foreground">
                      컴포넌트 경계선 표시
                    </p>
                  </div>
                  <Switch
                    id="boundaries"
                    checked={localSettings.developer.showBoundaries}
                    onCheckedChange={(checked) => handleChange('developer', 'showBoundaries', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 pt-4">
              <Badge variant="secondary" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                단축키: Ctrl+Shift+D
              </Badge>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end gap-2">
          <Button variant="outline" onClick={resetSettings}>
            <RefreshCw className="h-4 w-4 mr-1" />
            초기화
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}