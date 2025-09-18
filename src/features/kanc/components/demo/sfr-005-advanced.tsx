import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DollarSign, TrendingUp, TrendingDown, Database, RefreshCw,
  CheckCircle, AlertCircle, Clock, Calendar, FileText,
  Download, Upload, BarChart, PieChart, Shield, Zap
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

// 실적 카테고리
const categories = [
  { id: 'equipment', name: '장비이용료', color: 'bg-blue-500' },
  { id: 'analysis', name: '시험분석료', color: 'bg-green-500' },
  { id: 'material', name: '재료비', color: 'bg-purple-500' },
  { id: 'labor', name: '인건비', color: 'bg-orange-500' },
  { id: 'education', name: '교육수수료', color: 'bg-pink-500' },
  { id: 'consulting', name: '컨설팅료', color: 'bg-indigo-500' }
]

// 부서별 실적 데이터 생성
const generateDepartmentRevenue = () => {
  const departments = ['나노소자팀', '공정개발팀', '시험분석팀', '기업지원팀', '연구기획팀']
  const data = []

  for (const dept of departments) {
    for (let month = 1; month <= 9; month++) {
      for (const category of categories) {
        const baseAmount = Math.floor(Math.random() * 50000000) + 10000000
        data.push({
          id: `REV-${dept.slice(0, 2)}-${String(month).padStart(2, '0')}-${category.id}`,
          department: dept,
          month: `2025-${String(month).padStart(2, '0')}`,
          category: category.id,
          kancAmount: baseAmount,
          moafabAmount: month < 9 ? baseAmount : 0,
          syncStatus: month < 9 ? 'synced' : 'pending',
          variance: Math.floor((Math.random() - 0.5) * 1000000),
          projects: Math.floor(Math.random() * 20) + 5,
          lastSync: month < 9 ? new Date(2025, month, 1).toISOString() : null
        })
      }
    }
  }

  return data
}

// 동기화 배치 이력
const generateBatchHistory = () => {
  const history = []
  for (let i = 0; i < 30; i++) {
    const date = new Date(2025, 8 - Math.floor(i / 3), 30 - (i % 30))
    history.push({
      id: `BATCH-${String(i + 1).padStart(4, '0')}`,
      timestamp: date.toISOString(),
      type: i % 3 === 0 ? 'manual' : 'auto',
      recordCount: Math.floor(Math.random() * 500) + 100,
      successCount: 0,
      failCount: 0,
      totalAmount: Math.floor(Math.random() * 1000000000) + 500000000,
      duration: Math.floor(Math.random() * 60) + 10,
      status: 'completed'
    })
    history[i].successCount = history[i].recordCount - Math.floor(Math.random() * 5)
    history[i].failCount = history[i].recordCount - history[i].successCount
  }
  return history
}

