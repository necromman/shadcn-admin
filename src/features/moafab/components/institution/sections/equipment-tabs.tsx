import { useState } from 'react'
import { Institution } from '../../../data/institutions.mock'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { 
  Wrench, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Microscope,
  Cpu,
  Zap,
  FlaskConical,
  Activity
} from 'lucide-react'

interface EquipmentTabsProps {
  institution: Institution
}

const categoryIcons: Record<string, any> = {
  '분석장비': Microscope,
  '증착장비': Cpu,
  '식각장비': Zap,
  '리소그래피': Activity,
  '측정장비': FlaskConical
}

export function EquipmentTabs({ institution }: EquipmentTabsProps) {
  // Group equipment by category
  const equipmentByCategory = institution.equipment.reduce((acc, eq) => {
    if (!acc[eq.category]) {
      acc[eq.category] = []
    }
    acc[eq.category].push(eq)
    return acc
  }, {} as Record<string, typeof institution.equipment>)

  const categories = Object.keys(equipmentByCategory)
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'all')

  const allEquipment = institution.equipment

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              보유 장비
            </h2>
            <p className="text-muted-foreground mt-1">
              총 {institution.equipment.length}종의 전문 장비를 보유하고 있습니다
            </p>
          </div>
        </div>

        {categories.length > 0 ? (
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${categories.length + 1}, 1fr)` }}>
              <TabsTrigger value="all">
                전체 ({allEquipment.length})
              </TabsTrigger>
              {categories.map((category) => {
                const Icon = categoryIcons[category] || Wrench
                return (
                  <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{category}</span>
                    <span className="md:hidden">{equipmentByCategory[category].length}</span>
                    <span className="hidden lg:inline">({equipmentByCategory[category].length})</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <EquipmentGrid equipment={allEquipment} institution={institution} />
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <EquipmentGrid 
                  equipment={equipmentByCategory[category]} 
                  institution={institution}
                  category={category}
                />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">등록된 장비가 없습니다</p>
          </div>
        )}
      </div>
    </section>
  )
}

interface EquipmentGridProps {
  equipment: Institution['equipment']
  institution: Institution
  category?: string
}

function EquipmentGrid({ equipment, institution, category }: EquipmentGridProps) {
  const Icon = category ? categoryIcons[category] || Wrench : Wrench

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((eq) => (
        <Card key={eq.id} variant="default" className="overflow-hidden hover:shadow-lg transition-all group">
          <CardHeader 
            variant="default"
            className="pb-3"
            style={{ 
              background: `linear-gradient(135deg, ${institution.theme.primaryColor}10 0%, transparent 100%)` 
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  {eq.name}
                </CardTitle>
                {eq.nameEn && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {eq.nameEn}
                  </p>
                )}
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${institution.theme.primaryColor}20` }}
              >
                <Icon 
                  className="h-5 w-5"
                  style={{ color: institution.theme.primaryColor }}
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent variant="default" className="space-y-4">
            <Badge variant="outline" className="text-xs">
              {eq.category}
            </Badge>
            
            <p className="text-sm text-muted-foreground">
              {eq.description}
            </p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">주요 사양</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {eq.specs.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span 
                      className="mr-2 mt-1 block w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: institution.theme.primaryColor }}
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {eq.availability}
              </div>
              {eq.pricePerHour && (
                <div className="flex items-center gap-1 text-xs font-medium">
                  <DollarSign className="h-3 w-3" />
                  {eq.pricePerHour.toLocaleString()}원/시간
                </div>
              )}
            </div>

            <Link to={`/moafab/institution/${institution.slug}/service` as any}>
              <Button 
                className="w-full group/btn" 
                variant="outline"
                style={{ 
                  borderColor: `${institution.theme.primaryColor}50`,
                  color: institution.theme.primaryColor
                }}
              >
                예약 문의
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}