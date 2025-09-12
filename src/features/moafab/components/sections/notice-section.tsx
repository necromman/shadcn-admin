import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  HiArrowRight, 
  HiMegaphone, 
  HiNewspaper, 
  HiCalendar,
  HiChatBubbleLeftRight
} from 'react-icons/hi2'

interface NoticeItem {
  id: string
  category: string
  title: string
  content?: string
  date: string
  isNew?: boolean
  isHot?: boolean
  isPinned?: boolean
  author?: string
  comments?: number
  views?: number
}

// 최신 소식 데이터 (5개 항목만 표시)
const latestNews: NoticeItem[] = [
  {
    id: '1',
    category: '공지사항',
    title: '2025년 상반기 나노팹 서비스 이용 안내',
    content: '서비스 품질 향상을 위한 상반기 운영 계획을 안내드립니다. 신규 장비 도입 및 서비스 개선 사항을 확인해주세요.',
    date: '2025-01-12',
    isNew: true,
    isPinned: true,
    views: 1523
  },
  {
    id: '2',
    category: '보도자료',
    title: '나노팹 플랫폼, 글로벌 반도체 혁신 대상 수상',
    content: 'MOAFAB 플랫폼이 2024 글로벌 반도체 기술 혁신 대상을 수상했습니다. 국내 나노팹 기술의 우수성을 인정받은 쾌거입니다.',
    date: '2025-01-11',
    isNew: true,
    isHot: true,
    views: 3892
  },
  {
    id: '3',
    category: '문의',
    title: 'EUV 리소그래피 장비 사용 관련 문의',
    author: '김연구원',
    date: '2025-01-11',
    comments: 15,
    isNew: true
  },
  {
    id: '4',
    category: '공지사항',
    title: '장비 정기 점검 일정 안내 (1월 3주차)',
    content: '1월 3주차 정기 점검 일정을 안내드립니다. 점검 시간 동안 일부 장비 사용이 제한될 수 있습니다.',
    date: '2025-01-10',
    isPinned: true,
    views: 987
  },
  {
    id: '5',
    category: '보도자료',
    title: '국내 6대 나노팹 기관 업무협약 체결',
    content: 'MOAFAB 플랫폼을 통해 국내 주요 나노팹 기관들이 협력 체계를 구축했습니다.',
    date: '2025-01-09',
    isHot: true,
    views: 2156
  }
]

export function NoticeSection() {

  return (
    <section className="py-12">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            최신 소식
          </h2>
          <p className="mt-2 text-muted-foreground">
            공지사항 및 주요 업데이트
          </p>
        </div>
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          전체보기
          <HiArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 최신 소식 리스트 */}
      <div className="grid gap-3">
        {latestNews.map((item) => (
          <Card 
            key={item.id} 
            variant="list"
            className="relative overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-1 hover:border-primary/20 py-2"
          >
            <CardContent variant="list" className="flex items-center gap-4 relative">
              {/* 메인 콘텐츠 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  {/* 카테고리 배지 */}
                  <Badge 
                    variant="secondary" 
                    className={`text-[11px] px-2 py-0.5 font-medium ${
                      item.category === '공지사항' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                      item.category === '보도자료' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' :
                      'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {item.category === '공지사항' && <HiMegaphone className="w-3 h-3 mr-1" />}
                    {item.category === '보도자료' && <HiNewspaper className="w-3 h-3 mr-1" />}
                    {item.category === '문의' && <HiChatBubbleLeftRight className="w-3 h-3 mr-1" />}
                    {item.category}
                  </Badge>
                  {item.isNew && (
                    <Badge 
                      className="text-[10px] px-1.5 py-0 h-4 bg-primary text-white"
                    >
                      NEW
                    </Badge>
                  )}
                  {item.isHot && (
                    <Badge 
                      className="text-[10px] px-1.5 py-0 h-4 bg-red-500 text-white"
                    >
                      HOT
                    </Badge>
                  )}
                </div>
                
                {/* 제목 */}
                <h3 className="font-medium text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                {/* 메타 정보 */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-3 h-3" />
                    {item.date}
                  </div>
                  {item.author && (
                    <span>작성자: {item.author}</span>
                  )}
                  {item.views && (
                    <span>조회 {item.views.toLocaleString()}</span>
                  )}
                  {item.comments !== undefined && (
                    <span>댓글 {item.comments}</span>
                  )}
                </div>
              </div>
              
              {/* 화살표 아이콘 */}
              <div className="flex items-center">
                <HiArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}