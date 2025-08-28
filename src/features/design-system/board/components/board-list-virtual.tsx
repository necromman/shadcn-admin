'use client'
import React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  HiOutlineEye, 
  HiOutlineHeart, 
  HiOutlineChatBubbleLeft,
  HiOutlinePaperClip,
  HiOutlineLockClosed
} from 'react-icons/hi2'
import { BiPin } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { type Post, type BoardConfig } from '../types/board.types'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface BoardListVirtualProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  enableVirtualization?: boolean
}

// 통계 뱃지 컴포넌트
const StatsBadge = React.memo(({ icon: Icon, count }: { icon: any; count: number }) => (
  <span className="flex items-center gap-1 text-xs text-muted-foreground">
    <Icon className="h-3 w-3" />
    {count.toLocaleString()}
  </span>
))
StatsBadge.displayName = 'StatsBadge'

export const BoardListVirtual = React.memo(({ 
  posts, 
  config, 
  onPostClick,
  enableVirtualization = true
}: BoardListVirtualProps) => {
  const parentRef = React.useRef<HTMLDivElement>(null)
  
  // 가상화 설정
  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // 예상 행 높이
    overscan: 5, // 보이지 않는 영역에 미리 렌더링할 아이템 수
  })

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
  }

  if (!enableVirtualization) {
    // 가상화를 사용하지 않는 경우 일반 테이블 렌더링
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">번호</TableHead>
              {config.display.showThumbnail && <TableHead className="w-[60px]">썸네일</TableHead>}
              <TableHead>제목</TableHead>
              <TableHead className="w-[120px]">작성자</TableHead>
              <TableHead className="w-[100px]">작성일</TableHead>
              {true && (
                <>
                  <TableHead className="w-[80px] text-center">조회</TableHead>
                  <TableHead className="w-[80px] text-center">추천</TableHead>
                  <TableHead className="w-[80px] text-center">댓글</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} onClick={() => onPostClick(post)} className="cursor-pointer">
                <TableCell>{post.id}</TableCell>
                {config.display.showThumbnail && (
                  <TableCell>
                    {post.images.length > 0 && <img src={post.images[0].thumbnailUrl || post.images[0].url} alt="" className="w-10 h-10 rounded object-cover" />}
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    {post.isPinned && <BiPin className="h-4 w-4 text-primary" />}
                    {post.isPrivate && <HiOutlineLockClosed className="h-4 w-4 text-muted-foreground" />}
                    <span className={cn(post.isPinned && "font-semibold")}>{post.title}</span>
                    {post.attachments.length > 0 && <HiOutlinePaperClip className="h-3 w-3 text-muted-foreground" />}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{post.author.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(post.createdAt)}
                </TableCell>
                {true && (
                  <>
                    <TableCell className="text-center">
                      <StatsBadge icon={HiOutlineEye} count={post.metadata.views} />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatsBadge icon={HiOutlineHeart} count={post.metadata.likes} />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatsBadge icon={HiOutlineChatBubbleLeft} count={post.metadata.commentsCount} />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // 가상 스크롤링 테이블
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="w-[50px]">번호</TableHead>
            {config.display.showThumbnail && <TableHead className="w-[60px]">썸네일</TableHead>}
            <TableHead>제목</TableHead>
            <TableHead className="w-[120px]">작성자</TableHead>
            <TableHead className="w-[100px]">작성일</TableHead>
            {true && (
              <>
                <TableHead className="w-[80px] text-center">조회</TableHead>
                <TableHead className="w-[80px] text-center">추천</TableHead>
                <TableHead className="w-[80px] text-center">댓글</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
      </Table>
      <div 
        ref={parentRef} 
        className="h-[600px] overflow-auto"
        style={{ contain: 'strict' }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const post = posts[virtualItem.index]
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow 
                      onClick={() => onPostClick(post)} 
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="w-[50px]">{post.id}</TableCell>
                      {config.display.showThumbnail && (
                        <TableCell className="w-[60px]">
                          {post.images[0]?.thumbnailUrl && (
                            <img src={post.images[0]?.thumbnailUrl} alt="" className="w-10 h-10 rounded object-cover" />
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {post.isPinned && <BiPin className="h-4 w-4 text-primary" />}
                          {post.isPrivate && <HiOutlineLockClosed className="h-4 w-4 text-muted-foreground" />}
                          <span className={cn(post.isPinned && "font-semibold")}>{post.title}</span>
                          {post.attachments.length > 0 && <HiOutlinePaperClip className="h-3 w-3 text-muted-foreground" />}
                          {false && <Badge variant="secondary">N</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{post.author.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="w-[100px] text-sm text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </TableCell>
                      {true && (
                        <>
                          <TableCell className="w-[80px] text-center">
                            <StatsBadge icon={HiOutlineEye} count={post.metadata.views} />
                          </TableCell>
                          <TableCell className="w-[80px] text-center">
                            <StatsBadge icon={HiOutlineHeart} count={post.metadata.likes} />
                          </TableCell>
                          <TableCell className="w-[80px] text-center">
                            <StatsBadge icon={HiOutlineChatBubbleLeft} count={post.metadata.commentsCount} />
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
BoardListVirtual.displayName = 'BoardListVirtual'