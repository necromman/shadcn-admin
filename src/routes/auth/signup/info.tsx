import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'
import { LuChevronRight, LuCheck, LuX, LuEye, LuEyeOff } from 'react-icons/lu'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

const infoSchema = z.object({
  username: z.string()
    .min(4, '아이디는 최소 4자 이상이어야 합니다')
    .max(20, '아이디는 최대 20자까지 가능합니다')
    .regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 밑줄만 사용 가능합니다'),
  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '대소문자와 숫자를 포함해야 합니다'),
  passwordConfirm: z.string(),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다').optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
})

export const Route = createFileRoute('/auth/signup/info')({
  component: InfoPage,
})

function InfoPage() {
  const navigate = useNavigate()
  const { personalInfo, setAccountInfo, setStep } = useSignupFlow()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      nickname: '',
    },
  })

  const watchUsername = form.watch('username')
  const watchPassword = form.watch('password')

  const checkUsername = async () => {
    const username = form.getValues('username')
    if (!username || username.length < 4) {
      form.setError('username', { message: '아이디를 4자 이상 입력해주세요' })
      return
    }
    
    setIsCheckingUsername(true)
    // 데모용: 1초 후 사용 가능으로 설정
    setTimeout(() => {
      setUsernameAvailable(true)
      setIsCheckingUsername(false)
    }, 1000)
  }

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, text: '', color: '' }
    
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++
    if (pwd.match(/[0-9]/)) strength++
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++

    const strengthLevels = [
      { strength: 0, text: '', color: '' },
      { strength: 1, text: '약함', color: 'text-red-500' },
      { strength: 2, text: '보통', color: 'text-yellow-500' },
      { strength: 3, text: '강함', color: 'text-blue-500' },
      { strength: 4, text: '매우 강함', color: 'text-green-500' },
    ]

    return strengthLevels[strength]
  }

  const passwordStrength = getPasswordStrength(watchPassword)

  const handleSubmit = (data: z.infer<typeof infoSchema>) => {
    if (usernameAvailable !== true) {
      form.setError('username', { message: '아이디 중복 확인을 해주세요' })
      return
    }
    
    setIsLoading(true)
    setAccountInfo({
      username: data.username,
      password: data.password,
      email: data.email,
      nickname: data.nickname,
    })
    setStep(6)
    navigate({ to: '/auth/signup/complete' })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader 
        title="회원가입" 
        description="회원 정보를 입력해주세요"
      />
      
      <Card className="mt-8 shadow-lg" style={{ minHeight: '750px' }}>
        <CardHeader className="pb-4" />
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* 본인 정보 표시 */}
              {personalInfo && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">이름:</span> {personalInfo.name}</p>
                      <p><span className="font-medium">생년월일:</span> {personalInfo.birthdate}</p>
                      <p><span className="font-medium">휴대폰:</span> {personalInfo.phone}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* 아이디 */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디 <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="user123"
                          autoComplete="username"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setUsernameAvailable(null)
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={checkUsername}
                          disabled={isCheckingUsername || !watchUsername}
                        >
                          {isCheckingUsername ? '확인 중...' : '중복확인'}
                        </Button>
                      </div>
                    </FormControl>
                    {usernameAvailable === true && (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <LuCheck className="h-3 w-3" />
                        사용 가능한 아이디입니다
                      </p>
                    )}
                    {usernameAvailable === false && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <LuX className="h-3 w-3" />
                        이미 사용 중인 아이디입니다
                      </p>
                    )}
                    <FormDescription>
                      4-20자의 영문, 숫자, 밑줄(_)만 사용 가능합니다
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 비밀번호 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    {passwordStrength.text && (
                      <p className={`text-sm ${passwordStrength.color}`}>
                        보안 강도: {passwordStrength.text}
                      </p>
                    )}
                    <FormDescription>
                      8자 이상, 대문자, 소문자, 숫자를 포함해야 합니다
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 비밀번호 확인 */}
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인 <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPasswordConfirm ? 'text' : 'password'}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        >
                          {showPasswordConfirm ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 이메일 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일 <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      비밀번호 찾기 등 본인확인용으로 사용됩니다
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 닉네임 */}
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임 (선택)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="닉네임"
                        autoComplete="nickname"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      서비스 내에서 표시될 이름입니다
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate({ to: '/auth/signup/verify' })}
          >
            이전
          </Button>
          <Button 
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading || usernameAvailable !== true}
          >
            {isLoading ? '처리 중...' : '다음'}
            <LuChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}