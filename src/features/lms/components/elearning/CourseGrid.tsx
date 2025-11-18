import React from 'react'
import { cn } from '@/lib/utils'
import { Course } from '../../data/mockData'
import { CourseCard } from '../common/CourseCard'

interface CourseGridProps {
  courses: Course[]
  className?: string
  columns?: 2 | 3 | 4
}

export function CourseGrid({
  courses,
  className,
  columns = 3
}: CourseGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* 강의 그리드 */}
      <div className={cn("grid gap-6", gridCols[columns])}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            variant="default"
            showActions={true}
          />
        ))}
      </div>

      {/* 빈 상태 */}
      {courses.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-950 rounded-lg border">
          <p className="text-muted-foreground">표시할 과정이 없습니다.</p>
        </div>
      )}
    </div>
  )
}