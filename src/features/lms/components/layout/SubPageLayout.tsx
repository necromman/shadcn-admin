import React from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface SubPageLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SubPageLayout({ sidebar, children, className }: SubPageLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false)

  return (
    <div className={cn("min-h-screen bg-gray-50/50 dark:bg-gray-900/50", className)}>
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          {/* 데스크톱 사이드바 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 bg-white dark:bg-gray-950 rounded-lg border">
              <div className="h-[calc(100vh-6rem)] overflow-y-auto">
                {sidebar}
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 min-w-0">
            {/* 모바일 메뉴 버튼 */}
            <div className="lg:hidden sticky top-16 z-30 bg-white dark:bg-gray-950 rounded-lg border mb-4 px-4 py-2">
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Menu className="h-4 w-4" />
                    카테고리
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  {sidebar}
                </SheetContent>
              </Sheet>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}