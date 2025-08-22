'use client'

import { useState, forwardRef, useImperativeHandle } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
// import { DSHeader } from '@/components/design-system/ds-header'
import { DSHeaderEnterprise } from '@/components/design-system/ds-header-enterprise'
import { DSHero } from '@/components/design-system/ds-hero'
import { DSFooter } from '@/components/design-system/ds-footer'
import { DSAuthCards } from '@/components/design-system/ds-auth-cards'
import { DSBusinessCards } from '@/components/design-system/ds-business-cards'
import { DSPortfolioSection } from '@/components/design-system/ds-portfolio-section'
import { ComponentShowcase } from './component-showcase'
import { Button } from '@/components/ui/button'
// import '@/styles/frontend/index.css'

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
    <section className={bgClass}>
      <div className={fullWidthContent ? '' : 'container pt-16 pb-8'}>
        <div className={fullWidthContent ? 'container pt-16 pb-8' : ''}>
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

export const FrontendSection = forwardRef<{ toggleAll: () => void }>((_, ref) => {
  const sections = [
    'navigation',
    'hero',
    'auth',
    'action',
    'portfolio',
    'components',
    'footer'
  ]

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(sections))

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const toggleAll = () => {
    setExpandedSections(prev => {
      if (prev.size === sections.length) {
        return new Set()
      } else {
        return new Set(sections)
      }
    })
  }

  useImperativeHandle(ref, () => ({
    toggleAll
  }))

  return (
    <div className="w-full frontend-section" data-theme="frontend">
      {/* Hero Section - Always Visible */}
      <section className="bg-gray-100 dark:bg-neutral-900">
        <div className="container py-16">
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
      </section>

      {/* Navigation Components Section */}
      <CollapsibleSection
        title="Navigation Components"
        bgColor="even"
        isExpanded={expandedSections.has('navigation')}
        onToggle={() => toggleSection('navigation')}
        fullWidthContent={true}
      >
        {/* Basic Header */}
        {/* <div className="space-y-4">
          <div className="container">
            <div className="rounded-lg border bg-card p-6 frontend-card frontend-card-hover frontend-animate-fade-in-up">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-xl font-semibold">Basic Header</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-4">
                  심플하고 깔끔한 기본 네비게이션 헤더. 로고, 메뉴, 사용자 액션을 포함.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full border-y bg-background">
            <DSHeader />
          </div>
        </div> */}

        {/* Enterprise Header */}
        <div className="space-y-4 mt-12">
          <div className="container">
            <div className="rounded-lg border bg-card p-6 frontend-card frontend-card-hover frontend-animate-fade-in-up">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-xl font-semibold">Enterprise Header (GNB)</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-4">
                  대규모 서비스를 위한 엔터프라이즈급 GNB. 다단계 드롭다운 메뉴와 완벽한 모바일 대응.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full border-y bg-background">
            <DSHeaderEnterprise />
          </div>
        </div>
      </CollapsibleSection>

      {/* Hero & Landing Section */}
      <CollapsibleSection
        title="Hero & Landing"
        bgColor="odd"
        isExpanded={expandedSections.has('hero')}
        onToggle={() => toggleSection('hero')}
        fullWidthContent={true}
      >
        <div className="container mb-8">
          <div className="rounded-lg border bg-card p-6 frontend-card frontend-card-hover frontend-animate-fade-in-up">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-xl font-semibold">Hero Section</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-4">
                강렬한 첫인상을 위한 히어로 섹션. 그라데이션 배경과 CTA 버튼으로 전환율 극대화.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full pb-8">
          <DSHero />
        </div>
      </CollapsibleSection>

      {/* Authentication Cards Section */}
      <CollapsibleSection
        title="Authentication Cards"
        bgColor="even"
        isExpanded={expandedSections.has('auth')}
        onToggle={() => toggleSection('auth')}
      >
        <div className="rounded-lg border bg-card p-6 mb-8 frontend-card frontend-card-hover frontend-animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <h3 className="text-xl font-semibold">Login & Registration Forms</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-4">
              로그인, 회원가입, 비밀번호 재설정 카드 컴포넌트. 
              폼 검증, 소셜 로그인, 반응형 디자인 포함.
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-background p-8 frontend-glass frontend-animate-fade-in">
          <DSAuthCards />
        </div>
      </CollapsibleSection>

      {/* Business Solutions Section */}
      <CollapsibleSection
        title="Business Solutions"
        bgColor="odd"
        isExpanded={expandedSections.has('action')}
        onToggle={() => toggleSection('action')}
      >
        <div className="rounded-lg border bg-card p-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <h3 className="text-xl font-semibold">Business Card Components</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-4">
              Essential business cards for enterprise websites - services, pricing, team, testimonials, and CTAs.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <DSBusinessCards />
        </div>
      </CollapsibleSection>

      {/* Business Cards Section */}
      <CollapsibleSection
        title="Business Cards"
        bgColor="even"
        isExpanded={expandedSections.has('portfolio')}
        onToggle={() => toggleSection('portfolio')}
      >
        <div className="rounded-lg border bg-card p-6 mb-8 frontend-card frontend-card-hover frontend-animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <h3 className="text-xl font-semibold">Business Essentials</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-4">
              모든 비즈니스에 필요한 핵심 컴포넌트.
              공지사항, 파트너, 스폰서 등 범용적으로 활용 가능한 깔끔한 카드 디자인.
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-background p-8 frontend-glass frontend-animate-fade-in">
          <DSPortfolioSection />
        </div>
      </CollapsibleSection>

      {/* UI Components Section */}
      <CollapsibleSection
        title="UI Components Library"
        bgColor="odd"
        isExpanded={expandedSections.has('components')}
        onToggle={() => toggleSection('components')}
      >
        <div className="rounded-lg border bg-card p-6 mb-8 frontend-card frontend-card-hover frontend-animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <h3 className="text-xl font-semibold">Complete Component Set</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-4">
              Form controls, buttons, modals, alerts 등 프로덕션에 필요한 모든 UI 컴포넌트.
              완벽한 접근성과 키보드 네비게이션 지원.
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-background p-8 frontend-glass frontend-animate-fade-in">
          <ComponentShowcase />
        </div>
      </CollapsibleSection>

      {/* Footer Section */}
      <CollapsibleSection
        title="Footer Component"
        bgColor="even"
        isExpanded={expandedSections.has('footer')}
        onToggle={() => toggleSection('footer')}
        fullWidthContent={true}
      >
        <div className="container mb-8">
          <div className="rounded-lg border bg-card p-6 frontend-card frontend-card-hover frontend-animate-fade-in-up">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-xl font-semibold">Complete Footer</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-4">
                링크, 소셜 미디어, 뉴스레터 구독 등 모든 요소를 포함한 완성형 푸터.
                반응형 디자인과 다크모드 완벽 지원.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full border-t bg-background">
          <DSFooter />
        </div>
      </CollapsibleSection>
    </div>
  )
})

FrontendSection.displayName = 'FrontendSection'