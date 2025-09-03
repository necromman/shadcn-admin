import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCookie, setCookie } from '@/lib/cookies'

// ========================================
// 설정 타입 정의
// ========================================

export interface HeaderSettings {
  showTopNotice: boolean
  showSearchBar: boolean
  showNotifications: boolean
  headerStyle: 'sticky' | 'fixed' | 'static'
  enableBlur: boolean
  showAllMenus: boolean
  hoverEnabled: boolean
}

export interface HeroSettings {
  showBanner: boolean
  autoPlay: boolean
  slideInterval: number
  showIndicators: boolean
  showArrows: boolean
}

export interface FooterSettings {
  showInfo: boolean
  showQuickLinks: boolean
  showContact: boolean
  showSocial: boolean
  showNewsletter: boolean
}

export interface GeneralSettings {
  enableAnimations: boolean
  showDebugInfo: boolean
  useMockData: boolean
}

export interface DevSettings {
  header: HeaderSettings
  hero: HeroSettings
  footer: FooterSettings
  general: GeneralSettings
}

// ========================================
// 기본값 설정
// ========================================

const DEFAULT_SETTINGS: DevSettings = {
  header: {
    showTopNotice: true,
    showSearchBar: true,
    showNotifications: true,
    headerStyle: 'sticky',
    enableBlur: false,
    showAllMenus: false,
    hoverEnabled: true,
  },
  hero: {
    showBanner: true,
    autoPlay: true,
    slideInterval: 5000,
    showIndicators: true,
    showArrows: true,
  },
  footer: {
    showInfo: true,
    showQuickLinks: true,
    showContact: true,
    showSocial: true,
    showNewsletter: false,
  },
  general: {
    enableAnimations: true,
    showDebugInfo: false,
    useMockData: false,
  },
}

// ========================================
// Context 정의
// ========================================

interface DevSettingsContextType {
  settings: DevSettings
  updateSettings: (section: keyof DevSettings, values: Partial<DevSettings[keyof DevSettings]>) => void
  resetSettings: (section?: keyof DevSettings) => void
  isDeveloperMode: boolean
  setDeveloperMode: (value: boolean) => void
  isSettingsOpen: boolean
  setSettingsOpen: (value: boolean) => void
}

const DevSettingsContext = createContext<DevSettingsContextType | undefined>(undefined)

// ========================================
// Provider 컴포넌트
// ========================================

const SETTINGS_COOKIE_NAME = 'library-dev-settings'
const DEV_MODE_COOKIE_NAME = 'library-developer-mode'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function DevSettingsProvider({ children }: { children: React.ReactNode }) {
  // 개발자 모드 상태 (기본값: true로 설정)
  const [isDeveloperMode, setDeveloperMode] = useState<boolean>(() => {
    const saved = getCookie(DEV_MODE_COOKIE_NAME)
    // 쿠키가 없으면 기본값 true, 있으면 쿠키 값 사용
    return saved !== null ? saved === 'true' : true
  })

  // 설정 패널 열림 상태
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  // 설정 상태
  const [settings, setSettings] = useState<DevSettings>(() => {
    try {
      const saved = getCookie(SETTINGS_COOKIE_NAME)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...DEFAULT_SETTINGS, ...parsed }
      }
    } catch (e) {
      console.error('Failed to load dev settings:', e)
    }
    return DEFAULT_SETTINGS
  })

  // 설정 저장
  useEffect(() => {
    setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(settings), COOKIE_MAX_AGE)
  }, [settings])

  // 개발자 모드 저장
  useEffect(() => {
    setCookie(DEV_MODE_COOKIE_NAME, String(isDeveloperMode), COOKIE_MAX_AGE)
  }, [isDeveloperMode])

  // 설정 업데이트 함수
  const updateSettings = (
    section: keyof DevSettings,
    values: Partial<DevSettings[keyof DevSettings]>
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values,
      },
    }))
  }

  // 설정 초기화 함수
  const resetSettings = (section?: keyof DevSettings) => {
    if (section) {
      setSettings(prev => ({
        ...prev,
        [section]: DEFAULT_SETTINGS[section],
      }))
    } else {
      setSettings(DEFAULT_SETTINGS)
    }
  }

  return (
    <DevSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isDeveloperMode,
        setDeveloperMode,
        isSettingsOpen,
        setSettingsOpen,
      }}
    >
      {children}
    </DevSettingsContext.Provider>
  )
}

// ========================================
// Hook
// ========================================

export function useDevSettings() {
  const context = useContext(DevSettingsContext)
  if (!context) {
    throw new Error('useDevSettings must be used within a DevSettingsProvider')
  }
  return context
}