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
    badge: '대한민국 반도체 산업의 핵심 인프라',
    title: '나노·반도체 기술의\n미래를 열어갑니다',
    subtitle: '세계 최고 수준의 나노공정 시설과\n시스템반도체 OSAT 기술을 지원합니다',
    buttonText: '기술원 소개',
    link: '/about',
    stats: [
      { label: '첨단 장비', value: '500+' },
      { label: '전문 연구인력', value: '200+' },
      { label: '누적 지원기업', value: '5,000+' }
    ]
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1920&h=600&fit=crop',
    badge: '경기도 공공팹 오픈 이노베이션',
    title: '300mm 웨이퍼 팹\n완전 개방형 서비스',
    subtitle: '팹리스·중소기업을 위한 MPW 서비스와\nGaN 전력반도체 시제품 개발을 지원합니다',
    buttonText: '오픈팹 서비스',
    link: '/service',
    stats: [
      { label: '클린룸', value: 'Class 100' },
      { label: '공정 역량', value: '28nm~7nm' },
      { label: '연간 웨이퍼', value: '100,000+' }
    ]
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop',
    badge: '차세대 패키징 기술 선도',
    title: '첨단패키징으로\n반도체 혁신 주도',
    subtitle: '시스템반도체 OSAT 분야 기술개발과\n전문인력 양성으로 K-반도체 경쟁력을 강화합니다',
    buttonText: '기업지원 안내',
    link: '/support',
    stats: [
      { label: '지원 프로그램', value: '30+' },
      { label: '기술이전 성과', value: '200+' },
      { label: '교육 수료생', value: '2,000+/년' }
    ]
  }
]

const serviceSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=600&fit=crop',
    badge: '24시간 오픈팹 예약 시스템',
    title: '실시간 장비 예약\nMOAFAB 서비스',
    subtitle: 'E-Beam Lithography, PECVD 등 첨단 장비를\n온라인으로 간편하게 예약하고 이용하세요',
    buttonText: '장비 예약하기',
    link: '/reservation',
    stats: [
      { label: '오픈팹 장비', value: '150+' },
      { label: '월평균 이용', value: '3,000+건' },
      { label: '이용 만족도', value: '98%' }
    ]
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop',
    badge: '반도체·나노 전문인력 양성',
    title: '직업계고부터 전문가까지\n맞춤형 기술교육',
    subtitle: '양자기술, E-beam Lithography, 첨단패키징 등\n실무 중심의 전문 교육과정을 운영합니다',
    buttonText: '교육 프로그램',
    link: '/education',
    stats: [
      { label: '연간 교육생', value: '2,500+' },
      { label: '무료 교육과정', value: '40+' },
      { label: '취업 연계율', value: '85%' }
    ]
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1559028012-113943073c0a?w=1920&h=600&fit=crop',
    badge: 'ISO/IEC 17025 인증 시험기관',
    title: '원자력현미경부터\nCu Etching까지',
    subtitle: '최첨단 분석장비와 전문 연구진이\n정확한 시험분석 서비스를 제공합니다',
    buttonText: '시험분석 의뢰',
    link: '/analysis',
    stats: [
      { label: '분석 항목', value: '250+' },
      { label: '공인인증', value: 'KOLAS' },
      { label: '처리시간', value: '3일 이내' }
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