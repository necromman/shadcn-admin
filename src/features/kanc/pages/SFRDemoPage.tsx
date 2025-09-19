import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Info } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  SFR002Demo,
  SFR003Demo,
  SFR004Demo,
  SFR005Demo,
  SFR006Demo
} from '../components/demo'
import { TourProvider } from '../components/tour/TourProvider'

interface SFRDemoPageProps {
  demoId: string
  onBack: () => void
}

export function SFRDemoPage({ demoId: initialDemoId, onBack }: SFRDemoPageProps) {
  const [demoId, setDemoId] = useState(initialDemoId)

  const handleDemoChange = (newDemoId: string) => {
    setDemoId(newDemoId)
  }

  const renderDemo = () => {
    switch (demoId) {
      case 'sfr-002':
        return <SFR002Demo />
      case 'sfr-003':
        return <SFR003Demo />
      case 'sfr-004':
        return <SFR004Demo />
      case 'sfr-005':
        return <SFR005Demo />
      case 'sfr-006':
        return <SFR006Demo />
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">데모를 찾을 수 없습니다.</p>
          </div>
        )
    }
  }

  const getDemoTitle = () => {
    const titles: Record<string, string> = {
      'sfr-002': '채택 디자인 홈페이지 적용',
      'sfr-003': '모아팹 서비스 취소 정보 동기화',
      'sfr-004': '정산 담당자 정보 동기화',
      'sfr-005': '금액 실적 정보 동기화',
      'sfr-006': '첨부파일 Interface'
    }
    return titles[demoId] || '요구사항 데모'
  }

  return (
    <TourProvider demoId={demoId}>
      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <header className="sticky top-0 z-40 bg-card border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="gap-2"
                  data-tour="back-button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  뒤로가기
                </Button>
                <div className="w-px h-6 bg-border" />
                <div>
                  <h1 className="text-lg font-semibold">{demoId.toUpperCase()}</h1>
                  <p className="text-sm text-muted-foreground">{getDemoTitle()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* 요구사항 선택 드롭다운 */}
                <Select value={demoId} onValueChange={handleDemoChange}>
                  <SelectTrigger className="w-[200px]" data-tour="demo-selector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sfr-002">SFR-002: 디자인 적용</SelectItem>
                    <SelectItem value="sfr-003">SFR-003: 서비스 취소</SelectItem>
                    <SelectItem value="sfr-004">SFR-004: 정산 동기화</SelectItem>
                    <SelectItem value="sfr-005">SFR-005: 금액 동기화</SelectItem>
                    <SelectItem value="sfr-006">SFR-006: 파일 인터페이스</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="gap-2"
                  data-tour="home-button"
                >
                  <Home className="w-4 h-4" />
                  메인으로
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 - 여백 개선 */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {renderDemo()}
          </div>
        </main>

        {/* 플로팅 네비게이션 제거 - 상단 드롭다운으로 대체 */}
      </div>
    </TourProvider>
  )
}