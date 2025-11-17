import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchSection() {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchValue)
    // 검색 로직 구현
  }

  const popularKeywords = [
    '파이썬',
    'React',
    '자바스크립트',
    'AI',
    '데이터분석',
    '엑셀',
    '포토샵',
    'SQL'
  ]

  return (
    <section className="my-8">
      <div className="container mx-auto px-4 pt-8 pb-2">
        <div className="flex flex-col items-center">
          {/* 검색 바 - 가운데 정렬, 더 크게 */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="search"
                placeholder="배우고 싶은 과정을 검색해보세요"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-14 pr-14 h-14 text-lg rounded-full border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md focus:shadow-lg transition-all placeholder:text-gray-400"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* 인기 검색어 - 검색바 아래 */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center gap-2 flex-wrap">
              {popularKeywords.slice(0, 8).map((keyword, index) => (
                <button
                  key={keyword}
                  type="button"
                  className="group flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-sm"
                  onClick={() => {
                    setSearchValue(keyword)
                    // Focus on the search input after setting value
                    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
                    if (searchInput) {
                      searchInput.focus()
                    }
                  }}
                >
                  <span className="text-xs font-bold text-blue-500 dark:text-blue-400">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {keyword}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}