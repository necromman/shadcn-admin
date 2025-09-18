import { HeroSlider } from '../components/home/HeroSlider'
import { InfoGridSection } from '../components/home/InfoGridSection'
import { QuickMenu } from '../components/home/QuickMenu'
import { ServiceCards } from '../components/home/ServiceCards'
import { HotlineSection } from '../components/home/HotlineSection'
import { InfoSection } from '../components/home/InfoSection'
import { StatsSection } from '../components/home/StatsSection'

export function KancServiceHome() {
  return (
    <div>
      <HeroSlider variant="service" />
      <InfoGridSection variant="service" />
      <QuickMenu variant="service" />
      <ServiceCards />
      <HotlineSection />
      <InfoSection variant="service" />
    </div>
  )
}