import { Link } from 'react-router-dom'
import { BookOpen, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const quickLinks = [
  { title: '도서관 소개', href: '/guide/info' },
  { title: '이용시간', href: '/guide/hours' },
  { title: '대출/반납 안내', href: '/guide/loan-info' },
  { title: '희망도서 신청', href: '/services/book-request' },
  { title: '좌석 예약', href: '/facilities/seat' },
  { title: 'FAQ', href: '/news/faq' }
]

const services = [
  { title: '통합검색', href: '/search' },
  { title: '신착도서', href: '/search?type=new' },
  { title: '인기도서', href: '/search?type=popular' },
  { title: '전자자료', href: '/search?type=ebook' },
  { title: '학술DB', href: '/search?type=academic' },
  { title: '멀티미디어', href: '/search?type=multimedia' }
]

const relatedSites = [
  { title: '한밭대학교', href: 'https://www.hanbat.ac.kr', external: true },
  { title: 'KDI국제정책대학원', href: 'https://www.kdischool.ac.kr', external: true },
  { title: '서울대학교', href: 'https://www.snu.ac.kr', external: true },
  { title: '충북대학교', href: 'https://www.chungbuk.ac.kr', external: true },
  { title: '충남대학교', href: 'https://www.cnu.ac.kr', external: true },
  { title: '세종공동캠퍼스', href: 'https://sejong.campus.kr', external: true }
]

export function LibraryFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Library Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl text-white">세종샘물도서관</span>
            </div>
            <p className="text-sm mb-4">
              세종공동캠퍼스 5개 대학의 지식과 문화를 공유하는 공간입니다.
              최신 학술자료와 다양한 문화 콘텐츠를 제공하며, 
              스마트한 도서관 서비스로 여러분의 학습과 연구를 지원합니다.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>세종특별자치시 집현북로 109</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>044-251-8000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>library@sejong.ac.kr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>평일 09:00-22:00 | 토요일 09:00-17:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link 
                    to={link.href} 
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">자료검색</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  <Link 
                    to={service.href} 
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Sites */}
          <div>
            <h3 className="font-semibold text-white mb-4">관련 사이트</h3>
            <ul className="space-y-2">
              {relatedSites.map((site) => (
                <li key={site.title}>
                  {site.external ? (
                    <a 
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-blue-400 transition-colors inline-flex items-center space-x-1"
                    >
                      <span>{site.title}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link 
                      to={site.href} 
                      className="text-sm hover:text-blue-400 transition-colors"
                    >
                      {site.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            Copyright © 2024 Sejong Common Campus Library. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/library/privacy" className="hover:text-blue-400 transition-colors">
              개인정보처리방침
            </Link>
            <Link to="/library/terms" className="hover:text-blue-400 transition-colors">
              이용약관
            </Link>
            <Link to="/library/sitemap" className="hover:text-blue-400 transition-colors">
              사이트맵
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}