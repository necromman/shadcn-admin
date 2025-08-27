import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { type LoginMethod } from '@/features/auth/types/auth.types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

const loginSchema = z.object({
  username: z.string().min(1, '아이디를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
  rememberMe: z.boolean(),
})

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('id-password')
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    // Handle login logic here
    console.log(data)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleSocialLogin = (_provider: string) => {
    // Handle social login logic here
  }

  const handleCertLogin = () => {
    // Handle certificate login logic here
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AuthHeader 
        title="" 
        description=""
      />
      
      <Card className="shadow-lg" style={{ minHeight: '600px' }}>
        <CardHeader className="pb-6 pt-8">
          <CardTitle className="text-2xl text-center">로그인</CardTitle>
          <CardDescription className="text-center mt-2">
            계정에 로그인하여 서비스를 이용하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as LoginMethod)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="id-password" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">ID/PW</TabsTrigger>
              <TabsTrigger value="simple" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">간편로그인</TabsTrigger>
              <TabsTrigger value="cert" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">인증서</TabsTrigger>
            </TabsList>
            
            <TabsContent value="id-password" className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>아이디</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="admin"
                            autoComplete="username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          로그인 상태 유지
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="simple" className="space-y-4">
              <div className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="p-8 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-6">
                      각 금융기관 및 인증 서비스를 통해<br />
                      간편하게 로그인할 수 있습니다
                    </p>
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full"
                      onClick={() => handleSocialLogin('simple-auth')}
                    >
                      간편인증으로 로그인
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    별도의 앱 설치나 회원가입 없이<br />
                    기존 인증서비스로 바로 로그인 가능합니다
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cert" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-14"
                    onClick={handleCertLogin}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">공동인증서로 로그인</span>
                      <span className="text-xs text-muted-foreground">(구 공인인증서)</span>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full h-14"
                    onClick={handleCertLogin}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">금융인증서로 로그인</span>
                      <span className="text-xs text-muted-foreground">(클라우드 기반)</span>
                    </div>
                  </Button>
                </div>
                
                <div className="rounded-lg bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">인증서 준비사항</span><br />
                    • 공동인증서: PC에 설치된 인증서 필요<br />
                    • 금융인증서: 은행 앱에서 발급 및 이용 가능
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col pt-2 pb-6">
          <div className="w-full border-t pt-6">
            <div className="text-sm text-center space-y-4">
              <div className="flex items-center justify-center space-x-6">
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    // Handle find ID logic here
                  }}
                >
                  아이디 찾기
                </button>
                <span className="text-muted-foreground">•</span>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    // Handle password reset logic here
                  }}
                >
                  비밀번호 재설정
                </button>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">아직 계정이 없으신가요?</p>
                <Link 
                  to="/auth/signup/terms" 
                  className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4"
                >
                  회원가입 하기
                </Link>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}