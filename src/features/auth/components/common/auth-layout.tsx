import { Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children?: React.ReactNode
  className?: string
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container relative min-h-screen flex items-center justify-center py-8">
        <div className={cn("w-full", className)}>
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  )
}