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
  CheckCircle, XCircle, RefreshCw, AlertCircle, Activity,
  Clock, Database, Zap, ArrowUpDown, Filter, Search,
  FileText, User, Calendar, Hash, Monitor, Settings
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// 실무 데이터 생성 함수
const generateServiceData = (count: number) => {
  const services = []
  const serviceTypes = ['E-Beam Lithography', 'PECVD', 'Cu Etching', 'ALD', 'Dry Etching', 'Wet Etching', 'Metrology', 'Ion Implantation']
  const users = ['김철수', '이영희', '박민수', '정수진', '최준호', '강미나', '조현우', '한지민']
  const companies = ['삼성전자', 'SK하이닉스', '네오와인', '파워로직스', '실리콘웍스', '테크윈', '나노엑스', '케이엠더블유']

  for (let i = 1; i <= count; i++) {
    const status = Math.random() > 0.7 ? '취소대기' : Math.random() > 0.5 ? '진행중' : '완료'
    services.push({
      id: `SVC-${String(i).padStart(6, '0')}`,
      moafabId: `MF-${String(2500000 + i).padStart(7, '0')}`,
      serviceName: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
      requestUser: users[Math.floor(Math.random() * users.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      requestDate: new Date(2025, 8, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      scheduledDate: new Date(2025, 9, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      equipment: `EQ-${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')}`,
      status: status,
      syncStatus: status === '취소대기' ? 'pending' : 'synced',
      amount: Math.floor(Math.random() * 5000000) + 500000,
      priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    })
  }
  return services
}

// SFR-003: 모아팹 서비스 취소 정보 동기화 (고도화)
export function SFR003AdvancedDemo() {
  const [services, setServices] = useState(generateServiceData(150))
  const [filteredServices, setFilteredServices] = useState(services)
  const [syncLogs, setSyncLogs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [syncMode, setSyncMode] = useState<'manual' | 'batch'>('manual')
  const [batchProgress, setBatchProgress] = useState(0)
  const [isBatchRunning, setIsBatchRunning] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // 실시간 모니터링 데이터
  const [stats, setStats] = useState({
    totalServices: services.length,
    pendingCancel: services.filter(s => s.status === '취소대기').length,
    syncedToday: 0,
    failedSync: 0,
    avgSyncTime: '1.2초'
  })

  // 필터링
  useEffect(() => {
    let filtered = services

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.moafabId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter)
    }

    setFilteredServices(filtered)
  }, [searchTerm, statusFilter, services])

  // 개별 서비스 취소 동기화
  const syncSingleService = (serviceId: string) => {
    const timestamp = new Date().toISOString()
    const service = services.find(s => s.id === serviceId)

    setSyncLogs(prev => [{
      timestamp,
      action: 'CANCEL_REQUEST',
      serviceId,
      moafabId: service?.moafabId,
      status: 'processing',
      message: `서비스 ${serviceId} 취소 요청 시작`
    }, ...prev].slice(0, 100))

    setTimeout(() => {
      setServices(prev => prev.map(svc =>
        svc.id === serviceId
          ? { ...svc, status: '반려', syncStatus: 'synced' }
          : svc
      ))

      setSyncLogs(prev => [{
        timestamp: new Date().toISOString(),
        action: 'CANCEL_COMPLETE',
        serviceId,
        moafabId: service?.moafabId,
        status: 'success',
        message: `서비스 ${serviceId} 취소 완료 (모아팹 동기화 성공)`
      }, ...prev].slice(0, 100))

      setStats(prev => ({ ...prev, syncedToday: prev.syncedToday + 1 }))
    }, Math.random() * 2000 + 500)
  }

  // 배치 동기화
  const runBatchSync = async () => {
    setIsBatchRunning(true)
    setBatchProgress(0)
    const pendingServices = services.filter(s => s.status === '취소대기')
    const total = pendingServices.length

    for (let i = 0; i < pendingServices.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100))
      syncSingleService(pendingServices[i].id)
      setBatchProgress(Math.round(((i + 1) / total) * 100))
    }

    setIsBatchRunning(false)
    setBatchProgress(0)
  }

  // 통계 카드
  const StatCard = ({ icon: Icon, label, value, trend }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          </div>
          {trend && (
            <Badge variant={trend > 0 ? "default" : "destructive"} className="text-xs">
              {trend > 0 ? '+' : ''}{trend}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-003: 모아팹 서비스 취소 정보 동기화</CardTitle>
            <CardDescription className="mt-2">
              모아팹 ↔ 기술원 서비스 취소 정보 실시간 동기화 시스템
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Database className="w-3 h-3 mr-1" />
              실시간 연동
            </Badge>
            <Badge variant={isBatchRunning ? "default" : "secondary"} className="px-3 py-1">
              <Activity className="w-3 h-3 mr-1" />
              {isBatchRunning ? '배치 실행중' : '대기'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 통계 대시보드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Database} label="전체 서비스" value={stats.totalServices} />
          <StatCard icon={XCircle} label="취소 대기" value={stats.pendingCancel} trend={-12} />
          <StatCard icon={CheckCircle} label="오늘 동기화" value={stats.syncedToday} trend={23} />
          <StatCard icon={Clock} label="평균 동기화" value={stats.avgSyncTime} />
        </div>

        {/* 실행 모드 선택 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-4">
            <Label>실행 모드:</Label>
            <Tabs value={syncMode} onValueChange={(v) => setSyncMode(v as any)} className="w-auto">
              <TabsList>
                <TabsTrigger value="manual">수동 동기화</TabsTrigger>
                <TabsTrigger value="batch">배치 동기화</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {syncMode === 'batch' && (
            <div className="flex items-center gap-4">
              {isBatchRunning ? (
                <div className="flex items-center gap-3">
                  <Progress value={batchProgress} className="w-32" />
                  <span className="text-sm">{batchProgress}%</span>
                </div>
              ) : (
                <Button onClick={runBatchSync} disabled={stats.pendingCancel === 0}>
                  <Zap className="w-4 h-4 mr-2" />
                  배치 실행 ({stats.pendingCancel}건)
                </Button>
              )}
            </div>
          )}
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList>
            <TabsTrigger value="services">서비스 목록</TabsTrigger>
            <TabsTrigger value="logs">동기화 로그</TabsTrigger>
            <TabsTrigger value="monitoring">모니터링</TabsTrigger>
          </TabsList>

          {/* 서비스 목록 탭 */}
          <TabsContent value="services" className="space-y-4">
            {/* 필터 및 검색 */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="서비스 ID, 모아팹 ID, 서비스명, 기업명 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="취소대기">취소대기</SelectItem>
                  <SelectItem value="진행중">진행중</SelectItem>
                  <SelectItem value="완료">완료</SelectItem>
                  <SelectItem value="반려">반려</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 서비스 테이블 */}
            <div className="border rounded-lg">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input type="checkbox" className="rounded" />
                      </TableHead>
                      <TableHead>서비스 ID</TableHead>
                      <TableHead>모아팹 ID</TableHead>
                      <TableHead>서비스명</TableHead>
                      <TableHead>요청자</TableHead>
                      <TableHead>기업</TableHead>
                      <TableHead>예약일</TableHead>
                      <TableHead>금액</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>동기화</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.slice(0, 50).map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedServices.includes(service.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedServices([...selectedServices, service.id])
                              } else {
                                setSelectedServices(selectedServices.filter(id => id !== service.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs">{service.id}</TableCell>
                        <TableCell className="font-mono text-xs">{service.moafabId}</TableCell>
                        <TableCell className="text-sm">{service.serviceName}</TableCell>
                        <TableCell className="text-sm">{service.requestUser}</TableCell>
                        <TableCell className="text-sm">{service.company}</TableCell>
                        <TableCell className="text-sm">{service.scheduledDate}</TableCell>
                        <TableCell className="text-sm">₩{service.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            service.status === '취소대기' ? 'destructive' :
                            service.status === '반려' ? 'secondary' :
                            service.status === '완료' ? 'default' : 'outline'
                          }>
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {service.syncStatus === 'synced' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          {service.status === '취소대기' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => syncSingleService(service.id)}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {/* 페이지네이션 정보 */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{filteredServices.length}개 중 50개 표시</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">이전</Button>
                <Button variant="outline" size="sm">다음</Button>
              </div>
            </div>
          </TabsContent>

          {/* 동기화 로그 탭 */}
          <TabsContent value="logs" className="space-y-4">
            <ScrollArea className="h-[500px] w-full rounded-lg border p-4">
              <div className="space-y-2">
                {syncLogs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">동기화 로그가 없습니다.</p>
                ) : (
                  syncLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className={`p-1.5 rounded ${
                        log.status === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                        log.status === 'processing' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        'bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {log.status === 'success' ? <CheckCircle className="w-3 h-3 text-green-600" /> :
                         log.status === 'processing' ? <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" /> :
                         <XCircle className="w-3 h-3 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono">{log.timestamp}</span>
                          <Badge variant="outline" className="text-xs">{log.action}</Badge>
                        </div>
                        <p className="text-sm mt-1">{log.message}</p>
                        <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                          <span>서비스: {log.serviceId}</span>
                          <span>모아팹: {log.moafabId}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 모니터링 탭 */}
          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">실시간 동기화 현황</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">처리 대기</span>
                      <span className="font-semibold">{stats.pendingCancel}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">처리 중</span>
                      <span className="font-semibold">3건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">완료</span>
                      <span className="font-semibold">{stats.syncedToday}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">실패</span>
                      <span className="font-semibold text-red-600">{stats.failedSync}건</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">시스템 상태</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API 응답시간</span>
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                        정상 (120ms)
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">모아팹 연결</span>
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                        연결됨
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">DB 상태</span>
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                        정상
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">큐 대기</span>
                      <span className="font-semibold">12건</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Monitor className="h-4 w-4" />
              <AlertDescription>
                배치 작업은 매일 오전 2시, 오후 2시에 자동 실행됩니다.
                수동 실행은 권한이 있는 사용자만 가능합니다.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}