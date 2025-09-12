import { Link } from '@tanstack/react-router'
import { BookOpen, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'

// 관련 대학교
const universities = [
  { title: '한밭대학교', href: 'https://www.hanbat.ac.kr', external: true },
  { title: 'KDI국제정책대학원', href: 'https://www.kdischool.ac.kr', external: true },
  { title: '서울대학교', href: 'https://www.snu.ac.kr', external: true },
  { title: '충북대학교', href: 'https://www.chungbuk.ac.kr', external: true },
  { title: '충남대학교', href: 'https://www.cnu.ac.kr', external: true },
  { title: '세종공동캠퍼스', href: 'https://sejong.campus.kr', external: true }
]

// 패밀리 사이트 (Select용)
const familySites = [
  { value: 'library-main', label: '세종중앙도서관' },
  { value: 'library-med', label: '세종의학도서관' },
  { value: 'library-law', label: '세종법학도서관' },
  { value: 'library-sci', label: '세종과학도서관' },
  { value: 'foundation', label: '세종문화재단' },
  { value: 'museum', label: '세종박물관' },
  { value: 'archive', label: '세종기록관' },
]

// SNS 링크
const socialLinks = [
  { icon: SiNaver, href: '#', label: '네이버 블로그', color: 'hover:bg-green-500' },
  { icon: RiKakaoTalkFill, href: '#', label: '카카오톡 채널', color: 'hover:bg-yellow-400' },
  { icon: FaYoutube, href: '#', label: '유튜브', color: 'hover:bg-red-500' },
  { icon: FaInstagram, href: '#', label: '인스타그램', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
  { icon: FaFacebook, href: '#', label: '페이스북', color: 'hover:bg-blue-600' },
]

// 인증 마크
const certifications = [
  'ISO 9001',
  'ISO 14001',
  'KSQS',
  // '한국도서관상',
  '공공데이터품질',
]

export function LibraryFooter() {
  const { settings } = useLibraryDevSettings()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* 상단 섹션 - 정보 및 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Library Info */}
          {settings.footer.showInfo && (
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">세종샘물도서관</span>
              </div>
              <p className="text-sm mb-4 text-muted-foreground">
                세종공동캠퍼스 5개 대학의 지식과 문화를 공유하는 공간입니다.
                최신 학술자료와 다양한 문화 콘텐츠를 제공하며, 
                스마트한 도서관 서비스로 여러분의 학습과 연구를 지원합니다.
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                도서관장: 김학자 | 사업자등록번호: 304-82-00001
              </p>
              {settings.footer.showContact && (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>세종특별자치시 집현북로 109</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>044-251-8000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>library@sejong.ac.kr</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>평일 09:00-22:00 | 토요일 09:00-17:00</span>
                  </div>
                </div>
              )}
              
              {/* SNS 링크 */}
              {settings.footer.showSocial !== false && (
                <div className="flex gap-2 flex-wrap mt-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-all hover:text-white hover:border-transparent ${social.color}`}
                        aria-label={social.label}
                        title={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Quick Links */}
          {settings.footer.showQuickLinks && (
            <div>
              <h3 className="font-semibold mb-4">빠른 링크</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    홈
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/design-system" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    도서관 안내
                  </Link>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    이용시간
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    공지사항
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Services */}
          {settings.footer.showSearchLinks && (
            <div>
              <h3 className="font-semibold mb-4">자료검색</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    통합검색
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    신착도서
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    인기도서
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    전자자료
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    학술DB
                  </a>
                </li>
              </ul>
            </div>
          )}
          
          {/* Library Services */}
          {settings.footer.showQuickLinks !== false && (
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    대출/반납
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    희망도서 신청
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    상호대차
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    원문복사
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    연구지원
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Related Universities */}
          {settings.footer.showRelatedSites && (
            <div>
              <h3 className="font-semibold mb-4">관련 대학</h3>
              <ul className="space-y-2">
                {universities.map((site) => (
                  <li key={site.title}>
                    <a 
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      <span>{site.title}</span>
                      {site.external && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 중간 섹션 - 패밀리 사이트 & 인증 */}
        <div className="py-6 border-t border-b">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* 패밀리 사이트 & 바로가기 */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {settings.footer.showRelatedSites !== false && (
                <>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="패밀리 사이트" />
                    </SelectTrigger>
                    <SelectContent>
                      {familySites.map((site) => (
                        <SelectItem key={site.value} value={site.value}>
                          {site.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      웹 접근성 안내
                    </Button>
                    <Button variant="outline" size="sm">
                      모바일 앱
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            {/* 인증 마크 */}
            {/* 인증 마크 섹션 - 임시로 주석 처리 */}
            {false && (
              <div className="flex items-start lg:items-center gap-3">
                <span className="text-xs text-muted-foreground mt-2 lg:mt-0">인증:</span>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <div
                      key={cert}
                      className="h-8 px-3 rounded border bg-background flex items-center justify-center"
                      title={cert}
                    >
                      <span className="text-xs font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 섹션 - 저작권 & 법적 고지 */}
        {settings.footer.showCopyright && (
          <div className="mt-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  © 2025 세종샘물도서관. All rights reserved.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  이용약관
                </a>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
                  개인정보처리방침
                </a>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  이메일무단수집거부
                </a>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  저작권정책
                </a>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  사이트맵
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}