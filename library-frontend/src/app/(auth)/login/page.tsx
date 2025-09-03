import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { BookOpen } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 로그인 로직 구현
    console.log('Login:', { email, password, rememberMe })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">세종샘물도서관</CardTitle>
          <CardDescription>
            5개 대학 학생/교직원 통합 로그인
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일/학번</Label>
              <Input
                id="email"
                type="text"
                placeholder="이메일 또는 학번을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="cursor-pointer">
                자동 로그인
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              로그인
            </Button>
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/forgot-id" className="text-gray-600 hover:text-blue-600">
                아이디 찾기
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/forgot-password" className="text-gray-600 hover:text-blue-600">
                비밀번호 찾기
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-950 px-2 text-muted-foreground">
                  또는
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/register">회원가입</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="absolute bottom-4 text-center text-sm text-gray-500">
        * 5개 대학 학생/교직원 통합 로그인<br />
        * 외부 이용자 별도 가입
      </div>
    </div>
  )
}