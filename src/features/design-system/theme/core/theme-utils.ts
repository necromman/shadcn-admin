import { type ThemeConfig } from './types'
import { hslStringToOklch, hexToOklch, oklchToHex, hexToRgb, rgbToHsl } from './color-converter'

/**
 * HSL 색상 문자열을 RGB로 변환
 */
export function hslToRgb(hsl: string): { r: number; g: number; b: number } {
  const parts = hsl.split(' ')
  const h = parseFloat(parts[0]) / 360
  const s = parseFloat(parts[1]) / 100
  const l = parseFloat(parts[2].replace('%', '')) / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

/**
 * 색상의 명도를 계산 (WCAG 기준)
 */
export function getLuminance(hsl: string): number {
  const { r, g, b } = hslToRgb(hsl)
  
  const rsRGB = r / 255
  const gsRGB = g / 255
  const bsRGB = b / 255

  const rLin = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const gLin = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const bLin = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin
}

/**
 * 두 색상 간의 대비율 계산 (WCAG AA 기준: 4.5:1)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * 배경색에 대한 적절한 전경색 자동 선택
 */
export function getContrastColor(background: string): string {
  const luminance = getLuminance(background)
  // 밝은 배경이면 어두운 텍스트, 어두운 배경이면 밝은 텍스트
  return luminance > 0.5 ? '222.2 84% 4.9%' : '210 40% 98%'
}

/**
 * HSL 색상의 밝기 조절
 */
export function adjustLightness(hsl: string, targetLightness: number): string {
  const parts = hsl.split(' ')
  const h = parts[0]
  const s = parts[1]
  return `${h} ${s} ${targetLightness}%`
}

/**
 * 색상에서 자동으로 shade 생성
 */
export function generateShades(baseColor: string): Record<number, string> {
  const parts = baseColor.split(' ')
  const h = parts[0]
  const s = parseFloat(parts[1])
  
  return {
    50: `${h} ${Math.max(s - 10, 0)}% 95%`,
    100: `${h} ${Math.max(s - 5, 0)}% 90%`,
    200: `${h} ${s}% 80%`,
    300: `${h} ${s}% 70%`,
    400: `${h} ${s}% 60%`,
    500: baseColor, // 기본 색상
    600: `${h} ${s}% 40%`,
    700: `${h} ${Math.min(s + 5, 100)}% 30%`,
    800: `${h} ${Math.min(s + 10, 100)}% 20%`,
    900: `${h} ${Math.min(s + 15, 100)}% 10%`,
    950: `${h} ${Math.min(s + 20, 100)}% 5%`,
  }
}

/**
 * 테마를 CSS 스타일시트로 적용 (개선된 방식)
 */
export function applyTheme(config: ThemeConfig) {
  // 이전 커스텀 테마 제거
  const existingStyle = document.getElementById('custom-theme-styles')
  if (existingStyle) {
    existingStyle.remove()
  }
  
  // 색상 변환 함수
  const convertColor = (value: string): string => {
    if (isValidHSL(value)) {
      return hslStringToOklch(value)
    } else if (value.startsWith('#')) {
      return hexToOklch(value)
    }
    return value
  }
  
  // 라이트 모드 색상
  const lightColors = Object.entries(config.colors.light)
    .map(([key, value]) => `  --${key}: ${convertColor(value)};`)
    .join('\n')
  
  // 다크 모드 색상
  const darkColors = Object.entries(config.colors.dark)
    .map(([key, value]) => `  --${key}: ${convertColor(value)};`)
    .join('\n')
  
  // CSS 스타일시트 생성
  const styleContent = `
/* Custom Theme - ${config.name} */
:root {
${lightColors}
}

.dark {
${darkColors}
}
`
  
  // 스타일 태그 삽입
  const styleElement = document.createElement('style')
  styleElement.id = 'custom-theme-styles'
  styleElement.innerHTML = styleContent
  document.head.appendChild(styleElement)
  
  // 현재 테마 ID 저장 (메모리에만)
  window.__CURRENT_THEME__ = config.id
  // localStorage.setItem('selected-theme', config.id) // 임시 적용이므로 저장하지 않음
}

/**
 * 기본 테마로 복원
 */
export function resetTheme() {
  // 커스텀 스타일시트 제거
  const customStyle = document.getElementById('custom-theme-styles')
  if (customStyle) {
    customStyle.remove()
  }
  
  // 저장된 테마 정보 제거
  window.__CURRENT_THEME__ = undefined
  // localStorage.removeItem('selected-theme') // 이미 저장하지 않으므로 제거할 필요 없음
}

/**
 * 색상 유효성 검사
 */
export function isValidHSL(hsl: string): boolean {
  const regex = /^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/
  return regex.test(hsl)
}

/**
 * HEX를 HSL로 변환
 */
export function hexToHSL(hex: string): string {
  // Remove the hash if present
  hex = hex.replace(/^#/, '')
  
  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

/**
 * HSL을 HEX로 변환
 */
export function hslToHex(hsl: string): string {
  const { r, g, b } = hslToRgb(hsl)
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * 현재 CSS 변수 값 읽기
 */
export function getCurrentThemeColors(): { light: Record<string, string>; dark: Record<string, string> } {
  const root = document.documentElement
  const computedStyle = getComputedStyle(root)
  
  const colorKeys = [
    'background', 'foreground', 'primary', 'primary-foreground',
    'secondary', 'secondary-foreground', 'destructive', 'destructive-foreground',
    'muted', 'muted-foreground', 'accent', 'accent-foreground',
    'border', 'input', 'ring', 'card', 'card-foreground',
    'popover', 'popover-foreground'
  ]
  
  const colors: Record<string, string> = {}
  
  colorKeys.forEach(key => {
    const value = computedStyle.getPropertyValue(`--${key}`).trim()
    if (value) {
      // oklch 형식이면 HEX로 변환 후 HSL로 변환
      if (value.startsWith('oklch')) {
        const hex = oklchToHex(value)
        const { r, g, b } = hexToRgb(hex)
        const { h, s, l } = rgbToHsl(r, g, b)
        colors[key] = `${h} ${s}% ${l}%`
      } else {
        colors[key] = value
      }
    }
  })
  
  // 현재 모드에 따라 반환
  const isDark = root.classList.contains('dark')
  return {
    light: isDark ? {} : colors,
    dark: isDark ? colors : {}
  }
}

