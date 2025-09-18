import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Microscope,
  GraduationCap,
  MessageCircle,
  Calendar,
  TrendingUp,
  Building2,
  Users,
  AlertCircle,
  ArrowRight,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickServiceSectionProps {
  variant: 'intro' | 'service'
}

const introQuickLinks = [
  {
    title: '팹 서비스',
    desc: '나노공정 신청',
    link: '/service/fab',
    icon: Microscope,
    badge: '인기',
    time: '즉시 예약',
    highlight: true
  },
  {
    title: '교육 신청',
    desc: '전문 교육과정',
    link: '/education',
    icon: GraduationCap,
    badge: '신규',
    time: '2월 개강'
  },
  {
    title: '1:1 문의',
    desc: '전문가 상담',
    link: '/inquiry',
    icon: MessageCircle,
    time: '평균 30분 대기'
  },
  {
    title: '장비 예약',
    desc: '500+ 첨단장비',
    link: '/equipment',
    icon: Calendar,
    time: '24시간 운영'
  }
]

const serviceQuickLinks = [
  {
    title: '진행 현황',
    desc: '실시간 조회',
    link: '/fab/status',
    icon: TrendingUp,
    badge: 'Live',
    time: '실시간 업데이트',
    highlight: true
  },
  {
    title: '대관 신청',
    desc: '시설 예약',
    link: '/facility/apply',
    icon: Building2,
    time: '즉시 확인'
  },
  {
    title: '담당자 안내',
    desc: '빠른 연결',
    link: '/staff',
    icon: Users,
    time: '평일 09-18시'
  },
  {
    title: '긴급 지원',
    desc: '24시간 상담',
    link: '/hotline',
    icon: AlertCircle,
    badge: '긴급',
    time: '24/7 운영'
  }
]

export function QuickServiceSection({ variant }: QuickServiceSectionProps) {
  const quickLinks = variant === 'intro' ? introQuickLinks : serviceQuickLinks

  return (
    <Card className="flex-1 flex flex-col p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">빠른 서비스</h3>
          <a
            href={variant === 'intro' ? '/service/all' : '/service/portal'}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            전체
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 space-y-2">
          {quickLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group block"
            >
              <div className={cn(
                "relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                "border",
                "hover:shadow-md hover:border-primary/50",
                "hover:bg-accent/50",
                item.highlight && "bg-primary/5 border-primary/30"
              )}>
                {/* 아이콘 */}
                <div className={cn(
                  "flex-shrink-0 p-2 rounded-lg",
                  item.highlight
                    ? "bg-primary/10"
                    : "bg-muted"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5",
                    item.highlight
                      ? "text-primary"
                      : "text-muted-foreground"
                  )} />
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        {item.badge && (
                          <Badge
                            variant={item.badge === '인기' ? 'default' : item.badge === '긴급' ? 'destructive' : 'secondary'}
                            className="text-[10px] px-1.5 py-0 h-4"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                      {item.time && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">
                            {item.time}
                          </span>
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 하단 빠른 링크 */}
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              <Star className="w-3 h-3 inline mr-1 text-yellow-500" />
              오늘의 추천 서비스
            </span>
            <a href="/service/recommend" className="text-primary hover:underline flex items-center gap-1">
              모두 보기
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}