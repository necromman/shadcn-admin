import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, ExternalLink } from 'lucide-react'
import { SectionWrapper } from '../common/SectionWrapper'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

const partners = [
  {
    id: '1',
    title: '경기도',
    subtitle: '세계속의 경기도',
    link: 'https://www.gg.go.kr/',
    logo: 'https://www.kanc.re.kr/file_room/image/93/1593_201705111629311970.jpg'
  },
  {
    id: '2',
    title: 'KIST',
    subtitle: '한국과학기술연구원',
    link: 'https://www.kist.re.kr/',
    logo: 'https://www.kanc.re.kr/file_room/image/94/1594_201705111629451770.png'
  },
  {
    id: '3',
    title: 'KETI',
    subtitle: '전자부품연구원',
    link: 'https://www.keti.re.kr/',
    logo: 'https://www.kanc.re.kr/file_room/image/95/1595_201705111629572160.png'
  },
  {
    id: '4',
    title: '과학기술정보통신부',
    subtitle: 'MSIT',
    link: 'https://www.msit.go.kr/',
    logo: 'https://www.kanc.re.kr/file_room/image/96/1596_201705111630093070.png'
  },
  {
    id: '5',
    title: '한국연구재단',
    subtitle: 'NRF',
    link: 'https://www.nrf.re.kr/',
    logo: 'https://www.nrf.re.kr/resources/img/common/header/logo.svg'
  },
  {
    id: '6',
    title: 'KEIT',
    subtitle: '한국산업기술평가관리원',
    link: 'https://www.keit.re.kr/',
    logo: 'https://www.keit.re.kr/main/images/korean/layout/logo.png'
  },
  {
    id: '7',
    title: '중소벤처기업부',
    subtitle: 'MSS',
    link: 'https://www.mss.go.kr/',
    logo: 'https://www.mss.go.kr/images/pattern/layout/head_logo.svg'
  },
  {
    id: '8',
    title: '나노기술연구협의회',
    subtitle: 'Nano Tech Council',
    link: '#',
    logo: 'https://www.kontrs.or.kr/img/common/logo2.png'
  }
]

export function BannerSlider() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(5)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setItemsPerView(2)
      else if (width < 768) setItemsPerView(3)
      else if (width < 1024) setItemsPerView(4)
      else setItemsPerView(5)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1
          if (nextIndex > partners.length - itemsPerView) {
            return 0
          }
          return nextIndex
        })
      }, 4000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, itemsPerView])

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, partners.length - itemsPerView)
      }
      return prev - 1
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= partners.length - itemsPerView) {
        return 0
      }
      return prev + 1
    })
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <SectionWrapper background="gray">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t('kanc:sections.partners.title')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('kanc:sections.partners.subtitle')}
            </p>
          </div> */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className={cn(
                "p-2.5 rounded-lg transition-all duration-200",
                "bg-card border shadow-sm",
                "hover:shadow-md hover:scale-105",
                isPlaying
                  ? "hover:bg-accent"
                  : "border-primary/30 bg-primary/10"
              )}
              aria-label={isPlaying ? "일시정지" : "재생"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            {/* Navigation Buttons */}
            <div className="flex gap-1">
              <button
                onClick={prevSlide}
                className="p-2.5 bg-card border rounded-lg hover:bg-accent transition-all hover:shadow-md hover:scale-105 shadow-sm"
                aria-label="이전"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 bg-card border rounded-lg hover:bg-accent transition-all hover:shadow-md hover:scale-105 shadow-sm"
                aria-label="다음"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden rounded-xl bg-card p-4 shadow-sm border">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-2 group"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className={cn(
                  "relative rounded-lg h-24 p-3",
                  "bg-background",
                  "border",
                  "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
                  "transition-all duration-200 cursor-pointer",
                  "flex flex-col items-center justify-center"
                )}>
                  {/* External Link Icon */}
                  <ExternalLink className="absolute top-2 right-2 w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Logo */}
                  <div className="w-full h-12 mb-1 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.title}
                      className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        // 이미지 로드 실패 시 텍스트로 대체
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />
                    <div className="hidden items-center justify-center text-xs font-medium text-muted-foreground">
                      {partner.title}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center">
                    <p className="text-[10px] font-medium text-foreground/80 leading-tight line-clamp-1">
                      {partner.title}
                    </p>
                    {partner.subtitle && (
                      <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-1">
                        {partner.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {/* Dots */}
          <div className="flex gap-1.5">
            {[...Array(Math.max(1, Math.ceil((partners.length - itemsPerView + 1) / 1)))].map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(Math.min(idx, partners.length - itemsPerView))
                  setIsPlaying(false)
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  currentIndex === idx
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-muted hover:bg-muted-foreground/50"
                )}
                aria-label={`그룹 ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="ml-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {Math.min(currentIndex + itemsPerView, partners.length)}
            </span>
            <span> / {partners.length}</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}