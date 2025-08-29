'use client'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Post, type BoardConfig } from '../types/board.types'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface BoardListGeneralProps {
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

export const BoardListGeneral = React.memo(({ 
  posts, 
  config: _config,
  onPostClick,
  currentPage: _currentPage = 1,
  totalPages: _totalPages = 1,
  onPageChange: _onPageChange,
  onLoadMore: _onLoadMore,
  hasMore: _hasMore = false,
  isLoadingMore: _isLoadingMore = false
}: BoardListGeneralProps) => {
  
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
  }

  // 카테고리 표시 (간소화)
  const getCategory = (post: Post) => {
    if (post.category) {
      return post.category
    }
    // 제목에서 카테고리 추출 (예: [일상], [유머] 등)
    const match = post.title.match(/\[(.*?)\]/)
    return match ? match[1] : '일반'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <Card 
          key={post.id} 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onPostClick(post)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {getCategory(post)}
                  </Badge>
                  {post.isNew && (
                    <Badge variant="outline" className="text-xs">NEW</Badge>
                  )}
                  {post.metadata.views > 100 && (
                    <Badge variant="outline" className="text-xs">인기</Badge>
                  )}
                </div>
                <h3 className="font-medium line-clamp-1">
                  {post.title}
                </h3>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pb-3">
            {post.content && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.content.substring(0, 100)}
              </p>
            )}
          </CardContent>
          
          <CardFooter className="pt-3 border-t">
            <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>{post.author.name}</span>
                <span>·</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>조회 {post.metadata.views}</span>
                <span>댓글 {post.metadata.commentsCount}</span>
                {post.metadata.likes > 0 && (
                  <span>좋아요 {post.metadata.likes}</span>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
})

BoardListGeneral.displayName = 'BoardListGeneral'