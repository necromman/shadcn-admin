'use client'

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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { HiArrowRight, HiPlay, HiPause, HiCog6Tooth } from 'react-icons/hi2'

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

interface CarouselOptions {
  height: number
  indicatorStyle: 'circle' | 'square'
  indicatorPosition: 'inside' | 'outside'
  autoPlay: boolean
  navigationSize: 'small' | 'medium' | 'large' | 'custom'
  customButtonSize: number
  customIconSize: number
  navigationPosition: 'safe' | 'edge' | 'custom'
  // 버튼 위치 조절 옵션
  buttonBasePercent: number   // 기준점 퍼센트 (50% = 중앙)
  buttonLeftPosition: number  // 좌측 버튼 위치 (px)
  buttonRightPosition: number // 우측 버튼 위치 (px)
  // 인디케이터 패딩 조절 옵션
  indicatorPaddingDesktop: number // 데스크톱 인디케이터 좌우 패딩
  indicatorPaddingMobile: number  // 모바일 인디케이터 좌우 패딩
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
  const [isPaused, setIsPaused] = useState(false)
  const [options, setOptions] = useState<CarouselOptions>({
    height: 400,
    indicatorStyle: 'square',
    indicatorPosition: 'inside',
    autoPlay: true,
    navigationSize: 'medium',  // 중간 크기를 기본값으로
    customButtonSize: 48,
    customIconSize: 24,
    navigationPosition: 'custom',  // 커스텀으로 변경
    // 버튼 위치 기본값
    buttonBasePercent: 42,  // 기준점 42%로 변경
    buttonLeftPosition: 90,  // 컨테이너 안쪽 90px
    buttonRightPosition: 90, // 컨테이너 안쪽 90px
    // 인디케이터 패딩 기본값
    indicatorPaddingDesktop: 175,  // 175px로 변경 (메인과 동일)
    indicatorPaddingMobile: 45  // 45px로 변경 (메인과 동일)
  })
  
  // PC 최소/최대 높이 제약
  const MIN_HEIGHT_PC = 300
  const MAX_HEIGHT = 800
  const INDICATOR_HEIGHT = 50
  
  // 실제 적용 높이 계산
  const appliedHeight = Math.max(MIN_HEIGHT_PC, Math.min(options.height, MAX_HEIGHT))
  
  // 컨텐츠 영역 높이는 항상 전체 높이와 같음 (인디케이터는 컨텐츠 내부에 포함)
  
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
  
  // 네비게이션 버튼 위치 계산
  const getNavigationPosition = () => {
    if (options.navigationPosition === 'edge') {
      return {
        left: '16px',
        right: '16px'
      }
    }
    
    if (options.navigationPosition === 'custom') {
      // 커스텀 위치: 컨테이너 안쪽 기준으로 계산
      return {
        left: `${options.buttonLeftPosition}px`,
        right: `${options.buttonRightPosition}px`
      }
    }
    
    // safe 모드: 컨테이너 안쪽 80px
    return {
      left: '80px',
      right: '80px'
    }
  }
  
  // 반응형 감지를 위한 상태
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
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
    
    // 버튼 크기 계산
    const getButtonSize = () => {
      const sizes = {
        small: 40,
        medium: 48,
        large: 64,
        custom: options.customButtonSize
      }
      return sizes[options.navigationSize] || 64
    }
    
    const styles = getHeightBasedStyles()
    const buttonSize = getButtonSize()
    
    // 컨텐츠 패딩은 고정값 사용 (145px)
    const contentPaddingDesktop = 145
    const contentPaddingMobile = 16
    
    // 인디케이터 패딩 값
    const indicatorPaddingDesktop = options.indicatorPaddingDesktop
    const indicatorPaddingMobile = options.indicatorPaddingMobile
    
    // 컨텐츠 패딩 계산
    const contentPadding = {
      horizontal: contentPaddingDesktop,
      mobileHorizontal: contentPaddingMobile,
      vertical: Math.max(24, Math.min(height * 0.08, 60))
    }
    
