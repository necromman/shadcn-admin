import { Card } from '@/components/ui/card'
import { SectionWrapper } from '../common/SectionWrapper'
import { useTranslation } from 'react-i18next'

const getMainServices = (t: any) => [
  {
    id: '1',
    title: t('kanc.services.facility.apply.title'),
    description: t('kanc.services.facility.apply.description'),
    stats: t('kanc.services.facility.apply.stats'),
    link: '/facility/apply'
  },
  {
    id: '2',
    title: t('kanc.services.facility.status.title'),
    description: t('kanc.services.facility.status.description'),
    stats: t('kanc.services.facility.status.stats'),
    link: '/facility/status'
  },
  {
    id: '3',
    title: t('kanc.services.facility.price.title'),
    description: t('kanc.services.facility.price.description'),
    stats: t('kanc.services.facility.price.stats'),
    link: '/facility/price'
  },
  {
    id: '4',
    title: t('kanc.services.facility.process.title'),
    description: t('kanc.services.facility.process.description'),
    stats: t('kanc.services.facility.process.stats'),
    link: '/facility/process'
  }
]

const getQuickServices = (t: any) => [
  {
    id: '1',
    title: t('kanc.services.quick.fabPricing.title'),
    description: t('kanc.services.quick.fabPricing.description'),
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    link: '/fab/pricing'
  },
  {
    id: '2',
    title: t('kanc.services.quick.education.title'),
    description: t('kanc.services.quick.education.description'),
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    link: '/education'
  }
]

export function ServiceCards() {
  const { t } = useTranslation()
  const mainServices = getMainServices(t)
  const quickServices = getQuickServices(t)

  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('kanc.services.title')}</h2>
          <p className="text-muted-foreground">
            {t('kanc.services.subtitle')}
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