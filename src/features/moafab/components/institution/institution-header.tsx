import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Menu, 
  Home,
  Info,
  Bell,
  FolderOpen,
  Wrench,
  Phone,
  ArrowLeft
} from 'lucide-react'
import { useState } from 'react'
import { getInstitutionBySlug } from '../../data/institutions.mock'
import { cn } from '@/lib/utils'

interface InstitutionHeaderProps {
  slug: string
}

export function InstitutionHeader({ slug }: InstitutionHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const institution = getInstitutionBySlug(slug)

  if (!institution) return null

  const navigation = [
    { name: '홈', href: `/moafab/institution/${slug}`, icon: Home },
    { name: '기관 소개', href: `/moafab/institution/${slug}/about`, icon: Info },
    { name: '공지사항', href: `/moafab/institution/${slug}/notice`, icon: Bell },
    { name: '자료실', href: `/moafab/institution/${slug}/archive`, icon: FolderOpen },
    { name: '장비 소개', href: `/moafab/institution/${slug}/equipment`, icon: Wrench },
    { name: '서비스 신청', href: `/moafab/institution/${slug}/service`, icon: Phone },
  ]

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{
        borderBottomColor: `${institution.theme.primaryColor}30`
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Back to Main & Logo */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <ArrowLeft className="mr-2 h-4 w-4" />
                MOAFAB
              </Button>
            </Link>
            
            <div className="h-8 w-px bg-border hidden md:block" />
            
            <Link to={`/moafab/institution/${slug}` as any} className="flex items-center gap-2">
              <div 
                className="h-10 px-4 py-2 rounded-lg font-bold text-lg flex items-center"
                style={{ 
                  backgroundColor: `${institution.theme.primaryColor}10`,
                  color: institution.theme.primaryColor
                }}
              >
                {institution.name}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href as any}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-6">
                <div 
                  className="px-4 py-3 rounded-lg font-bold text-lg"
                  style={{ 
                    backgroundColor: `${institution.theme.primaryColor}10`,
                    color: institution.theme.primaryColor
                  }}
                >
                  {institution.name}
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.href as any}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                          "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
                
                <div className="pt-4 border-t">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      MOAFAB 메인으로
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}