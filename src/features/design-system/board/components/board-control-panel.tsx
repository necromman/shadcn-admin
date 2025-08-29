'use client'

import React from 'react'
import { 
  HiCog6Tooth, 
  HiClipboardDocumentList, 
  HiEye, 
  HiClock,
  HiSquares2X2,
  HiShieldCheck,
  HiSparkles
} from 'react-icons/hi2'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { type BoardConfig, type UserRole } from '../types/board.types'
import { boardConfigs } from '../data/board-configs'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

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

  // 권한 체크 헬퍼
  const hasPermission = (permission: string[]) => {
    return permission.includes('all') || permission.includes(currentUserRole)
  }

  // 섹션 헤더 컴포넌트
  const SectionHeader = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description?: string }) => (
    <div className="flex items-start gap-2 mb-3">
      <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
        {description && (
          <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/30 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
      {/* 헤더 */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiCog6Tooth className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
              게시판 컨트롤 패널
            </span>
            <Badge variant="outline" className="text-xs">
              {viewMode === 'list' && '목록'}
              {viewMode === 'detail' && '상세'}
              {viewMode === 'create' && '작성'}
              {viewMode === 'edit' && '수정'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {currentUserRole}
            </Badge>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="p-5 space-y-5">
        
        {/* 게시판 타입 선택 섹션 - 리스트 뷰에서만 */}
        {viewMode === 'list' && (
          <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <SectionHeader 
              icon={HiClipboardDocumentList} 
              title="게시판 타입" 
              description="게시판 유형을 선택하세요"
            />
            <Select value={config.id} onValueChange={handleBoardTypeChange}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {boardConfigs.map(board => (
                  <SelectItem key={board.id} value={board.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{board.name}</span>
                      <Badge variant="outline" className="text-xs">{board.type}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-2">
              {config.description}
            </p>
          </div>
        )}

        {/* 권한 정보 섹션 */}
        <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <SectionHeader 
            icon={HiShieldCheck} 
            title="권한 정보" 
            description={`현재 권한: ${currentUserRole}`}
          />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '읽기', key: 'read' },
              { label: '쓰기', key: 'write' },
              { label: '댓글', key: 'comment' },
              { label: '삭제', key: 'delete' }
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/50 rounded">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
                <Badge 
                  variant={hasPermission(config.permissions[key as keyof typeof config.permissions] as string[]) ? "default" : "secondary"}
                  className="text-xs"
                >
                  {hasPermission(config.permissions[key as keyof typeof config.permissions] as string[]) ? '가능' : '불가'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 기능 설정 섹션 - 작성/수정 모드에서만 */}
        {(viewMode === 'create' || viewMode === 'edit') && (
          <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <SectionHeader 
              icon={HiSparkles} 
              title="게시글 기능" 
              description="활성화할 기능을 선택하세요"
            />
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'comments', label: '댓글 허용' },
                { id: 'likes', label: '좋아요' },
                { id: 'attachments', label: '파일 첨부' },
                { id: 'images', label: '이미지 업로드' },
                { id: 'mentions', label: '@멘션' },
                { id: 'privatePost', label: '비공개 글' },
                { id: 'anonymousPost', label: '익명 작성' }
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded transition-colors">
                  <Checkbox 
                    id={id}
                    checked={config.features[id as keyof typeof config.features]}
                    onCheckedChange={() => handleFeatureToggle(id as keyof BoardConfig['features'])}
                    className="h-4 w-4"
                  />
                  <Label 
                    htmlFor={id} 
                    className="cursor-pointer text-sm text-slate-700 dark:text-slate-300 flex-1"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 표시 옵션 섹션 - 리스트 뷰에서만 */}
        {viewMode === 'list' && (
          <>
            {/* 뷰 타입 섹션 */}
            <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <SectionHeader 
                icon={HiEye} 
                title="뷰 타입" 
                description="게시글 표시 방식을 선택하세요"
              />
              <RadioGroup 
                value={config.display.viewType} 
                onValueChange={handleViewTypeChange}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { value: 'table', label: '테이블' },
                  { value: 'card', label: '카드' },
                  { value: 'list', label: '리스트' },
                  { value: 'gallery', label: '갤러리', disabled: config.type !== 'gallery' && !config.features.images }
                ].map(({ value, label, disabled }) => (
                  <div key={value} className={cn(
                    "flex items-center space-x-2 p-2 rounded border",
                    config.display.viewType === value 
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700" 
                      : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700",
                    "hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  )}>
                    <RadioGroupItem value={value} id={value} disabled={disabled} className="h-4 w-4" />
                    <Label 
                      htmlFor={value} 
                      className={cn(
                        "cursor-pointer text-sm",
                        disabled ? "text-muted-foreground line-through" : "text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* 뷰 타입별 추가 옵션 */}
              {config.display.viewType === 'table' && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <Label className="text-xs text-slate-600 dark:text-slate-400 mb-2 block">테이블 밀도</Label>
                  <RadioGroup
                    value={config.display.tableDensity || 'normal'}
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
                    {['compact', 'normal', 'comfortable'].map((density) => (
                      <div key={density} className="flex items-center space-x-1">
                        <RadioGroupItem value={density} id={`density-${density}`} className="h-3 w-3" />
                        <Label htmlFor={`density-${density}`} className="cursor-pointer text-xs">
                          {density === 'compact' && '간결'}
                          {density === 'normal' && '보통'}
                          {density === 'comfortable' && '넓게'}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* 썸네일/미리보기 옵션 */}
              {(config.display.viewType === 'card' || config.display.viewType === 'list' || config.display.viewType === 'gallery') && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="showThumbnail"
                      checked={config.display.showThumbnail}
                      disabled={!config.features.images && config.type !== 'gallery'}
                      onCheckedChange={(checked) => {
                        onConfigChange({
                          ...config,
                          display: {
                            ...config.display,
                            showThumbnail: checked as boolean
                          }
                        })
                      }}
                      className="h-4 w-4"
                    />
                    <Label 
                      htmlFor="showThumbnail" 
                      className={cn(
                        "cursor-pointer text-sm",
                        (!config.features.images && config.type !== 'gallery')
                          ? "text-muted-foreground line-through"
                          : "text-slate-700 dark:text-slate-300"
                      )}
                    >
                      썸네일 표시
                    </Label>
                  </div>
                  {config.display.viewType !== 'gallery' && (
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
                        className="h-4 w-4"
                      />
                      <Label 
                        htmlFor="showExcerpt" 
                        className="cursor-pointer text-sm text-slate-700 dark:text-slate-300"
                      >
                        미리보기 표시
                      </Label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 페이지네이션 섹션 */}
            <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <SectionHeader 
                icon={HiSquares2X2} 
                title="페이지네이션" 
                description="게시글 로딩 방식을 설정하세요"
              />
              
              {/* 페이지네이션 타입 스위치 */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">로딩 방식</Label>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs transition-colors",
                    config.display.paginationType === 'pagination' 
                      ? "text-slate-700 dark:text-slate-300 font-medium" 
                      : "text-slate-400 dark:text-slate-600"
                  )}>
                    페이지
                  </span>
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
                  <span className={cn(
                    "text-xs transition-colors",
                    config.display.paginationType === 'infinite-scroll' 
                      ? "text-slate-700 dark:text-slate-300 font-medium" 
                      : "text-slate-400 dark:text-slate-600"
                  )}>
                    무한스크롤
                  </span>
                </div>
              </div>

              {/* 무한스크롤 딜레이 설정 */}
              {config.display.paginationType === 'infinite-scroll' && (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <HiClock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <Label className="text-xs font-medium text-amber-700 dark:text-amber-300">
                      로드 딜레이 (개발용)
                    </Label>
                  </div>
                  <Select 
                    value={(config.display.infiniteScrollDelay || 500).toString()} 
                    onValueChange={(value) => {
                      onConfigChange({
                        ...config,
                        display: {
                          ...config.display,
                          infiniteScrollDelay: parseInt(value)
                        }
                      })
                    }}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">즉시 로드</SelectItem>
                      <SelectItem value="200">200ms</SelectItem>
                      <SelectItem value="500">500ms (기본)</SelectItem>
                      <SelectItem value="1000">1초</SelectItem>
                      <SelectItem value="1500">1.5초</SelectItem>
                      <SelectItem value="2000">2초</SelectItem>
                      <SelectItem value="3000">3초</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                    서버 응답 시뮬레이션용 딜레이
                  </p>
                </div>
              )}

              {/* 페이지당 아이템 수 & 정렬 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600 dark:text-slate-400">페이지당 게시글</Label>
                  <Select value={config.display.itemsPerPage.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 12, 15, 20, 24, 30, 50].map(size => (
                        <SelectItem key={size} value={size.toString()}>{size}개</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600 dark:text-slate-400">정렬 기준</Label>
                  <Select value={config.display.sortBy} onValueChange={handleSortByChange}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">최신순</SelectItem>
                      <SelectItem value="oldest">오래된순</SelectItem>
                      <SelectItem value="popular">인기순</SelectItem>
                      <SelectItem value="comments">댓글순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 상세보기 옵션 - 상세 뷰에서만 */}
        {viewMode === 'detail' && (
          <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <SectionHeader 
              icon={HiEye} 
              title="상세보기 옵션" 
              description="표시할 정보를 선택하세요"
            />
            <div className="space-y-2">
              {[
                { id: 'showAuthorInfo', label: '작성자 정보' },
                { id: 'showRelatedPosts', label: '관련 게시글' },
                { id: 'showTags', label: '태그' }
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded transition-colors">
                  <Checkbox 
                    id={id}
                    defaultChecked
                    className="h-4 w-4"
                  />
                  <Label 
                    htmlFor={id} 
                    className="cursor-pointer text-sm text-slate-700 dark:text-slate-300"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 푸터 */}
      <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 rounded-b-xl">
        <p className="text-xs text-slate-500 dark:text-muted-foreground">
          {viewMode === 'list' && '💡 실시간으로 게시판 설정을 변경하고 테스트할 수 있습니다'}
          {viewMode === 'detail' && '💡 상세보기 화면의 표시 옵션을 설정합니다'}
          {viewMode === 'create' && '💡 새 게시글 작성 시 사용 가능한 기능들입니다'}
          {viewMode === 'edit' && '💡 게시글 수정 시 사용 가능한 기능들입니다'}
        </p>
      </div>
    </div>
  )
})

BoardControlPanel.displayName = 'BoardControlPanel'