import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'
import { LuCheck, LuLoader } from 'react-icons/lu'
import { type VerifyMethod } from '@/features/auth/types/auth.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

export const Route = createFileRoute('/auth/signup/verify-method')({
  component: VerifyMethodPage,
})

function VerifyMethodPage() {
  const navigate = useNavigate()
  const { setVerifyMethod, setStep } = useSignupFlow()
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authProgress, setAuthProgress] = useState(0)
  const [isAuthCompleted, setIsAuthCompleted] = useState(false)
  const [authMethod, setAuthMethod] = useState<VerifyMethod | null>(null)

  const handleCardClick = (method: VerifyMethod) => {
    setAuthMethod(method)
    setVerifyMethod(method)  // 인증 방식 저장
    setIsAuthDialogOpen(true)
    setAuthProgress(0)
    setIsAuthCompleted(false)
  }

  useEffect(() => {
    if (isAuthDialogOpen && !isAuthCompleted) {
      const timer = setTimeout(() => {
        setAuthProgress(100)
        setIsAuthCompleted(true)
      }, 1000) // 1초 후 인증 완료

      return () => clearTimeout(timer)
    }
  }, [isAuthDialogOpen, isAuthCompleted])

  useEffect(() => {
    if (authProgress < 100 && isAuthDialogOpen && !isAuthCompleted) {
      const timer = setTimeout(() => {
        setAuthProgress((prev) => Math.min(prev + 20, 90))
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [authProgress, isAuthDialogOpen, isAuthCompleted])

  const handleAuthComplete = () => {
    if (authMethod) {
      setStep(5)  // Step 5: 정보입력
      navigate({ to: '/auth/signup/info' })  // 바로 정보입력 화면으로
    }
  }

  const verifyMethods = [
    {
      value: 'mobile-id' as VerifyMethod,
      title: '모바일 신분증',
      description: '스마트폰에 저장된 신분증',
      features: '가장 빠르고 간편한 인증',
    },
    {
      value: 'simple' as VerifyMethod,
      title: '간편인증',
      description: '네이버, 카카오, 토스 등',
      features: '익숙한 서비스로 간편하게',
    },
    {
      value: 'cert' as VerifyMethod,
      title: '공동인증서',
      description: '구 공인인증서',
      features: 'PC나 USB에 저장된 인증서',
    },
    {
      value: 'finance' as VerifyMethod,
      title: '금융인증서',
      description: '클라우드 기반 인증서',
      features: '은행 앱에서 바로 사용',
    },
  ]

  const getMethodTitle = (value: VerifyMethod | null) => {
    const method = verifyMethods.find(m => m.value === value)
    return method?.title || ''
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader 
        title="회원가입" 
        description="본인 인증 방식을 선택해주세요"
      />
      
      <Card className="mt-8 shadow-lg" style={{ minHeight: '550px' }}>
        <CardHeader className="pb-4" />
        
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {verifyMethods.map((method) => {
              return (
                <Card
                  key={method.value}
                  className="relative cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleCardClick(method.value)}
                >
                  <CardHeader className="pb-3">
                    <div>
                      <CardTitle className="text-base">{method.title}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {method.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {method.features}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-2">본인 인증 안내</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• 본인 인증은 회원가입 시 1회만 진행됩니다</li>
              <li>• 인증된 정보는 안전하게 암호화되어 보관됩니다</li>
              <li>• 만 14세 이상만 회원가입이 가능합니다</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="outline"
            onClick={() => navigate({ to: '/auth/signup/user-type' })}
          >
            이전
          </Button>
        </CardFooter>
      </Card>

      {/* 인증 다이얼로그 */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getMethodTitle(authMethod)} 인증</DialogTitle>
            <DialogDescription>
              {!isAuthCompleted 
                ? '본인 인증을 진행하고 있습니다. 잠시만 기다려주세요.'
                : '본인 인증이 완료되었습니다.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!isAuthCompleted ? (
              <>
                <div className="flex items-center justify-center py-8">
                  <LuLoader className="h-8 w-8 animate-spin text-primary" />
                </div>
                <Progress value={authProgress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground">
                  인증 진행 중... {authProgress}%
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center py-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <LuCheck className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <p className="text-sm text-center font-medium">
                  성공적으로 인증되었습니다!
                </p>
                <p className="text-xs text-center text-muted-foreground">
                  인증 완료 버튼을 눌러 다음 단계로 진행해주세요.
                </p>
              </>
            )}
          </div>
          
          <DialogFooter>
            {!isAuthCompleted ? (
              <Button 
                variant="outline" 
                onClick={() => setIsAuthDialogOpen(false)}
                className="w-full"
              >
                취소
              </Button>
            ) : (
              <Button 
                onClick={handleAuthComplete}
                className="w-full"
              >
                인증 완료
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}