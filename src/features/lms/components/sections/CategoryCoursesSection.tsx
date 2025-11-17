import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { CourseCard } from '../common/CourseCard'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Course } from '../../data/mockData'
import { LMS_STYLES } from '../../constants/styles'

interface CategoryCoursesSectionProps {
  title: string
  courses: Course[]
  categoryId: string
  className?: string
  variant?: 'default' | 'compact'
  sectionIndex?: number
}

export function CategoryCoursesSection({
  title,
  courses,
  categoryId,
  className,
  variant = 'default',
  sectionIndex = 0
}: CategoryCoursesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // 카드 너비 + 간격
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })

      setTimeout(updateScrollButtons, 300)
    }
  }

  // odd/even 패턴으로 배경색 적용 (중앙화된 스타일 사용)
  const isEven = sectionIndex % 2 === 0
  const sectionBg = isEven
    ? LMS_STYLES.sectionBg.even
    : LMS_STYLES.sectionBg.odd

  return (
    <section className={cn("w-full py-12", sectionBg, className)}>
      <div className="container mx-auto px-4">
        <div>
          {/* 섹션 헤더 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>

          {/* 과정 카드 영역 */}
          <div className="relative">
            {/* 좌측 스크롤 버튼 */}
            {canScrollLeft && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* 우측 스크롤 버튼 */}
            {canScrollRight && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* 과정 카드 컨테이너 */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              onScroll={updateScrollButtons}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {courses.map((course) => (
                <div key={course.id} className={cn("flex-none", LMS_STYLES.cardWidth)}>
                  <CourseCard
                    course={course}
                    variant={variant === 'compact' ? 'compact' : 'default'}
                    showActions={true}
                  />
                </div>
              ))}

              {/* 더보기 카드 - 새로운 스타일에 맞춰 수정 */}
              {courses.length >= 8 && (
                <div className={cn("flex-none", LMS_STYLES.cardWidth)}>
                  <div className="h-full flex flex-col items-center justify-center cursor-pointer group">
                    <div className={cn(
                      "aspect-video w-full mb-3 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors",
                      LMS_STYLES.imageRadius
                    )}>
                      <MoreHorizontal className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        더 많은 과정 보기
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {categoryId === 'recommended' ? '추천' :
                         categoryId === 'career' ? '커리어' :
                         categoryId === 'new' ? '신규' :
                         categoryId === 'metaverse' ? '메타버스' :
                         categoryId === 'bigdata' ? '빅데이터' :
                         categoryId === 'ai' ? 'AI' : categoryId} 전체보기
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}