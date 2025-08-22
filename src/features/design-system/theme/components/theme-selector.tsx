import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { type ThemeConfig, type ThemeScope } from '../core/types'
import { themeRegistry } from '../core/theme-registry'
import { HiGlobeAlt, HiBuildingOffice2, HiSparkles } from 'react-icons/hi2'

interface ThemeSelectorProps {
  scopeFilter?: ThemeScope | 'all'
  onThemeChange?: (theme: ThemeConfig) => void
}

export function ThemeSelector({ scopeFilter = 'all', onThemeChange }: ThemeSelectorProps) {
  const [themes, setThemes] = useState<ThemeConfig[]>([])
  const [selectedThemeId, setSelectedThemeId] = useState<string>('')
  const [isInitialized, setIsInitialized] = useState(false)

  // 테마 목록 및 현재 테마 로드
  useEffect(() => {
    const loadThemes = () => {
      const allThemes = themeRegistry.getAllThemes()
      
      // scope 필터링
      const filteredThemes = scopeFilter === 'all' 
        ? allThemes
        : allThemes.filter(theme => 
            theme.scope === scopeFilter || 
            theme.scope === 'both' || 
            !theme.scope // 기본값은 both
          )
      
      setThemes(filteredThemes)
      
      // 현재 선택된 테마 가져오기 또는 첫 번째 테마 선택
      const currentThemeId = themeRegistry.getCurrentThemeId()
      
      if (currentThemeId && filteredThemes.some(t => t.id === currentThemeId)) {
        // 저장된 테마가 현재 필터링된 목록에 있으면 사용
        setSelectedThemeId(currentThemeId)
      } else if (!isInitialized && filteredThemes.length > 0) {
        // 초기화 시 테마가 있으면 첫 번째 테마 선택 및 활성화
        const firstTheme = filteredThemes[0]
        setSelectedThemeId(firstTheme.id)
        themeRegistry.activateTheme(firstTheme.id)
        if (onThemeChange) {
          onThemeChange(firstTheme)
        }
      } else if (filteredThemes.length === 0) {
        // 테마가 없으면 빈 값
        setSelectedThemeId('')
      }
      
      setIsInitialized(true)
    }

    // 약간의 지연을 주어 테마 등록이 완료된 후 로드
    const timer = setTimeout(() => {
      loadThemes()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [scopeFilter, isInitialized, onThemeChange])

  const handleThemeSelect = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      // 레지스트리를 통해 테마 활성화
      themeRegistry.activateTheme(themeId)
      setSelectedThemeId(themeId)
      
      // 콜백 호출
      if (onThemeChange) {
        onThemeChange(theme)
      }
    }
  }

  const getScopeIcon = (scope?: ThemeScope) => {
    switch (scope) {
      case 'frontend':
        return <HiGlobeAlt className="h-3 w-3" />
      case 'backoffice':
        return <HiBuildingOffice2 className="h-3 w-3" />
      case 'both':
      default:
        return <HiSparkles className="h-3 w-3" />
    }
  }

  const getScopeLabel = (scope?: ThemeScope) => {
    switch (scope) {
      case 'frontend':
        return '프론트엔드'
      case 'backoffice':
        return '백오피스'
      case 'both':
      default:
        return '공통'
    }
  }

  const getScopeBadgeVariant = (scope?: ThemeScope) => {
    switch (scope) {
      case 'frontend':
        return 'default' as const
      case 'backoffice':
        return 'secondary' as const
      case 'both':
      default:
        return 'outline' as const
    }
  }

  // scope별로 테마 그룹화
  const groupedThemes = {
    frontend: themes.filter(t => t.scope === 'frontend'),
    backoffice: themes.filter(t => t.scope === 'backoffice'),
    both: themes.filter(t => t.scope === 'both' || !t.scope),
  }

  const hasGroupedThemes = scopeFilter === 'all' && 
    (groupedThemes.frontend.length > 0 || 
     groupedThemes.backoffice.length > 0 || 
     groupedThemes.both.length > 0)

  return (
    <Select value={selectedThemeId} onValueChange={handleThemeSelect}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder={themes.length === 0 ? "테마 없음" : "테마 선택"} />
      </SelectTrigger>
      <SelectContent>
        {hasGroupedThemes ? (
          <>
            {groupedThemes.both.length > 0 && (
              <SelectGroup>
                <SelectLabel className="flex items-center gap-2">
                  <HiSparkles className="h-3 w-3" />
                  공통 테마
                </SelectLabel>
                {groupedThemes.both.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    <div className="flex items-center gap-2">
                      <span>{theme.name}</span>
                      {theme.author && (
                        <span className="text-xs text-muted-foreground">by {theme.author}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
            
            {groupedThemes.frontend.length > 0 && (
              <SelectGroup>
                <SelectLabel className="flex items-center gap-2">
                  <HiGlobeAlt className="h-3 w-3" />
                  프론트엔드 테마
                </SelectLabel>
                {groupedThemes.frontend.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    <div className="flex items-center gap-2">
                      <span>{theme.name}</span>
                      {theme.author && (
                        <span className="text-xs text-muted-foreground">by {theme.author}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
            
            {groupedThemes.backoffice.length > 0 && (
              <SelectGroup>
                <SelectLabel className="flex items-center gap-2">
                  <HiBuildingOffice2 className="h-3 w-3" />
                  백오피스 테마
                </SelectLabel>
                {groupedThemes.backoffice.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    <div className="flex items-center gap-2">
                      <span>{theme.name}</span>
                      {theme.author && (
                        <span className="text-xs text-muted-foreground">by {theme.author}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
          </>
        ) : (
          themes.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              <div className="flex items-center gap-2">
                <span>{theme.name}</span>
                <Badge variant={getScopeBadgeVariant(theme.scope)} className="h-5 px-1.5 gap-1">
                  {getScopeIcon(theme.scope)}
                  <span className="text-[10px]">{getScopeLabel(theme.scope)}</span>
                </Badge>
                {theme.author && (
                  <span className="text-xs text-muted-foreground">by {theme.author}</span>
                )}
              </div>
            </SelectItem>
          ))
        )}
        
        {themes.length === 0 && (
          <SelectItem value="none" disabled>
            <span className="text-muted-foreground">테마 없음</span>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}