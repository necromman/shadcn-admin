import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'

const partners = [
  {
    name: '차세대 융합기술연구원',
    description: '융합기술 R&D',
    link: 'https://aict.snu.ac.kr',
    type: '연구기관'
  },
  {
    name: '경기도경제과학진흥원',
    description: '경제과학 진흥',
    link: 'https://www.gbsa.or.kr',
    type: '진흥원'
  },
  {
    name: '나노인프라 장비통합 정보서비스',
    description: '장비 통합 관리',
    link: 'https://www.nanois.or.kr',
    type: '정보서비스'
  },
  {
    name: '경기 테크노파크',
    description: '기술 혁신 지원',
    link: 'https://www.gtp.or.kr',
    type: '테크노파크'
  }
]

export function PartnersSection() {
  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">협력 기관</h2>
          <p className="text-sm text-muted-foreground">
            KANC와 함께하는 파트너 기관들입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-3">
                  <Badge variant="outline" className="text-xs">
                    {partner.type}
                  </Badge>

                  <div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {partner.description}
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