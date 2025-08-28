'use client'

import React, { useReducer, useMemo, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { BoardControlPanel } from '@/features/design-system/board/components/board-control-panel'
import { BoardList } from '@/features/design-system/board/components/board-list'
import { BoardListVirtual } from '@/features/design-system/board/components/board-list-virtual'
import { BoardLoading } from '@/features/design-system/board/components/board-loading'
import { BoardError, BoardEmpty } from '@/features/design-system/board/components/board-error'
import { BoardForm } from '@/features/design-system/board/components/board-form'
import { BoardDetail } from '@/features/design-system/board/components/board-detail'
import { BoardSearch } from '@/features/design-system/board/components/board-search'
import { BoardFilters } from '@/features/design-system/board/components/board-filters'
import { boardConfigs, getBoardConfigByBoardType, defaultBoardConfig } from '@/features/design-system/board/data/board-configs'
import { mockPosts } from '@/features/design-system/board/data/board-mock'
import { usePermissions } from '@/features/design-system/board/hooks/use-permissions'
import { AuthProvider } from '@/features/design-system/board/contexts/auth-context'
import type { BoardState, BoardAction, Post, BoardConfig, UserRole } from '@/features/design-system/board/types/board.types'
import type { BoardPermissions } from '@/features/design-system/board/types/permission.types'

// 초기 상태
const initialState: BoardState = {
  config: boardConfigs[0],
  posts: mockPosts.slice(0, 10),
  selectedPost: null,
  comments: [],
  filters: {
    searchQuery: '',
    category: null,
    tags: [],
    sortBy: 'latest',
    dateRange: [null, null],
  },
  pagination: {
    currentPage: 1,
    totalPages: 5,
    totalPosts: mockPosts.length,
    pageSize: 10,
    hasMore: true,
    isLoadingMore: false,
  },
  ui: {
    isLoading: false,
    isCreating: false,
    isEditing: false,
    viewMode: 'list',
    selectedImages: [],
    imageViewerIndex: 0,
    error: null,
  },
}

// Reducer
function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, config: action.payload }
    case 'SET_POSTS':
      return { ...state, posts: action.payload }
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(p => p.id === action.payload.id ? action.payload : p),
        selectedPost: state.selectedPost?.id === action.payload.id ? action.payload : state.selectedPost,
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.payload),
        selectedPost: state.selectedPost?.id === action.payload ? null : state.selectedPost,
      }
    case 'SELECT_POST':
      return { ...state, selectedPost: action.payload }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } }
    case 'SET_UI_STATE':
      return { ...state, ui: { ...state.ui, ...action.payload } }
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, isLoading: action.payload } }
    case 'SET_ERROR':
      return { ...state, ui: { ...state.ui, error: action.payload } }
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload }
    case 'APPEND_POSTS':
      return { ...state, posts: [...state.posts, ...action.payload] }
    case 'SET_LOADING_MORE':
      return { ...state, pagination: { ...state.pagination, isLoadingMore: action.payload } }
    default:
      return state
  }
}

interface DSBoardProps {
  boardType?: string
}

