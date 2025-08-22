'use client'

import { useState } from 'react'
import { HiArrowTopRightOnSquare, HiBuildingOffice2, HiOutlineHandRaised, HiTrophy } from 'react-icons/hi2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Partner {
  id: number
  name: string
  logo: string
  category: string
  description?: string
  website?: string
}

export function DSPartnerCards() {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null)

  const mainPartners: Partner[] = [
    { id: 1, name: 'MSC', logo: '🚢', category: '선사', description: '세계 최대 컨테이너 선사', website: 'www.msc.com' },
    { id: 2, name: 'Maersk', logo: '⚓', category: '선사', description: '글로벌 물류 선도기업', website: 'www.maersk.com' },
    { id: 3, name: 'CMA CGM', logo: '🌊', category: '선사', description: '프랑스 대표 선사', website: 'www.cma-cgm.com' },
    { id: 4, name: 'Hapag-Lloyd', logo: '🏢', category: '선사', description: '독일 함부르크 기반', website: 'www.hapag-lloyd.com' },
    { id: 5, name: 'ONE', logo: '🌐', category: '선사', description: '일본 3사 합작', website: 'www.one-line.com' },
    { id: 6, name: 'Evergreen', logo: '🍃', category: '선사', description: '대만 최대 선사', website: 'www.evergreen-line.com' }
  ]

  const logistics: Partner[] = [
    { id: 7, name: 'DHL', logo: '📦', category: '물류', website: 'www.dhl.com' },
    { id: 8, name: 'FedEx', logo: '✈️', category: '물류', website: 'www.fedex.com' },
    { id: 9, name: 'UPS', logo: '🚚', category: '물류', website: 'www.ups.com' },
    { id: 10, name: 'DB Schenker', logo: '🚂', category: '물류', website: 'www.dbschenker.com' }
  ]

  const institutions: Partner[] = [
    { id: 11, name: '해양수산부', logo: '🏛️', category: '정부기관' },
    { id: 12, name: '관세청', logo: '🛃', category: '정부기관' },
    { id: 13, name: '한국선급', logo: '⚖️', category: '인증기관' },
    { id: 14, name: '항만공사', logo: '🏗️', category: '공공기관' },
    { id: 15, name: '무역협회', logo: '🤝', category: '협회' },
    { id: 16, name: '물류협회', logo: '📊', category: '협회' }
  ]

  const certifications = [
    { name: 'ISO 9001', desc: '품질경영시스템', icon: '🏆', color: 'bg-blue-100 dark:bg-blue-900/20' },
    { name: 'ISO 14001', desc: '환경경영시스템', icon: '🌱', color: 'bg-green-100 dark:bg-green-900/20' },
    { name: 'ISO 45001', desc: '안전보건경영', icon: '🛡️', color: 'bg-orange-100 dark:bg-orange-900/20' },
    { name: 'AEO', desc: '수출입안전관리', icon: '✅', color: 'bg-purple-100 dark:bg-purple-900/20' }
  ]

  return (
    <div className="w-full space-y-8">
      {/* Main Partners - Logo Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">주요 파트너사</h3>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiOutlineHandRaised className="h-5 w-5 text-blue-500" />
              글로벌 선사 파트너
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mainPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredPartner(partner.id)}
                  onMouseLeave={() => setHoveredPartner(null)}
                >
                  <div className="aspect-square rounded-lg border bg-card p-4 flex flex-col items-center justify-center hover:shadow-md transition-all hover:scale-105">
                    <span className="text-4xl mb-2">{partner.logo}</span>
                    <p className="text-sm font-medium text-center">{partner.name}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {partner.category}
                    </Badge>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredPartner === partner.id && partner.description && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border rounded-lg shadow-lg z-10 w-48">
                      <p className="text-xs text-center">{partner.description}</p>
                      {partner.website && (
                        <a 
                          href="#" 
                          className="text-xs text-primary hover:underline flex items-center justify-center gap-1 mt-1"
                        >
                          {partner.website}
                          <HiArrowTopRightOnSquare className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logistics Partners - Compact Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">물류 파트너</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logistics.map((partner) => (
            <Card key={partner.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{partner.logo}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.category}</p>
                  </div>
                  <HiArrowTopRightOnSquare className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Institutions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">관련 기관</h3>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiBuildingOffice2 className="h-5 w-5 text-green-500" />
              협력 기관 및 단체
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {institutions.map((inst) => (
                <Button
                  key={inst.id}
                  variant="outline"
                  className="h-auto py-3 px-4 justify-start hover:bg-accent"
                >
                  <span className="text-xl mr-3">{inst.logo}</span>
                  <div className="text-left">
                    <p className="font-medium text-sm">{inst.name}</p>
                    <p className="text-xs text-muted-foreground">{inst.category}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">인증 및 자격</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.name} className={cert.color}>
              <CardContent className="p-6 text-center">
                <span className="text-3xl mb-3 block">{cert.icon}</span>
                <h4 className="font-bold text-base mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partnership Benefits */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HiTrophy className="h-5 w-5 text-indigo-500" />
            파트너십 혜택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-2">우선 배정</h4>
              <p className="text-sm text-muted-foreground">선석 및 야드 우선 배정 서비스</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold mb-2">요율 할인</h4>
              <p className="text-sm text-muted-foreground">물동량 기준 차등 할인 적용</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">신속 처리</h4>
              <p className="text-sm text-muted-foreground">전용 창구 및 Fast Track 서비스</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button size="lg">
              파트너십 문의하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}