'use client'

import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { BoardControlPanel } from '@/features/design-system/board/components/board-control-panel'
import { BoardRenderer } from '@/features/design-system/board/components/board-renderer'
import { BoardError } from '@/features/design-system/board/components/board-error'
import { BoardForm } from '@/features/design-system/board/components/board-form'
import { BoardDetail } from '@/features/design-system/board/components/board-detail'
import { BoardSearch } from '@/features/design-system/board/components/board-search'
import { BoardFilters, type FilterOptions } from '@/features/design-system/board/components/board-filters'
import { boardConfigs, getBoardConfigByBoardType } from '@/features/design-system/board/data/board-configs'
import { mockPosts } from '@/features/design-system/board/data/board-mock'
import { AuthProvider } from '@/features/design-system/board/contexts/auth-context'
import type { BoardState, BoardAction, Post, BoardConfig, UserRole } from '@/features/design-system/board/types/board.types'
import { HiPlus, HiArrowLeft } from 'react-icons/hi2'

// 초기 상태 생성 함수
const getInitialState = (boardType?: string): BoardState => {
  // URL에서 받은 boardType에 해당하는 config 찾기
  const config = boardType 
    ? getBoardConfigByBoardType(boardType) || boardConfigs[0]
    : boardConfigs[0]
  
  return {
    config,
    posts: [],
    allPosts: [], // 전체 데이터 저장용
    displayedPosts: [], // 현재 표시되는 데이터 (무한스크롤용)
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
      totalPages: 1,
      totalPosts: 0,
      pageSize: config.display.itemsPerPage,
      hasMore: false,
      isLoadingMore: false,
      loadedPages: 1, // 무한스크롤용: 로드된 페이지 수
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
}

// 리듀서
function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        config: action.payload,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.display.itemsPerPage,
          currentPage: 1, // 설정 변경 시 첫 페이지로
        }
      }
    case 'SET_POSTS': {
      const totalPosts = action.payload.length
      const pageSize = state.pagination.pageSize
      const totalPages = Math.ceil(totalPosts / pageSize)
      const isInfiniteScroll = state.config.display.paginationType === 'infinite-scroll'
      
      // 무한스크롤일 때는 첫 페이지만, 페이지네이션일 때는 전체 데이터 저장
      let displayedPosts = action.payload
      if (isInfiniteScroll) {
        // 무한스크롤: 첫 페이지 데이터만 표시
        displayedPosts = action.payload.slice(0, pageSize)
      }
      
      return {
        ...state,
        posts: action.payload,  // 전체 데이터 저장
        allPosts: action.payload,  // 원본 데이터 저장
        displayedPosts: isInfiniteScroll ? displayedPosts : action.payload, // 페이지네이션일 때는 전체 데이터
        pagination: {
          ...state.pagination,
          totalPosts,
          totalPages,
          hasMore: isInfiniteScroll && totalPosts > pageSize,
          loadedPages: 1,
          currentPage: state.pagination.currentPage || 1, // 현재 페이지 유지
        }
      }
    }
    case 'APPEND_POSTS': {
      // 무한스크롤용: 다음 페이지 데이터 추가
      const nextPageStart = state.pagination.loadedPages * state.pagination.pageSize
      const nextPageEnd = Math.min(
        nextPageStart + state.pagination.pageSize,
        state.allPosts.length
      )
      const nextPagePosts = state.allPosts.slice(nextPageStart, nextPageEnd)
      
      return {
        ...state,
        displayedPosts: [...state.displayedPosts, ...nextPagePosts],
        pagination: {
          ...state.pagination,
          loadedPages: state.pagination.loadedPages + 1,
          hasMore: nextPageEnd < state.allPosts.length,
          isLoadingMore: false,
        }
      }
    }
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        pagination: {
          ...state.pagination,
          totalPosts: state.pagination.totalPosts + 1,
          totalPages: Math.ceil((state.pagination.totalPosts + 1) / state.pagination.pageSize),
        }
      }
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        pagination: {
          ...state.pagination,
          totalPosts: state.pagination.totalPosts - 1,
          totalPages: Math.ceil((state.pagination.totalPosts - 1) / state.pagination.pageSize),
        }
      }
    case 'SELECT_POST':
      return {
        ...state,
        selectedPost: action.payload,
        ui: {
          ...state.ui,
          viewMode: action.payload ? 'detail' : 'list',
        },
      }
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        pagination: {
          ...state.pagination,
          currentPage: 1, // 필터 변경 시 첫 페이지로
        }
      }
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      }
    case 'SET_UI_STATE':
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload,
        },
      }
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload,
        },
      }
    case 'SET_LOADING_MORE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          isLoadingMore: action.payload,
        },
      }
    case 'SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

