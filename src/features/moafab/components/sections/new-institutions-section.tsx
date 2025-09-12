import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, MapPin, ArrowRight, Wrench, Users } from 'lucide-react'
import { getNewInstitutions } from '../../data/institutions.mock'

export function NewInstitutionsSection() {
  const newInstitutions = getNewInstitutions()

  if (newInstitutions.length === 0) return null

  return (
    <section className="py-12 md:py-16">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            최근 추가된 협의체 기관
          </h2>
        </div>

        {/* New Institution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newInstitutions.map((institution) => (
            <Card 
              key={institution.id} 
              variant="compact"
              className="relative flex flex-col h-full hover:shadow-xl transition-all duration-300 border-2 group"
              style={{ borderColor: `${institution.theme.primaryColor}20` }}
            >
              {/* NEW Badge */}
              <Badge 
                className="absolute top-3 right-3 z-10 text-[10px] px-2 py-0.5"
                style={{ 
                  backgroundColor: institution.theme.primaryColor,
                  color: 'white'
                }}
              >
                NEW
              </Badge>

              <CardHeader 
                variant="compact" 
                className="pb-3"
                style={{ 
                  background: `linear-gradient(135deg, ${institution.theme.primaryColor}05 0%, transparent 100%)` 
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="p-2.5 rounded-xl shadow-sm flex-shrink-0"
                    style={{ 
                      backgroundColor: `${institution.theme.primaryColor}15`,
                      border: `1px solid ${institution.theme.primaryColor}25`
                    }}
                  >
                    <Building2 
                      className="h-5 w-5"
                      style={{ color: institution.theme.primaryColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold leading-tight truncate group-hover:text-primary transition-colors">
                      {institution.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{institution.contact.address.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent variant="compact" className="flex-1 flex flex-col pt-3">
                {/* Fixed height content area */}
                <div className="flex-1 space-y-3">
                  {/* Description - fixed height */}
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {institution.description}
                  </p>

                  {/* Specialties - fixed height */}
                  <div className="flex flex-wrap gap-1 min-h-[28px]">
                    {institution.specialties.slice(0, 2).map((specialty, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-[11px] px-2 py-0 h-[22px]"
                        style={{ 
                          backgroundColor: `${institution.theme.primaryColor}10`,
                          color: institution.theme.primaryColor,
                          border: `1px solid ${institution.theme.primaryColor}20`
                        }}
                      >
                        {specialty}
                      </Badge>
                    ))}
                    {institution.specialties.length > 2 && (
                      <Badge 
                        variant="outline" 
                        className="text-[11px] px-2 py-0 h-[22px]"
                      >
                        +{institution.specialties.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Stats - compact design */}
                  <div className="flex items-center justify-around py-3 border-y">
                    <div className="flex items-center gap-2">
                      <div 
                        className="p-1.5 rounded-lg"
                        style={{ backgroundColor: `${institution.theme.primaryColor}10` }}
                      >
                        <Wrench 
                          className="h-4 w-4" 
                          style={{ color: institution.theme.primaryColor }}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-bold leading-none" style={{ color: institution.theme.primaryColor }}>
                          {institution.equipment.length}
                        </p>
                        <p className="text-[10px] text-muted-foreground">장비</p>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex items-center gap-2">
                      <div 
                        className="p-1.5 rounded-lg"
                        style={{ backgroundColor: `${institution.theme.primaryColor}10` }}
                      >
                        <Users 
                          className="h-4 w-4" 
                          style={{ color: institution.theme.primaryColor }}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-bold leading-none" style={{ color: institution.theme.primaryColor }}>
                          {institution.services.length}
                        </p>
                        <p className="text-[10px] text-muted-foreground">서비스</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button - always at bottom */}
                <Link to={`/moafab/institution/${institution.slug}#top` as any} className="mt-4">
                  <Button 
                    className="w-full group/btn h-9 text-sm"
                    variant="outline"
                    style={{ 
                      borderColor: `${institution.theme.primaryColor}30`,
                      color: institution.theme.primaryColor
                    }}
                  >
                    기관 홈페이지 방문
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}