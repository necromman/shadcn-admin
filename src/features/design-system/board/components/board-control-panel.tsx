'use client'

import React from 'react'
import { HiCog6Tooth } from 'react-icons/hi2'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { type BoardConfig, type UserRole } from '../types/board.types'
import { boardConfigs } from '../data/board-configs'
// import { useAuth } from '../contexts/auth-context' // AuthProvider가 래핑되지 않은 경우 에러 방지
import { Badge } from '@/components/ui/badge'

interface BoardControlPanelProps {
  config: BoardConfig
  onConfigChange: (config: BoardConfig) => void
  viewMode?: 'list' | 'detail' | 'create' | 'edit'
  currentUserRole?: UserRole
}

export const BoardControlPanel = React.memo(({ 
  config, 
  onConfigChange,
  viewMode = 'list',
  currentUserRole: propRole
}: BoardControlPanelProps) => {
  // Auth Context 사용 (prop이 없으면 기본값 사용)
  // const auth = useAuth() // AuthProvider가 없을 수 있으므로 주석 처리
  const auth = null // 임시로 null 설정
  const currentUserRole = propRole || 'user'
  const handleBoardTypeChange = (boardId: string) => {
    const newConfig = boardConfigs.find(c => c.id === boardId)
    if (newConfig) {
      onConfigChange(newConfig)
    }
  }

  const handleFeatureToggle = (feature: keyof BoardConfig['features']) => {
    onConfigChange({
      ...config,
      features: {
        ...config.features,
        [feature]: !config.features[feature]
      }
    })
  }

  const handleViewTypeChange = (viewType: BoardConfig['display']['viewType']) => {
    onConfigChange({
      ...config,
      display: {
        ...config.display,
        viewType
      }
    })
  }

  const handlePageSizeChange = (pageSize: string) => {
    onConfigChange({
      ...config,
      display: {
        ...config.display,
        itemsPerPage: parseInt(pageSize)
      }
    })
  }

  const handleSortByChange = (sortBy: string) => {
    onConfigChange({
      ...config,
      display: {
        ...config.display,
        sortBy: sortBy as 'latest' | 'oldest' | 'popular' | 'comments'
      }
    })
  }

  // 뷰 모드에 따른 제목 설정
  const getPanelTitle = () => {
    switch(viewMode) {
      case 'detail': return '상세보기 설정'
      case 'create': return '글쓰기 설정'
      case 'edit': return '수정 설정'
      default: return '게시판 설정'
    }
  }

  // 권한 체크 헬퍼
  const hasPermission = (permission: string[]) => {
    return permission.includes('all') || permission.includes(currentUserRole)
  }

  return (
    <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HiCog6Tooth className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
          <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">
            {getPanelTitle()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {auth && auth !== null && (auth as any).isImpersonating && (
            <Badge variant="outline" className="text-xs bg-yellow-100 dark:bg-yellow-900/20">
              Impersonation
            </Badge>
          )}
          <span className="text-xs text-slate-500 dark:text-muted-foreground">
            현재 모드: {viewMode} | 권한: {currentUserRole}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* 리스트 뷰에서만 게시판 타입 선택 가능 */}
        {viewMode === 'list' && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">게시판 타입</Label>
          <Select value={config.id} onValueChange={handleBoardTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {boardConfigs.map(board => (
                <SelectItem key={board.id} value={board.id}>
                  <div className="flex items-center gap-2">
                    <span>{board.name}</span>
                    <span className="text-xs text-muted-foreground">({board.type})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-500 dark:text-muted-foreground">
            {config.description}
          </p>
        </div>
        )}

        {/* 권한 정보 표시 - 모든 뷰에서 표시 */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">권한 설정</Label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-slate-600 dark:text-muted-foreground">읽기:</span>
              <span className={`font-medium ${hasPermission(config.permissions.read) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {hasPermission(config.permissions.read) ? '가능' : '불가'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-600 dark:text-muted-foreground">쓰기:</span>
              <span className={`font-medium ${hasPermission(config.permissions.write) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {hasPermission(config.permissions.write) ? '가능' : '불가'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-600 dark:text-muted-foreground">댓글:</span>
              <span className={`font-medium ${hasPermission(config.permissions.comment) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {hasPermission(config.permissions.comment) ? '가능' : '불가'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-600 dark:text-muted-foreground">삭제:</span>
              <span className={`font-medium ${hasPermission(config.permissions.delete) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {hasPermission(config.permissions.delete) ? '가능' : '불가'}
              </span>
            </div>
          </div>
          {/* 권한 상세 정보 */}
          {viewMode === 'detail' && (
            <div className="mt-2 p-2 bg-slate-50 dark:bg-muted/20 rounded text-xs">
              <p className="text-slate-600 dark:text-muted-foreground">
                현재 사용자 권한({currentUserRole})으로 이 게시글에서 할 수 있는 작업:
              </p>
              <ul className="mt-1 space-y-0.5">
                {hasPermission(config.permissions.read) && <li>• 게시글 읽기</li>}
                {hasPermission(config.permissions.comment) && <li>• 댓글 작성</li>}
                {hasPermission(config.permissions.write) && <li>• 새 글 작성</li>}
                {hasPermission(config.permissions.delete) && <li>• 게시글 삭제</li>}
              </ul>
            </div>
          )}
        </div>

        {/* 작성/수정 모드에서만 기능 설정 표시 */}
        {(viewMode === 'create' || viewMode === 'edit') && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">사용 가능한 기능</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="comments"
                checked={config.features.comments}
                onCheckedChange={() => handleFeatureToggle('comments')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="comments" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                댓글 허용
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="likes"
                checked={config.features.likes}
                onCheckedChange={() => handleFeatureToggle('likes')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="likes" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                좋아요
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="attachments"
                checked={config.features.attachments}
                onCheckedChange={() => handleFeatureToggle('attachments')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="attachments" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                파일 첨부
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="images"
                checked={config.features.images}
                onCheckedChange={() => handleFeatureToggle('images')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="images" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                이미지 업로드
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mentions"
                checked={config.features.mentions}
                onCheckedChange={() => handleFeatureToggle('mentions')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="mentions" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                @멘션
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="privatePost"
                checked={config.features.privatePost}
                onCheckedChange={() => handleFeatureToggle('privatePost')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="privatePost" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                비공개 글
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymousPost"
                checked={config.features.anonymousPost}
                onCheckedChange={() => handleFeatureToggle('anonymousPost')}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="anonymousPost" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                익명 작성
              </Label>
            </div>
          </div>
        </div>
        )}

        {/* 리스트 뷰에서만 표시 옵션 */}
        {viewMode === 'list' && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">표시 옵션</Label>
          
          {/* 페이지네이션 타입 선택 */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-600 dark:text-muted-foreground">페이지네이션 방식</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs">페이지네이션</span>
                <Switch
                  checked={config.display.paginationType === 'infinite-scroll'}
                  onCheckedChange={(checked) => {
                    onConfigChange({
                      ...config,
                      display: {
                        ...config.display,
                        paginationType: checked ? 'infinite-scroll' : 'pagination'
                      }
                    })
                  }}
                />
                <span className="text-xs">무한스크롤</span>
              </div>
            </div>
          </div>

          {/* 테이블 밀도 설정 (테이블 뷰일 때만) */}
          {config.display.viewType === 'table' && (
            <div className="space-y-2 mb-3">
              <Label className="text-xs text-slate-600 dark:text-muted-foreground">테이블 밀도</Label>
              <RadioGroup
                value={config.display.tableDensity}
                onValueChange={(value) => {
                  onConfigChange({
                    ...config,
                    display: {
                      ...config.display,
                      tableDensity: value as 'compact' | 'normal' | 'comfortable'
                    }
                  })
                }}
                className="flex gap-3"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="compact" id="density-compact" className="h-3 w-3" />
                  <Label htmlFor="density-compact" className="cursor-pointer text-xs">간결</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="normal" id="density-normal" className="h-3 w-3" />
                  <Label htmlFor="density-normal" className="cursor-pointer text-xs">보통</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="comfortable" id="density-comfortable" className="h-3 w-3" />
                  <Label htmlFor="density-comfortable" className="cursor-pointer text-xs">넓게</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* 페이지당 게시글 수 및 정렬 */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="space-y-1">
              <Label className="text-xs text-slate-600 dark:text-muted-foreground">페이지당 게시글</Label>
              <Select value={config.display.itemsPerPage?.toString() || "10"} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10개</SelectItem>
                  <SelectItem value="20">20개</SelectItem>
                  <SelectItem value="30">30개</SelectItem>
                  <SelectItem value="50">50개</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-600 dark:text-muted-foreground">정렬 기준</Label>
              <Select value={config.display.sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="oldest">오래된순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="comments">댓글많은순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 뷰 타입 선택 */}
          <RadioGroup 
            value={config.display.viewType} 
            onValueChange={handleViewTypeChange}
            className="grid grid-cols-2 gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="table" id="table" className="h-4 w-4" />
              <Label 
                htmlFor="table" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                테이블
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" className="h-4 w-4" />
              <Label 
                htmlFor="card" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                카드
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gallery" id="gallery" className="h-4 w-4" />
              <Label 
                htmlFor="gallery" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                갤러리
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="list" id="list" className="h-4 w-4" />
              <Label 
                htmlFor="list" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                리스트
              </Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showThumbnail"
                checked={config.display.showThumbnail}
                onCheckedChange={(checked) => {
                  onConfigChange({
                    ...config,
                    display: {
                      ...config.display,
                      showThumbnail: checked as boolean
                    }
                  })
                }}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="showThumbnail" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                썸네일 표시
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showExcerpt"
                checked={config.display.showExcerpt}
                onCheckedChange={(checked) => {
                  onConfigChange({
                    ...config,
                    display: {
                      ...config.display,
                      showExcerpt: checked as boolean
                    }
                  })
                }}
                className="h-4 w-4 border-slate-400 dark:border-border"
              />
              <Label 
                htmlFor="showExcerpt" 
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                미리보기 표시
              </Label>
            </div>
          </div>
        </div>
        )}

        {/* 상세 뷰에서만 표시되는 옵션 */}
        {viewMode === 'detail' && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">상세보기 옵션</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="showAuthorInfo"
                  defaultChecked
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label 
                  htmlFor="showAuthorInfo" 
                  className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
                >
                  작성자 정보 표시
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="showRelatedPosts"
                  defaultChecked
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label 
                  htmlFor="showRelatedPosts" 
                  className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
                >
                  관련 글 표시
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="showTags"
                  defaultChecked
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label 
                  htmlFor="showTags" 
                  className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
                >
                  태그 표시
                </Label>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
        {viewMode === 'list' && '게시판 타입과 기능을 실시간으로 변경하고 테스트할 수 있습니다.'}
        {viewMode === 'detail' && '상세보기 화면의 표시 옵션을 설정할 수 있습니다.'}
        {viewMode === 'create' && '새 게시글 작성 시 사용할 수 있는 기능을 설정합니다.'}
        {viewMode === 'edit' && '게시글 수정 시 사용할 수 있는 기능을 설정합니다.'}
      </p>
    </div>
  )
})
BoardControlPanel.displayName = 'BoardControlPanel'