// SFR-005: 금액 실적 정보 동기화 (고도화)
export function SFR005AdvancedDemo() {
  const [revenueData, setRevenueData] = useState(generateDepartmentRevenue())
  const [batchHistory, setBatchHistory] = useState(generateBatchHistory())
  const [selectedMonth, setSelectedMonth] = useState('2025-09')
  const [selectedDept, setSelectedDept] = useState('all')
  const [syncMode, setSyncMode] = useState<'realtime' | 'batch'>('batch')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])

  // 월별 집계 데이터
  const monthlyAggregates = Array.from({ length: 9 }, (_, i) => {
    const month = `2025-${String(i + 1).padStart(2, '0')}`
    const monthData = revenueData.filter(r => r.month === month)
    return {
      month,
      kancTotal: monthData.reduce((sum, r) => sum + r.kancAmount, 0),
      moafabTotal: monthData.reduce((sum, r) => sum + r.moafabAmount, 0),
      variance: monthData.reduce((sum, r) => sum + r.variance, 0),
      syncedCount: monthData.filter(r => r.syncStatus === 'synced').length,
      pendingCount: monthData.filter(r => r.syncStatus === 'pending').length,
      projectCount: monthData.reduce((sum, r) => sum + r.projects, 0)
    }
  })

  // 현재 월 필터된 데이터
  const filteredData = revenueData.filter(r => {
    const matchMonth = r.month === selectedMonth
    const matchDept = selectedDept === 'all' || r.department === selectedDept
    return matchMonth && matchDept
  })

  // 카테고리별 집계
  const categoryTotals = categories.map(cat => {
    const catData = filteredData.filter(r => r.category === cat.id)
    return {
      ...cat,
      kancAmount: catData.reduce((sum, r) => sum + r.kancAmount, 0),
      moafabAmount: catData.reduce((sum, r) => sum + r.moafabAmount, 0),
      percentage: 0
    }
  })
  const totalKanc = categoryTotals.reduce((sum, c) => sum + c.kancAmount, 0)
  categoryTotals.forEach(c => {
    c.percentage = totalKanc > 0 ? (c.kancAmount / totalKanc) * 100 : 0
  })

  // 배치 동기화 실행
  const runBatchSync = async () => {
    setIsSyncing(true)
    setSyncProgress(0)
    const pendingRecords = revenueData.filter(r => r.syncStatus === 'pending')

    for (let i = 0; i < pendingRecords.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      setSyncProgress(Math.round(((i + 1) / pendingRecords.length) * 100))

      setRevenueData(prev => prev.map(r =>
        r.id === pendingRecords[i].id
          ? { ...r, moafabAmount: r.kancAmount, syncStatus: 'synced', lastSync: new Date().toISOString() }
          : r
      ))
    }

    // 배치 이력 추가
    setBatchHistory(prev => [{
      id: `BATCH-${String(prev.length + 1).padStart(4, '0')}`,
      timestamp: new Date().toISOString(),
      type: 'manual',
      recordCount: pendingRecords.length,
      successCount: pendingRecords.length,
      failCount: 0,
      totalAmount: pendingRecords.reduce((sum, r) => sum + r.kancAmount, 0),
      duration: Math.round(pendingRecords.length * 0.05),
      status: 'completed'
    }, ...prev])

    setIsSyncing(false)
    setSyncProgress(0)
  }

  // 통계 카드
  const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${color} bg-opacity-10 rounded-lg`}>
              <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold">
                {typeof value === 'number' ? `₩${(value / 1000000).toFixed(0)}M` : value}
              </p>
            </div>
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const currentMonthData = monthlyAggregates.find(m => m.month === selectedMonth)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-005: 금액 실적 정보 동기화</CardTitle>
            <CardDescription className="mt-2">
              기술원 금액 실적 데이터를 모아팹으로 전송 및 관리
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Database className="w-3 h-3 mr-1" />
              실적 동기화
            </Badge>
            {isSyncing && (
              <Badge variant="default" className="px-3 py-1">
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                동기화 {syncProgress}%
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 통계 대시보드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={DollarSign}
            label="당월 KANC 실적"
            value={currentMonthData?.kancTotal || 0}
            trend={12}
            color="bg-blue-500"
          />
          <StatCard
            icon={Database}
            label="모아팹 동기화"
            value={currentMonthData?.moafabTotal || 0}
            trend={currentMonthData?.moafabTotal === currentMonthData?.kancTotal ? 0 : -5}
            color="bg-green-500"
          />
          <StatCard
            icon={FileText}
            label="프로젝트 수"
            value={currentMonthData?.projectCount || 0}
            trend={8}
            color="bg-purple-500"
          />
          <StatCard
            icon={CheckCircle}
            label="동기화율"
            value={`${currentMonthData ? Math.round((currentMonthData.syncedCount / (currentMonthData.syncedCount + currentMonthData.pendingCount)) * 100) : 0}%`}
            trend={0}
            color="bg-orange-500"
          />
        </div>

        {/* 필터 및 액션 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-4">
            <div>
              <Label>기간 선택</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthlyAggregates.map(m => (
                    <SelectItem key={m.month} value={m.month}>
                      {m.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>부서 선택</Label>
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 부서</SelectItem>
                  <SelectItem value="나노소자팀">나노소자팀</SelectItem>
                  <SelectItem value="공정개발팀">공정개발팀</SelectItem>
                  <SelectItem value="시험분석팀">시험분석팀</SelectItem>
                  <SelectItem value="기업지원팀">기업지원팀</SelectItem>
                  <SelectItem value="연구기획팀">연구기획팀</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Excel 다운로드
            </Button>
            <Button
              onClick={runBatchSync}
              disabled={isSyncing || !filteredData.some(r => r.syncStatus === 'pending')}
            >
              <Upload className="w-4 h-4 mr-2" />
              배치 동기화
            </Button>
          </div>
        </div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList>
            <TabsTrigger value="monthly">월별 실적</TabsTrigger>
            <TabsTrigger value="category">카테고리별</TabsTrigger>
            <TabsTrigger value="detail">상세 내역</TabsTrigger>
            <TabsTrigger value="batch">배치 이력</TabsTrigger>
          </TabsList>

          {/* 월별 실적 탭 */}
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">2025년 월별 실적 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>월</TableHead>
                      <TableHead className="text-right">KANC 실적</TableHead>
                      <TableHead className="text-right">모아팹 실적</TableHead>
                      <TableHead className="text-right">차이</TableHead>
                      <TableHead className="text-center">프로젝트</TableHead>
                      <TableHead className="text-center">동기화</TableHead>
                      <TableHead>상태</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyAggregates.map(month => {
                      const variance = month.kancTotal - month.moafabTotal
                      const syncRate = month.syncedCount / (month.syncedCount + month.pendingCount) * 100

                      return (
                        <TableRow key={month.month}>
                          <TableCell className="font-medium">{month.month}</TableCell>
                          <TableCell className="text-right font-mono">
                            ₩{(month.kancTotal / 1000000).toFixed(0)}M
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            ₩{(month.moafabTotal / 1000000).toFixed(0)}M
                          </TableCell>
                          <TableCell className={`text-right font-mono ${variance !== 0 ? 'text-red-500' : ''}`}>
                            {variance !== 0 && '₩'}{variance !== 0 && (Math.abs(variance) / 1000000).toFixed(0)}{variance !== 0 && 'M'}
                          </TableCell>
                          <TableCell className="text-center">{month.projectCount}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center gap-2">
                              <Progress value={syncRate} className="w-16 h-2" />
                              <span className="text-xs">{Math.round(syncRate)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {variance === 0 ? (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                일치
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                불일치
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    <TableRow className="font-bold bg-gray-50 dark:bg-gray-800/50">
                      <TableCell>합계</TableCell>
                      <TableCell className="text-right">
                        ₩{(monthlyAggregates.reduce((sum, m) => sum + m.kancTotal, 0) / 1000000).toFixed(0)}M
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{(monthlyAggregates.reduce((sum, m) => sum + m.moafabTotal, 0) / 1000000).toFixed(0)}M
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{(monthlyAggregates.reduce((sum, m) => sum + (m.kancTotal - m.moafabTotal), 0) / 1000000).toFixed(0)}M
                      </TableCell>
                      <TableCell className="text-center">
                        {monthlyAggregates.reduce((sum, m) => sum + m.projectCount, 0)}
                      </TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 카테고리별 탭 */}
          <TabsContent value="category" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{selectedMonth} 카테고리별 실적</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryTotals.map(cat => (
                      <div key={cat.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${cat.color}`} />
                            <span className="text-sm">{cat.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            ₩{(cat.kancAmount / 1000000).toFixed(0)}M ({cat.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={cat.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">동기화 상태 요약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-3xl font-bold text-green-600">
                        {filteredData.filter(r => r.syncStatus === 'synced').length}
                      </p>
                      <p className="text-sm text-muted-foreground">동기화 완료</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-3xl font-bold text-yellow-600">
                        {filteredData.filter(r => r.syncStatus === 'pending').length}
                      </p>
                      <p className="text-sm text-muted-foreground">동기화 대기</p>
                    </div>
                  </div>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      매월 1일 오전 6시에 자동 배치 동기화가 실행됩니다.
                      수동 동기화는 권한이 있는 사용자만 가능합니다.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 상세 내역 탭 */}
          <TabsContent value="detail" className="space-y-4">
            <ScrollArea className="h-[500px] border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>부서</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead className="text-right">KANC 금액</TableHead>
                    <TableHead className="text-right">모아팹 금액</TableHead>
                    <TableHead className="text-right">차이</TableHead>
                    <TableHead>프로젝트</TableHead>
                    <TableHead>동기화</TableHead>
                    <TableHead>최종 동기화</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map(record => {
                    const category = categories.find(c => c.id === record.category)
                    const variance = record.kancAmount - record.moafabAmount

                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-mono text-xs">{record.id}</TableCell>
                        <TableCell className="text-sm">{record.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded ${category?.color}`} />
                            <span className="text-sm">{category?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ₩{(record.kancAmount / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ₩{(record.moafabAmount / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className={`text-right font-mono ${variance !== 0 ? 'text-red-500' : ''}`}>
                          {variance !== 0 && (variance > 0 ? '+' : '')}
                          {variance !== 0 && (variance / 1000000).toFixed(1)}
                          {variance !== 0 && 'M'}
                        </TableCell>
                        <TableCell className="text-center">{record.projects}</TableCell>
                        <TableCell>
                          {record.syncStatus === 'synced' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {record.lastSync ? new Date(record.lastSync).toLocaleDateString('ko-KR') : '-'}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          {/* 배치 이력 탭 */}
          <TabsContent value="batch" className="space-y-4">
            <ScrollArea className="h-[500px] border rounded-lg p-4">
              <div className="space-y-2">
                {batchHistory.slice(0, 20).map(batch => (
                  <div key={batch.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className={`p-2 rounded-lg ${
                      batch.type === 'auto' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-purple-100 dark:bg-purple-900/20'
                    }`}>
                      {batch.type === 'auto' ?
                        <Zap className="w-4 h-4 text-blue-600" /> :
                        <Database className="w-4 h-4 text-purple-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{batch.id}</span>
                        <Badge variant="outline" className="text-xs">
                          {batch.type === 'auto' ? '자동' : '수동'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{new Date(batch.timestamp).toLocaleString('ko-KR')}</span>
                        <span>처리: {batch.recordCount}건</span>
                        <span>금액: ₩{(batch.totalAmount / 1000000000).toFixed(1)}B</span>
                        <span>소요: {batch.duration}초</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={batch.failCount > 0 ? "destructive" : "default"} className="text-xs">
                        성공 {batch.successCount} / 실패 {batch.failCount}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}