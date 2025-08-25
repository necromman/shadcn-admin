import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  HiMegaphone,
  HiNewspaper,
  HiCalendar,
  HiClock,
  HiArrowRight,
  HiSpeakerphone,
  HiDocumentText,
  HiUserGroup,
  HiTag,
  HiFire,
  HiSparkles
} from 'react-icons/hi2'

interface NoticeItem {
  id: string
  category: string
  title: string
  content: string
  date: string
  isNew?: boolean
  isHot?: boolean
  isPinned?: boolean
  tags?: string[]
  viewCount?: number
}

// 샘플 데이터
const notices: NoticeItem[] = [
  {
    id: '1',
    category: '공지사항',
    title: '2025년 1월 정기 시스템 점검 안내',
    content: '서비스 품질 향상을 위한 정기 점검이 예정되어 있습니다. 점검 시간 동안 일부 서비스 이용이 제한될 수 있습니다.',
    date: '2024-12-28',
    isNew: true,
    isPinned: true,
    tags: ['시스템', '점검'],
    viewCount: 1523
  },
  {
    id: '2',
    category: '업데이트',
    title: 'v3.0 메이저 업데이트 - AI 기능 대폭 강화',
    content: '새로운 AI 어시스턴트 기능과 함께 작업 효율성이 크게 향상되었습니다. 자동 번역, 코드 생성 등 다양한 기능을 경험해보세요.',
    date: '2024-12-27',
    isNew: true,
    isHot: true,
    tags: ['업데이트', 'AI', '신기능'],
    viewCount: 3892
  },
  {
    id: '3',
    category: '이벤트',
    title: '신년 맞이 프리미엄 요금제 50% 할인',
    content: '2025년을 맞아 특별 할인 이벤트를 진행합니다. 1월 31일까지 프리미엄 요금제 50% 할인!',
    date: '2024-12-26',
    isHot: true,
    tags: ['이벤트', '할인', '프로모션'],
    viewCount: 5234
  },
  {
    id: '4',
    category: '보안',
    title: '2단계 인증 의무화 시행 안내',
    content: '계정 보안 강화를 위해 2025년 2월 1일부터 모든 사용자에게 2단계 인증이 의무화됩니다.',
    date: '2024-12-25',
    isPinned: true,
    tags: ['보안', '인증', '필수'],
    viewCount: 2156
  },
  {
    id: '5',
    category: '기능소개',
    title: '새로운 대시보드 커스터마이징 기능 출시',
    content: '이제 대시보드를 원하는 대로 커스터마이징할 수 있습니다. 위젯 추가, 레이아웃 변경 등 자유롭게 설정하세요.',
    date: '2024-12-24',
    tags: ['신기능', '대시보드'],
    viewCount: 1892
  },
  {
    id: '6',
    category: '공지사항',
    title: '개인정보처리방침 개정 안내',
    content: '관련 법령 개정에 따라 개인정보처리방침이 일부 변경되었습니다. 변경된 내용을 확인해주세요.',
    date: '2024-12-23',
    tags: ['정책', '개인정보'],
    viewCount: 987
  }
]

const boardNews = {
  '자유게시판': [
    { id: '1', title: '프로젝트 관리 팁 공유합니다', author: '김개발', date: '10분 전', comments: 23, isHot: true },
    { id: '2', title: '새해 목표 설정하신 분들 계신가요?', author: '이기획', date: '1시간 전', comments: 45 },
    { id: '3', title: 'AI 도구 활용법 정리했어요', author: '박디자인', date: '3시간 전', comments: 67, isHot: true }
  ],
  '질문답변': [
    { id: '1', title: 'API 연동 관련 문의드립니다', author: '최개발', date: '30분 전', comments: 12, isNew: true },
    { id: '2', title: '대시보드 커스터마이징 방법', author: '정기획', date: '2시간 전', comments: 8 },
    { id: '3', title: '권한 설정 오류 해결 방법', author: '강운영', date: '5시간 전', comments: 15, isSolved: true }
  ],
  '개발자포럼': [
    { id: '1', title: 'React 19 새로운 기능 정리', author: '서프론트', date: '2시간 전', comments: 34, isHot: true },
    { id: '2', title: 'TypeScript 5.0 마이그레이션 경험', author: '김백엔드', date: '4시간 전', comments: 21 },
    { id: '3', title: '성능 최적화 베스트 프랙티스', author: '이풀스택', date: '6시간 전', comments: 18 }
  ],
  '팁과노하우': [
    { id: '1', title: '생산성 200% 높이는 단축키 모음', author: '박효율', date: '1시간 전', comments: 89, isHot: true },
    { id: '2', title: 'VS Code 필수 익스텐션 추천', author: '최도구', date: '3시간 전', comments: 56 },
    { id: '3', title: '원격 근무 환경 셋팅 가이드', author: '정리모트', date: '7시간 전', comments: 42 }
  ]
}

export function DSNoticePreview() {
  return (
    <div className="w-full space-y-8">
      {/* 최신소식 리스트 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HiMegaphone className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">최신소식</h2>
            <Badge variant="secondary">총 {notices.length}개</Badge>
          </div>
          <Button variant="outline" size="sm">
            전체보기
            <HiArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4">
          {notices.slice(0, 4).map((notice) => (
            <Card key={notice.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {notice.category}
                      </Badge>
                      {notice.isPinned && (
                        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                          📌 고정
                        </Badge>
                      )}
                      {notice.isNew && (
                        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                          <HiSparkles className="w-3 h-3 mr-1" />
                          NEW
                        </Badge>
                      )}
                      {notice.isHot && (
                        <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                          <HiFire className="w-3 h-3 mr-1" />
                          HOT
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-base line-clamp-1">
                      {notice.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notice.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <HiCalendar className="w-3 h-3" />
                        {notice.date}
                      </div>
                      {notice.viewCount && (
                        <div className="flex items-center gap-1">
                          조회 {notice.viewCount.toLocaleString()}
                        </div>
                      )}
                      {notice.tags && (
                        <div className="flex items-center gap-1">
                          {notice.tags.map(tag => (
                            <span key={tag} className="text-primary">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 게시판별 최신 소식 */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <HiNewspaper className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">게시판 최신 소식</h2>
        </div>

        <Tabs defaultValue="자유게시판" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {Object.keys(boardNews).map((board) => (
              <TabsTrigger key={board} value={board}>
                {board}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(boardNews).map(([board, posts]) => (
            <TabsContent key={board} value={board} className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{board}</CardTitle>
                    <Button variant="ghost" size="sm">
                      더보기
                      <HiArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium hover:text-primary cursor-pointer line-clamp-1">
                            {post.title}
                          </h4>
                          {post.isHot && (
                            <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-xs px-1.5 py-0">
                              <HiFire className="w-3 h-3" />
                            </Badge>
                          )}
                          {post.isNew && (
                            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs px-1.5 py-0">
                              NEW
                            </Badge>
                          )}
                          {post.isSolved && (
                            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs px-1.5 py-0">
                              해결됨
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>댓글 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}