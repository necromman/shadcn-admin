import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, TrendingUp, BookMarked, Search, Sparkles, Library } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface BookStat {
  id: string
  label: string
  value: string | number
  change?: string
  icon: React.ElementType
  color: string
  trend?: 'up' | 'down' | 'neutral'
}

const bookStats: BookStat[] = [
  {
    id: 'total',
    label: '총 장서',
    value: '45,230',
    icon: Library,
    color: 'text-foreground',
    trend: 'neutral'
  },
  {
    id: 'new',
    label: '신착도서',
    value: '152',
    change: '+12',
    icon: Sparkles,
    color: 'text-primary',
    trend: 'up'
  },
  {
    id: 'available',
    label: '대출가능',
    value: '38,456',
    icon: BookOpen,
    color: 'text-emerald-600 dark:text-emerald-500',
    trend: 'up'
  },
  {
    id: 'borrowed',
    label: '대출중',
    value: '6,774',
    icon: BookMarked,
    color: 'text-amber-600 dark:text-amber-500',
    trend: 'neutral'
  }
]

export function LibraryBookStatus() {
  const totalBooks = 45230
  const newBooks = 152
  const availableBooks = 38456
  const borrowedBooks = totalBooks - availableBooks
  const availablePercentage = Math.round((availableBooks / totalBooks) * 100)
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-border/40 bg-card/50 backdrop-blur h-full">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base">도서 현황</h3>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold text-primary">{availablePercentage}%</span>
            <span className="text-xs text-muted-foreground">대출가능</span>
          </div>
        </div>

        {/* Main Stats */}
        <div className="flex-1 space-y-3">
          {/* Total Books */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">총 장서량</span>
              <Library className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{totalBooks.toLocaleString()}</span>
              <span className="text-xs text-emerald-600">+8.2% YoY</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <Sparkles className="h-3 w-3 text-amber-500 mb-1" />
              <div className="text-lg font-bold">{newBooks}</div>
              <div className="text-[10px] text-muted-foreground">신착도서</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <BookOpen className="h-3 w-3 text-emerald-500 mb-1" />
              <div className="text-lg font-bold">{(availableBooks / 1000).toFixed(1)}k</div>
              <div className="text-[10px] text-muted-foreground">대출가능</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <BookMarked className="h-3 w-3 text-orange-500 mb-1" />
              <div className="text-lg font-bold">{(borrowedBooks / 1000).toFixed(1)}k</div>
              <div className="text-[10px] text-muted-foreground">대출중</div>
            </div>
          </div>

          {/* Today's Activity */}
          <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium">오늘 활동</span>
              </div>
              <div className="flex gap-3">
                <span className="text-xs">
                  <span className="font-bold text-emerald-600">127</span>
                  <span className="text-muted-foreground"> 대출</span>
                </span>
                <span className="text-xs">
                  <span className="font-bold text-amber-600">98</span>
                  <span className="text-muted-foreground"> 반납</span>
                </span>
              </div>
            </div>
          </div>
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
              <Search className="mr-2 h-3.5 w-3.5" />
              검색하기
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}