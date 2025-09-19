import { type Institution } from '../../../data/institutions.mock'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Bell, Calendar, ArrowRight, Pin } from 'lucide-react'

interface NoticePreviewProps {
  institution: Institution
}

export function NoticePreview({ institution }: NoticePreviewProps) {
  const recentNotices = institution.notices.slice(0, 5)

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-2xl font-bold">공지사항</h2>
          </div>
          <Link to={`/moafab/institution/${institution.slug}/notice` as any}>
            <Button variant="ghost" size="sm">
              전체보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {recentNotices.map((notice) => (
            <Card key={notice.id} variant="list" className="hover:shadow-sm transition-shadow">
              <CardContent variant="list" className="py-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {notice.isPinned && (
                        <Pin 
                          className="h-4 w-4" 
                          style={{ color: institution.theme.primaryColor }}
                        />
                      )}
                      <h3 className="text-base font-medium">
                        {notice.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {notice.content}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {notice.createdAt}
                      <span>·</span>
                      <span>{notice.author}</span>
                    </div>
                  </div>
                  <Badge variant={notice.category === '교육' ? 'default' : 'secondary'} className="ml-4">
                    {notice.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recentNotices.length === 0 && (
          <Card variant="default">
            <CardContent variant="default" className="flex flex-col items-center justify-center py-8">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">등록된 공지사항이 없습니다</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}