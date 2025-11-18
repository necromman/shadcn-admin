import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Award, ArrowRight } from 'lucide-react'
import { recommendedCourses, categories } from '../../data/mockData'
import { CourseCard } from '../common/CourseCard'

export function RecommendedCoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCourses = selectedCategory === 'all'
    ? recommendedCourses
    : recommendedCourses.filter(course => course.category === selectedCategory)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                추천 과정
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                전문가가 엄선한 최고의 학습 과정
              </p>
            </div>
          </div>
          <Button variant="ghost" className="gap-2">
            전체보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 카테고리 탭 */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-6 h-auto flex-wrap bg-transparent p-0 gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-full"
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">
                  ({category.courseCount})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            {/* 데스크톱 뷰 - 4개 그리드 */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {filteredCourses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* 태블릿 뷰 - 3개 그리드 */}
            <div className="hidden md:grid lg:hidden grid-cols-3 gap-4">
              {filteredCourses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* 모바일 뷰 - 2개 그리드 */}
            <div className="grid md:hidden grid-cols-2 gap-3">
              {filteredCourses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} variant="compact" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}