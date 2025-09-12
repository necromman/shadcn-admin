import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { HiArrowPath, HiInformationCircle } from 'react-icons/hi2'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'

export function DevSettingsPanel() {
  const { settings, updateSettings, resetSettings, isSettingsOpen, setSettingsOpen } = useMoafabDevSettings()

  return (
    <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            개발자 설정
            <Badge variant="outline">Ctrl+Shift+D</Badge>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">일반</TabsTrigger>
              <TabsTrigger value="carousel">캐러셀</TabsTrigger>
              <TabsTrigger value="search">검색</TabsTrigger>
              <TabsTrigger value="notice">공지</TabsTrigger>
              <TabsTrigger value="layout">레이아웃</TabsTrigger>
            </TabsList>

            {/* 일반 설정 */}
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dev-mode">개발자 모드</Label>
                  <Switch
                    id="dev-mode"
                    checked={settings.isDeveloperMode}
                    onCheckedChange={(checked) => updateSettings({ isDeveloperMode: checked })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  개발자 모드를 활성화하면 추가 디버깅 정보가 표시됩니다
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">테마</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value: 'light' | 'dark' | 'system') => 
                    updateSettings({ theme: value })
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">라이트</SelectItem>
                    <SelectItem value="dark">다크</SelectItem>
                    <SelectItem value="system">시스템</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">언어</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value: 'ko' | 'en') => 
                    updateSettings({ language: value })
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* 캐러셀 설정 */}
            <TabsContent value="carousel" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-play">자동 재생</Label>
                  <Switch
                    id="auto-play"
                    checked={settings.carousel.autoPlay}
                    onCheckedChange={(checked) => 
                      updateSettings({ carousel: { ...settings.carousel, autoPlay: checked } })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">재생 간격 ({settings.carousel.interval}ms)</Label>
                <Slider
                  id="interval"
                  min={3000}
                  max={10000}
                  step={1000}
                  value={[settings.carousel.interval]}
                  onValueChange={([value]) => 
                    updateSettings({ carousel: { ...settings.carousel, interval: value } })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-indicators">인디케이터 표시</Label>
                  <Switch
                    id="show-indicators"
                    checked={settings.carousel.showIndicators}
                    onCheckedChange={(checked) => 
                      updateSettings({ carousel: { ...settings.carousel, showIndicators: checked } })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-navigation">네비게이션 표시</Label>
                  <Switch
                    id="show-navigation"
                    checked={settings.carousel.showNavigation}
                    onCheckedChange={(checked) => 
                      updateSettings({ carousel: { ...settings.carousel, showNavigation: checked } })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pause-hover">호버 시 일시정지</Label>
                  <Switch
                    id="pause-hover"
                    checked={settings.carousel.pauseOnHover}
                    onCheckedChange={(checked) => 
                      updateSettings({ carousel: { ...settings.carousel, pauseOnHover: checked } })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* 검색 설정 */}
            <TabsContent value="search" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="debounce">검색 지연 시간 ({settings.search.searchDebounce}ms)</Label>
                <Slider
                  id="debounce"
                  min={100}
                  max={1000}
                  step={100}
                  value={[settings.search.searchDebounce]}
                  onValueChange={([value]) => 
                    updateSettings({ search: { ...settings.search, searchDebounce: value } })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-count">결과 개수 표시</Label>
                  <Switch
                    id="show-count"
                    checked={settings.search.showResultCount}
                    onCheckedChange={(checked) => 
                      updateSettings({ search: { ...settings.search, showResultCount: checked } })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="result-layout">결과 레이아웃</Label>
                <Select
                  value={settings.search.resultLayout}
                  onValueChange={(value: 'grid' | 'list') => 
                    updateSettings({ search: { ...settings.search, resultLayout: value } })
                  }
                >
                  <SelectTrigger id="result-layout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">그리드</SelectItem>
                    <SelectItem value="list">리스트</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* 공지사항 설정 */}
            <TabsContent value="notice" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="items-per-tab">탭당 항목 수 ({settings.notice.itemsPerTab})</Label>
                <Slider
                  id="items-per-tab"
                  min={3}
                  max={10}
                  step={1}
                  value={[settings.notice.itemsPerTab]}
                  onValueChange={([value]) => 
                    updateSettings({ notice: { ...settings.notice, itemsPerTab: value } })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-date">날짜 표시</Label>
                  <Switch
                    id="show-date"
                    checked={settings.notice.showDate}
                    onCheckedChange={(checked) => 
                      updateSettings({ notice: { ...settings.notice, showDate: checked } })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-badge">배지 표시</Label>
                  <Switch
                    id="show-badge"
                    checked={settings.notice.showBadge}
                    onCheckedChange={(checked) => 
                      updateSettings({ notice: { ...settings.notice, showBadge: checked } })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* 레이아웃 설정 */}
            <TabsContent value="layout" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="container-width">컨테이너 너비</Label>
                <Select
                  value={settings.layout.containerWidth}
                  onValueChange={(value: 'full' | 'wide' | 'narrow') => 
                    updateSettings({ layout: { ...settings.layout, containerWidth: value } })
                  }
                >
                  <SelectTrigger id="container-width">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">전체</SelectItem>
                    <SelectItem value="wide">넓게</SelectItem>
                    <SelectItem value="narrow">좁게</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-pre-header">Pre-Header 표시</Label>
                  <Switch
                    id="show-pre-header"
                    checked={settings.layout.showPreHeader}
                    onCheckedChange={(checked) => 
                      updateSettings({ layout: { ...settings.layout, showPreHeader: checked } })
                    }
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Alert className="mt-6">
            <HiInformationCircle className="h-4 w-4" />
            <AlertDescription>
              설정은 로컬 스토리지에 저장되며 브라우저를 새로고침해도 유지됩니다.
            </AlertDescription>
          </Alert>

          <div className="mt-6 flex justify-end">
            <Button onClick={resetSettings} variant="outline">
              <HiArrowPath className="mr-2 h-4 w-4" />
              초기화
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}