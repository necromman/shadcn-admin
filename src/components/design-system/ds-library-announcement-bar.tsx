import { useState } from 'react'
import { HiXMark, HiCalendarDays, HiExclamationTriangle, HiBookOpen } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

// 도서관 공지사항 바
export function DSLibraryAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white">
      <div className="container">
        <div className="flex items-center justify-between py-2 px-4 text-sm">
          <div className="flex items-center gap-3 flex-1">
            {/* 아이콘 */}
            <div className="flex items-center gap-2">
              <HiCalendarDays className="h-4 w-4 animate-pulse" />
            </div>
            
            {/* 메시지 */}
            <div className="flex items-center gap-2 flex-1">
              <span className="font-medium">2025학년도 겨울방학 특별 개관</span>
              <span className="text-white/90 hidden sm:inline">
                방학 중에도 도서관을 이용하실 수 있습니다. (09:00 - 18:00)
              </span>
              <span className="text-white/90 sm:hidden">
                09:00 - 18:00
              </span>
            </div>
            
            {/* CTA 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-white hover:bg-white/10 hover:text-white gap-1"
            >
              <span>자세히</span>
            </Button>
          </div>
          
          {/* 닫기 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-white/10"
            onClick={() => setIsVisible(false)}
          >
            <HiXMark className="h-4 w-4" />
            <span className="sr-only">공지 닫기</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

// 다양한 도서관 공지 스타일
export function DSLibraryAnnouncementBarVariants() {
  const [showVariants, setShowVariants] = useState({
    hours: true,
    maintenance: false,
    event: false
  })

  const toggleVariant = (variant: keyof typeof showVariants) => {
    setShowVariants(prev => ({
      ...prev,
      [variant]: !prev[variant]
    }))
  }

  return (
    <div className="space-y-8">
      {/* 콘텐츠 표시 옵션 */}
      <div className="container">
        <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiBookOpen className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
            <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">도서관 공지 표시 옵션</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-hours"
                checked={showVariants.hours}
                onCheckedChange={() => toggleVariant('hours')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label
                htmlFor="show-hours"
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                운영시간 안내
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-maintenance"
                checked={showVariants.maintenance}
                onCheckedChange={() => toggleVariant('maintenance')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label
                htmlFor="show-maintenance"
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                시스템 점검 안내
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-event"
                checked={showVariants.event}
                onCheckedChange={() => toggleVariant('event')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label
                htmlFor="show-event"
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                도서관 이벤트
              </Label>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
            도서관 운영 관련 중요 공지사항을 상단에 표시합니다
          </p>
        </div>
      </div>

      {/* 운영시간 안내 */}
      {showVariants.hours && (
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">운영시간 안내</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                도서관 개관 시간 변경, 특별 개관, 휴관일 등을 안내합니다.
              </p>
            </div>
          </div>
        </div>
        <DSLibraryAnnouncementBar />
      </div>
      )}
      
      {/* 시스템 점검 */}
      {showVariants.maintenance && (
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">시스템 점검 안내</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                도서관 시스템 점검으로 인한 서비스 일시 중단을 안내합니다.
              </p>
            </div>
          </div>
        </div>
        <MaintenanceAnnouncementBar />
      </div>
      )}
      
      {/* 도서관 이벤트 */}
      {showVariants.event && (
      <div className="space-y-4">
        <div className="container">
          <div className="rounded-lg border bg-card dark:bg-card p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                <h3 className="text-base font-semibold text-foreground">도서관 이벤트</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-3.5">
                독서 캠페인, 문화 행사, 특별 프로그램 등을 안내합니다.
              </p>
            </div>
          </div>
        </div>
        <EventAnnouncementBar />
      </div>
      )}
    </div>
  )
}

// 시스템 점검 안내
function MaintenanceAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800">
      <div className="container">
        <div className="flex items-center justify-center py-2 px-4 text-sm">
          <div className="flex items-center gap-2 text-center text-amber-900 dark:text-amber-100">
            <HiExclamationTriangle className="h-4 w-4" />
            <span className="font-medium">시스템 점검 안내:</span>
            <span>1월 15일(월) 02:00 - 06:00 도서 검색 서비스 일시 중단</span>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors"
            >
              <HiXMark className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 이벤트 안내
function EventAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="container">
        <div className="flex items-center justify-between py-2.5 px-4 text-sm">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-lg">📚</span>
            <div className="flex-1">
              <span className="font-semibold">2025 겨울 독서 캠페인</span>
              <span className="ml-2 opacity-90">참여하고 도서 상품권 받아가세요!</span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              참여하기
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