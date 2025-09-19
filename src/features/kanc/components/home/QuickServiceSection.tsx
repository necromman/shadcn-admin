import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Microscope,
  GraduationCap,
  MessageCircle,
  Calendar,
  TrendingUp,
  Building2,
  Users,
  AlertCircle,
  ArrowRight,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

interface QuickServiceSectionProps {
  variant: 'intro' | 'service'
}

const getIntroQuickLinks = (t: (key: string) => string) => [
  {
    title: t('kanc:sections.quickService.items.fabService.title'),
    desc: t('kanc:sections.quickService.items.fabService.description'),
    link: '/service/fab',
    icon: Microscope,
    badge: t('kanc:sections.quickService.badges.popular'),
    time: t('kanc:sections.quickService.times.immediate'),
    highlight: true
  },
  {
    title: t('kanc:sections.quickService.items.education.title'),
    desc: t('kanc:sections.quickService.items.education.description'),
    link: '/education',
    icon: GraduationCap,
    badge: t('kanc:sections.quickService.badges.new'),
    time: t('kanc:sections.quickService.times.febStart')
  },
  {
    title: t('kanc:sections.quickService.items.inquiry.title'),
    desc: t('kanc:sections.quickService.items.inquiry.description'),
    link: '/inquiry',
    icon: MessageCircle,
    time: t('kanc:sections.quickService.times.avg30min')
  },
  {
    title: t('kanc:sections.quickService.items.equipment.title'),
    desc: t('kanc:sections.quickService.items.equipment.description'),
    link: '/equipment',
    icon: Calendar,
    time: t('kanc:sections.quickService.times.24hours')
  }
]

const getServiceQuickLinks = (t: (key: string) => string) => [
  {
    title: t('kanc:sections.quickService.items.status.title'),
    desc: t('kanc:sections.quickService.items.status.description'),
    link: '/fab/status',
    icon: TrendingUp,
    badge: t('kanc:sections.quickService.badges.live'),
    time: t('kanc:sections.quickService.times.realtime'),
    highlight: true
  },
  {
    title: t('kanc:sections.quickService.items.facility.title'),
    desc: t('kanc:sections.quickService.items.facility.description'),
    link: '/facility/apply',
    icon: Building2,
    time: t('kanc:sections.quickService.times.immediateCheck')
  },
  {
    title: t('kanc:sections.quickService.items.staff.title'),
    desc: t('kanc:sections.quickService.items.staff.description'),
    link: '/staff',
    icon: Users,
    time: t('kanc:sections.quickService.times.weekdays')
  },
  {
    title: t('kanc:sections.quickService.items.hotline.title'),
    desc: t('kanc:sections.quickService.items.hotline.description'),
    link: '/hotline',
    icon: AlertCircle,
    badge: t('kanc:sections.quickService.badges.urgent'),
    time: t('kanc:sections.quickService.times.24_7')
  }
]

export function QuickServiceSection({ variant }: QuickServiceSectionProps) {
  const { t } = useTranslation()
  const quickLinks = variant === 'intro' ? getIntroQuickLinks(t) : getServiceQuickLinks(t)

  return (
    <Card className="flex-1 flex flex-col p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">{t('kanc:sections.quickService.title')}</h3>
          <a
            href={variant === 'intro' ? '/service/all' : '/service/portal'}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            {t('kanc:common.viewAll')}
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 space-y-2">
          {quickLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group block"
            >
              <div className={cn(
                "relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                "border",
                "hover:shadow-md hover:border-primary/50",
                "hover:bg-accent/50",
                item.highlight && "bg-primary/5 border-primary/30"
              )}>
                {/* 아이콘 */}
                <div className={cn(
                  "flex-shrink-0 p-2 rounded-lg",
                  item.highlight
                    ? "bg-primary/10"
                    : "bg-muted"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5",
                    item.highlight
                      ? "text-primary"
                      : "text-muted-foreground"
                  )} />
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        {item.badge && (
                          <Badge
                            variant={item.badge === t('kanc:sections.quickService.badges.popular') ? 'default' : item.badge === t('kanc:sections.quickService.badges.urgent') ? 'destructive' : 'secondary'}
                            className="text-[10px] px-1.5 py-0 h-4"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                      {item.time && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">
                            {item.time}
                          </span>
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 하단 빠른 링크 */}
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              <Star className="w-3 h-3 inline mr-1 text-yellow-500" />
              {t('kanc:sections.quickService.todayRecommend')}
            </span>
            <a href="/service/recommend" className="text-primary hover:underline flex items-center gap-1">
              {t('kanc:common.viewAll')}
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}