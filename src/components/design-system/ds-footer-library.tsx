import { BookOpen, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const relatedSites = [
  { title: 'BRAND 대학교', href: '#', external: true },
  { title: 'BRAND 정책대학원', href: '#', external: true },
  { title: 'BRAND 서울캠퍼스', href: '#', external: true },
  { title: 'BRAND 지방캠퍼스 A', href: '#', external: true },
  { title: 'BRAND 지방캠퍼스 B', href: '#', external: true },
  { title: 'BRAND 공동캠퍼스', href: '#', external: true }
]

interface LibraryFooterOptions {
  showInfo?: boolean
  showContact?: boolean
  showQuickLinks?: boolean
  showSearchLinks?: boolean
  showRelatedSites?: boolean
  showCopyright?: boolean
}

export function DSFooterLibrary({ 
  options = {
    showInfo: true,
    showContact: true,
    showQuickLinks: true,
    showSearchLinks: true,
    showRelatedSites: true,
    showCopyright: true
  }
}: { options?: LibraryFooterOptions }) {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Library Info */}
          {options.showInfo && (
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">BRAND 도서관</span>
              </div>
              <p className="text-sm mb-4 text-muted-foreground">
                BRAND 캠퍼스 5개 대학의 지식과 문화를 공유하는 공간입니다.
                최신 학술자료와 다양한 문화 콘텐츠를 제공하며, 
                스마트한 도서관 서비스로 여러분의 학습과 연구를 지원합니다.
              </p>
              {options.showContact && (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>서울특별시 종로구 혜화로 8길 1</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>02-3290-0000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>library@brand.ac.kr</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>평일 09:00-22:00 | 토요일 09:00-17:00</span>
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
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    홈
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    도서관 안내
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    이용시간
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    공지사항
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Services */}
          {options.showSearchLinks && (
            <div>
              <h3 className="font-semibold mb-4">자료검색</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    통합검색
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    신착도서
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    인기도서
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    전자자료
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    학술DB
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Related Sites */}
          {options.showRelatedSites && (
            <div>
              <h3 className="font-semibold mb-4">관련 사이트</h3>
              <ul className="space-y-2">
                {relatedSites.map((site) => (
                  <li key={site.title}>
                    {site.external && (
                      <a 
                        href={site.href}
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
              Copyright © 2025 BRAND Campus Library. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                이용약관
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                사이트맵
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}