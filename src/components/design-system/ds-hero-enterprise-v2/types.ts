import { ReactNode, ElementType } from 'react'

// 팝업 데이터 타입
export interface PopupData {
  id: string
  type: 'text' | 'image'
  title: string
  badge: string
  badgeIcon: ElementType
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive'
  content: ReactNode
  imageUrl?: string
  isVisible: boolean
}

// 팝업 위치 타입 (단순화)
export type PopupPosition = 'left' | 'center' | 'right'

// 팝업 배치 타입 (단순화)
export type PopupLayout = 'stack' | 'vertical' | 'horizontal'

// 팝업 컴포넌트 Props
export interface PopupProps {
  data: PopupData
  onClose: (id: string) => void
  position: { x: number, y: number, debug?: string, debugInfo?: unknown }
  zIndex: number
  showDebug?: boolean
  animationSpeed?: 'slow' | 'normal' | 'fast'
}

// 팝업 설정 타입
export interface PopupConfig {
  maxPopups: number
  position: PopupPosition
  layout: PopupLayout
  enableBlur: boolean
  showDebug: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
}

// 히어로 스타일 타입
export type HeroStyle = 'gradient' | 'image' | 'video'