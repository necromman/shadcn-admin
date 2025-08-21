import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColorPicker } from './color-picker'
import { ExportDialog } from './export-dialog'
import { type ThemeConfig, type ColorScheme } from '../core/types'
import { applyTheme, getContrastColor, getCurrentThemeColors } from '../core/theme-utils'
import { themeRegistry } from '../core/theme-registry'
import { defaultTheme } from '../presets/default'
import { Palette, Download, RotateCcw, RefreshCw, Save, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ThemeProvider } from '@/context/theme-provider'

// 주요 색상만 편집 가능하도록 제한
const editableColors = [
  { key: 'primary', label: 'Primary', description: '주요 액션 버튼, 링크' },
  { key: 'secondary', label: 'Secondary', description: '보조 액션, 배경' },
  { key: 'accent', label: 'Accent', description: '강조 요소, 호버 상태' },
  { key: 'destructive', label: 'Destructive', description: '삭제, 에러, 경고' },
  { key: 'background', label: 'Background', description: '페이지 배경색' },
  { key: 'foreground', label: 'Foreground', description: '기본 텍스트 색상' },
  { key: 'muted', label: 'Muted', description: '비활성 상태, 보조 텍스트' },
  { key: 'border', label: 'Border', description: '테두리, 구분선' },
  { key: 'input', label: 'Input', description: '입력 필드 배경색' },
]

