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
import { ArrowRight, Play, Pause } from 'lucide-react'
import { Link } from 'react-router-dom'

// ========================================
// 개발자 설정 옵션 (Developer Configuration)
// ========================================
const DEVELOPER_CONFIG = {
  // 캐러셀 높이 설정
  carouselHeight: 400, // 300-800px 범위
  
  // 자동 재생 설정
  enableAutoPlay: true,
  autoPlayInterval: 5000, // 밀리초
  
  // 인디케이터 설정
  indicatorStyle: 'square' as 'circle' | 'square',
  indicatorPosition: 'inside' as 'inside' | 'outside',
  
  // 네비게이션 버튼 설정
  showNavigationButtons: true,
  navigationButtonSize: 64, // 버튼 크기 (px)
  navigationIconSize: 32, // 아이콘 크기 (px)
  
  // 컨텐츠 정렬
  contentAlignment: 'left' as 'left' | 'center' | 'right',
  
  // 패딩 설정
  contentPaddingDesktop: 145, // 데스크톱 좌우 패딩
  contentPaddingMobile: 16, // 모바일 좌우 패딩
  indicatorPaddingDesktop: 175, // 인디케이터 데스크톱 패딩
  indicatorPaddingMobile: 45, // 인디케이터 모바일 패딩
}

interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  imageUrl?: string
  link?: string
  linkText?: string
  secondaryLink?: string
  secondaryLinkText?: string
  badge?: string
  bgColor?: string
}

// 도서관 홍보 슬라이드 데이터
const LIBRARY_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: '세종샘물도서관 시스템 오픈',
    // subtitle: 'System Launch',
    description: '세종공동캠퍼스 도서관리 시스템이 정식 오픈했습니다. 엑셀로 관리하던 도서 대출/반납이 이제 온라인으로 간편하게! 모바일과 PC에서 언제든지 도서 검색과 예약이 가능합니다.',
    // badge: 'NEW',
    bgColor: 'bg-[#151515]',
    link: '/guide/system',
    linkText: '시스템 소개',
    secondaryLink: '/guide/faq',
    secondaryLinkText: '자주 묻는 질문'
  },
  {
    id: 'slide-2',
    title: '온라인 도서 대출 서비스 시작',
    // subtitle: 'Digital Service',
    description: '이제 도서관에 직접 방문하지 않아도 온라인으로 도서 대출 신청이 가능합니다. 검색부터 예약, 연장까지 모든 과정을 웹사이트에서 처리하세요. 대출 가능 권수는 1인당 5권입니다.',
    bgColor: 'bg-[#151515]',
    link: '/services/loan',
    linkText: '대출 방법 안내',
    secondaryLink: '/my-library',
    secondaryLinkText: '내 대출 현황'
  },
  {
    id: 'slide-3',
    title: '열람실 좌석 예약 시스템',
    // subtitle: 'Seat Reservation',
    description: '열람실 좌석을 실시간으로 확인하고 예약하세요. 제1열람실(100석), 제2열람실(80석), 스터디룸(10실) 모두 온라인 예약 가능. 당일 예약은 4시간, 시험기간에는 연장 이용이 가능합니다.',
    bgColor: 'bg-[#151515]',
    link: '/facilities/seat',
    linkText: '좌석 예약하기',
    secondaryLink: '/guide/facilities',
    secondaryLinkText: '이용 안내'
  },
  {
    id: 'slide-4',
    title: '신입생 도서관 이용 교육',
    // subtitle: 'Orientation Program',
    description: '2024학년도 신입생을 위한 도서관 이용 교육을 실시합니다. 시스템 사용법, 도서 검색 방법, 학술DB 이용법 등을 안내합니다. 선착순 50명, 참가자에게는 도서 대출 우선권을 제공합니다.',
    // badge: 'EVENT',
    bgColor: 'bg-[#151515]',
    link: '/events/orientation',
    linkText: '교육 신청',
    secondaryLink: '/guide/tutorial',
    secondaryLinkText: '온라인 튜토리얼'
  }
]

