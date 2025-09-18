import {
  ChevronRight,
  Microscope,
  GraduationCap,
  MessageCircle,
  Calendar,
  TrendingUp,
  Building2,
  Users,
  AlertCircle
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SectionWrapper } from '../common/SectionWrapper'

interface InfoGridSectionProps {
  variant: 'intro' | 'service'
}

const notices = [
  {
    id: 1,
    category: '공지',
    title: '2024년 상반기 나노팹 신규 장비 도입 안내',
    date: '2024.03.15',
    isNew: true,
    isPinned: true
  },
  {
    id: 2,
    category: '교육',
    title: '나노공정 전문가 양성과정 수강생 모집',
    date: '2024.03.14',
    isNew: true
  },
  {
    id: 3,
    category: '행사',
    title: '제10회 한국나노기술 심포지엄 개최',
    date: '2024.03.13'
  },
  {
    id: 4,
    category: '입찰',
    title: '8인치 웨이퍼 공정장비 구매 입찰 공고',
    date: '2024.03.12'
  },
  {
    id: 5,
    category: '채용',
    title: '2024년 상반기 연구원 정규직 채용 공고',
    date: '2024.03.11'
  }
]

const introQuickLinks = [
  {
    title: '팹 서비스',
    desc: '나노공정 신청',
    link: '/service/fab',
    icon: Microscope,
    bgClass: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    hoverClass: 'hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40'
  },
  {
    title: '교육 신청',
    desc: '전문 교육과정',
    link: '/education',
    icon: GraduationCap,
    bgClass: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    hoverClass: 'hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40'
  },
  {
    title: '1:1 문의',
    desc: '전문가 상담',
    link: '/inquiry',
    icon: MessageCircle,
    bgClass: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    hoverClass: 'hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-900/40 dark:hover:to-purple-900/40'
  },
  {
    title: '장비 예약',
    desc: '500+ 장비',
    link: '/equipment',
    icon: Calendar,
    bgClass: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    hoverClass: 'hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/40 dark:hover:to-orange-900/40'
  }
]

const serviceQuickLinks = [
  {
    title: '진행 현황',
    desc: '실시간 조회',
    link: '/fab/status',
    icon: TrendingUp,
    bgClass: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    hoverClass: 'hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40'
  },
  {
    title: '대관 신청',
    desc: '시설 예약',
    link: '/facility/apply',
    icon: Building2,
    bgClass: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    hoverClass: 'hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40'
  },
  {
    title: '담당자 안내',
    desc: '빠른 연결',
    link: '/staff',
    icon: Users,
    bgClass: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    hoverClass: 'hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-900/40 dark:hover:to-purple-900/40'
  },
  {
    title: '긴급 지원',
    desc: '24시간 상담',
    link: '/hotline',
    icon: AlertCircle,
    bgClass: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    hoverClass: 'hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/40 dark:hover:to-pink-900/40'
  }
]

export function InfoGridSection({ variant }: InfoGridSectionProps) {
  const quickLinks = variant === 'intro' ? introQuickLinks : serviceQuickLinks

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최신소식 - 왼쪽 2/3 */}
          <div className="lg:col-span-2">
            <Card className="h-full p-0 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              {/* Glass morphism header */}
              <div className="p-4 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">최신소식</h3>
                  <a
                    href="/notice"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    전체보기
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {notices.map((notice) => (
                    <a
                      key={notice.id}
                      href={`/notice/${notice.id}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <Badge
                          variant={notice.category === '공지' ? 'default' : 'secondary'}
                          className="text-[10px] px-2 py-0.5"
                        >
                          {notice.category}
                        </Badge>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-1">
                            {notice.isPinned && (
                              <span className="text-orange-500 font-medium mr-1">[중요]</span>
                            )}
                            {notice.title}
                          </h4>
                        </div>

                        {notice.isNew && (
                          <Badge variant="destructive" className="text-[9px] px-1.5 py-0">
                            N
                          </Badge>
                        )}

                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {notice.date}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* 빠른 서비스 - 오른쪽 1/3 */}
          <div>
            <Card className="h-full p-0 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              {/* Glass morphism header */}
              <div className="p-4 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">빠른 서비스</h3>
                  <a
                    href={variant === 'intro' ? '/service/all' : '/service/portal'}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    전체
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="group relative"
                    >
                      <div className={cn(
                        "relative p-3 h-full rounded-lg transition-all duration-200",
                        "border border-gray-200/60 dark:border-gray-700/30",
                        item.bgClass,
                        item.hoverClass,
                        "hover:shadow-lg hover:scale-[1.02] hover:border-gray-300 dark:hover:border-gray-600"
                      )}>
                        <div className="flex flex-col items-center justify-center space-y-1.5 min-h-[60px]">
                          <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all duration-200" />
                          <div className="text-center space-y-0.5">
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 dark:group-hover:from-white/5 dark:group-hover:to-white/0 rounded-lg pointer-events-none transition-all duration-200" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
    </SectionWrapper>
  )
}