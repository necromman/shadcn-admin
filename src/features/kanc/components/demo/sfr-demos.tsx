import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  CheckCircle, XCircle, RefreshCw, FileText, DollarSign,
  User, Link, Upload, Download, AlertCircle, ArrowRight,
  Zap, Shield, Globe, Layers, Activity, Database
} from 'lucide-react'

// SFR-002: 채택 디자인 홈페이지 적용 데모
export function SFR002Demo() {
  const [activeFeature, setActiveFeature] = useState('responsive')

  const features = {
    responsive: {
      title: '반응형 디자인',
      icon: <Globe className="w-5 h-5" />,
      description: '모든 디바이스에서 최적화된 UX 제공',
      details: ['모바일 퍼스트 설계', '태블릿 최적화', '데스크톱 확장형 레이아웃']
    },
    navigation: {
      title: '3단계 네비게이션',
      icon: <Layers className="w-5 h-5" />,
      description: '직관적인 3단계 메뉴 구조',
      details: ['메인 카테고리', '서브 카테고리', '상세 페이지']
    },
    performance: {
      title: '최적화된 성능',
      icon: <Zap className="w-5 h-5" />,
      description: 'ActiveX 없는 모던 웹 표준',
      details: ['HTML5 기반', 'CSS3 애니메이션', 'JavaScript ES6+']
    },
    accessibility: {
      title: '웹 접근성',
      icon: <Shield className="w-5 h-5" />,
      description: 'WCAG 2.1 AA 준수',
      details: ['스크린리더 지원', '키보드 네비게이션', '고대비 모드']
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-002: 채택 디자인 홈페이지 적용</CardTitle>
            <CardDescription className="mt-2">
              이용자 중심의 홈페이지 구축 - 웹 표준 준수 및 반응형 디자인
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            실시간 적용
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 주요 특징 탭 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">디자인 원칙</h3>
            {Object.entries(features).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setActiveFeature(key)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  activeFeature === key
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`p-2 rounded-md ${
                  activeFeature === key ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  {feature.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">구현 상세</h3>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {features[activeFeature as keyof typeof features].icon}
                    <h4 className="font-semibold">
                      {features[activeFeature as keyof typeof features].title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {features[activeFeature as keyof typeof features].description}
                  </p>
                  <ul className="space-y-2">
                    {features[activeFeature as keyof typeof features].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 성능 지표 */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">성능 지표</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>페이지 로딩 속도</span>
                  <span className="text-green-600 font-semibold">1.2초</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>웹 접근성 점수</span>
                  <span className="text-green-600 font-semibold">95점</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// SFR-003: 모아팹 서비스 취소 정보 동기화 데모
export function SFR003Demo() {
  const [services, setServices] = useState([
    { id: 'SVC-001', name: 'E-Beam Lithography', status: '진행중', moafabStatus: '정상' },
    { id: 'SVC-002', name: 'PECVD 공정', status: '완료', moafabStatus: '정상' },
    { id: 'SVC-003', name: 'Cu Etching', status: '진행중', moafabStatus: '정상' }
  ])

  const [syncLog, setSyncLog] = useState<string[]>([])

  const cancelService = (serviceId: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setSyncLog(prev => [`${timestamp}: 서비스 ${serviceId} 취소 요청`, ...prev].slice(0, 5))

    setTimeout(() => {
      setServices(prev => prev.map(svc =>
        svc.id === serviceId
          ? { ...svc, status: '반려', moafabStatus: '모아팹 취소 건' }
          : svc
      ))
      setSyncLog(prev => [`${timestamp}: 동기화 완료 - ${serviceId}`, ...prev].slice(0, 5))
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-003: 모아팹 서비스 취소 정보 동기화</CardTitle>
            <CardDescription className="mt-2">
              모아팹에서 취소된 서비스 정보를 기술원 시스템에 실시간 반영
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <RefreshCw className="w-3 h-3 mr-1" />
            실시간 동기화
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 서비스 목록 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">서비스 현황</h3>
            <div className="space-y-3">
              {services.map(service => (
                <div key={service.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">서비스 ID: {service.id}</p>
                    </div>
                    <Badge variant={service.status === '반려' ? 'destructive' : 'default'}>
                      {service.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">모아팹 상태:</span>
                    <span className={service.moafabStatus === '모아팹 취소 건' ? 'text-red-600' : ''}>
                      {service.moafabStatus}
                    </span>
                  </div>

                  {service.status !== '반려' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cancelService(service.id)}
                      className="w-full"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      서비스 취소
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 동기화 로그 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">동기화 로그</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {syncLog.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      동기화 이력이 없습니다
                    </p>
                  ) : (
                    syncLog.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Activity className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 동기화 플로우 */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                모아팹에서 서비스 취소 시 자동으로 기술원 시스템에 반영됩니다.
                상태는 '반려'로, 코멘트는 '모아팹 취소 건'으로 표시됩니다.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// SFR-004: 정산 담당자 정보 동기화 데모
export function SFR004Demo() {
  const [kancManager, setKancManager] = useState('김철수 (신용카드)')
  const [moafabManager, setMoafabManager] = useState('김철수 (신용카드)')
  const [syncDirection, setSyncDirection] = useState<'kanc-to-moafab' | 'moafab-to-kanc' | null>(null)

  const managers = [
    '김철수 (신용카드)',
    '이영희 (계좌이체)',
    '박민수 (연구비카드)',
    '정수진 (법인카드)'
  ]

  const handleKancChange = (value: string) => {
    setKancManager(value)
    setSyncDirection('kanc-to-moafab')
    setTimeout(() => {
      setMoafabManager(value)
      setSyncDirection(null)
    }, 1500)
  }

  const handleMoafabChange = (value: string) => {
    setMoafabManager(value)
    setSyncDirection('moafab-to-kanc')
    setTimeout(() => {
      setKancManager(value)
      setSyncDirection(null)
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-004: 정산 담당자 정보 동기화</CardTitle>
            <CardDescription className="mt-2">
              기술원과 모아팹 간 정산 담당자 및 결제 유형 정보 양방향 동기화
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <Link className="w-3 h-3 mr-1" />
            양방향 동기화
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* 기술원 시스템 */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">기술원 시스템</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kanc-manager">정산 담당자</Label>
                <Select value={kancManager} onValueChange={handleKancChange}>
                  <SelectTrigger id="kanc-manager">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map(manager => (
                      <SelectItem key={manager} value={manager}>
                        {manager}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  현재 담당자: {kancManager}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 동기화 상태 */}
          <div className="flex items-center justify-center">
            <div className="text-center space-y-3">
              {syncDirection === 'kanc-to-moafab' && (
                <ArrowRight className="w-8 h-8 text-blue-500 animate-pulse mx-auto" />
              )}
              {syncDirection === 'moafab-to-kanc' && (
                <ArrowRight className="w-8 h-8 text-green-500 animate-pulse mx-auto rotate-180" />
              )}
              {!syncDirection && (
                <RefreshCw className="w-8 h-8 text-gray-400 mx-auto" />
              )}
              <p className="text-sm font-medium">
                {syncDirection ? '동기화 중...' : '동기화 대기'}
              </p>
            </div>
          </div>

          {/* 모아팹 시스템 */}
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">모아팹 시스템</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="moafab-manager">대표 결제 유형</Label>
                <Select value={moafabManager} onValueChange={handleMoafabChange}>
                  <SelectTrigger id="moafab-manager">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map(manager => (
                      <SelectItem key={manager} value={manager}>
                        {manager}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-300">
                  현재 결제유형: {moafabManager}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            양쪽 시스템에서 정보 변경 시 자동으로 상대 시스템에 반영됩니다.
            변경 권한이 있는 담당자만 수정 가능합니다.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

// SFR-005: 금액 실적 정보 동기화 데모
export function SFR005Demo() {
  const [revenueData, setRevenueData] = useState([
    { month: '2025.07', kanc: 125000000, moafab: 125000000, synced: true },
    { month: '2025.08', kanc: 138000000, moafab: 138000000, synced: true },
    { month: '2025.09', kanc: 145000000, moafab: 0, synced: false }
  ])

  const syncRevenue = (month: string) => {
    setRevenueData(prev => prev.map(data =>
      data.month === month
        ? { ...data, moafab: data.kanc, synced: true }
        : data
    ))
  }

  const totalKanc = revenueData.reduce((sum, d) => sum + d.kanc, 0)
  const totalMoafab = revenueData.reduce((sum, d) => sum + d.moafab, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-005: 금액 실적 정보 동기화</CardTitle>
            <CardDescription className="mt-2">
              기술원 금액 관련 실적 정보를 모아팹 시스템으로 전송
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <DollarSign className="w-3 h-3 mr-1" />
            실적 동기화
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 실적 현황 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">기간</th>
                <th className="text-right py-2">기술원 실적</th>
                <th className="text-right py-2">모아팹 실적</th>
                <th className="text-center py-2">동기화 상태</th>
                <th className="text-center py-2">작업</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((data) => (
                <tr key={data.month} className="border-b">
                  <td className="py-3">{data.month}</td>
                  <td className="text-right font-medium">
                    ₩{data.kanc.toLocaleString()}
                  </td>
                  <td className="text-right">
                    ₩{data.moafab.toLocaleString()}
                  </td>
                  <td className="text-center">
                    {data.synced ? (
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        동기화됨
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        대기중
                      </Badge>
                    )}
                  </td>
                  <td className="text-center">
                    {!data.synced && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => syncRevenue(data.month)}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        동기화
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold">
                <td className="py-3">합계</td>
                <td className="text-right">₩{totalKanc.toLocaleString()}</td>
                <td className="text-right">₩{totalMoafab.toLocaleString()}</td>
                <td colSpan={2} className="text-center">
                  {totalKanc === totalMoafab ? (
                    <span className="text-green-600">일치</span>
                  ) : (
                    <span className="text-yellow-600">불일치</span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* 동기화 정보 */}
        <div className="grid md:grid-cols-2 gap-4">
          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              매월 1일 자동으로 전월 실적이 동기화됩니다.
              수동 동기화도 언제든 가능합니다.
            </AlertDescription>
          </Alert>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              인터페이스 정의서에 따라 암호화된 채널로 전송됩니다.
              전송 로그는 90일간 보관됩니다.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}

// SFR-006: 첨부파일 Interface 데모
export function SFR006Demo() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle')
  const [files, setFiles] = useState<Array<{name: string, size: string, synced: boolean}>>([])

  const handleFileUpload = () => {
    setUploadStatus('uploading')
    setTimeout(() => {
      setUploadStatus('success')
      setFiles(prev => [...prev, {
        name: `테스트문서_${Date.now()}.pdf`,
        size: '2.3MB',
        synced: false
      }])
      setTimeout(() => {
        setFiles(prev => prev.map((f, idx) =>
          idx === prev.length - 1 ? { ...f, synced: true } : f
        ))
      }, 2000)
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-006: 첨부파일 Interface</CardTitle>
            <CardDescription className="mt-2">
              서비스 간 첨부파일 정보 실시간 반영 및 동기화
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <FileText className="w-3 h-3 mr-1" />
            파일 동기화
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 파일 업로드 영역 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">파일 업로드</h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <p className="text-sm text-muted-foreground">
                파일을 드래그하거나 클릭하여 업로드
              </p>
              <Button
                onClick={handleFileUpload}
                disabled={uploadStatus === 'uploading'}
              >
                {uploadStatus === 'uploading' ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    업로드 중...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    파일 선택
                  </>
                )}
              </Button>
            </div>

            {/* 지원 형식 */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                지원 형식: PDF, DOC, DOCX, XLS, XLSX, HWP, ZIP
                <br />
                최대 크기: 100MB
              </AlertDescription>
            </Alert>
          </div>

          {/* 동기화된 파일 목록 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">동기화된 파일</h3>
            <div className="space-y-2">
              {files.length === 0 ? (
                <Card className="p-8">
                  <p className="text-sm text-muted-foreground text-center">
                    업로드된 파일이 없습니다
                  </p>
                </Card>
              ) : (
                files.map((file, idx) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.synced ? (
                          <Badge variant="outline" className="text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            동기화됨
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-600">
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            동기화중
                          </Badge>
                        )}
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* 동기화 프로세스 */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold mb-2">동기화 프로세스</h4>
              <ol className="text-xs space-y-1 text-muted-foreground">
                <li>1. 파일 업로드 시 메타데이터 생성</li>
                <li>2. 모아팹 시스템으로 정보 전송</li>
                <li>3. 파일 스토리지 동기화</li>
                <li>4. 양측 시스템에서 접근 가능</li>
              </ol>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}