export function ThemeEditorWindow() {
  const [themeName, setThemeName] = useState('custom-theme')
  const [themeDescription, setThemeDescription] = useState('')
  const [themeAuthor, setThemeAuthor] = useState('')
  const [lightColors, setLightColors] = useState<ColorScheme>(defaultTheme.colors.light)
  const [darkColors, setDarkColors] = useState<ColorScheme>(defaultTheme.colors.dark)
  const [savedLightColors, setSavedLightColors] = useState<ColorScheme>(defaultTheme.colors.light)
  const [savedDarkColors, setSavedDarkColors] = useState<ColorScheme>(defaultTheme.colors.dark)
  const [showExport, setShowExport] = useState(false)
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light')
  const [editingTab, setEditingTab] = useState<'info' | 'light' | 'dark'>('info')

  // 초기 로드 시 현재 적용된 색상 불러오기
  useEffect(() => {
    const { light, dark } = getCurrentThemeColors()
    if (Object.keys(light).length > 0) {
      setLightColors(prev => ({ ...prev, ...light }))
      setSavedLightColors(prev => ({ ...prev, ...light }))
    }
    if (Object.keys(dark).length > 0) {
      setDarkColors(prev => ({ ...prev, ...dark }))
      setSavedDarkColors(prev => ({ ...prev, ...dark }))
    }
  }, [])
  
  // 테마 이름 입력 처리 (영어, 숫자, 하이픈만 허용)
  const handleThemeNameChange = (value: string) => {
    // 영어, 숫자, 하이픈, 언더스코어만 허용
    const sanitized = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-_]/g, '')
      .replace(/\s+/g, '-') // 공백을 하이픈으로
      .replace(/-+/g, '-') // 중복 하이픈 제거
    setThemeName(sanitized)
  }

  const handleColorChange = (mode: 'light' | 'dark', key: keyof ColorScheme, value: string) => {
    if (mode === 'light') {
      const newColors = { ...lightColors, [key]: value }
      
      // 연관 색상 자동 조정
      if (key === 'background') {
        newColors.foreground = getContrastColor(value)
        newColors.card = value
        newColors.popover = value
      }
      if (key === 'primary') {
        newColors['primary-foreground'] = getContrastColor(value)
      }
      if (key === 'secondary') {
        newColors['secondary-foreground'] = getContrastColor(value)
        newColors['accent-foreground'] = newColors['secondary-foreground']
      }
      if (key === 'accent') {
        newColors['accent-foreground'] = getContrastColor(value)
      }
      if (key === 'destructive') {
        newColors['destructive-foreground'] = getContrastColor(value)
      }
      if (key === 'muted') {
        newColors['muted-foreground'] = getContrastColor(value)
      }
      if (key === 'border') {
        // border 색상 변경 시 input도 같이 변경 (일반적으로 동일)
        if (!editableColors.find(c => c.key === 'input')) {
          newColors.input = value
        }
      }
      
      setLightColors(newColors)
    } else {
      const newColors = { ...darkColors, [key]: value }
      
      // 연관 색상 자동 조정
      if (key === 'background') {
        newColors.foreground = getContrastColor(value)
        newColors.card = value
        newColors.popover = value
      }
      if (key === 'primary') {
        newColors['primary-foreground'] = getContrastColor(value)
      }
      if (key === 'secondary') {
        newColors['secondary-foreground'] = getContrastColor(value)
        newColors['accent-foreground'] = newColors['secondary-foreground']
      }
      if (key === 'accent') {
        newColors['accent-foreground'] = getContrastColor(value)
      }
      if (key === 'destructive') {
        newColors['destructive-foreground'] = getContrastColor(value)
      }
      if (key === 'muted') {
        newColors['muted-foreground'] = getContrastColor(value)
      }
      if (key === 'border') {
        // border 색상 변경 시 input도 같이 변경 (일반적으로 동일)
        if (!editableColors.find(c => c.key === 'input')) {
          newColors.input = value
        }
      }
      
      setDarkColors(newColors)
    }
  }

  const handleApplyTheme = () => {
    const themeConfig: ThemeConfig = {
      id: themeName,
      name: themeName,
      description: themeDescription,
      version: '1.0.0',
      author: themeAuthor,
      colors: {
        light: lightColors,
        dark: darkColors,
      },
    }
    
    applyTheme(themeConfig)
    themeRegistry.registerTheme(themeConfig)
    
    // 저장된 색상 업데이트 ("적용"이 새로운 기준점이 됨)
    setSavedLightColors(lightColors)
    setSavedDarkColors(darkColors)
    
    // 부모 창에도 적용
    if (window.opener) {
      window.opener.postMessage({ 
        type: 'APPLY_THEME', 
        theme: themeConfig 
      }, '*')
    }
  }
  
  // 마지막 저장된 상태로 되돌리기
  const handleRevertChanges = () => {
    setLightColors(savedLightColors)
    setDarkColors(savedDarkColors)
  }

  // 기본 테마로 초기화
  const handleResetToDefault = () => {
    setLightColors(defaultTheme.colors.light)
    setDarkColors(defaultTheme.colors.dark)
    // 미리보기만 변경, 실제 적용은 "적용" 버튼 클릭 시
  }

  const handleExport = () => {
    setShowExport(true)
  }

  // 실시간 미리보기
  useEffect(() => {
    const themeConfig: ThemeConfig = {
      id: 'preview',
      name: 'Preview',
      description: '',
      version: '1.0.0',
      author: '',
      colors: {
        light: lightColors,
        dark: darkColors,
      },
    }
    applyTheme(themeConfig)
  }, [lightColors, darkColors])
  
  // 탭 변경 시 미리보기 모드도 동기화
  useEffect(() => {
    if (editingTab === 'light') {
      setActiveMode('light')
    } else if (editingTab === 'dark') {
      setActiveMode('dark')
    }
  }, [editingTab])
  
  // 전체 앱에 다크 모드 적용
  useEffect(() => {
    const root = document.documentElement
    if (activeMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [activeMode])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <h1 className="text-xl font-semibold">테마 에디터</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRevertChanges}
                title="마지막 적용된 상태로 되돌리기"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                변경 취소
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetToDefault}
                title="shadcn 기본 테마로 초기화"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                기본 테마
              </Button>
              <Button size="sm" onClick={handleApplyTheme}>
                <Save className="h-4 w-4 mr-2" />
                적용
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                내보내기
              </Button>
              {window.opener && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.close()}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
          {/* 에디터 영역 */}
          <Card>
            <CardHeader>
              <CardTitle>색상 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={editingTab} onValueChange={(v) => setEditingTab(v as 'info' | 'light' | 'dark')} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">테마 정보</TabsTrigger>
                  <TabsTrigger value="light">라이트</TabsTrigger>
                  <TabsTrigger value="dark">다크</TabsTrigger>
                </TabsList>

                <div className="mt-4">
                  <TabsContent value="info" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme-name">테마 ID</Label>
                      <Input
                        id="theme-name"
                        value={themeName}
                        onChange={(e) => handleThemeNameChange(e.target.value)}
                        placeholder="예: ocean-blue"
                        pattern="[a-z0-9-]+"
                        className="font-mono lowercase"
                      />
                      <p className="text-xs text-muted-foreground">
                        영문 소문자, 숫자, 하이픈만 사용 가능
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme-description">설명 (선택)</Label>
                      <Textarea
                        id="theme-description"
                        value={themeDescription}
                        onChange={(e) => setThemeDescription(e.target.value)}
                        placeholder="테마에 대한 간단한 설명"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme-author">작성자 (선택)</Label>
                      <Input
                        id="theme-author"
                        value={themeAuthor}
                        onChange={(e) => setThemeAuthor(e.target.value)}
                        placeholder="이름 또는 조직명"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="light" className="space-y-4">
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-4 pr-4">
                        {editableColors.map((color) => (
                          <ColorPicker
                            key={color.key}
                            label={color.label}
                            description={color.description}
                            value={lightColors[color.key as keyof ColorScheme] || ''}
                            onChange={(value) =>
                              handleColorChange('light', color.key as keyof ColorScheme, value)
                            }
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="dark" className="space-y-4">
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-4 pr-4">
                        {editableColors.map((color) => (
                          <ColorPicker
                            key={color.key}
                            label={color.label}
                            description={color.description}
                            value={darkColors[color.key as keyof ColorScheme] || ''}
                            onChange={(value) =>
                              handleColorChange('dark', color.key as keyof ColorScheme, value)
                            }
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* 미리보기 영역 */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>미리보기</CardTitle>
              <span className="text-sm text-muted-foreground">
                {activeMode === 'light' ? '라이트 모드' : '다크 모드'}
              </span>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-background text-foreground p-6 space-y-4">
                  <h3 className="text-2xl font-bold">테마 미리보기</h3>
                  <p className="text-muted-foreground">
                    이곳에서 색상 변경사항을 실시간으로 확인할 수 있습니다.
                  </p>
                  
                  <div className="flex gap-2 flex-wrap">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">카드 제목</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          카드 콘텐츠 영역입니다.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-accent">
                      <CardHeader>
                        <CardTitle className="text-lg text-accent-foreground">
                          액센트 카드
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-accent-foreground/80">
                          액센트 배경 카드입니다.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="preview-input">입력 필드</Label>
                      <Input 
                        id="preview-input" 
                        placeholder="테마가 적용된 입력 필드입니다"
                        className="bg-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preview-select">셀렉트박스</Label>
                      <Select>
                        <SelectTrigger id="preview-select" className="bg-input">
                          <SelectValue placeholder="옵션을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">옵션 1</SelectItem>
                          <SelectItem value="option2">옵션 2</SelectItem>
                          <SelectItem value="option3">옵션 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preview-textarea">텍스트 영역</Label>
                      <Textarea 
                        id="preview-textarea" 
                        placeholder="여러 줄 입력이 가능한 텍스트 영역입니다"
                        className="bg-input resize-none"
                        rows={3}
                      />
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-muted-foreground">Muted 배경 텍스트</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p>Border 스타일 박스</p>
                    </div>
                  </div>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Export 다이얼로그 */}
        <ExportDialog
          open={showExport}
          onOpenChange={setShowExport}
          theme={{
            id: themeName.toLowerCase().replace(/\s+/g, '-'),
            name: themeName,
            description: themeDescription,
            version: '1.0.0',
            author: themeAuthor,
            colors: {
              light: lightColors,
              dark: darkColors,
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}