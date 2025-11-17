import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, TrendingUp, ArrowRight } from 'lucide-react'
import { popularCourses } from '../../data/mockData'
import { CourseCard } from '../common/CourseCard'
import { cn } from '@/lib/utils'

export function PopularCoursesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex + itemsPerPage < popularCourses.length

  const goToPrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  const visibleCourses = popularCourses.slice(
    currentIndex,
    currentIndex + itemsPerPage
  )

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                실시간 인기 강좌
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                지금 가장 많은 수강생들이 선택한 과정
              </p>
            </div>
          </div>
          <Button variant="ghost" className="gap-2">
            전체보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 데스크톱 뷰 - 카드 그리드 */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {visibleCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* 네비게이션 버튼 */}
            <Button
              size="icon"
              variant="outline"
              onClick={goToPrevious}
              disabled={!canGoPrevious}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10",
                "bg-white dark:bg-gray-800 shadow-lg",
                !canGoPrevious && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={goToNext}
              disabled={!canGoNext}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10",
                "bg-white dark:bg-gray-800 shadow-lg",
                !canGoNext && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 태블릿 뷰 - 2개 그리드 */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          {popularCourses.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* 모바일 뷰 - 스크롤 가능한 리스트 */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {popularCourses.map((course) => (
              <div key={course.id} className="min-w-[280px] snap-center">
                <CourseCard course={course} variant="compact" />
              </div>
            ))}
          </div>
        </div>

        {/* 페이지네이션 인디케이터 */}
        <div className="hidden lg:flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(popularCourses.length / itemsPerPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * itemsPerPage)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === Math.floor(currentIndex / itemsPerPage)
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              )}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}