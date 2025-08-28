'use client'
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Post } from '../types/board.types'

interface BoardListGalleryProps {
  posts: Post[]
  onPostClick: (post: Post) => void
}

export const BoardListGallery = React.memo(({ 
  posts, 
  onPostClick
}: BoardListGalleryProps) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <Card 
          key={post.id}
          className="cursor-pointer overflow-hidden hover:bg-muted/50"
          onClick={() => onPostClick(post)}
        >
          <CardContent className="p-0">
            {/* 이미지 영역 - 와이어프레임 스타일 */}
            <div className="aspect-square bg-muted flex items-center justify-center">
              {post.images && post.images.length > 0 ? (
                <img 
                  src={post.images[0].thumbnailUrl || post.images[0].url} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl text-muted-foreground">🖼️</div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex-col items-start p-3 space-y-2">
            <h3 className="font-medium text-sm line-clamp-1">
              {post.title}
            </h3>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-muted-foreground">
                {post.author.name}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>조회 {post.metadata.views}</span>
                {post.metadata.likes > 0 && (
                  <span>♥ {post.metadata.likes}</span>
                )}
              </div>
            </div>
            {post.isNew && (
              <Badge variant="outline" className="text-xs">NEW</Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
})

BoardListGallery.displayName = 'BoardListGallery'