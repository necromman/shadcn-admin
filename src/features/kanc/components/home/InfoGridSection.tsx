import { ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import { QuickServiceSection } from './QuickServiceSection'

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

export function InfoGridSection({ variant }: InfoGridSectionProps) {
  const notices = variant === 'intro' ? introNotices : serviceNotices

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* 최신소식 - 왼쪽 2/3 */}
          <div className="lg:col-span-2 flex">
            <Card className="flex-1 flex flex-col p-0 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
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

              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="h-full flex flex-col">
                  {notices.map((notice, index) => (
                    <a
                      key={notice.id}
                      href={`/notice/${notice.id}`}
                      className="group flex-1 flex"
                    >
                      <div className={`
                        flex items-center gap-3 px-5 w-full
                        transition-all duration-200
                        ${index !== notices.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}
                        ${notice.isPinned
                          ? 'bg-gradient-to-r from-blue-50/50 via-blue-50/30 to-transparent dark:from-blue-950/30 dark:via-blue-950/20 dark:to-transparent hover:from-blue-50/70 dark:hover:from-blue-950/40'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }
                        ${index % 2 === 1 && !notice.isPinned ? 'bg-gray-50/30 dark:bg-gray-800/20' : ''}
                      `}>
                        <Badge
                          variant={notice.category === '공지' ? 'default' : 'secondary'}
                          className="text-[10px] px-2 py-0.5 shrink-0"
                        >
                          {notice.category}
                        </Badge>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-1 font-medium">
                            {notice.isPinned && (
                              <span className="text-orange-500 font-semibold mr-1">[중요]</span>
                            )}
                            {notice.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {notice.isNew && (
                            <Badge variant="destructive" className="text-[9px] px-1.5 py-0 h-4">
                              NEW
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {notice.date}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 빠른 서비스 - 오른쪽 1/3 */}
          <div className="flex">
            <QuickServiceSection variant={variant} />
          </div>
        </div>
    </SectionWrapper>
  )
}