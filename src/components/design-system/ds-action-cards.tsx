import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Calendar,
  MapPin,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

export function DSActionCards() {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [progress, setProgress] = useState(33)

  // 프로그레스 시뮬레이션
  const handleStartProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* 기본 액션 카드 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle>프로젝트 대시보드</CardTitle>
              <CardDescription>
                실시간 프로젝트 진행 상황을 모니터링하세요
              </CardDescription>
            </div>
            <Badge variant="secondary">Pro</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>12명 참여중</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>2일 남음</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">진행률</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1">
            대시보드 열기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* 이미지가 있는 액션 카드 */}
      <Card className="hover:shadow-lg transition-shadow overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 relative">
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop"
            alt="프로젝트 이미지"
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-4 right-4">신규</Badge>
        </div>
        <CardHeader>
          <CardTitle>UI/UX 디자인 시스템</CardTitle>
          <CardDescription>
            모던하고 일관된 디자인 시스템 구축
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>2024.03.15</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>서울</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">(4.5)</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1">확인</Button>
          <Button variant="outline" className="flex-1">취소</Button>
        </CardFooter>
      </Card>

      {/* 소셜 인터랙션 카드 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="flex-1">
              <CardTitle className="text-base">김개발</CardTitle>
              <CardDescription className="text-xs">2시간 전</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            새로운 디자인 시스템 컴포넌트를 추가했습니다. 
            피드백 부탁드립니다! 🚀
          </p>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">성능 개선</span>
            </div>
            <p className="text-xs text-muted-foreground">
              렌더링 속도 40% 향상
            </p>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-xs">24</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">12</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* 통계 액션 카드 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle>월간 리포트</CardTitle>
          <CardDescription>2024년 3월 성과 분석</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">총 방문자</p>
              <p className="text-2xl font-bold">45.2K</p>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">전환율</p>
              <p className="text-2xl font-bold">3.8%</p>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">목표 달성률</span>
              <span className="font-medium">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            다운로드
          </Button>
          <Button className="flex-1">
            상세 보기
          </Button>
        </CardFooter>
      </Card>

      {/* 작업 상태 카드 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>배포 상태</CardTitle>
            <Badge variant="outline" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              실행중
            </Badge>
          </div>
          <CardDescription>
            production 환경 배포 진행 상황
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">빌드 완료</span>
              <span className="text-xs text-muted-foreground ml-auto">2분 전</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">테스트 통과</span>
              <span className="text-xs text-muted-foreground ml-auto">1분 전</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <span className="text-sm">배포 진행중...</span>
              <span className="text-xs text-muted-foreground ml-auto">진행중</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-300" />
              <span className="text-sm text-muted-foreground">캐시 무효화</span>
              <span className="text-xs text-muted-foreground ml-auto">대기중</span>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">진행률</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleStartProgress}
          >
            다시 시작
          </Button>
          <Button variant="destructive" className="flex-1">
            중단
          </Button>
        </CardFooter>
      </Card>

      {/* 알림/경고 카드 */}
      <Card className="hover:shadow-lg transition-shadow border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <div className="space-y-1">
              <CardTitle>시스템 점검 예정</CardTitle>
              <CardDescription>
                3월 20일 02:00 - 04:00 (KST)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            데이터베이스 업그레이드 및 보안 패치 적용을 위한 정기 점검이 예정되어 있습니다. 
            해당 시간 동안 서비스 이용이 제한될 수 있습니다.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>예상 소요 시간: 2시간</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>영향 받는 서비스: API, 대시보드</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1">
            자세히 보기
          </Button>
          <Button variant="outline" className="flex-1">
            알림 설정
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}