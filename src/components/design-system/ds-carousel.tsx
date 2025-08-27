'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HiArrowRight } from 'react-icons/hi2'

interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  cta?: {
    text: string
    link: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }
  secondaryCta?: {
    text: string
    link: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }
  badge?: string
  alignment?: 'left' | 'center' | 'right'
  bgColor?: string
}

// 엔터프라이즈 슬라이드 데이터
const SAMPLE_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: '차세대 클라우드 네이티브 플랫폼',
    subtitle: 'Digital Transformation',
    description: '마이크로서비스 아키텍처와 컨테이너 오케스트레이션을 기반으로 확장 가능한 인프라를 구축합니다. 자동화된 CI/CD 파이프라인으로 배포 속도를 개선하고, 멀티 클라우드 환경에서 유연한 워크로드 관리를 실현합니다.',
    alignment: 'left',
    bgColor: 'bg-[#151515]',
    cta: {
      text: '솔루션 보기',
      link: '#',
      variant: 'default'
    },
    secondaryCta: {
      text: '문의하기',
      link: '#',
      variant: 'outline'
    }
  },
  {
    id: 'slide-2',
    title: '엔터프라이즈 보안 플랫폼',
    subtitle: 'Zero Trust Security',
    description: '제로 트러스트 아키텍처로 모든 접근을 검증하고 실시간 모니터링합니다. AI 기반 위협 탐지와 자동화된 대응 시스템으로 엔드포인트부터 클라우드까지 통합 보안을 제공합니다.',
    alignment: 'left',
    bgColor: 'bg-[#151515]',
    cta: {
      text: '보안 평가',
      link: '#',
      variant: 'default'
    },
    secondaryCta: {
      text: '자료 받기',
      link: '#',
      variant: 'outline'
    }
  },
  {
    id: 'slide-3',
    title: '데이터 인텔리전스 플랫폼',
    subtitle: 'Business Intelligence',
    description: '실시간 데이터 분석과 머신러닝을 통해 비즈니스 인사이트를 제공합니다. 직관적인 대시보드와 자동화된 리포팅으로 데이터 기반 의사결정을 지원합니다.',
    alignment: 'left',
    bgColor: 'bg-[#151515]',
    cta: {
      text: '무료 체험',
      link: '#',
      variant: 'secondary'
    },
    secondaryCta: {
      text: '데모 보기',
      link: '#',
      variant: 'outline'
    }
  }
]

export function DSCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // 현재 슬라이드 업데이트
  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // 자동 재생
  useEffect(() => {
    if (!api || !autoplay || isPaused) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api, autoplay, isPaused, current])

  // 슬라이드 직접 이동
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  // 마우스 hover 시 일시정지
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div 
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0">
          {SAMPLE_SLIDES.map((slide) => {
            return (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="relative w-full overflow-hidden">
                  {/* 단색 배경 */}
                  <div className={cn(
                    "relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px]",
                    slide.bgColor || "bg-[#151515]"
                  )}>
                    
                    {/* 콘텐츠 영역 */}
                    <div className="relative h-full flex items-center">
                      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
                        <div className="max-w-5xl space-y-6">
                          {/* 배지 */}
                          {slide.badge && (
                            <div className="flex items-center">
                              <Badge 
                                variant="secondary" 
                                className="bg-primary/20 text-primary-foreground backdrop-blur-sm border-primary/30 px-5 py-2 text-xs font-bold uppercase tracking-wider"
                              >
                                {slide.badge}
                              </Badge>
                            </div>
                          )}
                          
                          {/* 부제목 */}
                          {slide.subtitle && (
                            <div className="space-y-2">
                              <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-primary/70 font-semibold">
                                {slide.subtitle}
                              </p>
                              <div className="h-0.5 w-16 bg-primary/50" />
                            </div>
                          )}
                          
                          {/* 제목 */}
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                            {slide.title}
                          </h2>
                          
                          {/* 설명 */}
                          {slide.description && (
                            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-300 max-w-4xl leading-relaxed">
                              {slide.description}
                            </p>
                          )}
                          
                          {/* CTA 버튼들 */}
                          {(slide.cta || slide.secondaryCta) && (
                            <div className="flex flex-col sm:flex-row gap-4 pt-8">
                              {slide.cta && (
                                <Button
                                  variant={slide.cta.variant || 'default'}
                                  size="lg"
                                  className="group min-w-[180px] h-12 text-base"
                                  onClick={() => window.location.href = slide.cta?.link || '#'}
                                >
                                  {slide.cta.text}
                                  <HiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                              )}
                              {slide.secondaryCta && (
                                <Button
                                  variant="outline"
                                  size="lg"
                                  className="min-w-[180px] h-12 text-base bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                  onClick={() => window.location.href = slide.secondaryCta?.link || '#'}
                                >
                                  {slide.secondaryCta.text}
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        
        {/* 데스크톱 네비게이션 버튼 */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 h-12 w-12 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" />
          <CarouselNext className="right-4 h-12 w-12 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" />
        </div>
      </Carousel>
      
      {/* 인디케이터 (dots) */}
      <div className="flex justify-center gap-2 mt-4">
        {SAMPLE_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === index 
                ? "w-8 bg-primary" 
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* 자동 재생 토글 */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoplay(!autoplay)}
          className="text-xs"
        >
          {autoplay ? '자동 재생 중지' : '자동 재생 시작'}
        </Button>
      </div>
    </div>
  )
}