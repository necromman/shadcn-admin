import { Card } from '@/components/ui/card'
import { SectionWrapper } from '../common/SectionWrapper'

const mainServices = [
  {
    id: '1',
    title: '대관 신청',
    description: '회의실, 강당, 실험실 등 시설 대관 신청',
    stats: '즉시 예약',
    link: '/facility/apply'
  },
  {
    id: '2',
    title: '대관 신청 현황',
    description: '대관 신청 내역 및 처리 상태 확인',
    stats: '실시간 조회',
    link: '/facility/status'
  },
  {
    id: '3',
    title: '대관료',
    description: '시설별 대관료 안내 및 요금 계산',
    stats: '투명한 요금',
    link: '/facility/price'
  },
  {
    id: '4',
    title: '대관절차',
    description: '대관 신청부터 이용까지 전체 절차 안내',
    stats: '간편 절차',
    link: '/facility/process'
  }
]

const quickServices = [
  {
    id: '1',
    title: '팹서비스 이용료',
    description: '팹서비스 이용 요금 상세 안내 및 견적 계산',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    link: '/fab/pricing'
  },
  {
    id: '2',
    title: '교육서비스',
    description: '나노기술 전문 교육 프로그램 신청 및 일정',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    link: '/education'
  }
]

export function ServiceCards() {
  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">대관 서비스</h2>
          <p className="text-muted-foreground">
            KANC 시설을 편리하게 이용하실 수 있습니다
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mainServices.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="group"
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <span className="text-xs font-medium text-primary">
                    {service.stats}
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* Quick Services - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {quickServices.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="group"
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-full ${service.bgColor} rounded-full`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
    </SectionWrapper>
  )
}