import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LibraryHeader } from '@/library-frontend/src/components/layout/library-header'
import { LibraryFooter } from '@/library-frontend/src/components/layout/library-footer'

export const Route = createFileRoute('/library')({
  component: LibraryLayout,
})

function LibraryLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LibraryHeader />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
      <LibraryFooter />
    </div>
  )
}