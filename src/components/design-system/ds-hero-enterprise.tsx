import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  HiArrowRight, 
  HiPlayCircle, 
  HiXMark,
  HiCheckCircle,
  HiShieldCheck,
  HiClock,
  HiPhone,
  HiSparkles,
  HiRocketLaunch,
  HiBeaker
} from 'react-icons/hi2'

// 팝업 컴포넌트
interface PopupProps {
  type: 'text' | 'image'
  onClose: () => void
  imageUrl?: string
}

function HeroPopup({ type, onClose, imageUrl }: PopupProps) {
  // 이미지 중심 팝업 (제품 출시/이벤트)
  if (type === 'image') {
    return (
      <div className="absolute inset-x-0 top-0 z-40 flex justify-center p-8">
        <div className="w-full max-w-md animate-in slide-in-from-top-5 duration-500 group">
          <Card className="relative border shadow-lg bg-background overflow-hidden flex flex-col py-0">
            {/* 오른쪽 상단 X 버튼 (호버시 표시) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
              aria-label="닫기"
            >
              <HiXMark className="w-4 h-4" />
            </button>
            
            {/* 상단 라벨 */}
            <div className="px-6 pt-6 pb-3">
              <Badge variant="secondary" className="mb-3">
                <HiSparkles className="w-3 h-3 mr-1" />
                신제품 출시
              </Badge>
              <h2 className="text-xl font-bold">
                AI 워크플로우 자동화 솔루션
                <span className="text-primary"> Pro 2.0</span> 출시
              </h2>
            </div>
            
            {/* 이미지 영역 */}
            <div className="px-6 pb-4">
              <div className="relative rounded-lg overflow-hidden bg-muted aspect-[16/9]">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <HiRocketLaunch className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">Product Image</div>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="mt-3 text-sm text-muted-foreground">
                업무 생산성을 200% 향상시키는 차세대 AI 솔루션을 만나보세요.
                지금 가입하시면 3개월 무료 체험 혜택을 드립니다.
              </p>
            </div>
            
            {/* CTA 버튼 */}
            <div className="px-6 pb-4">
              <Button className="w-full" size="lg">
                자세히 알아보기
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* 하단 옵션 */}
            <div className="flex border-t bg-background mt-auto">
              <button 
                type="button"
                className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose()
                }}
              >
                오늘 하루 보지 않기
              </button>
              <div className="w-px bg-border" />
              <button 
                type="button"
                className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose()
                }}
              >
                닫기
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }
  
  // 텍스트 중심 팝업 (공지사항/업데이트)
  return (
    <div className="absolute inset-x-0 top-0 z-40 flex justify-center p-8">
      <div className="w-full max-w-lg animate-in slide-in-from-top-5 duration-500 group">
        <Card className="relative border shadow-lg bg-background overflow-hidden flex flex-col py-0">
          {/* 오른쪽 상단 X 버튼 (호버시 표시) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            aria-label="닫기"
          >
            <HiXMark className="w-4 h-4" />
          </button>
          
          {/* 헤더 */}
          <div className="border-b px-6 py-4">
            <Badge className="mb-2">중요 공지</Badge>
            <h2 className="text-2xl font-bold">2025년 1분기 주요 업데이트</h2>
          </div>
          
          {/* 콘텐츠 */}
          <div className="px-6 pt-6 pb-4 space-y-4">
            {/* 주요 업데이트 항목들 */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <HiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">새로운 대시보드 UI 출시</h3>
                  <p className="text-sm text-muted-foreground">
                    더욱 직관적이고 사용하기 쉬운 인터페이스로 업그레이드되었습니다.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <HiShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">보안 강화 업데이트</h3>
                  <p className="text-sm text-muted-foreground">
                    2단계 인증 및 암호화 기술이 강화되어 더욱 안전해졌습니다.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <HiBeaker className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">AI 기능 베타 테스트</h3>
                  <p className="text-sm text-muted-foreground">
                    선착순 1,000명에게 AI 어시스턴트 베타 테스트 기회를 제공합니다.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 추가 정보 */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm">
                <HiClock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">업데이트 일정:</span>
                <span className="font-medium">2025년 1월 15일 00:00 KST</span>
              </div>
            </div>
          </div>
          
          {/* 액션 버튼 */}
          <div className="px-6 pb-4">
            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                업데이트 내용 자세히 보기
              </Button>
              <Button variant="outline" size="lg" onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}>
                나중에 확인
              </Button>
            </div>
          </div>
          
          {/* 하단 옵션 */}
          <div className="flex border-t bg-background mt-auto">
            <button 
              type="button"
              className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}
            >
              오늘 하루 보지 않기
            </button>
            <div className="w-px bg-border" />
            <button 
              type="button"
              className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}
            >
              닫기
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// 메인 히어로 섹션
export function DSHeroEnterprise() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<'text' | 'image'>('text')
  const [popupImageUrl, setPopupImageUrl] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')
  const [heroStyle, setHeroStyle] = useState<'gradient' | 'image' | 'video'>('image')
  const [heroBackground, setHeroBackground] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')
  const [showStats, setShowStats] = useState(true)
  const [enableBlur, setEnableBlur] = useState(true)

  return (
    <>
      {/* 콘텐츠 표시 옵션 - 표준 스타일 */}
      <div className="container mb-6">
        <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiBeaker className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
            <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">콘텐츠 표시 옵션</span>
          </div>
          
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
            </div>
            
            {/* 두 번째 줄: 통계 및 팝업 설정 */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-stats"
                  checked={showStats}
                  onCheckedChange={(checked) => setShowStats(checked as boolean)}
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="show-stats" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                  통계 카드 표시
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-popup"
                  checked={showPopup}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setShowPopup(checked)
                    }
                  }}
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="show-popup" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                  팝업 알림 표시
                </Label>
              </div>
              
              {showPopup && (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enable-blur-popup"
                      checked={enableBlur}
                      onCheckedChange={(checked) => setEnableBlur(checked as boolean)}
                      className="h-4 w-4 border-slate-400 dark:border-border"
                    />
                    <Label htmlFor="enable-blur-popup" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                      배경 블러 효과
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">팝업 타입:</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={popupType === 'text' ? 'default' : 'outline'}
                        onClick={() => setPopupType('text')}
                      >
                        텍스트 중심
                      </Button>
                      <Button
                        size="sm"
                        variant={popupType === 'image' ? 'default' : 'outline'}
                        onClick={() => setPopupType('image')}
                      >
                        이미지 중심
                      </Button>
                    </div>
                  </div>
                  
                  {popupType === 'image' && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">이미지 URL:</span>
                      <input
                        type="text"
                        value={popupImageUrl}
                        onChange={(e) => setPopupImageUrl(e.target.value)}
                        placeholder="https://... (선택사항)"
                        className="px-2 py-1 text-sm border rounded-md w-64"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            
            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
              히어로 섹션의 다양한 요소를 설정할 수 있습니다
            </p>
          </div>
        </div>
      </div>

      {/* 메인 히어로 섹션 */}
      <section className="relative w-full overflow-hidden">
        {/* 팝업 활성화 시 블러 오버레이 */}
        {showPopup && enableBlur && (
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

        {/* 팝업 알림 - 히어로 섹션 내부에만 표시 */}
        {showPopup && (
          <HeroPopup 
            type={popupType}
            onClose={() => setShowPopup(false)}
            imageUrl={popupImageUrl}
          />
        )}

        {/* 메인 콘텐츠 */}
        <div className={`container relative z-10 py-24 md:py-32 lg:py-40 transition-all duration-300 ${showPopup && enableBlur ? 'blur-sm' : ''}`}>
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
            {showStats && (
              <div className="grid grid-cols-2 gap-5">
                {/* OpenAI 스타일 카드 */}
                <a className="relative group block" href="#">
                  <div className="relative flex flex-col h-full">
                    {/* 카드 배경 */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
                        src="https://webassets.linear.app/images/ornj730p/production/14886f4b7fda983a8bb5ca58f754efe99eb20be4-264x224.svg"
                        alt=""
                      />
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="relative flex flex-col h-full p-6 min-h-[280px]">
                      {/* 아이콘 */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
                        <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                      
                      {/* 텍스트 */}
                      <div className="mt-auto space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                          빠른 실행과 복잡성 해결: BRAND 규모의 시스템 구축
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                          <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                               width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Ramp 스타일 카드 */}
                <a className="relative group block" href="#">
                  <div className="relative flex flex-col h-full">
                    {/* 카드 배경 */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-gray-950 overflow-hidden">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
                        src="https://webassets.linear.app/images/ornj730p/production/55b5622d01e51e774769e6a1634930514721e481-264x224.svg?q=95&auto=format&dpr=2"
                        alt=""
                      />
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="relative flex flex-col h-full p-6 min-h-[280px]">
                      {/* 아이콘 */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
                        <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      
                      {/* 텍스트 */}
                      <div className="mt-auto space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                          BRAND가 가장 빠른 제품 도구를 선택한 이유
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                          <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                               width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Brex 스타일 카드 */}
                <a className="relative group block" href="#">
                  <div className="relative flex flex-col h-full">
                    {/* 카드 배경 */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-950 overflow-hidden">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
                        src="https://webassets.linear.app/images/ornj730p/production/112f1325621c7c8f895bb3c06b194a8b8ace74f7-264x224.svg?q=95&auto=format&dpr=2"
                        alt=""
                      />
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="relative flex flex-col h-full p-6 min-h-[280px]">
                      {/* 아이콘 */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
                        <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M9 17V7m0 10l3-3m-3 3l-3-3m13 3V7m0 10l-3-3m3 3l3-3" />
                          <path d="M3 7h18M3 17h18" />
                        </svg>
                      </div>
                      
                      {/* 텍스트 */}
                      <div className="mt-auto space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                          "하나의 로드맵": BRAND가 분산된 계획을 통합한 방법
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                          <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                               width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Scale 스타일 카드 */}
                <a className="relative group block" href="#">
                  <div className="relative flex flex-col h-full">
                    {/* 카드 배경 */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-50 to-pink-100 dark:from-pink-950 dark:to-gray-950 overflow-hidden">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
                        src="https://webassets.linear.app/images/ornj730p/production/977ec25f3db253d02740e6aee3cce21dc38e3080-264x224.svg?q=95&auto=format&dpr=2"
                        alt=""
                      />
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="relative flex flex-col h-full p-6 min-h-[280px]">
                      {/* 아이콘 */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
                        <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 13h2l3-9 4 18 4-11h5" />
                        </svg>
                      </div>
                      
                      {/* 텍스트 */}
                      <div className="mt-auto space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                          Linear가 Scale의 고속 성장을 가속화
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                          <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                               width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* 하단 고객사 로고 */}
          <div className={`mt-16 pt-8 border-t transition-all duration-300 ${showPopup && enableBlur ? 'blur-sm' : ''}`}>
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
    <div className="space-y-4">
      {/* 엔터프라이즈 히어로만 표시 */}
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
  )
}