import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthLayout } from '@/features/auth/components/common/auth-layout'

export const Route = createFileRoute('/auth')({
  component: AuthPage,
})

function AuthPage() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}