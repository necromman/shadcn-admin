import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ColorPicker } from './color-picker'
import { PreviewWindow } from './preview-window'
import { ExportDialog } from './export-dialog'
import { type ThemeConfig, type ColorScheme, type ThemeScope } from '../core/types'
import { applyTheme, resetTheme, getContrastColor, getCurrentThemeColors } from '../core/theme-utils'
import { themeRegistry } from '../core/theme-registry'
import { defaultTheme } from '../presets/default'
import { Palette, Download, RotateCcw, Eye, Moon, Sun, RefreshCw, Globe, Building2, Sparkles } from 'lucide-react'

interface ThemeEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeEditor({ open, onOpenChange }: ThemeEditorProps) {
  const [themeName, setThemeName] = useState('Custom Theme')
  const [themeDescription, setThemeDescription] = useState('')
  const [themeAuthor, setThemeAuthor] = useState('')
  const [themeScope, setThemeScope] = useState<ThemeScope>('both')
  const [lightColors, setLightColors] = useState<ColorScheme>(defaultTheme.colors.light)
  const [darkColors, setDarkColors] = useState<ColorScheme>(defaultTheme.colors.dark)
  const [showPreview, setShowPreview] = useState(false)
  const [showExport, setShowExport] = useState(false)
  
  // 현재 적용된 색상 불러오기
  const loadCurrentColors = () => {
    const { light, dark } = getCurrentThemeColors()
    if (Object.keys(light).length > 0) {
      setLightColors(prev => ({ ...prev, ...light }))
    }
    if (Object.keys(dark).length > 0) {
      setDarkColors(prev => ({ ...prev, ...dark }))
    }
  }

  const handleColorChange = (mode: 'light' | 'dark', key: keyof ColorScheme, value: string) => {
    if (mode === 'light') {
      const newColors = { ...lightColors, [key]: value }
      setLightColors(newColors)
      
      // foreground 색상 자동 조정
      if (key === 'background') {
        newColors.foreground = getContrastColor(value)
        setLightColors(newColors)
      }
      if (key === 'primary') {
        newColors['primary-foreground'] = getContrastColor(value)
        setLightColors(newColors)
      }
      if (key === 'secondary') {
        newColors['secondary-foreground'] = getContrastColor(value)
        setLightColors(newColors)
      }
    } else {
      const newColors = { ...darkColors, [key]: value }
      setDarkColors(newColors)
      
      // foreground 색상 자동 조정
      if (key === 'background') {
        newColors.foreground = getContrastColor(value)
        setDarkColors(newColors)
      }
      if (key === 'primary') {
        newColors['primary-foreground'] = getContrastColor(value)
        setDarkColors(newColors)
      }
      if (key === 'secondary') {
        newColors['secondary-foreground'] = getContrastColor(value)
        setDarkColors(newColors)
      }
    }
  }

  const handleApplyTheme = () => {
    const themeConfig: ThemeConfig = {
      id: themeName.toLowerCase().replace(/\s+/g, '-'),
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
  }

  const handleResetTheme = () => {
    resetTheme()
    setLightColors(defaultTheme.colors.light)
    setDarkColors(defaultTheme.colors.dark)
  }

  const handleExport = () => {
    setShowExport(true)
  }


  const colorGroups = [
    {
      title: '기본 색상',
      colors: [
        { key: 'background', label: 'Background', description: '페이지 배경색' },
        { key: 'foreground', label: 'Foreground', description: '기본 텍스트 색상' },
      ],
    },
    {
      title: '주요 색상',
      colors: [
        { key: 'primary', label: 'Primary', description: '주요 액션 버튼' },
        { key: 'primary-foreground', label: 'Primary Foreground', description: 'Primary 위 텍스트' },
        { key: 'secondary', label: 'Secondary', description: '보조 액션' },
        { key: 'secondary-foreground', label: 'Secondary Foreground', description: 'Secondary 위 텍스트' },
      ],
    },
    {
      title: '상태 색상',
      colors: [
        { key: 'destructive', label: 'Destructive', description: '삭제, 에러 등' },
        { key: 'destructive-foreground', label: 'Destructive Foreground', description: 'Destructive 위 텍스트' },
        { key: 'muted', label: 'Muted', description: '비활성 상태' },
        { key: 'muted-foreground', label: 'Muted Foreground', description: 'Muted 위 텍스트' },
      ],
    },
    {
      title: 'UI 요소',
      colors: [
        { key: 'accent', label: 'Accent', description: '강조 요소' },
        { key: 'accent-foreground', label: 'Accent Foreground', description: 'Accent 위 텍스트' },
        { key: 'border', label: 'Border', description: '테두리 색상' },
        { key: 'input', label: 'Input', description: '입력 필드 테두리' },
        { key: 'ring', label: 'Ring', description: '포커스 링' },
      ],
    },
  ]

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <DialogTitle>테마 에디터</DialogTitle>
            </div>
            <DialogDescription>
              색상을 커스터마이징하여 나만의 테마를 만들어보세요.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">테마 정보</TabsTrigger>
                <TabsTrigger value="light">
                  <Sun className="h-4 w-4 mr-2" />
                  라이트 모드
                </TabsTrigger>
                <TabsTrigger value="dark">
                  <Moon className="h-4 w-4 mr-2" />
                  다크 모드
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[500px] mt-4">
                <TabsContent value="info" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme-name">테마 이름</Label>
                    <Input
                      id="theme-name"
                      value={themeName}
                      onChange={(e) => setThemeName(e.target.value)}
                      placeholder="예: Ocean Blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme-description">설명 (선택)</Label>
                    <Textarea
                      id="theme-description"
                      value={themeDescription}
                      onChange={(e) => setThemeDescription(e.target.value)}
                      placeholder="테마에 대한 간단한 설명을 입력하세요"
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
                  <div className="space-y-2">
                    <Label>사용 범위</Label>
                    <RadioGroup value={themeScope} onValueChange={(value) => setThemeScope(value as ThemeScope)}>
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
                </TabsContent>

                <TabsContent value="light" className="space-y-6">
                  {colorGroups.map((group) => (
                    <div key={group.title} className="space-y-4">
                      <h3 className="text-sm font-semibold">{group.title}</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {group.colors.map((color) => (
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
                      <Separator />
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="dark" className="space-y-6">
                  {colorGroups.map((group) => (
                    <div key={group.title} className="space-y-4">
                      <h3 className="text-sm font-semibold">{group.title}</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {group.colors.map((color) => (
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
                      <Separator />
                    </div>
                  ))}
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <div className="flex justify-between mt-6">
              <div className="flex gap-2">
                <Button variant="outline" onClick={loadCurrentColors}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  현재 색상 불러오기
                </Button>
                <Button variant="outline" onClick={handleResetTheme}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  초기화
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  미리보기
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleApplyTheme}>
                  적용
                </Button>
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  내보내기
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PreviewWindow
        open={showPreview}
        onOpenChange={setShowPreview}
        theme={{
          id: themeName.toLowerCase().replace(/\s+/g, '-'),
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

      <ExportDialog
        open={showExport}
        onOpenChange={setShowExport}
        theme={{
          id: themeName.toLowerCase().replace(/\s+/g, '-'),
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
    </>
  )
}