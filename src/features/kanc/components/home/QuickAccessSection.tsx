import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Download,
  FileText,
  HelpCircle,
  Calendar
} from 'lucide-react'

const quickLinks = [
  {
    id: '1',
    title: '원스톱창구인고객대응서비스',
    description: '기관 인프라 정보 및 공정/분석 기술 상담 등 문의하기 있을 경우 아래의 연락처로 연락을 주시면 친절하게 안내 및 방문을 약속해 드립니다.',
    phone: '031-546-6000',
    iconBg: 'bg-blue-500',
    logo: 'ONE STOP'
  },
  {
    id: '2',
    title: '시설안내',
    description: '한국나노기술원에서 제공하는 한국나노기술원의 장비업을 확인할 수 있습니다.',
    iconBg: 'bg-green-500'
  },
  {
    id: '3',
    title: '직원조회',
    description: '한국나노기술원의 직원 정보를 확인할 수 있습니다.',
    iconBg: 'bg-purple-500'
  }
]

const quickActions = [
  {
    id: '1',
    icon: FileText,
    label: '서식 다운로드',
    count: '23',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30'
  },
  {
    id: '2',
    icon: HelpCircle,
    label: '자주 묻는 질문',
    count: '156',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30'
  },
  {
    id: '3',
    icon: Calendar,
    label: '교육 일정',
    count: '8',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30'
  },
  {
    id: '4',
    icon: Download,
    label: '브로슈어',
    count: '5',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30'
  }
]

export function QuickAccessSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* One Stop Service Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                ONE<br/>STOP
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-2">원스톱 고객대응서비스</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  기관 인프라 정보 및 공정/분석 기술 상담 등 문의사항이 있을 경우 연락주시면 친절하게 안내해 드립니다.
                </p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">031-546-6000</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Facility Info Card */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-base">시설안내</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                한국나노기술원에서 제공하는 최첨단 장비 및 시설을 확인할 수 있습니다.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                자세히 보기
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Staff Directory Card */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-base">직원조회</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                한국나노기술원의 직원 정보를 확인할 수 있습니다.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                조회하기
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card
                key={action.id}
                className="p-4 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.count}개 항목
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}