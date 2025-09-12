import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, ArrowRight, ExternalLink } from 'lucide-react'
import { mockInstitutions } from '../../data/institutions.mock'

export function InstitutionsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              협의체 참여 기관
            </h2>
            <p className="mt-2 text-muted-foreground">
              각 기관별 홈페이지로 바로 이동하실 수 있습니다
            </p>
          </div>
          <Link to="/moafab/institutions">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              전체 기관 보기
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Institution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mockInstitutions.map((institution) => (
            <Link
              key={institution.id}
              to={`/moafab/institution/${institution.slug}` as any}
              className="block group"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group-hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${institution.theme.primaryColor}20` }}
                    >
                      <Building2 
                        className="h-6 w-6"
                        style={{ color: institution.theme.primaryColor }}
                      />
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {institution.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {institution.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      장비 {institution.equipment.length}종
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      서비스 {institution.services.length}종
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden">
          <Link to="/moafab/institutions">
            <Button variant="outline" className="w-full">
              전체 기관 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}