interface DSBoardProps {
  boardType?: string
}

export function DSBoard({ boardType }: DSBoardProps = {}) {
  const [state, dispatch] = useReducer(boardReducer, getInitialState(boardType))
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentUserRole] = React.useState<UserRole>('user')
  const canWrite = currentUserRole !== 'guest' && state.config.permissions.write.includes(currentUserRole)

  // 데이터 로드 함수
  const loadBoardData = useCallback(async (boardType: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // boardType을 boardId로 변환
    const typeToIdMapping: Record<string, string> = {
      'notice': 'board_notice',
      'general': 'board_general',
      'free': 'board_general',  // 호환성
      'faq': 'board_faq',
      'gallery': 'board_gallery',
      'qna': 'board_qna'
    }
    
    const boardId = typeToIdMapping[boardType] || `board_${boardType}`
    
    // 시뮬레이션: 서버에서 데이터 로드
    setTimeout(() => {
      const filteredPosts = mockPosts.filter(post => post.boardId === boardId)
      dispatch({ type: 'SET_POSTS', payload: filteredPosts })
      dispatch({ type: 'SET_LOADING', payload: false })
    }, 500)
  }, [])

  // 필터링 및 정렬 - useCallback 제거하여 무한 루프 방지
  const filterAndSortPosts = () => {
    let filtered = state.allPosts.length > 0 ? [...state.allPosts] : [...mockPosts]
    
    // 검색 필터
    if (state.filters.searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(state.filters.searchQuery.toLowerCase())
      )
    }
    
    // 카테고리 필터
    if (state.filters.category) {
      filtered = filtered.filter(post => post.category === state.filters.category)
    }
    
    // 태그 필터
    if (state.filters.tags.length > 0) {
      filtered = filtered.filter(post =>
        state.filters.tags.some(tag => post.tags.includes(tag))
      )
    }
    
    // 정렬
    filtered.sort((a, b) => {
      switch (state.config.display.sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'popular':
          return b.metadata.views - a.metadata.views
        case 'comments':
          return b.metadata.commentsCount - a.metadata.commentsCount
        case 'latest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
    
    dispatch({ type: 'SET_POSTS', payload: filtered })
  }

  // boardType prop 변경 시 config 업데이트
  useEffect(() => {
    if (boardType) {
      const newConfig = getBoardConfigByBoardType(boardType)
      if (newConfig && newConfig.type !== state.config.type) {
        dispatch({ type: 'SET_CONFIG', payload: newConfig })
        // 페이지네이션도 새 config의 itemsPerPage로 업데이트
        dispatch({ type: 'SET_PAGINATION', payload: { 
          pageSize: newConfig.display.itemsPerPage,
          currentPage: 1 
        }})
      }
    }
  }, [boardType, state.config.type])

  // 게시판 타입 변경 시 데이터 로드
  useEffect(() => {
    loadBoardData(state.config.type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.config.type]) // loadBoardData는 의존성에서 제외

  // 필터 변경 시 데이터 재로드
  useEffect(() => {
    if (state.allPosts.length > 0) {
      filterAndSortPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filters, state.config.display.sortBy]) // filterAndSortPosts는 의존성에서 제외

  // 설정 변경 핸들러
  const handleConfigChange = useCallback((updates: Partial<BoardConfig>) => {
    const newConfig = { ...state.config, ...updates }
    
    // display 속성 변경 처리
    if (updates.display) {
      newConfig.display = { ...state.config.display, ...updates.display }
      
      // 페이지당 아이템 수 변경 시
      if (updates.display.itemsPerPage) {
        dispatch({ type: 'SET_PAGINATION', payload: { 
          pageSize: updates.display.itemsPerPage,
          currentPage: 1 
        }})
      }
      
      // 페이지네이션 타입 변경 시
      if (updates.display.paginationType) {
        const isInfiniteScroll = updates.display.paginationType === 'infinite-scroll'
        const pageSize = updates.display.itemsPerPage || state.pagination.pageSize
        const allPosts = state.allPosts.length > 0 ? state.allPosts : state.posts
        
        if (isInfiniteScroll) {
          // 무한스크롤로 변경 시 첫 페이지만 표시
          dispatch({ type: 'SET_PAGINATION', payload: { 
            currentPage: 1,
            hasMore: allPosts.length > pageSize,
            loadedPages: 1,
            isLoadingMore: false
          }})
          dispatch({ type: 'SET_UI_STATE', payload: { 
            isLoading: false 
          }})
          // displayedPosts를 첫 페이지만 표시하도록 설정
          dispatch({ type: 'SET_POSTS', payload: allPosts })
        } else {
          // 일반 페이지네이션으로 변경 시
          dispatch({ type: 'SET_PAGINATION', payload: { 
            currentPage: 1,
            hasMore: false,
            loadedPages: 1,
            isLoadingMore: false
          }})
        }
      }
      
      // 정렬 변경 시 데이터 재정렬은 useEffect에서 자동으로 처리됨
    }
    
    // 게시판 타입 변경 시
    if (updates.type && updates.type !== state.config.type) {
      const newBoardConfig = getBoardConfigByBoardType(updates.type)
      if (newBoardConfig) {
        dispatch({ type: 'SET_CONFIG', payload: newBoardConfig })
        return
      }
    }
    
    dispatch({ type: 'SET_CONFIG', payload: newConfig })
  }, [state.config, state.allPosts, state.posts, state.pagination.pageSize])

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: 'SET_PAGINATION', payload: { currentPage: page }})
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // 무한스크려 로드 더 보기
  const handleLoadMore = useCallback(() => {
    if (state.pagination.isLoadingMore || !state.pagination.hasMore) {
      return
    }
    
    dispatch({ type: 'SET_LOADING_MORE', payload: true })
    
    // 다음 페이지 데이터 로드 시뮬레이션 (2초 딜레이)
    setTimeout(() => {
      dispatch({ type: 'APPEND_POSTS', payload: [] })
    }, 2000)
  }, [state.pagination.isLoadingMore, state.pagination.hasMore, state.pagination.loadedPages, state.pagination.totalPosts])


  // 게시글 클릭 핸들러
  const handlePostClick = useCallback((post: Post) => {
    dispatch({ type: 'SELECT_POST', payload: post })
  }, [])

  // 뒤로가기 핸들러
  const handleBack = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list' }})
    dispatch({ type: 'SELECT_POST', payload: null })
  }, [])

  // 현재 뷰 렌더링
  const renderView = () => {
    switch (state.ui.viewMode) {
      case 'detail':
        return state.selectedPost && (
          <BoardDetail
            post={state.selectedPost}
            config={state.config}
            onBack={handleBack}
            onEdit={() => dispatch({ type: 'SET_UI_STATE', payload: { isEditing: true }})}
            onDelete={() => {
              dispatch({ type: 'DELETE_POST', payload: state.selectedPost!.id })
              handleBack()
            }}
          />
        )
      
      case 'create':
        return (
          <BoardForm
            boardConfig={state.config}
            onSubmit={(post) => {
              const newPost = { ...post, id: post.id || Date.now().toString() } as Post
              dispatch({ type: 'ADD_POST', payload: newPost })
              dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list', isCreating: false }})
            }}
            onCancel={() => dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'list', isCreating: false }})}
          />
        )
      
      case 'edit':
        return state.selectedPost && (
          <BoardForm
            post={state.selectedPost}
            boardConfig={state.config}
            onSubmit={(post) => {
              const updatedPost = { ...state.selectedPost, ...post } as Post
              dispatch({ type: 'UPDATE_POST', payload: updatedPost })
              dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'detail', isEditing: false }})
            }}
            onCancel={() => dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'detail', isEditing: false }})}
          />
        )
      
      case 'list':
      default:
        return (
          <>
            {/* 검색 및 필터 */}
            <div className="space-y-4 mb-6">
              <BoardSearch
                onSearch={(query) => {
                  dispatch({ type: 'SET_FILTER', payload: { searchQuery: query }})
                  // filterAndSortPosts는 useEffect에서 자동으로 호출됨
                }}
              />
              <BoardFilters
                filters={{
                  categories: state.filters.category ? [state.filters.category] : [],
                  tags: state.filters.tags,
                  dateRange: state.filters.dateRange ? {
                    from: state.filters.dateRange[0],
                    to: state.filters.dateRange[1]
                  } : undefined
                }}
                onFilterChange={(filters: FilterOptions) => {
                  if (filters.dateRange) {
                    const dateRange: [Date | null, Date | null] = [filters.dateRange.from, filters.dateRange.to]
                    dispatch({ type: 'SET_FILTER', payload: { dateRange } })
                  }
                  if (filters.categories) {
                    dispatch({ type: 'SET_FILTER', payload: { category: filters.categories[0] || null } })
                  }
                  if (filters.tags) {
                    dispatch({ type: 'SET_FILTER', payload: { tags: filters.tags } })
                  }
                }}
              />
            </div>

            {/* 게시판 리스트 */}
            <BoardRenderer
              posts={(() => {
                const isInfiniteScroll = state.config.display.paginationType === 'infinite-scroll'
                if (isInfiniteScroll) {
                  // 무한스크롤: displayedPosts 사용
                  return state.displayedPosts
                } else {
                  // 페이지네이션: 현재 페이지의 데이터만 표시
                  const start = (state.pagination.currentPage - 1) * state.pagination.pageSize
                  const end = start + state.pagination.pageSize
                  return state.posts.slice(start, end)
                }
              })()}
              config={state.config}
              onPostClick={handlePostClick}
              currentPage={state.pagination.currentPage}
              totalPages={state.pagination.totalPages}
              totalPosts={state.pagination.totalPosts}
              onPageChange={handlePageChange}
              onLoadMore={handleLoadMore}
              hasMore={state.pagination.hasMore}
              isLoadingMore={state.pagination.isLoadingMore}
              isLoading={state.ui.isLoading}
            />

          </>
        )
    }
  }

  return (
    <AuthProvider>
      <div className="container mx-auto py-6" ref={containerRef}>
        <div className="space-y-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{state.config.name}</h1>
              <p className="text-muted-foreground mt-1">{state.config.description}</p>
            </div>
            {state.ui.viewMode === 'list' && canWrite && (
              <Button 
                onClick={() => dispatch({ type: 'SET_UI_STATE', payload: { viewMode: 'create', isCreating: true }})}
              >
                <HiPlus className="mr-2 h-4 w-4" />
                글쓰기
              </Button>
            )}
            {state.ui.viewMode !== 'list' && (
              <Button variant="ghost" onClick={handleBack}>
                <HiArrowLeft className="mr-2 h-4 w-4" />
                목록으로
              </Button>
            )}
          </div>

          {/* 컨트롤 패널 (리스트 뷰에서만) */}
          {state.ui.viewMode === 'list' && (
            <BoardControlPanel
              config={state.config}
              onConfigChange={handleConfigChange}
              currentUserRole={currentUserRole}
            />
          )}

          {/* 에러 표시 */}
          {state.ui.error && (
            <BoardError 
              error={{ message: state.ui.error }}
              onRetry={() => {
                dispatch({ type: 'SET_ERROR', payload: null })
                loadBoardData(state.config.type)
              }}
            />
          )}

          {/* 메인 콘텐츠 */}
          {renderView()}
        </div>
      </div>
    </AuthProvider>
  )
}