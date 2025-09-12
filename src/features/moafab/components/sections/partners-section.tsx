import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HiPlay, HiPause } from 'react-icons/hi2'

interface PartnerItem {
  id: number
  name: string
  logo: string
}

// 파트너 기관 데이터
const partnersData: PartnerItem[] = [
  { 
    id: 1,
    name: '한국전자통신연구원',
    logo: 'https://www.etri.re.kr/images/intro/logo.svg'
  },
  { 
    id: 2,
    name: '서울대학교 반도체공동연구소',
    logo: 'https://isrc.snu.ac.kr/resources/images/isrc/common/logo3.png'
  },
  { 
    id: 3,
    name: '한국나노기술원',
    logo: 'https://www.kanc.re.kr/images/kor/logo.png'
  },
  { 
    id: 4,
    name: '나노융합기술원',
    logo: 'http://182.162.104.203/new2019/img/newlogo.png'
  },
  { 
    id: 5,
    name: '나노종합기술원',
    logo: '/docs/나노종합기술원.png'
  },
  { 
    id: 6,
    name: '대구경북과학기술원',
    logo: '/docs/대구경북과학기술원.png'
  },
]

export function PartnersSection() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [items, setItems] = useState<PartnerItem[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  
  useEffect(() => {
    // 화면 너비에 따라 필요한 아이템 개수 계산
    const calculateItems = () => {
      if (!containerRef.current) return
      
      const containerWidth = containerRef.current.offsetWidth
      const itemWidth = 280 // 증가된 카드 너비 + gap
      const visibleItems = Math.ceil(containerWidth / itemWidth)
      const requiredSets = Math.ceil((visibleItems + 2) / partnersData.length) + 2
      
      // 충분한 복사본 생성 (최소 4세트)
      const sets = Math.max(4, requiredSets)
      const newItems = Array(sets).fill(partnersData).flat().map((item, idx) => ({
        ...item,
        id: idx
      }))
      
      setItems(newItems)
    }
    
    calculateItems()
    window.addEventListener('resize', calculateItems)
    
    return () => {
      window.removeEventListener('resize', calculateItems)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  useEffect(() => {
    if (!isAnimating || !scrollRef.current || items.length === 0) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }
    
    const itemWidth = 280 // 증가된 카드 너비 + gap
    const totalWidth = partnersData.length * itemWidth
    
    const animate = () => {
      if (!scrollRef.current) return
      
      // 왼쪽으로 이동 - ds-sponsors-slider와 동일한 속도
      positionRef.current -= 0.5 // 속도 조절
      
      // 한 세트 완전히 스크롤되면 리셋
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0
      }
      
      scrollRef.current.style.transform = `translateX(${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, items])

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      <div className="space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Sitelink</h3>
            <p className="text-muted-foreground mx-auto">
              국내 최고의 나노팹 연구기관들이 모아팹 플랫폼을 통해 최첨단 연구 인프라를 제공합니다
            </p>
          </div>
          
          {/* 토글 버튼 */}
          {/* <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnimating(!isAnimating)}
              className="gap-2 transition-all duration-300"
            >
              {isAnimating ? (
                <>
                  <HiPause className="w-4 h-4" />
                  정적 보기
                </>
              ) : (
                <>
                  <HiPlay className="w-4 h-4" />
                  자동 흐름
                </>
              )}
            </Button>
          </div> */}
        </div>

        {/* 파트너 슬라이더 */}
        <div ref={containerRef} className="relative overflow-hidden py-10">
          {isAnimating ? (
            // 애니메이션 모드
            <div className="relative w-full">
              <div 
                ref={scrollRef}
                className="flex gap-10 will-change-transform"
                style={{ width: 'max-content' }}
              >
                {items.map((partner, index) => (
                  <div 
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    {/* 로고 카드 */}
                    <Card className="w-64 h-32 flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 backdrop-blur-sm border border-slate-500 dark:border-slate-600 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:scale-105 overflow-hidden">
                      <div className="w-full h-full p-6 flex items-center justify-center bg-gradient-to-br from-slate-600/95 to-slate-700/95 dark:from-gray-800/90 dark:to-gray-900/90">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-h-16 max-w-[200px] object-contain transition-all duration-300 group-hover:scale-110 brightness-0 invert opacity-90"
                          onError={(e) => {
                            // 이미지 로드 실패 시 텍스트로 대체
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement
                            if (fallback) fallback.style.display = 'flex'
                          }}
                        />
                        <div className="hidden items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300">
                          {partner.name.split(' ')[0]}
                        </div>
                      </div>
                    </Card>
                    
                    {/* 라벨 - 카드 아래 분리 */}
                    <div className="mt-3 text-center">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-2">
                        {partner.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // 정적 모드
            <div className="flex justify-center flex-wrap gap-8 max-w-6xl mx-auto">
              {partnersData.map((partner, index) => (
                <div 
                  key={`${partner.id}-${index}`}
                  className="group cursor-pointer transition-all duration-500"
                >
                  {/* 로고 카드 */}
                  <Card className="w-64 h-32 flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 backdrop-blur-sm border border-slate-500 dark:border-slate-600 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:scale-105 overflow-hidden">
                    <div className="w-full h-full p-6 flex items-center justify-center bg-gradient-to-br from-slate-600/95 to-slate-700/95 dark:from-gray-800/90 dark:to-gray-900/90">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-h-16 max-w-[200px] object-contain transition-all duration-300 group-hover:scale-110 brightness-0 invert opacity-90"
                        onError={(e) => {
                          // 이미지 로드 실패 시 텍스트로 대체
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                      <div className="hidden items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300">
                        {partner.name.split(' ')[0]}
                      </div>
                    </div>
                  </Card>
                  
                  {/* 라벨 - 카드 아래 분리 */}
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-2">
                      {partner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 통계 정보 */}
        {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground mt-1">참여 기관</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">990+</div>
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
        </div> */}
      </div>
    </section>
  )
}