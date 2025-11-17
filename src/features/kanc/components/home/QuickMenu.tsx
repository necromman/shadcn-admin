import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

interface QuickMenuProps {
  variant: 'intro' | 'service'
}

const getIntroItems = (t: (key: string) => string) => [
  {
    id: '1',
    title: '팹서비스',
    shortTitle: '팹서비스',
    description: '팹서비스를 신청할 수 있습니다',
    link: '/service/fab',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    title: '주요사업 및 성과',
    shortTitle: '주요사업',
    description: '주요사업 및 성과를 안내합니다',
    link: '/business',
    bgImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    title: '기술소개',
    shortTitle: '기술소개',
    description: '기술소개 자료를 안내합니다',
    link: '/tech/intro',
    bgImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    title: '장비안내',
    shortTitle: '장비안내',
    description: '우수한 장비를 안내합니다',
    link: '/equipment',
    bgImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    title: '교육서비스',
    shortTitle: '교육서비스',
    description: '고급인력을 체계적으로 양성합니다',
    link: '/service/education',
    bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    title: '교육훈련',
    shortTitle: '교육훈련',
    description: '교육을 확인 및 신청할 수 있습니다',
    link: '/training',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop'
  },
  {
    id: '7',
    title: '임대서비스',
    shortTitle: '임대서비스',
    description: '기업과 단체에게 임대서비스를 제공합니다',
    link: '/service/rental',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop'
  },
  {
    id: '8',
    title: '대관안내',
    shortTitle: '대관안내',
    description: '대관 서비스를 신청할 수 있습니다',
    link: '/facility',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop'
  },
  {
    id: '9',
    title: '1:1 문의',
    shortTitle: '1:1 문의',
    description: '궁금한 사항을 1:1로 문의할 수 있습니다',
    link: '/inquiry',
    bgImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=400&fit=crop'
  },
  {
    id: '10',
    title: '자주 묻는 질문',
    shortTitle: 'FAQ',
    description: '자주 묻는 질문을 확인할 수 있습니다',
    link: '/faq',
    bgImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop'
  }
]

const getServiceItems = (t: (key: string) => string) => [
  {
    id: '1',
    title: t('kanc.sections.serviceMenu.items.fabStatus.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.fabStatus.title'),
    description: t('kanc.sections.serviceMenu.items.fabStatus.description'),
    link: '/fab/status',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    title: t('kanc.sections.serviceMenu.items.feeInquiry.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.feeInquiry.title'),
    description: t('kanc.sections.serviceMenu.items.feeInquiry.description'),
    link: '/fab/payment',
    bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    title: t('kanc.sections.serviceMenu.items.documents.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.documents.title'),
    description: t('kanc.sections.serviceMenu.items.documents.description'),
    link: '/fab/documents',
    bgImage: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    title: t('kanc.sections.serviceMenu.items.eightInch.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.eightInch.title'),
    description: t('kanc.sections.serviceMenu.items.eightInch.description'),
    link: '/fab/8inch',
    bgImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    title: t('kanc.sections.serviceMenu.items.fabAccess.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.fabAccess.title'),
    description: t('kanc.sections.serviceMenu.items.fabAccess.description'),
    link: '/fab/access',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    title: t('kanc.sections.serviceMenu.items.facilityApply.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.facilityApply.title'),
    description: t('kanc.sections.serviceMenu.items.facilityApply.description'),
    link: '/facility/apply',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop'
  },
  {
    id: '7',
    title: t('kanc.sections.serviceMenu.items.facilityStatus.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.facilityStatus.title'),
    description: t('kanc.sections.serviceMenu.items.facilityStatus.description'),
    link: '/facility/status',
    bgImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop'
  },
  {
    id: '8',
    title: t('kanc.sections.serviceMenu.items.equipmentStaff.title'),
    shortTitle: t('kanc.sections.serviceMenu.items.equipmentStaff.title'),
    description: t('kanc.sections.serviceMenu.items.equipmentStaff.description'),
    link: '/equipment/staff',
    bgImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop'
  },
  {
    id: '9',
    title: '1:1 문의',
    shortTitle: '1:1 문의',
    description: '궁금한 사항을 1:1로 문의할 수 있습니다',
    link: '/inquiry',
    bgImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=400&fit=crop'
  },
  {
    id: '10',
    title: '자주 묻는 질문',
    shortTitle: 'FAQ',
    description: '자주 묻는 질문을 확인할 수 있습니다',
    link: '/faq',
    bgImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop'
  }
]

export function QuickMenu({ variant }: QuickMenuProps) {
  const { t } = useTranslation()
  const items = variant === 'intro' ? getIntroItems(t) : getServiceItems(t)

  return (
    <SectionWrapper>
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {variant === 'intro' ? '주요 서비스' : t('kanc.sections.serviceMenu.title')}
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          {variant === 'intro' ? '한국나노기술원이 제공하는 다양한 서비스를 확인하세요' : t('kanc.sections.serviceMenu.subtitle')}
        </p>
      </div>

      {/* Quick Menu Grid - 5 columns x 2 rows */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={item.link}
            className="group block"
          >
            <Card className={cn(
              "relative overflow-hidden h-full aspect-square",
              "transition-all duration-500 ease-out",
              "hover:scale-105 hover:shadow-2xl",
              "border-0"
            )}>
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={item.bgImage}
                  alt=""
                  className="w-full h-full object-cover brightness-110 dark:brightness-100"
                  loading="lazy"
                />
                {/* Light mode: semi-dark overlay for contrast, Dark mode: darker overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-900/50 dark:from-gray-900/85 dark:to-gray-800/85 backdrop-blur-[1px]" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center items-center p-5 lg:p-6 text-center">
                {/* Content Background for better readability in light mode */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30 dark:from-transparent dark:via-transparent dark:to-transparent" />

                {/* Centered Content */}
                <div className="relative space-y-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg">
                    {item.shortTitle}
                  </h3>
                  <p className="text-xs lg:text-sm text-white/95 line-clamp-2 drop-shadow-md max-w-[90%] mx-auto">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Arrow - Absolute Position */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}