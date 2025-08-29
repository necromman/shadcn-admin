'use client'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  HiOutlineEye, 
  HiOutlineHeart, 
  HiOutlineChatBubbleLeft,
  HiOutlineLockClosed,
  HiOutlineCalendar
} from 'react-icons/hi2'
import { BiPin } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { type Post, type BoardConfig, type BoardType } from '../../types/board.types'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface BoardCardViewProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  boardType: BoardType
  tableDensity?: 'compact' | 'normal' | 'comfortable'
}

export function BoardCardView({
  posts,
  config,
  onPostClick,
  boardType,
  tableDensity = 'normal'
}: BoardCardViewProps) {
  // 카드 크기에 따른 그리드 레이아웃
  const gridClass = {
    compact: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3',
    normal: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    comfortable: 'grid-cols-1 md:grid-cols-2 gap-6'
  }

  const cardPadding = {
    compact: 'p-3',
    normal: 'p-4',
    comfortable: 'p-6'
  }

  return (
    <div className={cn("grid", gridClass[tableDensity])}>
      {posts.map((post) => (
        <Card
          key={post.id}
          className={cn(
            "cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5",
            post.isPinned && "border-primary/50 bg-primary/5"
          )}
          onClick={() => onPostClick(post)}
        >
          {/* 갤러리 타입일 경우 이미지 표시 */}
          {boardType === 'gallery' && post.images[0] && (
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={post.images[0].url}
                alt={post.images[0].alt || post.title}
                className="h-full w-full object-cover"
              />
              {post.isPinned && (
                <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
                  <BiPin className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          )}

          <CardHeader className={cn(cardPadding[tableDensity], "pb-2")}>
            <div className="space-y-2">
              {/* 상단 뱃지들 */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {post.isPinned && boardType !== 'gallery' && (
                    <Badge variant="default" className="h-5 text-[10px]">
                      <BiPin className="h-3 w-3 mr-1" />
                      고정
                    </Badge>
                  )}
                  {post.isNew && (
                    <Badge variant="destructive" className="h-5 text-[10px]">NEW</Badge>
                  )}
                  {post.category && (
                    <Badge variant="outline" className="h-5 text-[10px]">{post.category}</Badge>
                  )}
                  {boardType === 'qna' && (
                    <Badge 
                      variant={post.metadata.answerCount ? "default" : "secondary"}
                      className="h-5 text-[10px]"
                    >
                      {post.metadata.answerCount ? "답변완료" : "미답변"}
                    </Badge>
                  )}
                </div>
                {post.isPrivate && (
                  <HiOutlineLockClosed className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>

              {/* 제목 */}
              <h3 className={cn(
                "font-semibold line-clamp-2",
                tableDensity === 'compact' ? 'text-sm' : 'text-base'
              )}>
                {post.title}
              </h3>

              {/* 내용 미리보기 */}
              {config.display.showExcerpt && post.content && (
                <p className={cn(
                  "text-muted-foreground line-clamp-2",
                  tableDensity === 'compact' ? 'text-xs' : 'text-sm'
                )}>
                  {post.content.substring(0, config.display.excerptLength || 100)}...
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent className={cn(cardPadding[tableDensity], "py-2")}>
            {/* 작성자 정보 */}
            <div className="flex items-center gap-2">
              <Avatar className={tableDensity === 'compact' ? 'h-6 w-6' : 'h-8 w-8'}>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium truncate",
                  tableDensity === 'compact' ? 'text-xs' : 'text-sm'
                )}>
                  {post.author.name}
                </p>
                <p className={cn(
                  "text-muted-foreground flex items-center gap-1",
                  tableDensity === 'compact' ? 'text-[10px]' : 'text-xs'
                )}>
                  <HiOutlineCalendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: ko
                  })}
                </p>
              </div>
            </div>

            {/* QnA 보상 포인트 */}
            {boardType === 'qna' && post.metadata.bounty && (
              <div className="mt-2">
                <Badge variant="default" className="text-xs">
                  보상 {post.metadata.bounty}P
                </Badge>
              </div>
            )}

            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="h-5 text-[10px]">
                    #{tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary" className="h-5 text-[10px]">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className={cn(cardPadding[tableDensity], "pt-2")}>
            <div className="flex items-center justify-between w-full text-muted-foreground">
              {/* 통계 정보 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <HiOutlineEye className="h-3.5 w-3.5" />
                  <span className="text-xs">{post.metadata.views}</span>
                </div>
                {config.features.likes && (
                  <div className="flex items-center gap-1">
                    <HiOutlineHeart className={cn(
                      "h-3.5 w-3.5",
                      post.metadata.isLiked && "fill-current text-red-500"
                    )} />
                    <span className="text-xs">{post.metadata.likes}</span>
                  </div>
                )}
                {config.features.comments && (
                  <div className="flex items-center gap-1">
                    <HiOutlineChatBubbleLeft className="h-3.5 w-3.5" />
                    <span className="text-xs">{post.metadata.commentsCount}</span>
                  </div>
                )}
                {boardType === 'qna' && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs">답변 {post.metadata.answerCount || 0}</span>
                  </div>
                )}
                {boardType === 'faq' && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs">👍 {post.metadata.helpfulCount || 0}</span>
                  </div>
                )}
              </div>

              {/* 첨부 파일 표시 */}
              <div className="flex items-center gap-2">
                {post.images.length > 0 && boardType !== 'gallery' && (
                  <Badge variant="outline" className="h-5 text-[10px]">
                    이미지 {post.images.length}
                  </Badge>
                )}
                {post.attachments.length > 0 && (
                  <Badge variant="outline" className="h-5 text-[10px]">
                    첨부 {post.attachments.length}
                  </Badge>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}