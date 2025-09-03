import { Outlet } from 'react-router-dom'
import { LibraryHeader } from './library-header'
import { LibraryFooter } from './library-footer'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LibraryHeader />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
      <LibraryFooter />
    </div>
  )
}