import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { HiBeaker } from 'react-icons/hi2'
import type { PopupData, PopupConfig, PopupPosition, PopupLayout, HeroStyle } from './types'

interface OptionsPanelProps {
  popups: PopupData[]
  setPopups: React.Dispatch<React.SetStateAction<PopupData[]>>
  popupConfig: PopupConfig
  setPopupConfig: React.Dispatch<React.SetStateAction<PopupConfig>>
  heroStyle: HeroStyle
  setHeroStyle: React.Dispatch<React.SetStateAction<HeroStyle>>
  showStats: boolean
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>
}

export function OptionsPanel({
  popups,
  setPopups,
  popupConfig,
  setPopupConfig,
  heroStyle,
  setHeroStyle,
  showStats,
  setShowStats
}: OptionsPanelProps) {
  return (
    <div className="container mb-6">
      <div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <HiBeaker className="h-4 w-4 text-slate-600 dark:text-muted-foreground" />
          <span className="text-sm font-semibold text-slate-700 dark:text-muted-foreground">콘텐츠 표시 옵션</span>
        </div>
        
        <div className="space-y-4">
          {/* 팝업 관리 (단순화) */}
          <div className="space-y-3 pb-4 border-b">
            <div className="text-sm font-medium mb-2">팝업 설정</div>
            
            {/* 데스크톱/모바일 구분 표시 */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span className="px-2 py-1 bg-muted rounded">💻 데스크톱: 팝업 형태</span>
              <span className="px-2 py-1 bg-muted rounded">📱 모바일: 바텀 시트</span>
            </div>
            
            {/* 팝업 표시 개수 */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">표시 개수:</span>
              <div className="flex gap-2">
                {[1, 2, 3].map(num => (
                  <Button
                    key={num}
                    size="sm"
                    variant={popupConfig.maxPopups === num ? 'default' : 'outline'}
                    onClick={() => {
                      setPopupConfig(prev => ({ ...prev, maxPopups: num }))
                    }}
                    className="h-8 px-4"
                  >
                    {num}개
                  </Button>
                ))}
              </div>
            </div>

            {/* 시작 위치 (단순화) - 데스크톱만 */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">위치 <span className="text-xs">(PC)</span>:</span>
              <div className="flex gap-2">
                {[
                  { value: 'left', label: '왼쪽', icon: '◀' },
                  { value: 'center', label: '중앙', icon: '■' },
                  { value: 'right', label: '오른쪽', icon: '▶' }
                ].map(pos => (
                  <Button
                    key={pos.value}
                    size="sm"
                    variant={popupConfig.position === pos.value ? 'default' : 'outline'}
                    onClick={() => setPopupConfig(prev => ({ ...prev, position: pos.value as PopupPosition }))}
                    className="h-8 px-4"
                  >
                    <span className="mr-1">{pos.icon}</span>
                    {pos.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 배치 방식 (단순화) - 데스크톱만 */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">배치 <span className="text-xs">(PC)</span>:</span>
              <div className="flex gap-2">
                {[
                  { value: 'stack', label: '겹치기', icon: '⬢' },
                  { value: 'horizontal', label: '가로', icon: '↔' },
                  { value: 'vertical', label: '세로', icon: '↕' }
                ].map(layout => (
                  <Button
                    key={layout.value}
                    size="sm"
                    variant={popupConfig.layout === layout.value ? 'default' : 'outline'}
                    onClick={() => setPopupConfig(prev => ({ ...prev, layout: layout.value as PopupLayout }))}
                    className="h-8 px-4"
                  >
                    <span className="mr-1">{layout.icon}</span>
                    {layout.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 개별 팝업 토글 (표시 개수와 연동) */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 w-24">개별 표시:</span>
              <div className="flex gap-3">
                {popups.map((popup, idx) => (
                  <div key={popup.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`popup-${popup.id}`}
                      checked={popup.isVisible}
                      disabled={idx >= popupConfig.maxPopups}
                      onCheckedChange={(checked) => {
                        // 표시 개수 범위 내에서만 변경 가능
                        if (idx < popupConfig.maxPopups) {
                          setPopups(prev => prev.map(p => 
                            p.id === popup.id ? { ...p, isVisible: checked as boolean } : p
                          ))
                        }
                      }}
                      className="h-4 w-4 border-slate-400 dark:border-border disabled:opacity-50"
                    />
                    <Label 
                      htmlFor={`popup-${popup.id}`} 
                      className={`cursor-pointer text-sm font-normal ${idx >= popupConfig.maxPopups ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      팝업 {idx + 1}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enable-blur-popups"
                  checked={popupConfig.enableBlur}
                  onCheckedChange={(checked) => 
                    setPopupConfig(prev => ({ ...prev, enableBlur: checked as boolean }))
                  }
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="enable-blur-popups" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                  배경 블러 효과
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-debug"
                  checked={popupConfig.showDebug}
                  onCheckedChange={(checked) => 
                    setPopupConfig(prev => ({ ...prev, showDebug: checked as boolean }))
                  }
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="show-debug" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                  디버그 정보
                </Label>
              </div>
            </div>
            
            {/* 애니메이션 속도 */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">애니메이션:</span>
              <div className="flex gap-2">
                {[
                  { value: 'slow', label: '느리게', duration: '1000ms' },
                  { value: 'normal', label: '보통', duration: '500ms' },
                  { value: 'fast', label: '빠르게', duration: '200ms' }
                ].map(speed => (
                  <Button
                    key={speed.value}
                    size="sm"
                    variant={popupConfig.animationSpeed === speed.value ? 'default' : 'outline'}
                    onClick={() => setPopupConfig(prev => ({ ...prev, animationSpeed: speed.value as 'slow' | 'normal' | 'fast' }))}
                    className="h-8 px-4"
                    title={`애니메이션 ${speed.duration}`}
                  >
                    {speed.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* 히어로 설정 */}
          <div className="space-y-3">
            <div className="text-sm font-medium mb-2">히어로 설정</div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">배경:</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={heroStyle === 'gradient' ? 'default' : 'outline'}
                    onClick={() => setHeroStyle('gradient')}
                    className="h-7 px-3"
                  >
                    그라데이션
                  </Button>
                  <Button
                    size="sm"
                    variant={heroStyle === 'image' ? 'default' : 'outline'}
                    onClick={() => setHeroStyle('image')}
                    className="h-7 px-3"
                  >
                    이미지
                  </Button>
                  <Button
                    size="sm"
                    variant={heroStyle === 'video' ? 'default' : 'outline'}
                    onClick={() => setHeroStyle('video')}
                    className="h-7 px-3"
                  >
                    비디오
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-stats-v2"
                  checked={showStats}
                  onCheckedChange={(checked) => setShowStats(checked as boolean)}
                  className="h-4 w-4 border-slate-400 dark:border-border"
                />
                <Label htmlFor="show-stats-v2" className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300">
                  통계 카드 표시
                </Label>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5">
            팝업 배치와 히어로 섹션을 세밀하게 조정할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  )
}