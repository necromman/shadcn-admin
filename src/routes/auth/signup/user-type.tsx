import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'
import { cn } from '@/lib/utils'
import { LuUser, LuBuilding2, LuChevronRight, LuCheck } from 'react-icons/lu'
import { type UserType } from '@/features/auth/types/auth.types'

export const Route = createFileRoute('/auth/signup/user-type')({
  component: UserTypePage,
})

function UserTypePage() {
  const navigate = useNavigate()
  const { userType, setUserType, setStep } = useSignupFlow()
  const [selectedType, setSelectedType] = useState<UserType | null>(userType)

  const handleNext = () => {
    if (!selectedType) return
    setUserType(selectedType)
    setStep(3)
    navigate({ to: '/auth/signup/verify-method' })
  }

  const userTypes = [
    {
      value: 'personal' as UserType,
      title: '개인 회원',
      description: '개인 사용자를 위한 서비스',
      features: ['간편한 본인 인증', '다양한 인증 방식 선택', '빠른 가입 절차'],
      icon: LuUser,
      available: true,
    },
    {
      value: 'business' as UserType,
      title: '법인 회원',
      description: '기업/단체를 위한 서비스',
      features: ['사업자 인증 필요', '팀 협업 기능 제공', '전담 기술 지원'],
      icon: LuBuilding2,
      available: false,
      comingSoon: 'Phase 2',
    },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader 
        title="회원가입" 
        description="회원 유형을 선택해주세요"
      />
      
      <Card className="mt-8 shadow-lg" style={{ minHeight: '550px' }}>
        <CardHeader className="pb-4" />
        
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {userTypes.map((type) => {
              const Icon = type.icon
              const isSelected = selectedType === type.value
              
              return (
                <Card
                  key={type.value}
                  className={cn(
                    "relative cursor-pointer transition-all hover:shadow-md",
                    isSelected && "ring-2 ring-primary",
                    !type.available && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => type.available && setSelectedType(type.value)}
                >
                  {isSelected && (
                    <div className="absolute right-2 top-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <LuCheck className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  
                  {type.comingSoon && (
                    <div className="absolute right-2 top-2">
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                        {type.comingSoon}
                      </span>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        isSelected ? "bg-primary/10" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "h-6 w-6",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">안내:</span> 법인 회원 가입은 추후 업데이트 예정입니다.
              현재는 개인 회원만 가입 가능합니다.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate({ to: '/auth/signup/terms' })}
          >
            이전
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!selectedType}
          >
            다음
            <LuChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}