import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, ArrowRight, ChevronLeft, ChevronRight, Users, Wrench } from 'lucide-react'
import { mockInstitutions } from '../../data/institutions.mock'
import { cn } from '@/lib/utils'

export function InstitutionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        handleNext()
      }, 5000) // Auto-scroll every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentIndex, isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      return newIndex < 0 ? mockInstitutions.length - 1 : newIndex
    })
    scrollToIndex(currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % mockInstitutions.length
      return newIndex
    })
    scrollToIndex(currentIndex + 1)
  }

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('.institution-card')?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollPosition = (cardWidth + gap) * index
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('.institution-card')?.clientWidth || 0
      const gap = 24
      const scrollLeft = scrollRef.current.scrollLeft
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      setCurrentIndex(newIndex)
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              협의체 참여 기관
            </h2>
            <p className="mt-2 text-muted-foreground">
              총 {mockInstitutions.length}개 전문 기관이 참여하고 있습니다
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center gap-2 mr-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Link to="/moafab/institutions#top">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                전체 기관 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {mockInstitutions.map((institution) => (
              <Link
                key={institution.id}
                to={`/moafab/institution/${institution.slug}#top` as any}
                className="institution-card flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group"
              >
                <Card variant="default" className="h-full transition-all duration-300 hover:shadow-xl group-hover:border-primary/30 border-2 overflow-hidden">
                  <CardHeader 
                    variant="default"
                    className="pb-3 relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${institution.theme.primaryColor}08 0%, transparent 100%)` 
                    }}
                  >
                    {/* Icon and Title */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2.5 rounded-xl shadow-sm"
                          style={{ 
                            backgroundColor: `${institution.theme.primaryColor}15`,
                            border: `1px solid ${institution.theme.primaryColor}30`
                          }}
                        >
                          <Building2 
                            className="h-5 w-5"
                            style={{ color: institution.theme.primaryColor }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">
                            {institution.name}
                          </h3>
                          {institution.isNew && (
                            <Badge 
                              variant="default" 
                              className="mt-1 text-[10px] px-1.5 py-0 h-4"
                              style={{ 
                                backgroundColor: institution.theme.primaryColor,
                                color: 'white'
                              }}
                            >
                              NEW
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent variant="default" className="pt-3 space-y-3">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {institution.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5">
                      {institution.specialties.slice(0, 2).map((specialty, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-[11px] px-2 py-0.5 font-medium"
                          style={{ 
                            backgroundColor: `${institution.theme.primaryColor}10`,
                            color: institution.theme.primaryColor,
                            border: `1px solid ${institution.theme.primaryColor}20`
                          }}
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {institution.specialties.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-[11px] px-2 py-0.5"
                        >
                          +{institution.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className="pt-3 border-t flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Wrench className="h-3.5 w-3.5" />
                          <span className="font-medium">{institution.equipment.length}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span className="font-medium">{institution.services.length}</span>
                        </div>
                      </div>
                      <ArrowRight 
                        className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-1 mt-6">
            {Array.from({ length: Math.ceil(mockInstitutions.length / 4) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(idx * 4)
                  scrollToIndex(idx * 4)
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  Math.floor(currentIndex / 4) === idx 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden">
          <Link to="/moafab/institutions#top">
            <Button variant="outline" className="w-full">
              전체 기관 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}