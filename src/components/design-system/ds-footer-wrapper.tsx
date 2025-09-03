import { useState } from 'react'
import { HiCog6Tooth } from 'react-icons/hi2'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { DSFooterLibrary } from './ds-footer-library'

interface FooterOptions {
  showFooter: boolean
  showInfo: boolean
  showContact: boolean
  showQuickLinks: boolean
  showSearchLinks: boolean
  showRelatedSites: boolean
  showCopyright: boolean
}

export function DSFooterWrapper() {
  const [options, setOptions] = useState<FooterOptions>({
    showFooter: true,
    showInfo: true,
    showContact: true,
    showQuickLinks: true,
    showSearchLinks: true,
    showRelatedSites: true,
    showCopyright: true,
  })

  return (
    <>
      {/* 개발자 옵션 패널 */}
      <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <HiCog6Tooth className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
          <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">푸터 표시 옵션</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-footer"
              checked={options.showFooter}
              onCheckedChange={(checked) => setOptions({...options, showFooter: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-footer" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              푸터 전체
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-info"
              checked={options.showInfo}
              onCheckedChange={(checked) => setOptions({...options, showInfo: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
              disabled={!options.showFooter}
            />
            <Label htmlFor="show-info" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              도서관 정보
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-contact"
              checked={options.showContact}
              onCheckedChange={(checked) => setOptions({...options, showContact: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
              disabled={!options.showFooter}
            />
            <Label htmlFor="show-contact" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              연락처 정보
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-quick"
              checked={options.showQuickLinks}
              onCheckedChange={(checked) => setOptions({...options, showQuickLinks: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
              disabled={!options.showFooter}
            />
            <Label htmlFor="show-quick" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              빠른 링크
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-search"
              checked={options.showSearchLinks}
              onCheckedChange={(checked) => setOptions({...options, showSearchLinks: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
              disabled={!options.showFooter}
            />
            <Label htmlFor="show-search" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              자료검색
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-related"
              checked={options.showRelatedSites}
              onCheckedChange={(checked) => setOptions({...options, showRelatedSites: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
              disabled={!options.showFooter}
            />
            <Label htmlFor="show-related" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              관련 사이트
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-copyright"
              checked={options.showCopyright}
              onCheckedChange={(checked) => setOptions({...options, showCopyright: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
              disabled={!options.showFooter}
            />
            <Label htmlFor="show-copyright" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              저작권
            </Label>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
          각 섹션을 선택적으로 표시하거나 숨길 수 있습니다. 실제 서비스에서는 설정 없이 모든 내용이 표시됩니다.
        </p>
      </div>

      {/* 실제 푸터 - 옵션에 따라 표시 */}
      {options.showFooter && (
        <DSFooterLibrary 
          options={{
            showInfo: options.showInfo,
            showContact: options.showContact,
            showQuickLinks: options.showQuickLinks,
            showSearchLinks: options.showSearchLinks,
            showRelatedSites: options.showRelatedSites,
            showCopyright: options.showCopyright
          }} 
        />
      )}
    </>
  )
}