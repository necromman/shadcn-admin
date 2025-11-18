import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Star, Users, Clock, Heart, PlayCircle } from 'lucide-react'
import { Course } from '../../data/mockData'

interface CourseTableProps {
  courses: Course[]
  className?: string
}

export function CourseTable({
  courses,
  className
}: CourseTableProps) {

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-accent dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-accent dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-accent dark:text-red-200'
      default:
        return ''
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '초급'
      case 'intermediate':
        return '중급'
      case 'advanced':
        return '고급'
      default:
        return ''
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return 'bg-primary/10 text-primary dark:bg-accent dark:text-primary'
      case 'in-progress':
        return 'bg-green-100 text-green-800 dark:bg-accent dark:text-green-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-card dark:text-gray-200'
      default:
        return ''
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recruiting':
        return '모집중'
      case 'in-progress':
        return '진행중'
      case 'completed':
        return '종료'
      default:
        return ''
    }
  }

  return (
    <div className={cn("bg-white dark:bg-card rounded-lg border overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-accent border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-muted-foreground">
                과정명
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-muted-foreground">
                강사/기관
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-muted-foreground">
                난이도
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-muted-foreground">
                평점
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-muted-foreground">
                수강생
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-muted-foreground">
                기간
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-muted-foreground">
                상태
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-muted-foreground">
                액션
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={cn(
                  "border-b hover:bg-gray-50 dark:hover:bg-accent transition-colors",
                  index % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-accent/20"
                )}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 dark:text-foreground truncate">
                        {course.title}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        {course.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-1.5 py-0.5 rounded text-xs bg-gray-100 dark:bg-accent text-gray-600 dark:text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="text-gray-900 dark:text-foreground">{course.instructor}</div>
                    <div className="text-xs text-muted-foreground">{course.organization}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <Badge variant="secondary" className={cn("text-xs", getDifficultyColor(course.difficulty))}>
                    {getDifficultyText(course.difficulty)}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.studentCount.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <Badge variant="secondary" className={cn("text-xs", getStatusColor(course.status))}>
                    {getStatusText(course.status)}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      수강신청
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}