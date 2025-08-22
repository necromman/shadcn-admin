'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HiBuildingOffice2, HiChevronRight, HiStar } from 'react-icons/hi2'

const partnersData = [
  {
    id: 1,
    name: "TechCorp Solutions",
    type: "핵심 파트너",
    logo: "TC",
    description: "클라우드 인프라 및 데이터 분석 솔루션",
    partnership: "2021년부터",
    featured: true
  },
  {
    id: 2,
    name: "Global Innovations",
    type: "전략적 파트너",
    logo: "GI",
    description: "AI/ML 기반 비즈니스 자동화 플랫폼",
    partnership: "2022년부터"
  },
  {
    id: 3,
    name: "Digital Dynamics",
    type: "기술 파트너",
    logo: "DD",
    description: "사용자 경험 디자인 및 프론트엔드 개발",
    partnership: "2023년부터"
  },
  {
    id: 4,
    name: "Secure Systems",
    type: "보안 파트너",
    logo: "SS",
    description: "엔터프라이즈 보안 및 컴플라이언스 솔루션",
    partnership: "2022년부터",
    featured: true
  }
]

export function DSPartnersCards() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">비즈니스 파트너</h3>
          <p className="text-sm text-muted-foreground">신뢰할 수 있는 협력 업체들</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          파트너 프로그램 <HiChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* 파트너 카드 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {partnersData.map((partner) => (
          <Card key={partner.id} className="group cursor-pointer business-card">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                {/* 로고 */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border">
                  <span className="text-sm font-bold text-primary">{partner.logo}</span>
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm leading-tight">{partner.name}</CardTitle>
                    {partner.featured && (
                      <HiStar className="h-3.5 w-3.5 text-amber-500" />
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {partner.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {partner.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <HiBuildingOffice2 className="mr-1.5 h-3.5 w-3.5" />
                  {partner.partnership}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}