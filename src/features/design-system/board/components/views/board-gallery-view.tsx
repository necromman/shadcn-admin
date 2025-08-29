'use client'
import { Badge } from '@/components/ui/badge'
import { 
  HiOutlineEye, 
  HiOutlineHeart,
  HiOutlineDownload
} from 'react-icons/hi'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { BiPin } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { type Post, type BoardConfig, type BoardType } from '../../types/board.types'

interface BoardGalleryViewProps {
  posts: Post[]
  config: BoardConfig
  onPostClick: (post: Post) => void
  boardType: BoardType
  tableDensity?: 'compact' | 'normal' | 'comfortable'
}

export function BoardGalleryView({
  posts,
  onPostClick,
  tableDensity = 'normal'
}: BoardGalleryViewProps) {
  // 갤러리 그리드 레이아웃
  const gridClass = {
    compact: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2',
    normal: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4',
    comfortable: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
  }

  return (
    <div className={cn("grid", gridClass[tableDensity])}>
      {posts.map((post) => (
        <div
          key={post.id}
          className="group relative cursor-pointer overflow-hidden rounded-lg border bg-card transition-all hover:shadow-xl hover:-translate-y-1"
          onClick={() => onPostClick(post)}
        >
          {/* 이미지 영역 */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {post.images[0] ? (
              <img
                src={post.images[0].url}
                alt={post.images[0].alt || post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <HiOutlinePhoto className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* 오버레이 (호버 시) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* 상단 뱃지 */}
            <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
              <div className="flex flex-wrap gap-1">
                {post.isPinned && (
                  <div className="rounded-full bg-primary/90 p-1.5 text-primary-foreground shadow-lg">
                    <BiPin className="h-3 w-3" />
                  </div>
                )}
                {post.isNew && (
                  <Badge variant="destructive" className="h-5 text-[10px] shadow-lg">
                    NEW
                  </Badge>
                )}
              </div>
              {post.images.length > 1 && (
                <Badge variant="secondary" className="h-5 text-[10px] shadow-lg">
                  +{post.images.length - 1}
                </Badge>
              )}
            </div>

            {/* 하단 정보 (호버 시) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className={cn(
                "font-semibold line-clamp-2 mb-2",
                tableDensity === 'compact' ? 'text-sm' : 'text-base'
              )}>
                {post.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs">
                <span className="truncate">{post.author.name}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <HiOutlineEye className="h-3 w-3" />
                    <span>{post.metadata.views}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <HiOutlineHeart className="h-3 w-3" />
                    <span>{post.metadata.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 정보 (항상 표시) */}
          <div className={cn(
            "bg-background",
            tableDensity === 'compact' ? 'p-2' : 'p-3'
          )}>
            <h3 className={cn(
              "font-medium line-clamp-1 mb-1",
              tableDensity === 'compact' ? 'text-xs' : 'text-sm'
            )}>
              {post.title}
            </h3>

            <div className="flex items-center justify-between text-muted-foreground">
              <span className={cn(
                "truncate",
                tableDensity === 'compact' ? 'text-[10px]' : 'text-xs'
              )}>
                {post.author.name}
              </span>
              
              <div className={cn(
                "flex items-center gap-2",
                tableDensity === 'compact' ? 'text-[10px]' : 'text-xs'
              )}>
                <div className="flex items-center gap-0.5">
                  <HiOutlineEye className="h-3 w-3" />
                  <span>{post.metadata.views}</span>
                </div>
                {post.metadata.downloadCount !== undefined && (
                  <div className="flex items-center gap-0.5">
                    <HiOutlineDownload className="h-3 w-3" />
                    <span>{post.metadata.downloadCount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 카테고리/태그 */}
            {(post.category || post.tags.length > 0) && (
              <div className="mt-2 flex flex-wrap gap-1">
                {post.category && (
                  <Badge variant="outline" className="h-4 text-[10px]">
                    {post.category}
                  </Badge>
                )}
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="h-4 text-[10px]">
                    #{tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Badge variant="secondary" className="h-4 text-[10px]">
                    +{post.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}