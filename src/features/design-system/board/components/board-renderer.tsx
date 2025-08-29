'use client'
import { useMemo } from 'react'
import { type Post, type BoardConfig } from '../types/board.types'
import { BoardTableView } from './views/board-table-view'
import { BoardCardView } from './views/board-card-view'
import { BoardGalleryView } from './views/board-gallery-view'
import { BoardListView } from './views/board-list-view'
import { BoardPagination } from './board-pagination'
import { Loader2 } from 'lucide-react'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll'

interface BoardRendererProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  currentPage: number
  totalPages: number
  totalPosts: number
  onPageChange: (page: number) => void
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  isLoading?: boolean
}

// 무한스크롤 로더 컴포넌트
function InfiniteScrollLoader({ 
  hasMore, 
  isLoadingMore, 
  onLoadMore, 
  posts 
}: { 
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
  posts: Post[]
}) {
  const { setLoadingElement } = useInfiniteScroll({
    hasMore: !!hasMore,
    loading: !!isLoadingMore,
    onLoadMore: onLoadMore || (() => {}),
    enabled: true,
    threshold: 200
  })

  return (
    <div className="flex justify-center py-4">
      {isLoadingMore && (
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      )}
      {!isLoadingMore && hasMore && (
        <div ref={setLoadingElement} className="h-10 flex items-center">
          <span className="text-sm text-muted-foreground">스크롤하여 더 보기</span>
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <p className="text-sm text-muted-foreground">
          모든 게시글을 불러왔습니다
        </p>
      )}
    </div>
  )
}

/**
 * 통합 게시판 렌더러
 * 모든 게시판 타입과 뷰 타입을 처리하는 단일 컴포넌트
 */
export function BoardRenderer({
  posts,
  config,
  onPostClick,
  currentPage,
  totalPages,
  totalPosts,
  onPageChange,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isLoading = false
}: BoardRendererProps) {
  // 현재 페이지에 표시할 게시글
  // ds-board.tsx에서 이미 적절한 데이터를 전달하므로 그대로 사용
  const displayPosts = useMemo(() => {
    return posts
  }, [posts])

  // 뷰 컴포넌트 선택
  const ViewComponent = useMemo(() => {
    switch (config.display.viewType) {
      case 'table':
        return BoardTableView
      case 'card':
        return BoardCardView
      case 'gallery':
        return BoardGalleryView
      case 'list':
        return BoardListView
      default:
        return BoardTableView
    }
  }, [config.display.viewType])

  // 로딩 상태
  if (isLoading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // 게시글이 없는 경우
  if (!isLoading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-muted-foreground mb-2">게시글이 없습니다</p>
        <p className="text-sm text-muted-foreground">첫 번째 게시글을 작성해보세요</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 뷰 렌더링 */}
      <ViewComponent
        posts={displayPosts}
        config={config}
        onPostClick={onPostClick}
        boardType={config.type}
        tableDensity={config.display.tableDensity}
      />

      {/* 페이지네이션 또는 무한스크롤 로더 */}
      {config.display.paginationType === 'pagination' ? (
        <BoardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalPosts}
          itemsPerPage={config.display.itemsPerPage}
          onPageChange={onPageChange}
        />
      ) : (
        <InfiniteScrollLoader
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={onLoadMore}
          posts={posts}
        />
      )}
    </div>
  )
}