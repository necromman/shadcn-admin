import { type UserRole } from './board.types'

// 댓글 타입
export interface Comment {
  id: string
  postId: string
  parentId?: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    role: UserRole
  }
  mentions: string[]
  likes: number
  isLiked: boolean
  children?: Comment[]
  replies?: Comment[]
  createdAt: string
  updatedAt: string
  isEdited: boolean
  isDeleted: boolean
  isPrivate?: boolean
  isAnonymous?: boolean
  parentAuthor?: string
}

// 댓글 작성 요청
export interface CreateCommentRequest {
  postId: string
  parentId?: string
  content: string
  mentions?: string[]
}

// 댓글 수정 요청
export interface UpdateCommentRequest {
  content: string
  mentions?: string[]
}

// 댓글 트리 구조
export interface CommentTree {
  comment: Comment
  children: CommentTree[]
}

// 댓글 상태
export interface CommentState {
  comments: Comment[]
  isLoading: boolean
  error: string | null
  replyTo: Comment | null
  editingComment: Comment | null
}

// 댓글 액션 타입
export type CommentAction =
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'UPDATE_COMMENT'; payload: Comment }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'SET_REPLY_TO'; payload: Comment | null }
  | { type: 'SET_EDITING_COMMENT'; payload: Comment | null }
  | { type: 'TOGGLE_LIKE'; payload: { commentId: string; isLiked: boolean } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }