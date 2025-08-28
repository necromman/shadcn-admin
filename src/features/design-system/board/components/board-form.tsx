'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { HiXCircle, HiPlus, HiPaperClip, HiLockClosed, HiSpeakerphone, HiEye, HiPhotograph } from 'react-icons/hi'
import type { Post, BoardConfig, PostImage, PostAttachment } from '../types/board.types'

interface BoardFormProps {
  config: BoardConfig
  post?: Post | null
  onSubmit: (data: Partial<Post>) => void
  onCancel: () => void
}

export function BoardForm({ config, post, onSubmit, onCancel }: BoardFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [category, setCategory] = useState(post?.category || '')
  const [tags, setTags] = useState<string[]>(post?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [isPinned, setIsPinned] = useState(post?.isPinned || false)
  const [isPrivate, setIsPrivate] = useState(post?.isPrivate || false)
  const [images, setImages] = useState<PostImage[]>(post?.images || [])
  const [attachments, setAttachments] = useState<PostAttachment[]>(post?.attachments || [])
  const [contentType, setContentType] = useState<'text' | 'html' | 'markdown'>(post?.contentType || 'html')

  const isEditMode = !!post

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData: Partial<Post> = {
      title,
      content,
      contentType,
      category,
      tags,
      isPinned,
      isPrivate,
      images,
      attachments,
      status: 'published',
    }

    if (post) {
      formData.id = post.id
      formData.boardId = post.boardId
      formData.author = post.author
      formData.createdAt = post.createdAt
      formData.updatedAt = new Date().toISOString()
    } else {
      formData.id = `post_${Date.now()}`
      formData.boardId = config.id
      formData.author = {
        id: 'user_1',
        name: '현재 사용자',
        avatar: 'https://github.com/shadcn.png',
        role: 'member',
      }
      formData.createdAt = new Date().toISOString()
      formData.updatedAt = new Date().toISOString()
      formData.metadata = {
        views: 0,
        likes: 0,
        commentsCount: 0,
        isLiked: false,
      }
      formData.isLocked = false
    }

    onSubmit(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: PostImage[] = Array.from(files).map((file, index) => ({
      id: `img_${Date.now()}_${index}`,
      url: URL.createObjectURL(file),
      thumbnailUrl: URL.createObjectURL(file),
      alt: file.name,
      width: 800,
      height: 600,
      size: file.size,
    }))

    setImages([...images, ...newImages])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newAttachments: PostAttachment[] = Array.from(files).map((file, index) => ({
      id: `file_${Date.now()}_${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
    }))

    setAttachments([...attachments, ...newAttachments])
  }

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id))
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? '게시글 수정' : '게시글 작성'}</CardTitle>
          <CardDescription>
            {config.name} 게시판에 {isEditMode ? '게시글을 수정합니다' : '새 게시글을 작성합니다'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              required
            />
          </div>

          {/* 카테고리 */}
          {config.type !== 'notice' && (
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">일반</SelectItem>
                  <SelectItem value="question">질문</SelectItem>
                  <SelectItem value="info">정보</SelectItem>
                  <SelectItem value="discussion">토론</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* 내용 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">내용 *</Label>
              <Select value={contentType} onValueChange={(value) => setContentType(value as 'text' | 'html' | 'markdown')}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">텍스트</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="markdown">마크다운</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              rows={10}
              required
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {contentType === 'html' && 'HTML 태그를 사용할 수 있습니다'}
              {contentType === 'markdown' && '마크다운 문법을 사용할 수 있습니다'}
              {contentType === 'text' && '일반 텍스트로 작성됩니다'}
            </p>
          </div>

          {/* 태그 */}
          <div className="space-y-2">
            <Label htmlFor="tags">태그</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="태그 입력 후 Enter"
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <HiPlus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <HiXCircle
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* 이미지 업로드 */}
          {config.features.images && (
            <div className="space-y-2">
              <Label htmlFor="images">이미지</Label>
              <div className="flex items-center gap-2">
                <Button type="button" size="sm" variant="outline" asChild>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <HiPhotograph className="h-4 w-4 mr-2" />
                    이미지 추가
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
                <span className="text-xs text-muted-foreground">
                  JPG, PNG, GIF (최대 10MB)
                </span>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.map(image => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.thumbnailUrl}
                        alt={image.alt}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <HiXCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 파일 첨부 */}
          {config.features.attachments && (
            <div className="space-y-2">
              <Label htmlFor="attachments">첨부파일</Label>
              <div className="flex items-center gap-2">
                <Button type="button" size="sm" variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <HiPaperClip className="h-4 w-4 mr-2" />
                    파일 첨부
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </Button>
                <span className="text-xs text-muted-foreground">
                  모든 파일 형식 (최대 50MB)
                </span>
              </div>
              {attachments.length > 0 && (
                <div className="space-y-1 mt-2">
                  {attachments.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <HiPaperClip className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(file.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <HiXCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <Separator />

          {/* 게시글 옵션 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">게시글 옵션</h4>
            
            {/* 상단 고정 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HiSpeakerphone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="pinned" className="cursor-pointer">
                  상단 고정
                </Label>
              </div>
              <Switch
                id="pinned"
                checked={isPinned}
                onCheckedChange={setIsPinned}
              />
            </div>

            {/* 비공개 게시글 */}
            {config.features.privatePost && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiLockClosed className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="private" className="cursor-pointer">
                    비공개 게시글
                  </Label>
                </div>
                <Switch
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* 미리보기 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HiEye className="h-4 w-4" />
              <span>미리보기</span>
            </div>
            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{title || '(제목 없음)'}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {category && <Badge variant="outline" className="text-xs">{category}</Badge>}
                  {isPinned && <Badge variant="default" className="text-xs">📌 고정</Badge>}
                  {isPrivate && <Badge variant="secondary" className="text-xs">🔒 비공개</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3 whitespace-pre-wrap">
                  {content || '(내용 없음)'}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
            <Button type="submit">
              {isEditMode ? '수정하기' : '작성하기'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}