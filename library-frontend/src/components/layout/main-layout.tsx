import { Outlet } from 'react-router-dom'
import { LibraryHeaderEnterprise } from './library-header-enterprise'
import { LibraryFooter } from './library-footer'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LibraryHeaderEnterprise />
      <main className="flex-1 bg-gray-50 dark:bg-zinc-900">
        <Outlet />
      </main>
      <LibraryFooter />
    </div>
  )
}