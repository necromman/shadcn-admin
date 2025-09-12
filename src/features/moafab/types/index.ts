// MOAFAB 타입 정의

// 네비게이션 관련 타입
export interface NavMenuItem {
  id: string
  title: string
  href?: string
  children?: NavMenuItem[]
  icon?: string
  description?: string
}

// 캐러셀 슬라이드
export interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  cta?: {
    text: string
    link: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }
  secondaryCta?: {
    text: string
    link: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }
}

// 공정장비 검색 필터
export interface EquipmentSearchFilters {
  institutions: string[]
  process: string
  keyword: string
}

// 기관 정보
export interface Institution {
  id: string
  name: string
  nameEn?: string
  logo?: string
  description?: string
  website?: string
}

// 공정 정보
export interface Process {
  id: string
  name: string
  nameEn?: string
  code: string
}

// 공지사항 아이템
export interface NoticeItem {
  id: string
  title: string
  content?: string
  date: string
  category: 'notice' | 'news' | 'faq' | 'event'
  isImportant?: boolean
  author?: string
  views?: number
}

// 빠른 메뉴 아이템
export interface QuickMenuItem {
  id: string
  icon: string | React.ReactNode
  title: string
  description?: string
  link: string
  badge?: string
  color?: string
}

// 개발자 설정
export interface DevSettings {
  // 일반 설정
  isDeveloperMode: boolean
  theme: 'light' | 'dark' | 'system'
  language: 'ko' | 'en'
  
  // 캐러셀 설정
  carousel: {
    autoPlay: boolean
    interval: number
    effect: 'slide' | 'fade'
    showIndicators: boolean
    showNavigation: boolean
    pauseOnHover: boolean
  }
  
  // 검색 설정
  search: {
    defaultInstitutions: string[]
    searchDebounce: number
    showResultCount: boolean
    resultLayout: 'grid' | 'list'
    itemsPerPage: number
  }
  
  // 공지사항 설정
  notice: {
    itemsPerTab: number
    showDate: boolean
    showBadge: boolean
    showAuthor: boolean
    refreshInterval: number
  }
  
  // 빠른 메뉴 설정
  quickMenu: {
    columns: number
    showIcons: boolean
    cardStyle: 'bordered' | 'filled' | 'ghost'
    showDescription: boolean
  }
  
  // 파트너 설정
  partners: {
    displayMode: 'slider' | 'grid'
    autoScroll: boolean
    scrollSpeed: number
    showDescription: boolean
  }
  
  // 레이아웃 설정
  layout: {
    containerWidth: 'full' | 'wide' | 'narrow'
    spacing: 'compact' | 'normal' | 'spacious'
    showPreHeader: boolean
  }
}