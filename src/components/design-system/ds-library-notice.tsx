import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  HiMegaphone,
  HiCalendar,
  HiArrowRight,
  HiSparkles,
  HiFire,
  HiCog6Tooth,
  HiClock
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
  viewCount?: number
}

// 도서관 공지사항 샘플 데이터
const libraryNotices: NoticeItem[] = [
  {
    id: '1',
    category: '공지사항',
    title: '2025년 1월 도서관 휴관일 안내',
    content: '설 연휴 기간(1/27~1/30) 도서관이 휴관합니다. 미리 도서 대출을 받아가시기 바랍니다.',
    date: '2025-01-10',
    isNew: true,
    isPinned: true,
    viewCount: 523
  },
  {
    id: '2',
    category: '이벤트',
    title: '겨울 독서 마라톤 참가자 모집',
    content: '한 달 동안 10권 읽기 챌린지! 완주자 전원에게 도서상품권을 드립니다.',
    date: '2025-01-09',
    isNew: true,
    isHot: true,
    viewCount: 892
  },
  {
    id: '3',
    category: '안내',
    title: '전자도서관 신규 서비스 오픈',
    content: 'e-Book, 오디오북을 언제 어디서나 이용하실 수 있습니다. 회원가입 후 바로 이용 가능합니다.',
    date: '2025-01-08',
    isHot: true,
    viewCount: 1234
  },
  {
    id: '4',
    category: '공지사항',
    title: '열람실 좌석 예약 시스템 개선',
    content: '모바일 앱에서도 실시간 좌석 예약이 가능합니다. 노쇼 방지를 위한 체크인 기능도 추가되었습니다.',
    date: '2025-01-07',
    viewCount: 456
  },
  {
    id: '5',
    category: '프로그램',
    title: '1월 독서토론회 참가자 모집',
    content: '매주 토요일 오후 2시, 함께 책을 읽고 생각을 나눠요. 이번 달 선정도서는 「미드나잇 라이브러리」입니다.',
    date: '2025-01-06',
    viewCount: 289
  },
  {
    id: '6',
    category: '안내',
    title: '도서 반납 연체료 인하 안내',
    content: '2025년부터 연체료가 일 100원으로 인하됩니다. 기한 내 반납에 협조 부탁드립니다.',
    date: '2025-01-05',
    viewCount: 678
  }
]

// 게시판 데이터
interface BoardPost {
  id: string
  title: string
  date?: string
  author?: string
  isNew?: boolean
  isPinned?: boolean
  comments?: number
  views?: number
}

interface BoardData {
  id: string
  type: string
  posts: BoardPost[]
}

const boardPosts: BoardData[] = [
  {
    id: 'notice',
    type: '공지사항',
    posts: [
      { id: '1', title: '2025년 상반기 신착도서 입수 일정', date: '2025-01-10', isNew: true },
      { id: '2', title: '디지털 자료실 이용 안내', date: '2025-01-09', isPinned: true },
      { id: '3', title: '도서관 이용 에티켓 안내', date: '2025-01-08' },
      { id: '4', title: '무인 반납함 설치 위치 안내', date: '2025-01-07' },
      { id: '5', title: '회원증 재발급 절차 변경', date: '2025-01-06' }
    ]
  },
  {
    id: 'event',
    type: '행사/프로그램',
    posts: [
      { id: '1', title: '작가와의 만남 - 김영하 작가 초청', views: 1523, isNew: true },
      { id: '2', title: '어린이 동화구연 프로그램', views: 892 },
      { id: '3', title: '시니어 스마트폰 활용 교육', views: 456 },
      { id: '4', title: '청소년 진로독서 프로그램', views: 234 },
      { id: '5', title: '북스타트 신청 안내', views: 789, isPinned: true }
    ]
  },
  {
    id: 'recommend',
    type: '추천도서',
    posts: [
      { id: '1', title: '[1월 추천] 트렌드 코리아 2025', author: '사서추천', comments: 12 },
      { id: '2', title: '[베스트] 불편한 편의점 시리즈', author: '이용자추천', comments: 34 },
      { id: '3', title: '[신간] AI 시대의 인문학', author: '사서추천', comments: 8 },
      { id: '4', title: '[청소년] 완벽한 계획은 없다', author: '사서추천', comments: 5 },
      { id: '5', title: '[어린이] 이상한 과자 가게 전천당', author: '이용자추천', comments: 23 }
    ]
  }
]

export function DSLibraryNotice() {
  // 콘텐츠 표시 상태 관리
  const [contentVisibility, setContentVisibility] = useState({
    notices: true,     // 공지사항 목록 기본 표시
    boards: true,      // 게시판 기본 표시
    compact: false     // 간단 보기 모드
  })

  const toggleContent = (section: keyof typeof contentVisibility) => {
    setContentVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="w-full space-y-8">
      {/* 콘텐츠 표시 옵션 */}
      <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <HiCog6Tooth className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
          <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">콘텐츠 표시 옵션</span>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notices"
              checked={contentVisibility.notices}
              onCheckedChange={() => toggleContent('notices')}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label
              htmlFor="notices"
              className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
            >
              공지사항 목록
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="boards"
              checked={contentVisibility.boards}
              onCheckedChange={() => toggleContent('boards')}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label
              htmlFor="boards"
              className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
            >
              게시판 섹션
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="compact"
              checked={contentVisibility.compact}
              onCheckedChange={() => toggleContent('compact')}
              className="h-4 w-4 border-slate-400 dark:border-border"
            />
            <Label
              htmlFor="compact"
              className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
            >
              간단 보기
            </Label>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
          원하는 콘텐츠만 선택하여 표시할 수 있습니다
        </p>
      </div>

      {/* 공지사항 리스트 */}
      {contentVisibility.notices && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <HiMegaphone className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">도서관 소식</h2>
              <Badge variant="secondary">총 {libraryNotices.length}개</Badge>
            </div>
            <Button variant="outline" size="sm">
              전체보기
              <HiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            {libraryNotices.slice(0, contentVisibility.compact ? 3 : 4).map((notice) => (
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
                            인기
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-base line-clamp-1">
                        {notice.title}
                      </h3>
                      
                      {!contentVisibility.compact && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notice.content}
                        </p>
                      )}
                      
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 게시판 섹션 */}
      {contentVisibility.boards && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <HiClock className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">도서관 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {boardPosts.map((board) => (
              <Card key={board.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{board.type}</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <HiArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {board.posts.slice(0, contentVisibility.compact ? 3 : 5).map((post, idx) => (
                    <div 
                      key={post.id} 
                      className={`pb-3 ${idx < (contentVisibility.compact ? 2 : 4) ? 'border-b border-border/50' : ''}`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium hover:text-primary cursor-pointer line-clamp-2 flex-1">
                            {post.title}
                          </h4>
                          {post.isPinned && (
                            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" variant="secondary">
                              📌
                            </Badge>
                          )}
                          {post.isNew && (
                            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" variant="secondary">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {post.date && (
                            <>
                              <HiClock className="h-3 w-3" />
                              <span>{post.date}</span>
                            </>
                          )}
                          {post.author && (
                            <>
                              {post.date && <span>·</span>}
                              <span>{post.author}</span>
                            </>
                          )}
                          {post.comments !== undefined && (
                            <>
                              {(post.date || post.author) && <span>·</span>}
                              <span>댓글 {post.comments}</span>
                            </>
                          )}
                          {post.views !== undefined && (
                            <>
                              {(post.date || post.author || post.comments !== undefined) && <span>·</span>}
                              <span>조회 {post.views}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      {board.type} 더보기
                      <HiArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}