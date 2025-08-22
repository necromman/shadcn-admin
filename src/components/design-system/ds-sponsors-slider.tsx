'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HiPlay, HiPause } from 'react-icons/hi2'
import { IconType } from 'react-icons'
import { 
  FaApple, 
  FaMicrosoft, 
  FaGoogle,
  FaAmazon,
  FaMeta,
  FaSpotify,
  FaXTwitter
} from 'react-icons/fa6'
import { 
  SiTesla, 
  SiNetflix, 
  SiAdobe, 
  SiNvidia,
  SiOpenai,
  SiDiscord,
  SiNotion,
  SiFigma
} from 'react-icons/si'

interface SponsorItem {
  id: number
  name: string
  Icon: IconType
}

// 브랜드 데이터 - 아이콘 라이브러리 사용
const sponsorsData: SponsorItem[] = [
  { id: 1, name: "Apple", Icon: FaApple },
  { id: 2, name: "Microsoft", Icon: FaMicrosoft },
  { id: 3, name: "Google", Icon: FaGoogle },
  { id: 4, name: "Amazon", Icon: FaAmazon },
  { id: 5, name: "Meta", Icon: FaMeta },
  { id: 6, name: "Tesla", Icon: SiTesla },
  { id: 7, name: "Netflix", Icon: SiNetflix },
  { id: 8, name: "Spotify", Icon: FaSpotify },
  { id: 9, name: "Adobe", Icon: SiAdobe },
  { id: 10, name: "NVIDIA", Icon: SiNvidia },
  { id: 11, name: "OpenAI", Icon: SiOpenai },
  { id: 12, name: "X", Icon: FaXTwitter },
  { id: 13, name: "Discord", Icon: SiDiscord },
  { id: 14, name: "Notion", Icon: SiNotion },
  { id: 15, name: "Figma", Icon: SiFigma },
]

export function DSSponsorsSlider() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // 아이템 너비 계산 (카드 너비 + 간격)
  const ITEM_WIDTH = 176 // 160px card + 16px gap (space-x-8 = 2rem = 32px / 2)
  const TOTAL_WIDTH = sponsorsData.length * ITEM_WIDTH
  
  // 뷰포트에 따른 동적 복제 수 계산
  const [duplicateCount, setDuplicateCount] = useState(2)
  
  useEffect(() => {
    const calculateDuplicates = () => {
      if (!containerRef.current) return
      const viewportWidth = containerRef.current.offsetWidth
      // 최소 2세트가 화면에 보이도록 복제
      const minSets = Math.ceil((viewportWidth * 2) / TOTAL_WIDTH) + 1
      setDuplicateCount(Math.max(2, minSets))
    }
    
    calculateDuplicates()
    window.addEventListener('resize', calculateDuplicates)
    return () => window.removeEventListener('resize', calculateDuplicates)
  }, [TOTAL_WIDTH])
  
  // 복제된 데이터 생성
  const displaySponsors = isAnimating 
    ? Array(duplicateCount).fill(sponsorsData).flat()
    : sponsorsData

  // 애니메이션 속도 계산 (전체 아이템이 지나가는데 걸리는 시간)
  const animationDuration = `${sponsorsData.length * 3}s` // 아이템당 3초

  // 활성 카드 체크 로직
  useEffect(() => {
    if (!isAnimating) {
      setActiveCardIndex(null)
      return
    }

    const checkCardPositions = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const targetZoneStart = containerRect.left + containerRect.width * 0.35
      const targetZoneEnd = containerRect.left + containerRect.width * 0.45

      let foundActiveCard = false

      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return

        const cardRect = cardEl.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2

        if (cardCenter >= targetZoneStart && cardCenter <= targetZoneEnd && !foundActiveCard) {
          setActiveCardIndex(index)
          foundActiveCard = true
        }
      })

      if (!foundActiveCard) {
        setActiveCardIndex(null)
      }
    }

    let animationId: number
    const animate = () => {
      checkCardPositions()
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isAnimating])

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Trusted Partners</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            세계적인 브랜드들과 함께 혁신을 만들어갑니다
          </p>
        </div>
        
        {/* 토글 버튼 */}
        <div className="flex justify-center">
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
        </div>
      </div>

      {/* 스폰서 슬라이더 */}
      <div ref={containerRef} className="relative overflow-hidden py-12">
        {/* 타겟 존 시각적 표시 (개발용 - 배포 시 제거) */}
        {isAnimating && process.env.NODE_ENV === 'development' && (
          <div 
            className="absolute top-0 bottom-0 pointer-events-none z-20 border-x-2 border-dashed border-primary/20 bg-primary/5"
            style={{ 
              left: '35%', 
              width: '10%'
            }}
          />
        )}
        
        <div 
          ref={scrollRef}
          className={`flex ${
            isAnimating 
              ? 'space-x-8 infinite-scroll-animation' 
              : 'justify-center flex-wrap gap-8 max-w-6xl mx-auto'
          }`}
          style={isAnimating ? {
            width: `${displaySponsors.length * ITEM_WIDTH}px`,
            '--scroll-distance': `-${TOTAL_WIDTH}px`,
            '--animation-duration': animationDuration
          } as React.CSSProperties : {}}
        >
          {displaySponsors.map((sponsor, index) => (
            <div 
              key={`${sponsor.id}-${index}`}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`relative group cursor-pointer transition-all duration-500 ${
                isAnimating 
                  ? 'flex-shrink-0' 
                  : 'flex-shrink-0 hover:scale-105'
              } ${
                activeCardIndex === index 
                  ? 'scale-110 z-10' 
                  : ''
              }`}
            >
              {/* 로고 - 카드 위에 돌출 */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-gray-50/80 to-slate-100/80 border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                  activeCardIndex === index ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                }`}>
                  <sponsor.Icon className="w-8 h-8 text-gray-700" />
                </div>
              </div>
              
              {/* 카드 */}
              <Card className={`w-40 h-24 flex items-center justify-center bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                activeCardIndex === index 
                  ? 'shadow-2xl -translate-y-2 bg-white' 
                  : 'hover:shadow-xl group-hover:-translate-y-1'
              }`}>
                <div className="text-center mt-8">
                  <div className={`text-sm font-semibold transition-all duration-300 ${
                    activeCardIndex === index ? 'text-primary scale-110' : 'text-gray-900'
                  }`}>
                    {sponsor.name}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}