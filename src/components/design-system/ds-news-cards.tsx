'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HiCalendarDays, HiChevronRight } from 'react-icons/hi2'

const newsData = [
  {
    id: 1,
    title: "Q4 비즈니스 성과 리뷰 발표",
    excerpt: "2025년 4분기 주요 성과 지표와 향후 전략 방향을 공유합니다.",
    date: "2025-12-15",
    category: "업데이트",
    urgent: true
  },
  {
    id: 2,
    title: "새로운 파트너십 프로그램 론칭",
    excerpt: "전략적 파트너들과 함께하는 새로운 협업 기회를 소개합니다.",
    date: "2025-12-10",
    category: "제품"
  },
  {
    id: 3,
    title: "연말 서비스 업데이트 안내",
    excerpt: "사용자 경험 개선을 위한 주요 기능 업데이트가 적용됩니다.",
    date: "2025-12-08",
    category: "서비스"
  },
  {
    id: 4,
    title: "보안 강화 조치 완료",
    excerpt: "고객 데이터 보호를 위한 최신 보안 시스템이 적용되었습니다.",
    date: "2025-12-05",
    category: "보안"
  }
]

export function DSNewsCards() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">최신 소식</h3>
          <p className="text-sm text-muted-foreground">중요한 업데이트와 공지사항</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          전체보기 <HiChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* 뉴스 카드 그리드 */}
      <div className="grid gap-4 md:grid-cols-2">
        {newsData.map((news) => (
          <Card key={news.id} className="group cursor-pointer business-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={news.urgent ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {news.category}
                    </Badge>
                    {news.urgent && (
                      <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                        긴급
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                    {news.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {news.excerpt}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <HiCalendarDays className="mr-1.5 h-3.5 w-3.5" />
                {new Date(news.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}