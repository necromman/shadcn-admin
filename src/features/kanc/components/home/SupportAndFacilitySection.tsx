import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import {
  Phone,
  MessageCircle,
  Mail,
  Building2,
  Users,
  ArrowRight,
  Clock,
  CheckCircle,
  MapPin,
  GraduationCap,
  Sparkles,
  Search,
  Headphones,
  FileText,
  HelpCircle,
  Beaker,
  Calendar,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'
import { useState } from 'react'

interface SupportAndFacilitySectionProps {
  variant?: 'intro' | 'service'
}

export function SupportAndFacilitySection({ variant = 'intro' }: SupportAndFacilitySectionProps = {}) {
  const { t } = useTranslation()

  // 서비스 카드 데이터
  const serviceCards = [
    {
      id: 1,
      icon: Beaker,
      title: '팹 서비스',
      description: '나노공정 팹 시설 이용 및 공정 서비스를 제공합니다.',
      link: '/service/fab',
      linkText: '팹 서비스 안내',
      bgImage: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      icon: Users,
      title: '팹 출입/투어',
      description: '팹 시설 출입 신청 및 견학 프로그램 안내입니다.',
      link: '/fab/access',
      linkText: '신청하기',
      bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      icon: Building2,
      title: '대관',
      description: '회의실, 세미나실 등 시설 대관 서비스입니다.',
      link: '/facility/rental',
      linkText: '대관 신청하기',
      bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      icon: GraduationCap,
      title: '교육',
      description: '나노기술 전문 교육 과정 및 프로그램 안내입니다.',
      link: '/education',
      linkText: '교육 프로그램 보기',
      bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop'
    }
  ]

  // 빠른 지원 채널
  const quickSupport = [
    {
      icon: Phone,
      title: '전화 문의',
      value: '042-366-1700',
      description: '평일 09:00-18:00',
      color: 'from-blue-500/10 to-blue-600/10',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: MessageCircle,
      title: '실시간 채팅',
      value: '바로 상담',
      description: '평균 응답 5분 이내',
      color: 'from-green-500/10 to-green-600/10',
      iconColor: 'text-green-600 dark:text-green-400',
      action: true
    },
    {
      icon: Mail,
      title: '이메일 문의',
      value: 'help@kanc.re.kr',
      description: '24시간 접수 가능',
      color: 'from-purple-500/10 to-purple-600/10',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ]

  return (
    <SectionWrapper>
      <div className="mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            고객 지원 서비스
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            한국나노기술원의 다양한 서비스와 지원 프로그램에 대해 안내해드립니다
          </p>
        </div>


        {/* 원스톱 핫라인 및 고객 서비스 */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          {/* 원스톱 핫라인 카드 */}
          <Card className="lg:col-span-1 relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-2 text-xs">
                    <Zap className="w-3 h-3" />
                    <span className="text-xs">원스톱</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight">
                    원스톱 핫라인
                    <span className="block text-sm font-medium text-white/80 mt-0.5">고객대응서비스</span>
                  </h3>
                </div>
                <Phone className="w-6 h-6 text-white/60" />
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-4">
                기관 인프라 정보 및 공정/분석 기술 상담 등 문의 시 친절하게 안내해드립니다.
              </p>

              <div className="mt-auto bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-2xl font-bold mb-0.5">031-546-6000</p>
                <p className="text-xs text-white/60">평일 09:00-18:00</p>
              </div>
            </CardContent>
          </Card>

          {/* 고객 서비스 카드들 */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {/* 서비스 카드들 - QuickMenu 스타일 적용 */}
            {serviceCards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                className="group block"
              >
                <Card className={cn(
                  "relative overflow-hidden h-full aspect-[3/2]",
                  "transition-all duration-500 ease-out",
                  "hover:scale-105 hover:shadow-2xl",
                  "border-0"
                )}>
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={card.bgImage}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 to-gray-800/85 backdrop-blur-[2px]" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-3 sm:p-4 lg:p-5">
                    {/* Top Section */}
                    <div>
                      {/* Icon - Hidden on small mobile */}
                      <div className="hidden sm:block w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm sm:flex items-center justify-center mb-3">
                        <card.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-1.5">
                        {card.title}
                      </h3>
                      {/* Description - Hidden on mobile */}
                      <p className="hidden sm:block text-xs text-white/70 line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Section - Button Style Link - Hidden on small mobile */}
                    <div className="mt-2 sm:mt-3">
                      <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                        <span>{card.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      {/* Mobile arrow icon only */}
                      <div className="sm:hidden flex justify-end">
                        <ArrowRight className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </a>
            ))}
          </div>
        </div>


        {/* 하단 헬프 섹션 */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <CardContent className="p-6 lg:p-8">
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                {/* 왼쪽: 검색 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-white/10 rounded-md backdrop-blur-sm">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold">빠른 검색</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-4">
                    궁금한 점을 검색해보세요
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="무엇을 도와드릴까요?"
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 pr-10"
                    />
                    <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-md transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs text-white/50">인기:</span>
                    <button className="text-xs text-white/70 hover:text-white underline">팹 이용료</button>
                    <button className="text-xs text-white/70 hover:text-white underline">장비 예약</button>
                    <button className="text-xs text-white/70 hover:text-white underline">교육 신청</button>
                  </div>
                </div>

                {/* 오른쪽: 도움말 링크 */}
                <div className="grid grid-cols-4 gap-3">
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-3 text-center">
                        <FileText className="w-6 h-6 mx-auto mb-1.5 text-white/70" />
                        <p className="text-xs font-medium text-white/90">가이드</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-3 text-center">
                        <Headphones className="w-6 h-6 mx-auto mb-1.5 text-white/70" />
                        <p className="text-xs font-medium text-white/90">기술지원</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-3 text-center">
                        <HelpCircle className="w-6 h-6 mx-auto mb-1.5 text-white/70" />
                        <p className="text-xs font-medium text-white/90">FAQ</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-3 text-center">
                        <MessageCircle className="w-6 h-6 mx-auto mb-1.5 text-white/70" />
                        <p className="text-xs font-medium text-white/90">1:1문의</p>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}