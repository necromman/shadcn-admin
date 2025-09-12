import { Badge } from '@/components/ui/badge'
import { HiClock, HiPhone, HiCheckCircle, HiShieldCheck, HiDocumentText, HiChartBar, HiBeaker, HiCpuChip } from 'react-icons/hi2'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'

export function HeroSection() {
  const { settings } = useMoafabDevSettings()
  const quickMenuItems = [
    { icon: HiDocumentText, title: '상담신청', href: '/moafab/apply/consult', color: 'text-blue-600' },
    { icon: HiPhone, title: '견적신청', href: '/moafab/apply/quote', color: 'text-green-600' },
    { icon: HiBeaker, title: '서비스신청', href: '/moafab/apply/service', color: 'text-purple-600' },
    { icon: HiChartBar, title: '상담현황', href: '/moafab/status/consult', color: 'text-orange-600' },
    { icon: HiDocumentText, title: '견적현황', href: '/moafab/status/quote', color: 'text-pink-600' },
    { icon: HiCpuChip, title: '장비별신청', href: '/moafab/apply/equipment', color: 'text-indigo-600' },
    { icon: HiBeaker, title: '모아팹지원사업', href: '/moafab/apply/moafab', color: 'text-cyan-600' },
    { icon: HiChartBar, title: '서비스모니터링', href: '/moafab/status/monitoring', color: 'text-emerald-600' },
  ]

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-background dark:to-blue-950/20">
      {/* 배경 패턴 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* 장식 요소 */}
      <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-purple-400/20 blur-3xl" />
      </div>
      <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 transform">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28 lg:py-32",
        settings.layout.containerWidth === 'full' && "max-w-full",
        settings.layout.containerWidth === 'wide' && "max-w-7xl",
        settings.layout.containerWidth === 'narrow' && "max-w-5xl"
      )}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 텍스트 콘텐츠 */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                <HiClock className="w-3 h-3 mr-1" />
                실시간 예약 가능
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                6개 기관 통합
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block">첨단 나노팹</span>
                <span className="block text-primary">
                  통합 서비스 플랫폼
                </span>
                <span className="block">MOAFAB</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                국내 6개 주요 나노팹 연구기관의 최첨단 장비와 
                전문 인력이 여러분의 연구개발을 지원합니다.
              </p>
            </div>

            {/* 주요 서비스 바로가기 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="group flex flex-col items-center justify-center p-4 bg-background/80 backdrop-blur border rounded-lg hover:shadow-md hover:border-primary/50 transition-all"
                >
                  <item.icon className={`h-6 w-6 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-center">{item.title}</span>
                </Link>
              ))}
            </div>

            {/* 신뢰 지표 */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HiCheckCircle className="h-5 w-5 text-green-600" />
                <span>연간 10,000+ 프로젝트 수행</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HiShieldCheck className="h-5 w-5 text-blue-600" />
                <span>ISO 9001 인증</span>
              </div>
            </div>
          </div>

          {/* 오른쪽: 통계 카드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-background/80 backdrop-blur border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">보유 장비</div>
              </div>
              <div className="bg-background/80 backdrop-blur border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">온라인 예약</div>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-background/80 backdrop-blur border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary">6개</div>
                <div className="text-sm text-muted-foreground mt-1">참여 기관</div>
              </div>
              <div className="bg-background/80 backdrop-blur border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-1">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}