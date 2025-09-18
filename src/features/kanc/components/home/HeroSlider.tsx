import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HeroSliderProps {
  variant: 'intro' | 'service'
}

const introSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&h=600&fit=crop',
    badge: '국가 나노기술 핵심 인프라',
    title: '나노기술의 미래를\n선도하는 BRAND',
    subtitle: '세계 최고 수준의 나노공정 기술과\n첨단 연구 인프라를 제공합니다',
    buttonText: '기술원 소개',
    link: '/about',
    stats: [
      { label: '보유 장비', value: '500+' },
      { label: '전문 인력', value: '200+' },
      { label: '지원 기업', value: '1,000+' }
    ]
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1920&h=600&fit=crop',
    badge: '첨단 나노팹 서비스',
    title: '세계적 수준의\n나노공정 시설',
    subtitle: '300mm 웨이퍼 대응 클린룸과\n최첨단 나노공정 장비를 운영합니다',
    buttonText: '팹서비스 안내',
    link: '/service',
    stats: [
      { label: '클린룸', value: '3,000m²' },
      { label: '공정 능력', value: '7nm' },
      { label: '연간 처리', value: '50,000+' }
    ]
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop',
    badge: '기업 성장 파트너',
    title: '중소기업과 함께하는\n기술 혁신',
    subtitle: '나노기술 기반 R&D 지원으로\n기업의 기술 경쟁력을 높입니다',
    buttonText: '기업지원 안내',
    link: '/support',
    stats: [
      { label: '지원 사업', value: '20+' },
      { label: '기술 이전', value: '150+' },
      { label: '사업화 성공', value: '80%' }
    ]
  }
]

const serviceSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=600&fit=crop',
    badge: '실시간 온라인 예약',
    title: '간편한 장비 예약\n시스템',
    subtitle: '24시간 온라인으로 장비 예약부터\n이용까지 원스톱 서비스를 제공합니다',
    buttonText: '예약하기',
    link: '/reservation',
    stats: [
      { label: '예약 가능 장비', value: '100+' },
      { label: '평균 대기시간', value: '24h' },
      { label: '이용 만족도', value: '98%' }
    ]
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop',
    badge: '전문 교육 프로그램',
    title: '나노기술 전문가\n양성 과정',
    subtitle: '이론부터 실습까지 체계적인\n나노기술 교육 프로그램을 운영합니다',
    buttonText: '교육 신청',
    link: '/education',
    stats: [
      { label: '연간 교육생', value: '2,000+' },
      { label: '교육 과정', value: '30+' },
      { label: '수료율', value: '95%' }
    ]
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1559028012-113943073c0a?w=1920&h=600&fit=crop',
    badge: '시험분석 서비스',
    title: '정밀 분석으로\n품질을 보증합니다',
    subtitle: '국제 공인 시험기관 인증을 통해\n신뢰할 수 있는 분석 결과를 제공합니다',
    buttonText: '분석 신청',
    link: '/analysis',
    stats: [
      { label: '분석 항목', value: '200+' },
      { label: '인증 획득', value: 'ISO/IEC' },
      { label: '정확도', value: '99.9%' }
    ]
  }
]

export function HeroSlider({ variant }: HeroSliderProps) {
  const slides = variant === 'intro' ? introSlides : serviceSlides
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length, isPaused])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // minimum distance for swipe

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next slide
        nextSlide()
      } else {
        // Swiped right - go to previous slide
        prevSlide()
      }
    }

    // Reset values
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className="relative w-full h-[700px] lg:h-[600px] md:h-[500px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image with Parallax Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Content Container */}
          <div className="relative container mx-auto px-4 h-full">
            <div className="h-full flex items-center">
              <div className="max-w-3xl space-y-6">
                {/* Badge */}
                <Badge
                  variant="secondary"
                  className={`px-4 py-1.5 bg-white/10 backdrop-blur-sm border-white/20 text-white transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                  }`}
                >
                  <span className="text-xs font-medium tracking-wide">{slide.badge}</span>
                </Badge>

                {/* Title */}
                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line transition-all duration-700 delay-100 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p
                  className={`text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl whitespace-pre-line transition-all duration-700 delay-200 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-300 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#002D83] hover:bg-gray-100 min-w-[160px] h-12 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    {slide.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm min-w-[160px] h-12"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    소개 영상 보기
                  </Button>
                </div>

                {/* Stats */}
                <div
                  className={`flex flex-wrap gap-8 pt-8 transition-all duration-700 delay-400 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {slide.stats?.map((stat, statIndex) => (
                    <div key={statIndex} className="text-white">
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1 transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 bg-white'
                  : 'w-8 bg-white/40 hover:bg-white/60'
              }`}
            />
            {index === currentSlide && (
              <div className="absolute inset-0 w-12 h-1 bg-white rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}