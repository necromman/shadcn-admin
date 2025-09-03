import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, Users, Calendar, Clock, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { LibraryCarousel } from '../components/carousel'
import { LibraryLayout } from '../components/layout'
import { LibraryDevSettingsProvider } from '../context/dev-settings-provider'
import { LibraryDevSettingsPanel } from '../components/dev-settings-panel'

function HomePageContent() {
  const quickServices = [
    { icon: Search, title: '자료검색', link: '/' },
    { icon: Calendar, title: '좌석예약', link: '/' },
    { icon: BookOpen, title: '희망도서', link: '/' },
    { icon: Users, title: '대출연장', link: '/' },
  ]

  const notices = [
    { id: 1, title: '[중요] 시스템 점검 안내', date: '2024-01-10' },
    { id: 2, title: '1월 도서관 이용 안내', date: '2024-01-08' },
    { id: 3, title: '겨울방학 운영시간 변경', date: '2024-01-05' },
    { id: 4, title: '신착도서 입고 안내', date: '2024-01-03' },
    { id: 5, title: '연체료 납부 방법 변경', date: '2023-12-28' },
  ]

  const newBooks = [
    { id: 1, title: '도서관의 미래', author: '김도서' },
    { id: 2, title: '디지털 라이브러리', author: '이정보' },
    { id: 3, title: '지식의 숲', author: '박학습' },
    { id: 4, title: '독서의 즐거움', author: '최책읽' },
  ]

  return (
    <div className="space-y-8">
      {/* 메인 캐러셀 - 전체 너비 */}
      <LibraryCarousel />

      {/* 컨테이너 래퍼 - 나머지 콘텐츠 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
        {/* Quick Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickServices.map((service) => (
            <Link key={service.title} to={service.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <service.icon className="h-12 w-12 mb-3 text-primary" />
                  <span className="text-lg font-semibold">{service.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Notices and Library Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Notices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>공지사항</CardTitle>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  더보기 <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {notices.map((notice) => (
                  <li key={notice.id} className="flex justify-between items-center hover:bg-muted p-2 rounded transition-colors">
                    <span className="text-sm">{notice.title}</span>
                    <span className="text-xs text-muted-foreground">{notice.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Library Info */}
          <Card>
            <CardHeader>
              <CardTitle>도서관 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" /> 오늘의 개관시간
                </h4>
                <p className="text-sm text-muted-foreground">평일: 09:00 - 22:00</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">열람실 좌석현황</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>제1열람실</span>
                    <span className="text-primary">65/100석</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>제2열람실</span>
                    <span className="text-primary">45/80석</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>스터디룸</span>
                    <span className="text-primary">3/10실</span>
                  </div>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link to="/">좌석 예약하기</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* New Books */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>신착도서</CardTitle>
            <Link to="/">
              <Button variant="ghost" size="sm">
                더보기 <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newBooks.map((book) => (
                <div key={book.id} className="text-center">
                  <div className="w-full h-48 bg-muted rounded-md mb-2 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-1">{book.title}</h4>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function LibraryHomePage() {
  return (
    <LibraryDevSettingsProvider>
      <LibraryDevSettingsPanel />
      <LibraryLayout>
        <HomePageContent />
      </LibraryLayout>
    </LibraryDevSettingsProvider>
  )
}