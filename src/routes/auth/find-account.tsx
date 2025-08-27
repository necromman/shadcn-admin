import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { LuCheck, LuLoader } from 'react-icons/lu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const Route = createFileRoute('/auth/find-account')({
  component: FindAccountPage,
})

type VerifyMethod = 'mobile-id' | 'simple' | 'cert' | 'finance'
type FindMode = 'id' | 'password'
type AccountInfo = {
  id: string
  email: string
  type: string
  joinDate: string
}

function FindAccountPage() {
  const navigate = useNavigate()
  const [findMode, setFindMode] = useState<FindMode>('id')
  const [step, setStep] = useState<'verify' | 'verify-select' | 'result' | 'select-account'>('verify')
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authProgress, setAuthProgress] = useState(0)
  const [isAuthCompleted, setIsAuthCompleted] = useState(false)
  const [authMethod, setAuthMethod] = useState<VerifyMethod | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string>('')
  
  // 찾은 계정들 (데모용)
  const [foundAccounts] = useState<AccountInfo[]>([
    { id: 'user123', email: 'user123@example.com', type: '', joinDate: '2024.01.15' },
    { id: 'john.doe', email: 'john.doe@email.com', type: '', joinDate: '2023.08.20' },
    { id: 'testuser', email: 'test@domain.com', type: '', joinDate: '2023.03.10' },
  ])

  const [accountId, setAccountId] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isSending, setIsSending] = useState(false)

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

  const handleCardClick = (method: VerifyMethod) => {
    setAuthMethod(method)
    setIsAuthDialogOpen(true)
    setAuthProgress(0)
    setIsAuthCompleted(false)
  }

  const handleStartVerification = () => {
    // 본인인증 시작
    setStep('verify-select')
  }

  useEffect(() => {
    if (isAuthDialogOpen && !isAuthCompleted) {
      const timer = setTimeout(() => {
        setAuthProgress(100)
        setIsAuthCompleted(true)
      }, 1000)
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
    setIsAuthDialogOpen(false)
    // 계정 찾기인 경우 여러 계정 표시
    if (findMode === 'id') {
      setStep('select-account')
    } else {
      // 비밀번호 찾기는 바로 결과로
      setStep('result')
    }
  }

  const getMethodTitle = (value: VerifyMethod | null) => {
    const method = verifyMethods.find(m => m.value === value)
    return method?.title || ''
  }

  const handleSendResetEmail = () => {
    if (!email) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setIsEmailSent(true)
    }, 1500)
  }

  const handleAccountSelect = () => {
    if (!selectedAccount) return
    navigate({ to: '/auth/login' })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader 
        title="" 
        description=""
      />
      
      {/* 초기 화면 - 계정 찾기/비밀번호 찾기 선택 */}
      {step === 'verify' && (
        <Card className="mt-8 shadow-lg bg-card" style={{ minHeight: '550px' }}>
          <CardHeader className="pb-0">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  findMode === 'id' 
                    ? 'border-b-2 border-primary text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFindMode('id')}
              >
                계정 찾기
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  findMode === 'password' 
                    ? 'border-b-2 border-primary text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFindMode('password')}
              >
                비밀번호 찾기
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {findMode === 'id' ? '계정 찾기' : '비밀번호 찾기'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {findMode === 'id' 
                  ? '본인 인증을 통해 계정을 찾을 수 있습니다.' 
                  : '계정 정보를 입력하고 본인 인증을 진행해주세요.'}
              </p>
            </div>

            {findMode === 'password' && (
              <div className="space-y-4 mb-6">
                <Input
                  type="text"
                  placeholder="아이디 입력"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="h-12"
                />
              </div>
            )}

            <Button 
              className="w-full h-12 text-base" 
              size="lg"
              onClick={handleStartVerification}
              disabled={findMode === 'password' && !accountId}
            >
              본인 인증하기
            </Button>

            <div className="text-center pt-4 text-xs text-muted-foreground">
              <div className="mt-4">
                <p>This site is protected by reCAPTCHA and the Google</p>
                <p>
                  <a href="#" className="underline">Privacy Policy</a> and{' '}
                  <a href="#" className="underline">Terms of Service</a> apply.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              className="w-full text-sm"
              onClick={() => navigate({ to: '/auth/login' })}
            >
              로그인으로 돌아가기
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 본인인증 방식 선택 */}
      {step === 'verify-select' && (
        <Card className="mt-8 shadow-lg bg-card" style={{ minHeight: '550px' }}>
          <CardHeader className="pb-0">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  findMode === 'id' 
                    ? 'border-b-2 border-primary text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFindMode('id')}
              >
                계정 찾기
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  findMode === 'password' 
                    ? 'border-b-2 border-primary text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFindMode('password')}
              >
                비밀번호 찾기
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">본인 인증</h2>
              <p className="text-sm text-muted-foreground">
                원하시는 인증 방식을 선택해주세요.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {verifyMethods.map((method) => (
                <Card
                  key={method.value}
                  className="relative cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleCardClick(method.value)}
                >
                  <CardHeader className="pb-3">
                    <div>
                      <h3 className="font-medium text-base">{method.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {method.description}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {method.features}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="text-sm font-medium mb-2">본인 인증 안내</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 가입 시 등록한 정보와 일치해야 합니다</li>
                <li>• 인증된 정보는 안전하게 암호화되어 처리됩니다</li>
                <li>• 타인의 정보로 인증 시 법적 제재를 받을 수 있습니다</li>
              </ul>
            </div>

            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setStep('verify')}
            >
              이전으로
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 계정 찾기 결과 - 복수 계정 */}
      {step === 'select-account' && (
        <Card className="mt-8 shadow-lg bg-card" style={{ minHeight: '600px' }}>
          <CardHeader className="pb-0">
            <div className="flex border-b">
              <button
                className="flex-1 py-4 text-center font-medium transition-colors border-b-2 border-primary text-foreground"
              >
                계정 찾기
              </button>
              <button
                className="flex-1 py-4 text-center font-medium transition-colors text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setFindMode('password')
                  setStep('verify')
                }}
              >
                비밀번호 찾기
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">계정 찾기 완료</h2>
              <p className="text-sm text-muted-foreground">
                고객님의 정보와 일치하는 계정 목록입니다.
              </p>
            </div>

            <RadioGroup value={selectedAccount} onValueChange={setSelectedAccount}>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {foundAccounts.map((account, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={account.id} />
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{account.type}</span>
                          <span className="font-medium">{account.id}</span>
                        </div>
                        {account.email && account.id !== account.email && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {account.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {account.joinDate && (
                        <span className="text-xs text-muted-foreground">
                          {account.joinDate}
                        </span>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedAccount(account.id)
                          setAccountId(account.id)
                          setFindMode('password')
                          setStep('verify')
                        }}
                      >
                        비밀번호 찾기
                      </Button>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>

            <Button 
              className="w-full h-12 text-base" 
              size="lg"
              onClick={handleAccountSelect}
              disabled={!selectedAccount}
            >
              로그인
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 비밀번호 재설정 */}
      {step === 'result' && (
        <Card className="mt-8 shadow-lg bg-card" style={{ minHeight: '500px' }}>
          <CardHeader className="pb-0">
            <div className="flex border-b">
              <button
                className="flex-1 py-4 text-center font-medium transition-colors text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setFindMode('id')
                  setStep('verify')
                }}
              >
                계정 찾기
              </button>
              <button
                className="flex-1 py-4 text-center font-medium transition-colors border-b-2 border-primary text-foreground"
              >
                비밀번호 찾기
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">비밀번호 재설정</h2>
              <p className="text-sm text-muted-foreground">
                비밀번호 재설정 방법을 선택해주세요.
              </p>
            </div>

            {!isEmailSent ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-1">인증된 계정</p>
                  <p className="text-base font-mono">{accountId || 'user123'}</p>
                </div>

                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="이메일 주소"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                  <Input
                    type="tel"
                    placeholder="휴대폰 번호 (선택)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button 
                  className="w-full h-12 text-base" 
                  size="lg"
                  onClick={handleSendResetEmail}
                  disabled={!email || isSending}
                >
                  {isSending ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                      전송 중...
                    </>
                  ) : (
                    '재설정 링크 전송'
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <LuCheck className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-medium mb-2">
                    이메일이 전송되었습니다!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {email}로 비밀번호 재설정 링크를 전송했습니다.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    이메일을 확인해주세요.
                  </p>
                </div>

                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: '/auth/login' })}
                >
                  로그인으로 돌아가기
                </Button>
              </div>
            )}

            <div className="text-center pt-4 text-xs text-muted-foreground">
              <p>• 이메일이 도착하지 않은 경우 스팸함을 확인해주세요</p>
              <p>• 재설정 링크는 24시간 동안 유효합니다</p>
            </div>
          </CardContent>
        </Card>
      )}

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
                확인
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}