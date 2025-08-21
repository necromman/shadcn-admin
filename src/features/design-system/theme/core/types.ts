/**
 * 테마 시스템 타입 정의
 */

export interface ColorScheme {
  // 기본 색상
  background: string
  foreground: string
  
  // Primary 색상
  primary: string
  'primary-foreground': string
  
  // Secondary 색상
  secondary: string
  'secondary-foreground': string
  
  // Destructive 색상 (에러, 삭제 등)
  destructive: string
  'destructive-foreground': string
  
  // Muted 색상 (비활성, 배경 등)
  muted: string
  'muted-foreground': string
  
  // Accent 색상 (강조)
  accent: string
  'accent-foreground': string
  
  // UI 요소 색상
  border: string
  input: string
  ring: string
  
  // Card 색상
  card?: string
  'card-foreground'?: string
  
  // Popover 색상
  popover?: string
  'popover-foreground'?: string
}

export interface ThemeStyles {
  borderRadius?: {
    base?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
  fontSize?: {
    xs?: string
    sm?: string
    base?: string
    lg?: string
    xl?: string
  }
  spacing?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export type ThemeScope = 'frontend' | 'backoffice' | 'both'

export interface ThemeConfig {
  id: string
  name: string
  description?: string
  version: string
  author?: string
  scope?: ThemeScope  // 테마 사용 범위 (기본값: 'both')
  colors: {
    light: ColorScheme
    dark: ColorScheme
  }
  styles?: ThemeStyles
}

export interface ThemeExportOptions {
  format: 'typescript' | 'javascript'
  minify?: boolean
  includeComments?: boolean
}

export interface ThemeRegistry {
  [themeId: string]: ThemeConfig
}

// Window 객체에 테마 레지스트리 타입 추가
declare global {
  interface Window {
    __THEMES__?: ThemeRegistry
    __CURRENT_THEME__?: string
    __THEME_OBSERVER__?: MutationObserver
  }
}