import { useState } from 'react'
import { MainLayout } from '@/features/kanc/components/layout/MainLayout'
import { KancIntroHome } from './KancIntroHome'
import { KancServiceHome } from './KancServiceHome'
import { SFRDemoPage } from './SFRDemoPage'

export function KancMainPage() {
  const [currentTab, setCurrentTab] = useState<'intro' | 'service'>('intro')
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)

  const handleDemoSelect = (demo: string) => {
    setSelectedDemo(demo)
  }

  const handleBackToHome = () => {
    setSelectedDemo(null)
  }

  // 데모 페이지가 선택되면 데모 페이지 표시
  if (selectedDemo) {
    return (
      <SFRDemoPage
        demoId={selectedDemo}
        onBack={handleBackToHome}
      />
    )
  }

  return (
    <MainLayout
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      onDemoSelect={handleDemoSelect}
    >
      {currentTab === 'intro' ? <KancIntroHome /> : <KancServiceHome />}
    </MainLayout>
  )
}