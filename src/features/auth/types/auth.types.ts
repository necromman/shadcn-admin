export type UserType = 'personal' | 'business'

export type VerifyMethod = 'mobile-id' | 'simple' | 'cert' | 'finance'

export interface SignupState {
  currentStep: number
  userType: UserType | null
  verifyMethod: VerifyMethod | null
  termsAgreed: {
    all: boolean
    service: boolean
    privacy: boolean
    age: boolean
    marketing: boolean
    advertising: boolean
  }
  personalInfo: {
    name: string
    birthdate: string
    phone: string
  }
  accountInfo: {
    username: string
    password: string
    email?: string
    nickname?: string
  }
}

export interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
}

export type LoginMethod = 'id-password' | 'simple' | 'cert'

export const VERIFY_METHOD_LABELS: Record<VerifyMethod, string> = {
  'mobile-id': '모바일 신분증',
  'simple': '간편인증',
  'cert': '공동인증서',
  'finance': '금융인증서',
}

export const SIMPLE_AUTH_SERVICES = [
  { id: 'naver', name: '네이버', logo: '/auth/naver.png' },
  { id: 'kakao', name: '카카오', logo: '/auth/kakao.png' },
  { id: 'toss', name: '토스', logo: '/auth/toss.png' },
  { id: 'payco', name: '페이코', logo: '/auth/payco.png' },
  { id: 'kb', name: 'KB국민', logo: '/auth/kb.png' },
  { id: 'shinhan', name: '신한', logo: '/auth/shinhan.png' },
]

export const FINANCE_INSTITUTIONS = [
  '국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  '농협은행',
  '기업은행',
  '카카오뱅크',
  '케이뱅크',
  '토스뱅크',
]