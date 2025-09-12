import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { 
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlinePhone,
  HiOutlineBookOpen
} from 'react-icons/hi2'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { cn } from '@/lib/utils'

export function QuickMenu() {
  const { settings } = useMoafabDevSettings()
  const { t } = useTranslation()

  const menuItems = useMemo(() => [
    {
      id: 'apply',
      icon: HiOutlineDocumentText,
      title: t('moafab.quickMenu.items.apply'),
      description: '팹서비스를 신청하세요',
      link: '/moafab/apply/service',
      color: 'text-blue-600',
    },
    {
      id: 'search',
      icon: HiOutlineMagnifyingGlass,
      title: t('moafab.quickMenu.items.search'),
      description: '필요한 장비를 찾아보세요',
      link: '/moafab/search',
      color: 'text-green-600',
    },
    {
      id: 'status',
      icon: HiOutlineChartBar,
      title: t('moafab.quickMenu.items.status'),
      description: '서비스 진행상황 확인',
      link: '/moafab/status',
      color: 'text-purple-600',
    },
    {
      id: 'quote',
      icon: HiOutlineCurrencyDollar,
      title: t('moafab.quickMenu.items.quote'),
      description: '서비스 견적을 받아보세요',
      link: '/moafab/apply/quote',
      color: 'text-orange-600',
    },
    {
      id: 'consult',
      icon: HiOutlinePhone,
      title: t('moafab.quickMenu.items.consult'),
      description: '전문가 상담을 예약하세요',
      link: '/moafab/apply/consult',
      color: 'text-pink-600',
    },
    {
      id: 'guide',
      icon: HiOutlineBookOpen,
      title: t('moafab.quickMenu.items.guide'),
      description: '서비스 이용방법 안내',
      link: '/moafab/guide',
      color: 'text-indigo-600',
    },
  ], [t])

  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{t('moafab.quickMenu.title')}</h2>
        <p className="text-muted-foreground mt-1">자주 이용하는 서비스를 빠르게 접근하세요</p>
      </div>

      <div className={cn(
        "grid gap-4",
        settings.quickMenu.columns === 2 && "md:grid-cols-2",
        settings.quickMenu.columns === 3 && "md:grid-cols-3",
        settings.quickMenu.columns === 4 && "md:grid-cols-4",
      )}>
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.id} to={item.link}>
              <Card className={cn(
                "hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
                settings.quickMenu.cardStyle === 'bordered' && "border",
                settings.quickMenu.cardStyle === 'filled' && "bg-muted/50",
                settings.quickMenu.cardStyle === 'ghost' && "border-0 shadow-none",
              )}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {settings.quickMenu.showIcons && (
                      <div className={cn("mt-1", item.color)}>
                        <Icon className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      {settings.quickMenu.showDescription && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}