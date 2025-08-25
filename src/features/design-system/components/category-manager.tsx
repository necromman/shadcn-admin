import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  HiAdjustmentsHorizontal,
  HiArrowUp,
  HiArrowDown,
  HiEye,
  HiEyeSlash,
  HiArrowPath
} from 'react-icons/hi2'
import type { CategoryConfig } from '../types/frontend-category'

interface CategoryManagerProps {
  categories: CategoryConfig[]
  onCategoriesChange: (categories: CategoryConfig[]) => void
  onReset: () => void
}

export function CategoryManager({ 
  categories, 
  onCategoriesChange,
  onReset 
}: CategoryManagerProps) {
  const [localCategories, setLocalCategories] = useState(categories)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleCategory = (id: string) => {
    const updated = localCategories.map(cat =>
      cat.id === id ? { ...cat, enabled: !cat.enabled } : cat
    )
    setLocalCategories(updated)
  }

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const newCategories = [...localCategories]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex < 0 || targetIndex >= newCategories.length) return
    if (!newCategories[index].movable || !newCategories[targetIndex].movable) return
    
    // Swap orders
    const tempOrder = newCategories[index].order
    newCategories[index].order = newCategories[targetIndex].order
    newCategories[targetIndex].order = tempOrder
    
    // Swap positions in array
    ;[newCategories[index], newCategories[targetIndex]] = 
     [newCategories[targetIndex], newCategories[index]]
    
    setLocalCategories(newCategories)
  }

  const handleApply = () => {
    onCategoriesChange(localCategories)
    setIsOpen(false)
  }

  const handleReset = () => {
    onReset()
    setLocalCategories(categories)
  }

  const enabledCount = localCategories.filter(c => c.enabled).length

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <HiAdjustmentsHorizontal className="h-4 w-4" />
          카테고리 관리
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
            {enabledCount}/{localCategories.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] px-0">
        <SheetHeader className="px-6">
          <SheetTitle>카테고리 관리</SheetTitle>
          <SheetDescription>
            카테고리의 표시 여부와 순서를 관리할 수 있습니다.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 px-6">
          {/* 액션 버튼 */}
          <div className="flex items-center justify-between pb-4 border-b">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <HiArrowPath className="h-4 w-4" />
              초기화
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                취소
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
              >
                적용
              </Button>
            </div>
          </div>

          {/* 카테고리 리스트 */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto px-2 -mx-2">
            {localCategories.map((category, index) => (
              <div
                key={category.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  category.enabled 
                    ? 'bg-background' 
                    : 'bg-muted/30 opacity-60'
                }`}
              >
                {/* 토글 스위치 */}
                <Switch
                  id={category.id}
                  checked={category.enabled}
                  onCheckedChange={() => handleToggleCategory(category.id)}
                />
                
                {/* 카테고리 정보 */}
                <div className="flex-1">
                  <Label 
                    htmlFor={category.id}
                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                  >
                    {category.title}
                    {category.enabled ? (
                      <HiEye className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <HiEyeSlash className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {category.description}
                  </p>
                  {!category.movable && (
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      고정 위치
                    </span>
                  )}
                </div>
                
                {/* 순서 변경 버튼 */}
                {category.movable && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleMoveCategory(index, 'up')}
                      disabled={index === 0 || !localCategories[index - 1]?.movable}
                    >
                      <HiArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleMoveCategory(index, 'down')}
                      disabled={
                        index === localCategories.length - 1 || 
                        !localCategories[index + 1]?.movable
                      }
                    >
                      <HiArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 정보 메시지 */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              • 일부 카테고리는 위치가 고정되어 있습니다<br />
              • 변경사항은 적용 버튼을 눌러야 반영됩니다<br />
              • 초기화 버튼으로 기본 설정을 복원할 수 있습니다
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}