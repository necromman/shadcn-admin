import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function DSFooter() {
  const footerLinks = {
    '회사소개': ['회사소개', '연혁', '경영이념', 'CI/BI', '오시는길'],
    '제품/서비스': ['솔루션', '플랫폼', '클라우드', 'API 서비스', '가격정책'],
    '고객지원': ['고객센터', '자주묻는질문', '문의하기', '공지사항', '다운로드'],
    '인재채용': ['채용공고', '인재상', '복리후생', '교육제도'],
  }

  const socialLinks = [
    { icon: SiNaver, href: '#', label: '네이버 블로그', color: 'hover:bg-green-500' },
    { icon: RiKakaoTalkFill, href: '#', label: '카카오톡 채널', color: 'hover:bg-yellow-400' },
    { icon: FaYoutube, href: '#', label: '유튜브', color: 'hover:bg-red-500' },
    { icon: FaInstagram, href: '#', label: '인스타그램', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: FaFacebook, href: '#', label: '페이스북', color: 'hover:bg-primary/90' },
    { icon: FaLinkedin, href: '#', label: '링크드인', color: 'hover:bg-primary' },
  ]

  const familySites = [
    { value: 'company1', label: '계열사 A' },
    { value: 'company2', label: '계열사 B' },
    { value: 'company3', label: '자회사 C' },
    { value: 'partner1', label: '파트너사 D' },
    { value: 'partner2', label: '파트너사 E' },
  ]

  const certifications = [
    'ISO 9001',
    'ISO 27001',
    'ISMS-P',
    '벤처기업인증',
    '기술혁신형 중소기업',
  ]

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        {/* 상단 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="text-xl font-bold">BRAND</span>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-start gap-2">
                <HiMapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>서울특별시 강남구 테헤란로 123 테크빌딩 10층</span>
              </div>
              <div className="flex items-center gap-2">
                <HiPhone className="h-4 w-4 flex-shrink-0" />
                <span>대표전화: 02-1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <HiEnvelope className="h-4 w-4 flex-shrink-0" />
                <span>이메일: contact@techcompany.co.kr</span>
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

          {/* 푸터 링크들 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 중간 섹션 - 패밀리 사이트 & 인증 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-t border-b">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            {/* 패밀리 사이트 */}
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

            {/* 관련 사이트 바로가기 */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                웹 접근성 품질인증
              </Button>
              <Button variant="outline" size="sm">
                개인정보처리방침
              </Button>
            </div>
          </div>

          {/* 인증 마크 */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">인증:</span>
            <div className="flex gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="h-8 px-2 rounded border bg-muted/50 flex items-center justify-center"
                  title={cert}
                >
                  <span className="text-xs font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 섹션 - 저작권 & 법적 고지 */}
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                © 2025 BRAND. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                대표이사: 홍길동 | 사업자등록번호: 123-45-67890 | 통신판매업신고: 제2025-서울강남-12345호
              </p>
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
              <Separator orientation="vertical" className="h-4" />
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