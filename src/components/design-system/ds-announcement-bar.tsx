import { useState } from 'react'
import { HiXMark, HiMegaphone, HiSparkles, HiArrowRight } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'

export function DSAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative w-full bg-gradient-to-r from-primary/95 to-primary dark:from-primary/90 dark:to-primary/80 text-primary-foreground">
      <div className="container">
        <div className="flex items-center justify-between py-2 px-4 text-sm">
          <div className="flex items-center gap-3 flex-1">
            {/* 아이콘 */}
            <div className="flex items-center gap-2">
              <HiMegaphone className="h-4 w-4 animate-pulse" />
              <HiSparkles className="h-3 w-3 text-primary-foreground/70" />
            </div>
            
            {/* 메시지 */}
            <div className="flex items-center gap-2 flex-1">
              <span className="font-medium">새로운 기능 출시!</span>
              <span className="text-primary-foreground/90 hidden sm:inline">
                AI 기반 코드 리뷰 기능이 추가되었습니다. 지금 바로 체험해보세요.
              </span>
              <span className="text-primary-foreground/90 sm:hidden">
                AI 코드 리뷰 기능 출시
              </span>
            </div>
            
            {/* CTA 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-1"
            >
              <span className="hidden sm:inline">자세히 보기</span>
              <span className="sm:hidden">보기</span>
              <HiArrowRight className="h-3 w-3" />
            </Button>
          </div>
          
          {/* 닫기 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-primary-foreground/10"
            onClick={() => setIsVisible(false)}
          >
            <HiXMark className="h-4 w-4" />
            <span className="sr-only">공지 닫기</span>
          </Button>
        </div>
      </div>
      
      {/* 하단 구분선 효과 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
    </div>
  )
}

// 다양한 스타일의 공지 바 예시
export function DSAnnouncementBarVariants() {
  return (
    <div className="space-y-8">
      {/* 기본 공지 */}
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">기본 공지 바</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                중요한 공지사항이나 새로운 기능 출시를 알릴 때 사용. 그라데이션 배경과 애니메이션 효과로 주목도를 높임.
              </p>
            </div>
          </div>
        </div>
        <DSAnnouncementBar />
      </div>
      
      {/* 심플 공지 */}
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">심플 공지 바</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                시스템 점검이나 일시적 안내 등 간단한 정보 전달용. 미니멀한 디자인으로 사용자 경험을 방해하지 않음.
              </p>
            </div>
          </div>
        </div>
        <SimpleAnnouncementBar />
      </div>
      
      {/* 이벤트 공지 */}
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">이벤트 프로모션 바</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                특별 할인, 시즌 이벤트 등 마케팅 프로모션용. 화려한 색상과 CTA 버튼으로 전환율 극대화.
              </p>
            </div>
          </div>
        </div>
        <EventAnnouncementBar />
      </div>
    </div>
  )
}

// 심플한 스타일
function SimpleAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full bg-muted/50 dark:bg-muted/30 border-b">
      <div className="container">
        <div className="flex items-center justify-center py-2 px-4 text-sm">
          <div className="flex items-center gap-2 text-center">
            <span className="text-muted-foreground">📢</span>
            <span>시스템 점검 안내: 12월 25일 02:00 - 04:00 (2시간)</span>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <HiXMark className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 이벤트 스타일
function EventAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
      <div className="container">
        <div className="flex items-center justify-between py-2.5 px-4 text-sm">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-lg">🎉</span>
            <div className="flex-1">
              <span className="font-semibold">연말 특별 할인!</span>
              <span className="ml-2 opacity-90">모든 프로 플랜 50% 할인 (12/31까지)</span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              지금 구매하기
            </Button>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-3 text-white/70 hover:text-white transition-colors"
          >
            <HiXMark className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}