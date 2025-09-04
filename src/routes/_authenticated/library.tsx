'use client'

import { LibraryCarousel } from '@/features/library/components/carousel'
import { LibraryNoticeSection } from '@/features/library/components/notice-section'
import { LibraryQuickMenu } from '@/features/library/components/quick-menu'
import { LibraryNewBooks } from '@/features/library/components/new-books'
import { DSFooterLibrary } from '@/components/design-system/ds-footer-library'

export default function LibraryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 캐러셀 섹션 - 전체 너비 */}
      <section className="w-full">
        <LibraryCarousel />
      </section>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 space-y-8">
        {/* 공지사항 섹션 - 캐러셀 바로 아래 첫 번째 */}
        <section className="pt-12">
          <LibraryNoticeSection />
        </section>

        {/* 빠른 메뉴 섹션 - 두 번째 */}
        <section>
          <LibraryQuickMenu />
        </section>

        {/* 신착도서 섹션 - 세 번째 */}
        <section>
          <LibraryNewBooks />
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t bg-background mt-12">
        <DSFooterLibrary />
      </footer>
    </div>
  )
}