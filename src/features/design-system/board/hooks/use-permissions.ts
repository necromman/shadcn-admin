import { useMemo } from 'react'
import type { BoardPermissions, UserRole } from '../types/permission.types'

interface UsePermissionsProps {
  userRole: UserRole
  permissions: BoardPermissions
}

export function usePermissions({ userRole, permissions }: UsePermissionsProps) {
  const roleHierarchy: UserRole[] = ['guest', 'user', 'member', 'moderator', 'admin']
  
  const getRoleIndex = (role: UserRole) => roleHierarchy.indexOf(role)
  
  const hasPermission = (requiredRole: UserRole) => {
    return getRoleIndex(userRole) >= getRoleIndex(requiredRole)
  }

  const can = useMemo(() => ({
    view: hasPermission(permissions.view),
    viewPrivate: hasPermission(permissions.viewPrivate),
    search: hasPermission(permissions.search),
    create: hasPermission(permissions.create),
    edit: hasPermission(permissions.edit),
    delete: hasPermission(permissions.delete),
    comment: hasPermission(permissions.comment),
    like: hasPermission(permissions.like),
    report: hasPermission(permissions.report),
    upload: hasPermission(permissions.upload),
    download: hasPermission(permissions.download),
    pin: hasPermission(permissions.pin),
    lock: hasPermission(permissions.lock),
    deleteOthers: hasPermission(permissions.deleteOthers),
    editOthers: hasPermission(permissions.editOthers)
  }), [userRole, permissions])

  const cannot = useMemo(() => ({
    view: !can.view,
    viewPrivate: !can.viewPrivate,
    search: !can.search,
    create: !can.create,
    edit: !can.edit,
    delete: !can.delete,
    comment: !can.comment,
    like: !can.like,
    report: !can.report,
    upload: !can.upload,
    download: !can.download,
    pin: !can.pin,
    lock: !can.lock,
    deleteOthers: !can.deleteOthers,
    editOthers: !can.editOthers
  }), [can])

  const canEditPost = (isAuthor: boolean) => {
    return isAuthor ? can.edit : can.editOthers
  }

  const canDeletePost = (isAuthor: boolean) => {
    return isAuthor ? can.delete : can.deleteOthers
  }

  const isAtLeast = (role: UserRole) => {
    return hasPermission(role)
  }

  const isExactly = (role: UserRole) => {
    return userRole === role
  }

  const isAdmin = userRole === 'admin'
  const isModerator = userRole === 'moderator' || isAdmin
  const isMember = userRole === 'member' || isModerator
  const isUser = userRole === 'user' || isMember
  const isGuest = userRole === 'guest'

  return {
    userRole,
    permissions,
    can,
    cannot,
    canEditPost,
    canDeletePost,
    isAtLeast,
    isExactly,
    isAdmin,
    isModerator,
    isMember,
    isUser,
    isGuest,
    hasPermission
  }
}