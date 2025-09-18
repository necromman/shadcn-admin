import { Card } from '@/components/ui/card'
import { SectionWrapper } from '../common/SectionWrapper'

interface InfoSectionProps {
  variant: 'intro' | 'service'
}

export function InfoSection({ variant }: InfoSectionProps) {
  const introLinks = [
    {
      title: '시설안내',
      description: 'KANC 첨단시설 VR 투어',
      link: '/facility/guide'
    },
    {
      title: '직원조회',
      description: '분야별 전문가 검색',
      link: '/staff'
    }
  ]

  const serviceLinks = [
    {
      title: '회원가입',
      description: '3분 간편가입',
      link: '/signup/guide'
    },
    {
      title: '직원조회',
      description: '담당자 연결',
      link: '/staff'
    },
    {
      title: 'FAQ',
      description: '자주 묻는 질문',
      link: '/faq'
    },
    {
      title: '오시는 길',
      description: '위치 안내',
      link: '/location'
    }
  ]

  const links = variant === 'intro' ? introLinks : serviceLinks

  return (
    <SectionWrapper>
      <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {variant === 'intro' ? '시설 & 인력' : '이용 안내'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {variant === 'intro'
              ? 'KANC의 첨단 시설과 전문 인력을 만나보세요'
              : '편리한 서비스 이용을 위한 안내'
            }
          </p>
        </div>

        <div className={`grid ${variant === 'intro' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
          {links.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group"
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>
    </SectionWrapper>
  )
}