export function LibraryCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // 반응형 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
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
    if (!api || !DEVELOPER_CONFIG.enableAutoPlay || isPaused) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, DEVELOPER_CONFIG.autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, isPaused, current])

  // 슬라이드 직접 이동
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  // 마우스 hover 시 일시정지
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // 인디케이터 스타일 클래스
  const getIndicatorClass = (isActive: boolean) => {
    const baseClass = 'transition-all duration-300'
    
    const sizeClass = DEVELOPER_CONFIG.indicatorStyle === 'square' 
      ? (isActive ? 'w-8 h-2' : 'w-4 h-2')
      : (isActive ? 'w-8 h-2' : 'w-2 h-2')
    
    const shapeClass = DEVELOPER_CONFIG.indicatorStyle === 'square' 
      ? 'rounded-[2px]'
      : 'rounded-full'
    
    if (DEVELOPER_CONFIG.indicatorPosition === 'inside') {
      const colorClass = isActive 
        ? 'bg-white border border-white/50' 
        : 'bg-white/50 hover:bg-white/70 border border-white/30'
      return cn(baseClass, sizeClass, shapeClass, colorClass)
    }
    
    const colorClass = isActive 
      ? 'bg-primary' 
      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
    return cn(baseClass, sizeClass, shapeClass, colorClass)
  }

  return (
    <div className="w-full">
      {/* 캐러셀 본체 */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative",
          DEVELOPER_CONFIG.indicatorPosition === 'outside' && "mb-4"
        )}
      >
        <div 
          className="relative overflow-hidden bg-[#151515]"
          style={{ height: `${DEVELOPER_CONFIG.carouselHeight}px` }}
        >
          <Carousel
            setApi={setApi}
            className="w-full h-full"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-0 h-full">
              {LIBRARY_SLIDES.map((slide) => (
                <CarouselItem key={slide.id} className="pl-0">
                  <div 
                    className={cn(
                      "relative w-full h-full select-none",
                      slide.bgColor || "bg-[#151515]"
                    )}
                    style={{ 
                      height: `${DEVELOPER_CONFIG.carouselHeight}px`,
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      userSelect: 'none',
                      WebkitTouchCallout: 'none'
                    }}
                  >
                    {/* Container 기준 레이아웃 */}
                    <div className="container mx-auto relative h-full">
                      {/* 컨텐츠 영역 */}
                      <div 
                        className="flex items-center h-full relative"
                        style={{
                          paddingTop: '32px',
                          paddingBottom: DEVELOPER_CONFIG.indicatorPosition === 'inside' ? '82px' : '32px',
                          paddingLeft: (isMobile ? DEVELOPER_CONFIG.contentPaddingMobile : DEVELOPER_CONFIG.contentPaddingDesktop) + 'px',
                          paddingRight: (isMobile ? DEVELOPER_CONFIG.contentPaddingMobile : DEVELOPER_CONFIG.contentPaddingDesktop) + 'px'
                        }}
                      >
                        <div className="w-full space-y-3 md:space-y-4">
                          {/* 배지 */}
                          {slide.badge && (
                            <div className="flex items-center">
                              <Badge 
                                variant="secondary" 
                                className="bg-white/20 text-white backdrop-blur-sm border-white/30 px-5 py-2 text-xs font-bold uppercase tracking-wider"
                              >
                                {slide.badge}
                              </Badge>
                            </div>
                          )}
                          
                          {/* 부제목 */}
                          {slide.subtitle && (
                            <div className="space-y-2">
                              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-400 dark:text-primary/70 font-semibold">
                                {slide.subtitle}
                              </p>
                              <div className="h-0.5 w-16 bg-slate-400 dark:bg-primary/50" />
                            </div>
                          )}
                          
                          {/* 제목 */}
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {slide.title}
                          </h2>
                          
                          {/* 설명 */}
                          {slide.description && (
                            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl">
                              {slide.description}
                            </p>
                          )}
                          
                          {/* CTA 버튼들 - 왼쪽 정렬 */}
                          {(slide.link || slide.secondaryLink) && (
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                              {slide.link && (
                                <Button
                                  variant="secondary"
                                  size="lg"
                                  className="group min-w-[180px] h-10 bg-white text-black hover:bg-gray-100"
                                  asChild
                                >
                                  <Link to={slide.link}>
                                    {slide.linkText || '자세히 보기'}
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                  </Link>
                                </Button>
                              )}
                              {slide.secondaryLink && (
                                <Button
                                  size="lg"
                                  variant="outline"
                                  className="min-w-[180px] h-10 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                  asChild
                                >
                                  <Link to={slide.secondaryLink}>
                                    {slide.secondaryLinkText || '더 알아보기'}
                                  </Link>
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* 네비게이션 버튼 */}
            {DEVELOPER_CONFIG.showNavigationButtons && (
              <>
                <CarouselPrevious 
                  className={cn(
                    "hidden md:flex absolute top-1/2 -translate-y-1/2 transition-all z-20",
                    "dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/30",
                    "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                  )}
                  style={{
                    width: `${DEVELOPER_CONFIG.navigationButtonSize}px`,
                    height: `${DEVELOPER_CONFIG.navigationButtonSize}px`,
                    left: 'max(1rem, calc(43% - 40rem + 80px))'
                  }}
                  iconSize={DEVELOPER_CONFIG.navigationIconSize}
                />
                <CarouselNext 
                  className={cn(
                    "hidden md:flex absolute top-1/2 -translate-y-1/2 transition-all z-20",
                    "dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/30",
                    "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                  )}
                  style={{
                    width: `${DEVELOPER_CONFIG.navigationButtonSize}px`,
                    height: `${DEVELOPER_CONFIG.navigationButtonSize}px`,
                    right: 'max(1rem, calc(43% - 40rem + 80px))'
                  }}
                  iconSize={DEVELOPER_CONFIG.navigationIconSize}
                />
              </>
            )}
          </Carousel>
          
          {/* 인디케이터 - 내부 옵션일 때 */}
          {DEVELOPER_CONFIG.indicatorPosition === 'inside' && (
            <div 
              className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
              style={{ height: '50px' }}
            >
              <div className="container mx-auto h-full relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 flex items-center pointer-events-auto"
                  style={{ 
                    height: '50px',
                    paddingBottom: '10px',
                    paddingLeft: (isMobile ? DEVELOPER_CONFIG.indicatorPaddingMobile : DEVELOPER_CONFIG.indicatorPaddingDesktop) + 'px',
                    paddingRight: (isMobile ? DEVELOPER_CONFIG.indicatorPaddingMobile : DEVELOPER_CONFIG.indicatorPaddingDesktop) + 'px'
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* 자동재생 버튼 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPaused(!isPaused)}
                      className="h-8 w-8 bg-black/20 backdrop-blur-sm hover:bg-white/20 hover:text-white text-white border border-white/20"
                      aria-label={isPaused ? '재생' : '일시정지'}
                    >
                      {isPaused ? (
                        <Play className="h-4 w-4 text-white" />
                      ) : (
                        <Pause className="h-4 w-4 text-white" />
                      )}
                    </Button>
                    
                    {/* 인디케이터 (dots) */}
                    <div className="flex items-center gap-2">
                      {LIBRARY_SLIDES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => scrollTo(index)}
                          className={getIndicatorClass(current === index)}
                          aria-label={`슬라이드 ${index + 1}로 이동`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 인디케이터 - 외부 배치 */}
      {DEVELOPER_CONFIG.indicatorPosition === 'outside' && (
        <div className="container mx-auto mt-4">
          <div className="flex items-center justify-start px-4 gap-4">
            {/* 자동재생 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="h-8 w-8 hover:bg-accent hover:text-accent-foreground"
              aria-label={isPaused ? '재생' : '일시정지'}
            >
              {isPaused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </Button>
            
            {/* 인디케이터 (dots) */}
            <div className="flex items-center gap-2">
              {LIBRARY_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={getIndicatorClass(current === index)}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}