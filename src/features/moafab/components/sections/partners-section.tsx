import { useMemo } from 'react'
import { HiCheckCircle } from 'react-icons/hi2'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'
import { cn } from '@/lib/utils'

export function PartnersSection() {
  const { settings } = useMoafabDevSettings()

  const partners = useMemo(() => [
    { 
      id: 'NINT', 
      name: '나노종합기술원',
      shortName: 'NINT',
      description: '나노 융합 기술 연구 선도',
      logo: 'https://www.nint.re.kr/images/common/logo.png'
    },
    { 
      id: 'NNFC', 
      name: '국가나노팹센터',
      shortName: 'NNFC',
      description: '국가 나노팹 중앙 센터',
      logo: 'https://www.nnfc.re.kr/images/common/logo.png'
    },
    { 
      id: 'KANC', 
      name: '한국나노기술원',
      shortName: 'KANC',
      description: '반도체 공정 기술 개발',
      logo: 'https://www.kanc.re.kr/images/common/logo.png'
    },
    { 
      id: 'ISRC', 
      name: '반도체공동연구소',
      shortName: 'ISRC',
      description: '첨단 반도체 연구',
      logo: 'https://www.isrc.re.kr/images/common/logo.png'
    },
    { 
      id: 'ETRI', 
      name: '한국전자통신연구원',
      shortName: 'ETRI',
      description: 'ICT 융합 연구 선도',
      logo: 'https://www.etri.re.kr/images/common/logo.png'
    },
    { 
      id: 'DGIST', 
      name: '대구경북과학기술원',
      shortName: 'DGIST',
      description: '융합 과학기술 연구',
      logo: 'https://www.dgist.ac.kr/images/common/logo.png'
    },
  ], [])

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-muted/20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-primary mb-4">
          <HiCheckCircle className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Trusted Partners</span>
        </div>
        <h2 className="text-3xl font-bold mb-4">함께하는 파트너 기관</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          국내 최고의 나노팹 연구기관들이 MOAFAB 플랫폼을 통해 
          최첨단 연구 인프라를 제공합니다
        </p>
      </div>

      {/* 파트너 로고 그리드 */}
      <div className="relative">
        {/* 그라디언트 오버레이 (양쪽 끝) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* 파트너 로고 컨테이너 */}
        <div className="overflow-hidden">
          <div className={cn(
            "flex gap-8 items-center justify-center flex-wrap",
            settings.partners.displayMode === 'slider' && settings.partners.autoScroll && "animate-scroll"
          )}>
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="group cursor-pointer px-6"
              >
                <div className="flex flex-col items-center gap-2">
                  {/* 로고 영역 */}
                  <div className="h-20 w-32 flex items-center justify-center rounded-lg bg-background border p-4 group-hover:shadow-md transition-all group-hover:scale-105">
                    <div className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      {partner.shortName}
                    </div>
                  </div>
                  {/* 기관명 */}
                  {settings.partners.showDescription && (
                    <div className="text-center">
                      <p className="text-xs font-medium">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">6</div>
          <div className="text-sm text-muted-foreground mt-1">참여 기관</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">500+</div>
          <div className="text-sm text-muted-foreground mt-1">보유 장비</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">1,000+</div>
          <div className="text-sm text-muted-foreground mt-1">전문 인력</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">24/7</div>
          <div className="text-sm text-muted-foreground mt-1">온라인 지원</div>
        </div>
      </div>
    </section>
  )
}