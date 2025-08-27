import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'
import { LuRefreshCw, LuChevronRight, LuLoader, LuCircleCheck } from 'react-icons/lu'
import { SiKakaotalk } from 'react-icons/si'
import { SiNaver } from 'react-icons/si'
import { SIMPLE_AUTH_SERVICES, FINANCE_INSTITUTIONS } from '@/features/auth/types/auth.types'

export const Route = createFileRoute('/auth/signup/verify')({
  component: VerifyPage,
})

function VerifyPage() {
  const navigate = useNavigate()
  const { verifyMethod, setStep, setPersonalInfo } = useSignupFlow()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [certPassword, setCertPassword] = useState('')

  // 데모용 자동 인증 시뮬레이션
  const simulateVerification = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      // 데모용 개인정보 설정
      setPersonalInfo({
        name: '홍길동',
        birthdate: '1990-01-01',
        phone: '010-1234-5678',
      })
    }, 3000)
  }

  const handleNext = () => {
    if (!isVerified) return
    setStep(5)
    navigate({ to: '/auth/signup/info' })
  }

  const renderVerificationContent = () => {
    switch (verifyMethod) {
      case 'mobile-id':
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4 py-8">
              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                {isVerifying ? (
                  <LuLoader className="h-12 w-12 animate-spin text-primary" />
                ) : isVerified ? (
                  <LuCircleCheck className="h-16 w-16 text-green-500" />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">📱</div>
                    <p className="text-xs text-muted-foreground">QR코드 영역</p>
                  </div>
                )}
              </div>
              
              {!isVerified && !isVerifying && (
                <>
                  <p className="text-sm text-center text-muted-foreground">
                    모바일 신분증 앱에서 QR을 스캔하세요
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Handle QR refresh logic here
                    }}
                  >
                    <LuRefreshCw className="mr-2 h-4 w-4" />
                    QR 새로고침
                  </Button>
                </>
              )}
              
              {isVerifying && (
                <p className="text-sm text-center text-muted-foreground">
                  인증 진행 중입니다...
                </p>
              )}
              
              {isVerified && (
                <p className="text-sm text-center text-green-600 font-medium">
                  본인 인증이 완료되었습니다!
                </p>
              )}
            </div>
            
            {!isVerified && !isVerifying && (
              <div className="text-center">
                <Button onClick={simulateVerification} className="w-full">
                  데모 인증 시작
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  실제 서비스에서는 모바일 신분증 앱 연동이 필요합니다
                </p>
              </div>
            )}
          </div>
        )

      case 'simple':
        return (
          <div className="space-y-4">
            <Label>인증 서비스 선택</Label>
            <div className="grid grid-cols-3 gap-3">
              {SIMPLE_AUTH_SERVICES.map((service) => (
                <Button
                  key={service.id}
                  variant={selectedService === service.id ? 'default' : 'outline'}
                  className="h-20 flex-col gap-2"
                  onClick={() => setSelectedService(service.id)}
                >
                  {service.id === 'kakao' && <SiKakaotalk className="h-6 w-6" />}
                  {service.id === 'naver' && <SiNaver className="h-5 w-5" />}
                  {service.id !== 'kakao' && service.id !== 'naver' && (
                    <span className="text-lg">💳</span>
                  )}
                  <span className="text-xs">{service.name}</span>
                </Button>
              ))}
            </div>
            
            {selectedService && !isVerified && !isVerifying && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    선택한 서비스: <span className="font-medium">{
                      SIMPLE_AUTH_SERVICES.find(s => s.id === selectedService)?.name
                    }</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    해당 서비스로 이동하여 본인인증을 진행합니다
                  </p>
                </div>
                
                <Button onClick={simulateVerification} className="w-full">
                  {SIMPLE_AUTH_SERVICES.find(s => s.id === selectedService)?.name}로 인증하기
                </Button>
              </div>
            )}
            
            {isVerifying && (
              <div className="text-center py-8">
                <LuLoader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  인증 진행 중입니다...
                </p>
              </div>
            )}
            
            {isVerified && (
              <div className="text-center py-8">
                <LuCircleCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-sm text-green-600 font-medium">
                  본인 인증이 완료되었습니다!
                </p>
              </div>
            )}
          </div>
        )

      case 'cert':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>인증서 선택</Label>
              <Button variant="outline" className="w-full justify-start">
                인증서 선택하기
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cert-password">인증서 비밀번호</Label>
              <Input
                id="cert-password"
                type="password"
                placeholder="인증서 비밀번호를 입력하세요"
                value={certPassword}
                onChange={(e) => setCertPassword(e.target.value)}
              />
            </div>
            
            {!isVerified && !isVerifying && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">
                    인증서가 저장된 위치를 선택하고 비밀번호를 입력하세요
                  </p>
                </div>
                
                <Button onClick={simulateVerification} className="w-full">
                  공동인증서로 인증하기
                </Button>
              </div>
            )}
            
            {isVerifying && (
              <div className="text-center py-8">
                <LuLoader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  인증서 확인 중입니다...
                </p>
              </div>
            )}
            
            {isVerified && (
              <div className="text-center py-8">
                <LuCircleCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-sm text-green-600 font-medium">
                  본인 인증이 완료되었습니다!
                </p>
              </div>
            )}
          </div>
        )

      case 'finance':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>금융기관 선택</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="금융기관을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {FINANCE_INSTITUTIONS.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="finance-id">아이디</Label>
              <Input
                id="finance-id"
                type="text"
                placeholder="금융인증서 아이디를 입력하세요"
              />
            </div>
            
            {selectedBank && !isVerified && !isVerifying && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    선택한 금융기관: <span className="font-medium">{selectedBank}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    선택한 금융기관 앱에서 인증을 완료하세요
                  </p>
                </div>
                
                <Button onClick={simulateVerification} className="w-full">
                  금융인증서로 인증하기
                </Button>
              </div>
            )}
            
            {isVerifying && (
              <div className="text-center py-8">
                <LuLoader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  금융인증서 확인 중입니다...
                </p>
              </div>
            )}
            
            {isVerified && (
              <div className="text-center py-8">
                <LuCircleCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-sm text-green-600 font-medium">
                  본인 인증이 완료되었습니다!
                </p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader 
        title="회원가입" 
        description="본인 인증을 진행해주세요"
      />
      
      <Card className="mt-8 shadow-lg" style={{ minHeight: '600px' }}>
        <CardHeader className="pb-4" />
        
        <CardContent>
          {renderVerificationContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate({ to: '/auth/signup/verify-method' })}
            disabled={isVerifying}
          >
            이전
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!isVerified || isVerifying}
          >
            다음
            <LuChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}