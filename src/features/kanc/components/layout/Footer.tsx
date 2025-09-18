import { Phone, Mail, MapPin, Youtube, Share2, ExternalLink, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/20 to-muted/40 border-t">
      {/* Quick Links Section */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              {['개인정보처리방침', '이용약관', '이메일무단수집거부', '사이트맵', '찾아오시는길'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {item}
                  {index === 0 && <span className="text-xs text-red-600 font-semibold">필수</span>}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">관련 사이트</span>
              <select className="text-sm border rounded px-2 py-1 bg-popover text-foreground">
                <option>과학기술정보통신부</option>
                <option>한국연구재단</option>
                <option>나노종합기술원</option>
                <option>한국나노기술연구협의회</option>
                <option>나노융합산업연구조합</option>
              </select>
              <Button size="sm" variant="outline">
                바로가기
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="https://css.kanc.re.kr/images/kor/logo.png"
                alt="한국나노기술원"
                className="w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              나노기술의 미래를 선도하는 한국나노기술원은<br />
              세계 최고 수준의 나노팹 인프라와 전문 인력을 바탕으로<br />
              대한민국 나노기술 발전에 기여하고 있습니다.
            </p>

            {/* Certifications */}
            <div className="flex gap-3">
              <div className="bg-white dark:bg-popover rounded px-3 py-2 text-xs font-medium text-gray-700 dark:text-muted-foreground border border-gray-200 dark:border-border">
                ISO 9001
              </div>
              <div className="bg-white dark:bg-popover rounded px-3 py-2 text-xs font-medium text-gray-700 dark:text-muted-foreground border border-gray-200 dark:border-border">
                ISO 14001
              </div>
              <div className="bg-white dark:bg-popover rounded px-3 py-2 text-xs font-medium text-gray-700 dark:text-muted-foreground border border-gray-200 dark:border-border">
                KOLAS 인증
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">주요 서비스</h4>
            <ul className="space-y-2">
              {[
                '팹서비스 신청',
                '장비 예약',
                '교육 프로그램',
                '기술 상담',
                '시험분석 의뢰'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">고객지원</h4>
            <ul className="space-y-2">
              {[
                '공지사항',
                '자주 묻는 질문',
                '온라인 문의',
                '서식 자료실',
                '이용 가이드'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">연락처</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>[16229] 경기도 수원시 영통구 광교로 109</p>
                  <p className="text-xs">(이의동, 한국나노기술원)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p>Tel: 031-546-6000 / 031-546-6114</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href="mailto:info@kanc.re.kr" className="text-sm text-muted-foreground hover:text-primary">
                  info@kanc.re.kr
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 pt-3">
                <a
                  href="https://blog.naver.com/kanc_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-popover flex items-center justify-center hover:bg-gray-100 dark:hover:bg-secondary transition-colors border border-gray-200 dark:border-border"
                  aria-label="Blog"
                >
                  <Share2 className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@kanc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-popover flex items-center justify-center hover:bg-gray-100 dark:hover:bg-secondary transition-colors border border-gray-200 dark:border-border"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-border bg-gray-100 dark:bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              <p>상호명 : (재)한국나노기술원</p>
              <Separator orientation="vertical" className="h-4" />
              <p>사업자등록번호: 135-82-10611</p>
              <Separator orientation="vertical" className="h-4" />
              <p>(대표자 : 박노재)</p>
            </div>
            <div className="text-center md:text-right">
              <p>Copyright by kanc. All rights reserved.</p>
              <p className="mt-1">게시된 정보화 관련한 문의 또는 건의사항은 info@kanc.re.kr로 연락주시기 바랍니다</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}