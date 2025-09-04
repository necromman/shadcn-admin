import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OperationHour {
  id: string
  label: string
  time: string
  isActive?: boolean
  note?: string
}

const operationHours: OperationHour[] = [
  { id: 'weekday', label: '평일', time: '09:00 - 22:00', isActive: true },
  { id: 'saturday', label: '토요일', time: '10:00 - 18:00' },
  { id: 'sunday', label: '일요일', time: '10:00 - 17:00' },
  { id: 'holiday', label: '공휴일', time: '휴관', note: '대체공휴일 포함' }
]

function getCurrentStatus() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  
  // 평일 (월-금)
  if (day >= 1 && day <= 5) {
    if (hour >= 9 && hour < 22) {
      return { status: 'open', label: '운영중', closeTime: '22:00' }
    }
    if (hour < 9) {
      return { status: 'closed', label: '운영전', openTime: '09:00' }
    }
    return { status: 'closed', label: '운영종료', openTime: '내일 09:00' }
  }
  
  // 토요일
  if (day === 6) {
    if (hour >= 10 && hour < 18) {
      return { status: 'open', label: '운영중', closeTime: '18:00' }
    }
    if (hour < 10) {
      return { status: 'closed', label: '운영전', openTime: '10:00' }
    }
    return { status: 'closed', label: '운영종료', openTime: '내일 10:00' }
  }
  
  // 일요일
  if (hour >= 10 && hour < 17) {
    return { status: 'open', label: '운영중', closeTime: '17:00' }
  }
  if (hour < 10) {
    return { status: 'closed', label: '운영전', openTime: '10:00' }
  }
  return { status: 'closed', label: '운영종료', openTime: '내일 09:00' }
}

export function LibraryOperationHours() {
  const currentStatus = getCurrentStatus()
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-border/40 bg-card/50 backdrop-blur h-full">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base">운영 시간</h3>
          <Badge 
            variant={currentStatus.status === 'open' ? 'default' : 'secondary'}
            className={cn(
              "font-medium",
              currentStatus.status === 'open' 
                ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" 
                : "bg-destructive/10 text-destructive border-destructive/20"
            )}
          >
            {currentStatus.status === 'open' ? '운영중' : '운영종료'}
          </Badge>
        </div>

        {/* Current Time Display */}
        <div className="flex-1 space-y-3">
          {/* Digital Clock */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-blue-50/80 dark:from-primary/5 dark:via-primary/10 dark:to-primary/5 border border-blue-200/50 dark:border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-600 dark:text-muted-foreground">현재 시간</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tabular-nums">
                  {currentHour.toString().padStart(2, '0')}
                </span>
                <span className="text-xl font-bold animate-pulse">:</span>
                <span className="text-2xl font-bold tabular-nums">
                  {currentMinute.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            {(currentStatus.closeTime || currentStatus.openTime) && (
              <div className="flex items-center justify-between pt-2 border-t border-blue-100 dark:border-primary/10">
                <span className="text-xs text-slate-600 dark:text-muted-foreground">
                  {currentStatus.status === 'open' ? '종료 시간' : '다음 운영'}
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-primary">
                  {currentStatus.closeTime || currentStatus.openTime}
                </span>
              </div>
            )}
          </div>

          {/* Schedule Grid */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-muted/30 text-center">
                <div className="text-[10px] text-slate-600 dark:text-muted-foreground mb-1">평일</div>
                <div className="text-xs font-semibold">09:00</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-muted/30 text-center">
                <div className="text-[10px] text-slate-600 dark:text-muted-foreground mb-1">토요일</div>
                <div className="text-xs font-semibold">10:00</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-muted/30 text-center">
                <div className="text-[10px] text-slate-600 dark:text-muted-foreground mb-1">일요일</div>
                <div className="text-xs font-semibold">10:00</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-muted/30 text-center">
                <div className="text-[10px] text-slate-600 dark:text-muted-foreground mb-1">마감</div>
                <div className="text-xs font-semibold">22:00</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-muted/30 text-center">
                <div className="text-[10px] text-slate-600 dark:text-muted-foreground mb-1">마감</div>
                <div className="text-xs font-semibold">18:00</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-muted/30 text-center">
                <div className="text-[10px] text-slate-600 dark:text-muted-foreground mb-1">마감</div>
                <div className="text-xs font-semibold">17:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-4 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10">
            <Info className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
            <span className="text-xs text-amber-700 dark:text-amber-500">
              시험기간 24시까지 연장 (12/1~12/20)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}