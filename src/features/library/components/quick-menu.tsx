import { Card, CardContent } from '@/components/ui/card'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { cn } from '@/lib/utils'
import { 
  Search,
  Calendar,
  BookOpen,
  RotateCcw
} from 'lucide-react'

interface QuickMenuItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  href: string
}

// 빠른 메뉴 데이터
const quickMenuItems: QuickMenuItem[] = [
  {
    id: 'search',
    title: '자료 검색',
    description: '도서, 논문, 멀티미디어 검색',
    icon: Search,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    href: '/library/search'
  },
  {
    id: 'seat',
    title: '좌석 예약',
    description: '열람실, 스터디룸 예약',
    icon: Calendar,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    href: '/library/seat'
  },
  {
    id: 'request',
    title: '희망 도서',
    description: '도서 구입 신청',
    icon: BookOpen,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    href: '/library/request'
  },
  {
    id: 'renew',
    title: '대출 연장',
    description: '대출 기간 연장 신청',
    icon: RotateCcw,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    href: '/library/renew'
  }
]

export function LibraryQuickMenu() {
  const { settings } = useLibraryDevSettings()
  
  // 설정에서 섹션 표시 여부 확인
  if (!settings.quickMenu.showSection) {
    return null
  }
  
  // 아이콘 크기 설정
  const getIconSize = () => {
    switch (settings.quickMenu.iconSize) {
      case 'small':
        return 'h-8 w-8'
      case 'large':
        return 'h-12 w-12'
      default:
        return 'h-10 w-10'
    }
  }
  
  const iconSize = getIconSize()
  
  // 가로 레이아웃
  if (settings.quickMenu.layout === 'horizontal') {
    return (
      <div className="w-full bg-gradient-to-br from-primary/5 via-primary/3 to-background py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-3xl mx-auto">
            {quickMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <Card className="relative border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur-sm group-hover:-translate-y-1">
                    <CardContent className="p-3">
                      <div className="flex flex-col items-center justify-center space-y-1.5">
                        <div className={cn(
                          "p-2.5 rounded-xl transition-all duration-300",
                          item.bgColor,
                          "group-hover:scale-110 group-hover:shadow-lg"
                        )}>
                          <Icon className={cn("h-6 w-6 md:h-7 md:w-7", item.color)} />
                        </div>
                        <h3 className="font-medium text-xs md:text-sm text-foreground/90 group-hover:text-foreground">
                          {item.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  
  // 그리드 레이아웃 (2x2)
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-3">
            {quickMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <Card 
                  key={item.id}
                  className="group hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2.5 rounded-lg transition-colors duration-200 shrink-0",
                        item.bgColor,
                        "group-hover:scale-105 transition-transform"
                      )}>
                        <Icon className={cn(iconSize, item.color)} />
                      </div>
                      <h3 className="font-medium text-sm">
                        {item.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}