// 게시판 타입 정의
export type UserRole = 'guest' | 'user' | 'member' | 'moderator' | 'admin'

// 게시판 타입
export type BoardType = 'notice' | 'general' | 'faq' | 'gallery' | 'qna'

// 게시판 설정
export interface BoardConfig {
  id: string
  name: string
  type: BoardType
  description: string
  features: {
    comments: boolean
    likes: boolean
    attachments: boolean
    images: boolean
    mentions: boolean
    privatePost: boolean
    anonymousPost: boolean
  }
  permissions: BoardPermissions
  display: {
    viewType: 'table' | 'card' | 'gallery' | 'list'
    itemsPerPage: number  // 페이지당 아이템 수
    sortBy: 'latest' | 'oldest' | 'popular' | 'comments'  // 정렬 기준
    showThumbnail: boolean
    showExcerpt: boolean
    excerptLength: number
    paginationType: 'pagination' | 'infinite-scroll'  // 페이지네이션 타입
    infiniteScrollThreshold: number  // 무한스크롤 트리거 거리
    tableDensity: 'compact' | 'normal' | 'comfortable'  // 테이블 밀도
  }
}

// 권한 설정
export interface BoardPermissions {
  read: UserRole[]
  write: UserRole[]
  comment: UserRole[]
  delete: UserRole[]
  moderate: UserRole[]
  uploadFile: UserRole[]
  uploadImage: UserRole[]
}

// 게시글
export interface Post {
  id: string
  boardId: string
  title: string
  content: string
  contentType: 'text' | 'html' | 'markdown'
  author: {
    id: string
    name: string
    avatar?: string
    role: UserRole
  }
  category?: string
  tags: string[]
  images: PostImage[]
  attachments: PostAttachment[]
  metadata: {
    views: number
    likes: number
    commentsCount: number
    isLiked: boolean
    helpfulCount?: number  // FAQ용
    notHelpfulCount?: number  // FAQ용
    answerCount?: number  // Q&A용
    bounty?: number  // Q&A용
    downloadCount?: number  // 갤러리용
  }
  status: 'draft' | 'published' | 'deleted'
  isPinned: boolean
  isLocked: boolean
  isPrivate: boolean
  isNew?: boolean  // 새 게시글 표시
  createdAt: string
  updatedAt: string
}

// 이미지
export interface PostImage {
  id: string
  url: string
  thumbnailUrl?: string
  alt?: string
  width?: number
  height?: number
  size?: number
}

// 첨부파일
export interface PostAttachment {
  id: string
  name: string
  url?: string
  size: number
  type: string
}

// 댓글
export interface Comment {
  id: string
  postId: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    role: UserRole
  }
  createdAt: string
  updatedAt: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

// 게시판 상태
export interface BoardState {
  config: BoardConfig
  posts: Post[]
  selectedPost: Post | null
  comments: Comment[]
  filters: {
    searchQuery: string
    category: string | null
    tags: string[]
    sortBy: 'latest' | 'views' | 'likes' | 'comments'
    dateRange: [Date | null, Date | null]
  }
  pagination: {
    currentPage: number
    totalPages: number
    totalPosts: number
    pageSize: number
    hasMore: boolean  // 무한스크롤용
    isLoadingMore: boolean  // 추가 로딩 중
  }
  ui: {
    isLoading: boolean
    isCreating: boolean
    isEditing: boolean
    viewMode: 'list' | 'detail' | 'create' | 'edit'
    selectedImages: PostImage[]
    imageViewerIndex: number
    error: string | null
  }
}

// 게시판 액션 타입
export type BoardAction =
  | { type: 'SET_CONFIG'; payload: BoardConfig }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SELECT_POST'; payload: Post | null }
  | { type: 'SET_FILTER'; payload: Partial<BoardState['filters']> }
  | { type: 'SET_PAGINATION'; payload: Partial<BoardState['pagination']> }
  | { type: 'SET_UI_STATE'; payload: Partial<BoardState['ui']> }
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'APPEND_POSTS'; payload: Post[] }  // 무한스크롤용
  | { type: 'SET_LOADING_MORE'; payload: boolean }