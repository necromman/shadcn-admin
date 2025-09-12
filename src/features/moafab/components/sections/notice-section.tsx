import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { HiArrowRight, HiMegaphone } from 'react-icons/hi2'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'

interface NoticeItem {
  id: string
  title: string
  date: string
  isNew?: boolean
  isImportant?: boolean
}

export function NoticeSection() {
  const { settings } = useMoafabDevSettings()
  const [selectedNotices, setSelectedNotices] = useState<Set<string>>(new Set())

  // 샘플 데이터 (실제로는 API에서 가져옴)
  const notices: NoticeItem[] = useMemo(() => [
    { id: '1', title: '2024년 상반기 나노팹 서비스 이용 안내', date: '2024-01-15', isNew: true, isImportant: true },
    { id: '2', title: '장비 정기 점검 일정 공지', date: '2024-01-12', isNew: true },
    { id: '3', title: '신규 EUV 장비 도입 안내', date: '2024-01-10' },
    { id: '4', title: '서비스 이용료 개정 안내', date: '2024-01-08', isImportant: true },
    { id: '5', title: '연말연시 운영 시간 변경 안내', date: '2024-01-05' },
    { id: '6', title: '나노팹 워크샵 참가자 모집', date: '2024-01-03' },
    { id: '7', title: '시스템 정기 점검 안내', date: '2024-01-02' },
  ], [])

  // 최대 5개까지만 표시
  const displayNotices = notices.slice(0, 5)

  const handleToggleNotice = (noticeId: string) => {
    setSelectedNotices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(noticeId)) {
        newSet.delete(noticeId)
      } else {
        newSet.add(noticeId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedNotices.size === displayNotices.length) {
      setSelectedNotices(new Set())
    } else {
      setSelectedNotices(new Set(displayNotices.map(n => n.id)))
    }
  }

  return (
    <section className="py-12">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <HiMegaphone className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">공지사항</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            {selectedNotices.size > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedNotices.size}개 선택됨
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={handleSelectAll}>
              {selectedNotices.size === displayNotices.length ? '선택 해제' : '전체 선택'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {/* 공지사항 목록 */}
          {displayNotices.map((notice) => (
            <div
              key={notice.id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-colors hover:bg-accent/50 ${
                selectedNotices.has(notice.id) ? 'bg-accent' : ''
              }`}
            >
              <Checkbox
                id={`notice-${notice.id}`}
                checked={selectedNotices.has(notice.id)}
                onCheckedChange={() => handleToggleNotice(notice.id)}
                className="mt-1"
              />
              <Label
                htmlFor={`notice-${notice.id}`}
                className="flex-1 cursor-pointer space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hover:text-primary transition-colors">
                    {notice.title}
                  </span>
                  {notice.isNew && settings.notice.showBadge && (
                    <Badge variant="secondary" className="text-xs">
                      NEW
                    </Badge>
                  )}
                  {notice.isImportant && settings.notice.showBadge && (
                    <Badge variant="destructive" className="text-xs">
                      중요
                    </Badge>
                  )}
                </div>
                {settings.notice.showDate && (
                  <p className="text-xs text-muted-foreground">{notice.date}</p>
                )}
              </Label>
            </div>
          ))}

          {/* 더보기 버튼 */}
          <div className="pt-4 border-t">
            <Button variant="ghost" className="w-full" asChild>
              <a href="/moafab/support/notice">
                더 많은 공지사항 보기
                <HiArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}