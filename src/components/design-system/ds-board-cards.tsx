'use client'

import { HiCalendarDays, HiDocumentText, HiMegaphone, HiChevronRight, HiExclamationCircle, HiNewspaper, HiTrophy } from 'react-icons/hi2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BoardItem {
  id: number
  title: string
  date: string
  category?: string
  isNew?: boolean
  isImportant?: boolean
  views?: number
}

export function DSBoardCards() {
  const notices: BoardItem[] = [
    { id: 1, title: '2025년 항만 시설 사용료 인상 안내', date: '2025-01-15', category: '요금', isImportant: true, isNew: true },
    { id: 2, title: '신규 물류센터 운영 시작 공지', date: '2025-01-14', category: '시설', isNew: true },
    { id: 3, title: '겨울철 안전 작업 수칙 안내', date: '2025-01-13', category: '안전' },
    { id: 4, title: '전자통관 시스템 업데이트 일정', date: '2025-01-12', category: '시스템' },
    { id: 5, title: '2025년 정기 안전교육 일정 안내', date: '2025-01-10', category: '교육' }
  ]

  const biddings: BoardItem[] = [
    { id: 1, title: '항만 크레인 정비 용역 입찰 공고', date: '2025-01-16', category: '용역', isNew: true },
    { id: 2, title: '물류창고 A동 리모델링 공사', date: '2025-01-15', category: '공사', isNew: true },
    { id: 3, title: '보안 시스템 구축 사업자 선정', date: '2025-01-14', category: 'IT' },
    { id: 4, title: '구내식당 운영 위탁업체 모집', date: '2025-01-13', category: '운영' }
  ]

  const news: BoardItem[] = [
    { id: 1, title: '항만 물동량 전년 대비 15% 증가', date: '2025-01-16', views: 1250, isNew: true },
    { id: 2, title: '스마트 항만 구축 사업 본격 추진', date: '2025-01-15', views: 890, isNew: true },
    { id: 3, title: '친환경 항만 인증 획득', date: '2025-01-14', views: 756 },
    { id: 4, title: '글로벌 선사와 전략적 제휴 체결', date: '2025-01-12', views: 623 }
  ]

  const renderBoardItem = (item: BoardItem, showViews = false) => (
    <li key={item.id} className="group">
      <a href="#" className="flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-accent/5 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {item.isImportant && (
              <Badge variant="destructive" className="text-xs">중요</Badge>
            )}
            {item.isNew && (
              <Badge variant="default" className="text-xs bg-blue-500">NEW</Badge>
            )}
            {item.category && (
              <Badge variant="outline" className="text-xs">{item.category}</Badge>
            )}
          </div>
          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {item.title}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <HiCalendarDays className="h-3 w-3" />
              {item.date}
            </span>
            {showViews && item.views && (
              <span>조회 {item.views.toLocaleString()}</span>
            )}
          </div>
        </div>
        <HiChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
      </a>
    </li>
  )

  return (
    <div className="w-full space-y-8">
      {/* Grid Layout Version */}
      <div>
        <h3 className="text-lg font-semibold mb-4">그리드 레이아웃</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Notice Board Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <HiMegaphone className="h-5 w-5 text-blue-500" />
                  공지사항
                </span>
                <Button variant="ghost" size="sm" className="text-xs">
                  더보기 <HiChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {notices.slice(0, 4).map(item => renderBoardItem(item))}
              </ul>
            </CardContent>
          </Card>

          {/* Bidding Board Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <HiDocumentText className="h-5 w-5 text-green-500" />
                  입찰정보
                </span>
                <Button variant="ghost" size="sm" className="text-xs">
                  더보기 <HiChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {biddings.map(item => renderBoardItem(item))}
              </ul>
            </CardContent>
          </Card>

          {/* News Board Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <HiNewspaper className="h-5 w-5 text-purple-500" />
                  보도자료
                </span>
                <Button variant="ghost" size="sm" className="text-xs">
                  더보기 <HiChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {news.map(item => renderBoardItem(item, true))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tab Layout Version */}
      <div>
        <h3 className="text-lg font-semibold mb-4">탭 레이아웃</h3>
        <Card>
          <CardHeader>
            <CardTitle>알림센터</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notice" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="notice" className="flex items-center gap-2">
                  <HiMegaphone className="h-4 w-4" />
                  공지사항
                </TabsTrigger>
                <TabsTrigger value="bidding" className="flex items-center gap-2">
                  <HiDocumentText className="h-4 w-4" />
                  입찰정보
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center gap-2">
                  <HiNewspaper className="h-4 w-4" />
                  보도자료
                </TabsTrigger>
              </TabsList>
              <TabsContent value="notice" className="mt-4">
                <ul className="space-y-1">
                  {notices.map(item => renderBoardItem(item))}
                </ul>
              </TabsContent>
              <TabsContent value="bidding" className="mt-4">
                <ul className="space-y-1">
                  {biddings.map(item => renderBoardItem(item))}
                </ul>
              </TabsContent>
              <TabsContent value="news" className="mt-4">
                <ul className="space-y-1">
                  {news.map(item => renderBoardItem(item, true))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Compact List Version */}
      <div>
        <h3 className="text-lg font-semibold mb-4">컴팩트 리스트</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <HiExclamationCircle className="h-5 w-5 text-orange-500" />
                긴급 공지
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {notices.filter(n => n.isImportant).map(item => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <HiTrophy className="h-5 w-5 text-green-500" />
                주요 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {news.slice(0, 3).map(item => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">조회 {item.views?.toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}