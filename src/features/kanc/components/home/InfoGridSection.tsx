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

const introNotices = [
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

const serviceNotices = [
  {
    id: 263,
    category: '모집',
    title: '한국나노기술원 입주기업 모집공고',
    date: '2025.09.15',
    isNew: true,
    isPinned: true
  },
  {
    id: 262,
    category: '교육',
    title: '차세대패키징TF 「2025년 1차 첨단패키지 기술교육」 개최 안내',
    date: '2025.09.12',
    isNew: true
  },
  {
    id: 261,
    category: '지원',
    title: '한국나노기술원 인공지능사업의 기업지원 모집 공고 안내',
    date: '2025.08.21'
  },
  {
    id: 260,
    category: '행사',
    title: '2025년 차세대 반도체 패키징 산업전 개최 안내',
    date: '2025.08.01'
  },
  {
    id: 258,
    category: '사업',
    title: '경기도 공공팹 활용 팹리스 기업 시제품 개발 지원사업 모집',
    date: '2025.07.22'
  }
]

const introQuickLinks = [
  {
    title: '팹 서비스',
    desc: '나노공정 신청',
    link: '/service/fab',
    icon: Microscope
  },
  {
    title: '교육 신청',
    desc: '전문 교육과정',
    link: '/education',
    icon: GraduationCap
  },
  {
    title: '1:1 문의',
    desc: '전문가 상담',
    link: '/inquiry',
    icon: MessageCircle
  },
  {
    title: '장비 예약',
    desc: '500+ 장비',
    link: '/equipment',
    icon: Calendar
  }
]

const serviceQuickLinks = [
  {
    title: '진행 현황',
    desc: '실시간 조회',
    link: '/fab/status',
    icon: TrendingUp
  },
  {
    title: '대관 신청',
    desc: '시설 예약',
    link: '/facility/apply',
    icon: Building2
  },
  {
    title: '담당자 안내',
    desc: '빠른 연결',
    link: '/staff',
    icon: Users
  },
  {
    title: '긴급 지원',
    desc: '24시간 상담',
    link: '/hotline',
    icon: AlertCircle
  }
]

export function InfoGridSection({ variant }: InfoGridSectionProps) {
  const quickLinks = variant === 'intro' ? introQuickLinks : serviceQuickLinks
  const notices = variant === 'intro' ? introNotices : serviceNotices

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
                        "bg-white dark:bg-gray-800/50",
                        "border border-gray-200 dark:border-gray-700",
                        "hover:shadow-md hover:scale-[1.01] hover:border-gray-300 dark:hover:border-gray-600",
                        "hover:bg-gray-50/50 dark:hover:bg-gray-800"
                      )}>
                        <div className="flex flex-col items-center justify-center space-y-1.5 min-h-[56px]">
                          <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-all duration-200" />
                          <div className="text-center space-y-0.5">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                              {item.desc}
                            </p>
                          </div>
                        </div>
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