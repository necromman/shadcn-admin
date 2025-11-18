import React from 'react'
import { LmsTopBar } from '../components/header/LmsTopBar'
import { LmsMainHeader } from '../components/header/LmsMainHeader'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { CategorySidebar } from '../components/elearning/CategorySidebar'
import { CourseSearchBar, SearchFilters, ViewMode } from '../components/elearning/CourseSearchBar'
import { CourseTable } from '../components/elearning/CourseTable'
import { CourseGrid } from '../components/elearning/CourseGrid'
import { Pagination } from '../components/common/Pagination'
import { mockCourses } from '../data/mockData'

export function ElearningPage() {
  // 상태 관리
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filters, setFilters] = React.useState<SearchFilters>({
    difficulty: 'all',
    status: 'all',
    priceRange: 'all',
    sortBy: 'popular'
  })
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(12) // 그리드 뷰 기본값
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid') // 기본값을 grid로 변경

  // 뷰 모드에 따른 기본 아이템 수
  React.useEffect(() => {
    if (viewMode === 'grid') {
      setItemsPerPage(12) // 그리드 뷰에서는 12개
    } else {
      setItemsPerPage(20) // 리스트 뷰에서는 20개
    }
    setCurrentPage(1)
  }, [viewMode])

  // 데이터 필터링 및 정렬
  const filteredCourses = React.useMemo(() => {
    let courses = [...mockCourses]

    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      // 여기서는 목업이므로 간단히 처리
      courses = courses.filter(course => {
        if (selectedCategory === 'it-sw') return course.tags.some(tag => tag.includes('프로그래밍') || tag.includes('개발'))
        if (selectedCategory === 'design') return course.tags.some(tag => tag.includes('디자인'))
        if (selectedCategory === 'business') return course.tags.some(tag => tag.includes('비즈니스'))
        if (selectedCategory === 'language') return course.tags.some(tag => tag.includes('외국어'))
        return true
      })
    }

    // 검색어 필터링
    if (searchQuery) {
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.organization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 난이도 필터링
    if (filters.difficulty !== 'all') {
      courses = courses.filter(course => course.difficulty === filters.difficulty)
    }

    // 상태 필터링
    if (filters.status !== 'all') {
      courses = courses.filter(course => course.status === filters.status)
    }

    // 가격 필터링
    if (filters.priceRange === 'free') {
      courses = courses.filter(course => course.price === 0)
    } else if (filters.priceRange === 'paid') {
      courses = courses.filter(course => course.price > 0)
    }

    // 정렬
    switch (filters.sortBy) {
      case 'popular':
        courses.sort((a, b) => b.studentCount - a.studentCount)
        break
      case 'latest':
        courses.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        break
      case 'rating':
        courses.sort((a, b) => b.rating - a.rating)
        break
      case 'price':
        courses.sort((a, b) => a.price - b.price)
        break
    }

    return courses
  }, [selectedCategory, searchQuery, filters])

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 이벤트 핸들러
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1) // 카테고리 변경 시 첫 페이지로
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
  }

  return (
    <>
      {/* 헤더 */}
      <LmsTopBar />
      <LmsMainHeader />

      {/* 서브페이지 레이아웃 */}
      <SubPageLayout
        sidebar={
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        }
      >
        <div className="space-y-6 py-6">
          {/* 페이지 제목 */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">이러닝 과정</h1>
            <p className="text-sm text-muted-foreground mt-1">
              다양한 분야의 온라인 학습 과정을 찾아보세요
            </p>
          </div>

          {/* 검색 필터 */}
          <CourseSearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onViewModeChange={handleViewModeChange}
            viewMode={viewMode}
            totalCount={filteredCourses.length}
          />

          {/* 강의 목록 - 뷰 모드에 따라 다른 컴포넌트 렌더링 */}
          {viewMode === 'list' ? (
            <CourseTable
              courses={paginatedCourses}
            />
          ) : (
            <CourseGrid
              courses={paginatedCourses}
              columns={3}
            />
          )}

          {/* 페이지네이션 */}
          {filteredCourses.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredCourses.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}

          {/* 빈 상태 */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-card rounded-lg border">
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
              <p className="text-sm text-muted-foreground mt-1">다른 검색어나 필터를 시도해보세요.</p>
            </div>
          )}
        </div>
      </SubPageLayout>
    </>
  )
}