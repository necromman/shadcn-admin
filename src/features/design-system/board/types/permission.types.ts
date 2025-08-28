import { type UserRole } from './board.types'

export { type UserRole } from './board.types'

// Board Permissions interface
export interface BoardPermissions {
  view: UserRole
  viewPrivate: UserRole
  search: UserRole
  create: UserRole
  edit: UserRole
  delete: UserRole
  comment: UserRole
  like: UserRole
  report: UserRole
  upload: UserRole
  download: UserRole
  pin: UserRole
  lock: UserRole
  deleteOthers: UserRole
  editOthers: UserRole
}

// 권한 체크 결과
export interface PermissionCheckResult {
  allowed: boolean
  reason?: string
}

// 권한 타입
export type PermissionType = 
  | 'read'
  | 'write'
  | 'comment'
  | 'delete'
  | 'moderate'
  | 'uploadFile'
  | 'uploadImage'

// 사용자 정보
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
}

// 권한 컨텍스트
export interface PermissionContext {
  user: User | null
  boardId: string
  postId?: string
  commentId?: string
}

// 권한 체크 함수 타입
export type PermissionChecker = (
  permission: PermissionType,
  context: PermissionContext,
  boardPermissions: import('./board.types').BoardPermissions
) => PermissionCheckResult

// 역할 계층 구조
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  guest: 0,
  user: 1,
  member: 2,
  moderator: 3,
  admin: 4,
}

// 권한 메시지
export const PERMISSION_MESSAGES = {
  NO_PERMISSION: '권한이 없습니다.',
  LOGIN_REQUIRED: '로그인이 필요합니다.',
  MEMBER_ONLY: '멤버 등급 이상만 가능합니다.',
  MODERATOR_ONLY: '운영자 권한이 필요합니다.',
  ADMIN_ONLY: '관리자 권한이 필요합니다.',
  POST_LOCKED: '잠긴 게시글입니다.',
  POST_PRIVATE: '비공개 게시글입니다.',
  AUTHOR_ONLY: '작성자만 수정할 수 있습니다.',
} as const