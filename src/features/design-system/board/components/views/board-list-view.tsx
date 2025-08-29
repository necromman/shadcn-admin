'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  HiOutlineEye, 
  HiOutlineHeart, 
  HiOutlineChatBubbleLeft,
  HiOutlineLockClosed,
  HiOutlineCalendar,
  HiOutlinePaperClip,
  HiOutlinePhoto
} from 'react-icons/hi2'
import { BiPin } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { type Post, type BoardConfig, type BoardType } from '../../types/board.types'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface BoardListViewProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  boardType: BoardType
  tableDensity?: 'compact' | 'normal' | 'comfortable'
}

export function BoardListView({
  posts,
  config,
  onPostClick,
  boardType,
  tableDensity = 'normal'
}: BoardListViewProps) {
  // 리스트 아이템 패딩
  const itemPadding = {
    compact: 'p-3',
    normal: 'p-4',
    comfortable: 'p-6'
  }

  const textSize = {
    compact: 'text-sm',
    normal: 'text-base',
    comfortable: 'text-lg'
  }

  return (
    <div className="space-y-2">
      {posts.map((post, index) => (
        <React.Fragment key={post.id}>
          <div
            className={cn(
              "group cursor-pointer rounded-lg border bg-card transition-all hover:shadow-md hover:border-primary/50",
              post.isPinned && "border-primary/30 bg-primary/5",
              itemPadding[tableDensity]
            )}
            onClick={() => onPostClick(post)}
          >
            <div className="flex flex-col gap-3">
              {/* 헤더 영역 */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* 뱃지 영역 */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {post.isPinned && (
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
                    {post.metadata.bounty && boardType === 'qna' && (
                      <Badge variant="default" className="h-5 text-[10px]">
                        보상 {post.metadata.bounty}P
                      </Badge>
                    )}
                  </div>

                  {/* 제목 */}
                  <h3 className={cn(
                    "font-semibold line-clamp-2 group-hover:text-primary transition-colors",
                    textSize[tableDensity]
                  )}>
                    {post.title}
                    {post.isPrivate && (
                      <HiOutlineLockClosed className="inline-block ml-2 h-4 w-4 text-muted-foreground" />
                    )}
                  </h3>

                  {/* 내용 미리보기 */}
                  {config.display.showExcerpt && post.content && (
                    <p className={cn(
                      "text-muted-foreground line-clamp-2 mt-2",
                      tableDensity === 'compact' ? 'text-xs' : 'text-sm'
                    )}>
                      {post.content.substring(0, config.display.excerptLength || 150)}...
                    </p>
                  )}
                </div>

                {/* 썸네일 이미지 */}
                {config.display.showThumbnail && post.images[0] && (
                  <div className={cn(
                    "flex-shrink-0 overflow-hidden rounded-md",
                    tableDensity === 'compact' ? 'h-16 w-16' : 'h-20 w-20'
                  )}>
                    <img
                      src={post.images[0].thumbnailUrl || post.images[0].url}
                      alt={post.images[0].alt || post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* 메타 정보 영역 */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* 작성자 정보 */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className={tableDensity === 'compact' ? 'h-6 w-6' : 'h-8 w-8'}>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={cn(
                        "font-medium",
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
                </div>

                {/* 통계 정보 */}
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <HiOutlineEye className="h-4 w-4" />
                    <span className="text-xs">{post.metadata.views}</span>
                  </div>
                  {config.features.likes && (
                    <div className="flex items-center gap-1">
                      <HiOutlineHeart className={cn(
                        "h-4 w-4",
                        post.metadata.isLiked && "fill-current text-red-500"
                      )} />
                      <span className="text-xs">{post.metadata.likes}</span>
                    </div>
                  )}
                  {config.features.comments && (
                    <div className="flex items-center gap-1">
                      <HiOutlineChatBubbleLeft className="h-4 w-4" />
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
                  {post.images.length > 0 && (
                    <div className="flex items-center gap-1">
                      <HiOutlinePhoto className="h-4 w-4" />
                      <span className="text-xs">{post.images.length}</span>
                    </div>
                  )}
                  {post.attachments.length > 0 && (
                    <div className="flex items-center gap-1">
                      <HiOutlinePaperClip className="h-4 w-4" />
                      <span className="text-xs">{post.attachments.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 태그 */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="h-5 text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 구분선 (마지막 아이템 제외) */}
          {index < posts.length - 1 && tableDensity === 'comfortable' && (
            <Separator className="my-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}