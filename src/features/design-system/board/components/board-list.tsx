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
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  HiOutlineEye, 
  HiOutlineHeart, 
  HiOutlineChatBubbleLeft,
  HiOutlineLockClosed
} from 'react-icons/hi2'
import { BiPin } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { type Post, type BoardConfig } from '../types/board.types'
import type { TableDensity } from '../hooks/use-table-density'
import { densityStyles } from '../hooks/use-table-density'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'

// 게시판 타입별 전용 컴포넌트 import
import { BoardListNotice } from './board-list-notice'
import { BoardListGeneral } from './board-list-general'
import { BoardListGallery } from './board-list-gallery'

interface BoardListProps {
  posts: Post[]
  config: BoardConfig
  viewType?: 'table' | 'card' | 'gallery' | 'list'
  onPostClick: (post: Post) => void
  currentPage?: number
  totalPages?: number
  totalPosts?: number
  onPageChange?: (page: number) => void
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  paginationType?: 'pagination' | 'infinite-scroll'
  tableDensity?: TableDensity
}

// 메모이제이션된 페이지네이션 컴포넌트
const Pagination = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10
}: { 
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
}) => {
  // 페이지 번호 배열 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pages = []
    const maxPages = 5
    
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 현재 페이지를 중심으로 페이지 번호 표시
      let start = Math.max(1, currentPage - 2)
      let end = Math.min(totalPages, start + maxPages - 1)
      
      if (end - start < maxPages - 1) {
        start = Math.max(1, end - maxPages + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  const pages = getPageNumbers()
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col gap-3">
      {/* 아이템 정보 */}
      {totalItems > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          전체 {totalItems}개 중 {startItem}-{endItem}개 표시
        </div>
      )}
      
      {/* 페이지네이션 */}
      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange?.(currentPage - 1)}
              className={cn(
                "cursor-pointer",
                currentPage === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
          
          {/* 첫 페이지 */}
          {pages[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink 
                  onClick={() => onPageChange?.(1)}
                  className="cursor-pointer"
                  size="icon"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {pages[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}
          
          {/* 페이지 번호들 */}
          {pages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink 
                onClick={() => onPageChange?.(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
                size="icon"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {/* 마지막 페이지 */}
          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink 
                  onClick={() => onPageChange?.(totalPages)}
                  className="cursor-pointer"
                  size="icon"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange?.(currentPage + 1)}
              className={cn(
                "cursor-pointer",
                currentPage === totalPages && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  )
})
Pagination.displayName = 'Pagination'

// 메모이제이션된 통계 뱃지 컴포넌트
const StatsBadge = React.memo(({ icon: Icon, count }: { icon: any; count: number }) => (
  <span className="flex items-center gap-1 text-xs text-muted-foreground">
    <Icon className="h-3 w-3" />
    {count.toLocaleString()}
  </span>
))
StatsBadge.displayName = 'StatsBadge'

export const BoardList = React.memo(({ 
  posts, 
  config, 
  viewType,
  onPostClick,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  paginationType = 'pagination',
  tableDensity = 'normal'
}: BoardListProps) => {
  // viewType이 명시적으로 전달되면 사용, 아니면 config에서 가져오기
  const displayViewType = viewType || config.display.viewType
  const displayPaginationType = paginationType || config.display.paginationType || 'pagination'
  const displayTableDensity = tableDensity || config.display.tableDensity || 'normal'
  
  // 밀도 스타일
  const density = densityStyles[displayTableDensity]
  
  // 무한스크롤 훅
  const { setLoadingElement } = useInfiniteScroll({
    hasMore: hasMore && displayPaginationType === 'infinite-scroll',
    loading: isLoadingMore,
    onLoadMore: onLoadMore || (() => {}),
    threshold: config.display.infiniteScrollThreshold || 200,
    enabled: displayPaginationType === 'infinite-scroll'
  })
  
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
  }

  const truncateText = (text: string, length: number) => {
    const stripped = text.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
    return stripped.length > length ? `${stripped.slice(0, length)}...` : stripped
  }

  // 게시판 타입별 전용 UI 렌더링
  // 공지사항 게시판
  if (config.id === 'board_notice') {
    return (
      <div className="space-y-4">
        <BoardListNotice 
          posts={posts} 
          onPostClick={onPostClick}
          currentPage={currentPage}
          itemsPerPage={config.display.itemsPerPage}
        />
        
        {/* 페이지네이션 */}
        {displayPaginationType === 'pagination' && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
            totalItems={posts.length * totalPages}
            itemsPerPage={config.display.itemsPerPage}
          />
        )}
      </div>
    )
  }

  // 자유게시판
  if (config.id === 'board_general') {
    return (
      <div className="space-y-4">
        <BoardListGeneral 
          posts={posts} 
          onPostClick={onPostClick}
        />
        
        {/* 페이지네이션 */}
        {displayPaginationType === 'pagination' && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
            totalItems={posts.length * totalPages}
            itemsPerPage={config.display.itemsPerPage}
          />
        )}
      </div>
    )
  }

  // 갤러리 게시판
  if (config.id === 'board_gallery') {
    return (
      <div className="space-y-4">
        <BoardListGallery 
          posts={posts} 
          onPostClick={onPostClick}
        />
        
        {/* 페이지네이션 또는 무한스크롤 */}
        {displayPaginationType === 'pagination' && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
            totalItems={posts.length * totalPages}
            itemsPerPage={config.display.itemsPerPage}
          />
        )}
        
        {displayPaginationType === 'infinite-scroll' && (
          <div ref={setLoadingElement} className="flex justify-center p-4">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                더 불러오는 중...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <span className="text-sm text-muted-foreground">모든 작품을 불러왔습니다</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // 테이블 뷰
  if (displayViewType === 'table') {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table className={cn(displayTableDensity === 'compact' && 'text-xs')}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-[100px]">작성자</TableHead>
                <TableHead className="w-[80px] text-center">조회</TableHead>
                {config.features.likes && (
                  <TableHead className="w-[80px] text-center">좋아요</TableHead>
                )}
                <TableHead className="w-[100px]">작성일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow 
                  key={post.id}
                  className={cn(
                    "cursor-pointer hover:bg-muted/50",
                    post.isPinned && "bg-muted/30"
                  )}
                  onClick={() => onPostClick(post)}
                >
                  <TableCell className={cn("text-center text-muted-foreground", density.padding)}>
                    {post.isPinned ? '📌' : (currentPage - 1) * config.display.postsPerPage + index + 1}
                  </TableCell>
                  <TableCell className={density.padding}>
                    <div className={cn("flex items-center", density.gapSize)}>
                      <span>{post.title}</span>
                      {post.isPrivate && <span className="text-muted-foreground">🔒</span>}
                      {post.attachments.length > 0 && <span className="text-muted-foreground">📎</span>}
                      {post.metadata.commentsCount > 0 && (
                        <span className="text-xs text-muted-foreground">
                          [{post.metadata.commentsCount}]
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{post.author.name}</span>
                  </TableCell>
                  <TableCell className={cn("text-center text-muted-foreground", density.padding)}>
                    {post.metadata.views}
                  </TableCell>
                  {config.features.likes && (
                    <TableCell className={cn("text-center text-muted-foreground", density.padding)}>
                      {post.metadata.likes}
                    </TableCell>
                  )}
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(post.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* 페이지네이션 또는 무한스크롤 */}
        {displayPaginationType === 'pagination' && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
            totalItems={posts.length * totalPages}
            itemsPerPage={config.display.itemsPerPage}
          />
        )}
        
        {displayPaginationType === 'infinite-scroll' && (
          <div ref={setLoadingElement} className="flex justify-center p-4">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                더 불러오는 중...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <span className="text-sm text-muted-foreground">모든 게시글을 불러왔습니다</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // 카드 뷰
  if (displayViewType === 'card') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {posts.map((post) => (
            <Card 
              key={post.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onPostClick(post)}
            >
              {post.images.length > 0 && config.display.showThumbnail && (
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={post.images[0].thumbnailUrl || post.images[0].url}
                    alt={post.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium line-clamp-2">
                      {post.isPinned && <span>📌 </span>}
                      {post.title}
                    </h3>
                    {post.isPrivate && (
                      <span className="text-muted-foreground">🔒</span>
                    )}
                  </div>
                  {config.display.showExcerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {truncateText(post.content, config.display.excerptLength)}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author.name}</span>
                    <span>·</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HiOutlineEye className="h-4 w-4" />
                      {post.metadata.views}
                    </span>
                    {config.features.likes && (
                      <span className="flex items-center gap-1">
                        <HiOutlineHeart className="h-4 w-4" />
                        {post.metadata.likes}
                      </span>
                    )}
                    {config.features.comments && (
                      <span className="flex items-center gap-1">
                        <HiOutlineChatBubbleLeft className="h-4 w-4" />
                        {post.metadata.commentsCount}
                      </span>
                    )}
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* 페이지네이션 또는 무한스크롤 */}
        {displayPaginationType === 'pagination' && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
            totalItems={posts.length * totalPages}
            itemsPerPage={config.display.itemsPerPage}
          />
        )}
        
        {displayPaginationType === 'infinite-scroll' && (
          <div ref={setLoadingElement} className="flex justify-center p-4">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                더 불러오는 중...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <span className="text-sm text-muted-foreground">모든 게시글을 불러왔습니다</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // 갤러리 뷰
  if (displayViewType === 'gallery') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children">
          {posts.map((post) => (
            <div
              key={post.id}
              className={cn(
                "group cursor-pointer",
                post.isPinned && "ring-2 ring-primary/20 rounded-lg"
              )}
              onClick={() => onPostClick(post)}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                {post.images.length > 0 ? (
                  <img 
                    src={post.images[0].thumbnailUrl || post.images[0].url}
                    alt={post.images[0].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
              </div>
              <div className="mt-2 space-y-1">
                <h3 className={cn(
                  "font-medium text-sm line-clamp-2 group-hover:text-primary",
                  post.isPinned && "text-primary"
                )}>
                  {post.isPinned && (
                    <BiPin className="inline-block h-3 w-3 mr-1" />
                  )}
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <HiOutlineEye className="h-3 w-3" />
                      {post.metadata.views}
                    </span>
                    {config.features.likes && (
                      <span className="flex items-center gap-0.5">
                        <HiOutlineHeart className="h-3 w-3" />
                        {post.metadata.likes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 페이지네이션 또는 무한스크롤 */}
        {displayPaginationType === 'pagination' && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
            totalItems={posts.length * totalPages}
            itemsPerPage={config.display.itemsPerPage}
          />
        )}
        
        {displayPaginationType === 'infinite-scroll' && (
          <div ref={setLoadingElement} className="flex justify-center p-4">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                더 불러오는 중...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <span className="text-sm text-muted-foreground">모든 게시글을 불러왔습니다</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // 리스트 뷰
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className={cn(
              "p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors",
              post.isPinned && "bg-muted/30 border-primary/20"
            )}
            onClick={() => onPostClick(post)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className={cn(
                  "font-semibold",
                  post.isPinned && "text-primary"
                )}>
                  {post.isPinned && (
                    <BiPin className="inline-block h-4 w-4 mr-1" />
                  )}
                  {post.title}
                  {post.isPrivate && (
                    <HiOutlineLockClosed className="inline-block h-3.5 w-3.5 ml-2 text-muted-foreground" />
                  )}
                </h3>
                {post.tags.length > 0 && (
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {config.display.showExcerpt && (
                <p className="text-sm text-muted-foreground">
                  {truncateText(post.content, config.display.excerptLength)}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {post.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground">{post.author.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <HiOutlineEye className="h-4 w-4" />
                    {post.metadata.views}
                  </span>
                  {config.features.likes && (
                    <span className="flex items-center gap-1">
                      <HiOutlineHeart className="h-4 w-4" />
                      {post.metadata.likes}
                    </span>
                  )}
                  {config.features.comments && (
                    <span className="flex items-center gap-1">
                      <HiOutlineChatBubbleLeft className="h-4 w-4" />
                      {post.metadata.commentsCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 페이지네이션 또는 무한스크롤 */}
      {displayPaginationType === 'pagination' && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange}
          totalItems={posts.length * totalPages}
          itemsPerPage={config.display.itemsPerPage}
        />
      )}
      
      {displayPaginationType === 'infinite-scroll' && (
        <div ref={setLoadingElement} className="flex justify-center p-4">
          {isLoadingMore && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              더 불러오는 중...
            </div>
          )}
          {!hasMore && posts.length > 0 && (
            <span className="text-sm text-muted-foreground">모든 게시글을 불러왔습니다</span>
          )}
        </div>
      )}
    </div>
  )
})
BoardList.displayName = 'BoardList'

