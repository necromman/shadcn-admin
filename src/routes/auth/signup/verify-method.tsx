import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'
import { cn } from '@/lib/utils'
import { LuSmartphone, LuShield, LuBuilding, LuChevronRight, LuCheck, LuQrCode } from 'react-icons/lu'
import { type VerifyMethod } from '@/features/auth/types/auth.types'

export const Route = createFileRoute('/auth/signup/verify-method')({
  component: VerifyMethodPage,
})

function VerifyMethodPage() {
  const navigate = useNavigate()
  const { verifyMethod, setVerifyMethod, setStep } = useSignupFlow()
  const [selectedMethod, setSelectedMethod] = useState<VerifyMethod | null>(verifyMethod)

  const handleNext = () => {
    if (!selectedMethod) return
    setVerifyMethod(selectedMethod)
    setStep(4)
    navigate({ to: '/auth/signup/verify' })
  }

  const verifyMethods = [
    {
      value: 'mobile-id' as VerifyMethod,
      title: '모바일 신분증',
      description: '스마트폰에 저장된 신분증',
      features: '가장 빠르고 간편한 인증',
      icon: LuQrCode,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      value: 'simple' as VerifyMethod,
      title: '간편인증',
      description: '네이버, 카카오, 토스 등',
      features: '익숙한 서비스로 간편하게',
      icon: LuSmartphone,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      value: 'cert' as VerifyMethod,
      title: '공동인증서',
      description: '구 공인인증서',
      features: 'PC나 USB에 저장된 인증서',
      icon: LuShield,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      value: 'finance' as VerifyMethod,
      title: '금융인증서',
      description: '클라우드 기반 인증서',
      features: '은행 앱에서 바로 사용',
      icon: LuBuilding,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

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
              const Icon = method.icon
              const isSelected = selectedMethod === method.value
              
              return (
                <Card
                  key={method.value}
                  className={cn(
                    "relative cursor-pointer transition-all hover:shadow-md",
                    isSelected && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedMethod(method.value)}
                >
                  {isSelected && (
                    <div className="absolute right-2 top-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <LuCheck className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2.5 rounded-lg",
                        method.bgColor
                      )}>
                        <Icon className={cn("h-5 w-5", method.color)} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{method.title}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          {method.description}
                        </CardDescription>
                      </div>
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
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate({ to: '/auth/signup/user-type' })}
          >
            이전
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!selectedMethod}
          >
            다음
            <LuChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}