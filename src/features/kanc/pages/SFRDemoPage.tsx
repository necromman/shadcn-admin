import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import {
  SFR002Demo,
  SFR003Demo,
  SFR004Demo,
  SFR005Demo,
  SFR006Demo
} from '../components/demo'

interface SFRDemoPageProps {
  demoId: string
  onBack: () => void
}

export function SFRDemoPage({ demoId, onBack }: SFRDemoPageProps) {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                뒤로가기
              </Button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
              <div>
                <h1 className="text-lg font-semibold">{demoId.toUpperCase()}</h1>
                <p className="text-sm text-muted-foreground">{getDemoTitle()}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              메인으로
            </Button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {renderDemo()}
        </div>
      </main>

      {/* 플로팅 네비게이션 */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const nextMap: Record<string, string> = {
              'sfr-002': 'sfr-003',
              'sfr-003': 'sfr-004',
              'sfr-004': 'sfr-005',
              'sfr-005': 'sfr-006',
              'sfr-006': 'sfr-002'
            }
            const nextDemo = nextMap[demoId]
            if (nextDemo) {
              window.history.replaceState(null, '', `#${nextDemo}`)
              window.location.reload()
            }
          }}
          className="shadow-lg"
        >
          다음 데모 →
        </Button>
      </div>
    </div>
  )
}