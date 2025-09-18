import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SectionWrapper } from '../common/SectionWrapper'
import {
  Activity,
  CheckCircle,
  Settings,
  TrendingUp,
  Users,
  AlertCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

interface EquipmentDashboardProps {
  variant?: 'intro' | 'service'
}

const equipmentStats = {
  total: 523,
  available: 412,
  inUse: 89,
  maintenance: 22,
  utilizationRate: 78,
  weeklyTrend: 5.2,
  todayBookings: 47,
  activeUsers: 156
}

const departmentStats = [
  { name: '나노공정실', usage: 92, trend: 'up' },
  { name: '분석실험실', usage: 85, trend: 'up' },
  { name: '클린룸', usage: 76, trend: 'down' },
  { name: '측정분석실', usage: 68, trend: 'up' }
]

export function EquipmentDashboard({ variant = 'service' }: EquipmentDashboardProps) {
  if (variant !== 'service') return null

  return (
    <SectionWrapper background="gradient">
      <div className="space-y-6">
        {/* 섹션 헤더 */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            실시간 장비 현황
          </h2>
          <p className="text-sm text-muted-foreground">
            한국나노기술원 장비 운영 현황을 실시간으로 확인하세요
          </p>
        </div>

        {/* 주요 지표 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 전체 장비 */}
          <Card className="border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">전체 장비</p>
                  <p className="text-2xl font-bold">{equipmentStats.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">대</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사용 가능 */}
          <Card className="border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">사용 가능</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {equipmentStats.available}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">즉시 예약 가능</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사용 중 */}
          <Card className="border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">사용 중</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {equipmentStats.inUse}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">현재 운영</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 점검 중 */}
          <Card className="border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">점검 중</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {equipmentStats.maintenance}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">정비 진행</p>
                </div>
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상세 현황 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 가동률 현황 */}
          <Card className="border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">장비 가동률</h3>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {equipmentStats.weeklyTrend > 0 ? '+' : ''}{equipmentStats.weeklyTrend}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 전체 가동률 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">전체 가동률</span>
                    <span className="text-2xl font-bold text-primary">
                      {equipmentStats.utilizationRate}%
                    </span>
                  </div>
                  <Progress value={equipmentStats.utilizationRate} className="h-3" />
                </div>

                {/* 부서별 가동률 */}
                <div className="space-y-3 pt-2">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{dept.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium">{dept.usage}%</span>
                          {dept.trend === 'up' ? (
                            <ChevronUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      <Progress value={dept.usage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 오늘의 활동 */}
          <Card className="border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">오늘의 활동</h3>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                  실시간
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 통계 요약 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white dark:bg-gray-900">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{equipmentStats.activeUsers}</p>
                        <p className="text-xs text-muted-foreground">활성 사용자</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white dark:bg-gray-900">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{equipmentStats.todayBookings}</p>
                        <p className="text-xs text-muted-foreground">오늘 예약</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 최근 활동 로그 */}
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium mb-3">최근 활동</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="w-16 justify-center">14:32</Badge>
                      <span className="text-muted-foreground">SEM-01 장비 예약 완료</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="w-16 justify-center">14:25</Badge>
                      <span className="text-muted-foreground">XRD-03 분석 시작</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="w-16 justify-center">14:18</Badge>
                      <span className="text-muted-foreground">AFM-02 정비 완료</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="w-16 justify-center">14:05</Badge>
                      <span className="text-muted-foreground">클린룸 B동 입실 7명</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 액션 영역 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="/equipment/list"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            전체 장비 목록 보기 →
          </a>
          <a
            href="/equipment/booking"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            장비 예약하기 →
          </a>
          <a
            href="/equipment/status"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            상세 통계 보기 →
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}