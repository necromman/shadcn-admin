import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  FileText, Upload, Download, Database, RefreshCw, CheckCircle,
  AlertCircle, Clock, Folder, File, Image, FileSpreadsheet,
  Archive, Shield, Cloud, HardDrive, Trash2, Eye, Share2, HelpCircle, X, Settings, ChevronRight, Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

// 파일 타입 정의
const fileTypes = [
  { ext: 'pdf', icon: FileText, color: 'text-red-500' },
  { ext: 'doc', icon: FileText, color: 'text-blue-500' },
  { ext: 'docx', icon: FileText, color: 'text-blue-500' },
  { ext: 'xls', icon: FileSpreadsheet, color: 'text-green-500' },
  { ext: 'xlsx', icon: FileSpreadsheet, color: 'text-green-500' },
  { ext: 'hwp', icon: FileText, color: 'text-purple-500' },
  { ext: 'zip', icon: Archive, color: 'text-yellow-500' },
  { ext: 'jpg', icon: Image, color: 'text-pink-500' },
  { ext: 'png', icon: Image, color: 'text-pink-500' }
]

// 파일 카테고리
const fileCategories = [
  '계약서', '견적서', '시험성적서', '분석보고서',
  '연구노트', '특허문서', '회의록', '기술자료'
]

// Tour Guide Component - SFR-003과 동일한 방식으로 구현
const TourGuide = ({ showHelp }: { showHelp: boolean }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<{ title: string, content: string, icon: any } | null>(null)

  const tourSteps = [
    {
      selector: '[data-tour="storage-info"]',
      title: '스토리지 통계',
      content: '전체 파일 수, 총 용량, 동기화 현황 등\n실시간 스토리지 사용량과 동기화 상태를 모니터링합니다.',
      icon: HardDrive
    },
    {
      selector: '[data-tour="file-search"]',
      title: '파일 검색',
      content: '파일명, 프로젝트명, 부서명으로 검색 가능\n통합 검색창을 통해 첨부파일을 빠르게 찾을 수 있습니다.',
      icon: Search
    },
    {
      selector: '[data-tour="category-filter"]',
      title: '카테고리 필터',
      content: '문서 유형별로 파일 필터링\n계약서, 견적서, 시험성적서 등 문서 유형별로 필터링 가능합니다.',
      icon: Folder
    },
    {
      selector: '[data-tour="file-upload"]',
      title: '파일 업로드',
      content: '새로운 파일 업로드\n로컬 파일을 선택하여 KANC 시스템에 업로드합니다.',
      icon: Upload
    },
    {
      selector: '[data-tour="sync-controls"]',
      title: '배치 동기화',
      content: '파일 동기화 관리\n선택한 파일들을 즉시 동기화하거나, 일괄 동기화할 수 있습니다.',
      icon: RefreshCw
    },
    {
      selector: '[data-tour="file-table"]',
      title: '파일 목록 테이블',
      content: '파일명: 파일 이름과 버전, 다운로드 수\n동기화 상태: KANC/모아팹 저장 상태\n작업: 미리보기, 다운로드, 공유 기능',
      icon: Database
    },
    {
      selector: '[data-tour="sync-status"]',
      title: '동기화 큐',
      content: '실시간 동기화 진행 상태\n처리 중인 파일의 진행률, 재시도 횟수, 시작 시간을 확인합니다.',
      icon: Clock
    }
  ]

  useEffect(() => {
    if (!showHelp) {
      setSelectedIndex(null)
      setModalOpen(false)
      setModalContent(null)
    }
  }, [showHelp])

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

  if (!showHelp) return null

  return createPortal(
    <>
      {tourSteps.map((step, index) => {
        const element = document.querySelector(step.selector)
        if (!element) return null

        const rect = element.getBoundingClientRect()
        const Icon = step.icon
        const isSelected = selectedIndex === index

        // 툴팁 위치 계산
        const spaceBelow = window.innerHeight - rect.bottom
        const showBelow = spaceBelow > 150
        const tooltipTop = showBelow ? rect.bottom + 8 : rect.top - 120

        return (
          <div key={index}>
            {/* 하이라이트 박스 (클릭 가능) */}
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

              {/* 번호 표시 - 박스 내부 좌상단 */}
              <div className="absolute -top-2 -left-2 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {index + 1}
              </div>
            </div>

            {/* 설명 툴팁 - 선택된 경우에만 표시 */}
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

                {/* 화살표 꼬리 */}
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

      {/* 상세 설명 모달 */}
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

// 실무 파일 데이터 생성
const generateFileData = () => {
  const files = []
  const projects = [
    'PRJ-2025-001', 'PRJ-2025-002', 'PRJ-2025-003',
    'PRJ-2025-004', 'PRJ-2025-005', 'PRJ-2025-006'
  ]
  const departments = ['나노소자팀', '공정개발팀', '시험분석팀', '기업지원팀']

  for (let i = 0; i < 200; i++) {
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)]
    const fileName = `${fileCategories[Math.floor(Math.random() * fileCategories.length)]}_${
      projects[Math.floor(Math.random() * projects.length)]
    }_${String(i + 1).padStart(3, '0')}.${fileType.ext}`

    files.push({
      id: `FILE-${String(i + 1).padStart(6, '0')}`,
      name: fileName,
      type: fileType.ext,
      size: Math.floor(Math.random() * 50000000) + 100000,
      category: fileCategories[Math.floor(Math.random() * fileCategories.length)],
      project: projects[Math.floor(Math.random() * projects.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      uploadedBy: `user${Math.floor(Math.random() * 50) + 1}`,
      uploadDate: new Date(2025, 8, Math.floor(Math.random() * 30) + 1).toISOString(),
      kancStatus: 'stored',
      moafabStatus: Math.random() > 0.3 ? 'synced' : 'pending',
      syncStatus: Math.random() > 0.3 ? 'synced' : 'pending',
      lastSync: Math.random() > 0.3 ? new Date(2025, 8, Math.floor(Math.random() * 30) + 1).toISOString() : null,
      checksum: Math.random().toString(36).substring(2, 15),
      downloads: Math.floor(Math.random() * 100),
      version: Math.floor(Math.random() * 5) + 1
    })
  }

  return files
}

// 동기화 큐 데이터
const generateSyncQueue = () => {
  const queue = []
  for (let i = 0; i < 10; i++) {
    queue.push({
      id: `QUEUE-${String(i + 1).padStart(4, '0')}`,
      fileId: `FILE-${String(Math.floor(Math.random() * 200) + 1).padStart(6, '0')}`,
      action: Math.random() > 0.5 ? 'upload' : 'delete',
      status: Math.random() > 0.7 ? 'processing' : 'queued',
      progress: Math.floor(Math.random() * 100),
      startTime: new Date().toISOString(),
      retryCount: Math.floor(Math.random() * 3)
    })
  }
  return queue
}

// SFR-006: 첨부파일 Interface (고도화)
export function SFR006AdvancedDemo() {
  const [files, setFiles] = useState(generateFileData())
  const [syncQueue, setSyncQueue] = useState(generateSyncQueue())
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [syncFilter, setSyncFilter] = useState('all')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // 통계 계산
  const stats = {
    totalFiles: files.length,
    totalSize: files.reduce((sum, f) => sum + f.size, 0),
    syncedFiles: files.filter(f => f.syncStatus === 'synced').length,
    pendingFiles: files.filter(f => f.syncStatus === 'pending').length,
    todayUploads: files.filter(f => f.uploadDate.includes(new Date().toISOString().split('T')[0])).length,
    activeQueue: syncQueue.filter(q => q.status === 'processing').length
  }

  // 파일 필터링
  const filteredFiles = files.filter(f => {
    const matchSearch = searchTerm === '' ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.project.includes(searchTerm)

    const matchCategory = categoryFilter === 'all' || f.category === categoryFilter
    const matchProject = projectFilter === 'all' || f.project === projectFilter
    const matchSync = syncFilter === 'all' ||
      (syncFilter === 'synced' && f.syncStatus === 'synced') ||
      (syncFilter === 'pending' && f.syncStatus === 'pending')

    return matchSearch && matchCategory && matchProject && matchSync
  })

  // 카테고리별 통계
  const categoryStats = fileCategories.map(cat => {
    const catFiles = files.filter(f => f.category === cat)
    return {
      category: cat,
      count: catFiles.length,
      size: catFiles.reduce((sum, f) => sum + f.size, 0),
      synced: catFiles.filter(f => f.syncStatus === 'synced').length
    }
  })

  // 파일 업로드 시뮬레이션
  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // 새 파일 추가
          const newFile = {
            id: `FILE-${String(files.length + 1).padStart(6, '0')}`,
            name: `새문서_${Date.now()}.pdf`,
            type: 'pdf',
            size: 2500000,
            category: '계약서',
            project: 'PRJ-2025-001',
            department: '기업지원팀',
            uploadedBy: 'admin',
            uploadDate: new Date().toISOString(),
            kancStatus: 'stored',
            moafabStatus: 'pending',
            syncStatus: 'pending',
            lastSync: null,
            checksum: Math.random().toString(36).substring(2, 15),
            downloads: 0,
            version: 1
          }
          setFiles(prev => [newFile, ...prev])

          // 동기화 큐에 추가
          setSyncQueue(prev => [{
            id: `QUEUE-${String(prev.length + 1).padStart(4, '0')}`,
            fileId: newFile.id,
            action: 'upload',
            status: 'queued',
            progress: 0,
            startTime: new Date().toISOString(),
            retryCount: 0
          }, ...prev])

          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  // 배치 동기화
  const syncBatchFiles = () => {
    const pendingFiles = files.filter(f => f.syncStatus === 'pending')
    pendingFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles(prev => prev.map(f =>
          f.id === file.id
            ? { ...f, moafabStatus: 'synced', syncStatus: 'synced', lastSync: new Date().toISOString() }
            : f
        ))
      }, index * 500)
    })
  }

  // 파일 아이콘 가져오기
  const getFileIcon = (type: string) => {
    const fileType = fileTypes.find(ft => ft.ext === type)
    return fileType || { icon: FileText, color: 'text-gray-500' }
  }

  // 파일 크기 포맷
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  return (
    <Card className="w-full">
      {showHelp && <TourGuide showHelp={showHelp} />}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SFR-006: 첨부파일 Interface</CardTitle>
            <CardDescription className="mt-2">
              서비스 간 첨부파일 실시간 동기화 및 관리 시스템
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showHelp ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="gap-2"
            >
              {showHelp ? (
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
              <Cloud className="w-3 h-3 mr-1" />
              파일 동기화
            </Badge>
            {syncQueue.filter(q => q.status === 'processing').length > 0 && (
              <Badge variant="default" className="px-3 py-1">
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                동기화 중 ({syncQueue.filter(q => q.status === 'processing').length})
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 통계 대시보드 */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4" data-tour="storage-info">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">전체 파일</p>
                  <p className="text-xl font-bold">{stats.totalFiles}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs text-muted-foreground">총 용량</p>
                  <p className="text-xl font-bold">{(stats.totalSize / 1073741824).toFixed(1)}GB</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">동기화됨</p>
                  <p className="text-xl font-bold">{stats.syncedFiles}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-xs text-muted-foreground">대기중</p>
                  <p className="text-xl font-bold">{stats.pendingFiles}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs text-muted-foreground">오늘 업로드</p>
                  <p className="text-xl font-bold">{stats.todayUploads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs text-muted-foreground">처리중</p>
                  <p className="text-xl font-bold">{stats.activeQueue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 업로드 영역 */}
        {isUploading && (
          <Card className="border-primary">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">파일 업로드 중...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="files" className="w-full">
          <TabsList>
            <TabsTrigger value="files">파일 관리</TabsTrigger>
            <TabsTrigger value="queue" data-tour="sync-queue-tab">동기화 큐</TabsTrigger>
            <TabsTrigger value="category" data-tour="category-stats-tab">카테고리별</TabsTrigger>
            <TabsTrigger value="storage" data-tour="storage-tab">스토리지</TabsTrigger>
          </TabsList>

          {/* 파일 관리 탭 */}
          <TabsContent value="files" className="space-y-4">
            {/* 필터 및 액션 */}
            <div className="flex gap-2">
              <Input
                placeholder="파일명, 프로젝트 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
                data-tour="file-search"
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40" data-tour="category-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  {fileCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 프로젝트</SelectItem>
                  {['PRJ-2025-001', 'PRJ-2025-002', 'PRJ-2025-003'].map(prj => (
                    <SelectItem key={prj} value={prj}>{prj}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleFileUpload} disabled={isUploading} data-tour="file-upload">
                <Upload className="w-4 h-4 mr-2" />
                업로드
              </Button>
              <Button onClick={syncBatchFiles} variant="outline" data-tour="sync-controls">
                <RefreshCw className="w-4 h-4 mr-2" />
                배치 동기화
              </Button>
            </div>

            {/* 파일 테이블 */}
            <ScrollArea className="h-[800px] border rounded-lg" data-tour="file-table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>파일명</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>프로젝트</TableHead>
                    <TableHead>부서</TableHead>
                    <TableHead>크기</TableHead>
                    <TableHead>업로드</TableHead>
                    <TableHead>KANC</TableHead>
                    <TableHead>모아팹</TableHead>
                    <TableHead>동기화</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.slice(0, 50).map((file) => {
                    const fileIcon = getFileIcon(file.type)
                    const FileIcon = fileIcon.icon

                    return (
                      <TableRow key={file.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedFiles.includes(file.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFiles([...selectedFiles, file.id])
                              } else {
                                setSelectedFiles(selectedFiles.filter(id => id !== file.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileIcon className={`w-4 h-4 ${fileIcon.color}`} />
                            <div>
                              <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                              <p className="text-xs text-muted-foreground">v{file.version} • {file.downloads}회</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{file.category}</TableCell>
                        <TableCell className="text-sm font-mono">{file.project}</TableCell>
                        <TableCell className="text-sm">{file.department}</TableCell>
                        <TableCell className="text-sm">{formatFileSize(file.size)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(file.uploadDate).toLocaleDateString('ko-KR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-xs">
                            저장됨
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {file.moafabStatus === 'synced' ? (
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-xs">
                              동기화됨
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 text-xs">
                              대기
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {file.syncStatus === 'synced' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : syncQueue.some(q => q.fileId === file.id && q.status === 'processing') ? (
                            <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedFile(file)
                                setIsPreviewOpen(true)
                              }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          {/* 동기화 큐 탭 */}
          <TabsContent value="queue" className="space-y-4">
            <ScrollArea className="h-[800px] border rounded-lg p-4" data-tour="sync-status">
              <div className="space-y-3">
                {syncQueue.map((item) => {
                  const file = files.find(f => f.id === item.fileId)
                  return (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              item.status === 'processing'
                                ? 'bg-blue-100 dark:bg-blue-900/20'
                                : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              {item.action === 'upload' ?
                                <Upload className="w-4 h-4 text-blue-500" /> :
                                <Trash2 className="w-4 h-4 text-red-500" />
                              }
                            </div>
                            <div>
                              <p className="text-sm font-medium">{file?.name || item.fileId}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{item.action === 'upload' ? '업로드' : '삭제'}</span>
                                <span>재시도: {item.retryCount}</span>
                                <span>{new Date(item.startTime).toLocaleTimeString('ko-KR')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {item.status === 'processing' && (
                              <div className="flex items-center gap-2">
                                <Progress value={item.progress} className="w-24 h-2" />
                                <span className="text-xs">{item.progress}%</span>
                              </div>
                            )}
                            <Badge variant={item.status === 'processing' ? 'default' : 'secondary'}>
                              {item.status === 'processing' ? '처리중' : '대기'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 카테고리별 탭 */}
          <TabsContent value="category" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryStats.map((stat) => (
                <Card key={stat.category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{stat.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">파일 수</span>
                        <span className="font-medium">{stat.count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">총 용량</span>
                        <span className="font-medium">{formatFileSize(stat.size)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">동기화</span>
                        <span className="font-medium">{stat.synced}/{stat.count}</span>
                      </div>
                      <Progress value={(stat.synced / stat.count) * 100} className="h-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 스토리지 탭 */}
          <TabsContent value="storage" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4" data-tour="storage-info">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">KANC 스토리지</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>사용 용량</span>
                      <span className="font-medium">2.4TB / 10TB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">파일 타입별 사용량</p>
                    {['PDF (34%)', 'Excel (28%)', 'Word (22%)', '기타 (16%)'].map((type) => (
                      <div key={type} className="flex justify-between text-xs">
                        <span>{type.split(' ')[0]}</span>
                        <span className="text-muted-foreground">{type.split(' ')[1]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">모아팹 스토리지</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>사용 용량</span>
                      <span className="font-medium">2.2TB / 10TB</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      모든 파일은 AES-256 암호화로 보호되며, 전송 시 TLS 1.3을 사용합니다.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">동기화 정책</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>실시간 동기화</span>
                      <Badge variant="default">활성화</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>자동 백업</span>
                      <span className="text-sm">매일 02:00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>버전 관리</span>
                      <span className="text-sm">최대 10개</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>중복 제거</span>
                      <Badge variant="default">활성화</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>압축</span>
                      <span className="text-sm">자동 (&gt;10MB)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>보관 기간</span>
                      <span className="text-sm">3년</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* 파일 미리보기 다이얼로그 */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>파일 정보</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>파일명</Label>
                  <p className="text-muted-foreground">{selectedFile.name}</p>
                </div>
                <div>
                  <Label>크기</Label>
                  <p className="text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <Label>프로젝트</Label>
                  <p className="text-muted-foreground">{selectedFile.project}</p>
                </div>
                <div>
                  <Label>부서</Label>
                  <p className="text-muted-foreground">{selectedFile.department}</p>
                </div>
                <div>
                  <Label>업로드 일시</Label>
                  <p className="text-muted-foreground">{new Date(selectedFile.uploadDate).toLocaleString('ko-KR')}</p>
                </div>
                <div>
                  <Label>체크섬</Label>
                  <p className="text-muted-foreground font-mono text-xs">{selectedFile.checksum}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {showHelp && <TourGuide showHelp={showHelp} />}
    </Card>
  )
}