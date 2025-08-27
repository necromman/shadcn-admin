import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  HiArrowRight, 
  HiPlayCircle,
  HiClock,
  HiPhone,
  HiCheckCircle,
  HiShieldCheck
} from 'react-icons/hi2'

import { HeroPopup } from './hero-popup'
import { OptionsPanel } from './options-panel'
import { StatsCards } from './stats-cards'
import { DEFAULT_POPUP_DATA } from './popup-data'
import { calculatePosition } from './utils'
import type { PopupData, PopupConfig, PopupPosition, PopupLayout, HeroStyle } from './types'

// 메인 히어로 섹션
export function DSHeroEnterpriseV2() {
  // 팝업 데이터 상태
  const [popups, setPopups] = useState<PopupData[]>(DEFAULT_POPUP_DATA)

  // 팝업 설정 상태 (단순화된 기본값)
  const [popupConfig, setPopupConfig] = useState<PopupConfig>({
    maxPopups: 3,
    position: 'left' as PopupPosition,
    layout: 'horizontal' as PopupLayout,
    enableBlur: true,
    showDebug: false,  // 디버깅 정보 표시 여부
    animationSpeed: 'normal'
  })

  // 히어로 섹션 설정
  const [heroStyle, setHeroStyle] = useState<HeroStyle>('image')
  const heroBackground = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80'
  const [showStats, setShowStats] = useState(true)

  // 팝업 닫기 핸들러
  const handleClosePopup = (id: string) => {
    setPopups(prev => prev.map(p => 
      p.id === id ? { ...p, isVisible: false } : p
    ))
  }

  // 표시 개수 변경 시 자동으로 팝업 체크 상태 업데이트
  useEffect(() => {
    setPopups(prev => prev.map((popup, index) => ({
      ...popup,
      isVisible: index < popupConfig.maxPopups
    })))
  }, [popupConfig.maxPopups])

  // 표시할 팝업들
  const visiblePopups = useMemo(() => {
    return popups
      .filter(p => p.isVisible)
      .slice(0, popupConfig.maxPopups)
  }, [popups, popupConfig.maxPopups])

  return (
    <>
      {/* 콘텐츠 표시 옵션 - 고도화된 버전 */}
      <OptionsPanel
        popups={popups}
        setPopups={setPopups}
        popupConfig={popupConfig}
        setPopupConfig={setPopupConfig}
        heroStyle={heroStyle}
        setHeroStyle={setHeroStyle}
        showStats={showStats}
        setShowStats={setShowStats}
      />

      {/* 메인 히어로 셉션 */}
      <section className="relative w-full overflow-hidden min-h-[700px]">
        {/* 팝업 활성화 시 블러 오버레이 */}
        {visiblePopups.length > 0 && popupConfig.enableBlur && (
          <div className="absolute inset-0 z-30 bg-background/20 backdrop-blur-sm" />
        )}
        
        {/* 배경 */}
        <div className="absolute inset-0">
          {heroStyle === 'gradient' && (
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
          )}
          {heroStyle === 'image' && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
              style={{ backgroundImage: `url(${heroBackground})` }}
            />
          )}
          {heroStyle === 'video' && (
            <div className="absolute inset-0 bg-muted/5">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <HiPlayCircle className="w-32 h-32 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* 팝업들 - 히어로 섹션 내부에 표시 */}
        {visiblePopups.map((popup, index) => (
          <HeroPopup 
            key={popup.id}
            data={popup}
            onClose={handleClosePopup}
            position={calculatePosition(index, popupConfig.position, popupConfig.layout, visiblePopups.length)}
            zIndex={40 + index}
            showDebug={popupConfig.showDebug}
            animationSpeed={popupConfig.animationSpeed}
          />
        ))}

        {/* 메인 콘텐츠 */}
        <div className={`container relative z-10 py-24 md:py-32 lg:py-40 transition-all duration-300 ${visiblePopups.length > 0 && popupConfig.enableBlur ? 'blur-sm' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  <HiClock className="w-3 h-3 mr-1" />
                  2025 신제품 출시
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

            {/* 오른쪽: Linear 스타일 카드 */}
            {showStats && <StatsCards />}
          </div>

          {/* 하단 고객사 로고 */}
          <div className={`mt-16 pt-8 border-t transition-all duration-300 ${visiblePopups.length > 0 && popupConfig.enableBlur ? 'blur-sm' : ''}`}>
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