import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CourseCard } from '../common/CourseCard'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Course } from '../../data/mockData'

interface CategoryCoursesSectionProps {
  title: string
  courses: Course[]
  categoryId: string
  className?: string
  variant?: 'default' | 'compact'
}

export function CategoryCoursesSection({
  title,
  courses,
  categoryId,
  className,
  variant = 'default'
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

  return (
    <section className={cn("py-8", className)}>
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                전체보기
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
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
                  <div key={course.id} className="flex-none w-[300px]">
                    <CourseCard
                      course={course}
                      variant={variant === 'compact' ? 'compact' : 'default'}
                      showActions={true}
                    />
                  </div>
                ))}

                {/* 더보기 카드 */}
                {courses.length >= 4 && (
                  <div className="flex-none w-[300px]">
                    <Card className="h-full flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer bg-gray-50 dark:bg-gray-800 border-dashed">
                      <CardContent className="text-center p-6">
                        <MoreHorizontal className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          더 많은 과정 보기
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {categoryId} 카테고리 전체
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}