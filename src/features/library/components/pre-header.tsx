import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { ExternalLink } from 'lucide-react'

export function LibraryPreHeader() {
  const { settings } = useLibraryDevSettings()
  
  if (!settings.preHeader.showTopNotice) return null
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2">
          <a 
            href="https://www.kion.or.kr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group"
          >
            <img 
              src="https://www.moafab.kr/resources/images/kion/portal/common/logo.png"
              alt="KION"
              className="h-5 w-auto"
            />
            <span className="font-medium">KION 국가나노인프라협의체</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  )
}