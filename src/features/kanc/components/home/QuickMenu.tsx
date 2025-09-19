import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

interface QuickMenuProps {
  variant: 'intro' | 'service'
}

const getIntroItems = (t: (key: string) => string) => [
  {
    id: '1',
    title: t('kanc:sections.mainServices.items.fab.title'),
    description: t('kanc:sections.mainServices.items.fab.description'),
    link: '/service/fab',
    badge: t('kanc:sections.mainServices.badges.core'),
    highlight: true
  },
  {
    id: '2',
    title: t('kanc:sections.mainServices.items.tech.title'),
    description: t('kanc:sections.mainServices.items.tech.description'),
    link: '/tech/intro',
    badge: 'Tech'
  },
  {
    id: '3',
    title: t('kanc:sections.mainServices.items.education.title'),
    description: t('kanc:sections.mainServices.items.education.description'),
    link: '/service/education',
    badge: t('kanc:sections.mainServices.badges.education')
  },
  {
    id: '4',
    title: t('kanc:sections.mainServices.items.rental.title'),
    description: t('kanc:sections.mainServices.items.rental.description'),
    link: '/service/rental',
    badge: t('kanc:sections.mainServices.badges.rental')
  },
  {
    id: '5',
    title: t('kanc:sections.mainServices.items.inquiry.title'),
    description: t('kanc:sections.mainServices.items.inquiry.description'),
    link: '/inquiry',
    badge: t('kanc:sections.mainServices.badges.consultation')
  },
  {
    id: '6',
    title: t('kanc:sections.mainServices.items.business.title'),
    description: t('kanc:sections.mainServices.items.business.description'),
    link: '/business',
    badge: t('kanc:sections.mainServices.badges.achievement')
  },
  {
    id: '7',
    title: t('kanc:sections.mainServices.items.equipment.title'),
    description: t('kanc:sections.mainServices.items.equipment.description'),
    link: '/equipment',
    badge: t('kanc:sections.mainServices.badges.equipment'),
    highlight: true
  },
  {
    id: '8',
    title: t('kanc:sections.mainServices.items.facility.title'),
    description: t('kanc:sections.mainServices.items.facility.description'),
    link: '/facility',
    badge: t('kanc:sections.mainServices.badges.facility')
  }
]

const getServiceItems = (t: (key: string) => string) => [
  {
    id: '1',
    title: t('kanc:sections.serviceMenu.items.fabStatus.title'),
    description: t('kanc:sections.serviceMenu.items.fabStatus.description'),
    link: '/fab/status',
    badge: 'Live',
    highlight: true
  },
  {
    id: '2',
    title: t('kanc:sections.serviceMenu.items.feeInquiry.title'),
    description: t('kanc:sections.serviceMenu.items.feeInquiry.description'),
    link: '/fab/payment',
    badge: t('kanc:sections.serviceMenu.badges.payment')
  },
  {
    id: '3',
    title: t('kanc:sections.serviceMenu.items.documents.title'),
    description: t('kanc:sections.serviceMenu.items.documents.description'),
    link: '/fab/documents',
    badge: t('kanc:sections.serviceMenu.badges.issuance')
  },
  {
    id: '4',
    title: t('kanc:sections.serviceMenu.items.eightInch.title'),
    description: t('kanc:sections.serviceMenu.items.eightInch.description'),
    link: '/fab/8inch',
    badge: t('kanc:sections.serviceMenu.badges.eightInch')
  },
  {
    id: '5',
    title: t('kanc:sections.serviceMenu.items.fabAccess.title'),
    description: t('kanc:sections.serviceMenu.items.fabAccess.description'),
    link: '/fab/access',
    badge: t('kanc:sections.serviceMenu.badges.access')
  },
  {
    id: '6',
    title: t('kanc:sections.serviceMenu.items.facilityApply.title'),
    description: t('kanc:sections.serviceMenu.items.facilityApply.description'),
    link: '/facility/apply',
    badge: t('kanc:sections.serviceMenu.badges.facility'),
    highlight: true
  },
  {
    id: '7',
    title: t('kanc:sections.serviceMenu.items.facilityStatus.title'),
    description: t('kanc:sections.serviceMenu.items.facilityStatus.description'),
    link: '/facility/status',
    badge: t('kanc:sections.serviceMenu.badges.inquiry')
  },
  {
    id: '8',
    title: t('kanc:sections.serviceMenu.items.equipmentStaff.title'),
    description: t('kanc:sections.serviceMenu.items.equipmentStaff.description'),
    link: '/equipment/staff',
    badge: t('kanc:sections.serviceMenu.badges.staff')
  }
]

export function QuickMenu({ variant }: QuickMenuProps) {
  const { t } = useTranslation()
  const items = variant === 'intro' ? getIntroItems(t) : getServiceItems(t)

  return (
    <SectionWrapper>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {t('kanc:sections.mainServices.title')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('kanc:sections.mainServices.subtitle')}
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