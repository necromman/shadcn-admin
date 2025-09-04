import { useState, useEffect, useCallback, useMemo } from 'react'
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
import { Link } from '@tanstack/react-router'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'

interface CarouselOptions {
  height: number
  indicatorStyle: 'circle' | 'square'
  indicatorPosition: 'inside' | 'outside'
  autoPlay: boolean
  navigationSize: 'small' | 'medium' | 'large' | 'custom'
  customButtonSize: number
  customIconSize: number
  navigationPosition: 'safe' | 'edge' | 'custom'
  buttonBasePercent: number
  buttonLeftPosition: number
  buttonRightPosition: number
  indicatorPaddingDesktop: number
  indicatorPaddingMobile: number
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
    description: '세종공동캠퍼스 도서관리 시스템이 정식 오픈했습니다. 엑셀로 관리하던 도서 대출/반납이 이제 온라인으로 간편하게! 모바일과 PC에서 언제든지 도서 검색과 예약이 가능합니다.',
    bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
    link: '/',
    linkText: '시스템 소개',
    secondaryLink: '/',
    secondaryLinkText: '자주 묻는 질문'
  },
  {
    id: 'slide-2',
    title: '온라인 도서 대출 서비스 시작',
    description: '이제 도서관에 직접 방문하지 않아도 온라인으로 도서 대출 신청이 가능합니다. 검색부터 예약, 연장까지 모든 과정을 웹사이트에서 처리하세요. 대출 가능 권수는 1인당 5권입니다.',
    bgColor: 'bg-gradient-to-r from-green-600 to-teal-600',
    link: '/',
    linkText: '대출 방법 안내',
    secondaryLink: '/',
    secondaryLinkText: '내 대출 현황'
  },
  {
    id: 'slide-3',
    title: '열람실 좌석 예약 시스템',
    description: '열람실 좌석을 실시간으로 확인하고 예약하세요. 제1열람실(100석), 제2열람실(80석), 스터디룸(10실) 모두 온라인 예약 가능. 당일 예약은 4시간, 시험기간에는 연장 이용이 가능합니다.',
    // bgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
    link: '/',
    linkText: '좌석 예약하기',
    secondaryLink: '/',
    secondaryLinkText: '이용 안내'
  },
  {
    id: 'slide-4',
    title: '신입생 도서관 이용 교육',
    description: '2024학년도 신입생을 위한 도서관 이용 교육을 실시합니다. 시스템 사용법, 도서 검색 방법, 학술DB 이용법 등을 안내합니다. 선착순 50명, 참가자에게는 도서 대출 우선권을 제공합니다.',
    bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    link: '/',
    linkText: '교육 신청',
    secondaryLink: '/',
    secondaryLinkText: '온라인 튜토리얼'
  }
]

