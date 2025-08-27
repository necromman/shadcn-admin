export type LanguageCode = 'ko' | 'en' | 'zh-CN' | 'zh-HK' | 'ja' | 'th' | 'fr' | 'it'

export interface Language {
  code: LanguageCode
  name: string
  flag: string
  nativeName: string
}

export const SUPPORTED_LANGUAGES: Record<LanguageCode, Language> = {
  'ko': { 
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷' 
  },
  'en': { 
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸' 
  },
  'zh-CN': { 
    code: 'zh-CN',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳' 
  },
  'zh-HK': { 
    code: 'zh-HK',
    name: 'Chinese (Traditional)',
    nativeName: '繁體中文',
    flag: '🇭🇰' 
  },
  'ja': { 
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵' 
  },
  'th': { 
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭' 
  },
  'fr': { 
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷' 
  },
  'it': { 
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹' 
  }
}

export const DEFAULT_LANGUAGE: LanguageCode = 'ko'