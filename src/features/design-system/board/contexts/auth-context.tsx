'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { UserRole } from '../types/board.types'

interface AuthContextValue {
  currentRole: UserRole
  actualRole: UserRole
  isImpersonating: boolean
  impersonate: (role: UserRole) => void
  stopImpersonation: () => void
  availableRoles: UserRole[]
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  defaultRole?: UserRole
}

export function AuthProvider({ children, defaultRole = 'admin' }: AuthProviderProps) {
  // 실제 권한 (항상 admin으로 설정)
  const [actualRole] = useState<UserRole>('admin')
  // 현재 활성 권한 (impersonation 시 변경됨)
  const [currentRole, setCurrentRole] = useState<UserRole>(defaultRole)
  
  const availableRoles: UserRole[] = ['guest', 'user', 'member', 'moderator', 'admin']
  
  const impersonate = useCallback((role: UserRole) => {
    setCurrentRole(role)
  }, [])
  
  const stopImpersonation = useCallback(() => {
    setCurrentRole(actualRole)
  }, [actualRole])
  
  const isImpersonating = currentRole !== actualRole
  
  return (
    <AuthContext.Provider
      value={{
        currentRole,
        actualRole,
        isImpersonating,
        impersonate,
        stopImpersonation,
        availableRoles
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}