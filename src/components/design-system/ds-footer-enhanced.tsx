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

export function DSFooterEnhanced() {
  // 관련 사이트
  const relatedSites = [
    { title: 'BRAND 대학교', href: '#', external: true },
    { title: 'BRAND 정책대학원', href: '#', external: true },
    { title: 'BRAND 서울캠퍼스', href: '#', external: true },
    { title: 'BRAND 의료원', href: '#', external: true },
    { title: 'BRAND 산학협력단', href: '#', external: true },
    { title: 'BRAND 평생교육원', href: '#', external: true }
  ]

  // 패밀리 사이트 (셀렉트 박스용)
  const familySites = [
    { value: 'library-main', label: 'BRAND 중앙도서관' },
    { value: 'library-med', label: 'BRAND 의학도서관' },
    { value: 'library-law', label: 'BRAND 법학도서관' },
    { value: 'library-sci', label: 'BRAND 과학도서관' },
    { value: 'foundation', label: 'BRAND 재단' },
    { value: 'museum', label: 'BRAND 박물관' },
    { value: 'archive', label: 'BRAND 기록관' },
  ]

  // SNS 링크
  const socialLinks = [
    { icon: SiNaver, href: '#', label: '네이버 블로그', color: 'hover:bg-green-500' },
    { icon: RiKakaoTalkFill, href: '#', label: '카카오톡 채널', color: 'hover:bg-yellow-400' },
    { icon: FaYoutube, href: '#', label: '유튜브', color: 'hover:bg-red-500' },
    { icon: FaInstagram, href: '#', label: '인스타그램', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: FaFacebook, href: '#', label: '페이스북', color: 'hover:bg-primary/90' },
  ]

  // 푸터 링크들
  const footerLinks = {
    '도서관 안내': ['도서관 소개', '층별 안내', '이용 시간', '대출 규정', '좌석 배정'],
    '자료 검색': ['통합 검색', '신착 도서', '인기 도서', '전자 자료', '학술 DB', '학위 논문'],
    '서비스': ['대출/반납', '희망도서 신청', '상호대차', '원문복사', '연구지원', '이용자 교육'],
    '나의 도서관': ['대출 현황', '예약 도서', '연체 도서', '구입희망 도서', '개인정보 수정'],
  }

  // 인증 마크
  const certifications = [
    'ISO 9001',
    'ISO 14001', 
    'KSQS',
    '한국도서관상',
    '공공데이터품질',
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* 상단 섹션 - 정보 및 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          {/* 도서관 정보 (2칸) */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">BRAND 도서관</span>
            </div>
            <p className="text-sm mb-4 text-muted-foreground">
              BRAND 캠퍼스의 지식과 문화를 공유하는 공간입니다.
              최신 학술자료와 다양한 문화 콘텐츠를 제공합니다.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <span>서울특별시 종로구 대학로 86 (동숭동)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span>대표전화: 02-3290-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span>library@brand.ac.kr</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span>평일 09:00-22:00 | 토요일 09:00-17:00</span>
              </div>
            </div>
            
            {/* SNS 링크 */}
            <div className="flex gap-2 flex-wrap">
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
          </div>

          {/* 푸터 링크들 (각 1칸씩) */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 중간 섹션 - 관련 사이트 */}
        <div className="py-6 border-t border-b">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 관련 사이트 링크 */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">관련 사이트</h3>
              <div className="flex flex-wrap gap-2">
                {relatedSites.map((site) => (
                  <a 
                    key={site.title}
                    href={site.href}
                    className="text-xs px-2 py-1 border rounded hover:bg-muted transition-colors inline-flex items-center gap-1"
                  >
                    <span>{site.title}</span>
                    {site.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                ))}
              </div>
            </div>

            {/* 패밀리 사이트 & 바로가기 */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
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
            </div>

            {/* 인증 마크 */}
            <div className="flex items-start lg:items-center gap-3 lg:justify-end">
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
          </div>
        </div>

        {/* 하단 섹션 - 저작권 & 법적 고지 */}
        <div className="mt-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                © 2025 BRAND Campus Library. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                도서관장: 김학자 | 사업자등록번호: 101-82-00001 | 대표전화: 02-3290-0000
              </p>
              <p className="text-xs text-muted-foreground">
                주소: 서울특별시 종로구 대학로 86 (동숭동) | 우편번호: 03082
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
      </div>
    </footer>
  )
}