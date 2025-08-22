import { Button } from '@/components/ui/button'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

export function DSHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold">Brand</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <HiOutlineBars3 className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[380px] p-0">
              <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary" />
                  <span className="text-lg font-bold">Brand</span>
                </div>
              </div>
              <nav className="flex flex-col h-[calc(100vh-73px)]">
                <div className="flex-1 px-4 py-6">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-accent active:bg-accent/70 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="border-t p-6 space-y-3">
                  <Button variant="outline" size="lg" className="w-full justify-center font-medium">
                    Sign In
                  </Button>
                  <Button size="lg" className="w-full justify-center font-medium">
                    Get Started
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}