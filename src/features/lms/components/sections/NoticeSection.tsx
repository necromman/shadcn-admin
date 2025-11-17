import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notice {
  id: string
  title: string
  date: string
  content: string
  isNew?: boolean
}

const noticeData: Notice[] = [
  {
    id: '1',
    title: '(조치 완료) STEP-VT런칭 오류 안내',
    date: '2025.11.11',
    content: '학습자님, 안녕하세요. 가상훈련 담당자입니다. STEP-VT런칭 오류의 원인을 파악하여 조치 완료하였습니다. 학습 시 불편을 드려 죄송합니다.',
    isNew: false
  },
  {
    id: '2',
    title: '[당선작 발표] STEP 학습 우수사례 공모전 당선작 발표',
    date: '2025.11.07',
    content: '안녕하세요. 한국기술교육대학교 온라인평생교육원입니다. [2025년 STEP 학습 우수사례 공모전]에 참여해주신 모든 분들께 진심으로 감사드립니다.',
    isNew: false
  },
  {
    id: '3',
    title: '2025년도 STEP 오픈마켓(B2B) 판매과정 목록 (2025년 11월 기준)',
    date: '2025.11.03',
    content: '안녕하세요. 온라인평생교육원입니다. STEP 오픈마켓(B2B)에서 판매중인 전체 온라인과정 목록을 안내해드립니다.',
    isNew: false
  },
  {
    id: '4',
    title: '[당첨자 발표] AI과정 수강신청 이벤트 당첨자 발표 (60명)',
    date: '2025.10.31',
    content: '안녕하세요. 스마트 직업훈련 플랫폼 STEP입니다. AI과정 수강후기 이벤트에 참여해 주신 모든 분들께 감사드립니다.',
    isNew: false
  }
]

export function NoticeSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                공지사항
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                더보기
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
            <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
              {noticeData.map((notice) => (
                <div
                  key={notice.id}
                  className="py-4 first:pt-0 last:pb-0 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {notice.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {notice.content}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">
                      {notice.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}