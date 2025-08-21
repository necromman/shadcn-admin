import { DSHeader } from '@/components/design-system/ds-header'
import { DSHeaderEnterprise } from '@/components/design-system/ds-header-enterprise'
import { DSHero } from '@/components/design-system/ds-hero'
import { DSFooter } from '@/components/design-system/ds-footer'
import { DSAuthCards } from '@/components/design-system/ds-auth-cards'
import { DSActionCards } from '@/components/design-system/ds-action-cards'
import { ComponentShowcase } from './component-showcase'

export function BackofficeSection() {
  return (
    <div className="w-full">
      {/* Hero Section - 1st Section (odd) */}
      <section className="bg-gray-100 dark:bg-neutral-900">
        <div className="container py-16">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <span className="mr-2">🚀</span>
              Production-Ready Components
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Backoffice Components</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Essential components for building modern web applications. 
              All components are production-ready with full TypeScript support, 
              accessibility features, and responsive design.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Components Section - 2nd Section (even) */}
      <section className="bg-white dark:bg-neutral-950">
        <div className="container pt-16 pb-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Navigation Components</h2>
            </div>
          </div>
          
          {/* Basic Header */}
          <div className="space-y-4">
            <div className="container">
              <div className="rounded-lg border bg-card p-6">
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
          </div>

          {/* Enterprise Header */}
          <div className="space-y-4 mt-12 pb-16">
            <div className="container">
              <div className="rounded-lg border bg-card p-6">
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
      </section>

      {/* Hero & Landing Section - 3rd Section (odd) */}
      <section className="bg-gray-100 dark:bg-neutral-900">
        <div className="container pt-16 pb-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Hero & Landing</h2>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="space-y-2 mb-4">
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
          <div className="w-full pb-16">
            <DSHero />
          </div>
      </section>

      {/* Authentication Cards Section - 4th Section (even) */}
      <section className="bg-white dark:bg-neutral-950">
        <div className="container py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Authentication Cards</h2>
          </div>
          <div className="rounded-lg border bg-card p-6 mb-8">
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
          <div className="rounded-xl border bg-background p-8">
            <DSAuthCards />
          </div>
        </div>
      </section>

      {/* Action Cards Section - 5th Section (odd) */}
      <section className="bg-gray-100 dark:bg-neutral-900">
        <div className="container py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Action Cards</h2>
          </div>
          <div className="rounded-lg border bg-card p-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-xl font-semibold">Interactive Card Components</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-4">
                다양한 액션과 상태를 표현하는 카드 컴포넌트. 
                프로젝트, 통계, 알림, 소셜 인터랙션 등 다목적 활용 가능.
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-background p-8">
            <DSActionCards />
          </div>
        </div>
      </section>

      {/* UI Components Section - 6th Section (even) */}
      <section className="bg-white dark:bg-neutral-950">
        <div className="container py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">UI Components Library</h2>
          </div>
          <div className="rounded-lg border bg-card p-6 mb-8">
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
          <div className="rounded-xl border bg-background p-8">
            <ComponentShowcase />
          </div>
        </div>
      </section>

      {/* Footer Section - 7th Section (odd) */}
      <section className="bg-gray-100 dark:bg-neutral-900">
        <div className="container pt-16 pb-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Footer Component</h2>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="space-y-2 mb-4">
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
      </section>
    </div>
  )
}