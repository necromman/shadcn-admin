import { Institution } from '../../../data/institutions.mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Wrench, Clock, DollarSign, ArrowRight } from 'lucide-react'

interface EquipmentGridProps {
  institution: Institution
}

export function EquipmentGrid({ institution }: EquipmentGridProps) {
  const featuredEquipment = institution.equipment.slice(0, 3)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            <h2 className="text-2xl font-bold">보유 장비</h2>
          </div>
          <Link to={`/moafab/institution/${institution.slug}/equipment` as any}>
            <Button variant="ghost" size="sm">
              전체보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEquipment.map((equipment) => (
            <Card key={equipment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader 
                className="pb-3"
                style={{ 
                  background: `linear-gradient(135deg, ${institution.theme.primaryColor}10 0%, transparent 100%)` 
                }}
              >
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{equipment.name}</CardTitle>
                  <Badge>{equipment.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {equipment.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">주요 사양</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {equipment.specs.slice(0, 3).map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {equipment.availability}
                  </div>
                  {equipment.pricePerHour && (
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <DollarSign className="h-3 w-3" />
                      {equipment.pricePerHour.toLocaleString()}원/시간
                    </div>
                  )}
                </div>

                <Link to={`/moafab/institution/${institution.slug}/service` as any}>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    style={{ 
                      borderColor: institution.theme.primaryColor,
                      color: institution.theme.primaryColor
                    }}
                  >
                    예약하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {featuredEquipment.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wrench className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">등록된 장비가 없습니다</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}