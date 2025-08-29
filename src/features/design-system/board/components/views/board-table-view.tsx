'use client'
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
  HiOutlineLockClosed
} from 'react-icons/hi2'
import { BiPin } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { type Post, type BoardConfig, type BoardType } from '../../types/board.types'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface BoardTableViewProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  boardType: BoardType
  tableDensity?: 'compact' | 'normal' | 'comfortable'
}

export function BoardTableView({
  posts,
  config: _config,
  onPostClick,
  boardType,
  tableDensity = 'normal'
}: BoardTableViewProps) {
  // 테이블 밀도에 따른 스타일
  const densityClasses = {
    compact: 'h-8 text-xs',
    normal: 'h-12 text-sm',
    comfortable: 'h-14 text-base'
  }

  const cellPadding = {
    compact: 'py-1 px-2',
    normal: 'py-2 px-4',
    comfortable: 'py-3 px-4'
  }

  const rowClass = densityClasses[tableDensity]
  const cellClass = cellPadding[tableDensity]

  // 게시판 타입별 컬럼 구성
  const getColumns = () => {
    const baseColumns = ['번호', '제목', '작성자', '작성일', '조회수']
    
    switch (boardType) {
      case 'notice':
        return baseColumns
      case 'general':
        return [...baseColumns, '추천', '댓글']
      case 'faq':
        return ['번호', '질문', '카테고리', '도움됨', '작성일']
      case 'gallery':
        return ['번호', '이미지', '제목', '작성자', '다운로드', '좋아요', '작성일']
      case 'qna':
        return ['번호', '상태', '제목', '작성자', '답변', '보상', '작성일']
      default:
        return baseColumns
    }
  }

  const columns = getColumns()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className={cn(cellClass)}>
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow
              key={post.id}
              className={cn(
                rowClass,
                "cursor-pointer hover:bg-accent transition-colors",
                post.isPinned && "bg-muted/50"
              )}
              onClick={() => onPostClick(post)}
            >
              {/* 번호 */}
              <TableCell className={cn(cellClass, "font-medium")}>
                {post.isPinned ? (
                  <BiPin className="h-4 w-4 text-primary" />
                ) : (
                  index + 1
                )}
              </TableCell>

              {/* 게시판 타입별 렌더링 */}
              {boardType === 'gallery' && (
                <TableCell className={cellClass}>
                  {post.images[0] && (
                    <img 
                      src={post.images[0].thumbnailUrl || post.images[0].url}
                      alt={post.images[0].alt}
                      className="h-10 w-10 rounded object-cover"
                    />
                  )}
                </TableCell>
              )}

              {boardType === 'qna' && (
                <TableCell className={cellClass}>
                  <Badge variant={post.metadata.answerCount ? "default" : "secondary"}>
                    {post.metadata.answerCount ? "답변완료" : "미답변"}
                  </Badge>
                </TableCell>
              )}

              {/* 제목 */}
              <TableCell className={cn(cellClass, "max-w-[400px]")}>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "truncate",
                    post.isPrivate && "text-muted-foreground"
                  )}>
                    {post.title}
                  </span>
                  {post.isPrivate && <HiOutlineLockClosed className="h-3 w-3 text-muted-foreground" />}
                  {post.isNew && <Badge variant="destructive" className="h-4 text-[10px]">NEW</Badge>}
                  {post.images.length > 0 && boardType !== 'gallery' && (
                    <Badge variant="outline" className="h-4 text-[10px]">이미지</Badge>
                  )}
                  {post.attachments.length > 0 && (
                    <Badge variant="outline" className="h-4 text-[10px]">첨부</Badge>
                  )}
                </div>
              </TableCell>

              {/* FAQ 카테고리 */}
              {boardType === 'faq' && (
                <TableCell className={cellClass}>
                  {post.category && <Badge variant="outline">{post.category}</Badge>}
                </TableCell>
              )}

              {/* 작성자 */}
              {boardType !== 'faq' && (
                <TableCell className={cellClass}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{post.author.name}</span>
                  </div>
                </TableCell>
              )}

              {/* QnA 답변 수 */}
              {boardType === 'qna' && (
                <>
                  <TableCell className={cellClass}>
                    <span className="text-xs">{post.metadata.answerCount || 0}</span>
                  </TableCell>
                  <TableCell className={cellClass}>
                    {post.metadata.bounty && (
                      <Badge variant="default" className="text-[10px]">
                        {post.metadata.bounty}P
                      </Badge>
                    )}
                  </TableCell>
                </>
              )}

              {/* FAQ 도움됨 */}
              {boardType === 'faq' && (
                <TableCell className={cellClass}>
                  <span className="text-xs">
                    👍 {post.metadata.helpfulCount || 0}
                  </span>
                </TableCell>
              )}

              {/* 작성일 */}
              <TableCell className={cn(cellClass, "text-muted-foreground")}>
                <span className="text-xs">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: ko
                  })}
                </span>
              </TableCell>

              {/* 조회수 */}
              {(boardType === 'notice' || boardType === 'general') && (
                <TableCell className={cellClass}>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <HiOutlineEye className="h-3 w-3" />
                    <span className="text-xs">{post.metadata.views}</span>
                  </div>
                </TableCell>
              )}

              {/* 갤러리 다운로드 */}
              {boardType === 'gallery' && (
                <TableCell className={cellClass}>
                  <span className="text-xs">{post.metadata.downloadCount || 0}</span>
                </TableCell>
              )}

              {/* 추천/좋아요 */}
              {(boardType === 'general' || boardType === 'gallery') && (
                <TableCell className={cellClass}>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <HiOutlineHeart className="h-3 w-3" />
                    <span className="text-xs">{post.metadata.likes}</span>
                  </div>
                </TableCell>
              )}

              {/* 댓글 */}
              {boardType === 'general' && (
                <TableCell className={cellClass}>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <HiOutlineChatBubbleLeft className="h-3 w-3" />
                    <span className="text-xs">{post.metadata.commentsCount}</span>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}