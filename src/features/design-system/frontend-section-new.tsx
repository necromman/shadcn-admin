'use client'

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { CategoryPlaceholder } from '@/components/design-system/placeholders/category-placeholder'
import { DEFAULT_CATEGORIES } from './types/frontend-category'
import type { CategoryConfig, CategoryType } from './types/frontend-category'

// 기존 컴포넌트들 import
import { DSAnnouncementBarVariants } from '@/components/design-system/ds-announcement-bar'
import { DSHeaderEnterprise } from '@/components/design-system/ds-header-enterprise'
import { DSIntegratedSearch } from '@/components/design-system/ds-integrated-search'
import { DSHeroVariants } from '@/components/design-system/ds-hero-enterprise'
import { DSFooter } from '@/components/design-system/ds-footer'
import { DSAuthCards } from '@/components/design-system/ds-auth-cards'
import { DSBusinessCards } from '@/components/design-system/ds-business-cards'
import { DSPortfolioSection } from '@/components/design-system/ds-portfolio-section'
import { ComponentShowcase } from './component-showcase'

interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
  bgColor: 'odd' | 'even'
  isCollapsible?: boolean
  isExpanded?: boolean
  onToggle?: () => void
  fullWidthContent?: boolean
}

function CollapsibleSection({ 
  title, 
  description, 
  children, 
  bgColor, 
  isCollapsible = true,
  isExpanded = false, 
  onToggle,
  fullWidthContent = false
}: SectionProps) {
  const bgClass = bgColor === 'odd' 
    ? 'bg-gray-100 dark:bg-neutral-900' 
    : 'bg-white dark:bg-neutral-950'

  return (
    <section className={`${bgClass} mb-8`}>
      <div className={fullWidthContent ? '' : 'container pt-16 pb-12'}>
        <div className={fullWidthContent ? 'container pt-16 pb-12' : ''}>
          <div 
            className={`flex items-center justify-between mb-8 ${isCollapsible ? 'cursor-pointer' : ''}`}
            onClick={isCollapsible ? onToggle : undefined}
          >
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold frontend-animate-fade-in-left">{title}</h2>
            </div>
            {isCollapsible && (
              <Button
                variant="ghost"
                size="sm"
                className="frontend-button-ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle?.()
                }}
              >
                {isExpanded ? (
                  <>
                    <HiChevronUp className="h-4 w-4 mr-2" />
                    접기
                  </>
                ) : (
                  <>
                    <HiChevronDown className="h-4 w-4 mr-2" />
                    펼치기
                  </>
                )}
              </Button>
            )}
          </div>
          
          {description && !isCollapsible && (
            <div className="rounded-lg border bg-card p-6 mb-8 frontend-card frontend-card-hover frontend-animate-fade-in-up">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-xl font-semibold">{description}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {isCollapsible ? (
          <div
            style={{
              maxHeight: isExpanded ? '10000px' : '0px',
              opacity: isExpanded ? 1 : 0,
              overflow: isExpanded ? 'visible' : 'hidden',
              transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out'
            }}
          >
            {children}
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </section>
  )
}

// 컴포넌트 매핑
const COMPONENT_MAP: Record<CategoryType, React.ComponentType | null> = {
  'announcement-bar': DSAnnouncementBarVariants,
  'header': DSHeaderEnterprise,
  'search': DSIntegratedSearch,
  'hero': DSHeroVariants,
  'notice-preview': null,
  'board-preview': null,
  'content': null,
  'business': DSBusinessCards,
  'portfolio': DSPortfolioSection,
  'auth': DSAuthCards,
  'components': ComponentShowcase,
  'footer': DSFooter
}

