'use client'

import { HiMapPin, HiClock, HiPhone, HiEnvelope, HiGlobeAlt, HiOutlineShoppingBag, HiBuildingOffice2, HiOutlineBuildingOffice2, HiShieldCheck, HiBolt, HiOutlineCloud } from 'react-icons/hi2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function DSInfoCards() {
  const portInfo = {
    name: '평택항',
    location: '경기도 평택시 포승읍',
    area: '8,452,000㎡',
    berths: 32,
    depth: '11~15m',
    capacity: '연간 300만 TEU'
  }

  const facilities = [
    {
      icon: <HiOutlineBuildingOffice2 className="h-8 w-8" />,
      title: '물류창고',
      description: '총 45개동, 850,000㎡',
      features: ['냉장/냉동 보관', '위험물 보관시설', '24시간 운영'],
      status: 'operational'
    },
    {
      icon: <HiOutlineShoppingBag className="h-8 w-8" />,
      title: '컨테이너 터미널',
      description: '5개 선석, 크레인 18기',
      features: ['자동화 시스템', '실시간 추적', 'RFID 관리'],
      status: 'operational'
    },
    {
      icon: <HiBuildingOffice2 className="h-8 w-8" />,
      title: '여객터미널',
      description: '국제선 2개 노선',
      features: ['면세점', '편의시설', '주차장 2,000대'],
      status: 'maintenance'
    },
    {
      icon: <HiShieldCheck className="h-8 w-8" />,
      title: '보안시설',
      description: '24시간 통합관제',
      features: ['CCTV 350대', '출입통제', '보안검색대'],
      status: 'operational'
    }
  ]

  const services = [
    {
      icon: '🚢',
      title: '선박 입출항',
      description: '24시간 도선 서비스',
      available: true
    },
    {
      icon: '📦',
      title: '화물 하역',
      description: '컨테이너, 벌크, 일반화물',
      available: true
    },
    {
      icon: '🏭',
      title: '보세구역',
      description: '수입화물 장치 및 가공',
      available: true
    },
    {
      icon: '🚛',
      title: '내륙운송',
      description: '철도 및 도로 연계 운송',
      available: true
    },
    {
      icon: '⚡',
      title: '전기공급',
      description: '선박 육상전원 공급',
      available: false
    },
    {
      icon: '💧',
      title: '급수서비스',
      description: '선박 용수 공급',
      available: true
    }
  ]

  const operatingHours = [
    { service: '일반 행정', hours: '09:00 - 18:00', days: '평일' },
    { service: '화물 작업', hours: '24시간', days: '연중무휴' },
    { service: '고객센터', hours: '08:00 - 20:00', days: '평일/토요일' },
    { service: '보안/출입', hours: '24시간', days: '연중무휴' }
  ]

  const weatherInfo = {
    temp: '12°C',
    condition: '맑음',
    wind: '북서풍 5m/s',
    wave: '0.5m',
    visibility: '10km'
  }

  return (
    <div className="w-full space-y-8">
      {/* Port Overview Card */}
      <div>
        <h3 className="text-lg font-semibold mb-4">항만 개요</h3>
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">{portInfo.name}</h3>
              <HiMapPin className="h-6 w-6" />
            </div>
            <p className="text-blue-50 mb-4">{portInfo.location}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '면적', value: portInfo.area },
                { label: '선석', value: `${portInfo.berths}개` },
                { label: '수심', value: portInfo.depth },
                { label: '처리능력', value: portInfo.capacity }
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-blue-100 text-sm">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">국제무역항</Badge>
              <Badge variant="outline">컨테이너 전용</Badge>
              <Badge variant="outline">스마트 항만</Badge>
              <Badge variant="outline">친환경 인증</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facilities Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">주요 시설</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilities.map((facility) => (
            <Card key={facility.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-500">{facility.icon}</div>
                    <div>
                      <h4 className="font-semibold">{facility.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{facility.description}</p>
                    </div>
                  </div>
                  <Badge variant={facility.status === 'operational' ? 'default' : 'secondary'}>
                    {facility.status === 'operational' ? '운영중' : '점검중'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {facility.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">제공 서비스</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card 
              key={service.title}
              className={`relative ${!service.available ? 'opacity-60' : 'hover:shadow-md transition-shadow cursor-pointer'}`}
            >
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <span className="text-3xl">{service.icon}</span>
                  <h4 className="font-semibold text-sm">{service.title}</h4>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                  {!service.available && (
                    <Badge variant="secondary" className="text-xs">준비중</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact & Operating Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiClock className="h-5 w-5 text-orange-500" />
              운영 시간
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operatingHours.map((item) => (
                <div key={item.service} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{item.service}</p>
                    <p className="text-xs text-muted-foreground">{item.days}</p>
                  </div>
                  <Badge variant="outline">{item.hours}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiPhone className="h-5 w-5 text-green-500" />
              연락처
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <HiPhone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">대표전화</p>
                  <p className="text-sm text-muted-foreground">031-686-0001</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiEnvelope className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">이메일</p>
                  <p className="text-sm text-muted-foreground">info@port.co.kr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiGlobeAlt className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">웹사이트</p>
                  <p className="text-sm text-muted-foreground">www.port.co.kr</p>
                </div>
              </div>
              <Button className="w-full mt-4">
                문의하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Sea Conditions */}
      <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HiOutlineCloud className="h-5 w-5 text-sky-500" />
            현재 기상 및 해상 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-3xl mb-1">☀️</p>
              <p className="text-sm font-medium">{weatherInfo.condition}</p>
              <p className="text-2xl font-bold">{weatherInfo.temp}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <HiBolt className="h-6 w-6 text-yellow-500 mb-1" />
              <p className="text-sm text-muted-foreground">풍속</p>
              <p className="font-medium">{weatherInfo.wind}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <HiOutlineCloud className="h-6 w-6 text-blue-500 mb-1" />
              <p className="text-sm text-muted-foreground">파고</p>
              <p className="font-medium">{weatherInfo.wave}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <HiGlobeAlt className="h-6 w-6 text-gray-500 mb-1" />
              <p className="text-sm text-muted-foreground">가시거리</p>
              <p className="font-medium">{weatherInfo.visibility}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Badge variant="default" className="bg-green-500">
                정상 운영
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">항만 상태</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}