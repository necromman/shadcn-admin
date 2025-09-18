import { HeroSlider } from '../components/home/HeroSlider'
import { InfoGridSection } from '../components/home/InfoGridSection'
import { EquipmentDashboard } from '../components/home/EquipmentDashboard'
import { QuickMenu } from '../components/home/QuickMenu'
import { ServiceCards } from '../components/home/ServiceCards'
import { SupportAndFacilitySection } from '../components/home/SupportAndFacilitySection'

export function KancServiceHome() {
  return (
    <div>
      <HeroSlider variant="service" />
      <InfoGridSection variant="service" />
      <EquipmentDashboard variant="service" />
      <QuickMenu variant="service" />
      <ServiceCards />
      <SupportAndFacilitySection variant="service" />
    </div>
  )
}