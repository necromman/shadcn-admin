import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/lib/i18n/hooks'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { cn } from '@/lib/utils'

export function PartnersSection() {
  const { t } = useTranslation()
  const { settings } = useMoafabDevSettings()

  const partners = useMemo(() => [
    { 
      id: 'NINT', 
      name: t('moafab.equipment.institutions.NINT'),
      shortName: 'NINT',
      description: '나노 융합 기술 연구 선도 기관'
    },
    { 
      id: 'NNFC', 
      name: t('moafab.equipment.institutions.NNFC'),
      shortName: 'NNFC',
      description: '국가 나노팹 중앙 센터'
    },
    { 
      id: 'KANC', 
      name: t('moafab.equipment.institutions.KANC'),
      shortName: 'KANC',
      description: '반도체 공정 기술 개발'
    },
    { 
      id: 'ISRC', 
      name: t('moafab.equipment.institutions.ISRC'),
      shortName: 'ISRC',
      description: '첨단 반도체 연구'
    },
    { 
      id: 'ETRI', 
      name: t('moafab.equipment.institutions.ETRI'),
      shortName: 'ETRI',
      description: 'ICT 융합 연구 선도'
    },
    { 
      id: 'DGIST', 
      name: t('moafab.equipment.institutions.DGIST'),
      shortName: 'DGIST',
      description: '융합 과학기술 연구'
    },
  ], [t])

  return (
    <section className="py-12 border-t">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center">{t('moafab.partners.title')}</h2>
        <p className="text-muted-foreground mt-2 text-center">
          국내 최고의 나노팹 연구기관들이 함께합니다
        </p>
      </div>

      <div className={cn(
        "grid gap-4",
        settings.partners.displayMode === 'grid' ? 'md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
      )}>
        {partners.map((partner) => (
          <Card 
            key={partner.id}
            className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="mb-3 h-16 flex items-center justify-center">
              <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                {partner.shortName}
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-1">{partner.name}</h3>
            {settings.partners.showDescription && (
              <p className="text-xs text-muted-foreground">{partner.description}</p>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}