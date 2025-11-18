import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { banners } from '../../data/mockData'
import { LMS_STYLES } from '../../constants/styles'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
    setIsAutoPlay(false)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 pt-0 pb-6">
      <div className="container mx-auto px-4">
        {/* relative 컨테이너로 감싸서 absolute 요소들이 올바르게 위치하도록 함 */}
        <div className="relative">
          {/* 슬라이드 컨테이너 - 공통 border-radius 적용 */}
          <div className={cn("relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden shadow-lg", LMS_STYLES.imageRadius)}>
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  index === currentSlide ? "opacity-100" : "opacity-0"
                )}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
                <div className={cn(
                  "absolute inset-0",
                  banner.backgroundColor
                )} />

                <div className="relative h-full flex items-center px-8 md:px-12 lg:px-16">
                  <div className="max-w-2xl">
                    <h2 className={cn(
                      "text-2xl md:text-3xl lg:text-4xl font-bold mb-2",
                      banner.textColor
                    )}>
                      {banner.title}
                    </h2>
                    <h3 className={cn(
                      "text-lg md:text-xl lg:text-2xl font-medium mb-4",
                      banner.textColor,
                      "opacity-90"
                    )}>
                      {banner.subtitle}
                    </h3>
                    <p className={cn(
                      "text-sm md:text-base mb-6",
                      banner.textColor,
                      "opacity-80"
                    )}>
                      {banner.description}
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      자세히 보기
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* 네비게이션 컨트롤 - 캐러셀 내부에 위치 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="px-8 md:px-12 lg:px-16 py-4">
                <div className="flex items-center justify-between">
                  {/* 왼쪽: 인디케이터 + 컨트롤 버튼 */}
                  <div className="flex items-center gap-4">
                    {/* 인디케이터 */}
                    <div className="flex items-center gap-2">
                      {banners.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={cn(
                            "h-2 rounded-full transition-all",
                            index === currentSlide
                              ? "w-8 bg-white"
                              : "w-2 bg-white/50 hover:bg-white/70"
                          )}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* 컨트롤 버튼 */}
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={goToPrevious}
                        className="text-white hover:bg-white/20 h-8 w-8"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={toggleAutoPlay}
                        className="text-white hover:bg-white/20 h-8 w-8"
                      >
                        {isAutoPlay ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={goToNext}
                        className="text-white hover:bg-white/20 h-8 w-8"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 오른쪽: 썸네일 네비게이션 (데스크톱) */}
                  <div className="hidden lg:flex gap-1">
                    {banners.map((banner, index) => (
                      <button
                        key={banner.id}
                        onClick={() => goToSlide(index)}
                        className={cn(
                          "relative w-16 h-12 overflow-hidden transition-all border-2",
                          LMS_STYLES.imageRadius,
                          index === currentSlide
                            ? "border-white opacity-100"
                            : "border-white/30 opacity-60 hover:opacity-80"
                        )}
                      >
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}