import { LibraryCarousel } from '../components/carousel'
import { LibraryNoticeSection } from '../components/notice-section'
import { LibraryQuickMenu } from '../components/quick-menu'
import { LibraryNewBooks } from '../components/new-books'
import { LibraryStudyRoomStatus } from '../components/library-study-room-status'
import { LibraryOperationHours } from '../components/library-operation-hours'
import { LibraryBookStatus } from '../components/library-book-status'
import { LibraryLayout } from '../components/layout'
import { LibraryDevSettingsProvider } from '../context/dev-settings-provider'
import { LibraryDevSettingsPanel } from '../components/dev-settings-panel'

function HomePageContent() {
  return (
    <div className="space-y-0">
      {/* 메인 캐러셀 - 전체 너비 */}
      <LibraryCarousel />

      {/* 빠른 메뉴 섹션 - 캐러셀 바로 아래 첫 번째 */}
      <section>
        <LibraryQuickMenu />
      </section>

      {/* 공지사항 섹션 - 두 번째 */}
      <section className="pt-8 pb-6">
        <LibraryNoticeSection />
      </section>

      {/* 도서관 정보 섹션 */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">도서관 현황</h2>
            <p className="text-muted-foreground">실시간 도서관 이용 정보를 확인하세요</p>
          </div>

          {/* 정보 카드 그리드 */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* 열람실 현황 */}
            <div className="lg:col-span-4">
              <LibraryStudyRoomStatus />
            </div>

            {/* 운영 시간 */}
            <div className="lg:col-span-4">
              <LibraryOperationHours />
            </div>

            {/* 도서 현황 */}
            <div className="lg:col-span-4">
              <LibraryBookStatus />
            </div>
          </div>
        </div>
      </section>

      {/* 신착도서 섹션 - 마지막 */}
      <section>
        <LibraryNewBooks />
      </section>
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