import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  HiArrowRight, 
  HiMegaphone, 
  HiNewspaper, 
  HiCalendar,
  HiSparkles,
  HiFire,
  HiChatBubbleLeftRight
} from 'react-icons/hi2'
import { useTranslation } from '@/lib/i18n/hooks'

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
  const { t } = useTranslation()

  return (
    <section className="py-12">
      {/* 섹션 헤더 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              최신 소식
            </h2>
            <p className="text-sm text-muted-foreground">공지사항 및 주요 업데이트</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          전체보기
          <HiArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* 최신 소식 리스트 - 글래스모피즘 스타일 */}
      <div className="grid gap-3 relative">
        {/* 라이트 모드 배경 효과 */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-100/50 via-[var(--brand-primary)]/5 to-slate-100/50 dark:from-transparent dark:to-transparent blur-3xl" />
        
        {latestNews.map((item) => (
          <Card 
            key={item.id} 
            className="relative overflow-hidden cursor-pointer group py-0 bg-slate-50/60 dark:bg-black/20 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-black/30 hover:scale-[1.02] py-3"
          >
            {/* 배경 그라데이션 효과 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/10 via-transparent to-[var(--brand-primary)]/5 opacity-40" />
            
            <CardContent className="p-4 flex items-center gap-4 relative z-10">
              {/* 메인 콘텐츠 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  {/* 카테고리 배지 - 글래스 효과 */}
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0.5 backdrop-blur-sm font-medium ${
                      item.category === '공지사항' ? 'border-blue-500/30 text-blue-700 dark:text-blue-400 bg-blue-500/15 dark:bg-blue-500/20' :
                      item.category === '보도자료' ? 'border-green-500/30 text-green-700 dark:text-green-400 bg-green-500/15 dark:bg-green-500/20' :
                      'border-purple-500/30 text-purple-700 dark:text-purple-400 bg-purple-500/15 dark:bg-purple-500/20'
                    }`}
                  >
                    {item.category === '공지사항' && <HiMegaphone className="w-3 h-3 mr-1" />}
                    {item.category === '보도자료' && <HiNewspaper className="w-3 h-3 mr-1" />}
                    {item.category === '문의' && <HiChatBubbleLeftRight className="w-3 h-3 mr-1" />}
                    {item.category}
                  </Badge>
                  {item.isNew && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]/30 text-[var(--brand-primary)] backdrop-blur-sm">
                      <HiSparkles className="w-3 h-3 mr-0.5" />
                      NEW
                    </Badge>
                  )}
                  {item.isHot && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0 bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 backdrop-blur-sm">
                      <HiFire className="w-3 h-3 mr-0.5" />
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
              
              {/* 화살표 아이콘 - 글래스 효과 */}
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 group-hover:bg-[var(--brand-primary)]/10 transition-all">
                  <HiArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--brand-primary)] transition-colors" />
                </div>
              </div>
            </CardContent>
            
            {/* 호버 시 빛나는 효과 */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}