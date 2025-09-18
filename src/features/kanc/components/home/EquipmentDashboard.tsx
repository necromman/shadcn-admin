import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '../common/SectionWrapper'
import {
  Activity,
  CheckCircle,
  Settings,
  TrendingUp,
  Users,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Clock,
  Calendar,
  BarChart3,
  Zap,
  Shield,
  FileText
} from 'lucide-react'

interface EquipmentDashboardProps {
  variant?: 'intro' | 'service'
}

const equipmentStats = {
  total: 523,
  available: 412,
  inUse: 89,
  maintenance: 22,
  utilizationRate: 78.3,
  weeklyTrend: 5.2,
  monthlyTrend: 12.7,
  todayBookings: 47,
  activeUsers: 156,
  avgWaitTime: '2.5',
  completionRate: 94.2,
  maintenanceScheduled: 8,
  peakHourUsage: 92
}

const equipmentCategories = [
  {
    name: '반도체 공정장비',
    total: 124,
    available: 98,
    usage: 79.2,
    trend: 'up',
    icon: 'semiconductor'
  },
  {
    name: '측정/분석장비',
    total: 156,
    available: 142,
    usage: 91.0,
    trend: 'up',
    icon: 'analysis'
  },
  {
    name: '나노소재장비',
    total: 98,
    available: 87,
    usage: 88.8,
    trend: 'down',
    icon: 'nanomaterial'
  },
  {
    name: '클린룸 설비',
    total: 145,
    available: 85,
    usage: 58.6,
    trend: 'up',
    icon: 'cleanroom'
  }
]

const recentActivities = [
  { time: '14:32', type: 'booking', message: 'SEM-FEI-01 전자현미경 예약 승인', status: 'success' },
  { time: '14:25', type: 'start', message: 'XRD-Rigaku-03 X선 회절 분석 시작', status: 'active' },
  { time: '14:18', type: 'complete', message: 'AFM-Park-02 원자현미경 정비 완료', status: 'complete' },
  { time: '14:05', type: 'alert', message: 'Clean Room B동 습도 조절 필요', status: 'warning' },
  { time: '13:58', type: 'user', message: 'ICP-MS 장비 교육 세션 시작 (12명)', status: 'info' }
]

const performanceMetrics = [
  { label: '평균 대기시간', value: '2.5시간', change: -15, unit: '' },
  { label: '장비 정확도', value: '99.2%', change: 0.3, unit: '' },
  { label: '예약 충족률', value: '94.2%', change: 2.1, unit: '' },
  { label: '고장률', value: '0.8%', change: -0.2, unit: '' }
]

export function EquipmentDashboard({ variant = 'service' }: EquipmentDashboardProps) {
  if (variant !== 'service') return null

  return (
    <SectionWrapper>
      <div className="space-y-6">
        {/* 섹션 헤더 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            실시간 모니터링 시스템
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            통합 장비관리 대시보드
          </h2>
        </div>

        {/* 핵심 성과 지표 (KPI) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 전체 장비 */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                    총 보유
                  </Badge>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{equipmentStats.total}</span>
                    <span className="text-sm text-muted-foreground">대</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    나노기술 특화 장비
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 가동률 */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronUp className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] text-green-600 font-medium">+{equipmentStats.weeklyTrend}%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {equipmentStats.utilizationRate}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    평균 가동률
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 대기시간 */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                    최적화
                  </Badge>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{equipmentStats.avgWaitTime}</span>
                    <span className="text-sm text-muted-foreground">시간</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    평균 대기시간
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 예약 충족률 */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                    <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronUp className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] text-green-600 font-medium">+2.1%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{equipmentStats.completionRate}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    예약 충족률
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 카테고리별 장비 현황 */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">장비 카테고리별 현황</h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                상세보기
                <ChevronUp className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipmentCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {category.available}/{category.total}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{category.usage}%</span>
                      {category.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <Progress value={category.usage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 상세 현황 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 실시간 활동 로그 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold">실시간 활동</h3>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  로그
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <Badge
                      variant="outline"
                      className="min-w-[48px] justify-center text-[10px] font-normal"
                    >
                      {activity.time}
                    </Badge>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs leading-relaxed">{activity.message}</p>
                      <div className="flex items-center gap-2">
                        {activity.status === 'success' && (
                          <Badge className="h-5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0 text-[10px]">
                            승인
                          </Badge>
                        )}
                        {activity.status === 'active' && (
                          <Badge className="h-5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0 text-[10px]">
                            진행중
                          </Badge>
                        )}
                        {activity.status === 'complete' && (
                          <Badge className="h-5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-0 text-[10px]">
                            완료
                          </Badge>
                        )}
                        {activity.status === 'warning' && (
                          <Badge className="h-5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-0 text-[10px]">
                            주의
                          </Badge>
                        )}
                        {activity.status === 'info' && (
                          <Badge className="h-5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0 text-[10px]">
                            정보
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 성능 지표 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">주요 성능 지표</h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  분석
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {performanceMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border bg-gray-50/50 dark:bg-gray-800/30 border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {metric.label}
                      </p>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-bold">
                          {metric.value}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {metric.change > 0 ? (
                            <ChevronUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-[10px] font-medium ${
                            metric.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {Math.abs(metric.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 오늘의 통계 */}
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-bold">{equipmentStats.activeUsers}</p>
                    <p className="text-[10px] text-muted-foreground">활성 사용자</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-bold">{equipmentStats.todayBookings}</p>
                    <p className="text-[10px] text-muted-foreground">오늘 예약</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-bold">{equipmentStats.maintenanceScheduled}</p>
                    <p className="text-[10px] text-muted-foreground">예정 정비</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 액션 버튼 영역 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button variant="default" size="sm" className="min-w-[140px]">
            <Calendar className="w-4 h-4 mr-2" />
            장비 예약하기
          </Button>
          <Button variant="outline" size="sm" className="min-w-[140px]">
            <BarChart3 className="w-4 h-4 mr-2" />
            상세 분석 보기
          </Button>
          <Button variant="ghost" size="sm" className="min-w-[140px]">
            <FileText className="w-4 h-4 mr-2" />
            리포트 생성
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}