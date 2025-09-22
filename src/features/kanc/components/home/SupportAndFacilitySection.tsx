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
      icon: Building2,
      title: '시설안내',
      description: '한국나노기술원에서 제공하는 연구시설 및 장비현황을 확인할 수 있습니다.',
      link: '/facility',
      linkText: '시설현황 바로가기',
      bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      icon: Users,
      title: '직원조회',
      description: '한국나노기술원의 직원 정보를 확인할 수 있습니다.',
      link: '/staff',
      linkText: '직원조회 바로가기',
      bgImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      icon: GraduationCap,
      title: '교육 프로그램',
      description: '나노기술 전문 교육 과정 및 신청 방법을 안내합니다.',
      link: '/education',
      linkText: '교육과정 안내',
      bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      icon: Calendar,
      title: '장비 예약',
      description: '첨단 장비 예약 및 사용 방법을 안내합니다.',
      link: '/equipment/reservation',
      linkText: '예약 시스템 바로가기',
      bgImage: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=400&fit=crop'
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


        {/* 원스톱 핫라인 및 시설/직원 안내 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* 원스톱 핫라인 카드 */}
          <Card className="lg:col-span-1 relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-medium">원스톱 서비스</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  원스톱 핫라인<br/>
                  고객대응서비스
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  기관 인프라 정보 및 공정/분석 기술 상담 등 문의가 있을 경우 아래의 연락처로 연락해 주시면 친절하게 안내 및 방문을 약속해 드립니다.
                </p>
              </div>

              <div className="mt-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3 text-white/80" />
                  <p className="text-3xl font-bold mb-1">031-546-6000</p>
                  <p className="text-xs text-white/60">평일 09:00 - 18:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 시설 및 직원 안내 카드들 */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {/* 서비스 카드들 - QuickMenu 스타일 적용 */}
            {serviceCards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                className="group block"
              >
                <Card className={cn(
                  "relative overflow-hidden h-full aspect-[4/3]",
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
                  <div className="relative h-full flex flex-col justify-between p-5 lg:p-6">
                    {/* Top Section */}
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-white/80 line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Section - Button Style Link */}
                    <div className="mt-4">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                        <span>{card.linkText}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
          <CardContent className="p-8 lg:p-12">
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* 왼쪽: 검색 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">빠른 검색</h3>
                  </div>
                  <p className="text-white/80 mb-6">
                    궁금한 점을 검색해보세요
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="무엇을 도와드릴까요?"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 pr-12"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-md transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs text-white/60">인기 검색:</span>
                    <button className="text-xs text-white/80 hover:text-white underline">팹 이용료</button>
                    <button className="text-xs text-white/80 hover:text-white underline">장비 예약</button>
                    <button className="text-xs text-white/80 hover:text-white underline">교육 신청</button>
                  </div>
                </div>

                {/* 오른쪽: 도움말 링크 */}
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <p className="text-sm font-medium text-white">사용자 가이드</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <Headphones className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <p className="text-sm font-medium text-white">기술 지원</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <HelpCircle className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <p className="text-sm font-medium text-white">FAQ</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="#" className="group">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <p className="text-sm font-medium text-white">1:1 문의</p>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}