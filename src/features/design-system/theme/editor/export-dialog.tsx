import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type ThemeConfig } from '../core/types'
import { HiClipboard, HiArrowDownTray, HiCheck } from 'react-icons/hi2'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  theme: ThemeConfig
}

export function ExportDialog({ open, onOpenChange, theme }: ExportDialogProps) {
  const [copied, setCopied] = useState(false)

  const generateThemeFile = (): string => {
    const themeName = theme.id.replace(/-/g, '_')
    
    return `/**
 * 테마: ${theme.name}
 * ${theme.description ? `설명: ${theme.description}` : ''}
 * ${theme.author ? `작성자: ${theme.author}` : ''}
 * 생성일: ${new Date().toLocaleDateString('ko-KR')}
 */

import { type ThemeConfig } from '../core/types'

export const ${themeName}Theme: ThemeConfig = ${JSON.stringify(theme, null, 2)}`
  }

  const handleCopy = () => {
    const content = generateThemeFile()
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const content = generateThemeFile()
    const blob = new Blob([content], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `theme-${theme.id}.ts`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const usageInstructions = `# 테마 사용 방법

## 1. 파일 설치
1. 다운로드한 \`theme-${theme.id}.ts\` 파일을 프로젝트의 \`src/features/design-system/theme/presets/\` 폴더에 복사
2. 필요시 types.ts 파일도 함께 복사

## 2. 테마 등록 및 적용

### 방법 A: 테마 레지스트리 사용 (권장)
\`\`\`tsx
// 테마 파일 import
import { ${theme.id.replace(/-/g, '_')}Theme } from './theme-${theme.id}'
import { themeRegistry } from '../core/theme-registry'

// 테마 등록
themeRegistry.registerTheme(${theme.id.replace(/-/g, '_')}Theme)

// 테마 활성화
themeRegistry.activateTheme('${theme.id}')
\`\`\`

### 방법 B: 직접 적용
\`\`\`tsx
import { ${theme.id.replace(/-/g, '_')}Theme } from './theme-${theme.id}'
import { applyTheme } from '../core/theme-utils'

// 테마 적용
applyTheme(${theme.id.replace(/-/g, '_')}Theme)
\`\`\`

## 3. 테마 목록에 추가
\`\`\`tsx
// src/features/design-system/theme/presets/index.ts
export { ${theme.id.replace(/-/g, '_')}Theme } from './theme-${theme.id}'
\`\`\`

## 4. 주의사항
- Tailwind CSS와 shadcn/ui가 설치되어 있어야 합니다
- 테마는 CSS Variables를 사용하므로 IE11 이하는 지원하지 않습니다
- HSL 색상 형식을 사용합니다 (예: "222.2 84% 4.9%")`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>테마 내보내기</DialogTitle>
          <DialogDescription>
            생성한 테마를 TypeScript 파일로 내보내기
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">테마 코드</TabsTrigger>
            <TabsTrigger value="usage">사용 방법</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                파일명: <code className="px-2 py-1 bg-muted rounded">theme-{theme.id}.ts</code>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <HiCheck className="h-4 w-4" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <HiClipboard className="h-4 w-4" />
                      복사
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <HiArrowDownTray className="h-4 w-4" />
                  다운로드
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-md border bg-muted/50">
              <div className="absolute inset-0 overflow-auto">
                <pre className="text-xs p-4" style={{ minWidth: 'max-content' }}>
                  <code className="block font-mono">{generateThemeFile()}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="h-[400px] w-full rounded-md border overflow-auto bg-muted/50">
              <div className="p-4">
                <pre className="text-xs whitespace-pre-wrap font-mono">
                  {usageInstructions}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}