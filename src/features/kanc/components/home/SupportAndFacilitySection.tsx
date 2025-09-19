import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '../common/SectionWrapper'
import {
  HiPhone,
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiBuildingOffice2,
  HiUserGroup,
  HiArrowRight,
  HiClock,
  HiCheckCircle,
  HiMapPin,
  HiAcademicCap,
  HiSparkles
} from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'

interface SupportAndFacilitySectionProps {
  variant?: 'intro' | 'service'
}

export function SupportAndFacilitySection({ variant = 'intro' }: SupportAndFacilitySectionProps = {}) {
  const { t } = useTranslation()

  const supportChannels = [
    {
      icon: HiPhone,
      title: t('kanc:sections.supportFacility.support.channels.phone.title'),
      value: '042-123-4567',
      subtitle: t('kanc:sections.supportFacility.support.channels.phone.subtitle')
    },
    {
      icon: HiChatBubbleLeftRight,
      title: t('kanc:sections.supportFacility.support.channels.chat.title'),
      value: t('kanc:sections.supportFacility.support.channels.chat.value'),
      subtitle: t('kanc:sections.supportFacility.support.channels.chat.subtitle'),
      action: true
    },
    {
      icon: HiEnvelope,
      title: t('kanc:sections.supportFacility.support.channels.email.title'),
      value: 'help@kanc.re.kr',
      subtitle: t('kanc:sections.supportFacility.support.channels.email.subtitle')
    }
  ]

  const introFacilityInfo = [
    {
      icon: HiBuildingOffice2,
      title: t('kanc:sections.supportFacility.facility.intro.facility.title'),
      description: t('kanc:sections.supportFacility.facility.intro.facility.description'),
      link: '/facility/guide',
      badge: t('kanc:sections.supportFacility.facility.intro.facility.badge'),
      stats: t('kanc:sections.supportFacility.facility.intro.facility.stats')
    },
    {
      icon: HiUserGroup,
      title: t('kanc:sections.supportFacility.facility.intro.experts.title'),
      description: t('kanc:sections.supportFacility.facility.intro.experts.description'),
      link: '/staff',
      badge: t('kanc:sections.supportFacility.facility.intro.experts.badge'),
      stats: t('kanc:sections.supportFacility.facility.intro.experts.stats')
    }
  ]

  const serviceFacilityInfo = [
    {
      icon: HiUserGroup,
      title: t('kanc:sections.supportFacility.facility.service.signup.title'),
      description: t('kanc:sections.supportFacility.facility.service.signup.description'),
      link: '/signup/guide',
      badge: t('kanc:sections.supportFacility.facility.service.signup.badge'),
      stats: t('kanc:sections.supportFacility.facility.service.signup.stats')
    },
    {
      icon: HiMapPin,
      title: t('kanc:sections.supportFacility.facility.service.location.title'),
      description: t('kanc:sections.supportFacility.facility.service.location.description'),
      link: '/location',
      badge: t('kanc:sections.supportFacility.facility.service.location.badge'),
      stats: t('kanc:sections.supportFacility.facility.service.location.stats')
    }
  ]

  const facilityInfo = variant === 'service' ? serviceFacilityInfo : introFacilityInfo

  return (
    <SectionWrapper>
      <div className="mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('kanc:sections.supportFacility.title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t('kanc:sections.supportFacility.subtitle')}
          </p>
        </div>

        {/* 통합 카드 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 고객 지원 카드 */}
          <Card className="h-full overflow-hidden border border-gray-200/50 dark:border-[#383c3c] bg-white dark:bg-[#272829]">
            <CardHeader className="border-b px-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f3f3f3]">{t('kanc:sections.supportFacility.support.title')}</h3>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-[#343638] dark:text-[#3fd7bc] border-0">
                  <HiCheckCircle className="w-3.5 h-3.5 mr-1" />
                  {t('kanc:sections.supportFacility.support.badge')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* 상담 채널 목록 */}
                <div className="space-y-3">
                  {supportChannels.map((channel, index) => (
                    <div
                      key={index}
                      className="group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] bg-gray-50 dark:bg-popover hover:bg-gray-100 dark:hover:bg-secondary">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-card shadow-sm">
                          <channel.icon className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">
                            {channel.title}
                          </div>
                          <div className="font-semibold">
                            {channel.action ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-3 font-semibold hover:bg-transparent"
                              >
                                {channel.value}
                                <HiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            ) : (
                              channel.value
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <HiClock className="w-3.5 h-3.5" />
                        {channel.subtitle}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 추가 정보 */}
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('kanc:sections.supportFacility.support.responseTime')}: <span className="font-medium text-foreground">{t('kanc:sections.supportFacility.support.responseTimeValue')}</span>
                    </span>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      {t('kanc:sections.supportFacility.support.faqButton')} →
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 시설 & 인력 카드 */}
          <Card className="h-full overflow-hidden border border-gray-200/50 dark:border-[#383c3c] bg-white dark:bg-[#272829]">
            <CardHeader className="border-b px-6 pb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f3f3f3]">{variant === 'service' ? t('kanc:sections.supportFacility.facility.serviceTitle') : t('kanc:sections.supportFacility.facility.introTitle')}</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* 시설 정보 카드 */}
                <div className="space-y-4">
                  {facilityInfo.map((facility, index) => (
                    <a
                      key={index}
                      href={facility.link}
                      className="group block"
                    >
                      <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-border/50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-popover">
                              <facility.icon className="w-6 h-6 text-gray-600 dark:text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  {facility.title}
                                  <Badge variant="secondary" className="text-xs">
                                    {facility.badge}
                                  </Badge>
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {facility.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <HiCheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                  {facility.stats}
                                </span>
                              </div>
                            </div>
                          </div>
                          <HiArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>

                {/* 추가 링크 */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                  {variant === 'service' ? (
                    <>
                      <Button variant="outline" size="default" className="justify-start h-10">
                        <HiPhone className="w-4 h-4 mr-2" />
                        {t('kanc:sections.supportFacility.facility.contactButton')}
                      </Button>
                      <Button variant="outline" size="default" className="justify-start h-10">
                        <HiEnvelope className="w-4 h-4 mr-2" />
                        {t('kanc:sections.supportFacility.facility.faqButton')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="default" className="justify-start h-10">
                        <HiMapPin className="w-4 h-4 mr-2" />
                        {t('kanc:sections.supportFacility.facility.directionsButton')}
                      </Button>
                      <Button variant="outline" size="default" className="justify-start h-10">
                        <HiAcademicCap className="w-4 h-4 mr-2" />
                        {t('kanc:sections.supportFacility.facility.researchButton')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* 하단 CTA 영역 */}
        <Card className="mt-6 overflow-hidden border border-gray-200/50 dark:border-[#383c3c] bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-[#313233]/20 dark:via-[#343638]/20 dark:to-[#313233]/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm font-medium">
                  {t('kanc:sections.supportFacility.cta.title')}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t('kanc:sections.supportFacility.cta.subtitle')}
                </p>
              </div>
              <div className="flex gap-3">
                <Button size="default" variant="outline" className="h-10">
                  {t('kanc:sections.supportFacility.cta.downloadButton')}
                </Button>
                <Button size="default" className="h-10">
                  {t('kanc:sections.supportFacility.cta.tourButton')}
                  <HiArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}