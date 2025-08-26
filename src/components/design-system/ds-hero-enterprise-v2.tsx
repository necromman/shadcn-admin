import { useState, useMemo, useEffect } from 'react'
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
  HiBeaker,
  HiBolt,
  HiCog6Tooth,
  HiMegaphone,
  HiGift,
  HiTrophy,
  HiAcademicCap
} from 'react-icons/hi2'

// 팝업 데이터 타입
interface PopupData {
  id: string
  type: 'text' | 'image'
  title: string
  badge: string
  badgeIcon: React.ElementType
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive'
  content: React.ReactNode
  imageUrl?: string
  isVisible: boolean
}

// 팝업 위치 타입
type PopupPosition = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

// 팝업 배치 타입
type PopupLayout = 'cascade' | 'vertical' | 'horizontal-lr' | 'horizontal-rl'

// 팝업 컴포넌트 Props
interface PopupProps {
  data: PopupData
  onClose: (id: string) => void
  position: { x: number, y: number }
  zIndex: number
}

// 팝업 컴포넌트
function HeroPopup({ data, onClose, position, zIndex }: PopupProps) {
  // 이미지 중심 팝업 (제품 출시/이벤트)
  if (data.type === 'image') {
    return (
      <div 
        className="absolute"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          zIndex 
        }}
      >
        <div className="w-full max-w-md animate-in slide-in-from-top-5 duration-500 group">
          <Card className="relative border shadow-lg bg-background overflow-hidden flex flex-col py-0">
            {/* 오른쪽 상단 X 버튼 (호버시 표시) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose(data.id)
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
              aria-label="닫기"
            >
              <HiXMark className="w-4 h-4" />
            </button>
            
            {/* 상단 라벨 */}
            <div className="px-6 pt-6 pb-3">
              <Badge variant={data.badgeVariant || 'secondary'} className="mb-3">
                {data.badgeIcon && <data.badgeIcon className="w-3 h-3 mr-1" />}
                {data.badge}
              </Badge>
              <h2 className="text-xl font-bold">
                {data.title}
              </h2>
            </div>
            
            {/* 이미지 영역 */}
            <div className="px-6 pb-4">
              <div className="relative rounded-lg overflow-hidden bg-muted aspect-[16/9]">
                {data.imageUrl ? (
                  <img 
                    src={data.imageUrl} 
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
              
              <div className="mt-3 text-sm text-muted-foreground">
                {data.content}
              </div>
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
                  onClose(data.id)
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
                  onClose(data.id)
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
    <div 
      className="absolute"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        zIndex 
      }}
    >
      <div className="w-full max-w-lg animate-in slide-in-from-top-5 duration-500 group">
        <Card className="relative border shadow-lg bg-background overflow-hidden flex flex-col py-0">
          {/* 오른쪽 상단 X 버튼 (호버시 표시) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose(data.id)
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            aria-label="닫기"
          >
            <HiXMark className="w-4 h-4" />
          </button>
          
          {/* 헤더 */}
          <div className="border-b px-6 py-4">
            <Badge variant={data.badgeVariant || 'default'} className="mb-2">
              {data.badgeIcon && <data.badgeIcon className="w-3 h-3 mr-1" />}
              {data.badge}
            </Badge>
            <h2 className="text-2xl font-bold">{data.title}</h2>
          </div>
          
          {/* 콘텐츠 */}
          <div className="px-6 pt-6 pb-4">
            {data.content}
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
                onClose(data.id)
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
                onClose(data.id)
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
                onClose(data.id)
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
export function DSHeroEnterpriseV2() {
  // 팝업 데이터 상태
  const [popups, setPopups] = useState<PopupData[]>([
    {
      id: 'popup-1',
      type: 'text',
      title: '2025년 1분기 주요 업데이트',
      badge: '중요 공지',
      badgeIcon: HiMegaphone,
      badgeVariant: 'default',
      isVisible: true,
      content: (
        <div className="space-y-4">
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
          
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <HiClock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">업데이트 일정:</span>
              <span className="font-medium">2025년 1월 15일 00:00 KST</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'popup-2',
      type: 'text',
      title: '연말 특별 이벤트 안내',
      badge: '이벤트',
      badgeIcon: HiGift,
      badgeVariant: 'secondary',
      isVisible: true,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <HiTrophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">최대 50% 할인 혜택</h3>
                <p className="text-sm text-muted-foreground">
                  모든 프로 플랜을 특별 가격으로 만나보세요. 12월 31일까지!
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                <HiGift className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">추가 3개월 무료 제공</h3>
                <p className="text-sm text-muted-foreground">
                  연간 구독 시 추가 3개월을 무료로 이용하실 수 있습니다.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <HiAcademicCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">무료 교육 프로그램</h3>
                <p className="text-sm text-muted-foreground">
                  신규 가입자를 위한 온라인 교육 프로그램을 무료로 제공합니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4">
            <div className="flex items-center gap-2 text-sm">
              <HiBolt className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="font-medium text-amber-900 dark:text-amber-300">남은 시간: 7일 12시간 34분</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'popup-3',
      type: 'text',
      title: '시스템 점검 안내',
      badge: '공지',
      badgeIcon: HiCog6Tooth,
      badgeVariant: 'outline',
      isVisible: true,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">정기 시스템 점검</h3>
              <p className="text-sm text-orange-800 dark:text-orange-400">
                서비스 품질 향상을 위한 정기 점검을 실시합니다.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <HiClock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold">점검 일시</div>
                  <div className="text-sm text-muted-foreground">
                    2025년 1월 5일 (일) 02:00 - 04:00 (2시간)
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <HiBeaker className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold">점검 내용</div>
                  <ul className="text-sm text-muted-foreground list-disc list-inside mt-1 space-y-1">
                    <li>데이터베이스 최적화</li>
                    <li>보안 패치 적용</li>
                    <li>서버 성능 개선</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-dashed bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground text-center">
              점검 시간 동안 서비스 이용이 제한될 수 있습니다
            </p>
          </div>
        </div>
      )
    }
  ])

  // 팝업 설정 상태 (기본값 설정)
  const [popupConfig, setPopupConfig] = useState({
    maxPopups: 3,
    position: 'center-left' as PopupPosition,
    layout: 'horizontal-lr' as PopupLayout,
    allowOverlap: false,
    enableBlur: true
  })

  // 히어로 섹션 설정
  const [heroStyle, setHeroStyle] = useState<'gradient' | 'image' | 'video'>('image')
  const [heroBackground, setHeroBackground] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')
  const [showStats, setShowStats] = useState(true)

  // 팝업 닫기 핸들러
  const handleClosePopup = (id: string) => {
    setPopups(prev => prev.map(p => 
      p.id === id ? { ...p, isVisible: false } : p
    ))
  }

  // 위치 계산 함수 (히어로 섹션 내부 기준)
  const calculatePosition = (index: number, position: PopupPosition, layout: PopupLayout) => {
    // 히어로 섹션의 높이를 고려한 위치 설정
    const heroHeight = 600 // 히어로 섹션의 대략적인 높이
    const popupWidth = 500
    const popupHeight = 400
    const padding = 20
    
    const basePositions = {
      'top-left': { x: padding, y: padding },
      'top-center': { x: (window.innerWidth - popupWidth) / 2, y: padding },
      'top-right': { x: window.innerWidth - popupWidth - padding, y: padding },
      'center-left': { x: padding, y: (heroHeight - popupHeight) / 2 },
      'center': { x: (window.innerWidth - popupWidth) / 2, y: (heroHeight - popupHeight) / 2 },
      'center-right': { x: window.innerWidth - popupWidth - padding, y: (heroHeight - popupHeight) / 2 },
      'bottom-left': { x: padding, y: heroHeight - popupHeight - padding },
      'bottom-center': { x: (window.innerWidth - popupWidth) / 2, y: heroHeight - popupHeight - padding },
      'bottom-right': { x: window.innerWidth - popupWidth - padding, y: heroHeight - popupHeight - padding }
    }

    const base = basePositions[position] || basePositions['center-left']
    let offsetX = 0
    let offsetY = 0

    if (popupConfig.allowOverlap) {
      switch (layout) {
        case 'cascade':
          offsetX = index * 30
          offsetY = index * 30
          break
        case 'vertical':
          offsetY = index * 450
          break
        case 'horizontal-lr':
          offsetX = index * 530
          break
        case 'horizontal-rl':
          offsetX = -index * 530
          break
      }
    } else {
      switch (layout) {
        case 'vertical':
          offsetY = index * 450
          break
        case 'horizontal-lr':
          offsetX = index * 530
          break
        case 'horizontal-rl':
          offsetX = -index * 530
          break
      }
    }

    return {
      x: Math.max(padding, Math.min(base.x + offsetX, window.innerWidth - popupWidth - padding)),
      y: Math.max(padding, Math.min(base.y + offsetY, heroHeight - popupHeight - padding))
    }
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
      <div className="container mb-6">
        <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiBeaker className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
            <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">콘텐츠 표시 옵션</span>
          </div>
          
          <div className="space-y-4">
            {/* 팝업 관리 */}
            <div className="space-y-3 pb-4 border-b">
              <div className="text-sm font-medium mb-2">팝업 설정</div>
              
              {/* 팝업 표시 개수 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-24">표시 개수:</span>
                <div className="flex gap-2">
                  {[1, 2, 3].map(num => (
                    <Button
                      key={num}
                      size="sm"
                      variant={popupConfig.maxPopups === num ? 'default' : 'outline'}
                      onClick={() => {
                        setPopupConfig(prev => ({ ...prev, maxPopups: num }))
                      }}
                      className="h-7 px-3"
                    >
                      {num}개
                    </Button>
                  ))}
                </div>
              </div>

              {/* 시작 위치 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-24">시작 위치:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'top-left', label: '상단 좌' },
                    { value: 'top-center', label: '상단 중' },
                    { value: 'top-right', label: '상단 우' },
                    { value: 'center-left', label: '중앙 좌' },
                    { value: 'center', label: '중앙' },
                    { value: 'center-right', label: '중앙 우' },
                    { value: 'bottom-left', label: '하단 좌' },
                    { value: 'bottom-center', label: '하단 중' },
                    { value: 'bottom-right', label: '하단 우' }
                  ].map(pos => (
                    <Button
                      key={pos.value}
                      size="sm"
                      variant={popupConfig.position === pos.value ? 'default' : 'outline'}
                      onClick={() => setPopupConfig(prev => ({ ...prev, position: pos.value as PopupPosition }))}
                      className="h-7 px-2 text-xs"
                    >
                      {pos.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 배치 방식 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-24">배치 방식:</span>
                <div className="flex gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="allow-overlap"
                      checked={popupConfig.allowOverlap}
                      onCheckedChange={(checked) => 
                        setPopupConfig(prev => ({ ...prev, allowOverlap: checked as boolean }))
                      }
                      className="h-4 w-4 border-slate-400 dark:border-border"
                    />
                    <Label htmlFor="allow-overlap" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                      겹치기 허용
                    </Label>
                  </div>
                  
                  {popupConfig.allowOverlap ? (
                    <Button
                      size="sm"
                      variant={popupConfig.layout === 'cascade' ? 'default' : 'outline'}
                      onClick={() => setPopupConfig(prev => ({ ...prev, layout: 'cascade' }))}
                      className="h-7 px-3"
                    >
                      계단형
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant={popupConfig.layout === 'vertical' ? 'default' : 'outline'}
                        onClick={() => setPopupConfig(prev => ({ ...prev, layout: 'vertical' }))}
                        className="h-7 px-3"
                      >
                        세로
                      </Button>
                      <Button
                        size="sm"
                        variant={popupConfig.layout === 'horizontal-lr' ? 'default' : 'outline'}
                        onClick={() => setPopupConfig(prev => ({ ...prev, layout: 'horizontal-lr' }))}
                        className="h-7 px-3"
                      >
                        가로(좌→우)
                      </Button>
                      <Button
                        size="sm"
                        variant={popupConfig.layout === 'horizontal-rl' ? 'default' : 'outline'}
                        onClick={() => setPopupConfig(prev => ({ ...prev, layout: 'horizontal-rl' }))}
                        className="h-7 px-3"
                      >
                        가로(우→좌)
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* 개별 팝업 토글 (표시 개수와 연동) */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-24">개별 표시:</span>
                <div className="flex gap-3">
                  {popups.map((popup, idx) => (
                    <div key={popup.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`popup-${popup.id}`}
                        checked={popup.isVisible}
                        disabled={idx >= popupConfig.maxPopups}
                        onCheckedChange={(checked) => {
                          // 표시 개수 범위 내에서만 변경 가능
                          if (idx < popupConfig.maxPopups) {
                            setPopups(prev => prev.map(p => 
                              p.id === popup.id ? { ...p, isVisible: checked as boolean } : p
                            ))
                          }
                        }}
                        className="h-4 w-4 border-slate-400 dark:border-border disabled:opacity-50"
                      />
                      <Label 
                        htmlFor={`popup-${popup.id}`} 
                        className={`cursor-pointer text-sm font-normal ${idx >= popupConfig.maxPopups ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}
                      >
                        팝업 {idx + 1}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enable-blur-popups"
                  checked={popupConfig.enableBlur}
                  onCheckedChange={(checked) => 
                    setPopupConfig(prev => ({ ...prev, enableBlur: checked as boolean }))
                  }
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="enable-blur-popups" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                  배경 블러 효과
                </Label>
              </div>
            </div>

            {/* 히어로 설정 */}
            <div className="space-y-3">
              <div className="text-sm font-medium mb-2">히어로 설정</div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">배경:</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={heroStyle === 'gradient' ? 'default' : 'outline'}
                      onClick={() => setHeroStyle('gradient')}
                      className="h-7 px-3"
                    >
                      그라데이션
                    </Button>
                    <Button
                      size="sm"
                      variant={heroStyle === 'image' ? 'default' : 'outline'}
                      onClick={() => setHeroStyle('image')}
                      className="h-7 px-3"
                    >
                      이미지
                    </Button>
                    <Button
                      size="sm"
                      variant={heroStyle === 'video' ? 'default' : 'outline'}
                      onClick={() => setHeroStyle('video')}
                      className="h-7 px-3"
                    >
                      비디오
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-stats-v2"
                    checked={showStats}
                    onCheckedChange={(checked) => setShowStats(checked as boolean)}
                    className="h-4 w-4 border-slate-400 dark:border-border"
                  />
                  <Label htmlFor="show-stats-v2" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                    통계 카드 표시
                  </Label>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
              팝업 배치와 히어로 섹션을 세밀하게 조정할 수 있습니다
            </p>
          </div>
        </div>
      </div>

      {/* 메인 히어로 섹션 */}
      <section className="relative w-full overflow-hidden min-h-[600px]">
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
            position={calculatePosition(index, popupConfig.position, popupConfig.layout)}
            zIndex={40 + index}
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