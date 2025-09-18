import { HeroSlider } from '../components/home/HeroSlider'
import { InfoGridSection } from '../components/home/InfoGridSection'
import { QuickMenu } from '../components/home/QuickMenu'
import { SupportAndFacilitySection } from '../components/home/SupportAndFacilitySection'
import { PartnersSection } from '../components/home/PartnersSection'
import { BannerSlider } from '../components/home/BannerSlider'

export function KancIntroHome() {
  return (
    <div>
      <HeroSlider variant="intro" />
      <InfoGridSection variant="intro" />
      <QuickMenu variant="intro" />
      <SupportAndFacilitySection />
      <PartnersSection />
      <BannerSlider />
    </div>
  )
}