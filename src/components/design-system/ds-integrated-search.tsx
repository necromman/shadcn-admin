import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  HiMagnifyingGlass, 
  HiXMark,
  HiArrowTrendingUp,
  HiClock
} from 'react-icons/hi2'
import { cn } from '@/lib/utils'

export function DSIntegratedSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // 인기 검색어
  const trendingSearches = [
    '회원가입 프로세스',
    '결제 시스템 연동',
    'API 문서',
    '사용자 권한 관리',
    '데이터 분석 대시보드'
  ]

  // 최근 검색어
  const recentSearches = [
    '로그인 보안 설정',
    '이메일 템플릿',
    '푸시 알림 설정'
  ]

  // 추천 키워드 (아이콘과 색상 제거)
  const recommendedKeywords = [
    '신규 기능',
    '보안',
    '성능 최적화',
    '사용자 경험',
    'API 연동',
    '대시보드',
    '알림 설정'
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('검색:', searchQuery)
  }

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag)
  }

  return (
    <div className="w-full space-y-6">
      {/* 메인 검색 영역 */}
      <div className="relative">
        <form onSubmit={handleSearch} className="relative">
          <div className={cn(
            "relative rounded-xl border bg-background transition-all duration-200",
            isFocused ? "border-primary shadow-lg shadow-primary/20" : "border-border"
          )}>
            {/* 검색 입력 - 크기 대폭 확대 */}
            <div className="flex items-center p-8 gap-4">
              <HiMagnifyingGlass className="h-7 w-7 text-muted-foreground flex-shrink-0" />
              <Input
                type="text"
                placeholder="무엇을 찾고 계신가요? (상품, 문서, 사용자, 설정 등)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-xl flex-1 h-14 py-4"
                style={{ fontSize: '20px', lineHeight: '28px' }}
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 flex-shrink-0"
                  onClick={() => setSearchQuery('')}
                >
                  <HiXMark className="h-6 w-6" />
                </Button>
              )}
              <Button type="submit" className="h-14 px-8 text-lg font-medium min-w-[140px] flex-shrink-0">
                검색
              </Button>
            </div>
          </div>
        </form>

        {/* 검색 제안 드롭다운 (포커스 시) */}
        {isFocused && !searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-xl z-50 p-6 space-y-5">
            {/* 인기 검색어 */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-3">
                <HiArrowTrendingUp className="h-4 w-4 text-primary" />
                인기 검색어
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-2 px-4 text-sm"
                    onClick={() => handleTagClick(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 최근 검색어 */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-3">
                <HiClock className="h-4 w-4 text-muted-foreground" />
                최근 검색어
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted transition-colors py-2 px-4 text-sm"
                    onClick={() => handleTagClick(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 추천 키워드 - 심플하게 변경 */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-base text-muted-foreground font-medium">추천:</span>
        {recommendedKeywords.map((keyword) => (
          <Badge
            key={keyword}
            variant="outline"
            className="cursor-pointer hover:bg-muted transition-colors py-1.5 px-3 text-sm"
            onClick={() => handleTagClick(keyword)}
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  )
}