    return {
      ...styles,
      buttonSize,
      contentPadding,
      verticalPadding: contentPadding.vertical,
      // 컨텐츠 패딩
      contentPaddingDesktop,
      contentPaddingMobile,
      // 인디케이터 패딩
      indicatorPaddingDesktop,
      indicatorPaddingMobile,
      // 하위 호환성
      horizontalPadding: contentPaddingDesktop,
      mobileHorizontalPadding: contentPaddingMobile
    }
  }, [appliedHeight, options.navigationSize, options.customButtonSize, options.navigationPosition, 
      options.indicatorPaddingDesktop, options.indicatorPaddingMobile])
  
  // 인디케이터 스타일 클래스
  const getIndicatorClass = (isActive: boolean) => {
    const baseClass = 'transition-all duration-300'
    
    const sizeClass = options.indicatorStyle === 'square' 
      ? (isActive ? 'w-8 h-2' : 'w-4 h-2')
      : (isActive ? 'w-8 h-2' : 'w-2 h-2')
    
    const shapeClass = options.indicatorStyle === 'square' 
      ? 'rounded-[2px]'
      : 'rounded-full'
    
    if (options.indicatorPosition === 'inside') {
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
    }, 5000)

    return () => clearInterval(interval)
  }, [api, options.autoPlay, isPaused, current])

  // 슬라이드 직접 이동
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  // 마우스 hover 시 일시정지
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div className="w-full">
      {/* 콘텐츠 표시 옵션 패널 */}
      <div className="container mb-6">
        <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiCog6Tooth className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
            <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">캐러셀 표시 옵션</span>
          </div>
          
          <div className="space-y-4">
            {/* 높이 조절 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Label className="text-sm text-slate-600 dark:text-slate-400 sm:min-w-[80px]">캐러셀 높이:</Label>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={MIN_HEIGHT_PC}
                    max={MAX_HEIGHT}
                    step="50"
                    value={options.height}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 400
                      setOptions(prev => ({ ...prev, height: value }))
                    }}
                    className="w-24 h-8"
                  />
                  <span className="text-sm text-slate-500">px</span>
                  {options.height < MIN_HEIGHT_PC && (
                    <span className="text-xs text-amber-600">최소 {MIN_HEIGHT_PC}px</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={options.height === 300 ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, height: 300 }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    작게
                  </Button>
                  <Button
                    size="sm"
                    variant={options.height === 400 ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, height: 400 }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    기본
                  </Button>
                  <Button
                    size="sm"
                    variant={options.height === 600 ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, height: 600 }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    크게
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 인디케이터 설정 */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              {/* 인디케이터 스타일 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">스타일:</span>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    size="sm"
                    variant={options.indicatorStyle === 'circle' ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, indicatorStyle: 'circle' }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-current mr-1.5"></span>
                    원형
                  </Button>
                  <Button
                    size="sm"
                    variant={options.indicatorStyle === 'square' ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, indicatorStyle: 'square' }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    <span className="inline-block w-2 h-2 rounded-[1px] bg-current mr-1.5"></span>
                    사각형
                  </Button>
                </div>
              </div>
              
              {/* 인디케이터 위치 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">위치:</span>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    size="sm"
                    variant={options.indicatorPosition === 'outside' ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, indicatorPosition: 'outside' }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    외부
                  </Button>
                  <Button
                    size="sm"
                    variant={options.indicatorPosition === 'inside' ? 'default' : 'outline'}
                    onClick={() => setOptions(prev => ({ ...prev, indicatorPosition: 'inside' }))}
                    className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    내부
                  </Button>
                </div>
              </div>
              
              {/* 자동 재생 */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoplay" 
                  checked={options.autoPlay}
                  onCheckedChange={(checked) => setOptions(prev => ({ ...prev, autoPlay: checked as boolean }))}
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="autoplay" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  자동 재생
                </Label>
              </div>
            </div>
            
            {/* 네비게이션 버튼 크기 */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Label className="text-sm text-slate-600 dark:text-slate-400 sm:min-w-[80px]">버튼 크기:</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={options.navigationSize === 'small' ? 'default' : 'outline'}
                      onClick={() => setOptions(prev => ({ ...prev, navigationSize: 'small' }))}
                      className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      작게
                    </Button>
                    <Button
                      size="sm"
                      variant={options.navigationSize === 'medium' ? 'default' : 'outline'}
                      onClick={() => setOptions(prev => ({ ...prev, navigationSize: 'medium' }))}
                      className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      보통
                    </Button>
                    <Button
                      size="sm"
                      variant={options.navigationSize === 'large' ? 'default' : 'outline'}
                      onClick={() => setOptions(prev => ({ ...prev, navigationSize: 'large' }))}
                      className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      크게
                    </Button>
                    <Button
                      size="sm"
                      variant={options.navigationSize === 'custom' ? 'default' : 'outline'}
                      onClick={() => setOptions(prev => ({ ...prev, navigationSize: 'custom' }))}
                      className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      커스텀
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* 커스텀 크기 입력 */}
              {options.navigationSize === 'custom' && (
                <div className="flex flex-col sm:flex-row gap-3 pl-0 sm:pl-[88px]">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-slate-500 whitespace-nowrap">버튼:</Label>
                    <Input
                      type="number"
                      min="30"
                      max="100"
                      value={options.customButtonSize}
                      onChange={(e) => setOptions(prev => ({ ...prev, customButtonSize: parseInt(e.target.value) || 48 }))}
                      className="w-20 h-8"
                    />
                    <span className="text-xs text-slate-500">px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-slate-500 whitespace-nowrap">아이콘:</Label>
                    <Input
                      type="number"
                      min="16"
                      max="64"
                      value={options.customIconSize}
                      onChange={(e) => setOptions(prev => ({ ...prev, customIconSize: parseInt(e.target.value) || 24 }))}
                      className="w-20 h-8"
                    />
                    <span className="text-xs text-slate-500">px</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* 네비게이션 버튼 위치 */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">버튼 위치:</span>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  size="sm"
                  variant={options.navigationPosition === 'safe' ? 'default' : 'outline'}
                  onClick={() => setOptions(prev => ({ ...prev, navigationPosition: 'safe' }))}
                  className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  컨텐츠 내부
                </Button>
                <Button
                  size="sm"
                  variant={options.navigationPosition === 'edge' ? 'default' : 'outline'}
                  onClick={() => setOptions(prev => ({ ...prev, navigationPosition: 'edge' }))}
                  className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  캐러셀 가장자리
                </Button>
                <Button
                  size="sm"
                  variant={options.navigationPosition === 'custom' ? 'default' : 'outline'}
                  onClick={() => setOptions(prev => ({ ...prev, navigationPosition: 'custom' }))}
                  className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  커스텀
                </Button>
              </div>
              <span className="text-xs text-slate-500 ml-2">(데스크톱만 적용)</span>
            </div>
            
            {/* 위치 조절 섹션 */}
            <div className="space-y-3 border-t border-slate-200 dark:border-border/50 pt-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">위치 조절</span>
              </div>
              
              {/* 좌우 네비게이션 버튼 위치 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">좌우 네비게이션 버튼 위치</span>
                  {options.navigationPosition !== 'custom' && (
                    <span className="text-xs text-amber-600 dark:text-amber-500">(커스텀 모드에서만 적용됨)</span>
                  )}
                </div>
                
                {/* 기준점 퍼센트 조절 */}
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600 dark:text-slate-400">기준점 (화면 너비 기준)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="30"
                      max="70"
                      value={options.buttonBasePercent}
                      onChange={(e) => setOptions(prev => ({ ...prev, buttonBasePercent: parseInt(e.target.value) || 50 }))}
                      className="w-20 h-8"
                      disabled={options.navigationPosition !== 'custom'}
                    />
                    <span className="text-xs text-slate-500">%</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setOptions(prev => ({ ...prev, buttonBasePercent: 43 }))}
                      className="h-8 px-2 text-xs"
                      disabled={options.navigationPosition !== 'custom'}
                    >
                      기본(43%)
                    </Button>
                    <span className="text-xs text-slate-500">
                      {options.buttonBasePercent < 50 ? '← 좌측으로 이동' : 
                       options.buttonBasePercent > 50 ? '우측으로 이동 →' : '중앙'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-600 dark:text-slate-400">좌측 버튼</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="20"
                          max="200"
                          value={options.buttonLeftPosition}
                          onChange={(e) => setOptions(prev => ({ ...prev, buttonLeftPosition: parseInt(e.target.value) || 80 }))}
                          className="w-20 h-8"
                          disabled={options.navigationPosition !== 'custom'}
                        />
                        <span className="text-xs text-slate-500">px</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOptions(prev => ({ ...prev, buttonLeftPosition: 80 }))}
                          className="h-8 px-2 text-xs"
                          disabled={options.navigationPosition !== 'custom'}
                        >
                          기본값
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-600 dark:text-slate-400">우측 버튼</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="20"
                          max="200"
                          value={options.buttonRightPosition}
                          onChange={(e) => setOptions(prev => ({ ...prev, buttonRightPosition: parseInt(e.target.value) || 80 }))}
                          className="w-20 h-8"
                          disabled={options.navigationPosition !== 'custom'}
                        />
                        <span className="text-xs text-slate-500">px</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOptions(prev => ({ ...prev, buttonRightPosition: 80 }))}
                          className="h-8 px-2 text-xs"
                          disabled={options.navigationPosition !== 'custom'}
                        >
                          기본값
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setOptions(prev => ({ 
                        ...prev, 
                        buttonLeftPosition: prev.buttonRightPosition
                      }))}
                      className="h-8 px-3 text-xs"
                      disabled={options.navigationPosition !== 'custom'}
                    >
                      좌측을 우측과 동기화
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setOptions(prev => ({ 
                        ...prev, 
                        buttonRightPosition: prev.buttonLeftPosition
                      }))}
                      className="h-8 px-3 text-xs"
                      disabled={options.navigationPosition !== 'custom'}
                    >
                      우측을 좌측과 동기화
                    </Button>
                  </div>
                </div>
              
              {/* 인디케이터 패딩 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">인디케이터 좌우 패딩</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600 dark:text-slate-400">데스크톱</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="50"
                        max="250"
                        value={options.indicatorPaddingDesktop}
                        onChange={(e) => setOptions(prev => ({ ...prev, indicatorPaddingDesktop: parseInt(e.target.value) || 145 }))}
                        className="w-20 h-8"
                      />
                      <span className="text-xs text-slate-500">px</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOptions(prev => ({ ...prev, indicatorPaddingDesktop: 175 }))}
                        className="h-8 px-2 text-xs"
                      >
                        기본값
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600 dark:text-slate-400">모바일</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="8"
                        max="50"
                        value={options.indicatorPaddingMobile}
                        onChange={(e) => setOptions(prev => ({ ...prev, indicatorPaddingMobile: parseInt(e.target.value) || 16 }))}
                        className="w-20 h-8"
                      />
                      <span className="text-xs text-slate-500">px</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOptions(prev => ({ ...prev, indicatorPaddingMobile: 16 }))}
                        className="h-8 px-2 text-xs"
                      >
                        기본값
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
            캐러셀의 표시 방식을 사용자화할 수 있습니다
          </p>
        </div>
      </div>
      
      {/* 캐러셀 본체 */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative",
          options.indicatorPosition === 'outside' && "mb-4"
        )}
      >
        <div 
          className="relative overflow-hidden bg-[#151515]"
          style={{ height: `${appliedHeight}px` }}
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
              {SAMPLE_SLIDES.map((slide) => (
                <CarouselItem key={slide.id} className="pl-0">
                  <div 
                    className={cn(
                      "relative w-full h-full select-none",
                      slide.bgColor || "bg-[#151515]"
                    )}
                    style={{ 
                      height: `${appliedHeight}px`,
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
                          paddingTop: dynamicStyles.verticalPadding + 'px',
                          paddingBottom: options.indicatorPosition === 'inside' 
                            ? (dynamicStyles.verticalPadding + INDICATOR_HEIGHT) + 'px'  // 인디케이터 공간만 확보
                            : dynamicStyles.verticalPadding + 'px',
                          paddingLeft: (isMobile ? dynamicStyles.contentPaddingMobile : dynamicStyles.contentPaddingDesktop) + 'px',
                          paddingRight: (isMobile ? dynamicStyles.contentPaddingMobile : dynamicStyles.contentPaddingDesktop) + 'px'
                        }}
                      >
                        <div className={cn("w-full", dynamicStyles.contentSpacing)}>
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
                              <p className={cn(
                                dynamicStyles.subtitleSize,
                                "uppercase tracking-[0.2em] text-slate-400 dark:text-primary/70 font-semibold"
                              )}>
                                {slide.subtitle}
                              </p>
                              <div className="h-0.5 w-16 bg-slate-400 dark:bg-primary/50" />
                            </div>
                          )}
                          
                          {/* 제목 */}
                          <h2 className={cn(
                            dynamicStyles.titleSize,
                            "font-bold text-white leading-tight"
                          )}>
                            {slide.title}
                          </h2>
                          
                          {/* 설명 */}
                          {slide.description && (
                            <p className={cn(
                              dynamicStyles.descriptionSize,
                              "text-slate-300 leading-relaxed max-w-4xl"
                            )}>
                              {slide.description}
                            </p>
                          )}
                          
                          {/* CTA 버튼들 */}
                          {(slide.cta || slide.secondaryCta) && (
                            <div className={cn("flex flex-col sm:flex-row gap-4", dynamicStyles.ctaPadding)}>
                              {slide.cta && (
                                <Button
                                  variant={slide.cta.variant || 'default'}
                                  className={cn(
                                    "group min-w-[180px] text-base pointer-events-auto",
                                    dynamicStyles.buttonHeight
                                  )}
                                  onClick={() => window.location.href = slide.cta?.link || '#'}
                                >
                                  {slide.cta.text}
                                  <HiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                              )}
                              {slide.secondaryCta && (
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "min-w-[180px] text-base bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 pointer-events-auto",
                                    dynamicStyles.buttonHeight
                                  )}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* 네비게이션 버튼 - 컨테이너 내부에 위치 */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="container mx-auto relative h-full">
                <CarouselPrevious 
                  className={cn(
                    "hidden md:flex absolute top-1/2 -translate-y-1/2 transition-all z-20 pointer-events-auto",
                    "dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/30",
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
                    "dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/30",
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
          </Carousel>
          
          {/* 고정된 인디케이터 - 내부 옵션일 때 */}
          {options.indicatorPosition === 'inside' && (
            <div 
              className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
              style={{ 
                height: `${INDICATOR_HEIGHT}px`,
              }}
            >
              <div className="container mx-auto h-full relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 flex items-center pointer-events-auto"
                  style={{ 
                    height: `${INDICATOR_HEIGHT}px`,
                    paddingBottom: '10px',
                    paddingLeft: (isMobile ? dynamicStyles.indicatorPaddingMobile : dynamicStyles.indicatorPaddingDesktop) + 'px',
                    paddingRight: (isMobile ? dynamicStyles.indicatorPaddingMobile : dynamicStyles.indicatorPaddingDesktop) + 'px'
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* 자동재생 버튼 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOptions(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
                      className="h-8 w-8 bg-black/20 backdrop-blur-sm hover:bg-white/20 hover:text-white text-white border border-white/20"
                      aria-label={options.autoPlay ? '일시정지' : '재생'}
                    >
                      {options.autoPlay ? (
                        <HiPause className="h-4 w-4 text-white" />
                      ) : (
                        <HiPlay className="h-4 w-4 text-white" />
                      )}
                    </Button>
                    
                    {/* 인디케이터 (dots) */}
                    <div className="flex items-center gap-2">
                      {SAMPLE_SLIDES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => scrollTo(index)}
                          className={getIndicatorClass(current === index)}
                          aria-label={`Go to slide ${index + 1}`}
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
      
      {/* 인디케이터와 자동재생 컨트롤 - 외부 배치 (좌측 정렬) */}
      {options.indicatorPosition === 'outside' && (
        <div className="container mx-auto mt-4">
          <div className="flex items-center justify-start px-4 gap-4">
            {/* 자동재생 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOptions(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
              className="h-8 w-8 hover:bg-accent hover:text-accent-foreground"
              aria-label={options.autoPlay ? '일시정지' : '재생'}
            >
              {options.autoPlay ? (
                <HiPause className="h-4 w-4" />
              ) : (
                <HiPlay className="h-4 w-4" />
              )}
            </Button>
            
            {/* 인디케이터 (dots) */}
            <div className="flex items-center gap-2">
              {SAMPLE_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={getIndicatorClass(current === index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}