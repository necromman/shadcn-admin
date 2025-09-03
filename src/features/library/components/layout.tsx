import { LibraryPreHeader } from './pre-header'
import { LibraryHeader } from './header'
import { LibraryFooter } from './footer'

export function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <LibraryPreHeader />
      <LibraryHeader />
      <main className="flex-1 bg-background">
        {children}
      </main>
      <LibraryFooter />
    </div>
  )
}