// 내부 컴포넌트 - AuthProvider로 감싸지지 않음
function DSBoardInternal({ boardType }: DSBoardProps) {
  // 기본값을 admin으로 설정 (최고 관리자)
  const [currentUserRole, setCurrentUserRole] = React.useState<UserRole>('admin')
  
  const [state, dispatch] = useReducer(boardReducer, initialState)

  // boardType이 변경될 때마다 config와 posts를 업데이트
  useEffect(() => {
    const newConfig = boardType ? getBoardConfigByBoardType(boardType) || defaultBoardConfig : defaultBoardConfig
    
    // config 업데이트
    dispatch({ type: 'SET_CONFIG', payload: newConfig })
    
    // 해당 게시판의 posts 필터링
    const filteredPosts = mockPosts
      .filter(p => p.boardId === newConfig.id)
      .slice(0, newConfig.display.itemsPerPage || 10)
    dispatch({ type: 'SET_POSTS', payload: filteredPosts })
    
    // 페이지네이션 초기화
    dispatch({ type: 'SET_PAGINATION', payload: {
      currentPage: 1,
      pageSize: newConfig.display.itemsPerPage || 10,
      totalPosts: mockPosts.filter(p => p.boardId === newConfig.id).length,
      totalPages: Math.ceil(mockPosts.filter(p => p.boardId === newConfig.id).length / (newConfig.display.itemsPerPage || 10))
    }})
    
    // UI 상태 초기화
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list' } })
  }, [boardType])

  // 권한 객체 생성 (config의 permissions를 BoardPermissions 형식으로 변환)
  const boardPermissions: BoardPermissions = useMemo(() => ({
    view: 'guest',
    viewPrivate: 'member',
    search: 'guest',
    create: state.config.permissions.write.includes('user' as UserRole) ? 'user' : 
            state.config.permissions.write.includes('member' as UserRole) ? 'member' : 
            state.config.permissions.write.includes('moderator' as UserRole) ? 'moderator' : 'admin',
    edit: 'user',
    delete: 'user',
    comment: state.config.permissions.comment.includes('user' as UserRole) ? 'user' : 
              state.config.permissions.comment.includes('member' as UserRole) ? 'member' : 
              state.config.permissions.comment.includes('moderator' as UserRole) ? 'moderator' : 'admin',
    like: 'user',
    report: 'user',
    upload: 'user',
    download: 'user',
    pin: 'moderator',
    lock: 'moderator',
    deleteOthers: 'moderator',
    editOthers: 'moderator'
  }), [state.config.permissions])

  // 권한 훅 사용
  const permissions = usePermissions({
    userRole: currentUserRole,
    permissions: boardPermissions
  })

  const handleConfigChange = (newConfig: BoardConfig) => {
    const oldConfig = state.config
    dispatch({ type: 'SET_CONFIG', payload: newConfig })
    
    // 게시판 타입이 변경된 경우
    if (oldConfig.id !== newConfig.id) {
      const filteredPosts = mockPosts
        .filter(p => p.boardId === newConfig.id)
        .slice(0, newConfig.display.itemsPerPage)
      dispatch({ type: 'SET_POSTS', payload: filteredPosts })
      dispatch({ type: 'SET_PAGINATION', payload: { 
        currentPage: 1, 
        pageSize: newConfig.display.itemsPerPage,
        totalPosts: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / newConfig.display.itemsPerPage)
      }})
    }
    // 페이지 크기가 변경된 경우
    else if (oldConfig.display.itemsPerPage !== newConfig.display.itemsPerPage) {
      const filteredPosts = mockPosts
        .filter(p => p.boardId === newConfig.id)
      const sortedPosts = sortPosts(filteredPosts, newConfig.display.sortBy)
        .slice(0, newConfig.display.itemsPerPage)
      dispatch({ type: 'SET_POSTS', payload: sortedPosts })
      dispatch({ type: 'SET_PAGINATION', payload: { 
        pageSize: newConfig.display.itemsPerPage,
        totalPages: Math.ceil(filteredPosts.length / newConfig.display.itemsPerPage)
      }})
    }
    // 정렬이 변경된 경우
    else if (oldConfig.display.sortBy !== newConfig.display.sortBy) {
      const filteredPosts = mockPosts
        .filter(p => p.boardId === newConfig.id)
      const sortedPosts = sortPosts(filteredPosts, newConfig.display.sortBy)
        .slice(0, newConfig.display.itemsPerPage)
      dispatch({ type: 'SET_POSTS', payload: sortedPosts })
    }
  }

  // 정렬 함수
  const sortPosts = (posts: Post[], sortBy: string): Post[] => {
    const sorted = [...posts]
    switch (sortBy) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      case 'popular':
        return sorted.sort((a, b) => b.metadata.views - a.metadata.views)
      case 'comments':
        return sorted.sort((a, b) => b.metadata.commentsCount - a.metadata.commentsCount)
      default:
        return sorted
    }
  }

  const handleViewPost = (post: Post) => {
    dispatch({ type: 'SELECT_POST', payload: post })
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'detail' } })
  }

  const handleCreatePost = () => {
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'create', isCreating: true } })
  }

  const handleEditPost = () => {
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'edit', isEditing: true } })
  }

  const handleSubmitPost = (data: Partial<Post>) => {
    if (state.ui.isEditing && state.selectedPost) {
      // 수정
      const updatedPost = { ...state.selectedPost, ...data } as Post
      dispatch({ type: 'UPDATE_POST', payload: updatedPost })
    } else {
      // 생성
      const newPost = { ...data } as Post
      dispatch({ type: 'ADD_POST', payload: newPost })
    }
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list', isCreating: false, isEditing: false } })
  }

  const handleDeletePost = () => {
    if (state.selectedPost) {
      if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        dispatch({ type: 'DELETE_POST', payload: state.selectedPost.id })
        dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list' } })
      }
    }
  }

  const handleBackToList = () => {
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list', isCreating: false, isEditing: false } })
    dispatch({ type: 'SELECT_POST', payload: null })
  }

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_PAGINATION', payload: { currentPage: page } })
    // 실제로는 API 호출
    const start = (page - 1) * state.pagination.pageSize
    const end = start + state.pagination.pageSize
    const filteredPosts = mockPosts.filter(p => p.boardId === state.config.id)
    dispatch({ type: 'SET_POSTS', payload: filteredPosts.slice(start, end) })
  }

  // 무한스크롤용 추가 데이터 로드
  const handleLoadMore = useCallback(() => {
    if (state.pagination.isLoadingMore || !state.pagination.hasMore) return
    
    dispatch({ type: 'SET_LOADING_MORE', payload: true })
    
    // API 호출 시뮬레이션
    setTimeout(() => {
      const currentLength = state.posts.length
      const nextPosts = mockPosts
        .filter(p => p.boardId === state.config.id)
        .slice(currentLength, currentLength + state.config.display.itemsPerPage)
      
      if (nextPosts.length > 0) {
        dispatch({ type: 'APPEND_POSTS', payload: nextPosts })
        dispatch({ type: 'SET_PAGINATION', payload: {
          hasMore: currentLength + nextPosts.length < mockPosts.filter(p => p.boardId === state.config.id).length
        }})
      } else {
        dispatch({ type: 'SET_PAGINATION', payload: { hasMore: false } })
      }
      
      dispatch({ type: 'SET_LOADING_MORE', payload: false })
    }, 1000)
  }, [state.posts.length, state.pagination.isLoadingMore, state.pagination.hasMore, state.config.id])

  return (
    <div className="space-y-6">
      {/* 권한 전환 UI */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">현재 권한:</span>
          <Select value={currentUserRole} onValueChange={(value) => setCurrentUserRole(value as UserRole)}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">관리자</SelectItem>
              <SelectItem value="moderator">모더레이터</SelectItem>
              <SelectItem value="member">회원</SelectItem>
              <SelectItem value="user">사용자</SelectItem>
              <SelectItem value="guest">게스트</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs">
            {currentUserRole === 'admin' ? '최고 관리자' : 'Impersonation 모드'}
          </Badge>
        </div>
        {currentUserRole !== 'admin' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentUserRole('admin')}
          >
            관리자로 돌아가기
          </Button>
        )}
      </div>

      {/* 컨트롤 패널 */}
      <BoardControlPanel
        config={state.config}
        onConfigChange={handleConfigChange}
        viewMode={state.ui.viewMode}
        currentUserRole={currentUserRole}
      />

      {/* 뷰 모드에 따른 컴포넌트 렌더링 */}
      {state.ui.viewMode === 'list' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <BoardSearch 
              onSearch={(query) => dispatch({ type: 'SET_FILTER', payload: { searchQuery: query } })}
              className="flex-1 max-w-full sm:max-w-md"
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <BoardFilters
                filters={{
                  tags: state.filters.tags,
                  sortBy: state.filters.sortBy as 'latest' | 'oldest' | 'popular' | 'comments',
                  dateRange: {
                    from: state.filters.dateRange[0],
                    to: state.filters.dateRange[1]
                  }
                }}
                onFilterChange={(filters) => dispatch({ type: 'SET_FILTER', payload: {
                  tags: filters.tags,
                  sortBy: filters.sortBy as 'latest' | 'views' | 'likes' | 'comments',
                  dateRange: [filters.dateRange?.from || null, filters.dateRange?.to || null]
                }})}
              />
              {permissions.can.create && (
                <Button onClick={handleCreatePost} className="flex-1 sm:flex-initial">
                  <span className="sm:hidden">작성</span>
                  <span className="hidden sm:inline">게시글 작성</span>
                </Button>
              )}
            </div>
          </div>
          
          {/* 로딩 상태 */}
          {state.ui.isLoading && (
            <BoardLoading 
              viewType={state.config.display.viewType} 
              itemCount={10}
            />
          )}
          
          {/* 에러 상태 */}
          {state.ui.error && !state.ui.isLoading && (
            <BoardError 
              error={{
                title: '오류 발생',
                message: state.ui.error,
                type: 'error'
              }}
              onRetry={() => {
                dispatch({ type: 'SET_ERROR', payload: null })
                dispatch({ type: 'SET_LOADING', payload: true })
                // 데이터 다시 불러오기 시뮬레이션
                setTimeout(() => {
                  dispatch({ type: 'SET_LOADING', payload: false })
                }, 1000)
              }}
            />
          )}
          
          {/* 빈 상태 */}
          {!state.ui.isLoading && !state.ui.error && state.posts.length === 0 && (
            <BoardEmpty 
              onAction={permissions.can.create ? handleCreatePost : undefined}
            />
          )}
          
          {/* 게시글 목록 */}
          {!state.ui.isLoading && !state.ui.error && state.posts.length > 0 && (
            <>
              {/* 100개 이상의 게시글이거나 table 뷰일 때 가상 스크롤링 사용 */}
              {state.posts.length > 100 && state.config.display.viewType === 'table' ? (
                <BoardListVirtual
                  posts={state.posts}
                  config={state.config}
                  onPostClick={handleViewPost}
                  enableVirtualization={true}
                />
              ) : (
                <BoardList
                  posts={state.posts}
                  config={state.config}
                  viewType={state.config.display.viewType}
                  currentPage={state.pagination.currentPage}
                  totalPages={state.pagination.totalPages}
                  onPageChange={handlePageChange}
                  onPostClick={handleViewPost}
                  onLoadMore={handleLoadMore}
                  hasMore={state.pagination.hasMore}
                  isLoadingMore={state.pagination.isLoadingMore}
                  paginationType={state.config.display.paginationType}
                  tableDensity={state.config.display.tableDensity}
                />
              )}
            </>
          )}
        </div>
      )}

      {(state.ui.viewMode === 'create' || state.ui.viewMode === 'edit') && (
        <BoardForm
          config={state.config}
          post={state.ui.viewMode === 'edit' ? state.selectedPost : null}
          onSubmit={handleSubmitPost}
          onCancel={handleBackToList}
        />
      )}

      {state.ui.viewMode === 'detail' && state.selectedPost && (
        <BoardDetail
          post={state.selectedPost}
          config={state.config}
          onBack={handleBackToList}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          isAuthor={state.selectedPost.author.id === 'user_1'}
          isAdmin={permissions.isAdmin}
        />
      )}
    </div>
  )
}

// 외부 export - AuthProvider로 감싸서 export
export function DSBoard(props: DSBoardProps) {
  return (
    <AuthProvider defaultRole="admin">
      <DSBoardInternal {...props} />
    </AuthProvider>
  )
}