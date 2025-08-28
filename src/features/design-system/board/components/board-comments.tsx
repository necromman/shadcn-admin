'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  HiHeart, 
  HiOutlineHeart,
  HiReply,
  HiDotsVertical,
  HiPencilAlt,
  HiTrash,
  HiFlag,
  HiAtSymbol,
  HiLockClosed,
  HiCheck,
  HiX
} from 'react-icons/hi'
import { cn } from '@/lib/utils'
import type { Comment } from '../types/comment.types'

interface BoardCommentsProps {
  comments: Comment[]
  currentUserId: string
  userRole: 'guest' | 'user' | 'member' | 'moderator' | 'admin'
  onCommentAdd?: (comment: Partial<Comment>) => void
  onCommentEdit?: (commentId: string, content: string) => void
  onCommentDelete?: (commentId: string) => void
  onCommentLike?: (commentId: string) => void
  onCommentReport?: (commentId: string) => void
  allowAnonymous?: boolean
  maxDepth?: number
}

export function BoardComments({
  comments,
  currentUserId,
  userRole,
  onCommentAdd,
  onCommentEdit,
  onCommentDelete,
  onCommentLike,
  onCommentReport,
  allowAnonymous = false,
  maxDepth = 2
}: BoardCommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [mentionOpen, setMentionOpen] = useState(false)
  const [mentionSearch, setMentionSearch] = useState('')
  const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 })
  const [selectedMentions, setSelectedMentions] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Mock user list for mentions
  const users = [
    { id: '1', name: '김철수', username: 'chulsoo' },
    { id: '2', name: '이영희', username: 'younghee' },
    { id: '3', name: '박민수', username: 'minsoo' },
    { id: '4', name: '정수진', username: 'sujin' },
    { id: '5', name: '최동현', username: 'donghyun' }
  ]

  const filteredUsers = users.filter(user => 
    user.name.includes(mentionSearch) || 
    user.username.includes(mentionSearch)
  )

  // Handle mention detection
  const handleCommentChange = (value: string) => {
    setNewComment(value)
    
    const lastAtSymbol = value.lastIndexOf('@')
    if (lastAtSymbol !== -1 && lastAtSymbol === value.length - 1 || 
        (lastAtSymbol !== -1 && value.substring(lastAtSymbol + 1).match(/^[a-zA-Z0-9가-힣]*$/))) {
      setMentionOpen(true)
      setMentionSearch(value.substring(lastAtSymbol + 1))
      
      if (textareaRef.current) {
        const rect = textareaRef.current.getBoundingClientRect()
        setMentionPosition({ x: rect.left, y: rect.bottom + 5 })
      }
    } else {
      setMentionOpen(false)
    }
  }

  const handleMentionSelect = (user: typeof users[0]) => {
    const lastAtSymbol = newComment.lastIndexOf('@')
    const newText = newComment.substring(0, lastAtSymbol) + `@${user.username} `
    setNewComment(newText)
    setSelectedMentions([...selectedMentions, user.id])
    setMentionOpen(false)
    textareaRef.current?.focus()
  }

  const handleSubmit = () => {
    if (newComment.trim()) {
      onCommentAdd?.({
        content: newComment,
        parentId: replyTo || undefined,
        isAnonymous,
        mentions: selectedMentions
      })
      setNewComment('')
      setReplyTo(null)
      setSelectedMentions([])
      setIsAnonymous(false)
    }
  }

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  const handleEditSubmit = (commentId: string) => {
    if (editContent.trim()) {
      onCommentEdit?.(commentId, editContent)
      setEditingId(null)
      setEditContent('')
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditContent('')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffMinutes = diff / (1000 * 60)
    const diffHours = diff / (1000 * 60 * 60)
    const diffDays = diff / (1000 * 60 * 60 * 24)
    
    if (diffMinutes < 1) {
      return '방금 전'
    } else if (diffMinutes < 60) {
      return `${Math.floor(diffMinutes)}분 전`
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}시간 전`
    } else if (diffDays < 7) {
      return `${Math.floor(diffDays)}일 전`
    } else {
      return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }

  const renderComment = (comment: Comment, depth: number = 0) => {
    const isAuthor = comment.author.id === currentUserId
    const canEdit = isAuthor && !comment.isDeleted
    const canDelete = isAuthor || userRole === 'admin' || userRole === 'moderator'
    const canReply = depth < maxDepth && !comment.isDeleted
    const isEditing = editingId === comment.id

    return (
      <div 
        key={comment.id}
        className={cn(
          "group",
          depth > 0 && "ml-8 md:ml-12"
        )}
      >
        <div className={cn(
          "flex gap-3 py-4",
          depth > 0 && "border-l-2 border-muted pl-4 md:pl-6"
        )}>
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback>
              {comment.isAnonymous ? '?' : comment.author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">
                    {comment.isAnonymous ? '익명' : comment.author.name}
                  </span>
                  {comment.author.role && !comment.isAnonymous && (
                    <Badge variant="outline" className="text-xs">
                      {comment.author.role}
                    </Badge>
                  )}
                  {comment.isPrivate && (
                    <Badge variant="secondary" className="text-xs gap-0.5">
                      <HiLockClosed className="h-2.5 w-2.5" />
                      비밀
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt)}
                    {comment.isEdited && ' (수정됨)'}
                  </span>
                </div>
                {comment.parentAuthor && (
                  <p className="text-xs text-muted-foreground">
                    @{comment.parentAuthor} 님에게 답글
                  </p>
                )}
              </div>

              {!comment.isDeleted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HiDotsVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canEdit && (
                      <>
                        <DropdownMenuItem onClick={() => handleEdit(comment)}>
                          <HiPencilAlt className="h-4 w-4 mr-2" />
                          수정
                        </DropdownMenuItem>
                      </>
                    )}
                    {canDelete && (
                      <>
                        <DropdownMenuItem 
                          onClick={() => onCommentDelete?.(comment.id)}
                          className="text-destructive"
                        >
                          <HiTrash className="h-4 w-4 mr-2" />
                          삭제
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {!isAuthor && (
                      <DropdownMenuItem 
                        onClick={() => onCommentReport?.(comment.id)}
                        className="text-destructive"
                      >
                        <HiFlag className="h-4 w-4 mr-2" />
                        신고
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  ref={editTextareaRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[60px] resize-none"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => handleEditSubmit(comment.id)}
                    className="gap-1"
                  >
                    <HiCheck className="h-3 w-3" />
                    수정
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={handleEditCancel}
                    className="gap-1"
                  >
                    <HiX className="h-3 w-3" />
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm">
                  {comment.isDeleted ? (
                    <p className="text-muted-foreground italic">삭제된 댓글입니다.</p>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {comment.content.split(' ').map((word, idx) => {
                        if (word.startsWith('@')) {
                          return (
                            <span key={idx} className="text-primary font-medium">
                              {word}{' '}
                            </span>
                          )
                        }
                        return word + ' '
                      })}
                    </p>
                  )}
                </div>

                {!comment.isDeleted && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <button
                      onClick={() => onCommentLike?.(comment.id)}
                      className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                    >
                      {comment.isLiked ? (
                        <HiHeart className="h-4 w-4 text-red-500" />
                      ) : (
                        <HiOutlineHeart className="h-4 w-4" />
                      )}
                      <span>{comment.likes}</span>
                    </button>
                    
                    {canReply && (
                      <button
                        onClick={() => setReplyTo(comment.id)}
                        className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                      >
                        <HiReply className="h-4 w-4" />
                        답글
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div>
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}

        {/* Reply input */}
        {replyTo === comment.id && (
          <div className={cn(
            "ml-11 md:ml-15 mb-4",
            depth > 0 && "ml-19 md:ml-27"
          )}>
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder={`@${comment.author.name}님에게 답글 작성...`}
                  value={newComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  className="min-h-[60px] resize-none"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {allowAnonymous && (
                      <label className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        익명
                      </label>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReplyTo(null)
                        setNewComment('')
                      }}
                    >
                      취소
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!newComment.trim()}
                    >
                      답글 작성
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const totalComments = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.replies?.length || 0)
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          댓글 ({totalComments})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Comment input */}
        {!replyTo && (
          <div className="flex gap-3 pb-4 border-b">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar-placeholder.png" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                ref={textareaRef}
                placeholder="댓글을 작성하세요... (@를 입력하여 사용자 멘션)"
                value={newComment}
                onChange={(e) => handleCommentChange(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              
              {/* Mention dropdown */}
              {mentionOpen && (
                <div 
                  className="absolute z-50 w-64 bg-background border rounded-lg shadow-lg p-2"
                  style={{ left: mentionPosition.x, top: mentionPosition.y }}
                >
                  <ScrollArea className="h-48">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <button
                          key={user.id}
                          className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-md text-left"
                          onClick={() => handleMentionSelect(user)}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {user.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">@{user.username}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        사용자를 찾을 수 없습니다.
                      </p>
                    )}
                  </ScrollArea>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {allowAnonymous && (
                    <label className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      익명으로 작성
                    </label>
                  )}
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    <HiAtSymbol className="h-4 w-4 inline mr-1" />
                    멘션
                  </button>
                </div>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!newComment.trim()}
                >
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-0 divide-y">
          {comments.length > 0 ? (
            comments.map(comment => renderComment(comment))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}