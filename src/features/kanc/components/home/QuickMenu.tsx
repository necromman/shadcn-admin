import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'

interface QuickMenuProps {
  variant: 'intro' | 'service'
}

const introItems = [
  {
    id: '1',
    title: '팹 서비스',
    description: '나노공정 서비스',
    link: '/service/fab',
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/20',
    badge: '핵심'
  },
  {
    id: '2',
    title: '기술소개',
    description: '첨단 기술 안내',
    link: '/tech/intro',
    bgColor: 'bg-purple-50/50 dark:bg-purple-950/20',
    badge: 'Tech'
  },
  {
    id: '3',
    title: '교육 서비스',
    description: '전문 교육 프로그램',
    link: '/service/education',
    bgColor: 'bg-green-50/50 dark:bg-green-950/20',
    badge: '교육'
  },
  {
    id: '4',
    title: '임대서비스',
    description: '시설 및 장비 임대',
    link: '/service/rental',
    bgColor: 'bg-orange-50/50 dark:bg-orange-950/20',
    badge: '임대'
  },
  {
    id: '5',
    title: '1:1문의',
    description: '맞춤 상담 서비스',
    link: '/inquiry',
    bgColor: 'bg-red-50/50 dark:bg-red-950/20',
    badge: '상담'
  },
  {
    id: '6',
    title: '주요사업',
    description: '성과 및 실적',
    link: '/business',
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/20',
    badge: '성과'
  },
  {
    id: '7',
    title: '장비안내',
    description: '500+ 첨단장비',
    link: '/equipment',
    bgColor: 'bg-cyan-50/50 dark:bg-cyan-950/20',
    badge: '장비'
  },
  {
    id: '8',
    title: '대관안내',
    description: '시설 대관 신청',
    link: '/facility',
    bgColor: 'bg-amber-50/50 dark:bg-amber-950/20',
    badge: '대관'
  }
]

const serviceItems = [
  {
    id: '1',
    title: '팹서비스 현황',
    description: '진행현황 조회',
    link: '/fab/status',
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/20',
    badge: 'Live'
  },
  {
    id: '2',
    title: '사용료 조회',
    description: '요금 납부',
    link: '/fab/payment',
    bgColor: 'bg-green-50/50 dark:bg-green-950/20',
    badge: '납부'
  },
  {
    id: '3',
    title: '관련증빙 서류',
    description: '서류 발급',
    link: '/fab/documents',
    bgColor: 'bg-purple-50/50 dark:bg-purple-950/20',
    badge: '발급'
  },
  {
    id: '4',
    title: '8인치 팹서비스',
    description: '8인치 공정',
    link: '/fab/8inch',
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/20',
    badge: '8인치'
  },
  {
    id: '5',
    title: '팹출입 신청',
    description: '출입 신청서',
    link: '/fab/access',
    bgColor: 'bg-orange-50/50 dark:bg-orange-950/20',
    badge: '출입'
  },
  {
    id: '6',
    title: '대관 신청',
    description: '시설 대관',
    link: '/facility/apply',
    bgColor: 'bg-cyan-50/50 dark:bg-cyan-950/20',
    badge: '대관'
  },
  {
    id: '7',
    title: '대관 현황',
    description: '예약 조회',
    link: '/facility/status',
    bgColor: 'bg-teal-50/50 dark:bg-teal-950/20',
    badge: '조회'
  },
  {
    id: '8',
    title: '장비담당자',
    description: '전문가 안내',
    link: '/equipment/staff',
    bgColor: 'bg-red-50/50 dark:bg-red-950/20',
    badge: '담당자'
  }
]

export function QuickMenu({ variant }: QuickMenuProps) {
  const items = variant === 'intro' ? introItems : serviceItems

  return (
    <SectionWrapper>
      {/* Section Header - Compact */}
      <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {variant === 'intro' ? '주요 서비스' : '서비스 바로가기'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {variant === 'intro'
              ? '한국나노기술원의 핵심 서비스를 확인하세요'
              : '자주 이용하는 서비스에 빠르게 접근하세요'
            }
          </p>
        </div>

        {/* Quick Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="group"
            >
              <Card className="relative h-full p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Badge */}
                {item.badge && (
                  <Badge variant="secondary" className="absolute top-3 right-3 text-[10px] px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}

                {/* Content */}
                <div className="space-y-2">
                  {/* Color indicator */}
                  <div className={`w-full h-1 rounded-full ${item.bgColor}`} />

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
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