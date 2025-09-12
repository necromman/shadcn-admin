import { useTranslation } from '@/lib/i18n/hooks'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { 
  HiPhone, 
  HiEnvelope, 
  HiMapPin,
  HiCube,
  HiArrowTopRightOnSquare,
  HiGlobeAlt
} from 'react-icons/hi2'
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'

export function MoafabFooter() {
  const { t } = useTranslation()
  const { settings } = useMoafabDevSettings()

  // 관련 사이트
  const relatedSites = [
    { title: '한국전자통신연구원', href: '#', external: true },
    { title: '서울대학교 반도체공동연구소', href: '#', external: true },
    { title: '한국나노기술원', href: '#', external: true },
    { title: '나노융합기술원', href: '#', external: true },
    { title: '나노종합기술원', href: '#', external: true },
    { title: '대구경북과학기술원', href: '#', external: true }
  ]

  // 패밀리 사이트
  const familySites = [
    { value: 'kion', label: '한국이온나노팹협회' },
    { value: 'djech', label: '대전일자리경제진흥원' },
    { value: 'motie', label: '산업통상자원부' },
    { value: 'kisti', label: '한국과학기술정보연구원' },
    { value: 'kitech', label: '한국생산기술연구원' },
    { value: 'nst', label: '국가과학기술연구회' },
  ]

  // SNS 링크
  const socialLinks = [
    { icon: SiNaver, href: '#', label: '네이버 블로그', color: 'hover:bg-green-500' },
    { icon: RiKakaoTalkFill, href: '#', label: '카카오톡 채널', color: 'hover:bg-yellow-400' },
    { icon: FaYoutube, href: '#', label: '유튜브', color: 'hover:bg-red-500' },
    { icon: FaLinkedin, href: '#', label: '링크드인', color: 'hover:bg-blue-700' },
    { icon: FaFacebook, href: '#', label: '페이스북', color: 'hover:bg-blue-600' },
  ]

  // 푸터 링크들
  const footerLinks = {
    '플랫폼 안내': [
      '모아팹 소개',
      '이용 안내',
      '시설 소개',
      '협력 기관',
      '오시는 길'
    ],
    '서비스': [
      '장비 검색',
      '서비스 신청',
      '기술 상담',
      '교육 프로그램',
      '연구 지원'
    ],
    '고객 지원': [
      '공지사항',
      '자주 묻는 질문',
      '문의하기',
      '자료실',
      '이용 가이드'
    ],
    '정보 공개': [
      '사업 소개',
      '보도자료',
      '연구 성과',
      '통계 자료',
      '입찰 공고'
    ]
  }

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-t">
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        settings.layout.containerWidth === 'full' && "max-w-full",
        settings.layout.containerWidth === 'wide' && "max-w-7xl",
        settings.layout.containerWidth === 'narrow' && "max-w-5xl"
      )}>
        {/* 상단 섹션 - 정보 및 링크 */}
        <div className="pt-12 pb-8 grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* 회사 정보 (2칸) */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
            <img 
                src="https://www.moafab.kr/resources/images/kion/fab/common/moa_logo.png"
                alt="MOAFAB"
                className="h-8 w-auto"
              />
            </div>
            <div className="space-y-2.5 text-sm mb-6">
              <div className="flex items-start gap-2">
                <HiMapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                <span className="text-foreground/80">
                  (34111) 대전광역시 유성구 가정북로 96(장동)<br />
                  대전일자리경제진흥원 601호
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiPhone className="h-4 w-4 flex-shrink-0 text-blue-500" />
                <span className="text-foreground/80">TEL: 042-719-9128 | FAX: 070-7545-8247</span>
              </div>
              <div className="flex items-center gap-2">
                <HiEnvelope className="h-4 w-4 flex-shrink-0 text-blue-500" />
                <a href="mailto:jcdoh0@kion.or.kr" className="text-foreground/80 hover:text-primary transition-colors">
                  jcdoh0@kion.or.kr
                </a>
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
                    className={`h-10 w-10 rounded-xl border-2 border-border/50 flex items-center justify-center transition-all hover:text-white hover:border-transparent hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 푸터 링크들 (각 1칸씩) */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span className="w-1 h-1 bg-muted-foreground/50 rounded-full mr-2 group-hover:bg-primary transition-colors" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 중간 섹션 - 관련 사이트 */}
        <div className="py-6 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 관련 기관 */}
            {/* <div>
              <h3 className="font-semibold mb-3 text-sm">협력 기관</h3>
              <div className="flex flex-wrap gap-2">
                {relatedSites.map((site) => (
                  <a 
                    key={site.title}
                    href={site.href}
                    className="text-xs px-3 py-1.5 border rounded-lg hover:bg-muted transition-all hover:shadow-sm inline-flex items-center gap-1 group"
                  >
                    <span>{site.title}</span>
                    {site.external && <HiArrowTopRightOnSquare className="h-3 w-3 opacity-50 group-hover:opacity-100" />}
                  </a>
                ))}
              </div>
            </div> */}

            {/* 패밀리 사이트 & 바로가기 */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <HiGlobeAlt className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="관련 사이트" />
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
                  웹 접근성
                </Button>
                <Button variant="outline" size="sm">
                  모바일 앱
                </Button>
              </div>
            </div>

            {/* 인증 및 수상 */}
            {/* <div className="flex items-start lg:items-center gap-3 lg:justify-end">
              <span className="text-xs text-muted-foreground mt-2 lg:mt-0">인증:</span>
              <div className="flex flex-wrap gap-2">
                {['ISO 9001', 'ISO 14001', 'KSQS'].map((cert) => (
                  <div
                    key={cert}
                    className="h-8 px-3 rounded-lg border bg-background/50 flex items-center justify-center hover:bg-background transition-colors"
                    title={cert}
                  >
                    <span className="text-xs font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* 하단 섹션 - 저작권 & 법적 고지 */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground/80">
                Copyright © KION All Rights Reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                한국이온나노팹협회 | 사업자등록번호: 314-82-76589 | 대표: 도정찬
              </p>
              <p className="text-xs text-muted-foreground">
                주소: (34111) 대전광역시 유성구 가정북로 96(장동) 대전일자리경제진흥원 601호
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