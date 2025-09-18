import { useState } from 'react'
import { Clock, ChevronRight, Bell, Newspaper, Calendar, TrendingUp, FileText, Megaphone } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface NoticeSectionProps {
  variant: 'intro' | 'service'
}

const notices = [
  {
    id: '1',
    category: 'notice',
    type: '공지',
    title: '2025년 상반기 나노팹 서비스 운영 계획 안내',
    content: '나노팹 시설 운영 효율화를 위한 상반기 운영 계획을 안내드립니다.',
    date: '2025-01-15',
    author: '운영관리팀',
    views: 1234,
    isNew: true,
    isImportant: true
  },
  {
    id: '2',
    category: 'notice',
    type: '입찰',
    title: '고분해능 주사전자현미경(HR-SEM) 구매 입찰 공고',
    content: '최첨단 분석 장비 도입을 위한 공개 입찰을 진행합니다.',
    date: '2025-01-14',
    author: '구매관리팀',
    views: 567,
    isNew: true
  },
  {
    id: '3',
    category: 'notice',
    type: '채용',
    title: '2025년 상반기 나노공정 연구원 채용 공고',
    content: '나노공정 분야 전문 연구원을 모집합니다. (박사급 2명, 석사급 3명)',
    date: '2025-01-13',
    author: '인사팀',
    views: 2890,
    isNew: true,
    isHot: true
  },
  {
    id: '4',
    category: 'notice',
    type: '안내',
    title: '설 연휴 팹 시설 운영 일정 안내',
    content: '2025년 설 연휴 기간 중 시설 운영 일정을 안내드립니다.',
    date: '2025-01-12',
    author: '운영관리팀',
    views: 445,
    isNew: false
  },
  {
    id: '5',
    category: 'notice',
    type: '공지',
    title: '장비 정기 점검 일정 안내 (1월 4주차)',
    content: '1월 4주차 정기 점검 대상 장비 및 일정을 안내드립니다.',
    date: '2025-01-11',
    author: '장비관리팀',
    views: 312,
    isNew: false
  }
]

const news = [
  {
    id: '1',
    category: 'news',
    type: '수상',
    title: 'BRAND, 2024 대한민국 나노기술대상 대통령상 수상',
    content: '나노기술 발전에 기여한 공로를 인정받아 최고 영예의 대통령상을 수상했습니다.',
    date: '2025-01-14',
    author: '홍보팀',
    views: 3456,
    isNew: true,
    isHot: true,
    thumbnail: 'https://via.placeholder.com/100x100/0066CC/ffffff?text=NEWS'
  },
  {
    id: '2',
    category: 'news',
    type: 'MOU',
    title: '삼성전자-BRAND 차세대 반도체 공정 기술 개발 MOU 체결',
    content: '차세대 3nm 이하 공정 기술 개발을 위한 전략적 파트너십을 구축했습니다.',
    date: '2025-01-13',
    author: '대외협력팀',
    views: 2890,
    isNew: true,
    thumbnail: 'https://via.placeholder.com/100x100/002D83/ffffff?text=MOU'
  },
  {
    id: '3',
    category: 'news',
    type: '성과',
    title: '국내 최초 EUV 리소그래피 7nm 공정 개발 성공',
    content: '순수 국내 기술로 7nm급 초미세 공정 개발에 성공했습니다.',
    date: '2025-01-12',
    author: '연구개발팀',
    views: 4567,
    isNew: true,
    isHot: true
  },
  {
    id: '4',
    category: 'news',
    type: '행사',
    title: '제15회 국제 나노기술 심포지엄 개최',
    content: '세계 각국의 나노기술 전문가 500여명이 참가하는 국제 심포지엄을 개최합니다.',
    date: '2025-01-11',
    author: '학술기획팀',
    views: 1234,
    isNew: false
  },
  {
    id: '5',
    category: 'news',
    type: '지원',
    title: '중소기업 나노팹 이용료 50% 지원 사업 시행',
    content: '중소기업의 기술 개발을 지원하기 위한 이용료 할인 프로그램을 시작합니다.',
    date: '2025-01-10',
    author: '기업지원팀',
    views: 2345,
    isNew: false
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case '공지': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case '입찰': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case '채용': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case '안내': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    case '수상': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'MOU': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
    case '성과': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case '행사': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
    case '지원': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

export function NoticeSection({ variant }: NoticeSectionProps) {
  const [activeTab, setActiveTab] = useState<'notice' | 'news'>('notice')
  const items = activeTab === 'notice' ? notices : news

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">
              공지사항
            </h2>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
              더보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="notice" value={activeTab} onValueChange={(value) => setActiveTab(value as 'notice' | 'news')}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/50 dark:bg-gray-900/50">
              <TabsTrigger value="notice" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                공지사항
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                보도자료
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notice" className="space-y-2">
              {notices.map((item, index) => (
                <div
                  key={item.id}
                  className="group"
                >
                  <a href="#" className="block">
                    <div className="flex items-center justify-between gap-4 py-3 px-1 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Type Badge */}
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                          {item.type}
                        </Badge>

                        {/* Title */}
                        <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 flex-1">
                          {item.title}
                        </span>

                        {/* Labels */}
                        <div className="flex items-center gap-1">
                          {item.isNew && (
                            <Badge className="text-[10px] px-1 py-0 h-4 bg-red-500 text-white border-0">
                              NEW
                            </Badge>
                          )}
                          {item.isHot && (
                            <Badge className="text-[10px] px-1 py-0 h-4 bg-orange-500 text-white border-0">
                              HOT
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {item.date}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="news" className="space-y-2">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="group"
                >
                  <a href="#" className="block">
                    <div className="flex items-center justify-between gap-4 py-3 px-1 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Type Badge */}
                        <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-5 border-0",
                          item.type === '수상' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          item.type === 'MOU' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                          item.type === '성과' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          item.type === '행사' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' :
                          'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
                        )}>
                          {item.type}
                        </Badge>

                        {/* Title */}
                        <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 flex-1">
                          {item.title}
                        </span>

                        {/* Labels */}
                        <div className="flex items-center gap-1">
                          {item.isNew && (
                            <Badge className="text-[10px] px-1 py-0 h-4 bg-red-500 text-white border-0">
                              NEW
                            </Badge>
                          )}
                          {item.isHot && (
                            <Badge className="text-[10px] px-1 py-0 h-4 bg-orange-500 text-white border-0">
                              HOT
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {item.date}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </TabsContent>
          </Tabs>
      </div>
    </section>
  )
}