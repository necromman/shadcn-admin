import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickMenuProps {
  variant: 'intro' | 'service'
}

const introItems = [
  {
    id: '1',
    title: '팹 서비스',
    description: '나노공정 서비스',
    link: '/service/fab',
    badge: '핵심',
    highlight: true
  },
  {
    id: '2',
    title: '기술소개',
    description: '첨단 기술 안내',
    link: '/tech/intro',
    badge: 'Tech'
  },
  {
    id: '3',
    title: '교육 서비스',
    description: '전문 교육 프로그램',
    link: '/service/education',
    badge: '교육'
  },
  {
    id: '4',
    title: '임대서비스',
    description: '시설 및 장비 임대',
    link: '/service/rental',
    badge: '임대'
  },
  {
    id: '5',
    title: '1:1문의',
    description: '맞춤 상담 서비스',
    link: '/inquiry',
    badge: '상담'
  },
  {
    id: '6',
    title: '주요사업',
    description: '성과 및 실적',
    link: '/business',
    badge: '성과'
  },
  {
    id: '7',
    title: '장비안내',
    description: '500+ 첨단장비',
    link: '/equipment',
    badge: '장비',
    highlight: true
  },
  {
    id: '8',
    title: '대관안내',
    description: '시설 대관 신청',
    link: '/facility',
    badge: '대관'
  }
]

const serviceItems = [
  {
    id: '1',
    title: '팹서비스 현황',
    description: '진행현황 조회',
    link: '/fab/status',
    badge: 'Live',
    highlight: true
  },
  {
    id: '2',
    title: '사용료 조회',
    description: '요금 납부',
    link: '/fab/payment',
    badge: '납부'
  },
  {
    id: '3',
    title: '관련증빙 서류',
    description: '서류 발급',
    link: '/fab/documents',
    badge: '발급'
  },
  {
    id: '4',
    title: '8인치 팹서비스',
    description: '8인치 공정',
    link: '/fab/8inch',
    badge: '8인치'
  },
  {
    id: '5',
    title: '팹출입 신청',
    description: '출입 신청서',
    link: '/fab/access',
    badge: '출입'
  },
  {
    id: '6',
    title: '대관 신청',
    description: '시설 대관',
    link: '/facility/apply',
    badge: '대관',
    highlight: true
  },
  {
    id: '7',
    title: '대관 현황',
    description: '예약 조회',
    link: '/facility/status',
    badge: '조회'
  },
  {
    id: '8',
    title: '장비담당자',
    description: '전문가 안내',
    link: '/equipment/staff',
    badge: '담당자'
  }
]

export function QuickMenu({ variant }: QuickMenuProps) {
  const items = variant === 'intro' ? introItems : serviceItems

  return (
    <SectionWrapper>
      {/* Section Header */}
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
            <Card className={cn(
              "relative h-full p-6 transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-1",
              "border",
              item.highlight && "bg-accent/30 border-primary/30"
            )}>
              {/* Badge */}
              {item.badge && (
                <Badge
                  variant={item.highlight ? "default" : "secondary"}
                  className="absolute top-4 right-4 text-[10px] px-2 py-0.5"
                >
                  {item.badge}
                </Badge>
              )}

              {/* Highlight Icon */}
              {item.highlight && (
                <Sparkles className="absolute top-4 left-4 w-3.5 h-3.5 text-primary" />
              )}

              {/* Content */}
              <div className="space-y-3 pt-2">
                {/* Title & Description */}
                <div>
                  <h3 className="font-semibold text-base mb-1.5 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="flex justify-end">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}