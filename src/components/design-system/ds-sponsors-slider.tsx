'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HiPlay, HiPause } from 'react-icons/hi2'
import type { IconType } from 'react-icons'
import { 
  FaApple, 
  FaMicrosoft,
  FaGoogle,
  // FaAmazon,
  FaMeta,
  // FaSpotify,
  // FaXTwitter
} from 'react-icons/fa6'
import { 
  SiTesla, 
  SiNetflix, 
  // SiAdobe, 
  SiNvidia,
  SiOpenai,
  SiDiscord,
  // SiNotion,
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
  // 테스트를 위해 임시로 2개만 표시 - 원복하려면 아래 주석 해제
  { id: 3, name: "Google", Icon: FaGoogle },
  // { id: 4, name: "Amazon", Icon: FaAmazon },
  { id: 5, name: "Meta", Icon: FaMeta },
  { id: 6, name: "Tesla", Icon: SiTesla },
  { id: 7, name: "Netflix", Icon: SiNetflix },
  // { id: 8, name: "Spotify", Icon: FaSpotify },
  // { id: 9, name: "Adobe", Icon: SiAdobe },
  { id: 10, name: "NVIDIA", Icon: SiNvidia },
  { id: 11, name: "OpenAI", Icon: SiOpenai },
  // { id: 12, name: "X", Icon: FaXTwitter },
  { id: 13, name: "Discord", Icon: SiDiscord },
  // { id: 14, name: "Notion", Icon: SiNotion },
  { id: 15, name: "Figma", Icon: SiFigma },
]

export function DSSponsorsSlider() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [items, setItems] = useState<SponsorItem[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  
  useEffect(() => {
    // 화면 너비에 따라 필요한 아이템 개수 계산
    const calculateItems = () => {
      if (!containerRef.current) return
      
      const containerWidth = containerRef.current.offsetWidth
      const itemWidth = 192 // 160px width + 32px gap
      const visibleItems = Math.ceil(containerWidth / itemWidth)
      const requiredSets = Math.ceil((visibleItems + 2) / sponsorsData.length) + 1
      
      // 충분한 복사본 생성 (최소 3세트)
      const sets = Math.max(3, requiredSets)
      const newItems = Array(sets).fill(sponsorsData).flat().map((item, idx) => ({
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
    
    const itemWidth = 192 // 160px width + 32px gap
    const totalWidth = sponsorsData.length * itemWidth
    
    const animate = () => {
      if (!scrollRef.current) return
      
      // 왼쪽으로 이동
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
      <div ref={containerRef} className="relative overflow-hidden py-16">
        {isAnimating ? (
          // 애니메이션 모드
          <div className="relative w-full">
            <div 
              ref={scrollRef}
              className="flex gap-8 will-change-transform"
              style={{ width: 'max-content' }}
            >
              {items.map((sponsor, index) => (
                <div 
                  key={`${sponsor.id}-${index}`}
                  className="relative group cursor-pointer flex-shrink-0"
                >
                  {/* 카드 */}
                  <Card className="w-40 h-28 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                    <div className="mt-8 text-center">
                      <div className="text-sm font-semibold text-gray-900">
                        {sponsor.name}
                      </div>
                    </div>
                  </Card>
                  
                  {/* 로고 - 카드 상단 중앙에 배치 */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-50 border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <sponsor.Icon className="w-8 h-8 text-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // 정적 모드
          <div className="flex justify-center flex-wrap gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {sponsorsData.map((sponsor, index) => (
              <div 
                key={`${sponsor.id}-${index}`}
                className="relative group cursor-pointer transition-all duration-500"
              >
                {/* 카드 */}
                <Card className="w-40 h-28 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                  <div className="mt-8 text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {sponsor.name}
                    </div>
                  </div>
                </Card>
                
                {/* 로고 - 카드 상단 중앙에 배치 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-50 border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <sponsor.Icon className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}