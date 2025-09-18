import { useState } from 'react'
import { MainLayout } from '@/features/kanc/components/layout/MainLayout'
import { KancIntroHome } from './KancIntroHome'
import { KancServiceHome } from './KancServiceHome'

export function KancMainPage() {
  const [currentTab, setCurrentTab] = useState<'intro' | 'service'>('intro')

  return (
    <MainLayout currentTab={currentTab} onTabChange={setCurrentTab}>
      {currentTab === 'intro' ? <KancIntroHome /> : <KancServiceHome />}
    </MainLayout>
  )
}