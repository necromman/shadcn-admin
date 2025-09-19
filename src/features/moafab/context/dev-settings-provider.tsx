import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type DevSettings } from '../types'

interface DevSettingsContextValue {
  settings: DevSettings
  updateSettings: (newSettings: Partial<DevSettings>) => void
  resetSettings: () => void
  isSettingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  isDeveloperMode: boolean
  toggleDeveloperMode: () => void
}

const defaultSettings: DevSettings = {
  // 일반 설정
  isDeveloperMode: false,
  theme: 'system',
  language: 'ko',
  
  // 캐러셀 설정
  carousel: {
    autoPlay: true,
    interval: 5000,
    effect: 'slide',
    showIndicators: true,
    showNavigation: true,
    pauseOnHover: true,
  },
  
  // 검색 설정
  search: {
    defaultInstitutions: [],
    searchDebounce: 300,
    showResultCount: true,
    resultLayout: 'grid',
    itemsPerPage: 12,
  },
  
  // 공지사항 설정
  notice: {
    itemsPerTab: 5,
    showDate: true,
    showBadge: true,
    showAuthor: false,
    refreshInterval: 0,
  },
  
  // 빠른 메뉴 설정
  quickMenu: {
    columns: 3,
    showIcons: true,
    cardStyle: 'bordered',
    showDescription: true,
  },
  
  // 파트너 설정
  partners: {
    displayMode: 'slider',
    autoScroll: true,
    scrollSpeed: 3000,
    showDescription: false,
  },
  
  // 레이아웃 설정
  layout: {
    containerWidth: 'wide',
    spacing: 'normal',
    showPreHeader: true,
  },
}

const DevSettingsContext = createContext<DevSettingsContextValue | undefined>(undefined)

const STORAGE_KEY = 'moafab-dev-settings'

export function MoafabDevSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DevSettings>(defaultSettings)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  // 로컬스토리지에서 설정 불러오기
  useEffect(() => {
    const storedSettings = localStorage.getItem(STORAGE_KEY)
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error('Failed to parse stored settings:', error)
      }
    }
  }, [])

  // 설정 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  // Ctrl+Shift+D 단축키 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setSettingsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const updateSettings = (newSettings: Partial<DevSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      // 중첩된 객체 처리
      carousel: { ...prev.carousel, ...(newSettings.carousel || {}) },
      search: { ...prev.search, ...(newSettings.search || {}) },
      notice: { ...prev.notice, ...(newSettings.notice || {}) },
      quickMenu: { ...prev.quickMenu, ...(newSettings.quickMenu || {}) },
      partners: { ...prev.partners, ...(newSettings.partners || {}) },
      layout: { ...prev.layout, ...(newSettings.layout || {}) },
    }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem(STORAGE_KEY)
  }

  const toggleDeveloperMode = () => {
    updateSettings({ isDeveloperMode: !settings.isDeveloperMode })
  }

  const value: DevSettingsContextValue = {
    settings,
    updateSettings,
    resetSettings,
    isSettingsOpen,
    setSettingsOpen,
    isDeveloperMode: settings.isDeveloperMode,
    toggleDeveloperMode,
  }

  return (
    <DevSettingsContext.Provider value={value}>
      {children}
    </DevSettingsContext.Provider>
  )
}

export function useMoafabDevSettings() {
  const context = useContext(DevSettingsContext)
  if (!context) {
    throw new Error('useMoafabDevSettings must be used within MoafabDevSettingsProvider')
  }
  return context
}