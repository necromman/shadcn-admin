import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  Menu,
  BookOpen,
  Monitor,
  Trophy,
  Users,
  Newspaper,
  GraduationCap,
  Code,
  Database,
  Palette,
  Briefcase,
  TrendingUp
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  description?: string
  icon?: React.ReactNode
  children?: {
    title: string
    href: string
    description: string
    icon?: React.ReactNode
  }[]
}

export function LmsMainHeader() {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    {
      title: '이러닝',
      href: '/elearning',
      icon: <Monitor className="h-4 w-4" />,
      children: [
        {
          title: '프로그래밍',
          href: '/elearning/programming',
          description: '웹, 앱, 시스템 개발 과정',
          icon: <Code className="h-4 w-4" />
        },
        {
          title: '데이터 분석',
          href: '/elearning/data',
          description: '빅데이터, AI, 머신러닝 과정',
          icon: <Database className="h-4 w-4" />
        },
        {
          title: '디자인',
          href: '/elearning/design',
          description: 'UI/UX, 그래픽, 영상 디자인',
          icon: <Palette className="h-4 w-4" />
        },
        {
          title: '비즈니스',
          href: '/elearning/business',
          description: '경영, 마케팅, 재무 과정',
          icon: <Briefcase className="h-4 w-4" />
        },
      ]
    },
    {
      title: '가상훈련',
      href: '/virtual',
      icon: <GraduationCap className="h-4 w-4" />,
      description: '실시간 온라인 라이브 교육'
    },
    {
      title: '추천테마',
      href: '/themes',
      icon: <Trophy className="h-4 w-4" />,
      children: [
        {
          title: '인기 강좌',
          href: '/themes/popular',
          description: '가장 많이 수강하는 인기 과정',
          icon: <TrendingUp className="h-4 w-4" />
        },
        {
          title: '신규 과정',
          href: '/themes/new',
          description: '최근 오픈한 새로운 과정',
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          title: '무료 과정',
          href: '/themes/free',
          description: '무료로 학습할 수 있는 과정',
          icon: <GraduationCap className="h-4 w-4" />
        },
      ]
    },
    {
      title: 'K-디지털',
      href: '/kdigital',
      icon: <Monitor className="h-4 w-4" />,
      description: '정부 지원 디지털 교육'
    },
    {
      title: '커뮤니티',
      href: '/community',
      icon: <Users className="h-4 w-4" />,
      children: [
        {
          title: '공지사항',
          href: '/community/notice',
          description: '중요 공지 및 업데이트',
          icon: <Newspaper className="h-4 w-4" />
        },
        {
          title: '학습 Q&A',
          href: '/community/qna',
          description: '학습 관련 질문과 답변',
          icon: <Users className="h-4 w-4" />
        },
        {
          title: '수강 후기',
          href: '/community/review',
          description: '실제 수강생들의 후기',
          icon: <Trophy className="h-4 w-4" />
        },
      ]
    },
    {
      title: '에듀테크+',
      href: '/edutech',
      icon: <BookOpen className="h-4 w-4" />,
      description: '최신 교육 기술 및 트렌드'
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">BCU</span>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                LMS
              </span>
            </a>

            {/* 데스크톱 네비게이션 */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="h-9 px-3">
                          <span className="flex items-center gap-1.5">
                            {item.icon}
                            {item.title}
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={child.href}
                                    className={cn(
                                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    )}
                                  >
                                    <div className="flex items-center gap-2">
                                      {child.icon}
                                      <div className="text-sm font-medium leading-none">
                                        {child.title}
                                      </div>
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {child.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <a
                          href={item.href}
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            {item.icon}
                            {item.title}
                          </span>
                        </a>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 모바일 메뉴 */}
          <div className="flex items-center gap-2">
            {/* 모바일 메뉴 버튼 */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col gap-4 py-4">
                  <div className="px-2">
                    <h2 className="text-lg font-semibold">메뉴</h2>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <div key={item.title}>
                        <a
                          href={item.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                          {item.icon}
                          {item.title}
                        </a>
                        {item.children && (
                          <div className="ml-6 flex flex-col gap-1 mt-1">
                            {item.children.map((child) => (
                              <a
                                key={child.title}
                                href={child.href}
                                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                              >
                                {child.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  )
}