import { type ThemeConfig } from './types'
import { applyTheme } from './theme-utils'

/**
 * 테마 레지스트리 관리
 */
export class ThemeRegistryManager {
  private static instance: ThemeRegistryManager

  private constructor() {
    this.initRegistry()
    this.setupDarkModeObserver()
    this.loadSavedTheme()
  }

  static getInstance(): ThemeRegistryManager {
    if (!ThemeRegistryManager.instance) {
      ThemeRegistryManager.instance = new ThemeRegistryManager()
    }
    return ThemeRegistryManager.instance
  }

  /**
   * 레지스트리 초기화
   */
  private initRegistry() {
    if (typeof window !== 'undefined' && !window.__THEMES__) {
      window.__THEMES__ = {}
    }
  }

  /**
   * 다크모드 변경 감지 설정
   */
  private setupDarkModeObserver() {
    if (typeof window === 'undefined') return

    // 기존 observer가 있다면 제거
    if (window.__THEME_OBSERVER__) {
      window.__THEME_OBSERVER__.disconnect()
    }

    // 새 observer 생성
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          // 현재 선택된 테마가 있다면 재적용
          const currentThemeId = window.__CURRENT_THEME__
          if (currentThemeId && window.__THEMES__?.[currentThemeId]) {
            applyTheme(window.__THEMES__[currentThemeId])
          }
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.__THEME_OBSERVER__ = observer
  }

  /**
   * 저장된 테마 불러오기
   */
  private loadSavedTheme() {
    if (typeof window === 'undefined') return

    const savedThemeId = localStorage.getItem('selected-theme')
    if (savedThemeId && window.__THEMES__?.[savedThemeId]) {
      applyTheme(window.__THEMES__[savedThemeId])
      window.__CURRENT_THEME__ = savedThemeId
    }
  }

  /**
   * 테마 등록
   */
  registerTheme(theme: ThemeConfig): void {
    if (typeof window === 'undefined') return

    if (!window.__THEMES__) {
      window.__THEMES__ = {}
    }

    window.__THEMES__[theme.id] = theme

    // 첫 번째 테마이고 저장된 테마가 없다면 자동 적용
    const themes = Object.keys(window.__THEMES__)
    if (themes.length === 1 && !localStorage.getItem('selected-theme')) {
      this.activateTheme(theme.id)
    }
  }

  /**
   * 테마 제거
   */
  unregisterTheme(themeId: string): void {
    if (typeof window === 'undefined' || !window.__THEMES__) return

    delete window.__THEMES__[themeId]

    // 현재 활성화된 테마가 제거되었다면 초기화
    if (window.__CURRENT_THEME__ === themeId) {
      window.__CURRENT_THEME__ = undefined
      localStorage.removeItem('selected-theme')
    }
  }

  /**
   * 테마 활성화
   */
  activateTheme(themeId: string): boolean {
    if (typeof window === 'undefined' || !window.__THEMES__) return false

    const theme = window.__THEMES__[themeId]
    if (!theme) return false

    applyTheme(theme)
    window.__CURRENT_THEME__ = themeId
    localStorage.setItem('selected-theme', themeId)
    return true
  }

  /**
   * 모든 등록된 테마 가져오기
   */
  getAllThemes(): ThemeConfig[] {
    if (typeof window === 'undefined' || !window.__THEMES__) return []
    return Object.values(window.__THEMES__)
  }

  /**
   * 특정 테마 가져오기
   */
  getTheme(themeId: string): ThemeConfig | undefined {
    if (typeof window === 'undefined' || !window.__THEMES__) return undefined
    return window.__THEMES__[themeId]
  }

  /**
   * 현재 활성화된 테마 ID 가져오기
   */
  getCurrentThemeId(): string | undefined {
    if (typeof window === 'undefined') return undefined
    return window.__CURRENT_THEME__ || localStorage.getItem('selected-theme') || undefined
  }
  
  /**
   * 현재 활성화된 테마 가져오기
   */
  getCurrentTheme(): ThemeConfig | undefined {
    const themeId = this.getCurrentThemeId()
    return themeId ? this.getTheme(themeId) : undefined
  }

  /**
   * 테마 존재 여부 확인
   */
  hasTheme(themeId: string): boolean {
    if (typeof window === 'undefined' || !window.__THEMES__) return false
    return themeId in window.__THEMES__
  }

  /**
   * 레지스트리 초기화
   */
  clearRegistry(): void {
    if (typeof window === 'undefined') return

    window.__THEMES__ = {}
    window.__CURRENT_THEME__ = undefined
    localStorage.removeItem('selected-theme')
  }
}

// 싱글톤 인스턴스 export
export const themeRegistry = ThemeRegistryManager.getInstance()