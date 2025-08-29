'use client'
import React from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { type Post, type BoardConfig } from '../types/board.types'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface BoardListNoticeProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
}

export const BoardListNotice = React.memo(({ 
  posts, 
  config,
  onPostClick,
  currentPage = 1
}: BoardListNoticeProps) => {
  
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
  }

  // 공지사항 우선순위 결정 (간소화)
  const getPriority = (post: Post): 'urgent' | 'important' | 'normal' => {
    if (post.title.includes('긴급')) return 'urgent'
    if (post.title.includes('중요') || post.isPinned) return 'important'
    return 'normal'
  }

  // 정렬 (고정 > 일반)
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-4">
      {/* 간소화된 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">번호</TableHead>
              <TableHead className="w-[80px]">구분</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[100px]">작성자</TableHead>
              <TableHead className="w-[80px] text-center">조회수</TableHead>
              <TableHead className="w-[100px]">등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPosts.map((post, index) => {
              const priority = getPriority(post)
              
              return (
                <TableRow 
                  key={post.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onPostClick(post)}
                >
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {post.isPinned ? '📌' : (currentPage - 1) * config.display.itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    {priority === 'urgent' && (
                      <Badge variant="outline">긴급</Badge>
                    )}
                    {priority === 'important' && (
                      <Badge variant="outline">중요</Badge>
                    )}
                    {priority === 'normal' && (
                      <Badge variant="outline">일반</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{post.title}</span>
                      {post.isNew && (
                        <Badge variant="outline" className="text-xs">NEW</Badge>
                      )}
                      {post.attachments.length > 0 && (
                        <span className="text-muted-foreground">📎</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {post.author.name}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {post.metadata.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})

BoardListNotice.displayName = 'BoardListNotice'