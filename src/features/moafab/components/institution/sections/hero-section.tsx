import { Institution } from '../../../data/institutions.mock'
import { Button } from '@/components/ui/button'
import { Calendar, GraduationCap, Wrench } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface HeroSectionProps {
  institution: Institution
}

export function HeroSection({ institution }: HeroSectionProps) {
  return (
    <section 
      className="relative py-16 md:py-24"
      style={{
        background: `linear-gradient(135deg, ${institution.theme.primaryColor}10 0%, ${institution.theme.secondaryColor}05 100%)`
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {institution.name}에 오신 것을 환영합니다
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {institution.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link to={`/moafab/institution/${institution.slug}/service` as any}>
              <Button size="lg" style={{ backgroundColor: institution.theme.primaryColor }}>
                <Calendar className="mr-2 h-5 w-5" />
                장비 예약하기
              </Button>
            </Link>
            <Link to={`/moafab/institution/${institution.slug}/equipment` as any}>
              <Button size="lg" variant="outline">
                <Wrench className="mr-2 h-5 w-5" />
                장비 둘러보기
              </Button>
            </Link>
            <Link to={`/moafab/institution/${institution.slug}/about` as any}>
              <Button size="lg" variant="outline">
                <GraduationCap className="mr-2 h-5 w-5" />
                교육 프로그램
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: `${institution.theme.primaryColor}10` }}
            >
              <h3 className="font-semibold mb-2">우리의 미션</h3>
              <p className="text-sm text-muted-foreground">{institution.mission}</p>
            </div>
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: `${institution.theme.secondaryColor}10` }}
            >
              <h3 className="font-semibold mb-2">우리의 비전</h3>
              <p className="text-sm text-muted-foreground">{institution.vision}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}