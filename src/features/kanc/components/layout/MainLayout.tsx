import { type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: ReactNode
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
  onDemoSelect?: (demo: string) => void
}

export function MainLayout({ children, currentTab, onTabChange, onDemoSelect }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentTab={currentTab} onTabChange={onTabChange} onDemoSelect={onDemoSelect} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}