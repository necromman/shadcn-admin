import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { 
  HiMegaphone,
  HiCalendar,
  HiArrowRight,
  HiSparkles,
  HiFire,
  HiClock
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

// MOAFAB 공지사항 샘플 데이터
const libraryNotices: NoticeItem[] = [
  {
    id: '1',
    category: '시스템',
    title: '모아팹 시설 예약 시스템 업데이트 안내',
    content: '1월 15일(수) 오전 2시-4시 시스템 업데이트가 예정되어 있습니다. 업데이트 중 예약 서비스가 일시 중단됩니다.',
    date: '2025-01-10',
    isNew: true,
    isPinned: true,
    viewCount: 234
  },
  {
    id: '2',
    category: '장비',
    title: '신규 3D 프린터 도입 안내',
    content: 'Stratasys F900 산업용 3D 프린터가 새로 도입되었습니다. 대형 시제품 제작이 가능합니다.',
    date: '2025-01-09',
    isNew: true,
    isImportant: true,
    viewCount: 567
  },
  {
    id: '3',
    category: '이벤트',
    title: '중소기업 시설 활용 지원사업 모집',
    content: '중소기업과 스타트업 대상 시설 활용 지원사업을 진행합니다. 장비 사용료 50% 지원.',
    date: '2025-01-08',
    isImportant: true,
    viewCount: 892
  },
  {
    id: '4',
    category: '운영',
    title: '24시간 운영 시설 안내',
    content: '제1제작동과 제2제작동은 24시간 이용 가능합니다. 야간 이용 시 보안카드 필수.',
    date: '2025-01-07',
    isPinned: true,
    viewCount: 445
  },
  {
    id: '5',
    category: '교육',
    title: 'CNC 가공 교육 프로그램 신청 안내',
    content: 'CNC 밀링 머신 운용 교육을 실시합니다. 초급/중급/고급 과정 선택 가능.',
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
  const [selectedNotices, setSelectedNotices] = useState<string[]>([])
  
  // 설정에서 섹션 표시 여부 확인
  if (!settings.notice.showSection) {
    return null
  }
  
  // 표시할 공지사항 개수 제한 (최대 5개)
  const displayNotices = libraryNotices.slice(0, Math.min(settings.notice.itemCount || 5, 5))
  
  const handleNoticeToggle = (noticeId: string) => {
    setSelectedNotices(prev =>
      prev.includes(noticeId)
        ? prev.filter(id => id !== noticeId)
        : [...prev, noticeId]
    )
  }
  
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
  
  // 리스트 레이아웃 (체크박스 포함)
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HiMegaphone className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">최신 소식</h2>
            <Badge variant="secondary">NEW {displayNotices.filter(n => n.isNew).length}</Badge>
          </div>
          <Button variant="outline" size="sm">
            전체보기
            <HiArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y">
              {displayNotices.map((notice) => (
                <div 
                  key={notice.id} 
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={`notice-${notice.id}`}
                    checked={selectedNotices.includes(notice.id)}
                    onCheckedChange={() => handleNoticeToggle(notice.id)}
                    className="h-4 w-4"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {notice.isPinned && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0">
                              고정
                            </Badge>
                          )}
                          {notice.isNew && (
                            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs px-1.5 py-0">
                              <HiSparkles className="w-3 h-3 mr-0.5" />
                              NEW
                            </Badge>
                          )}
                          {notice.isImportant && (
                            <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-xs px-1.5 py-0">
                              <HiFire className="w-3 h-3 mr-0.5" />
                              중요
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs px-1.5 py-0">
                            {notice.category}
                          </Badge>
                        </div>
                        
                        <h3 className="font-medium text-sm mb-1 line-clamp-1">
                          {notice.title}
                        </h3>
                        
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {notice.content}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <HiCalendar className="w-3 h-3" />
                          <span>{notice.date}</span>
                        </div>
                        {notice.viewCount && (
                          <div className="flex items-center gap-1">
                            <HiClock className="w-3 h-3" />
                            <span>조회 {notice.viewCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {selectedNotices.length > 0 && (
          <div className="mt-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">
              {selectedNotices.length}개 항목 선택됨
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedNotices([])}>
                선택 해제
              </Button>
              <Button size="sm" variant="default">
                선택 항목 보기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}