// 카테고리별 설명
const CATEGORY_DESCRIPTIONS: Record<CategoryType, { title: string; description: string }> = {
  'announcement-bar': {
    title: '공지사항 & 프로모션 바',
    description: '헤더 상단에 표시되는 공지사항, 이벤트, 프로모션 배너. 다양한 스타일과 애니메이션 효과 제공.'
  },
  'header': {
    title: 'Enterprise Header (GNB)',
    description: '대규모 서비스를 위한 엔터프라이즈급 GNB. 다단계 드롭다운 메뉴와 완벽한 모바일 대응.'
  },
  'search': {
    title: '통합 검색 시스템',
    description: '카테고리별 통합 검색, 실시간 자동완성, 인기/최근 검색어, 추천 태그 기능을 포함한 엔터프라이즈급 검색 시스템.'
  },
  'hero': {
    title: '히어로 섹션',
    description: '엔터프라이즈급 히어로 섹션. 팝업 알림, 배경 스타일 선택, 통계 카드 등 다양한 옵션 제공. 한글 콘텐츠로 구성된 전문적인 레이아웃.'
  },
  'notice-preview': {
    title: '공지사항 미리보기',
    description: '최신 공지사항을 요약하여 표시하는 컴포넌트. 리스트, 카드, 타임라인 등 다양한 레이아웃 지원.'
  },
  'board-preview': {
    title: '게시판 미리보기',
    description: '인기 게시글, 최신 게시글 등을 미리보기 형태로 표시. 탭, 캐러셀, 그리드 레이아웃 제공.'
  },
  'business': {
    title: 'Business Solutions',
    description: '서비스 소개, 가격표, 팀 멤버, 고객 후기 등 비즈니스 필수 카드 컴포넌트 모음.'
  },
  'portfolio': {
    title: 'Portfolio & Showcase',
    description: '작업물, 프로젝트, 파트너사를 효과적으로 보여주는 포트폴리오 섹션. 필터링과 정렬 기능 포함.'
  },
  'content': {
    title: '콘텐츠 섹션',
    description: '블로그 포스트, 뉴스, 리소스 등 다양한 콘텐츠를 표시하는 범용 섹션.'
  },
  'auth': {
    title: 'Authentication Cards',
    description: '로그인, 회원가입, 비밀번호 재설정 폼. 소셜 로그인과 2단계 인증 UI 포함.'
  },
  'components': {
    title: 'UI Components Library',
    description: 'Form controls, buttons, modals, alerts 등 프로덕션에 필요한 모든 UI 컴포넌트. 완벽한 접근성과 키보드 네비게이션 지원.'
  },
  'footer': {
    title: 'Complete Footer',
    description: '링크, 소셜 미디어, 뉴스레터 구독 등 모든 요소를 포함한 완성형 푸터. 반응형 디자인과 다크모드 완벽 지원.'
  }
}

