import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight, BookOpen, Code, Palette, Briefcase, Languages, Heart, TrendingUp, Users, Globe } from 'lucide-react'

interface Category {
  id: string
  name: string
  count: number
  icon?: React.ReactNode
  children?: Category[]
}

interface CategorySidebarProps {
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  className?: string
}

export function CategorySidebar({ selectedCategory, onCategoryChange, className }: CategorySidebarProps) {
  const categories: Category[] = [
    {
      id: 'all',
      name: '전체',
      count: 1234,
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      id: 'it-sw',
      name: 'IT/SW',
      count: 456,
      icon: <Code className="h-4 w-4" />,
      children: [
        { id: 'web-dev', name: '웹 개발', count: 123 },
        { id: 'mobile-dev', name: '모바일 개발', count: 89 },
        { id: 'data-science', name: '데이터 사이언스', count: 156 },
        { id: 'ai-ml', name: 'AI/머신러닝', count: 88 }
      ]
    },
    {
      id: 'design',
      name: '디자인',
      count: 234,
      icon: <Palette className="h-4 w-4" />,
      children: [
        { id: 'ui-ux', name: 'UI/UX', count: 98 },
        { id: 'graphic', name: '그래픽 디자인', count: 76 },
        { id: 'video', name: '영상 편집', count: 60 }
      ]
    },
    {
      id: 'business',
      name: '비즈니스',
      count: 345,
      icon: <Briefcase className="h-4 w-4" />,
      children: [
        { id: 'marketing', name: '마케팅', count: 145 },
        { id: 'management', name: '경영', count: 120 },
        { id: 'finance', name: '재무/회계', count: 80 }
      ]
    },
    {
      id: 'language',
      name: '외국어',
      count: 199,
      icon: <Languages className="h-4 w-4" />,
      children: [
        { id: 'english', name: '영어', count: 89 },
        { id: 'chinese', name: '중국어', count: 45 },
        { id: 'japanese', name: '일본어', count: 65 }
      ]
    }
  ]

  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(['it-sw'])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className={cn("p-4", className)}>
      <h2 className="text-lg font-semibold mb-4 px-2">카테고리</h2>

      <nav className="space-y-1">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => {
                if (category.children) {
                  toggleCategory(category.id)
                }
                onCategoryChange(category.id)
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                selectedCategory === category.id
                  ? "bg-primary/10 text-primary dark:bg-accent dark:text-primary font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-accent text-gray-700 dark:text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
              {category.children && (
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedCategories.includes(category.id) && "rotate-90"
                  )}
                />
              )}
            </button>

            {/* 하위 카테고리 */}
            {category.children && expandedCategories.includes(category.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {category.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => onCategoryChange(child.id)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                      selectedCategory === child.id
                        ? "bg-primary/10 text-primary dark:bg-accent dark:text-primary font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-accent text-gray-600 dark:text-muted-foreground"
                    )}
                  >
                    <span>{child.name}</span>
                    <span className="text-xs text-muted-foreground ml-1">({child.count})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* 추천 카테고리 */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-sm font-medium mb-3 px-2 text-gray-700 dark:text-muted-foreground">추천 카테고리</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-accent text-gray-700 dark:text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span>인기 과정</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-accent text-gray-700 dark:text-muted-foreground">
            <Heart className="h-4 w-4 text-red-500" />
            <span>추천 과정</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-accent text-gray-700 dark:text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>그룹 학습</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-accent text-gray-700 dark:text-muted-foreground">
            <Globe className="h-4 w-4 text-green-500" />
            <span>글로벌 과정</span>
          </button>
        </div>
      </div>
    </div>
  )
}