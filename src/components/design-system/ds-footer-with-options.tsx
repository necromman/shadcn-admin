import { useState } from 'react'
import { HiEnvelope, HiPhone, HiMapPin, HiCog6Tooth } from 'react-icons/hi2'
import { ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface FooterOptions {
  showInfo: boolean
  showQuickLinks: boolean
  showSearchLinks: boolean
  showRelatedSites: boolean
  showContact: boolean
  showCopyright: boolean
}

export function DSFooterWithOptions() {
  const [options, setOptions] = useState<FooterOptions>({
    showInfo: true,
    showQuickLinks: true,
    showSearchLinks: true,
    showRelatedSites: true,
    showContact: true,
    showCopyright: true,
  })

  const relatedSites = [
    { title: 'BRAND 그룹', href: '#', external: true },
    { title: 'BRAND 연구소', href: '#', external: true },
    { title: 'BRAND 파트너스', href: '#', external: true },
    { title: 'BRAND 아카데미', href: '#', external: true },
    { title: 'BRAND 클라우드', href: '#', external: true },
    { title: 'BRAND 벤처스', href: '#', external: true }
  ]

  const quickLinks = [
    { title: '회사소개', href: '#' },
    { title: '인재채용', href: '#' },
    { title: '제휴문의', href: '#' },
    { title: '고객센터', href: '#' },
    { title: '개인정보처리방침', href: '#', bold: true },
    { title: '이용약관', href: '#' },
  ]

  const searchLinks = [
    '제품 검색',
    '서비스 찾기',
    '솔루션 검색',
    'API 문서',
    '기술 지원'
  ]

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
              id="show-info"
              checked={options.showInfo}
              onCheckedChange={(checked) => setOptions({...options, showInfo: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-info" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              회사 정보
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-quick-links"
              checked={options.showQuickLinks}
              onCheckedChange={(checked) => setOptions({...options, showQuickLinks: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-quick-links" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              빠른 링크
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-search-links"
              checked={options.showSearchLinks}
              onCheckedChange={(checked) => setOptions({...options, showSearchLinks: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-search-links" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              검색 링크
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-related-sites"
              checked={options.showRelatedSites}
              onCheckedChange={(checked) => setOptions({...options, showRelatedSites: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-related-sites" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              관련 사이트
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-contact"
              checked={options.showContact}
              onCheckedChange={(checked) => setOptions({...options, showContact: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-contact" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              연락처
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-copyright"
              checked={options.showCopyright}
              onCheckedChange={(checked) => setOptions({...options, showCopyright: checked as boolean})}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label htmlFor="show-copyright" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
              저작권
            </Label>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
          각 섹션을 선택적으로 표시하거나 숨길 수 있습니다. 실제 서비스에서는 사용자 설정에 따라 제어됩니다.
        </p>
      </div>

      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            {options.showInfo && (
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary" />
                  <span className="font-bold text-xl">BRAND</span>
                </div>
                <p className="text-sm mb-4 text-muted-foreground">
                  글로벌 기술 혁신을 선도하는 BRAND입니다.
                  최첨단 솔루션과 서비스로 디지털 트랜스포메이션을 실현하며, 
                  고객의 비즈니스 성공을 위한 최적의 파트너가 되겠습니다.
                </p>
                {options.showContact && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <HiMapPin className="h-4 w-4 text-muted-foreground" />
                      <span>서울특별시 강남구 테헤란로 123</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HiPhone className="h-4 w-4 text-muted-foreground" />
                      <span>02-1234-5678</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HiEnvelope className="h-4 w-4 text-muted-foreground" />
                      <span>contact@brand.com</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick Links */}
            {options.showQuickLinks && (
              <div>
                <h3 className="font-semibold mb-4">빠른 링크</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.title}>
                      <a 
                        href={link.href}
                        className={`text-sm hover:text-primary transition-colors ${link.bold ? 'font-semibold' : ''}`}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Search Links */}
            {options.showSearchLinks && (
              <div>
                <h3 className="font-semibold mb-4">제품/서비스</h3>
                <ul className="space-y-2">
                  {searchLinks.map((link) => (
                    <li key={link} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Sites */}
            {options.showRelatedSites && (
              <div>
                <h3 className="font-semibold mb-4">패밀리 사이트</h3>
                <ul className="space-y-2">
                  {relatedSites.map((site) => (
                    <li key={site.title}>
                      {site.external && (
                        <a 
                          href={site.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:text-primary transition-colors inline-flex items-center space-x-1"
                        >
                          <span>{site.title}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Separator className="my-8" />

          {/* Bottom Bar */}
          {options.showCopyright && (
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                Copyright © 2025 BRAND. All rights reserved.
              </div>
              <div className="flex gap-4 text-xs">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  이용약관
                </a>
                <Separator orientation="vertical" className="h-4" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
                  개인정보처리방침
                </a>
                <Separator orientation="vertical" className="h-4" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  이메일무단수집거부
                </a>
              </div>
            </div>
          )}
        </div>
      </footer>
    </>
  )
}