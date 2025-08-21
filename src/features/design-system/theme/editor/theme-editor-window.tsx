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
import { Palette, Download, RotateCcw, RefreshCw, Save, X, Globe, Building2, Sparkles } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ThemeProvider } from '@/context/theme-provider'
import { custom_themeTheme } from '../presets/theme-custom-theme'

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
  const searchParams = new URLSearchParams(window.location.search)
  const initialThemeId = searchParams.get('theme')
  
  const [selectedThemeId, setSelectedThemeId] = useState(initialThemeId || '')
  const [themeId, setThemeId] = useState('custom-theme')
  const [themeName, setThemeName] = useState('Custom Theme')
  const [themeDescription, setThemeDescription] = useState('')
  const [themeAuthor, setThemeAuthor] = useState('')
  const [themeScope, setThemeScope] = useState<'frontend' | 'backoffice' | 'both'>('both')
  const [lightColors, setLightColors] = useState<ColorScheme>({
    ...defaultTheme.colors.light,
    border: '214.3 31.8% 85%', // 라이트모드에서 더 진한 border
    input: '214.3 31.8% 85%'
  })
  const [darkColors, setDarkColors] = useState<ColorScheme>({
    ...defaultTheme.colors.dark,
    border: '217.2 32.6% 25%', // 다크모드에서 더 밝은 border
    input: '217.2 32.6% 20%'
  })
  const [savedLightColors, setSavedLightColors] = useState<ColorScheme>(defaultTheme.colors.light)
  const [savedDarkColors, setSavedDarkColors] = useState<ColorScheme>(defaultTheme.colors.dark)
  const [showExport, setShowExport] = useState(false)
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light')
  const [editingTab, setEditingTab] = useState<'info' | 'light' | 'dark'>('info')
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>([])

  // 초기 로드 시 테마 목록 및 선택된 테마 불러오기
  useEffect(() => {
    // 테마 레지스트리에 기본 테마들 등록 (새 창이므로 레지스트리가 비어있음)
    themeRegistry.registerTheme(defaultTheme)
    themeRegistry.registerTheme(custom_themeTheme)
    
    // localStorage에서 추가로 저장된 테마들 로드
    const savedThemes = localStorage.getItem('custom-themes')
    if (savedThemes) {
      try {
        const themes = JSON.parse(savedThemes) as ThemeConfig[]
        themes.forEach(theme => themeRegistry.registerTheme(theme))
      } catch {
        // 파싱 에러 무시
      }
    }
    
    // 사용 가능한 모든 테마 로드
    const themes = themeRegistry.getAllThemes()
    setAvailableThemes(themes)
    
    // URL 파라미터로 전달된 테마 또는 현재 테마 로드
    let themeToLoad: ThemeConfig | null = null
    
    if (initialThemeId) {
      const foundTheme = themes.find(t => t.id === initialThemeId)
      themeToLoad = foundTheme || null
      if (themeToLoad) {
        setSelectedThemeId(initialThemeId)
      }
    }
    
    // localStorage에서 선택된 테마 ID 확인
    if (!themeToLoad) {
      const savedThemeId = localStorage.getItem('selected-theme')
      if (savedThemeId) {
        const foundTheme = themes.find(t => t.id === savedThemeId)
        themeToLoad = foundTheme || null
        if (themeToLoad) {
          setSelectedThemeId(savedThemeId)
        }
      }
    }
    
    // 그래도 없으면 첫 번째 테마 사용
    if (!themeToLoad && themes.length > 0) {
      themeToLoad = themes[0]
      setSelectedThemeId(themeToLoad.id)
    }
    
    if (themeToLoad) {
      setThemeId(themeToLoad.id)
      setThemeName(themeToLoad.name)
      setThemeDescription(themeToLoad.description || '')
      setThemeAuthor(themeToLoad.author || '')
      setThemeScope(themeToLoad.scope || 'both')
      setLightColors(themeToLoad.colors.light)
      setDarkColors(themeToLoad.colors.dark)
      setSavedLightColors(themeToLoad.colors.light)
      setSavedDarkColors(themeToLoad.colors.dark)
    } else {
      const { light, dark } = getCurrentThemeColors()
      if (Object.keys(light).length > 0) {
        setLightColors(prev => ({ ...prev, ...light }))
        setSavedLightColors(prev => ({ ...prev, ...light }))
      }
      if (Object.keys(dark).length > 0) {
        setDarkColors(prev => ({ ...prev, ...dark }))
        setSavedDarkColors(prev => ({ ...prev, ...dark }))
      }
    }
  }, [initialThemeId])
  
  // 테마 ID 입력 처리 (영어, 숫자, 하이픈만 허용)
  const handleThemeIdChange = (value: string) => {
    // 영어, 숫자, 하이픈, 언더스코어만 허용
    const sanitized = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-_]/g, '')
      .replace(/\s+/g, '-') // 공백을 하이픈으로
      .replace(/-+/g, '-') // 중복 하이픈 제거
    setThemeId(sanitized)
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
      id: themeId,
      name: themeName,
      description: themeDescription,
      version: '1.0.0',
      author: themeAuthor,
      scope: themeScope,
      colors: {
        light: lightColors,
        dark: darkColors,
      },
    }
    
    applyTheme(themeConfig)
    themeRegistry.registerTheme(themeConfig)
    
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
    
    // 기존 테마 업데이트 또는 새 테마 추가
    const existingIndex = customThemes.findIndex(t => t.id === themeId)
    if (existingIndex >= 0) {
      customThemes[existingIndex] = themeConfig
    } else {
      customThemes.push(themeConfig)
    }
    
    localStorage.setItem('custom-themes', JSON.stringify(customThemes))
    localStorage.setItem('selected-theme', themeId)
    
    // 저장된 색상 업데이트 ("적용"이 새로운 기준점이 됨)
    setSavedLightColors(lightColors)
    setSavedDarkColors(darkColors)
    
    // 사용 가능한 테마 목록 업데이트
    setAvailableThemes(themeRegistry.getAllThemes())
    setSelectedThemeId(themeId)
    
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <h1 className="text-xl font-semibold">테마 에디터</h1>
              </div>
              <Select value={selectedThemeId} onValueChange={(themeId) => {
                const theme = availableThemes.find(t => t.id === themeId)
                if (theme) {
                  setSelectedThemeId(themeId)
                  setThemeId(theme.id)
                  setThemeName(theme.name)
                  setThemeDescription(theme.description || '')
                  setThemeAuthor(theme.author || '')
                  setThemeScope(theme.scope || 'both')
                  setLightColors(theme.colors.light)
                  setDarkColors(theme.colors.dark)
                  setSavedLightColors(theme.colors.light)
                  setSavedDarkColors(theme.colors.dark)
                  
                  // 테마 레지스트리에도 활성화
                  themeRegistry.activateTheme(themeId)
                }
              }}>
                <SelectTrigger className="w-[200px] border-border">
                  <SelectValue placeholder="테마 선택" />
                </SelectTrigger>
                <SelectContent>
                  {availableThemes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      <div className="flex items-center gap-2">
                        <span>{theme.name}</span>
                        {theme.author && (
                          <span className="text-xs text-muted-foreground">by {theme.author}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                  {availableThemes.length === 0 && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      테마가 없습니다
                    </div>
                  )}
                </SelectContent>
              </Select>
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
                      <Label htmlFor="theme-id">테마 ID</Label>
                      <Input
                        id="theme-id"
                        value={themeId}
                        onChange={(e) => handleThemeIdChange(e.target.value)}
                        placeholder="예: ocean-blue"
                        pattern="[a-z0-9-]+"
                        className="font-mono lowercase border-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        영문 소문자, 숫자, 하이픈만 사용 가능
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme-name">테마명</Label>
                      <Input
                        id="theme-name"
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                        placeholder="예: Ocean Blue Theme"
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>사용 범위</Label>
                      <RadioGroup value={themeScope} onValueChange={(value) => setThemeScope(value as 'frontend' | 'backoffice' | 'both')}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="frontend" id="frontend" />
                          <Label htmlFor="frontend" className="flex items-center gap-2 cursor-pointer">
                            <Globe className="h-4 w-4" />
                            프론트엔드
                            <span className="text-xs text-muted-foreground">(일반 사용자용)</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="backoffice" id="backoffice" />
                          <Label htmlFor="backoffice" className="flex items-center gap-2 cursor-pointer">
                            <Building2 className="h-4 w-4" />
                            백오피스
                            <span className="text-xs text-muted-foreground">(관리자용)</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both" className="flex items-center gap-2 cursor-pointer">
                            <Sparkles className="h-4 w-4" />
                            공통
                            <span className="text-xs text-muted-foreground">(양쪽 모두 사용)</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme-description">설명 (선택)</Label>
                      <Textarea
                        id="theme-description"
                        value={themeDescription}
                        onChange={(e) => setThemeDescription(e.target.value)}
                        placeholder="테마에 대한 간단한 설명"
                        rows={3}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme-author">작성자 (선택)</Label>
                      <Input
                        id="theme-author"
                        value={themeAuthor}
                        onChange={(e) => setThemeAuthor(e.target.value)}
                        placeholder="이름 또는 조직명"
                        className="border-border"
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
                        className="border-border bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preview-select">셀렉트박스</Label>
                      <Select>
                        <SelectTrigger id="preview-select" className="border-border bg-background">
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
                        className="border-border bg-background resize-none"
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
            id: themeId,
            name: themeName,
            description: themeDescription,
            version: '1.0.0',
            author: themeAuthor,
            scope: themeScope,
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