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

// 팝업 컴포넌트
interface PopupProps {
  type: 'notice' | 'advertisement'
  onClose: () => void
  backgroundImage?: string
}

function HeroPopup({ type, onClose, backgroundImage }: PopupProps) {
  if (type === 'advertisement') {
    return (
      <div className="absolute left-6 top-24 z-20 w-[420px] animate-in slide-in-from-left-5 duration-500">
        <Card className="relative overflow-hidden border-0 shadow-2xl">
          {/* 배경 이미지 */}
          {backgroundImage && (
            <div 
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
            />
          )}
          
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/30 transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
          
          {/* 광고 콘텐츠 */}
          <div className="relative p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                🎊 기간 한정 특가
              </Badge>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  연말 빅세일 최대 70% 할인
                </h3>
                <p className="text-white/90">
                  엔터프라이즈 플랜 연간 구독 시 추가 3개월 무료!
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <HiClock className="w-4 h-4" />
                  <span>12월 31일까지</span>
                </div>
                <div className="w-px h-4 bg-white/30" />
                <div className="flex items-center gap-1">
                  <HiUsers className="w-4 h-4" />
                  <span>선착순 100개 기업</span>
                </div>
              </div>
              
              <div className="pt-2 space-y-2">
                <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
                  지금 구매하기
                  <HiArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                  자세히 알아보기
                </Button>
              </div>
            </div>
          </div>
          
          {/* 하단 타이머 */}
          <div className="relative bg-black/80 text-white p-3">
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-white/60">남은 시간</span>
              <div className="flex gap-2 font-mono font-bold">
                <span className="bg-white/10 px-2 py-1 rounded">23</span>
                <span>:</span>
                <span className="bg-white/10 px-2 py-1 rounded">59</span>
                <span>:</span>
                <span className="bg-white/10 px-2 py-1 rounded">47</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
  
  // 공지 타입 팝업
  return (
    <div className="absolute left-6 top-24 z-20 w-[400px] animate-in slide-in-from-left-5 duration-500">
      <Card className="relative overflow-hidden border-primary/20 bg-background/95 backdrop-blur shadow-xl">
        {/* 배경 이미지 */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
          />
        )}
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        
        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-base font-semibold">중요 공지사항</span>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <HiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">시스템 업데이트 완료</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    v2.5.0 업데이트가 성공적으로 완료되었습니다. 새로운 대시보드와 향상된 성능을 경험해보세요.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <HiShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">보안 정책 변경</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    2024년 1월 1일부터 2단계 인증이 의무화됩니다.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <HiUsers className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-900 dark:text-purple-100">신규 기능 출시</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    팀 협업을 위한 실시간 편집 기능이 추가되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t flex gap-2">
            <Button size="sm" className="flex-1">
              자세히 보기
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              모든 공지 확인
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
  const [popupType, setPopupType] = useState<'notice' | 'advertisement'>('notice')
  const [popupBackground, setPopupBackground] = useState('')
  const [heroStyle, setHeroStyle] = useState<'gradient' | 'image' | 'video'>('image')
  const [heroBackground, setHeroBackground] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')
  const [showStats, setShowStats] = useState(true)

  return (
    <>
      {/* 히어로 설정 컨트롤 */}
      <div className="container mb-6">
        <Card className="p-4 bg-muted/30">
          <div className="space-y-4">
            {/* 첫 번째 줄: 히어로 설정 */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">히어로 배경:</span>
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
              
              {heroStyle === 'image' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">이미지 URL:</span>
                  <input
                    type="text"
                    value={heroBackground}
                    onChange={(e) => setHeroBackground(e.target.value)}
                    placeholder="https://..."
                    className="px-2 py-1 text-sm border rounded-md w-64"
                  />
                </div>
              )}
              
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
            
            {/* 두 번째 줄: 팝업 설정 */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPopup}
                  onChange={(e) => setShowPopup(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">팝업 표시</span>
              </label>
              
              {showPopup && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">팝업 타입:</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={popupType === 'notice' ? 'default' : 'outline'}
                        onClick={() => setPopupType('notice')}
                      >
                        공지사항
                      </Button>
                      <Button
                        size="sm"
                        variant={popupType === 'advertisement' ? 'default' : 'outline'}
                        onClick={() => setPopupType('advertisement')}
                      >
                        광고
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">팝업 배경:</span>
                    <input
                      type="text"
                      value={popupBackground}
                      onChange={(e) => setPopupBackground(e.target.value)}
                      placeholder="배경 이미지 URL (선택사항)"
                      className="px-2 py-1 text-sm border rounded-md w-64"
                    />
                  </div>
                </>
              )}
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
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${heroBackground})` }}
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
        {showPopup && (
          <HeroPopup 
            type={popupType}
            onClose={() => setShowPopup(false)}
            backgroundImage={popupBackground}
          />
        )}

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