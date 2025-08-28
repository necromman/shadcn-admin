'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiSearch, HiX } from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface BoardSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export const BoardSearch = React.memo(({
  onSearch,
  placeholder = "검색어를 입력하세요...",
  className
}: BoardSearchProps) => {
  const [query, setQuery] = useState('')
  
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }
  
  const handleClear = () => {
    setQuery('')
    onSearch('')
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <form onSubmit={handleSearch} className={cn("flex gap-2 w-full", className)}>
      <div className="relative flex-1">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-9 pr-9 w-full"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <HiX className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <Button type="submit" size="default" className="shrink-0">
        검색
      </Button>
    </form>
  )
})
BoardSearch.displayName = 'BoardSearch'