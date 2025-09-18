import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: ReactNode
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
}

export function MainLayout({ children, currentTab, onTabChange }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentTab={currentTab} onTabChange={onTabChange} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}