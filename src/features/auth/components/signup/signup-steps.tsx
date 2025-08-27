import { cn } from '@/lib/utils'
import { LuCheck } from 'react-icons/lu'

interface SignupStepsProps {
  currentStep: number
  totalSteps?: number
}

export function SignupSteps({ currentStep, totalSteps = 5 }: SignupStepsProps) {
  const steps = [
    '약관 동의',
    '회원 유형',
    '본인 인증',
    '정보 입력',
    '가입 완료',
  ]

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
        <div 
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            
            return (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background transition-colors",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary",
                    !isCompleted && !isCurrent && "border-muted"
                  )}
                >
                  {isCompleted ? (
                    <LuCheck className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{stepNumber}</span>
                  )}
                </div>
                <span className={cn(
                  "mt-2 text-xs",
                  isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}