import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Users, Wrench, GraduationCap, FlaskConical } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 예약 현황 데이터
const reservationData = [
  { id: 1, date: 15, type: 'equipment', title: 'SEM 장비 예약', time: '14:00-16:00', status: 'confirmed' },
  { id: 2, date: 18, type: 'education', title: '나노공정 교육', time: '10:00-12:00', status: 'pending' },
  { id: 3, date: 22, type: 'analysis', title: 'XRD 분석', time: '09:00-11:00', status: 'confirmed' },
  { id: 4, date: 25, type: 'meeting', title: '기술 상담', time: '15:00-16:00', status: 'confirmed' },
]

// 타입별 색상
const typeColors = {
  equipment: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  education: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  analysis: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  meeting: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
}

// 타입별 아이콘
const typeIcons = {
  equipment: Wrench,
  education: GraduationCap,
  analysis: FlaskConical,
  meeting: Users
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ]

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    setSelectedDate(null)
  }

  // 해당 날짜에 예약이 있는지 확인
  const hasReservation = (day: number) => {
    return reservationData.some(r => r.date === day)
  }

  // 해당 날짜의 예약 가져오기
  const getReservations = (day: number) => {
    return reservationData.filter(r => r.date === day)
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            예약 현황
          </h3>
          <Badge variant="secondary" className="text-xs">
            {reservationData.length}건
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h4 className="font-medium text-sm">
              {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
            </h4>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <div
                key={day}
                className={`text-xs font-medium py-1 ${
                  index === 0 ? 'text-red-500' :
                  index === 6 ? 'text-blue-500' :
                  'text-gray-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((day, index) => {
              const isToday = day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
              const isSelected = day === selectedDate
              const hasEvent = day && hasReservation(day)
              const isSunday = index % 7 === 0
              const isSaturday = index % 7 === 6

              return (
                <div
                  key={index}
                  onClick={() => day && setSelectedDate(day)}
                  className={`
                    relative py-2 text-xs cursor-pointer rounded-md transition-all
                    ${!day ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                    ${isToday ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                    ${isSelected && !isToday ? 'bg-gray-200 dark:bg-gray-700' : ''}
                    ${isSunday && day && !isToday ? 'text-red-500' : ''}
                    ${isSaturday && day && !isToday ? 'text-blue-500' : ''}
                  `}
                >
                  {day || ''}
                  {hasEvent && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 선택된 날짜의 예약 현황 */}
        {selectedDate && getReservations(selectedDate).length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-400">
              {selectedDate}일 예약
            </h4>
            <div className="space-y-2">
              {getReservations(selectedDate).map((reservation) => {
                const Icon = typeIcons[reservation.type as keyof typeof typeIcons]
                return (
                  <div key={reservation.id} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                    <Icon className="w-3 h-3 mt-0.5 text-gray-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-1">{reservation.title}</p>
                      <p className="text-[10px] text-muted-foreground">{reservation.time}</p>
                    </div>
                    <Badge
                      variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}
                      className="text-[10px] px-1 py-0 h-4"
                    >
                      {
                        reservation.status === 'confirmed' ? '확정' : '대기'
                      }
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 예약 버튼 */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button className="w-full" size="sm">
            예약하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}