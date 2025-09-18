import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { tourSteps } from './tour-steps'

interface TourStep {
  target: string
  title: string
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  highlight?: boolean
}

interface TourContextType {
  isActive: boolean
  currentStep: number
  steps: TourStep[]
  startTour: () => void
  endTour: () => void
  nextStep: () => void
  prevStep: () => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export const useTour = () => {
  const context = useContext(TourContext)
  if (!context) throw new Error('useTour must be used within TourProvider')
  return context
}

interface TourProviderProps {
  children: ReactNode
  demoId: string
}

export function TourProvider({ children, demoId }: TourProviderProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = tourSteps[demoId] || []

  const startTour = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const endTour = () => {
    setIsActive(false)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      endTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    if (isActive && steps[currentStep]?.target) {
      const element = document.querySelector(`[data-tour="${steps[currentStep].target}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })

        // 하이라이트 효과
        if (steps[currentStep].highlight) {
          element.classList.add('tour-highlight')
        }
      }
    }

    return () => {
      // 하이라이트 제거
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight')
      })
    }
  }, [currentStep, isActive, steps])

  return (
    <TourContext.Provider value={{
      isActive,
      currentStep,
      steps,
      startTour,
      endTour,
      nextStep,
      prevStep
    }}>
      {children}
      {isActive && steps[currentStep] && <TourTooltip />}
    </TourContext.Provider>
  )
}

function TourTooltip() {
  const { currentStep, steps, nextStep, prevStep, endTour } = useTour()
  const step = steps[currentStep]
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const element = document.querySelector(`[data-tour="${step.target}"]`)
    if (element) {
      const rect = element.getBoundingClientRect()
      const placement = step.placement || 'bottom'

      let top = 0
      let left = 0

      switch (placement) {
        case 'top':
          top = rect.top - 150
          left = rect.left + rect.width / 2 - 175
          break
        case 'bottom':
          top = rect.bottom + 10
          left = rect.left + rect.width / 2 - 175
          break
        case 'left':
          top = rect.top + rect.height / 2 - 75
          left = rect.left - 360
          break
        case 'right':
          top = rect.top + rect.height / 2 - 75
          left = rect.right + 10
          break
      }

      // 화면 경계 체크
      const maxLeft = window.innerWidth - 350
      const maxTop = window.innerHeight - 150

      left = Math.max(10, Math.min(left, maxLeft))
      top = Math.max(10, Math.min(top, maxTop))

      setPosition({ top, left })
    }
  }, [step])

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={endTour}
      />

      {/* 툴팁 */}
      <Card
        className="fixed z-[9999] w-[350px] p-4 shadow-2xl"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{step.title}</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={endTour}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {step.content}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={nextStep}
            >
              {currentStep === steps.length - 1 ? '완료' : '다음'}
              {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

// 스타일 추가
const style = document.createElement('style')
style.textContent = `
  .tour-highlight {
    position: relative;
    z-index: 9997;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    animation: tourPulse 2s infinite;
  }

  @keyframes tourPulse {
    0% {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.3);
    }
    100% {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  }
`
document.head.appendChild(style)