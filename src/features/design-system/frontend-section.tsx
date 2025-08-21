import { DSHeader } from '@/components/design-system/ds-header'
import { DSHeaderEnterprise } from '@/components/design-system/ds-header-enterprise'
import { DSHero } from '@/components/design-system/ds-hero'
import { DSFooter } from '@/components/design-system/ds-footer'
import { ComponentShowcase } from './component-showcase'

export function FrontendSection() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/2 to-background">
        <div className="container py-16">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <span className="mr-2">🚀</span>
              Production-Ready Components
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Frontend Components</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Essential components for building modern web applications. 
              All components are production-ready with full TypeScript support, 
              accessibility features, and responsive design.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Components Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
        <div className="relative">
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
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        <div className="relative">
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
        </div>
      </section>

      {/* UI Components Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5" />
        <div className="relative container py-16">
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

      {/* Footer Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-gray-500/5" />
        <div className="relative">
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
        </div>
      </section>
    </div>
  )
}