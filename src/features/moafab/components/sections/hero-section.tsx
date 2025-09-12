import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  HiClock, 
  HiPhone, 
  HiCheckCircle, 
  HiShieldCheck, 
  HiDocumentText, 
  HiChartBar, 
  HiBeaker, 
  HiCpuChip,
  HiArrowRight,
  HiSparkles,
  HiBuildingOffice2,
  HiWrenchScrewdriver
} from 'react-icons/hi2'
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
        <div className="max-w-6xl mx-auto">
          {/* 중앙 정렬 콘텐츠 */}
          <div className="text-center space-y-8">
            {/* 배지 */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge variant="secondary" className="px-4 py-1.5 bg-primary/10 border-primary/20">
                <HiClock className="w-3.5 h-3.5 mr-1.5" />
                실시간 예약 가능
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5">
                <HiBuildingOffice2 className="w-3.5 h-3.5 mr-1.5" />
                6개 기관 통합 플랫폼
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5">
                <HiWrenchScrewdriver className="w-3.5 h-3.5 mr-1.5" />
                950+ 첨단 장비 보유
              </Badge>
            </div>

            {/* 타이틀 */}
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-2xl opacity-75" />
                <h1 className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    첨단 나노팹 통합 서비스
                  </span>
                  <span className="block text-primary mt-2">
                    MOAFAB
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <p>국내 주요 나노팹 연구기관의 최첨단 장비와</p>
                <p>전문 인력이 여러분의 연구개발을 지원합니다.</p>               
              </p>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="min-w-[200px] h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <HiSparkles className="mr-2 h-5 w-5" />
                장비 검색 바로가기
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] h-12 text-base font-medium hover:bg-accent transition-all duration-300">
                <HiPhone className="mr-2 h-5 w-5" />
                상담 신청하기
              </Button>
            </div>

            {/* 주요 서비스 바로가기 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-5xl mx-auto pt-8">
              {quickMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="group relative flex flex-col items-center justify-center p-4 bg-background/90 backdrop-blur border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  <item.icon className={cn(
                    "h-7 w-7 mb-2 transition-all duration-300 group-hover:scale-110",
                    item.color
                  )} />
                  <span className="text-xs font-medium text-center relative">{item.title}</span>
                </Link>
              ))}
            </div>

            {/* 신뢰 지표 */}
            {/* <div className="flex flex-wrap items-center justify-center gap-8 pt-12 pb-4">
              <div className="flex items-center gap-2.5 text-sm">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                  <HiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-medium">전문 연구진 상주</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <HiShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium">안전한 실험 환경</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <HiSparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-medium">체계적인 품질 관리</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}