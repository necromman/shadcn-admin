import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import { useTour } from './TourProvider'

export function TourButton() {
  const { startTour } = useTour()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={startTour}
      className="gap-2"
      data-tour="tour-button"
    >
      <Info className="w-4 h-4" />
      투어 시작
    </Button>
  )
}