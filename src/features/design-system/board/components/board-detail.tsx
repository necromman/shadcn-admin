'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { 
  HiArrowLeft, 
  HiEye, 
  HiHeart, 
  HiChat, 
  HiShare,
  HiPencilAlt,
  HiTrash,
  HiDotsVertical,
  HiLockClosed,
  HiSpeakerphone,
  HiDownload,
  HiPhotograph,
  HiPaperClip,
  HiOutlineHeart,
  HiBookmark,
  HiOutlineBookmark,
  HiFlag,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi'
import type { Post, BoardConfig } from '../types/board.types'
import { BoardImageViewer } from './board-image-viewer'

interface BoardDetailProps {
  post: Post
  config: BoardConfig
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onNavigate?: (direction: 'prev' | 'next') => void
  hasNavigation?: boolean
  isAuthor?: boolean
  isAdmin?: boolean
}

export function BoardDetail({
  post,
  config,
  onBack,
  onEdit,
  onDelete,
  onNavigate,
  hasNavigation = false,
  isAuthor = false,
  isAdmin = false
}: BoardDetailProps) {
  const [isLiked, setIsLiked] = useState(post.metadata.isLiked)
  const [likeCount, setLikeCount] = useState(post.metadata.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffHours = diff / (1000 * 60 * 60)
    
    if (diffHours < 24) {
      return `${Math.floor(diffHours)}시간 전`
    } else if (diffHours < 168) {
      return `${Math.floor(diffHours / 24)}일 전`
    } else {
      return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const renderContent = () => {
    if (post.contentType === 'html') {
      return (
        <div 
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )
    } else if (post.contentType === 'markdown') {
      // 실제로는 마크다운 파서를 사용해야 함
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans">{post.content}</pre>
        </div>
      )
    } else {
      return (
        <div className="whitespace-pre-wrap text-sm">
          {post.content}
        </div>
      )
    }
  }

  return (
    <>
      <Card className="w-full">
        {/* 헤더 */}
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="gap-1"
            >
              <HiArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
            
            <div className="flex items-center gap-2">
              {hasNavigation && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onNavigate?.('prev')}
                  >
                    <HiChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onNavigate?.('next')}
                  >
                    <HiChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HiDotsVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <HiShare className="h-4 w-4 mr-2" />
                    공유하기
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBookmark}>
                    {isBookmarked ? (
                      <HiBookmark className="h-4 w-4 mr-2" />
                    ) : (
                      <HiOutlineBookmark className="h-4 w-4 mr-2" />
                    )}
                    북마크
                  </DropdownMenuItem>
                  {(isAuthor || isAdmin) && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onEdit}>
                        <HiPencilAlt className="h-4 w-4 mr-2" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onDelete} className="text-destructive">
                        <HiTrash className="h-4 w-4 mr-2" />
                        삭제
                      </DropdownMenuItem>
                    </>
                  )}
                  {!isAuthor && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <HiFlag className="h-4 w-4 mr-2" />
                        신고하기
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 제목 및 메타 정보 */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {post.isPinned && (
                    <Badge variant="default" className="gap-1">
                      <HiSpeakerphone className="h-3 w-3" />
                      고정
                    </Badge>
                  )}
                  {post.isPrivate && (
                    <Badge variant="secondary" className="gap-1">
                      <HiLockClosed className="h-3 w-3" />
                      비공개
                    </Badge>
                  )}
                  {post.isLocked && (
                    <Badge variant="outline" className="gap-1">
                      <HiLockClosed className="h-3 w-3" />
                      잠김
                    </Badge>
                  )}
                  {post.category && (
                    <Badge variant="outline">{post.category}</Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </div>
            </div>

            {/* 작성자 정보 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{post.author.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {post.author.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.createdAt)}
                    {post.updatedAt !== post.createdAt && ' (수정됨)'}
                  </p>
                </div>
              </div>

              {/* 통계 */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <HiEye className="h-4 w-4" />
                  <span className="text-sm">{post.metadata.views}</span>
                </div>
                {config.features.likes && (
                  <div className="flex items-center gap-1">
                    {isLiked ? (
                      <HiHeart className="h-4 w-4 text-red-500" />
                    ) : (
                      <HiOutlineHeart className="h-4 w-4" />
                    )}
                    <span className="text-sm">{likeCount}</span>
                  </div>
                )}
                {config.features.comments && (
                  <div className="flex items-center gap-1">
                    <HiChat className="h-4 w-4" />
                    <span className="text-sm">{post.metadata.commentsCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        {/* 본문 */}
        <CardContent className="py-6">
          <div className="min-h-[200px]">
            {renderContent()}
          </div>

          {/* 이미지 갤러리 */}
          {post.images.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HiPhotograph className="h-4 w-4" />
                <span>이미지 ({post.images.length})</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {post.images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative aspect-square cursor-pointer group"
                    onClick={() => {
                      setSelectedImageIndex(index)
                      setImageViewerOpen(true)
                    }}
                  >
                    <img
                      src={image.thumbnailUrl}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <HiEye className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 첨부파일 */}
          {post.attachments.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HiPaperClip className="h-4 w-4" />
                <span>첨부파일 ({post.attachments.length})</span>
              </div>
              <div className="space-y-2">
                {post.attachments.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HiPaperClip className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <HiDownload className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <Separator />

        {/* 하단 액션 */}
        <CardFooter className="justify-between">
          <div className="flex gap-2">
            {config.features.likes && (
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="gap-1"
              >
                {isLiked ? (
                  <HiHeart className="h-4 w-4" />
                ) : (
                  <HiOutlineHeart className="h-4 w-4" />
                )}
                좋아요 {likeCount > 0 && `(${likeCount})`}
              </Button>
            )}
            
            <Button variant="outline" size="sm" className="gap-1">
              <HiShare className="h-4 w-4" />
              공유
            </Button>
            
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={handleBookmark}
              className="gap-1"
            >
              {isBookmarked ? (
                <HiBookmark className="h-4 w-4" />
              ) : (
                <HiOutlineBookmark className="h-4 w-4" />
              )}
              북마크
            </Button>
          </div>

          {(isAuthor || isAdmin) && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <HiPencilAlt className="h-4 w-4 mr-1" />
                수정
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <HiTrash className="h-4 w-4 mr-1" />
                삭제
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* 이미지 뷰어 모달 */}
      <BoardImageViewer
        images={post.images.map(img => img.url)}
        initialIndex={selectedImageIndex}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
      />
    </>
  )
}