export function LibraryCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { settings } = useLibraryDevSettings()
  
  // 개발자 설정에서 가져온 옵션 사용 (디자인 시스템과 동일한 기본값)
  const options = useMemo<CarouselOptions>(() => ({
    height: settings.carousel.height,
    indicatorStyle: settings.carousel.indicatorStyle,
    indicatorPosition: settings.carousel.indicatorPosition,
    autoPlay: settings.carousel.autoPlay,
    navigationSize: settings.carousel.navigationSize || 'large',  // 크게를 기본값으로
    customButtonSize: settings.carousel.customButtonSize || 64,
    customIconSize: settings.carousel.customIconSize || 32,
    navigationPosition: settings.carousel.navigationPosition || 'custom',  // 커스텀으로 변경
    buttonBasePercent: settings.carousel.buttonBasePercent || 43,  // 기준점 43%로 변경
    buttonLeftPosition: settings.carousel.buttonLeftPosition || 80,  // 컨테이너 안쪽 80px
    buttonRightPosition: settings.carousel.buttonRightPosition || 80,  // 컨테이너 안쪽 80px
    indicatorPaddingDesktop: settings.carousel.indicatorPaddingDesktop || 175,  // 175px로 변경 (메인과 동일)
    indicatorPaddingMobile: settings.carousel.indicatorPaddingMobile || 45  // 45px로 변경 (메인과 동일)
  }), [settings.carousel])
  
  // PC 최소/최대 높이 제약
  const MIN_HEIGHT_PC = 300
  const MAX_HEIGHT = 800
  const INDICATOR_HEIGHT = 50
  
  // 실제 적용 높이 계산
  const appliedHeight = Math.max(MIN_HEIGHT_PC, Math.min(options.height, MAX_HEIGHT))
  
  // 동적 스타일 계산
  const dynamicStyles = useMemo(() => {
    const height = appliedHeight
    
    // 높이별 스타일
    const getHeightBasedStyles = () => {
      if (height <= 350) {
        return {
          titleSize: 'text-2xl md:text-3xl lg:text-4xl',
          subtitleSize: 'text-xs md:text-sm',
          descriptionSize: 'text-sm md:text-base line-clamp-2',
          buttonHeight: 'h-9',
          contentSpacing: 'space-y-2 md:space-y-3',
          ctaPadding: 'pt-3',
        }
      } else if (height <= 450) {
        return {
          titleSize: 'text-3xl md:text-4xl lg:text-5xl',
          subtitleSize: 'text-sm md:text-base',
          descriptionSize: 'text-base md:text-lg line-clamp-3',
          buttonHeight: 'h-10',
          contentSpacing: 'space-y-3 md:space-y-4',
          ctaPadding: 'pt-4',
        }
      } else if (height <= 550) {
        return {
          titleSize: 'text-4xl md:text-5xl lg:text-6xl',
          subtitleSize: 'text-base md:text-lg',
          descriptionSize: 'text-lg md:text-xl',
          buttonHeight: 'h-11',
          contentSpacing: 'space-y-4 md:space-y-5',
          ctaPadding: 'pt-5',
        }
      } else {
        return {
          titleSize: 'text-5xl md:text-6xl lg:text-7xl',
          subtitleSize: 'text-lg md:text-xl',
          descriptionSize: 'text-xl md:text-2xl',
          buttonHeight: 'h-12',
          contentSpacing: 'space-y-5 md:space-y-6',
          ctaPadding: 'pt-6',
        }
      }
    }
    
    const styles = getHeightBasedStyles()
    const verticalPadding = Math.max(24, Math.min(height * 0.08, 60))
    
    // 컨텐츠 패딩 (디자인 시스템과 동일)
    const contentPaddingDesktop = 145
    const contentPaddingMobile = 16
    
    // 인디케이터 패딩
    const indicatorPaddingDesktop = options.indicatorPaddingDesktop
    const indicatorPaddingMobile = options.indicatorPaddingMobile
    
    return {
      ...styles,
      verticalPadding,
      contentPaddingDesktop,
      contentPaddingMobile,
      indicatorPaddingDesktop,
      indicatorPaddingMobile
    }
  }, [appliedHeight, options.indicatorPaddingDesktop, options.indicatorPaddingMobile])
  
  // 반응형 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // 네비게이션 버튼 크기 스타일
  const getNavigationSizeStyle = () => {
    const sizes = {
      small: 40,
      medium: 48,
      large: 64,
      custom: options.customButtonSize
    }
    
    const size = sizes[options.navigationSize] || 64
    return {
      width: `${size}px`,
      height: `${size}px`
    }
  }
  
  // 네비게이션 아이콘 크기
  const getNavigationIconSize = () => {
    if (options.navigationSize === 'custom') {
      return options.customIconSize
    }
    
    const sizes = {
      small: 20,
      medium: 24,
      large: 32
    }
    return sizes[options.navigationSize] || 32
  }
  
  
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
    if (!api || !options.autoPlay || isPaused) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, settings.carousel.slideInterval || 5000)

    return () => clearInterval(interval)
  }, [api, options.autoPlay, isPaused, current, settings.carousel.slideInterval])

  // 슬라이드 직접 이동
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  // 마우스 hover 시 일시정지
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // 캐러셀이 비활성화되어 있으면 렌더링하지 않음
  if (!settings.carousel.showCarousel) {
    return null
  }

  return (
    <div className="w-full">
      {/* 캐러셀 본체 */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <div 
          className="relative overflow-hidden"
          style={{ height: `${appliedHeight}px` }}>
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-0">
              {LIBRARY_SLIDES.map((slide) => (
                <CarouselItem key={slide.id} className="pl-0">
                  <div 
                    className={cn(
                      "relative w-full flex items-center select-none",
                      slide.bgColor || "bg-gradient-to-r from-blue-600 to-purple-600"
                    )}
                    style={{ 
                      height: `${appliedHeight}px`,
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  >
                    {/* 컨텐츠 영역 - 디자인 시스템과 동일한 패딩 적용 */}
                    <div className="container mx-auto relative h-full">
                      <div 
                        className="flex items-center h-full relative"
                        style={{
                          paddingTop: dynamicStyles.verticalPadding + 'px',
                          paddingBottom: options.indicatorPosition === 'inside' 
                            ? (dynamicStyles.verticalPadding + INDICATOR_HEIGHT) + 'px'
                            : dynamicStyles.verticalPadding + 'px',
                          paddingLeft: (isMobile ? dynamicStyles.contentPaddingMobile : dynamicStyles.contentPaddingDesktop) + 'px',
                          paddingRight: (isMobile ? dynamicStyles.contentPaddingMobile : dynamicStyles.contentPaddingDesktop) + 'px'
                        }}
                      >
                      <div className={cn("w-full", dynamicStyles.contentSpacing)}>
                        {/* 배지 */}
                        {slide.badge && (
                          <Badge 
                            variant="secondary" 
                            className="bg-white/20 text-white backdrop-blur-sm border-white/30"
                          >
                            {slide.badge}
                          </Badge>
                        )}
                        
                        {/* 제목 */}
                        <h2 className={cn(
                          dynamicStyles.titleSize,
                          "font-bold text-white leading-tight select-none"
                        )}>
                          {slide.title}
                        </h2>
                        
                        {/* 설명 */}
                        {slide.description && (
                          <p className={cn(
                            dynamicStyles.descriptionSize,
                            "text-white/90 leading-relaxed max-w-4xl select-none"
                          )}>
                            {slide.description}
                          </p>
                        )}
                        
                        {/* CTA 버튼들 */}
                        {(slide.link || slide.secondaryLink) && (
                          <div className={cn("flex flex-col sm:flex-row gap-4", dynamicStyles.ctaPadding)}>
                            {slide.link && (
                              <Button
                                variant="secondary"
                                size="lg"
                                className={cn("group min-w-[180px]", dynamicStyles.buttonHeight)}
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
                                className={cn(
                                  "min-w-[180px] bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30",
                                  dynamicStyles.buttonHeight
                                )}
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
            
            {/* 네비게이션 버튼 - 컨테이너 내부에 위치 */}
            {settings.carousel.showArrows && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="container mx-auto relative h-full">
                  <CarouselPrevious 
                    className={cn(
                      "hidden md:flex absolute top-1/2 -translate-y-1/2 transition-all z-20 pointer-events-auto",
                      "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                    )}
                    style={{
                      ...getNavigationSizeStyle(),
                      left: '16px'
                    }}
                    iconSize={getNavigationIconSize()}
                  />
                  <CarouselNext 
                    className={cn(
                      "hidden md:flex absolute top-1/2 -translate-y-1/2 transition-all z-20 pointer-events-auto",
                      "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                    )}
                    style={{
                      ...getNavigationSizeStyle(),
                      right: '16px'
                    }}
                    iconSize={getNavigationIconSize()}
                  />
                </div>
              </div>
            )}
          </Carousel>
          
          {/* 인디케이터 */}
          {settings.carousel.showIndicators && (
            <div className="absolute bottom-4 left-0 right-0 z-30">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-4">
                  {/* 자동재생 버튼 */}
                  {settings.carousel.showPlayPause && (
                    <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPaused(!isPaused)}
                    className="h-8 w-8 bg-black/20 backdrop-blur-sm hover:bg-white/20 text-white"
                    aria-label={isPaused ? '재생' : '일시정지'}
                  >
                    {isPaused ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </Button>
                  )}
                  
                  {/* 인디케이터 dots */}
                  <div className="flex items-center gap-2">
                    {LIBRARY_SLIDES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                          "transition-all duration-300",
                          current === index 
                            ? "w-8 h-2 bg-white" 
                            : "w-2 h-2 bg-white/50 hover:bg-white/70"
                        )}
                        aria-label={`슬라이드 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}