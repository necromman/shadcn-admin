import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'
import { LuUser, LuSearch, LuRocket, LuArrowRight, LuCircleCheck } from 'react-icons/lu'
import confetti from 'canvas-confetti'

export const Route = createFileRoute('/auth/signup/complete')({
  component: CompletePage,
})

function CompletePage() {
  const { accountInfo, reset } = useSignupFlow()

  useEffect(() => {
    // 축하 애니메이션
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const nextSteps = [
    {
      icon: LuUser,
      title: '프로필 설정하기',
      description: '프로필 사진과 추가 정보를 설정하세요',
      href: '/settings',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: LuSearch,
      title: '서비스 둘러보기',
      description: 'BRAND의 다양한 기능을 살펴보세요',
      href: '/',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: LuRocket,
      title: '첫 프로젝트 시작하기',
      description: '지금 바로 첫 프로젝트를 만들어보세요',
      href: '/projects',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  const handleLogin = () => {
    reset() // 회원가입 상태 초기화
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader />
      
      <Card className="mt-8 shadow-lg" style={{ minHeight: '650px' }}>
        <CardHeader>
          <div className="text-center mt-4">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <LuCircleCheck className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl">
              🎉 BRAND 회원이 되신 것을 환영합니다!
            </CardTitle>
            <CardDescription className="mt-2">
              회원가입이 성공적으로 완료되었습니다
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 가입 정보 요약 */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <h3 className="font-medium text-sm">가입 정보</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>아이디: <span className="font-medium text-foreground">{accountInfo.username || 'user123'}</span></p>
              {accountInfo.email && (
                <p>이메일: <span className="font-medium text-foreground">{accountInfo.email}</span></p>
              )}
              {accountInfo.nickname && (
                <p>닉네임: <span className="font-medium text-foreground">{accountInfo.nickname}</span></p>
              )}
            </div>
          </div>

          {/* 다음 단계 안내 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">다음 단계</h3>
            <div className="grid gap-3">
              {nextSteps.map((step) => {
                const Icon = step.icon
                return (
                  <Link
                    key={step.title}
                    to={step.href}
                    className="group"
                  >
                    <Card className="transition-all hover:shadow-md hover:border-primary/50">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className={`p-2.5 rounded-lg ${step.bgColor}`}>
                          <Icon className={`h-5 w-5 ${step.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{step.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {step.description}
                          </p>
                        </div>
                        <LuArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 혜택 안내 */}
          <div className="rounded-lg border bg-primary/5 p-4">
            <h4 className="font-medium text-sm mb-2">🎁 신규 회원 혜택</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• 첫 달 프리미엄 기능 무료 체험</li>
              <li>• 웰컴 포인트 5,000P 지급</li>
              <li>• 전용 고객 지원 서비스</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center gap-4">
          <Button
            size="lg"
            onClick={handleLogin}
            asChild
          >
            <Link to="/auth/login">
              로그인하기
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link to="/">
              메인으로
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}