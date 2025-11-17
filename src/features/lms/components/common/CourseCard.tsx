import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  Star,
  Users,
  Clock,
  PlayCircle,
  Heart,
  ShoppingCart,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { Course } from '../../data/mockData'
import { LMS_STYLES } from '../../constants/styles'

interface CourseCardProps {
  course: Course
  className?: string
  variant?: 'default' | 'compact' | 'horizontal'
  showActions?: boolean
}

export function CourseCard({
  course,
  className,
  variant = 'default',
  showActions = true
}: CourseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'in-progress':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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


  if (variant === 'horizontal') {
    return (
      <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow", className)}>
        <div className="flex">
          <div className={cn("relative w-48 h-36 overflow-hidden", LMS_STYLES.imageRadius)}>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {course.progress !== undefined && course.progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                <Progress value={course.progress} className="h-1" />
                <span className="text-xs text-white mt-1">{course.progress}% 완료</span>
              </div>
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-base line-clamp-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor} · {course.organization}</p>
              </div>
              <div className="flex gap-1">
                <Badge variant="secondary" className={cn("text-xs", getDifficultyColor(course.difficulty))}>
                  {getDifficultyText(course.difficulty)}
                </Badge>
                <Badge variant="secondary" className={cn("text-xs", getStatusColor(course.status))}>
                  {getStatusText(course.status)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span>({course.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{course.studentCount}명</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
            </div>

            {showActions && (
              <div className="flex gap-1 justify-end">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
                  수강신청
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className={cn("group cursor-pointer", className)}>
      {/* 이미지 영역 - 중앙화된 border-radius 적용 */}
      <div className={cn("relative aspect-video mb-3 overflow-hidden", LMS_STYLES.imageRadius)}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className={cn("w-full h-full object-cover transition-transform", LMS_STYLES.transitionDuration, LMS_STYLES.imageHoverScale)}
        />
        {/* 상단 배지 */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge className={cn(
            "text-xs backdrop-blur-sm",
            getDifficultyColor(course.difficulty)
          )}>
            {getDifficultyText(course.difficulty)}
          </Badge>
          {course.status === 'recruiting' && (
            <Badge className="text-xs bg-red-500 text-white backdrop-blur-sm">
              모집중
            </Badge>
          )}
        </div>
        {/* 진행률 표시 */}
        {course.progress !== undefined && course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
            <Progress value={course.progress} className="h-1" />
            <span className="text-xs text-white mt-1">{course.progress}% 완료</span>
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 - 배경 없이 */}
      <div className="space-y-2">
        {/* 제목 */}
        <h3 className={cn(
          "font-semibold line-clamp-2 text-gray-900 dark:text-gray-100",
          variant === 'compact' ? "text-sm" : "text-base"
        )}>
          {course.title}
        </h3>

        {/* 강사 및 기관 */}
        <p className={cn(
          "text-muted-foreground",
          variant === 'compact' ? "text-xs" : "text-sm"
        )}>
          {course.instructor}
        </p>

        {/* 평점, 수강생, 수업시간 */}
        <div className={cn(
          "flex items-center gap-3 text-muted-foreground",
          variant === 'compact' ? "text-xs" : "text-sm"
        )}>
          <div className="flex items-center gap-1">
            <Star className={cn(
              "fill-yellow-400 text-yellow-400",
              variant === 'compact' ? "h-3 w-3" : "h-4 w-4"
            )} />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {course.rating}
            </span>
            <span className="text-xs">({course.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className={cn(variant === 'compact' ? "h-3 w-3" : "h-4 w-4")} />
            <span>{course.studentCount.toLocaleString()}명</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className={cn(variant === 'compact' ? "h-3 w-3" : "h-4 w-4")} />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* 태그 (compact 모드가 아닐 때만) */}
        {variant !== 'compact' && (
          <div className="flex flex-wrap gap-1 pt-2">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 액션 버튼 (hover 시 표시) */}
        {showActions && variant !== 'compact' && (
          <div className="flex gap-2 pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="outline" className="flex-1">
              <PlayCircle className="h-4 w-4 mr-1" />
              미리보기
            </Button>
            <Button size="sm" variant="ghost" className="w-10 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              수강신청
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}