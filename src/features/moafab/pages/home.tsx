import { MoafabDevSettingsProvider } from '../context/dev-settings-provider'
import { MoafabPreHeader } from '../components/layout/moafab-pre-header'
import { MoafabHeader } from '../components/layout/moafab-header'
import { MoafabFooter } from '../components/layout/moafab-footer'
import { HeroSection } from '../components/sections/hero-section'
import { EquipmentSearch } from '../components/sections/equipment-search'
import { NoticeSection } from '../components/sections/notice-section'
import { QuickMenu } from '../components/sections/quick-menu'
import { PartnersSection } from '../components/sections/partners-section'
import { DevSettingsPanel } from '../components/dev-settings/dev-settings-panel'
import { cn } from '@/lib/utils'
import { useMoafabDevSettings } from '../context/dev-settings-provider'

function MoafabHomeContent() {
  const { settings } = useMoafabDevSettings()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Pre-Header */}
      <MoafabPreHeader />

      {/* Header */}
      <MoafabHeader />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section - Full Width */}
        <HeroSection />

        {/* Content Container */}
        <div className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          settings.layout.containerWidth === 'full' && "max-w-full",
          settings.layout.containerWidth === 'wide' && "max-w-7xl",
          settings.layout.containerWidth === 'narrow' && "max-w-5xl"
        )}>
          {/* Equipment Search */}
          <EquipmentSearch />

          {/* Notice Section */}
          <NoticeSection />

          {/* Quick Menu */}
          {/* <QuickMenu /> */}
        </div>

        {/* Partners Section - Full Width */}
        <PartnersSection />
      </main>

      {/* Footer */}
      <MoafabFooter />

      {/* Developer Settings Panel */}
      <DevSettingsPanel />
    </div>
  )
}

export function MoafabHomePage() {
  return (
    <MoafabDevSettingsProvider>
      <MoafabHomeContent />
    </MoafabDevSettingsProvider>
  )
}