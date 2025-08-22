import { Button } from '@/components/ui/button'
import { HiArrowRight, HiPlayCircle } from 'react-icons/hi2'

export function DSHero() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
            <span className="mr-2">🎉</span>
            <span className="text-muted-foreground">Introducing our new features</span>
            <HiArrowRight className="ml-2 h-3 w-3" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Build Something
            <span className="text-primary"> Amazing</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Create beautiful, responsive applications with our comprehensive design system. 
            Fast, accessible, and fully customizable components.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="min-w-[150px]">
              Get Started
              <HiArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-[150px]">
              <HiPlayCircle className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">99%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}