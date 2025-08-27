import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AuthHeader } from '@/features/auth/components/common/auth-header'
import { useSignupFlow } from '@/features/auth/hooks/use-signup-flow'

export const Route = createFileRoute('/auth/signup/terms')({
  component: TermsPage,
})

function TermsPage() {
  const navigate = useNavigate()
  const { termsAgreed, setTermsAgreed, setStep } = useSignupFlow()
  const [terms, setTerms] = useState(termsAgreed)

  const handleAllCheck = (checked: boolean) => {
    const newTerms = {
      all: checked,
      service: checked,
      privacy: checked,
      age: checked,
      marketing: checked,
      advertising: checked,
    }
    setTerms(newTerms)
  }

  const handleTermCheck = (key: keyof typeof terms, checked: boolean) => {
    const newTerms = { ...terms, [key]: checked }
    
    // 필수 약관 모두 체크 여부 확인
    const requiredChecked = newTerms.service && newTerms.privacy && newTerms.age
    const optionalChecked = newTerms.marketing && newTerms.advertising
    
    newTerms.all = requiredChecked && optionalChecked
    setTerms(newTerms)
  }

  const canProceed = terms.service && terms.privacy && terms.age

  const handleNext = () => {
    setTermsAgreed(terms)
    setStep(2)
    navigate({ to: '/auth/signup/user-type' })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AuthHeader 
        title="" 
        description=""
      />
      
      <Card className="shadow-lg" style={{ minHeight: '600px' }}>
        <CardHeader className="pb-6 pt-8">
          <h1 className="text-2xl font-semibold text-center">회원가입</h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            서비스 이용약관에 동의해주세요
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* 전체 동의 */}
          <div className="rounded-lg border-2 border-border bg-muted/20 p-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="all"
                checked={terms.all}
                onCheckedChange={(checked) => handleAllCheck(checked as boolean)}
                className="h-5 w-5"
              />
              <Label 
                htmlFor="all" 
                className="text-base font-semibold cursor-pointer flex-1"
              >
                전체 약관에 동의합니다
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            {/* 필수 약관 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">필수 동의 항목</h3>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="service"
                  checked={terms.service}
                  onCheckedChange={(checked) => handleTermCheck('service', checked as boolean)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="service" 
                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                  >
                    <span className="text-destructive">*</span>
                    이용약관 동의 (필수)
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={terms.privacy}
                  onCheckedChange={(checked) => handleTermCheck('privacy', checked as boolean)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="privacy" 
                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                  >
                    <span className="text-destructive">*</span>
                    개인정보 수집 및 이용 동의 (필수)
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="age"
                  checked={terms.age}
                  onCheckedChange={(checked) => handleTermCheck('age', checked as boolean)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="age" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    <span className="text-destructive">*</span>
                    만 14세 이상입니다 (필수)
                  </Label>
                </div>
              </div>
            </div>

            {/* 선택 약관 */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">선택 동의 항목</h3>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={terms.marketing}
                  onCheckedChange={(checked) => handleTermCheck('marketing', checked as boolean)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="marketing" 
                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                  >
                    마케팅 정보 수신 동의 (선택)
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    이벤트, 혜택 등 다양한 정보를 받아보실 수 있습니다
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="advertising"
                  checked={terms.advertising}
                  onCheckedChange={(checked) => handleTermCheck('advertising', checked as boolean)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="advertising" 
                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                  >
                    광고성 정보 수신 동의 (선택)
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    새로운 서비스 및 프로모션 정보를 받아보실 수 있습니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 pb-6">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate({ to: '/auth/login' })}
            className="min-w-[100px]"
          >
            취소
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className="min-w-[100px]"
          >
            다음 단계
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}