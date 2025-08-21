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
import { applyTheme } from '../core/theme-utils'
import { Globe, Building2, Sparkles } from 'lucide-react'

interface ThemeSelectorProps {
  scopeFilter?: ThemeScope | 'all'
  onThemeChange?: (theme: ThemeConfig) => void
}

export function ThemeSelector({ scopeFilter = 'all', onThemeChange }: ThemeSelectorProps) {
  const [themes, setThemes] = useState<ThemeConfig[]>([])
  const [selectedThemeId, setSelectedThemeId] = useState<string>('')

  useEffect(() => {
    // 테마 목록 로드
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
    }

    loadThemes()
    
    // 현재 선택된 테마 가져오기
    const currentThemeId = themeRegistry.getCurrentThemeId()
    if (currentThemeId) {
      setSelectedThemeId(currentThemeId)
    }
  }, [scopeFilter])

  const handleThemeSelect = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      applyTheme(theme)
      setSelectedThemeId(themeId)
      
      // 로컬 스토리지에 저장
      localStorage.setItem('selected-theme', themeId)
      
      // 콜백 호출
      if (onThemeChange) {
        onThemeChange(theme)
      }
    }
  }

  const getScopeIcon = (scope?: ThemeScope) => {
    switch (scope) {
      case 'frontend':
        return <Globe className="h-3 w-3" />
      case 'backoffice':
        return <Building2 className="h-3 w-3" />
      case 'both':
      default:
        return <Sparkles className="h-3 w-3" />
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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="테마 선택" />
      </SelectTrigger>
      <SelectContent>
        {hasGroupedThemes ? (
          <>
            {groupedThemes.both.length > 0 && (
              <SelectGroup>
                <SelectLabel className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
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
                  <Globe className="h-3 w-3" />
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
                  <Building2 className="h-3 w-3" />
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
          <div className="py-6 text-center text-sm text-muted-foreground">
            테마가 없습니다
          </div>
        )}
      </SelectContent>
    </Select>
  )
}