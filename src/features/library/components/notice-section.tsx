import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { 
  HiMegaphone,
  HiCalendar,
  HiArrowRight,
  HiSparkles,
  HiFire
} from 'react-icons/hi2'

interface NoticeItem {
  id: string
  category: string
  title: string
  content: string
  date: string
  isNew?: boolean
  isImportant?: boolean
  isPinned?: boolean
  viewCount?: number
}

// 도서관 공지사항 샘플 데이터
const libraryNotices: NoticeItem[] = [
  {
    id: '1',
    category: '시스템',
    title: '도서관 시스템 정기 점검 안내',
    content: '1월 15일(수) 오전 2시-4시 시스템 점검이 예정되어 있습니다. 점검 시간 동안 온라인 서비스 이용이 제한됩니다.',
    date: '2025-01-10',
    isNew: true,
    isPinned: true,
    viewCount: 234
  },
  {
    id: '2',
    category: '신착도서',
    title: '2025년 1월 신착도서 입고 안내',
    content: '이번 달 신착도서 150권이 입고되었습니다. 인문학, 경영학, IT 분야의 최신 도서들을 만나보세요.',
    date: '2025-01-09',
    isNew: true,
    isImportant: true,
    viewCount: 567
  },
  {
    id: '3',
    category: '이벤트',
    title: '겨울 독서 마라톤 참가자 모집',
    content: '1월 한 달간 독서 마라톤을 진행합니다. 완주자에게는 도서 대출 권수 확대 혜택을 드립니다.',
    date: '2025-01-08',
    isImportant: true,
    viewCount: 892
  },
  {
    id: '4',
    category: '운영',
    title: '열람실 운영 시간 변경 안내',
    content: '시험기간을 맞아 1월 20일부터 열람실 운영 시간을 24시간으로 연장합니다.',
    date: '2025-01-07',
    isPinned: true,
    viewCount: 445
  },
  {
    id: '5',
    category: '교육',
    title: '전자책 이용 교육 신청 안내',
    content: '전자책 플랫폼 이용법 교육을 실시합니다. 신청은 홈페이지에서 가능합니다.',
    date: '2025-01-06',
    viewCount: 123
  },
  {
    id: '6',
    category: '시설',
    title: '스터디룸 예약 시스템 개선',
    content: '스터디룸 예약이 이제 모바일에서도 가능합니다. 최대 4시간까지 예약 가능합니다.',
    date: '2025-01-05',
    viewCount: 334
  },
  {
    id: '7',
    category: '서비스',
    title: '도서 배달 서비스 시작',
    content: '거동이 불편한 이용자를 위한 도서 배달 서비스를 시작합니다. 자세한 내용은 문의 바랍니다.',
    date: '2025-01-04',
    viewCount: 156
  },
  {
    id: '8',
    category: '정책',
    title: '연체료 정책 변경 안내',
    content: '2025년부터 도서 연체료가 일 100원에서 200원으로 변경됩니다.',
    date: '2025-01-03',
    viewCount: 789
  },
  {
    id: '9',
    category: '행사',
    title: '저자와의 만남 - 김영하 작가',
    content: '1월 25일 오후 3시, 김영하 작가와의 만남이 진행됩니다. 선착순 100명 신청 가능합니다.',
    date: '2025-01-02',
    isImportant: true,
    viewCount: 1234
  },
  {
    id: '10',
    category: '공지',
    title: '개인정보처리방침 개정 안내',
    content: '개인정보보호법 개정에 따라 개인정보처리방침이 일부 변경되었습니다.',
    date: '2025-01-01',
    viewCount: 89
  }
]

export function LibraryNoticeSection() {
  const { settings } = useLibraryDevSettings()
  
  // 설정에서 섹션 표시 여부 확인
  if (!settings.notice.showSection) {
    return null
  }
  
  // 표시할 공지사항 개수 제한
  const displayNotices = libraryNotices.slice(0, settings.notice.itemCount)
  
  // 카드 레이아웃
  if (settings.notice.layout === 'card') {
    return (
      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <HiMegaphone className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">공지사항</h2>
              <Badge variant="secondary">총 {libraryNotices.length}개</Badge>
            </div>
            <Button variant="outline" size="sm">
              전체보기
              <HiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayNotices.map((notice) => (
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
                            고정
                          </Badge>
                        )}
                        {notice.isNew && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                            <HiSparkles className="w-3 h-3 mr-1" />
                            NEW
                          </Badge>
                        )}
                        {notice.isImportant && (
                          <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                            <HiFire className="w-3 h-3 mr-1" />
                            중요
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {notice.title}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notice.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <HiCalendar className="w-3 h-3" />
                          {notice.date}
                        </div>
                        {notice.viewCount && (
                          <div className="flex items-center gap-1">
                            조회 {notice.viewCount}
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
      </div>
    )
  }
  
  // 리스트 레이아웃
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HiMegaphone className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">공지사항</h2>
            <Badge variant="secondary">총 {libraryNotices.length}개</Badge>
          </div>
          <Button variant="outline" size="sm">
            전체보기
            <HiArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {displayNotices.map((notice) => (
            <Card key={notice.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {notice.category}
                      </Badge>
                      <h3 className="font-semibold text-base flex-1">
                        {notice.title}
                      </h3>
                      {notice.isPinned && (
                        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                          고정
                        </Badge>
                      )}
                      {notice.isNew && (
                        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                          NEW
                        </Badge>
                      )}
                      {notice.isImportant && (
                        <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                          중요
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{notice.date}</span>
                      {notice.viewCount && (
                        <span>조회 {notice.viewCount}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}