import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, ArrowRight, Clock, Tag } from 'lucide-react'
import { newCourses } from '../../data/mockData'
import { CourseCard } from '../common/CourseCard'

export function NewCoursesSection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-accent/50">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                신규 과정
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                이번 달 새롭게 오픈한 최신 강좌
              </p>
            </div>
          </div>
          <Button variant="ghost" className="gap-2">
            전체보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 데스크톱 뷰 - 특별 프로모션 배너 + 카드 */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-6">
            {/* 프로모션 배너 */}
            <div className="col-span-4">
              <div className="h-full bg-primary rounded-lg p-6 text-white">
                <Badge className="bg-white/20 text-white mb-4">
                  <Tag className="h-3 w-3 mr-1" />
                  신규 오픈 특가
                </Badge>
                <h3 className="text-2xl font-bold mb-3">
                  신규 과정 20% 할인
                </h3>
                <p className="text-white/90 mb-6">
                  이번 달 새로 오픈한 모든 과정을 특별 할인가로 만나보세요!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">1월 31일까지 한정</span>
                  </div>
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    할인 쿠폰 받기
                  </Button>
                </div>
              </div>
            </div>

            {/* 신규 과정 카드 */}
            <div className="col-span-8 grid grid-cols-2 gap-4">
              {newCourses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>

        {/* 태블릿 뷰 - 가로 스크롤 */}
        <div className="hidden md:block lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {newCourses.map((course) => (
              <div key={course.id} className="min-w-[320px] snap-center">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>

        {/* 모바일 뷰 - 수직 리스트 */}
        <div className="md:hidden space-y-4">
          {newCourses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="horizontal"
            />
          ))}
          <Button variant="outline" className="w-full">
            더 많은 신규 과정 보기
          </Button>
        </div>
      </div>
    </section>
  )
}