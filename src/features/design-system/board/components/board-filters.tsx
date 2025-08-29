'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  HiFilter,
  HiRefresh,
  HiTag,
  HiStar,
  HiEye,
  HiChat,
  HiLockClosed,
  HiSpeakerphone
} from 'react-icons/hi'
export interface FilterOptions {
  categories?: string[]
  tags?: string[]
  authors?: string[]
  dateRange?: {
    from: Date | null
    to: Date | null
  }
  status?: ('all' | 'published' | 'draft' | 'archived')[]
  visibility?: ('all' | 'public' | 'private' | 'locked')[]
  features?: {
    hasPinned?: boolean
    hasImages?: boolean
    hasAttachments?: boolean
    hasComments?: boolean
  }
  statistics?: {
    minViews?: number
    maxViews?: number
    minLikes?: number
    maxLikes?: number
    minComments?: number
    maxComments?: number
  }
  sortBy?: 'latest' | 'oldest' | 'popular' | 'views' | 'likes' | 'comments'
  viewType?: 'table' | 'card' | 'gallery' | 'list'
}

interface BoardFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onReset?: () => void
  availableCategories?: string[]
  availableTags?: string[]
  className?: string
}

export function BoardFilters({
  filters,
  onFilterChange,
  onReset,
  availableCategories = [],
  availableTags = []
}: BoardFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters)

  const handleFilterChange = (key: keyof FilterOptions, value: FilterOptions[keyof FilterOptions]) => {
    const newFilters = { ...tempFilters, [key]: value }
    setTempFilters(newFilters)
  }

  const handleApply = () => {
    onFilterChange(tempFilters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      categories: [],
      tags: [],
      authors: [],
      status: ['published'],
      visibility: ['public'],
      sortBy: 'latest',
      viewType: 'table'
    }
    setTempFilters(defaultFilters)
    onReset?.()
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (tempFilters.categories?.length) count += tempFilters.categories.length
    if (tempFilters.tags?.length) count += tempFilters.tags.length
    if (tempFilters.authors?.length) count += tempFilters.authors.length
    if (tempFilters.dateRange?.from || tempFilters.dateRange?.to) count++
    if (tempFilters.features?.hasPinned) count++
    if (tempFilters.features?.hasImages) count++
    if (tempFilters.features?.hasAttachments) count++
    if (tempFilters.statistics?.minViews) count++
    if (tempFilters.statistics?.minLikes) count++
    return count
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['categories', 'sort']} className="w-full">
        {/* Sort and View */}
        <AccordionItem value="sort">
          <AccordionTrigger>정렬 및 보기</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2">정렬 기준</Label>
              <Select
                value={tempFilters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value as 'latest' | 'oldest' | 'popular' | 'views' | 'likes' | 'comments')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="oldest">오래된순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="views">조회순</SelectItem>
                  <SelectItem value="likes">좋아요순</SelectItem>
                  <SelectItem value="comments">댓글순</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2">보기 방식</Label>
              <RadioGroup
                value={tempFilters.viewType}
                onValueChange={(value) => handleFilterChange('viewType', value as 'table' | 'card' | 'gallery' | 'list')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="table" id="table" />
                  <Label htmlFor="table" className="font-normal cursor-pointer">테이블</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="font-normal cursor-pointer">카드</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gallery" id="gallery" />
                  <Label htmlFor="gallery" className="font-normal cursor-pointer">갤러리</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="list" />
                  <Label htmlFor="list" className="font-normal cursor-pointer">리스트</Label>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        {availableCategories.length > 0 && (
          <AccordionItem value="categories">
            <AccordionTrigger>
              카테고리
              {tempFilters.categories?.length ? (
                <Badge variant="secondary" className="ml-2">
                  {tempFilters.categories.length}
                </Badge>
              ) : null}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {availableCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={tempFilters.categories?.includes(category) ?? false}
                      onCheckedChange={(checked) => {
                        const current = tempFilters.categories || []
                        const newCategories = checked
                          ? [...current, category]
                          : current.filter(c => c !== category)
                        handleFilterChange('categories', newCategories)
                      }}
                    />
                    <Label
                      htmlFor={`cat-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Tags */}
        {availableTags.length > 0 && (
          <AccordionItem value="tags">
            <AccordionTrigger>
              태그
              {tempFilters.tags?.length ? (
                <Badge variant="secondary" className="ml-2">
                  {tempFilters.tags.length}
                </Badge>
              ) : null}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={tempFilters.tags?.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = tempFilters.tags || []
                      const newTags = current.includes(tag)
                        ? current.filter(t => t !== tag)
                        : [...current, tag]
                      handleFilterChange('tags', newTags)
                    }}
                  >
                    <HiTag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Status & Visibility */}
        <AccordionItem value="status">
          <AccordionTrigger>상태 및 공개 설정</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2">게시 상태</Label>
              <div className="space-y-2">
                {['published', 'draft', 'archived'].map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={tempFilters.status?.includes(status as 'published' | 'draft' | 'archived') ?? false}
                      onCheckedChange={(checked) => {
                        const current = tempFilters.status || []
                        const newStatus = checked
                          ? [...current, status]
                          : current.filter(s => s !== status)
                        handleFilterChange('status', newStatus)
                      }}
                    />
                    <Label
                      htmlFor={`status-${status}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {status === 'published' && '게시됨'}
                      {status === 'draft' && '초안'}
                      {status === 'archived' && '보관됨'}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2">공개 설정</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vis-public"
                    checked={tempFilters.visibility?.includes('public') ?? false}
                    onCheckedChange={(checked) => {
                      const current = tempFilters.visibility || []
                      const newVis = checked
                        ? [...current, 'public']
                        : current.filter(v => v !== 'public')
                      handleFilterChange('visibility', newVis)
                    }}
                  />
                  <Label htmlFor="vis-public" className="text-sm font-normal cursor-pointer">
                    공개
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vis-private"
                    checked={tempFilters.visibility?.includes('private') ?? false}
                    onCheckedChange={(checked) => {
                      const current = tempFilters.visibility || []
                      const newVis = checked
                        ? [...current, 'private']
                        : current.filter(v => v !== 'private')
                      handleFilterChange('visibility', newVis)
                    }}
                  />
                  <Label htmlFor="vis-private" className="text-sm font-normal cursor-pointer">
                    <HiLockClosed className="h-3 w-3 inline mr-1" />
                    비공개
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vis-locked"
                    checked={tempFilters.visibility?.includes('locked') ?? false}
                    onCheckedChange={(checked) => {
                      const current = tempFilters.visibility || []
                      const newVis = checked
                        ? [...current, 'locked']
                        : current.filter(v => v !== 'locked')
                      handleFilterChange('visibility', newVis)
                    }}
                  />
                  <Label htmlFor="vis-locked" className="text-sm font-normal cursor-pointer">
                    잠김
                  </Label>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Features */}
        <AccordionItem value="features">
          <AccordionTrigger>특징</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feat-pinned"
                  checked={tempFilters.features?.hasPinned ?? false}
                  onCheckedChange={(checked) => {
                    handleFilterChange('features', {
                      ...tempFilters.features,
                      hasPinned: checked as boolean
                    })
                  }}
                />
                <Label htmlFor="feat-pinned" className="text-sm font-normal cursor-pointer">
                  <HiSpeakerphone className="h-3 w-3 inline mr-1" />
                  고정된 글
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feat-images"
                  checked={tempFilters.features?.hasImages ?? false}
                  onCheckedChange={(checked) => {
                    handleFilterChange('features', {
                      ...tempFilters.features,
                      hasImages: checked as boolean
                    })
                  }}
                />
                <Label htmlFor="feat-images" className="text-sm font-normal cursor-pointer">
                  이미지 포함
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feat-attachments"
                  checked={tempFilters.features?.hasAttachments ?? false}
                  onCheckedChange={(checked) => {
                    handleFilterChange('features', {
                      ...tempFilters.features,
                      hasAttachments: checked as boolean
                    })
                  }}
                />
                <Label htmlFor="feat-attachments" className="text-sm font-normal cursor-pointer">
                  첨부파일 포함
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feat-comments"
                  checked={tempFilters.features?.hasComments ?? false}
                  onCheckedChange={(checked) => {
                    handleFilterChange('features', {
                      ...tempFilters.features,
                      hasComments: checked as boolean
                    })
                  }}
                />
                <Label htmlFor="feat-comments" className="text-sm font-normal cursor-pointer">
                  댓글 있음
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Statistics */}
        <AccordionItem value="statistics">
          <AccordionTrigger>통계 범위</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2">
                <HiEye className="h-3 w-3 inline mr-1" />
                조회수: {tempFilters.statistics?.minViews || 0} - {tempFilters.statistics?.maxViews || 10000}
              </Label>
              <Slider
                value={[tempFilters.statistics?.minViews || 0, tempFilters.statistics?.maxViews || 10000]}
                onValueChange={([min, max]) => {
                  handleFilterChange('statistics', {
                    ...tempFilters.statistics,
                    minViews: min,
                    maxViews: max
                  })
                }}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2">
                <HiStar className="h-3 w-3 inline mr-1" />
                좋아요: {tempFilters.statistics?.minLikes || 0} - {tempFilters.statistics?.maxLikes || 1000}
              </Label>
              <Slider
                value={[tempFilters.statistics?.minLikes || 0, tempFilters.statistics?.maxLikes || 1000]}
                onValueChange={([min, max]) => {
                  handleFilterChange('statistics', {
                    ...tempFilters.statistics,
                    minLikes: min,
                    maxLikes: max
                  })
                }}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2">
                <HiChat className="h-3 w-3 inline mr-1" />
                댓글: {tempFilters.statistics?.minComments || 0} - {tempFilters.statistics?.maxComments || 500}
              </Label>
              <Slider
                value={[tempFilters.statistics?.minComments || 0, tempFilters.statistics?.maxComments || 500]}
                onValueChange={([min, max]) => {
                  handleFilterChange('statistics', {
                    ...tempFilters.statistics,
                    minComments: min,
                    maxComments: max
                  })
                }}
                max={500}
                step={5}
                className="w-full"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action buttons */}
      <div className="flex gap-2 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          <HiRefresh className="h-4 w-4 mr-1" />
          초기화
        </Button>
        <Button
          onClick={handleApply}
          className="flex-1"
        >
          필터 적용
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )

  // 모든 디바이스에서 Sheet 사용 (버튼 클릭 시에만 표시)
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="default" className="gap-1.5">
          <HiFilter className="h-4 w-4" />
          <span className="hidden sm:inline">필터</span>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-1">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>게시판 필터</SheetTitle>
        </SheetHeader>
        <div className="mt-6 h-full overflow-y-auto pb-20">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  )
}