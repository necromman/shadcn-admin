import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import { useTranslation } from '@/lib/i18n/hooks'

const getPartners = (t: (key: string) => string) => [
  {
    name: t('kanc:sections.partners.items.aict.name'),
    description: t('kanc:sections.partners.items.aict.description'),
    link: 'https://aict.snu.ac.kr',
    type: t('kanc:sections.partners.types.research')
  },
  {
    name: t('kanc:sections.partners.items.gbsa.name'),
    description: t('kanc:sections.partners.items.gbsa.description'),
    link: 'https://www.gbsa.or.kr',
    type: t('kanc:sections.partners.types.promotion')
  },
  {
    name: t('kanc:sections.partners.items.nanois.name'),
    description: t('kanc:sections.partners.items.nanois.description'),
    link: 'https://www.nanois.or.kr',
    type: t('kanc:sections.partners.types.infoService')
  },
  {
    name: t('kanc:sections.partners.items.gtp.name'),
    description: t('kanc:sections.partners.items.gtp.description'),
    link: 'https://www.gtp.or.kr',
    type: t('kanc:sections.partners.types.technopark')
  }
]

export function PartnersSection() {
  const { t } = useTranslation()
  const partners = getPartners(t)

  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('kanc:sections.partners.title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('kanc:sections.partners.subtitle')}
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
              <Card className="h-full p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
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