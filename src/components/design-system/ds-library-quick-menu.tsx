import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  HiMagnifyingGlass,
  HiComputerDesktop,
  HiBookOpen,
  HiArrowPath,
  HiArrowRight,
  HiSparkles
} from 'react-icons/hi2'

interface QuickMenuItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgGradient: string
  stats?: string
}

const quickMenuItems: QuickMenuItem[] = [
  {
    id: 'search',
    title: '자료검색',
    description: '도서, 논문, 전자자료 통합검색',
    icon: HiMagnifyingGlass,
    color: 'text-blue-600 dark:text-blue-400',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20',
    stats: '250만권+'
  },
  {
    id: 'seat',
    title: '좌석예약',
    description: '열람실 실시간 좌석 확인 및 예약',
    icon: HiComputerDesktop,
    color: 'text-green-600 dark:text-green-400',
    bgGradient: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20',
    stats: '잔여 152석'
  },
  {
    id: 'request',
    title: '희망도서',
    description: '원하는 도서 신청하기',
    icon: HiBookOpen,
    color: 'text-purple-600 dark:text-purple-400',
    bgGradient: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20',
    stats: '월 30권'
  },
  {
    id: 'extend',
    title: '대출연장',
    description: '대출 도서 반납일 연장',
    icon: HiArrowPath,
    color: 'text-orange-600 dark:text-orange-400',
    bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20',
    stats: '최대 2회'
  }
]

export function DSLibraryQuickMenu() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HiSparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">빠른 서비스</h2>
          <span className="text-sm text-muted-foreground">자주 사용하는 서비스를 빠르게 이용하세요</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute inset-0 ${item.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
              <CardContent className="relative p-6">
                <div className="space-y-4">
                  {/* 아이콘 영역 */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm ${item.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <HiArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* 통계 정보 */}
                  {item.stats && (
                    <div className="pt-2 border-t border-border/50">
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.stats}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 모바일 대응 간소화 버전 */}
      <div className="mt-6 lg:hidden">
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <p className="text-sm text-center text-muted-foreground">
              모바일에서도 모든 서비스를 편리하게 이용하실 수 있습니다
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 추가 액션 버튼들 - 데스크톱에서만 표시 */}
      <div className="hidden lg:flex justify-center gap-4 mt-8">
        <Button variant="outline" size="sm">
          도서관 이용안내
        </Button>
        <Button variant="outline" size="sm">
          모바일 앱 다운로드
        </Button>
        <Button variant="outline" size="sm">
          자주 묻는 질문
        </Button>
      </div>
    </div>
  )
}