import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DEFAULT_LANGUAGE, LanguageCode } from './types'

// Import all translation files
import koTranslation from '@/locales/ko/translation.json'
import enTranslation from '@/locales/en/translation.json'
import zhCNTranslation from '@/locales/zh-CN/translation.json'
import zhHKTranslation from '@/locales/zh-HK/translation.json'
import jaTranslation from '@/locales/ja/translation.json'
import thTranslation from '@/locales/th/translation.json'
import frTranslation from '@/locales/fr/translation.json'
import itTranslation from '@/locales/it/translation.json'

const resources = {
  ko: { translation: koTranslation },
  en: { translation: enTranslation },
  'zh-CN': { translation: zhCNTranslation },
  'zh-HK': { translation: zhHKTranslation },
  ja: { translation: jaTranslation },
  th: { translation: thTranslation },
  fr: { translation: frTranslation },
  it: { translation: itTranslation }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false,
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    
    ns: ['translation'],
    defaultNS: 'translation'
  })

export default i18n

// Helper function to change language
export const changeLanguage = (lng: LanguageCode) => {
  i18n.changeLanguage(lng)
}