import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, DoorOpen, Monitor } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface StudyRoomData {
  id: string
  name: string
  current: number
  total: number
  type: 'reading' | 'group' | 'pc'
  floor?: string
}

const studyRooms: StudyRoomData[] = [
  { id: '1', name: '제1열람실', current: 65, total: 100, type: 'reading', floor: '2F' },
  { id: '2', name: '제2열람실', current: 45, total: 80, type: 'reading', floor: '3F' },
  { id: '3', name: '스터디룸', current: 3, total: 10, type: 'group' },
  { id: '4', name: 'PC실', current: 28, total: 40, type: 'pc', floor: '1F' }
]

function getRoomIcon(type: StudyRoomData['type']) {
  switch(type) {
    case 'reading': return Users
    case 'group': return DoorOpen
    case 'pc': return Monitor
    default: return Users
  }
}

function getOccupancyColor(percentage: number) {
  if (percentage >= 80) return 'text-destructive'
  if (percentage >= 60) return 'text-amber-600 dark:text-amber-500'
  return 'text-emerald-600 dark:text-emerald-500'
}

function getProgressColor(percentage: number) {
  if (percentage >= 80) return 'bg-gradient-to-r from-destructive to-destructive/80'
  if (percentage >= 60) return 'bg-gradient-to-r from-amber-500 to-amber-400'
  return 'bg-gradient-to-r from-emerald-500 to-emerald-400'
}

export function LibraryStudyRoomStatus() {
  const totalOccupied = studyRooms.reduce((sum, room) => sum + room.current, 0)
  const totalCapacity = studyRooms.reduce((sum, room) => sum + room.total, 0)
  const totalPercentage = Math.round((totalOccupied / totalCapacity) * 100)
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-border/40 bg-card/50 backdrop-blur h-full">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base">열람실 현황</h3>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold text-primary">{totalPercentage}%</span>
            <span className="text-xs text-muted-foreground">사용중</span>
          </div>
        </div>

        {/* Main Stats */}
        <div className="flex-1 space-y-3">
          {studyRooms.slice(0, 3).map((room) => {
            const percentage = Math.round((room.current / room.total) * 100)
            const Icon = getRoomIcon(room.type)
            
            return (
              <div key={room.id} className="group/item">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-muted/50">
                      <Icon className="h-3 w-3 text-foreground/70" />
                    </div>
                    <span className="text-sm font-medium">{room.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">
                      {room.current}
                      <span className="text-muted-foreground font-normal">/{room.total}</span>
                    </span>
                  </div>
                </div>
                <div className="ml-7">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Action */}
        <div className="mt-4 pt-4 border-t border-border/40">
          <Button 
            className="w-full h-9" 
            variant="secondary"
            size="sm"
            asChild
          >
            <Link to="/">
              <Users className="mr-2 h-3.5 w-3.5" />
              예약하기
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}