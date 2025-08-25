import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { 
  HiArrowRight, 
  HiPlayCircle, 
  HiXMark,
  HiCheckCircle,
  HiShieldCheck,
  HiClock,
  HiUsers,
  HiChartBar,
  HiDocumentText,
  HiPhone
} from 'react-icons/hi2'

// 팝업 알림 컴포넌트
function HeroPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-4 top-20 z-20 w-80 animate-in slide-in-from-left-5 duration-500">
      <Card className="relative overflow-hidden border-primary/20 bg-background/95 backdrop-blur shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">실시간 알림</span>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HiXMark className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">신규 고객사 계약 체결</p>
                <p className="text-xs text-muted-foreground">삼성전자 - 연간 라이선스 계약</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <HiShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">보안 인증 획득</p>
                <p className="text-xs text-muted-foreground">ISO 27001 인증 완료</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <HiUsers className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">사용자 1만명 돌파</p>
                <p className="text-xs text-muted-foreground">전월 대비 23% 증가</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <Button size="sm" variant="ghost" className="w-full justify-start text-xs">
              모든 알림 보기
              <HiArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// 메인 히어로 섹션
export function DSHeroEnterprise() {
  const [showPopup, setShowPopup] = useState(true)
  const [heroStyle, setHeroStyle] = useState<'gradient' | 'image' | 'video'>('gradient')
  const [showStats, setShowStats] = useState(true)

  return (
    <>
      {/* 히어로 설정 컨트롤 */}
      <div className="container mb-6">
        <Card className="p-4 bg-muted/30">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">배경 스타일:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={heroStyle === 'gradient' ? 'default' : 'outline'}
                  onClick={() => setHeroStyle('gradient')}
                >
                  그라데이션
                </Button>
                <Button
                  size="sm"
                  variant={heroStyle === 'image' ? 'default' : 'outline'}
                  onClick={() => setHeroStyle('image')}
                >
                  이미지
                </Button>
                <Button
                  size="sm"
                  variant={heroStyle === 'video' ? 'default' : 'outline'}
                  onClick={() => setHeroStyle('video')}
                >
                  비디오
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPopup}
                  onChange={(e) => setShowPopup(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">팝업 표시</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showStats}
                  onChange={(e) => setShowStats(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">통계 표시</span>
              </label>
            </div>
          </div>
        </Card>
      </div>

      {/* 메인 히어로 섹션 */}
      <section className="relative w-full overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0">
          {heroStyle === 'gradient' && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
          )}
          {heroStyle === 'image' && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)' }}
            />
          )}
          {heroStyle === 'video' && (
            <div className="absolute inset-0 bg-primary/5">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <HiPlayCircle className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          )}
        </div>

        {/* 팝업 알림 */}
        {showPopup && <HeroPopup onClose={() => setShowPopup(false)} />}

        {/* 메인 콘텐츠 */}
        <div className="container relative z-10 py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  <HiClock className="w-3 h-3 mr-1" />
                  2024 신제품 출시
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  업계 1위
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="block">비즈니스 혁신을 위한</span>
                  <span className="block text-primary">
                    차세대 엔터프라이즈
                  </span>
                  <span className="block">솔루션</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  대한민국 500대 기업이 선택한 업무 자동화 플랫폼.
                  AI 기반 워크플로우로 업무 생산성을 획기적으로 향상시키세요.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="min-w-[160px]">
                  무료 체험 시작
                  <HiArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  <HiPlayCircle className="mr-2 h-5 w-5" />
                  제품 소개 영상
                </Button>
                <Button size="lg" variant="ghost" className="min-w-[160px]">
                  <HiPhone className="mr-2 h-4 w-4" />
                  상담 문의
                </Button>
              </div>

              {/* 신뢰 지표 */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">정부 인증 솔루션</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiShieldCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">보안 1등급</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 통계 카드 */}
            {showStats && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-background/50 backdrop-blur border-primary/10">
                  <HiUsers className="w-8 h-8 text-primary mb-3" />
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">10,000+</p>
                    <p className="text-sm text-muted-foreground">활성 사용자</p>
                    <p className="text-xs text-green-500">↑ 23% 증가</p>
                  </div>
                </Card>

                <Card className="p-6 bg-background/50 backdrop-blur border-primary/10">
                  <HiChartBar className="w-8 h-8 text-primary mb-3" />
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">99.9%</p>
                    <p className="text-sm text-muted-foreground">서비스 가동률</p>
                    <p className="text-xs text-blue-500">업계 최고 수준</p>
                  </div>
                </Card>

                <Card className="p-6 bg-background/50 backdrop-blur border-primary/10">
                  <HiDocumentText className="w-8 h-8 text-primary mb-3" />
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">500+</p>
                    <p className="text-sm text-muted-foreground">대기업 고객사</p>
                    <p className="text-xs text-purple-500">삼성, LG, 현대 등</p>
                  </div>
                </Card>

                <Card className="p-6 bg-background/50 backdrop-blur border-primary/10">
                  <HiShieldCheck className="w-8 h-8 text-primary mb-3" />
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">ISO 27001</p>
                    <p className="text-sm text-muted-foreground">보안 인증</p>
                    <p className="text-xs text-green-500">국제 표준 준수</p>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* 하단 고객사 로고 */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-center text-sm text-muted-foreground mb-6">
              국내외 주요 기업들이 신뢰하는 솔루션
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold">SAMSUNG</div>
              <div className="text-2xl font-bold">LG</div>
              <div className="text-2xl font-bold">현대</div>
              <div className="text-2xl font-bold">SK</div>
              <div className="text-2xl font-bold">POSCO</div>
              <div className="text-2xl font-bold">NAVER</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// 다양한 스타일의 히어로 섹션 변형
export function DSHeroVariants() {
  return (
    <div className="space-y-12">
      {/* 엔터프라이즈 히어로 */}
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">엔터프라이즈 히어로</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                대기업 및 공공기관을 위한 전문적인 히어로 섹션. 팝업 알림, 통계 카드, 고객사 로고 등 포함.
              </p>
            </div>
          </div>
        </div>
        <DSHeroEnterprise />
      </div>

      {/* 기본 히어로 */}
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">심플 히어로</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                스타트업 및 중소기업을 위한 깔끔한 히어로 섹션. 핵심 메시지와 CTA에 집중.
              </p>
            </div>
          </div>
        </div>
        <SimpleHero />
      </div>
    </div>
  )
}

// 심플한 히어로 섹션
function SimpleHero() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge className="mb-4">
            ✨ 새로운 기능 출시
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            더 나은 내일을 위한
            <span className="text-primary"> 디지털 혁신</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            복잡한 업무를 간단하게. AI와 자동화 기술로 비즈니스 프로세스를 혁신하세요.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button size="lg">
              시작하기
            </Button>
            <Button size="lg" variant="outline">
              자세히 알아보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}