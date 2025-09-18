import { HeroSlider } from '../components/home/HeroSlider'
import { InfoGridSection } from '../components/home/InfoGridSection'
import { QuickMenu } from '../components/home/QuickMenu'
import { ServiceCards } from '../components/home/ServiceCards'
import { SupportAndFacilitySection } from '../components/home/SupportAndFacilitySection'
import { StatsSection } from '../components/home/StatsSection'

export function KancServiceHome() {
  return (
    <div>
      <HeroSlider variant="service" />
      <InfoGridSection variant="service" />
      <QuickMenu variant="service" />
      <ServiceCards />
      <SupportAndFacilitySection variant="service" />
    </div>
  )
}