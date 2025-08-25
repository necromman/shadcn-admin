'use client'

import { DSPartnersCards } from './ds-partners-cards'
import { DSSponsorsSlider } from './ds-sponsors-slider'

export function DSPortfolioSection() {
  return (
    <div className="w-full space-y-16">
      {/* 비즈니스 파트너 섹션 */}
      <section>
        <DSPartnersCards />
      </section>

      {/* 구분선 */}
      <div className="border-t" />

      {/* 스폰서 슬라이더 섹션 */}
      <section>
        <DSSponsorsSlider />
      </section>
    </div>
  )
}