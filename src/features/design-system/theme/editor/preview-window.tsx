import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { type ThemeConfig } from '../core/types'
import { HiMoon, HiSun, HiComputerDesktop } from 'react-icons/hi2'

interface PreviewWindowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  theme: ThemeConfig
}

export function PreviewWindow({ open, onOpenChange, theme }: PreviewWindowProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    if (open && iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        // HTML 콘텐츠 생성
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="ko" class="${previewMode === 'dark' || (previewMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : ''}">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>테마 미리보기</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              :root {
                ${Object.entries(theme.colors.light)
                  .map(([key, value]) => `--${key}: ${value};`)
                  .join('\n                ')}
              }
              
              .dark {
                ${Object.entries(theme.colors.dark)
                  .map(([key, value]) => `--${key}: ${value};`)
                  .join('\n                ')}
              }

              body {
                background-color: hsl(var(--background));
                color: hsl(var(--foreground));
                font-family: system-ui, -apple-system, sans-serif;
              }

              .btn-primary {
                background-color: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
              }

              .btn-secondary {
                background-color: hsl(var(--secondary));
                color: hsl(var(--secondary-foreground));
              }

              .btn-destructive {
                background-color: hsl(var(--destructive));
                color: hsl(var(--destructive-foreground));
              }

              .card {
                background-color: hsl(var(--card, var(--background)));
                border: 1px solid hsl(var(--border));
              }

              .input {
                border: 1px solid hsl(var(--input));
                background-color: hsl(var(--background));
                color: hsl(var(--foreground));
              }

              .input:focus {
                outline: 2px solid hsl(var(--ring));
                outline-offset: 2px;
              }

              .muted {
                background-color: hsl(var(--muted));
                color: hsl(var(--muted-foreground));
              }

              .accent {
                background-color: hsl(var(--accent));
                color: hsl(var(--accent-foreground));
              }
            </style>
          </head>
          <body class="p-8">
            <div class="max-w-4xl mx-auto space-y-8">
              <!-- Header -->
              <header class="card rounded-lg p-6">
                <h1 class="text-3xl font-bold mb-2">${theme.name}</h1>
                <p class="text-sm opacity-80">${theme.description || '커스텀 테마 미리보기'}</p>
              </header>

              <!-- Buttons -->
              <section class="space-y-4">
                <h2 class="text-xl font-semibold mb-4">버튼</h2>
                <div class="flex gap-4 flex-wrap">
                  <button class="btn-primary px-4 py-2 rounded-md font-medium">Primary Button</button>
                  <button class="btn-secondary px-4 py-2 rounded-md font-medium">Secondary Button</button>
                  <button class="btn-destructive px-4 py-2 rounded-md font-medium">Destructive Button</button>
                  <button class="muted px-4 py-2 rounded-md font-medium">Muted Button</button>
                  <button class="accent px-4 py-2 rounded-md font-medium">Accent Button</button>
                </div>
              </section>

              <!-- Form Elements -->
              <section class="space-y-4">
                <h2 class="text-xl font-semibold mb-4">폼 요소</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">입력 필드</label>
                    <input type="text" class="input w-full px-3 py-2 rounded-md" placeholder="텍스트를 입력하세요">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">텍스트 영역</label>
                    <textarea class="input w-full px-3 py-2 rounded-md" rows="3" placeholder="여러 줄 텍스트를 입력하세요"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">선택 박스</label>
                    <select class="input w-full px-3 py-2 rounded-md">
                      <option>옵션 1</option>
                      <option>옵션 2</option>
                      <option>옵션 3</option>
                    </select>
                  </div>
                </div>
              </section>

              <!-- Cards -->
              <section class="space-y-4">
                <h2 class="text-xl font-semibold mb-4">카드</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="card p-6 rounded-lg">
                    <h3 class="font-semibold mb-2">기본 카드</h3>
                    <p class="text-sm opacity-80">이것은 기본 카드 컴포넌트입니다. 테두리와 배경색이 테마에 따라 변경됩니다.</p>
                  </div>
                  <div class="card p-6 rounded-lg">
                    <h3 class="font-semibold mb-2">또 다른 카드</h3>
                    <p class="text-sm opacity-80">카드는 콘텐츠를 그룹화하고 시각적으로 구분하는 데 사용됩니다.</p>
                  </div>
                </div>
              </section>

              <!-- Color Palette -->
              <section class="space-y-4">
                <h2 class="text-xl font-semibold mb-4">색상 팔레트</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="space-y-2">
                    <div class="h-20 rounded-md" style="background-color: hsl(var(--background))"></div>
                    <p class="text-xs font-medium">Background</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md" style="background-color: hsl(var(--primary))"></div>
                    <p class="text-xs font-medium">Primary</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md" style="background-color: hsl(var(--secondary))"></div>
                    <p class="text-xs font-medium">Secondary</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md" style="background-color: hsl(var(--destructive))"></div>
                    <p class="text-xs font-medium">Destructive</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md" style="background-color: hsl(var(--muted))"></div>
                    <p class="text-xs font-medium">Muted</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md" style="background-color: hsl(var(--accent))"></div>
                    <p class="text-xs font-medium">Accent</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md border-2" style="border-color: hsl(var(--border))"></div>
                    <p class="text-xs font-medium">Border</p>
                  </div>
                  <div class="space-y-2">
                    <div class="h-20 rounded-md border-2" style="border-color: hsl(var(--ring))"></div>
                    <p class="text-xs font-medium">Ring</p>
                  </div>
                </div>
              </section>
            </div>
          </body>
          </html>
        `

        iframeDoc.open()
        iframeDoc.write(htmlContent)
        iframeDoc.close()
      }
    }
  }, [open, theme, previewMode])

  const handleModeChange = (mode: 'light' | 'dark' | 'system') => {
    setPreviewMode(mode)
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument
      if (iframeDoc) {
        const html = iframeDoc.documentElement
        if (mode === 'dark') {
          html.classList.add('dark')
        } else if (mode === 'light') {
          html.classList.remove('dark')
        } else {
          // System mode
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark')
          } else {
            html.classList.remove('dark')
          }
        }
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle>테마 미리보기 - {theme.name}</DialogTitle>
            <div className="flex gap-1">
              <Button
                variant={previewMode === 'light' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleModeChange('light')}
              >
                <HiSun className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'dark' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleModeChange('dark')}
              >
                <HiMoon className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'system' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleModeChange('system')}
              >
                <HiComputerDesktop className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="px-6 pb-6">
          <iframe
            ref={iframeRef}
            className="w-full h-[600px] border rounded-lg"
            title="Theme Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}