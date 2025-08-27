import { useTranslation as useI18nTranslation } from 'react-i18next'
import { changeLanguage } from './config'
import { LanguageCode } from './types'

export const useTranslation = () => {
  const { t, i18n, ready } = useI18nTranslation()
  
  const currentLanguage = i18n.language as LanguageCode
  
  const setLanguage = (lng: LanguageCode) => {
    changeLanguage(lng)
  }
  
  return {
    t,
    currentLanguage,
    setLanguage,
    ready
  }
}