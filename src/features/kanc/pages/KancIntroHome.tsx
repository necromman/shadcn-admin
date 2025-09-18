import { HeroSlider } from '../components/home/HeroSlider'
import { InfoGridSection } from '../components/home/InfoGridSection'
import { QuickMenu } from '../components/home/QuickMenu'
import { HotlineSection } from '../components/home/HotlineSection'
import { InfoSection } from '../components/home/InfoSection'
import { PartnersSection } from '../components/home/PartnersSection'
import { BannerSlider } from '../components/home/BannerSlider'

export function KancIntroHome() {
  return (
    <div>
      <HeroSlider variant="intro" />
      <InfoGridSection variant="intro" />
      <QuickMenu variant="intro" />
      <HotlineSection />
      <InfoSection variant="intro" />
      <PartnersSection />
      <BannerSlider />
    </div>
  )
}