export const FrontendSection = forwardRef<{ 
  toggleAll: () => void;
  getCategories: () => CategoryConfig[];
  updateCategories: (categories: CategoryConfig[]) => void;
  resetCategories: () => void;
}>((_, ref) => {
  const [categories, setCategories] = useState<CategoryConfig[]>(DEFAULT_CATEGORIES)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(DEFAULT_CATEGORIES.filter(c => c.enabled).map(c => c.id))
  )

  // localStorage에서 설정 불러오기
  useEffect(() => {
    // 버전 관리를 통한 캐시 무효화
    const STORAGE_VERSION = 'v2' // 버전 변경 시 캐시 자동 초기화
    const STORAGE_KEY = 'frontend-categories'
    const VERSION_KEY = 'frontend-categories-version'
    
    const currentVersion = localStorage.getItem(VERSION_KEY)
    
    // 버전이 다르거나 없으면 초기화
    if (currentVersion !== STORAGE_VERSION) {
      console.log('Resetting categories due to version change')
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(VERSION_KEY, STORAGE_VERSION)
      setCategories(DEFAULT_CATEGORIES)
      setExpandedCategories(new Set(DEFAULT_CATEGORIES.filter(c => c.enabled).map(c => c.id)))
      return
    }
    
    const savedCategories = localStorage.getItem(STORAGE_KEY)
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories)
        // 새로운 카테고리가 추가되었는지 확인
        const savedIds = new Set(parsed.map((c: CategoryConfig) => c.id))
        const defaultIds = new Set(DEFAULT_CATEGORIES.map(c => c.id))
        
        // 새로운 카테고리가 있으면 병합
        if (DEFAULT_CATEGORIES.some(dc => !savedIds.has(dc.id))) {
          const mergedCategories = [...parsed]
          DEFAULT_CATEGORIES.forEach(dc => {
            if (!savedIds.has(dc.id)) {
              mergedCategories.push(dc)
            }
          })
          // order 기준으로 정렬
          mergedCategories.sort((a, b) => a.order - b.order)
          setCategories(mergedCategories)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedCategories))
          setExpandedCategories(new Set(mergedCategories.filter((c: CategoryConfig) => c.enabled).map((c: CategoryConfig) => c.id)))
        } else {
          setCategories(parsed)
          setExpandedCategories(new Set(parsed.filter((c: CategoryConfig) => c.enabled).map((c: CategoryConfig) => c.id)))
        }
      } catch {
        // Failed to load categories - use defaults
        console.error('Failed to parse saved categories, using defaults')
        setCategories(DEFAULT_CATEGORIES)
        setExpandedCategories(new Set(DEFAULT_CATEGORIES.filter(c => c.enabled).map(c => c.id)))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES))
      }
    } else {
      // 저장된 설정이 없으면 기본값 저장
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES))
    }
  }, [])

  // 설정 저장
  const handleCategoriesChange = (newCategories: CategoryConfig[]) => {
    setCategories(newCategories)
    localStorage.setItem('frontend-categories', JSON.stringify(newCategories))
  }

  const handleReset = () => {
    setCategories(DEFAULT_CATEGORIES)
    setExpandedCategories(new Set(DEFAULT_CATEGORIES.filter(c => c.enabled).map(c => c.id)))
    localStorage.removeItem('frontend-categories')
  }

  const toggleSection = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const toggleAll = () => {
    const enabledCategories = categories.filter(c => c.enabled)
    setExpandedCategories(prev => {
      if (prev.size === enabledCategories.length) {
        return new Set()
      } else {
        return new Set(enabledCategories.map(c => c.id))
      }
    })
  }

  useImperativeHandle(ref, () => ({
    toggleAll,
    getCategories: () => categories,
    updateCategories: handleCategoriesChange,
    resetCategories: handleReset
  }))

  // 활성화되고 정렬된 카테고리
  const sortedCategories = [...categories]
    .sort((a, b) => a.order - b.order)
    .filter(c => c.enabled)

  const renderCategory = (category: CategoryConfig, index: number) => {
    const Component = COMPONENT_MAP[category.id]
    const isExpanded = expandedCategories.has(category.id)
    const bgColor = index % 2 === 0 ? 'odd' : 'even'
    const categoryInfo = CATEGORY_DESCRIPTIONS[category.id]

    // 공통 설명 블록 렌더링 함수
    const renderDescription = () => (
      <div className="rounded-lg border bg-card dark:bg-card p-6 mb-8 shadow-sm dark:shadow-none transition-colors">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h3 className="text-xl font-semibold text-foreground dark:text-foreground">{categoryInfo.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground pl-4">
            {categoryInfo.description}
          </p>
        </div>
      </div>
    )

    // 특별 처리가 필요한 카테고리들
    if (category.id === 'announcement-bar') {
      return (
        <CollapsibleSection
          key={category.id}
          title={category.title}
          bgColor={bgColor}
          isExpanded={isExpanded}
          onToggle={() => toggleSection(category.id)}
          fullWidthContent={true}
        >
          <div className="container mb-8">
            {renderDescription()}
          </div>
          <div className="w-full pb-4">
            {Component ? (
              <Component />
            ) : (
              <div className="container py-2">
                <CategoryPlaceholder 
                  title={category.title}
                  description="공지사항, 이벤트, 프로모션 배너가 표시될 영역입니다"
                  height="60px"
                />
              </div>
            )}
          </div>
        </CollapsibleSection>
      )
    }

    if (category.id === 'header') {
      return (
        <CollapsibleSection
          key={category.id}
          title={category.title}
          bgColor={bgColor}
          isExpanded={isExpanded}
          onToggle={() => toggleSection(category.id)}
          fullWidthContent={true}
        >
          <div className="space-y-4">
            <div className="container">
              {renderDescription()}
            </div>
            <div className="w-full border-y bg-background pb-4">
              {Component && <Component />}
            </div>
          </div>
        </CollapsibleSection>
      )
    }

    if (category.id === 'hero') {
      return (
        <CollapsibleSection
          key={category.id}
          title={category.title}
          bgColor={bgColor}
          isExpanded={isExpanded}
          onToggle={() => toggleSection(category.id)}
          fullWidthContent={true}
        >
          <div className="container mb-8">
            {renderDescription()}
          </div>
          <div className="w-full pb-12">
            {Component && <Component />}
          </div>
        </CollapsibleSection>
      )
    }

    if (category.id === 'footer') {
      return (
        <CollapsibleSection
          key={category.id}
          title={category.title}
          bgColor={bgColor}
          isExpanded={isExpanded}
          onToggle={() => toggleSection(category.id)}
          fullWidthContent={true}
        >
          <div className="container mb-8">
            {renderDescription()}
          </div>
          <div className="w-full border-t bg-background pb-4">
            {Component && <Component />}
          </div>
        </CollapsibleSection>
      )
    }

    // 일반 카테고리 렌더링
    return (
      <CollapsibleSection
        key={category.id}
        title={category.title}
        bgColor={bgColor}
        isExpanded={isExpanded}
        onToggle={() => toggleSection(category.id)}
        fullWidthContent={category.fullWidth}
      >
        {renderDescription()}
        <div className="rounded-xl border bg-background dark:bg-background p-8 shadow-sm dark:shadow-none transition-colors">
          {Component ? (
            <Component />
          ) : (
            <CategoryPlaceholder 
              title={category.placeholder || `${category.title} 영역`}
              description={`이 영역에는 ${category.title} 컴포넌트가 표시됩니다`}
              height="300px"
            />
          )}
        </div>
      </CollapsibleSection>
    )
  }

  return (
    <div className="w-full frontend-section" data-theme="frontend">
      {/* Hero Section - Always Visible */}
      <section className="bg-gray-100 dark:bg-neutral-900">
        <div className="container py-16">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm frontend-glass-sm frontend-animate-pop-in">
                <span className="mr-2">🚀</span>
                Production-Ready Components
              </div>
              <h2 className="text-4xl font-bold tracking-tight frontend-animate-fade-in-down">Frontend Components</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Essential components for building modern web applications. 
                All components are production-ready with full TypeScript support, 
                accessibility features, and responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리별 섹션 렌더링 */}
      {sortedCategories.map((category, index) => renderCategory(category, index + 1))}
    </div>
  )
})

FrontendSection.displayName = 'FrontendSection'