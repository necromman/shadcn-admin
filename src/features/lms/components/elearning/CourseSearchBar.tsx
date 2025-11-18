import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Search, SlidersHorizontal, RotateCcw, Grid3x3, List } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ViewMode = 'grid' | 'list'

interface CourseSearchBarProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: SearchFilters) => void
  onViewModeChange?: (mode: ViewMode) => void
  viewMode?: ViewMode
  totalCount: number
  className?: string
}

export interface SearchFilters {
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
  status: 'all' | 'recruiting' | 'in-progress' | 'completed'
  priceRange: 'all' | 'free' | 'paid'
  sortBy: 'popular' | 'latest' | 'rating' | 'price'
}

export function CourseSearchBar({
  onSearch,
  onFilterChange,
  onViewModeChange,
  viewMode = 'grid', // 기본값을 grid로 변경
  totalCount,
  className
}: CourseSearchBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filters, setFilters] = React.useState<SearchFilters>({
    difficulty: 'all',
    status: 'all',
    priceRange: 'all',
    sortBy: 'popular'
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false)

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    setSearchQuery('')
    const defaultFilters: SearchFilters = {
      difficulty: 'all',
      status: 'all',
      priceRange: 'all',
      sortBy: 'popular'
    }
    setFilters(defaultFilters)
    onSearch('')
    onFilterChange(defaultFilters)
  }

  return (
    <div className={cn("bg-white dark:bg-card rounded-lg border p-6", className)}>
      {/* 검색 영역 */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="과정명, 강사명, 기관명으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
            <Search className="h-4 w-4 mr-2" />
            검색
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            상세 필터
          </Button>
        </div>

        {/* 필터 영역 */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">정렬:</label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="rating">평점순</SelectItem>
                <SelectItem value="price">가격순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">난이도:</label>
            <Select value={filters.difficulty} onValueChange={(value) => handleFilterChange('difficulty', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="beginner">초급</SelectItem>
                <SelectItem value="intermediate">중급</SelectItem>
                <SelectItem value="advanced">고급</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">상태:</label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="recruiting">모집중</SelectItem>
                <SelectItem value="in-progress">진행중</SelectItem>
                <SelectItem value="completed">종료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showAdvancedFilters && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">가격:</label>
                <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="free">무료</SelectItem>
                    <SelectItem value="paid">유료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            초기화
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              총 <span className="font-semibold text-foreground">{totalCount.toLocaleString()}</span>개 과정
            </div>

            {/* 뷰 모드 전환 */}
            {onViewModeChange && (
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && onViewModeChange(value as ViewMode)}
                className="bg-muted p-1 rounded-md"
              >
                <ToggleGroupItem
                  value="list"
                  aria-label="리스트 보기"
                  className="data-[state=on]:bg-background data-[state=on]:shadow-sm"
                >
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="grid"
                  aria-label="갤러리 보기"
                  className="data-[state=on]:bg-background data-[state=on]:shadow-sm"
                >
                  <Grid3x3 className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}