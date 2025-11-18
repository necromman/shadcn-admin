'use client'

import { useState } from 'react'
import { HiMagnifyingGlass, HiArrowTrendingUp, HiClock, HiXMark } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DSSearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [recentSearches, setRecentSearches] = useState([
    '컨테이너 요율',
    '선박 입출항 일정',
    '통관 서류',
    '보세구역 안내'
  ])
  
  const popularKeywords = [
    '수출입 절차',
    '항만 시설',
    '물류 창고',
    '화물 추적',
    '관세 정보',
    '검역 안내'
  ]

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'notice', label: '공지사항' },
    { value: 'service', label: '서비스' },
    { value: 'facility', label: '시설정보' },
    { value: 'business', label: '사업안내' },
    { value: 'data', label: '통계자료' }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Perform search logic here
    }
  }

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword)
  }

  const removeRecentSearch = (keyword: string) => {
    setRecentSearches(prev => prev.filter(k => k !== keyword))
  }

  return (
    <div className="w-full">
      {/* Main Search Area */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 md:p-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">무엇을 찾으시나요?</h2>
            <p className="text-blue-50">항만 서비스와 정보를 빠르게 검색하세요</p>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-white/90 backdrop-blur border-0">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12 bg-white/90 backdrop-blur border-0 text-base"
                />
              </div>
              
              <Button type="submit" size="lg" className="bg-white text-blue-600 hover:bg-accent font-semibold px-8">
                검색
              </Button>
            </div>
          </form>

          {/* Popular Keywords */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center gap-2 text-white/90">
              <HiArrowTrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">인기 검색어</span>
            </div>
            {popularKeywords.map(keyword => (
              <Badge
                key={keyword}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 cursor-pointer backdrop-blur"
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword}
              </Badge>
            ))}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-white/90">
                <HiClock className="h-4 w-4" />
                <span className="text-sm font-medium">최근 검색</span>
              </div>
              {recentSearches.map(keyword => (
                <Badge
                  key={keyword}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur group"
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword}
                  </span>
                  <button
                    onClick={() => removeRecentSearch(keyword)}
                    className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiXMark className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { icon: '📦', title: '화물추적', desc: '실시간 화물 위치 확인' },
          { icon: '🚢', title: '선박일정', desc: '입출항 스케줄 조회' },
          { icon: '📋', title: '서류발급', desc: '각종 증명서 신청' },
          { icon: '💰', title: '요금조회', desc: '항만 이용료 확인' }
        ].map((item, idx) => (
          <button
            key={idx}
            className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all group text-left"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}