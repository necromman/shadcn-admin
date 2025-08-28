'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  HiShieldCheck,
  HiUser,
  HiUserGroup,
  HiLockClosed,
  HiLockOpen,
  HiPencilAlt,
  HiEye,
  HiTrash,
  HiChat,
  HiHeart,
  HiSpeakerphone,
  HiDownload,
  HiUpload,
  HiExclamation
} from 'react-icons/hi'
import type { BoardPermissions, UserRole } from '../types/permission.types'
import { cn } from '@/lib/utils'

interface BoardPermissionsProps {
  permissions: BoardPermissions
  onPermissionChange: (permissions: BoardPermissions) => void
  currentUserRole?: UserRole
  readOnly?: boolean
  className?: string
}

export function BoardPermissionsComponent({
  permissions,
  onPermissionChange,
  currentUserRole = 'admin',
  readOnly = false,
  className
}: BoardPermissionsProps) {
  const canEditPermissions = currentUserRole === 'admin'

  const handleRoleChange = (action: keyof BoardPermissions, role: UserRole) => {
    onPermissionChange({
      ...permissions,
      [action]: role
    })
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'moderator':
        return 'default'
      case 'member':
        return 'secondary'
      case 'user':
        return 'outline'
      case 'guest':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <HiShieldCheck className="h-3 w-3" />
      case 'moderator':
        return <HiUserGroup className="h-3 w-3" />
      case 'member':
        return <HiUser className="h-3 w-3" />
      case 'user':
        return <HiLockOpen className="h-3 w-3" />
      case 'guest':
        return <HiLockClosed className="h-3 w-3" />
    }
  }

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return '시스템 관리자 - 모든 권한'
      case 'moderator':
        return '게시판 관리자 - 게시글 관리 권한'
      case 'member':
        return '정회원 - 일반 회원 권한'
      case 'user':
        return '회원 - 기본 권한'
      case 'guest':
        return '손님 - 읽기 전용'
    }
  }

  const permissionGroups = [
    {
      title: '기본 권한',
      icon: <HiEye className="h-4 w-4" />,
      permissions: [
        { key: 'view', label: '게시글 보기', icon: <HiEye className="h-4 w-4" /> },
        { key: 'viewPrivate', label: '비공개글 보기', icon: <HiLockClosed className="h-4 w-4" /> },
        { key: 'search', label: '검색', icon: <HiEye className="h-4 w-4" /> }
      ]
    },
    {
      title: '작성 권한',
      icon: <HiPencilAlt className="h-4 w-4" />,
      permissions: [
        { key: 'create', label: '게시글 작성', icon: <HiPencilAlt className="h-4 w-4" /> },
        { key: 'edit', label: '게시글 수정', icon: <HiPencilAlt className="h-4 w-4" /> },
        { key: 'delete', label: '게시글 삭제', icon: <HiTrash className="h-4 w-4" /> }
      ]
    },
    {
      title: '상호작용 권한',
      icon: <HiChat className="h-4 w-4" />,
      permissions: [
        { key: 'comment', label: '댓글 작성', icon: <HiChat className="h-4 w-4" /> },
        { key: 'like', label: '좋아요', icon: <HiHeart className="h-4 w-4" /> },
        { key: 'report', label: '신고하기', icon: <HiExclamation className="h-4 w-4" /> }
      ]
    },
    {
      title: '파일 권한',
      icon: <HiDownload className="h-4 w-4" />,
      permissions: [
        { key: 'upload', label: '파일 업로드', icon: <HiUpload className="h-4 w-4" /> },
        { key: 'download', label: '파일 다운로드', icon: <HiDownload className="h-4 w-4" /> }
      ]
    },
    {
      title: '관리 권한',
      icon: <HiShieldCheck className="h-4 w-4" />,
      permissions: [
        { key: 'pin', label: '게시글 고정', icon: <HiSpeakerphone className="h-4 w-4" /> },
        { key: 'lock', label: '게시글 잠금', icon: <HiLockClosed className="h-4 w-4" /> },
        { key: 'deleteOthers', label: '타인 게시글 삭제', icon: <HiTrash className="h-4 w-4" /> },
        { key: 'editOthers', label: '타인 게시글 수정', icon: <HiPencilAlt className="h-4 w-4" /> }
      ]
    }
  ]

  const roleHierarchy: UserRole[] = ['guest', 'user', 'member', 'moderator', 'admin']
  
  const getRoleIndex = (role: UserRole) => roleHierarchy.indexOf(role)
  
  const hasPermission = (requiredRole: UserRole, userRole: UserRole) => {
    return getRoleIndex(userRole) >= getRoleIndex(requiredRole)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HiShieldCheck className="h-5 w-5" />
          게시판 권한 설정
        </CardTitle>
        <CardDescription>
          각 권한별로 최소 요구 역할을 설정합니다.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current User Info */}
        {currentUserRole && (
          <Alert>
            <HiUser className="h-4 w-4" />
            <AlertTitle>현재 권한</AlertTitle>
            <AlertDescription className="flex items-center gap-2 mt-2">
              <Badge variant={getRoleBadgeVariant(currentUserRole)}>
                {getRoleIcon(currentUserRole)}
                {currentUserRole.toUpperCase()}
              </Badge>
              <span className="text-sm">{getRoleDescription(currentUserRole)}</span>
            </AlertDescription>
          </Alert>
        )}

        {/* Role Hierarchy Display */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">권한 계층 구조</Label>
          <div className="flex items-center gap-2 text-sm">
            {roleHierarchy.map((role, index) => (
              <React.Fragment key={role}>
                <Badge 
                  variant={getRoleBadgeVariant(role)}
                  className={cn(
                    "gap-1",
                    hasPermission(role, currentUserRole) && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {getRoleIcon(role)}
                  {role}
                </Badge>
                {index < roleHierarchy.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            상위 권한은 하위 권한의 모든 기능을 포함합니다.
          </p>
        </div>

        {/* Permission Groups */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="basic">기본</TabsTrigger>
            <TabsTrigger value="write">작성</TabsTrigger>
            <TabsTrigger value="interact">상호작용</TabsTrigger>
            <TabsTrigger value="file">파일</TabsTrigger>
            <TabsTrigger value="admin">관리</TabsTrigger>
          </TabsList>

          {permissionGroups.map((group, groupIndex) => (
            <TabsContent 
              key={group.title}
              value={groupIndex === 0 ? 'basic' : 
                     groupIndex === 1 ? 'write' : 
                     groupIndex === 2 ? 'interact' : 
                     groupIndex === 3 ? 'file' : 'admin'}
              className="space-y-4"
            >
              <div className="space-y-3">
                {group.permissions.map(permission => (
                  <div
                    key={permission.key}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {permission.icon}
                      <div>
                        <Label className="text-sm font-normal">
                          {permission.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {permission.key === 'view' && '게시글을 조회할 수 있습니다'}
                          {permission.key === 'viewPrivate' && '비공개로 설정된 게시글을 볼 수 있습니다'}
                          {permission.key === 'create' && '새 게시글을 작성할 수 있습니다'}
                          {permission.key === 'edit' && '자신의 게시글을 수정할 수 있습니다'}
                          {permission.key === 'delete' && '자신의 게시글을 삭제할 수 있습니다'}
                          {permission.key === 'comment' && '게시글에 댓글을 작성할 수 있습니다'}
                          {permission.key === 'like' && '게시글에 좋아요를 표시할 수 있습니다'}
                          {permission.key === 'upload' && '파일과 이미지를 업로드할 수 있습니다'}
                          {permission.key === 'download' && '첨부파일을 다운로드할 수 있습니다'}
                          {permission.key === 'pin' && '게시글을 상단에 고정할 수 있습니다'}
                          {permission.key === 'lock' && '게시글 댓글을 잠글 수 있습니다'}
                          {permission.key === 'deleteOthers' && '다른 사용자의 게시글을 삭제할 수 있습니다'}
                          {permission.key === 'editOthers' && '다른 사용자의 게시글을 수정할 수 있습니다'}
                          {permission.key === 'report' && '부적절한 콘텐츠를 신고할 수 있습니다'}
                          {permission.key === 'search' && '게시판 내용을 검색할 수 있습니다'}
                        </p>
                      </div>
                    </div>
                    
                    <Select
                      value={permissions[permission.key as keyof BoardPermissions] as string}
                      onValueChange={(value) => handleRoleChange(permission.key as keyof BoardPermissions, value as UserRole)}
                      disabled={readOnly || !canEditPermissions}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roleHierarchy.map(role => (
                          <SelectItem key={role} value={role}>
                            <div className="flex items-center gap-2">
                              {getRoleIcon(role)}
                              <span>{role}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Presets */}
        <div className="space-y-2 pt-4 border-t">
          <Label className="text-sm font-medium">빠른 설정</Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                // Public board preset
                onPermissionChange({
                  view: 'guest',
                  viewPrivate: 'member',
                  search: 'guest',
                  create: 'user',
                  edit: 'user',
                  delete: 'user',
                  comment: 'user',
                  like: 'user',
                  report: 'user',
                  upload: 'member',
                  download: 'guest',
                  pin: 'moderator',
                  lock: 'moderator',
                  deleteOthers: 'moderator',
                  editOthers: 'admin'
                })
              }}
              disabled={readOnly || !canEditPermissions}
              className="p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="font-medium text-sm">공개 게시판</div>
              <div className="text-xs text-muted-foreground">누구나 읽기, 회원만 작성</div>
            </button>
            
            <button
              onClick={() => {
                // Members only preset
                onPermissionChange({
                  view: 'member',
                  viewPrivate: 'member',
                  search: 'member',
                  create: 'member',
                  edit: 'member',
                  delete: 'member',
                  comment: 'member',
                  like: 'member',
                  report: 'member',
                  upload: 'member',
                  download: 'member',
                  pin: 'moderator',
                  lock: 'moderator',
                  deleteOthers: 'moderator',
                  editOthers: 'admin'
                })
              }}
              disabled={readOnly || !canEditPermissions}
              className="p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="font-medium text-sm">회원 전용</div>
              <div className="text-xs text-muted-foreground">회원만 접근 가능</div>
            </button>
            
            <button
              onClick={() => {
                // Read only preset
                onPermissionChange({
                  view: 'guest',
                  viewPrivate: 'admin',
                  search: 'guest',
                  create: 'admin',
                  edit: 'admin',
                  delete: 'admin',
                  comment: 'admin',
                  like: 'admin',
                  report: 'member',
                  upload: 'admin',
                  download: 'guest',
                  pin: 'admin',
                  lock: 'admin',
                  deleteOthers: 'admin',
                  editOthers: 'admin'
                })
              }}
              disabled={readOnly || !canEditPermissions}
              className="p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="font-medium text-sm">읽기 전용</div>
              <div className="text-xs text-muted-foreground">관리자만 작성 가능</div>
            </button>
            
            <button
              onClick={() => {
                // Strict preset
                onPermissionChange({
                  view: 'user',
                  viewPrivate: 'moderator',
                  search: 'user',
                  create: 'member',
                  edit: 'member',
                  delete: 'member',
                  comment: 'member',
                  like: 'member',
                  report: 'user',
                  upload: 'member',
                  download: 'user',
                  pin: 'admin',
                  lock: 'admin',
                  deleteOthers: 'admin',
                  editOthers: 'admin'
                })
              }}
              disabled={readOnly || !canEditPermissions}
              className="p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="font-medium text-sm">엄격 모드</div>
              <div className="text-xs text-muted-foreground">높은 권한 요구</div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}