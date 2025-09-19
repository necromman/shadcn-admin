import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  User, CreditCard, Building, RefreshCw, Link, ArrowRight,
  AlertCircle, CheckCircle, Clock, Database, History, Shield,
  TrendingUp, Users, DollarSign, FileText, Settings, Edit, HelpCircle, X, ChevronRight
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'

// 결제 유형 정의
const paymentTypes = [
  { id: 'credit', name: '신용카드', icon: CreditCard },
  { id: 'transfer', name: '계좌이체', icon: Building },
  { id: 'research', name: '연구비카드', icon: FileText },
  { id: 'corporate', name: '법인카드', icon: Building }
]

// 실무 데이터 생성
const generateManagerData = () => {
  const departments = ['나노소자팀', '공정개발팀', '시험분석팀', '기업지원팀', '연구기획팀']
  const managers = []

  for (let i = 0; i < departments.length; i++) {
    for (let j = 0; j < 8; j++) {
      const names = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임']
      const firstName = names[Math.floor(Math.random() * names.length)]
      const middleNames = ['민', '수', '지', '현', '준', '서', '은', '영', '정', '성']
      const lastNames = ['호', '진', '수', '민', '우', '아', '희', '원', '준', '경']

      managers.push({
        id: `MGR-${String(i * 10 + j + 1).padStart(4, '0')}`,
        name: firstName + middleNames[Math.floor(Math.random() * middleNames.length)] + lastNames[Math.floor(Math.random() * lastNames.length)],
        department: departments[i],
        email: `user${i}${j}@kanc.re.kr`,
        phone: `010-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        paymentType: paymentTypes[Math.floor(Math.random() * paymentTypes.length)].id,
        moafabPaymentType: paymentTypes[Math.floor(Math.random() * paymentTypes.length)].id,
        syncStatus: Math.random() > 0.2 ? 'synced' : 'pending',
        lastSync: new Date(2025, 8, Math.floor(Math.random() * 30) + 1).toISOString(),
        projects: Math.floor(Math.random() * 20) + 1,
        totalAmount: Math.floor(Math.random() * 100000000) + 10000000
      })
    }
  }

  return managers
}

// 변경 이력 생성
const generateChangeHistory = () => {
  const history = []
  const actions = ['결제유형 변경', '담당자 변경', '부서 이동', '권한 변경']

  for (let i = 0; i < 50; i++) {
    history.push({
      id: i + 1,
      timestamp: new Date(2025, 8, 30 - i, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toISOString(),
      action: actions[Math.floor(Math.random() * actions.length)],
      user: `user${Math.floor(Math.random() * 40)}`,
      before: paymentTypes[Math.floor(Math.random() * paymentTypes.length)].name,
      after: paymentTypes[Math.floor(Math.random() * paymentTypes.length)].name,
      source: Math.random() > 0.5 ? 'KANC' : 'MOAFAB',
      status: 'completed'
    })
  }

  return history
}

// SFR-004: 정산 담당자 정보 동기화 (고도화)
export function SFR004AdvancedDemo() {
  const [managers, setManagers] = useState(generateManagerData())
  const [changeHistory, setChangeHistory] = useState(generateChangeHistory())
  const [selectedManager, setSelectedManager] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [syncFilter, setSyncFilter] = useState('all')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncQueue, setSyncQueue] = useState<string[]>([])
  const [showTourHelp, setShowTourHelp] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)

  // 투어 가이드 데이터
  const tourSteps = [
    {
      selector: '[data-tour="stats-cards"]',
      title: '통계 대시보드',
      content: '전체 담당자, 동기화 상태, 오늘 변경 건수를 한눈에 확인할 수 있습니다.',
      icon: Users
    },
    {
      selector: '[data-tour="manager-filters"]',
      title: '담당자 검색',
      content: '이름, 이메일, 부서로 담당자를 빠르게 검색할 수 있습니다.',
      icon: User
    },
    {
      selector: '[data-tour="sync-all-button"]',
      title: '전체 동기화',
      content: '모든 대기 중인 담당자 정보를 한 번에 동기화합니다.',
      icon: RefreshCw
    },
    {
      selector: '[data-tour="manager-table"]',
      title: '담당자 테이블',
      content: '담당자 정보와 결제 유형을 확인하고 관리할 수 있습니다.',
      icon: Database
    },
    {
      selector: '[data-tour="history-tab"]',
      title: '변경 이력',
      content: '담당자 정보 변경 이력을 실시간으로 확인할 수 있습니다.',
      icon: History
    },
    {
      selector: '[data-tour="mapping-tab"]',
      title: '매핑 규칙',
      content: 'KANC와 모아팹 간 필드 매핑 규칙을 확인할 수 있습니다.',
      icon: Link
    }
  ]

  // 투어 가이드 컴포넌트
  const TourGuide = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<{ title: string, content: string, icon: any } | null>(null)

    useEffect(() => {
      if (!showTourHelp) {
        setSelectedIndex(null)
        setModalOpen(false)
        setModalContent(null)
      }
    }, [showTourHelp])

    const handleBoxClick = (index: number) => {
      if (selectedIndex === index) {
        setSelectedIndex(null)
      } else {
        setSelectedIndex(index)
      }
    }

    const openDetailModal = (step: typeof tourSteps[0]) => {
      setModalContent({
        title: step.title,
        content: step.content,
        icon: step.icon
      })
      setModalOpen(true)
    }

    if (!showTourHelp) return null

    return createPortal(
      <>
        {tourSteps.map((step, index) => {
          const element = document.querySelector(step.selector)
          if (!element) return null

          const rect = element.getBoundingClientRect()
          const Icon = step.icon
          const isSelected = selectedIndex === index

          const spaceBelow = window.innerHeight - rect.bottom
          const showBelow = spaceBelow > 150
          const tooltipTop = showBelow ? rect.bottom + 8 : rect.top - 120

          return (
            <div key={index}>
              <div
                className="fixed z-[9998] cursor-pointer"
                style={{
                  top: rect.top - 2,
                  left: rect.left - 2,
                  width: rect.width + 4,
                  height: rect.height + 4,
                }}
                onClick={() => handleBoxClick(index)}
              >
                <div className={`absolute inset-0 ring-2 ring-offset-2 rounded-lg transition-all ${
                  isSelected ? 'ring-blue-600 ring-offset-blue-100 dark:ring-offset-blue-900/20' : 'ring-blue-500 animate-pulse'
                }`} />
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>

              {isSelected && (
                <div
                  className="fixed z-[9999] animate-in fade-in slide-in-from-bottom-1 duration-300"
                  style={{
                    top: tooltipTop,
                    left: Math.min(rect.left, window.innerWidth - 350),
                    width: '320px'
                  }}
                >
                  <Card className="shadow-xl border-2 border-blue-600">
                    <CardContent className="py-3 px-4">
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.content.split('\n')[0]}
                          </p>
                          {(step.content.includes('\n') || step.content.length > 60) && (
                            <Button
                              variant="link"
                              size="sm"
                              className="px-0 h-auto mt-1 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                openDetailModal(step)
                              }}
                            >
                              더보기
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-6 h-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedIndex(null)
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <div
                    className={`absolute w-3 h-3 bg-white dark:bg-gray-950 border-2 border-blue-600 transform rotate-45 ${
                      showBelow
                        ? 'top-[-8px] left-4 border-b-0 border-r-0'
                        : 'bottom-[-8px] left-4 border-t-0 border-l-0'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md z-[10000]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {modalContent && (
                  <>
                    {React.createElement(modalContent.icon, { className: "w-5 h-5 text-blue-600" })}
                    <span>{modalContent.title}</span>
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-3 whitespace-pre-line">
              {modalContent?.content}
            </DialogDescription>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                확인
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>,
      document.body
    )
  }

  // 통계 데이터 - 실제 데이터로 초기화
  const stats = {
    totalManagers: managers.length,
    syncedManagers: managers.filter(m => m.syncStatus === 'synced').length,
    pendingSync: managers.filter(m => m.syncStatus === 'pending').length,
    todayChanges: 12  // 실제 오늘 변경 건수
  }

  // 실시간 동기화 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      if (syncQueue.length > 0) {
        const managerId = syncQueue[0]
        setSyncQueue(prev => prev.slice(1))

        setManagers(prev => prev.map(m =>
          m.id === managerId
            ? { ...m, syncStatus: 'synced', moafabPaymentType: m.paymentType, lastSync: new Date().toISOString() }
            : m
        ))

        setChangeHistory(prev => [{
          id: prev.length + 1,
          timestamp: new Date().toISOString(),
          action: '자동 동기화',
          user: 'SYSTEM',
          before: '-',
          after: managers.find(m => m.id === managerId)?.paymentType || '-',
          source: 'KANC',
          status: 'completed'
        }, ...prev])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [syncQueue, managers])

  // 담당자 검색 필터
  const filteredManagers = managers.filter(m => {
    const matchesSearch = searchTerm === '' ||
      m.name.includes(searchTerm) ||
      m.email.includes(searchTerm) ||
      m.department.includes(searchTerm)

    const matchesDept = departmentFilter === 'all' || m.department === departmentFilter
    const matchesSync = syncFilter === 'all' ||
      (syncFilter === 'synced' && m.syncStatus === 'synced') ||
      (syncFilter === 'pending' && m.syncStatus === 'pending')

    return matchesSearch && matchesDept && matchesSync
  })

  // 개별 동기화
  const syncManager = (managerId: string) => {
    setSyncQueue(prev => [...prev, managerId])
  }

  // 전체 동기화
  const syncAllPending = () => {
    const pendingManagers = managers.filter(m => m.syncStatus === 'pending').map(m => m.id)
    setSyncQueue(pendingManagers)
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), pendingManagers.length * 2000)
  }

  // 결제 유형 변경
  const updatePaymentType = (managerId: string, newType: string) => {
    const manager = managers.find(m => m.id === managerId)
    if (!manager) return

    setManagers(prev => prev.map(m =>
      m.id === managerId
        ? { ...m, paymentType: newType, syncStatus: 'pending' }
        : m
    ))

    setChangeHistory(prev => [{
      id: prev.length + 1,
      timestamp: new Date().toISOString(),
      action: '결제유형 변경',
      user: 'admin',
      before: manager.paymentType,
      after: newType,
      source: 'KANC',
      status: 'completed'
    }, ...prev])

    // 자동 동기화 큐에 추가
    setTimeout(() => syncManager(managerId), 500)
  }

  return (
    <Card className="w-full" ref={componentRef}>
      <TourGuide />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-004: 정산 담당자 정보 동기화</CardTitle>
            <CardDescription className="mt-2">
              기술원 ↔ 모아팹 정산 담당자 및 결제 유형 양방향 실시간 동기화
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showTourHelp ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTourHelp(!showTourHelp)}
              className="gap-2"
            >
              {showTourHelp ? (
                <>
                  <X className="w-4 h-4" />
                  도움말 닫기
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4" />
                  도움말
                </>
              )}
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              <Link className="w-3 h-3 mr-1" />
              양방향 동기화
            </Badge>
            {syncQueue.length > 0 && (
              <Badge variant="default" className="px-3 py-1">
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                동기화 중 ({syncQueue.length})
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-tour="stats-cards">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalManagers}</p>
                  <p className="text-xs text-muted-foreground">전체 담당자</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.syncedManagers}</p>
                  <p className="text-xs text-muted-foreground">동기화 완료</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.pendingSync}</p>
                  <p className="text-xs text-muted-foreground">동기화 대기</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <History className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.todayChanges}</p>
                  <p className="text-xs text-muted-foreground">오늘 변경</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="managers" className="w-full">
          <TabsList>
            <TabsTrigger value="managers">담당자 관리</TabsTrigger>
            <TabsTrigger value="history" data-tour="history-tab">변경 이력</TabsTrigger>
            <TabsTrigger value="mapping" data-tour="mapping-tab">매핑 규칙</TabsTrigger>
          </TabsList>

          {/* 담당자 관리 탭 */}
          <TabsContent value="managers" className="space-y-4">
            {/* 검색 및 필터 */}
            <div className="flex gap-2" data-tour="manager-filters">
              <Input
                placeholder="이름, 이메일, 부서 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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
              <Select value={syncFilter} onValueChange={setSyncFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="synced">동기화됨</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={syncAllPending} disabled={stats.pendingSync === 0 || isSyncing} data-tour="sync-all-button">
                <RefreshCw className="w-4 h-4 mr-2" />
                전체 동기화
              </Button>
            </div>

            {/* 담당자 테이블 */}
            <div className="border rounded-lg" data-tour="manager-table">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>담당자 ID</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>부서</TableHead>
                      <TableHead>이메일</TableHead>
                      <TableHead>KANC 결제유형</TableHead>
                      <TableHead>모아팹 결제유형</TableHead>
                      <TableHead>프로젝트</TableHead>
                      <TableHead>총 금액</TableHead>
                      <TableHead>동기화</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredManagers.slice(0, 20).map((manager) => {
                      const PaymentIcon = paymentTypes.find(p => p.id === manager.paymentType)?.icon || CreditCard
                      const MoafabIcon = paymentTypes.find(p => p.id === manager.moafabPaymentType)?.icon || CreditCard

                      return (
                        <TableRow key={manager.id}>
                          <TableCell className="font-mono text-xs">{manager.id}</TableCell>
                          <TableCell className="font-medium">{manager.name}</TableCell>
                          <TableCell>{manager.department}</TableCell>
                          <TableCell className="text-sm">{manager.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <PaymentIcon className="w-3 h-3" />
                              <span className="text-sm">
                                {paymentTypes.find(p => p.id === manager.paymentType)?.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MoafabIcon className="w-3 h-3" />
                              <span className="text-sm">
                                {paymentTypes.find(p => p.id === manager.moafabPaymentType)?.name}
                              </span>
                              {manager.paymentType !== manager.moafabPaymentType && (
                                <Badge variant="outline" className="ml-1 text-xs bg-yellow-50 dark:bg-yellow-900/20">
                                  불일치
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{manager.projects}</TableCell>
                          <TableCell>₩{(manager.totalAmount / 1000000).toFixed(0)}M</TableCell>
                          <TableCell>
                            {manager.syncStatus === 'synced' ? (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                동기화됨
                              </Badge>
                            ) : syncQueue.includes(manager.id) ? (
                              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                처리중
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20">
                                <Clock className="w-3 h-3 mr-1" />
                                대기
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedManager(manager)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              {manager.syncStatus === 'pending' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => syncManager(manager.id)}
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 변경 이력 탭 */}
          <TabsContent value="history" className="space-y-4">
            <ScrollArea className="h-[500px] border rounded-lg p-4">
              <div className="space-y-2">
                {changeHistory.slice(0, 30).map((history) => (
                  <div key={history.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className={`p-2 rounded-lg ${
                      history.source === 'KANC' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      {history.source === 'KANC' ?
                        <Database className="w-4 h-4 text-blue-600" /> :
                        <Shield className="w-4 h-4 text-green-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{history.action}</span>
                        <Badge variant="outline" className="text-xs">{history.source}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{new Date(history.timestamp).toLocaleString('ko-KR')}</span>
                        <span>실행자: {history.user}</span>
                        {history.before !== '-' && (
                          <span className="flex items-center gap-1">
                            {history.before}
                            <ArrowRight className="w-3 h-3" />
                            {history.after}
                          </span>
                        )}
                      </div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 매핑 규칙 탭 */}
          <TabsContent value="mapping" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">KANC → 모아팹 매핑</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>KANC 필드</TableHead>
                        <TableHead>모아팹 필드</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>정산 담당자</TableCell>
                        <TableCell>대표 결제자</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>결제 유형</TableCell>
                        <TableCell>결제 방식</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>부서 코드</TableCell>
                        <TableCell>조직 코드</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>담당자 전화번호</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">동기화 정책</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">실시간 동기화</span>
                    <Badge variant="default">활성화</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">동기화 주기</span>
                    <span className="text-sm font-medium">5분</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">충돌 처리</span>
                    <span className="text-sm font-medium">최신 우선</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">실패 재시도</span>
                    <span className="text-sm font-medium">3회</span>
                  </div>
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      양쪽 시스템에서 동시 변경 시 타임스탬프 기준으로 최신 데이터가 우선 적용됩니다.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* 수정 다이얼로그 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>결제 유형 변경</DialogTitle>
          </DialogHeader>
          {selectedManager && (
            <div className="space-y-4">
              <div>
                <Label>담당자</Label>
                <p className="text-sm text-muted-foreground">{selectedManager.name} ({selectedManager.department})</p>
              </div>
              <div>
                <Label>현재 결제 유형</Label>
                <p className="text-sm text-muted-foreground">
                  {paymentTypes.find(p => p.id === selectedManager.paymentType)?.name}
                </p>
              </div>
              <div>
                <Label>새 결제 유형</Label>
                <Select
                  defaultValue={selectedManager.paymentType}
                  onValueChange={(value) => {
                    updatePaymentType(selectedManager.id, value)
                    setIsEditDialogOpen(false)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <type.icon className="w-4 h-4" />
                          {type.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}