import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCookie, setCookie } from '@/lib/cookies'

// ========================================
// 설정 타입 정의
// ========================================

export interface PreHeaderSettings {
  showTopNotice: boolean
  noticeText: string
  showActionButton: boolean
  noticeType: 'info' | 'warning' | 'success' | 'error'
  position: 'top' | 'bottom'
}

export interface HeaderSettings {
  showSearchBar: boolean
  showNotifications: boolean
  headerStyle: 'sticky' | 'fixed' | 'static'
  enableBlur: boolean
  showAllMenus: boolean
  hoverEnabled: boolean
  showUserMenu: boolean
  showQuickLinks: boolean
}

export interface CarouselSettings {
  showCarousel: boolean
  autoPlay: boolean
  slideInterval: number
  showIndicators: boolean
  showArrows: boolean
  showPlayPause: boolean
  transitionDuration: number
  // 높이 설정
  height: number
  // 인디케이터 설정
  indicatorStyle: 'circle' | 'square'
  indicatorPosition: 'inside' | 'outside'
  indicatorPaddingDesktop: number
  indicatorPaddingMobile: number
  // 네비게이션 버튼 설정
  navigationSize: 'small' | 'medium' | 'large' | 'custom'
  customButtonSize: number
  customIconSize: number
  navigationPosition: 'safe' | 'edge' | 'custom'
  // 버튼 위치 미세 조정
  buttonBasePercent: number
  buttonLeftPosition: number
  buttonRightPosition: number
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
  showRelatedSites: boolean
  showSearchLinks: boolean
  showCopyright: boolean
}

export interface GeneralSettings {
  enableAnimations: boolean
  showDebugInfo: boolean
  useMockData: boolean
  showDevTools: boolean
  preserveSettings: boolean
}

export interface DevSettings {
  preHeader: PreHeaderSettings
  header: HeaderSettings
  carousel: CarouselSettings
  hero: HeroSettings
  footer: FooterSettings
  general: GeneralSettings
}

// ========================================
// 기본값 설정
// ========================================

const DEFAULT_SETTINGS: DevSettings = {
  preHeader: {
    showTopNotice: true,
    noticeText: '📢 세종샘물도서관 시스템 정식 오픈! 온라인으로 도서 검색과 예약이 가능합니다.',
    showActionButton: true,
    noticeType: 'info',
    position: 'top',
  },
  header: {
    showSearchBar: true,
    showNotifications: true,
    headerStyle: 'sticky',
    enableBlur: false,
    showAllMenus: false,
    hoverEnabled: true,
    showUserMenu: true,
    showQuickLinks: true,
  },
  carousel: {
    showCarousel: true,
    autoPlay: true,
    slideInterval: 5000,
    showIndicators: true,
    showArrows: true,
    showPlayPause: true,
    transitionDuration: 500,
    // 높이 설정
    height: 400,
    // 인디케이터 설정
    indicatorStyle: 'square',
    indicatorPosition: 'inside',
    indicatorPaddingDesktop: 175,
    indicatorPaddingMobile: 45,
    // 네비게이션 버튼 설정
    navigationSize: 'medium',  // 중간 크기를 기본값으로 (세종샘물도서관 스타일)
    customButtonSize: 48,
    customIconSize: 24,
    navigationPosition: 'custom',  // 커스텀으로 변경 (디자인 시스템과 동일)
    // 버튼 위치 미세 조정 - 세종샘물도서관 스타일에 맞게 조정
    buttonBasePercent: 42,  // 기준점 42%로 변경
    buttonLeftPosition: 90,  // 컨테이너 안쪽 90px
    buttonRightPosition: 90,  // 컨테이너 안쪽 90px
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
    showRelatedSites: true,
    showSearchLinks: true,
    showCopyright: true,
  },
  general: {
    enableAnimations: true,
    showDebugInfo: false,
    useMockData: false,
    showDevTools: true,
    preserveSettings: true,
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

export function LibraryDevSettingsProvider({ children }: { children: React.ReactNode }) {
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
      }
    }))
  }

  // 설정 초기화 함수
  const resetSettings = (section?: keyof DevSettings) => {
    if (section) {
      setSettings(prev => ({
        ...prev,
        [section]: DEFAULT_SETTINGS[section]
      }))
    } else {
      setSettings(DEFAULT_SETTINGS)
    }
  }

  const value: DevSettingsContextType = {
    settings,
    updateSettings,
    resetSettings,
    isDeveloperMode,
    setDeveloperMode,
    isSettingsOpen,
    setSettingsOpen,
  }

  return (
    <DevSettingsContext.Provider value={value}>
      {children}
    </DevSettingsContext.Provider>
  )
}

// ========================================
// Hook
// ========================================

export function useLibraryDevSettings() {
  const context = useContext(DevSettingsContext)
  if (context === undefined) {
    throw new Error('useLibraryDevSettings must be used within a LibraryDevSettingsProvider')
  }
  return context
}